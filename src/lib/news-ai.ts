import { z } from "zod";

export const CATEGORIES = [
  "Announcement",
  "Press Release",
  "Platform",
  "Field Report",
  "Perspective",
  "Engineering",
  "Courts",
  "Company",
] as const;

export const MAX_ARTICLES = 5;

// ---------- Schemas --------------------------------------------------------

export const TopicSchema = z.object({
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
        title_idea: z
          .string()
          .min(15)
          .max(120)
          .describe(
            "A working headline so the admin can scan and choose. Sentence case, newspaper-style.",
          ),
        brief: z
          .string()
          .min(120)
          .max(700)
          .describe(
            "2-4 sentence brief describing the angle, what makes it timely, and what data points or perspectives to cover. Reference real, recent themes in justice tech / community supervision when possible.",
          ),
      }),
    )
    .min(1)
    .max(MAX_ARTICLES),
});

export type IdeaTopic = z.infer<typeof TopicSchema>["topics"][number];

export const ArticleSchema = z.object({
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
      "A vivid, specific image-generation prompt for an editorial hero image - abstract, conceptual, no text/logos/faces. Match Talitrix's dark, sophisticated brand aesthetic with warm orange (#f87a13) accents.",
    ),
});

// ---------- Base prompts ---------------------------------------------------

export const TALITRIX_CONTEXT = `ABOUT TALITRIX
Talitrix is a justice-tech company. The flagship hardware product is the All-In-One Band - the first independent wrist-worn GPS supervision device, with continuous biometric verification, 3-Carrier SIM, ~20Hz skin-detection, and tamper-resistant design. The flagship software platform is "Talitrix ONE" - a unified ecosystem covering ONE Intake, ONE Jail Management, ONE Pre-Trial & Probation, and Talitrix Score (a transparent, explainable behavioral-intelligence layer).

Brand positioning: "Dignity by Design" - a deliberate move away from the stigma and bulk of legacy ankle monitors. Talitrix sells primarily B2G to sheriffs, departments of corrections, courts, pretrial services, and probation/community supervision agencies.

VOICE
- Authoritative, dignified, specific. Trade-publication tone (Wired meets a court-tech briefing).
- Never marketing fluff. Banned words: "revolutionary", "game-changing", "cutting-edge", "leverage", "synergize", "unleash", "unlock the power of".
- Default to American English and U.S. justice-system terminology.
- NEVER invent named pilot agencies, named officials, or specific statistics. Speak at the right level of generality if specifics are unknown.

AUDIENCE
- Primary: sheriffs, jail administrators, DOC commissioners, chief probation/pretrial officers.
- Secondary: judges, court administrators, county/state procurement, policy reporters.`;

export const TOPIC_RESEARCH_SYSTEM_TEMPLATE = (context: string) => `${context}

YOUR ROLE
You are the editorial planner for Talitrix's newsroom. Your job is to propose timely, on-brand article ideas that will drive organic search traffic and earn links from policy outlets and trade press.

RULES
- Each topic must be RELEVANT to Talitrix's product or its market (community supervision, electronic monitoring, pretrial reform, jail tech, courts, biometric verification, behavioral risk, etc.).
- Each topic must be CURRENT - anchored to enduring 2025-2026 themes, not breaking news that requires verification you can't perform.
- Each topic must be CREATIVE and DIFFERENT from the others - vary categories, angles, and audiences across the set.
- Each topic must be TASTEFUL - never opportunistic about specific incidents involving real victims or named individuals.
- Pick a strong primary SEO keyphrase per topic. Mix head terms (e.g. "electronic monitoring") with long-tail (e.g. "wrist-worn GPS for pretrial release").
- Provide a working title so an editor can scan and choose.

OUTPUT
Return ONLY the structured object - array of N topic objects.`;

