import { NextResponse } from "next/server";
import { generateObject, generateImage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { supabaseAdmin, uploadNewsImage } from "@/lib/supabase";
import { getKnowledgeBlock } from "@/lib/knowledge";
import {
  ARTICLE_SYSTEM_TEMPLATE,
  ArticleSchema,
  CATEGORIES,
  MAX_ARTICLES,
  TALITRIX_CONTEXT,
  randomSlugSuffix,
  safeImageFilename,
  todayLabel,
} from "@/lib/news-ai";

export const runtime = "nodejs";
export const maxDuration = 300;

const IncomingIdea = z.object({
  category: z.enum(CATEGORIES),
  primary_keyword: z.string().min(3).max(60),
  title_idea: z.string().min(5).max(140).optional(),
  brief: z.string().min(20).max(2000),
});

const BodySchema = z.object({
  ideas: z.array(IncomingIdea).min(1).max(MAX_ARTICLES),
  publish: z.boolean().optional(),
});

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

  let parsed: z.infer<typeof BodySchema>;
  try {
    const raw = await req.json();
    parsed = BodySchema.parse(raw);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid request body.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const ideas = parsed.ideas;
  const publish = parsed.publish !== false;

  const openai = createOpenAI({ apiKey });
  const textModelId = process.env.OPENAI_MODEL || "gpt-4o";
  const imageModelId = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
  const today = todayLabel();

  const knowledgeBlock = await getKnowledgeBlock();
  const systemPrompt = ARTICLE_SYSTEM_TEMPLATE(
    `${TALITRIX_CONTEXT}${knowledgeBlock}`,
  );

  const tasks = ideas.map(async (idea, i) => {
    try {
      const { object: article } = await generateObject({
        model: openai(textModelId),
        schema: ArticleSchema,
        system: systemPrompt,
        prompt: [
          `Today is ${today}.`,
          `CATEGORY: ${idea.category}`,
          `PRIMARY KEYPHRASE: ${idea.primary_keyword}`,
          idea.title_idea
            ? `WORKING HEADLINE (refine, don't slavishly copy): ${idea.title_idea}`
            : null,
          `BRIEF: ${idea.brief}`,
          "Write the article now and include a strong image_prompt. Return only the structured object.",
        ]
          .filter(Boolean)
          .join("\n\n"),
        temperature: 0.6,
      });

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
        const filename = safeImageFilename(article.slug);
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
      const message =
        err instanceof Error ? err.message : "Article failed.";
      console.error(`from-ideas article ${i + 1} failed`, err);
      return { ok: false as const, error: message, idea };
    }
  });

  const results = await Promise.all(tasks);
  const created = results.filter((r) => r.ok).map((r) => r.article);
  const failed = results.filter((r) => !r.ok);

  return NextResponse.json({
    requested: ideas.length,
    createdCount: created.length,
    failedCount: failed.length,
    articles: created,
    failures: failed.map((f) => ({
      error: "error" in f ? f.error : "unknown",
      idea: "idea" in f ? f.idea : null,
    })),
  });
}
