import { NextResponse } from "next/server";
import { generateObject, generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { randomUUID } from "node:crypto";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getKnowledgeBlock } from "@/lib/knowledge";
import {
  MAX_ARTICLES,
  TALITRIX_CONTEXT,
  TOPIC_RESEARCH_SYSTEM_TEMPLATE,
  TopicSchema,
  todayLabel,
} from "@/lib/news-ai";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not set. Add it in Vercel → Settings → Environment Variables.",
      },
      { status: 500 },
    );
  }

  let body: { count?: number; useResearch?: boolean; focus?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const requested = Number(body.count ?? 3);
  const count = Math.min(MAX_ARTICLES, Math.max(1, Math.floor(requested)));
  const useResearch = body.useResearch !== false;
  const focus = (body.focus ?? "").trim();

  const openai = createOpenAI({ apiKey });
  const textModelId = process.env.OPENAI_MODEL || "gpt-4o";
  const today = todayLabel();

  // 1. Optional live web research
  let researchNotes = "";
  if (useResearch) {
    try {
      const { text } = await generateText({
        model: openai.responses(textModelId),
        tools: {
          web_search_preview: openai.tools.webSearchPreview({
            searchContextSize: "medium",
          }),
        },
        system: `${TALITRIX_CONTEXT}

You are a research analyst. Use web search to gather a short briefing on the current state of community supervision, electronic monitoring, pretrial reform, jail tech, and adjacent justice-tech themes - focused on what's relevant in ${today.split(",").pop()?.trim() ?? "this year"}. Surface 5-10 concrete current themes (policy shifts, funding, pilots, public-safety debates, technology trends). Do NOT invent statistics. If you cite a number, it must come from the search results.`,
        prompt: `Research current themes in community supervision, electronic monitoring, pretrial release, and justice tech as of ${today}.${
          focus
            ? `\n\nADDITIONAL FOCUS FROM THE ADMIN: ${focus}`
            : ""
        }\n\nReturn a tight 250-500 word briefing of the most relevant themes for a Talitrix newsroom planner. No preamble - just the briefing.`,
      });
      researchNotes = text;
    } catch (err) {
      console.warn(
        "Web search research failed, falling back to no-research topic generation.",
        err,
      );
    }
  }

  // 2. Topic generation
  const knowledgeBlock = await getKnowledgeBlock();
  const systemPrompt = TOPIC_RESEARCH_SYSTEM_TEMPLATE(
    `${TALITRIX_CONTEXT}${knowledgeBlock}`,
  );

  try {
    const { object } = await generateObject({
      model: openai(textModelId),
      schema: TopicSchema,
      system: systemPrompt,
      prompt: [
        `Today is ${today}.`,
        `Propose ${count} unique, current, on-brand article topic${count === 1 ? "" : "s"} for the Talitrix newsroom.`,
        focus
          ? `ADMIN FOCUS (steer the ideas toward this if it fits): ${focus}`
          : null,
        researchNotes
          ? `RESEARCH NOTES (use these to anchor the topics in current themes):\n${researchNotes}`
          : null,
        "Vary the categories. Make each topic genuinely different from the others. Return only the structured object.",
      ]
        .filter(Boolean)
        .join("\n\n"),
      temperature: 0.85,
    });

    const ideas = object.topics.slice(0, count).map((t) => ({
      id: randomUUID(),
      ...t,
    }));

    return NextResponse.json({
      ideas,
      researchUsed: Boolean(researchNotes),
    });
  } catch (err) {
    console.error("Idea generation failed", err);
    return NextResponse.json(
      { error: "Idea generation failed. Please try again." },
      { status: 500 },
    );
  }
}