export const ARTICLE_SYSTEM_TEMPLATE = (context: string) => `${context}

YOUR ROLE
You are the senior editorial writer. Turn the brief into a publish-ready article.

SEO RULES
- Front-load the primary keyword in title, slug, first paragraph, and at least one section heading.
- Use long-tail variations naturally throughout. Never keyword-stuff.
- Excerpt and meta_description must be different sentences (no copy/paste).

CONTENT STRUCTURE
- Lede: a single strong paragraph framing the news, the stakes, and who should care.
- Body: 4-8 short sections separated by single-line section headings written in sentence case (e.g. "Why this matters", "How it works in the field", "What changes for participants"). Heading is its own paragraph followed by a blank line.
- Plain text. Paragraphs separated by a single blank line. Section headings on a single line.
- 700-1300 words.
- Close with a forward-looking paragraph.

IMAGE PROMPT
Write a 2-4 sentence prompt for a 16:9 editorial hero image:
- Abstract / conceptual - no text, no words, no logos, no readable letters, no faces.
- Dark, sophisticated, cinematic. Deep blacks, muted grays, subtle warm orange (#f87a13) accents.
- Leave negative space on the right for potential headline overlay.
- Examples of good subjects: macro close-up of a brushed-metal cuff against a dark gradient; abstract orange GPS waveforms over a topographic map; minimalist circuit traces in glowing amber; a city skyline at dusk with a warm orange horizon line.

OUTPUT
Return ONLY the structured object. No commentary.`;

export const SINGLE_DRAFT_SYSTEM_TEMPLATE = (context: string) => `${context}

YOUR ROLE
You are the senior editorial writer for Talitrix. Turn the admin's brief into a publish-ready article.

SEO RULES
- Every article must have a strong primary keyword/keyphrase, repeated naturally in title, slug, first paragraph, at least one section heading, and meta description.
- Use long-tail variations throughout the body. Never keyword-stuff.
- Headings should answer real search queries (e.g. "How wrist-worn GPS reduces pretrial failure-to-appear rates").
- Excerpt and meta_description must be different sentences (don't copy/paste).

CONTENT STRUCTURE
- Lede: a single strong paragraph that frames the news, the stakes, and who should care.
- Body: 4-8 short sections separated by single-line section headings written in sentence case (e.g. "Why this matters", "How it works in the field", "What changes for participants"). Render headings as their own paragraph followed by a blank line.
- Use real-feeling concrete details. If you don't know specifics, write at the right level of generality - never invent named pilot sites, agency names, or statistics.
- Close with a forward-looking paragraph (what's next, what to watch).

OUTPUT
- Return ONLY the structured fields. No preamble, no markdown headings, no asterisks.
- The 'content' field is plain text. Paragraphs separated by a single blank line. Section headings are themselves on a single line.`;

export const SINGLE_DRAFT_SCHEMA = z.object({
  title: z
    .string()
    .min(20)
    .max(110)
    .describe(
      "Punchy, declarative headline. Sentence case. No clickbait. 50-95 chars is the sweet spot for Google. Should read like a newspaper headline.",
    ),
  slug: z
    .string()
    .min(8)
    .max(80)
    .regex(/^[a-z0-9-]+$/)
    .describe(
      "URL-safe slug, lowercase, dash-separated. 3-8 keyword-rich words. No stop words like 'the', 'a', 'and' if avoidable.",
    ),
  category: z.enum(CATEGORIES),
  excerpt: z
    .string()
    .min(120)
    .max(280)
    .describe(
      "1-2 sentence dek/summary used both on the news index and in social cards. Must hook the reader and naturally include the primary keyword.",
    ),
  content: z
    .string()
    .min(800)
    .describe(
      "The full article body, 700-1300 words. Plain text. Use blank lines between paragraphs. Open with a strong lede paragraph. Use 4-8 short H2-style section breaks written as a single line in sentence case (e.g. 'Why this matters'). End with a forward-looking conclusion. Do NOT include the title at the top - it is rendered separately.",
    ),
  meta_title: z
    .string()
    .min(30)
    .max(60)
    .describe(
      "SEO <title>. 50-60 chars. Front-load the primary keyword. Include 'Talitrix' at the end when natural.",
    ),
  meta_description: z
    .string()
    .min(120)
    .max(160)
    .describe(
      "SEO meta description, 150-160 chars. Persuasive, keyword-rich, ends with an implicit CTA.",
    ),
  keywords: z
    .array(z.string().min(2).max(40))
    .min(5)
    .max(12)
    .describe(
      "5-12 SEO keywords/phrases, ordered by importance. Mix head terms (e.g. 'electronic monitoring') and long-tail (e.g. 'wrist-worn GPS for pretrial supervision').",
    ),
});

export function todayLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function randomSlugSuffix(): string {
  return Math.random().toString(36).slice(2, 6);
}

export function safeImageFilename(slug: string): string {
  return `${slug}-${Date.now().toString(36)}-${randomSlugSuffix()}.png`;
}
