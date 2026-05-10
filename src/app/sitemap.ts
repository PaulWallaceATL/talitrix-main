import type { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/talitrix-one", changeFrequency: "monthly", priority: 0.9 },
  { path: "/news", changeFrequency: "daily", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/get-started", changeFrequency: "yearly", priority: 0.7 },
  { path: "/participant-registration", changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE = getSiteUrl();
  const now = new Date();

  const base: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let articles: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabaseAdmin()
      .from("news_articles")
      .select("slug, published_at, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    articles = (data ?? []).map((a) => ({
      url: `${SITE}/news/${a.slug}`,
      lastModified: a.updated_at
        ? new Date(a.updated_at)
        : a.published_at
          ? new Date(a.published_at)
          : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Supabase not configured yet — ship the static sitemap so deploys still work.
  }

  return [...base, ...articles];
}
