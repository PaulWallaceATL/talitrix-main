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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const url =
      mode === "create" ? "/api/admin/news" : `/api/admin/news/${article!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

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

  return (
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
            className={`${inputClass} appearance-none bg-[length:14px] bg-[right_1.25rem_center] bg-no-repeat`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f87a13' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
            }}
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
          rows={18}
          className={`${inputClass} font-mono text-sm leading-relaxed`}
          placeholder="Full article body. Plain text — line breaks become paragraphs on the article page."
        />
      </label>

      <div className="flex flex-wrap gap-8">
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

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={pending}
          className="px-8 py-4 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 disabled:opacity-50"
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
  );
}
