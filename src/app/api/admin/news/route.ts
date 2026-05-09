import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

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
    .from("news_articles")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ articles: data ?? [] });
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

  const title = str(body.title, 300);
  const category = str(body.category, 80);
  const excerpt = str(body.excerpt, 1000);
  const content = str(body.content, 100_000);

  if (!title || !category || !excerpt || !content) {
    return NextResponse.json(
      { error: "title, category, excerpt, and content are required." },
      { status: 400 },
    );
  }

  const requestedSlug = str(body.slug, 120);
  const slug = requestedSlug ? slugify(requestedSlug) : slugify(title);
  const featured = body.featured === true;
  const published = body.published !== false;
  const published_at =
    published && !str(body.published_at, 60)
      ? new Date().toISOString()
      : str(body.published_at, 60);

  const { data, error } = await supabaseAdmin()
    .from("news_articles")
    .insert({
      slug,
      title,
      category,
      excerpt,
      content,
      featured,
      published,
      published_at: published ? published_at : null,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "An article with that slug already exists." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ article: data });
}
