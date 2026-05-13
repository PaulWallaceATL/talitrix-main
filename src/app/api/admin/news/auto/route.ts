import { NextResponse } from "next/server";
import { generateObject, generateText, generateImage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { supabaseAdmin, uploadNewsImage } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 300;

const CATEGORIES = [
  "Announcement",
  "Platform",
  "Field Report",
  "Perspective",
  "Engineering",
  "Courts",
  "Company",
] as const;

const MAX_ARTICLES = 5;

// ---------- Schemas ---------------------------------------------------------

const TopicSchema = z.object({
  topics: z
    .array(
      z.object({
        category: z.enum(CATEGORIES),
        primary_keyword: z
          .string()
          .min(3)
          .max(60)
          .describe(
            "The single SEO keyphrase this article should rank for. Concrete, search-friendly.",
          ),
        brief: z
          .string()
          .min(120)
          .max(700)
          .describe(
            "2–4 sentence brief describing the angle, what makes it timely, and what data points or perspectives to cover. Reference real, recent themes in justice tech / community supervision when possible.",
          ),
      }),
    )
    .min(1)
    .max(MAX_ARTICLES),
});

const ArticleSchema = z.object({
  title: z.string().min(20).max(110),
  slug: z
    .string()
    .min(8)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  category: z.enum(CATEGORIES),
  excerpt: z.string().min(120).max(280),
  content: z.string().min(800),
  meta_title: z.string().min(30).max(60),
  meta_description: z.string().min(120).max(160),
  keywords: z.array(z.string().min(2).max(40)).min(5).max(12),
  image_prompt: z
    .string()
    .min(40)
    .max(400)
    .describe(
      "A vivid, specific image-generation prompt for an editorial hero image — abstract, conceptual, no text/logos/faces. Match Talitrix's dark, sophisticated brand aesthetic with warm orange (#f87a13) accents.",
    ),
});

// ---------- Prompts ---------------------------------------------------------

const TALITRIX_CONTEXT = `ABOUT TALITRIX
Talitrix is a justice-tech company. The flagship hardware product is the All in ONE Band — the first independent wrist-worn GPS supervision device, with continuous biometric verification, multi-carrier SIM, ~20Hz skin-detection, and tamper-resistant design. The flagship software platform is "Talitrix ONE" — a unified ecosystem covering ONE Intake, ONE Jail Management, ONE Pre-Trial & Probation, and Talitrix Score (a transparent, explainable behavioral-intelligence layer).

Brand positioning: "Dignity by Design" — a deliberate move away from the stigma and bulk of legacy ankle monitors. Talitrix sells primarily B2G to sheriffs, departments of corrections, courts, pretrial services, and probation/community supervision agencies.

VOICE
- Authoritative, dignified, specific. Trade-publication tone (Wired meets a court-tech briefing).
- Never marketing fluff. Banned words: "revolutionary", "game-changing", "cutting-edge", "leverage", "synergize", "unleash", "unlock the power of".
- Default to American English and U.S. justice-system terminology.
- NEVER invent named pilot agencies, named officials, or specific statistics. Speak at the right level of generality if specifics are unknown.

AUDIENCE
- Primary: sheriffs, jail administrators, DOC commissioners, chief probation/pretrial officers.
- Secondary: judges, court administrators, county/state procurement, policy reporters.`;

const TOPIC_RESEARCH_SYSTEM = `${TALITRIX_CONTEXT}

YOUR ROLE
You are the editorial planner for Talitrix's newsroom. Your job is to propose timely, on-brand article ideas that will drive organic search traffic and earn links from policy outlets and trade press.

RULES
- Each topic must be RELEVANT to Talitrix's product or its market (community supervision, electronic monitoring, pretrial reform, jail tech, courts, biometric verification, behavioral risk, etc.).
- Each topic must be CURRENT — anchored to enduring 2025–2026 themes, not breaking news that requires verification you can't perform.
- Each topic must be CREATIVE and DIFFERENT from the others — vary categories, angles, and audiences across the set.
- Each topic must be TASTEFUL — never opportunistic about specific incidents involving real victims or named individuals.
- Pick a strong primary SEO keyphrase per topic. Mix head terms (e.g. "electronic monitoring") with long-tail (e.g. "wrist-worn GPS for pretrial release").

OUTPUT
Return ONLY the structured object — array of N topic objects.`;

const ARTICLE_SYSTEM = `${TALITRIX_CONTEXT}

YOUR ROLE
You are the senior editorial writer. Turn the brief into a publish-ready article.

SEO RULES
- Front-load the primary keyword in title, slug, first paragraph, and at least one section heading.
- Use long-tail variations naturally throughout. Never keyword-stuff.
- Excerpt and meta_description must be different sentences (no copy/paste).

CONTENT STRUCTURE
- Lede: a single strong paragraph framing the news, the stakes, and who should care.
- Body: 4–8 short sections separated by single-line section headings written in sentence case (e.g. "Why this matters", "How it works in the field", "What changes for participants"). Heading is its own paragraph followed by a blank line.
- Plain text. Paragraphs separated by a single blank line. Section headings on a single line.
- 700–1300 words.
- Close with a forward-looking paragraph.

IMAGE PROMPT
Write a 2–4 sentence prompt for a 16:9 editorial hero image:
- Abstract / conceptual — no text, no words, no logos, no readable letters, no faces.
- Dark, sophisticated, cinematic. Deep blacks, muted grays, subtle warm orange (#f87a13) accents.
- Leave negative space on the right for potential headline overlay.
- Examples of good subjects: macro close-up of a brushed-metal cuff against a dark gradient; abstract orange GPS waveforms over a topographic map; minimalist circuit traces in glowing amber; a city skyline at dusk with a warm orange horizon line.

OUTPUT
Return ONLY the structured object. No commentary.`;

// ---------- Helpers ---------------------------------------------------------

function randomSlugSuffix(): string {
  return Math.random().toString(36).slice(2, 6);
}

function safeFilename(slug: string): string {
  return `${slug}-${Date.now().toString(36)}-${randomSlugSuffix()}.png`;
}

async function ensureUniqueSlug(slug: string): Promise<string> {
  const sb = supabaseAdmin();
  const { data } = await sb
    .from("news_articles")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return slug;
  return `${slug}-${randomSlugSuffix()}`;
}

// ---------- Route -----------------------------------------------------------

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

  let body: { count?: number; publish?: boolean; useResearch?: boolean };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const requested = Number(body.count ?? 1);
  const count = Math.min(MAX_ARTICLES, Math.max(1, Math.floor(requested)));
  const publish = body.publish !== false;
  const useResearch = body.useResearch !== false;

  const openai = createOpenAI({ apiKey });
  const textModelId = process.env.OPENAI_MODEL || "gpt-4o";
  const imageModelId = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. Generate topics (with optional live web research)
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

You are a research analyst. Use web search to gather a short briefing on the current state of community supervision, electronic monitoring, pretrial reform, jail tech, and adjacent justice-tech themes — focused on what's relevant in ${today.split(",").pop()?.trim() ?? "this year"}. Surface 5–10 concrete current themes (policy shifts, funding, pilots, public-safety debates, technology trends). Do NOT invent statistics. If you cite a number, it must come from the search results.`,
        prompt: `Research current themes in community supervision, electronic monitoring, pretrial release, and justice tech as of ${today}. Return a tight 250–500 word briefing of the most relevant themes for a Talitrix newsroom planner. No preamble — just the briefing.`,
      });
      researchNotes = text;
    } catch (err) {
      console.warn(
        "Web search research failed, falling back to no-research topic generation.",
        err,
      );
    }
  }

  let topics: z.infer<typeof TopicSchema>["topics"];
  try {
    const { object } = await generateObject({
      model: openai(textModelId),
      schema: TopicSchema,
      system: TOPIC_RESEARCH_SYSTEM,
      prompt: [
        `Today is ${today}.`,
        `Propose ${count} unique, current, on-brand article topic${count === 1 ? "" : "s"} for the Talitrix newsroom.`,
        researchNotes ? `RESEARCH NOTES (use these to anchor the topics in current themes):\n${researchNotes}` : null,
        "Vary the categories. Make each topic genuinely different from the others. Return only the structured object.",
      ]
        .filter(Boolean)
        .join("\n\n"),
      temperature: 0.85,
    });
    topics = object.topics.slice(0, count);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Topic generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // 2. For each topic, generate the article + image in parallel
  const tasks = topics.map(async (topic, i) => {
    try {
      const { object: article } = await generateObject({
        model: openai(textModelId),
        schema: ArticleSchema,
        system: ARTICLE_SYSTEM,
        prompt: [
          `Today is ${today}.`,
          `CATEGORY: ${topic.category}`,
          `PRIMARY KEYPHRASE: ${topic.primary_keyword}`,
          `BRIEF: ${topic.brief}`,
          "Write the article now and include a strong image_prompt. Return only the structured object.",
        ].join("\n\n"),
        temperature: 0.6,
      });

      // Generate image
      let imageUrl: string | null = null;
      try {
        const { image } = await generateImage({
          model: openai.image(imageModelId),
          prompt: `${article.image_prompt}\n\nABSOLUTE RULES: no text, no words, no letters, no logos, no faces. Cinematic 16:9 widescreen. Dark editorial, deep blacks, muted grays, subtle warm orange #f87a13 accents only. Leaves negative space on the right.`,
          size: "1536x1024",
          providerOptions: {
            openai: { quality: "high" },
          },
        });

        const filename = safeFilename(article.slug);
        imageUrl = await uploadNewsImage(filename, image.uint8Array);
      } catch (imgErr) {
        console.warn(
          `Image generation/upload failed for article ${i + 1}; continuing without image.`,
          imgErr,
        );
      }

      const slug = await ensureUniqueSlug(article.slug);

      const { data: inserted, error: insertErr } = await supabaseAdmin()
        .from("news_articles")
        .insert({
          slug,
          title: article.title,
          category: article.category,
          excerpt: article.excerpt,
          content: article.content,
          featured: false,
          published: publish,
          published_at: publish ? new Date().toISOString() : null,
          meta_title: article.meta_title,
          meta_description: article.meta_description,
          keywords: article.keywords,
          og_image_url: imageUrl,
          author_name: "Talitrix Editorial",
        })
        .select()
        .single();

      if (insertErr) throw insertErr;
      return { ok: true as const, article: inserted };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Article failed.";
      console.error(`Auto-gen article ${i + 1} failed`, err);
      return { ok: false as const, error: message, topic };
    }
  });

  const results = await Promise.all(tasks);
  const created = results.filter((r) => r.ok).map((r) => r.article);
  const failed = results.filter((r) => !r.ok);

  return NextResponse.json({
    requested: count,
    createdCount: created.length,
    failedCount: failed.length,
    articles: created,
    failures: failed.map((f) => ({
      error: "error" in f ? f.error : "unknown",
      topic: "topic" in f ? f.topic : null,
    })),
    researchUsed: Boolean(researchNotes),
  });
}
