import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import KnowledgeEditor, { type KnowledgeEntry } from "../../KnowledgeEditor";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditKnowledgePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin()
    .from("company_knowledge")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  const entry = data as KnowledgeEntry;

  return (
    <div className="px-6 py-8 md:px-12 md:py-12 max-w-4xl">
      <header className="mb-8 md:mb-10">
        <Link
          href="/admin/knowledge"
          className="text-xs text-white/50 hover:text-primary"
        >
          ← All knowledge
        </Link>
        <h1 className="text-3xl sm:text-4xl mt-4">Edit Knowledge Entry</h1>
      </header>

      <KnowledgeEditor mode="edit" entry={entry} />
    </div>
  );
}
