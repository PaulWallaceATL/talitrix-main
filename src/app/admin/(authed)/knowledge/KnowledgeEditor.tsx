"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export type KnowledgeEntry = {
  id: string;
  title: string;
  body: string;
  kind: string;
  active: boolean;
  sort_order: number;
};

const KIND_OPTIONS = [
  "general",
  "voice",
  "facts",
  "products",
  "banned",
  "style",
  "audience",
  "seo",
];

const inputClass =
  "w-full px-5 py-4 bg-white/[0.04] border border-border-gray rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/[0.06] transition-colors";

type Props = {
  mode: "create" | "edit";
  entry?: KnowledgeEntry;
};

export default function KnowledgeEditor({ mode, entry }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(entry?.title ?? "");
  const [kind, setKind] = useState(entry?.kind ?? "general");
  const [body, setBody] = useState(entry?.body ?? "");
  const [active, setActive] = useState(entry?.active ?? true);
  const [sortOrder, setSortOrder] = useState<number>(entry?.sort_order ?? 0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !body.trim()) {
      setError("Title and body are both required.");
      return;
    }

    setPending(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/knowledge"
          : `/api/admin/knowledge/${entry?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          kind: kind.trim().toLowerCase() || "general",
          active,
          sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Save failed.");

      router.push("/admin/knowledge");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 max-w-3xl"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-white/60">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Brand voice — never use the word 'revolutionary'"
          className={inputClass}
          maxLength={200}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-white/60">
            Kind
          </label>
          <input
            list="kind-options"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            placeholder="general"
            className={inputClass}
            maxLength={40}
          />
          <datalist id="kind-options">
            {KIND_OPTIONS.map((k) => (
              <option key={k} value={k} />
            ))}
          </datalist>
          <span className="text-xs text-white/40">
            Used to group entries in the AI prompt. Pick any label.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-white/60">
            Sort order
          </label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className={inputClass}
            step={1}
          />
          <span className="text-xs text-white/40">
            Lower numbers appear first within their group.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-white/60">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="The actual rule, fact, or instruction the AI writer should follow. Be specific."
          className={`${inputClass} min-h-[200px] resize-y leading-relaxed`}
          maxLength={8000}
          required
        />
        <span className="text-xs text-white/40">
          {body.length.toLocaleString()} / 8,000 characters
        </span>
      </div>

      <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="accent-primary w-4 h-4 mt-1"
        />
        <span>
          <strong className="text-white">Active</strong>{" "}
          <span className="text-white/50">
            — uncheck to keep the entry around but stop sending it to the AI
            writer.
          </span>
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-400 border border-red-500/30 bg-red-500/5 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 rounded-full bg-primary/30 hover:bg-primary/50 backdrop-blur-md transition-colors border border-primary/60 text-sm disabled:opacity-50"
          style={{
            boxShadow:
              "0px 19px 65.2px rgba(248, 122, 19, 0.35), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
          }}
        >
          {pending
            ? "Saving…"
            : mode === "create"
              ? "Create entry"
              : "Save changes"}
        </button>
        <Link
          href="/admin/knowledge"
          className="text-sm text-white/60 hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
