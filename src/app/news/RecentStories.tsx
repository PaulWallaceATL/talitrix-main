"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { NewsArticle } from "@/lib/supabase";

const CATEGORIES = [
  "All",
  "Press Release",
  "Platform",
  "Field Report",
  "Perspective",
  "Engineering",
  "Courts",
] as const;

type Category = (typeof CATEGORIES)[number];

function fmt(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}

type Props = {
  articles: NewsArticle[];
};

export default function RecentStories({ articles }: Props) {
  const [selected, setSelected] = useState<Category>("All");

  const counts = useMemo(() => {
    const map = new Map<Category, number>();
    map.set("All", articles.length);
    for (const cat of CATEGORIES) {
      if (cat === "All") continue;
      map.set(cat, articles.filter((a) => a.category === cat).length);
    }
    return map;
  }, [articles]);

  const visible = useMemo(() => {
    if (selected === "All") return articles;
    return articles.filter((a) => a.category === selected);
  }, [articles, selected]);

  return (
    <section className="relative px-6 md:px-16 py-16 md:py-24 border-b border-border-gray">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
        <div>
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
            {articles.length > 0 ? "The Latest" : "Coming Soon"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            {articles.length > 0
              ? "Recent stories."
              : "First stories incoming."}
          </h2>
        </div>
        {articles.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {CATEGORIES.map((cat) => {
              const count = counts.get(cat) ?? 0;
              const isActive = selected === cat;
              const isEmpty = count === 0;

              if (isEmpty) {
                return (
                  <span
                    key={cat}
                    aria-disabled
                    title={`No ${cat.toLowerCase()} stories yet`}
                    className="px-4 py-2 rounded-full border border-white/5 text-white/25 text-sm cursor-not-allowed select-none"
                  >
                    {cat}
                  </span>
                );
              }

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelected(cat)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-border-gray text-white/65 hover:text-white hover:border-white/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="p-12 rounded-2xl border border-border-gray bg-white/[0.02] text-center">
          <p className="text-white/70">
            No stories in <span className="text-primary">{selected}</span> yet.
            Try another category or check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
          {visible.map((a) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              className="bg-background flex flex-col min-h-[280px] hover:bg-white/[0.04] transition-colors group"
            >
              {a.og_image_url && (
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border-gray bg-white/[0.02]">
                  <Image
                    src={a.og_image_url}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="text-primary tracking-widest uppercase">
                    {a.category}
                  </span>
                  <span>{fmt(a.published_at)}</span>
                </div>
                <h3 className="text-xl leading-tight group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed line-clamp-4">
                  {a.excerpt}
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-primary text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
