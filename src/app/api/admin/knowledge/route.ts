import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function str(v: unknown, max = 4000): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function GET() {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin()
    .from("company_knowledge")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ entries: data ?? [] });
}

export async function POST(req: Request) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = str(body.title, 200);
  const bodyText = str(body.body, 8000);
  const kind = str(body.kind, 40) ?? "general";

  if (!title || !bodyText) {
    return NextResponse.json(
      { error: "title and body are required." },
      { status: 400 },
    );
  }

  const active = body.active !== false;
  const sortOrder =
    typeof body.sort_order === "number" && Number.isFinite(body.sort_order)
      ? Math.floor(body.sort_order)
      : 0;

  const { data, error } = await supabaseAdmin()
    .from("company_knowledge")
    .insert({
      title,
      body: bodyText,
      kind: kind.toLowerCase(),
      active,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ entry: data });
}
