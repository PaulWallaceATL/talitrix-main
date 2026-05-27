import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import DeleteEntryButton from "./DeleteEntryButton";

export const dynamic = "force-dynamic";

type KnowledgeRow = {
  id: string;
  title: string;
  body: string;
  kind: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

async function getEntries(): Promise<KnowledgeRow[]> {
  const { data, error } = await supabaseAdmin()
    .from("company_knowledge")
    .select("*")
    .order("active", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as KnowledgeRow[];
}

export default async function KnowledgeListPage() {
  let entries: KnowledgeRow[] = [];
  let envError: string | null = null;
  try {
    entries = await getEntries();
  } catch (err) {
    envError = err instanceof Error ? err.message : String(err);
  }

  const activeCount = entries.filter((e) => e.active).length;

  return (
    <div className="px-6 py-8 md:px-12 md:py-12 max-w-6xl">
      <header className="mb-8 md:mb-10 flex flex-wrap items-end justify-between gap-5 md:gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Knowledge
          </span>
          <h1 className="text-3xl sm:text-4xl mt-2">Company Knowledge</h1>
          <p className="text-white/60 mt-3 max-w-xl">
            Snippets the AI newsroom writer treats as authoritative. Active
            entries are injected into every prompt for the idea planner, brief
            writer, and full-article generator.
          </p>
          <p className="text-white/40 mt-3 text-sm">
            {activeCount} active · {entries.length} total
          </p>
        </div>
        <Link
          href="/admin/knowledge/new"
          className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 text-sm"
          style={{
            boxShadow:
              "0px 19px 65.2px rgba(248, 122, 19, 0.2), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
          }}
        >
          + New Entry
        </Link>
      </header>

      {envError && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl border border-red-500/40 bg-red-500/5 text-red-200 text-sm">
          {envError}
        </div>
      )}

      {!envError && entries.length === 0 ? (
        <div className="p-8 sm:p-10 rounded-2xl border border-border-gray bg-white/[0.02] text-white/60 text-sm">
          No knowledge entries yet. Add things like brand voice rules, product
          facts, banned phrases, sample stats, or anything else the AI writer
          should always know.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {entries.map((e) => (
            <li
              key={e.id}
              className={`rounded-2xl border bg-white/[0.02] p-5 sm:p-6 flex flex-col gap-3 ${
                e.active
                  ? "border-border-gray"
                  : "border-white/5 opacity-60"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-primary border border-primary/40 rounded-full px-2 py-0.5">
                      {e.kind}
                    </span>
                    {!e.active && (
                      <span className="text-[10px] uppercase tracking-widest text-white/40 border border-white/15 rounded-full px-2 py-0.5">
                        Inactive
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl text-white">{e.title}</h2>
                </div>
                <div className="inline-flex items-center gap-4">
                  <Link
                    href={`/admin/knowledge/${e.id}/edit`}
                    className="text-xs text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteEntryButton id={e.id} title={e.title} />
                </div>
              </div>
              <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed">
                {e.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
