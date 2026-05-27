import { supabaseAdmin } from "@/lib/supabase";

export type KnowledgeEntry = {
  id: string;
  title: string;
  body: string;
  kind: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/**
 * Fetch active company knowledge entries and render them as a single text block
 * that can be prepended to AI system prompts. Returns an empty string when no
 * entries exist so callers can safely concatenate.
 */
export async function getKnowledgeBlock(): Promise<string> {
  let entries: Pick<KnowledgeEntry, "title" | "body" | "kind">[] = [];

  try {
    const { data, error } = await supabaseAdmin()
      .from("company_knowledge")
      .select("title, kind, body")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    entries = data ?? [];
  } catch (err) {
    console.warn("getKnowledgeBlock failed; continuing without knowledge.", err);
    return "";
  }

  if (entries.length === 0) return "";

  const grouped = new Map<string, typeof entries>();
  for (const entry of entries) {
    const key = (entry.kind || "general").toLowerCase();
    const bucket = grouped.get(key) ?? [];
    bucket.push(entry);
    grouped.set(key, bucket);
  }

  const sections: string[] = [];
  for (const [kind, items] of grouped) {
    const body = items
      .map((i) => `- ${i.title}: ${i.body}`)
      .join("\n");
    sections.push(`### ${kind.toUpperCase()}\n${body}`);
  }

  return `\n\nCOMPANY KNOWLEDGE (treat as authoritative; override any defaults that conflict):\n${sections.join("\n\n")}`;
}
