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

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const { data, error } = await supabaseAdmin()
    .from("news_articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ article: data });
}

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  const title = str(body.title, 300);
  const category = str(body.category, 80);
  const excerpt = str(body.excerpt, 1000);
  const content = str(body.content, 100_000);
  const slugIn = str(body.slug, 120);

  if (title !== null) updates.title = title;
  if (category !== null) updates.category = category;
  if (excerpt !== null) updates.excerpt = excerpt;
  if (content !== null) updates.content = content;
  if (slugIn !== null) updates.slug = slugify(slugIn);
  if (typeof body.featured === "boolean") updates.featured = body.featured;
  if (typeof body.published === "boolean") {
    updates.published = body.published;
    if (body.published && !body.published_at) {
      updates.published_at = new Date().toISOString();
    }
    if (!body.published) {
      updates.published_at = null;
    }
  }
  if (typeof body.published_at === "string" && body.published_at) {
    updates.published_at = body.published_at;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin()
    .from("news_articles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
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

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const { error } = await supabaseAdmin()
    .from("news_articles")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
