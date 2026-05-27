"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Idea = {
  id: string;
  category: string;
  primary_keyword: string;
  title_idea: string;
  brief: string;
};

type IdeasResponse = {
  ideas: Idea[];
  researchUsed: boolean;
};

type WriteResponse = {
  requested: number;
  createdCount: number;
  failedCount: number;
  articles: Array<{ id: string; title: string; slug: string }>;
  failures: Array<{ error: string }>;
};

type Stage = "configure" | "ideas-loading" | "selecting" | "writing" | "done";

const WRITE_STAGES = [
  "Drafting articles…",
  "Generating hero images…",
  "Uploading to Supabase…",
  "Saving and publishing…",
];

const inputClass =
  "w-full px-5 py-4 bg-white/[0.04] border border-border-gray rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/[0.06] transition-colors";

export default function NewsroomWizard() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("configure");

  // Configure step
  const [count, setCount] = useState(3);
  const [useResearch, setUseResearch] = useState(true);
  const [publish, setPublish] = useState(true);
  const [focus, setFocus] = useState("");

  // Ideas step
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [researchUsed, setResearchUsed] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Write step
  const [writeStage, setWriteStage] = useState(0);
  const [result, setResult] = useState<WriteResponse | null>(null);

  // Errors
  const [error, setError] = useState<string | null>(null);

  // Stage ticker for the write step. The reset to 0 happens in writeSelected()
  // so the effect only manages the interval lifecycle and never sets state
  // synchronously during the effect body.
  useEffect(() => {
    if (stage !== "writing") return;
    const id = setInterval(() => {
      setWriteStage((s) => Math.min(s + 1, WRITE_STAGES.length - 1));
    }, 7000);
    return () => clearInterval(id);
  }, [stage]);

  const generateIdeas = async () => {
    setError(null);
    setStage("ideas-loading");
    try {
      const res = await fetch("/api/admin/news/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          count,
          useResearch,
          focus: focus.trim() || undefined,
        }),
      });
      const j = (await res.json().catch(() => ({}))) as Partial<IdeasResponse> & {
        error?: string;
      };
      if (!res.ok) throw new Error(j.error || "Failed to generate ideas.");
      const ideaList = (j.ideas ?? []) as Idea[];
      setIdeas(ideaList);
      setResearchUsed(Boolean(j.researchUsed));
      setSelected(new Set(ideaList.map((i) => i.id)));
      setStage("selecting");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate ideas.");
      setStage("configure");
    }
  };

  const writeSelected = async () => {
    const picks = ideas.filter((i) => selected.has(i.id));
    if (picks.length === 0) {
      setError("Select at least one idea to write.");
      return;
    }
    setError(null);
    setWriteStage(0);
    setStage("writing");
    try {
      const res = await fetch("/api/admin/news/from-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publish,
          ideas: picks.map((p) => ({
            category: p.category,
            primary_keyword: p.primary_keyword,
            title_idea: p.title_idea,
            brief: p.brief,
          })),
        }),
      });
      const j = (await res.json().catch(() => ({}))) as Partial<WriteResponse> & {
        error?: string;
      };
      if (!res.ok) throw new Error(j.error || "Failed to write articles.");
      setResult(j as WriteResponse);
      setStage("done");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to write articles.",
      );
      setStage("selecting");
    }
  };

  const reset = () => {
    setIdeas([]);
    setSelected(new Set());
    setResult(null);
    setError(null);
    setStage("configure");
  };

  const toggleIdea = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateIdea = (id: string, patch: Partial<Idea>) => {
    setIdeas((prev) =>
      prev.map((idea) => (idea.id === id ? { ...idea, ...patch } : idea)),
    );
  };

  const selectedCount = selected.size;

  return (
    <section className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.10] via-white/[0.02] to-transparent overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-primary/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col gap-6">
        <header className="flex items-start gap-3 sm:gap-4">
          <span className="inline-flex shrink-0 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 border border-primary/40 text-primary text-xl">
            ✦
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              AI Newsroom
            </span>
            <h2 className="text-xl sm:text-2xl">Generate articles in two steps</h2>
            <p className="text-sm text-white/60 max-w-2xl">
              Brainstorm a batch of on-brand ideas first, pick the winners,
              then let the writer draft full articles with hero images. Active
              entries from{" "}
              <a
                href="/admin/knowledge"
                className="text-primary hover:underline"
              >
                Knowledge
              </a>{" "}
              are injected into every step.
            </p>
          </div>
        </header>

        {/* Stage indicator */}
        <ol className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
          <li
            className={
              stage === "configure" || stage === "ideas-loading"
                ? "text-primary"
                : ""
            }
          >
            1. Configure
          </li>
          <li className="text-white/20">→</li>
          <li
            className={
              stage === "selecting" ||
              (stage === "ideas-loading" && ideas.length > 0)
                ? "text-primary"
                : ""
            }
          >
            2. Pick ideas
          </li>
          <li className="text-white/20">→</li>
          <li
            className={
              stage === "writing" || stage === "done" ? "text-primary" : ""
            }
          >
            3. Write
          </li>
        </ol>

        {error && (
          <p className="text-sm text-red-400 border border-red-500/30 bg-red-500/5 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Step 1: Configure */}
        {stage === "configure" && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 items-start">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/60">
                  How many ideas?
                </span>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCount(n)}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border text-base transition-colors ${
                        count === n
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border-gray text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useResearch}
                    onChange={(e) => setUseResearch(e.target.checked)}
                    className="accent-primary w-4 h-4 mt-1"
                  />
                  <span>
                    <strong className="text-white">Use live web research</strong>{" "}
                    <span className="text-white/50">
                      — anchors ideas in current justice-tech themes via OpenAI
                      web search.
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publish}
                    onChange={(e) => setPublish(e.target.checked)}
                    className="accent-primary w-4 h-4 mt-1"
                  />
                  <span>
                    <strong className="text-white">Publish immediately</strong>{" "}
                    <span className="text-white/50">
                      — uncheck to save as drafts you can review and publish
                      later.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/60">
                Optional focus (steer the ideas)
              </label>
              <textarea
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="e.g. lean toward pretrial reform in southern states this quarter"
                className={`${inputClass} min-h-[80px] resize-y leading-relaxed`}
                maxLength={2000}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={generateIdeas}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-primary/30 hover:bg-primary/50 backdrop-blur-md transition-colors border border-primary/60 text-sm sm:text-base"
                style={{
                  boxShadow:
                    "0px 19px 65.2px rgba(248, 122, 19, 0.35), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
                }}
              >
                ✦ Generate {count} idea{count === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        )}

        {/* Step 1b: Ideas loading */}
        {stage === "ideas-loading" && (
          <div className="flex items-center gap-3 text-sm text-white/70 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            {useResearch
              ? "Researching current themes and brainstorming…"
              : "Brainstorming ideas…"}
          </div>
        )}

        {/* Step 2: Selecting */}
        {stage === "selecting" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-white/70">
                {ideas.length} idea{ideas.length === 1 ? "" : "s"} ready
                {researchUsed ? " (with live research)" : ""}. Edit the brief
                inline before writing.
              </p>
              <div className="flex items-center gap-3 text-xs text-white/50">
                <button
                  type="button"
                  onClick={() => setSelected(new Set(ideas.map((i) => i.id)))}
                  className="hover:text-white"
                >
                  Select all
                </button>
                <span className="text-white/20">·</span>
                <button
                  type="button"
                  onClick={() => setSelected(new Set())}
                  className="hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            <ul className="flex flex-col gap-4">
              {ideas.map((idea) => {
                const checked = selected.has(idea.id);
                return (
                  <li
                    key={idea.id}
                    className={`rounded-2xl border p-5 flex gap-4 transition-colors ${
                      checked
                        ? "border-primary/60 bg-primary/[0.06]"
                        : "border-border-gray bg-white/[0.02]"
                    }`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleIdea(idea.id)}
                        className="accent-primary w-4 h-4 mt-1.5"
                      />
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-primary border border-primary/40 rounded-full px-2 py-0.5">
                            {idea.category}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-white/40">
                            {idea.primary_keyword}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={idea.title_idea}
                          onChange={(e) =>
                            updateIdea(idea.id, { title_idea: e.target.value })
                          }
                          className="w-full text-base sm:text-lg bg-transparent text-white border-b border-white/10 focus:outline-none focus:border-primary py-1"
                          maxLength={140}
                        />
                        <textarea
                          value={idea.brief}
                          onChange={(e) =>
                            updateIdea(idea.id, { brief: e.target.value })
                          }
                          className="w-full text-sm text-white/80 bg-transparent border border-white/5 rounded-lg p-3 leading-relaxed focus:outline-none focus:border-primary min-h-[100px] resize-y"
                          maxLength={2000}
                        />
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={writeSelected}
                disabled={selectedCount === 0}
                className="px-6 py-3.5 rounded-full bg-primary/30 hover:bg-primary/50 backdrop-blur-md transition-colors border border-primary/60 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  boxShadow:
                    "0px 19px 65.2px rgba(248, 122, 19, 0.35), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
                }}
              >
                ✦ Write {selectedCount} selected article
                {selectedCount === 1 ? "" : "s"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="text-sm text-white/60 hover:text-white"
              >
                Start over
              </button>
              <span className="text-xs text-white/40 ml-auto">
                ~{Math.max(selectedCount, 1) * 18}–
                {Math.max(selectedCount, 1) * 35}s
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Writing */}
        {stage === "writing" && (
          <div className="flex items-center gap-3 text-sm text-white/70 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            {WRITE_STAGES[writeStage]}
          </div>
        )}

        {/* Done */}
        {stage === "done" && result && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-5 py-4 flex flex-col gap-3">
            <p className="text-sm text-emerald-300">
              ✓ Created {result.createdCount} of {result.requested} article
              {result.requested === 1 ? "" : "s"}.
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
            <div>
              <button
                type="button"
                onClick={reset}
                className="text-sm text-white/60 hover:text-white"
              >
                Generate more →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
