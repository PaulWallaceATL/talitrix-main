"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { NewsArticle } from "@/lib/supabase";

const CATEGORIES = [
  "Announcement",
  "Platform",
  "Field Report",
  "Perspective",
  "Engineering",
  "Courts",
  "Company",
];

const inputClass =
  "w-full px-5 py-4 bg-white/[0.04] border border-border-gray rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/[0.06] transition-colors";

const selectClass = `${inputClass} appearance-none bg-[length:14px] bg-[right_1.25rem_center] bg-no-repeat`;
const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f87a13' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
};

type Props = {
  mode: "create" | "edit";
  article?: NewsArticle;
};

export default function ArticleEditor({ mode, article }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [category, setCategory] = useState(article?.category ?? "Announcement");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [published, setPublished] = useState(article?.published ?? true);

  const [metaTitle, setMetaTitle] = useState(article?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    article?.meta_description ?? "",
  );
  const [keywords, setKeywords] = useState<string>(
    (article?.keywords ?? []).join(", "),
  );
  const [ogImageUrl, setOgImageUrl] = useState(article?.og_image_url ?? "");
  const [authorName, setAuthorName] = useState(
    article?.author_name ?? "Talitrix Editorial",
  );

  // AI assistant state
  const [aiOpen, setAiOpen] = useState(mode === "create");
  const [aiBrief, setAiBrief] = useState("");
  const [aiTone, setAiTone] = useState("");
  const [aiPending, setAiPending] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const onGenerate = async () => {
    setAiPending(true);
    setAiError(null);
    try {
      const res = await fetch("/api/admin/news/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief: aiBrief,
          category,
          tone: aiTone || undefined,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(j.error || "Generation failed.");
      }
      const a = j.article as {
        title: string;
        slug: string;
        category: string;
        excerpt: string;
        content: string;
        meta_title: string;
        meta_description: string;
        keywords: string[];
      };
      setTitle(a.title);
      setSlug(a.slug);
      if (CATEGORIES.includes(a.category)) setCategory(a.category);
      setExcerpt(a.excerpt);
      setContent(a.content);
      setMetaTitle(a.meta_title);
      setMetaDescription(a.meta_description);
      setKeywords(a.keywords.join(", "));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setAiPending(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const url =
      mode === "create" ? "/api/admin/news" : `/api/admin/news/${article!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const keywordsArray = keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || undefined,
          category,
          excerpt,
          content,
          featured,
          published,
          meta_title: metaTitle || null,
          meta_description: metaDescription || null,
          keywords: keywordsArray,
          og_image_url: ogImageUrl || null,
          author_name: authorName || null,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed.");
      }
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setPending(false);
    }
  };

  const seoTitleLen = (metaTitle || title).length;
  const seoDescLen = (metaDescription || excerpt).length;

  return (
    <div className="flex flex-col gap-8">
      {/* AI ASSISTANT */}
      <section className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.08] via-white/[0.02] to-transparent overflow-hidden">
        <button
          type="button"
          onClick={() => setAiOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <span className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-primary/15 border border-primary/40 text-primary">
              ✦
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                AI Assistant
              </span>
              <span className="text-white text-sm sm:text-base truncate sm:whitespace-normal">
                Generate a publish-ready article from a brief
              </span>
            </div>
          </div>
          <span className="text-white/50 text-sm shrink-0">
            {aiOpen ? "Hide" : "Open"}
          </span>
        </button>

        {aiOpen && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col gap-4 border-t border-primary/30">
            <label className="flex flex-col gap-2 mt-4">
              <span className="text-xs uppercase tracking-widest text-white/60">
                Brief / Context <span className="text-primary">*</span>
              </span>
              <textarea
                value={aiBrief}
                onChange={(e) => setAiBrief(e.target.value)}
                rows={6}
                className={inputClass}
                placeholder={`What is this article about? Be specific.\n\nExample: "We just signed a 3-county pilot in Georgia covering 1,200 pretrial participants. Lead with the policy implications. Mention the All in ONE Band's 20Hz skin-detection. Don't name the counties."`}
              />
              <span className="text-xs text-white/40">
                The more concrete the brief (numbers, named programs, target
                keywords), the better the output.
              </span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/60">
                  Category (used as a hint)
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={selectClass}
                  style={selectStyle}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-background">
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/60">
                  Tone notes (optional)
                </span>
                <input
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. punchy and short, or quote-heavy"
                />
              </label>
            </div>

            {aiError && <p className="text-sm text-red-400">{aiError}</p>}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onGenerate}
                disabled={aiPending || aiBrief.trim().length < 20}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary/30 hover:bg-primary/50 backdrop-blur-md transition-colors border border-primary/60 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiPending ? "Drafting…" : "✦ Generate Article"}
              </button>
              <span className="text-xs text-white/50">
                Replaces every field below with the AI draft. You can still edit
                everything before saving.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* MAIN FORM */}
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white/60">
            Title <span className="text-primary">*</span>
          </span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="The headline as it appears on /news"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Slug
            </span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
              placeholder="auto-generated from title"
            />
            <span className="text-xs text-white/40">
              Public URL: /news/{slug || "auto-generated"}
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Category <span className="text-primary">*</span>
            </span>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-background">
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white/60">
            Excerpt <span className="text-primary">*</span>
          </span>
          <textarea
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="One- or two-sentence summary shown on /news"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-white/60">
            Content <span className="text-primary">*</span>
          </span>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className={`${inputClass} font-mono text-sm leading-relaxed`}
            placeholder="Full article body. Plain text — blank lines become paragraphs. Single-line section headings render bold."
          />
        </label>

        {/* SEO PANEL */}
        <fieldset className="rounded-2xl border border-border-gray bg-white/[0.02] p-5 sm:p-6 flex flex-col gap-5">
          <legend className="px-2 text-xs uppercase tracking-[0.3em] text-primary">
            SEO
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/60">
                Meta Title
              </span>
              <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className={inputClass}
                placeholder="Defaults to article title"
                maxLength={80}
              />
              <span
                className={`text-xs ${
                  seoTitleLen > 60
                    ? "text-amber-400"
                    : seoTitleLen < 30
                      ? "text-white/40"
                      : "text-emerald-400"
                }`}
              >
                {seoTitleLen} / ~60 chars (Google truncates around 60)
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/60">
                Author
              </span>
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className={inputClass}
                placeholder="Talitrix Editorial"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Meta Description
            </span>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Defaults to excerpt. Best at 150–160 chars."
              maxLength={200}
            />
            <span
              className={`text-xs ${
                seoDescLen > 160
                  ? "text-amber-400"
                  : seoDescLen < 120
                    ? "text-white/40"
                    : "text-emerald-400"
              }`}
            >
              {seoDescLen} / 160 chars
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Keywords
            </span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className={inputClass}
              placeholder="electronic monitoring, wrist-worn GPS, pretrial supervision"
            />
            <span className="text-xs text-white/40">
              Comma-separated. Used in JSON-LD and meta tags.
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Social Image URL (Open Graph)
            </span>
            <input
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className={inputClass}
              placeholder="https://… (1200×630 recommended). Defaults to /og-image.png"
            />
          </label>
        </fieldset>

        <div className="flex flex-wrap gap-5 sm:gap-8">
          <label className="flex items-center gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="accent-primary w-4 h-4"
            />
            Published (visible on /news)
          </label>
          <label className="flex items-center gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-primary w-4 h-4"
            />
            Featured (top of /news)
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={pending}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 disabled:opacity-50"
            style={{
              boxShadow:
                "0px 19px 65.2px rgba(248, 122, 19, 0.25), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
            }}
          >
            {pending
              ? "Saving…"
              : mode === "create"
                ? "Create Article"
                : "Save Changes"}
          </button>
          <Link
            href="/admin/news"
            className="text-sm text-white/60 hover:text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
