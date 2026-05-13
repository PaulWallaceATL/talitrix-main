import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const CATEGORIES = [
  "Announcement",
  "Platform",
  "Field Report",
  "Perspective",
  "Engineering",
  "Courts",
  "Company",
] as const;

const ArticleSchema = z.object({
  title: z
    .string()
    .min(20)
    .max(110)
    .describe(
      "Punchy, declarative headline. Sentence case. No clickbait. 50–95 chars is the sweet spot for Google. Should read like a newspaper headline.",
    ),
  slug: z
    .string()
    .min(8)
    .max(80)
    .regex(/^[a-z0-9-]+$/)
    .describe(
      "URL-safe slug, lowercase, dash-separated. 3–8 keyword-rich words. No stop words like 'the', 'a', 'and' if avoidable.",
    ),
  category: z.enum(CATEGORIES),
  excerpt: z
    .string()
    .min(120)
    .max(280)
    .describe(
      "1–2 sentence dek/summary used both on the news index and in social cards. Must hook the reader and naturally include the primary keyword.",
    ),
  content: z
    .string()
    .min(800)
    .describe(
      "The full article body, 700–1300 words. Plain text. Use blank lines between paragraphs. Open with a strong lede paragraph. Use 4–8 short H2-style section breaks written as a single line in ALL-CAPS-ish form (e.g. 'Why this matters'). End with a forward-looking conclusion. Do NOT include the title at the top — it is rendered separately.",
    ),
  meta_title: z
    .string()
    .min(30)
    .max(60)
    .describe(
      "SEO <title>. 50–60 chars. Front-load the primary keyword. Include 'Talitrix' at the end when natural.",
    ),
  meta_description: z
    .string()
    .min(120)
    .max(160)
    .describe(
      "SEO meta description, 150–160 chars. Persuasive, keyword-rich, ends with an implicit CTA.",
    ),
  keywords: z
    .array(z.string().min(2).max(40))
    .min(5)
    .max(12)
    .describe(
      "5–12 SEO keywords/phrases, ordered by importance. Mix head terms (e.g. 'electronic monitoring') and long-tail (e.g. 'wrist-worn GPS for pretrial supervision').",
    ),
});

const SYSTEM_PROMPT = `You are the senior editorial writer for Talitrix, a justice-tech company that builds wrist-worn GPS supervision hardware (the All in ONE Band) and the Talitrix ONE software platform for sheriffs, departments of corrections, courts, pretrial services, and probation.

VOICE & TONE
- Authoritative, specific, dignified. Talitrix's tagline is "Dignity by Design."
- Write like a serious B2G/B2B trade publication — think Wired meets a court-tech briefing.
- NEVER write marketing fluff or hype. NEVER use words like "revolutionary", "game-changing", "cutting-edge", "leverage", "synergize", "unleash".
- Use concrete details, numbers, and named stakeholders (sheriffs, judges, supervising officers, pretrial coordinators, participants).
- Default to American English and U.S. justice-system terminology.

AUDIENCE
- Primary: sheriffs, jail administrators, DOC commissioners, chief probation/pretrial officers.
- Secondary: judges, court administrators, county/state procurement, policy reporters.

SEO RULES
- Every article must have a strong primary keyword/keyphrase, repeated naturally in title, slug, first paragraph, at least one section heading, and meta description.
- Use long-tail variations throughout the body. Never keyword-stuff.
- Headings should answer real search queries (e.g. "How wrist-worn GPS reduces pretrial failure-to-appear rates").
- Excerpt and meta_description must be different sentences (don't copy/paste).

CONTENT STRUCTURE
- Lede: a single strong paragraph that frames the news, the stakes, and who should care.
- Body: 4–8 short sections separated by single-line section headings written in sentence case (e.g. "Why this matters", "How it works in the field", "What changes for participants"). Render headings as their own paragraph followed by a blank line.
- Use real-feeling concrete details. If you don't know specifics, write at the right level of generality — never invent named pilot sites, agency names, or statistics.
- Close with a forward-looking paragraph (what's next, what to watch).

OUTPUT
- Return ONLY the structured fields. No preamble, no markdown headings, no asterisks.
- The 'content' field is plain text. Paragraphs separated by a single blank line. Section headings are themselves on a single line.
`;

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
    "Write the article now. Return only the structured object — no commentary.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const openai = createOpenAI({ apiKey });
  const model = openai(process.env.OPENAI_MODEL || "gpt-4o");

  try {
    const { object } = await generateObject({
      model,
      schema: ArticleSchema,
      system: SYSTEM_PROMPT,
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
