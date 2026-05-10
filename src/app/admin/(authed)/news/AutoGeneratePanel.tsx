"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Result = {
  requested: number;
  createdCount: number;
  failedCount: number;
  articles: Array<{ id: string; title: string; slug: string }>;
  failures: Array<{ error: string }>;
  researchUsed: boolean;
};

const STAGES = [
  "Researching the current market…",
  "Picking on-brand angles…",
  "Drafting articles…",
  "Generating hero images…",
  "Uploading to Supabase…",
  "Almost done — finishing publish…",
];

export default function AutoGeneratePanel() {
  const router = useRouter();
  const [count, setCount] = useState(3);
  const [publish, setPublish] = useState(true);
  const [useResearch, setUseResearch] = useState(true);

  const [pending, setPending] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!pending) return;
    setStage(0);
    const id = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGES.length - 1));
    }, 6500);
    return () => clearInterval(id);
  }, [pending]);

  const onGenerate = async () => {
    setPending(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/news/auto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count, publish, useResearch }),
      });
      const j = (await res.json().catch(() => ({}))) as Partial<Result> & {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(j.error || "Generation failed.");
      }
      setResult(j as Result);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.10] via-white/[0.02] to-transparent overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-primary/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-8 flex flex-col gap-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 border border-primary/40 text-primary text-xl">
              ✦
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                One-Click Newsroom
              </span>
              <h2 className="text-2xl">Auto-generate articles</h2>
              <p className="text-sm text-white/60 max-w-xl">
                Researches the current justice-tech market, picks on-brand
                angles, writes 1–5 publish-ready articles, generates a hero
                image for each, and saves them — with full SEO — in one click.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              How many?
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  disabled={pending}
                  className={`w-12 h-12 rounded-xl border text-base transition-colors disabled:opacity-50 ${
                    count === n
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border-gray text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <span className="text-xs text-white/40">
              {count} article{count === 1 ? "" : "s"} · ~{count * 18}–
              {count * 35}s
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
              <input
                type="checkbox"
                checked={useResearch}
                onChange={(e) => setUseResearch(e.target.checked)}
                disabled={pending}
                className="accent-primary w-4 h-4 mt-1"
              />
              <span>
                <strong className="text-white">Use live web research</strong>{" "}
                <span className="text-white/50">
                  — anchors topics in current market themes via OpenAI web
                  search.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
              <input
                type="checkbox"
                checked={publish}
                onChange={(e) => setPublish(e.target.checked)}
                disabled={pending}
                className="accent-primary w-4 h-4 mt-1"
              />
              <span>
                <strong className="text-white">Publish immediately</strong>{" "}
                <span className="text-white/50">
                  — uncheck to save as drafts you can review and publish later.
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onGenerate}
            disabled={pending}
            className="px-7 py-4 rounded-full bg-primary/30 hover:bg-primary/50 backdrop-blur-md transition-colors border border-primary/60 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow:
                "0px 19px 65.2px rgba(248, 122, 19, 0.35), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
            }}
          >
            {pending
              ? "Generating…"
              : `✦ Generate ${count} article${count === 1 ? "" : "s"}`}
          </button>
          {pending && (
            <span className="text-sm text-white/70 inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              {STAGES[stage]}
            </span>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400 border border-red-500/30 bg-red-500/5 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {result && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-5 py-4 flex flex-col gap-3">
            <p className="text-sm text-emerald-300">
              ✓ Created {result.createdCount} of {result.requested} article
              {result.requested === 1 ? "" : "s"}
              {result.researchUsed ? " (with live web research)" : ""}.
              {result.failedCount > 0 && (
                <span className="text-amber-300">
                  {" "}
                  {result.failedCount} failed — see logs.
                </span>
              )}
            </p>
            {result.articles.length > 0 && (
              <ul className="flex flex-col gap-1 text-sm">
                {result.articles.map((a) => (
                  <li key={a.id} className="text-white/85">
                    →{" "}
                    <a
                      href={`/news/${a.slug}`}
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
