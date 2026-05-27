import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getKnowledgeBlock } from "@/lib/knowledge";
import {
  SINGLE_DRAFT_SCHEMA,
  SINGLE_DRAFT_SYSTEM_TEMPLATE,
  TALITRIX_CONTEXT,
} from "@/lib/news-ai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not set. Add it in Vercel → Project Settings → Environment Variables.",
      },
      { status: 500 },
    );
  }

  let body: { brief?: string; category?: string; tone?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const brief = (body.brief ?? "").trim();
  if (brief.length < 20) {
    return NextResponse.json(
      {
        error:
          "Give the assistant at least a sentence or two of context to work from.",
      },
      { status: 400 },
    );
  }

  const category = (body.category ?? "").trim();
  const tone = (body.tone ?? "").trim();

  const userPrompt = [
    `BRIEF FROM THE ADMIN:\n${brief}`,
    category ? `PREFERRED CATEGORY: ${category}` : null,
    tone ? `ADDITIONAL TONE NOTES: ${tone}` : null,
    "Write the article now. Return only the structured object - no commentary.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const openai = createOpenAI({ apiKey });
  const model = openai(process.env.OPENAI_MODEL || "gpt-4o");

  const knowledgeBlock = await getKnowledgeBlock();
  const systemPrompt = SINGLE_DRAFT_SYSTEM_TEMPLATE(
    `${TALITRIX_CONTEXT}${knowledgeBlock}`,
  );

  try {
    const { object } = await generateObject({
      model,
      schema: SINGLE_DRAFT_SCHEMA,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.6,
    });

    return NextResponse.json({ article: object });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Generation failed.";
    console.error("AI generation failed", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
