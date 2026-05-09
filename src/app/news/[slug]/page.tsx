import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { supabaseAdmin, type NewsArticle } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("news_articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return (data as NewsArticle) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "News | Talitrix" };
  return {
    title: `${article.title} | Talitrix`,
    description: article.excerpt,
  };
}

function fmt(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const paragraphs = article.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <article className="relative pt-40 pb-24 px-6 md:px-16 max-w-4xl mx-auto">
        <Link
          href="/news"
          className="text-xs text-white/50 hover:text-primary tracking-widest uppercase"
        >
          ← All News
        </Link>

        <header className="mt-8 mb-14 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
            <span className="text-primary">{article.category}</span>
            <span className="text-white/40">{fmt(article.published_at)}</span>
          </div>
          <h1 className="text-4xl md:text-6xl leading-[1.1]">
            {article.title}
          </h1>
          <p className="text-xl text-white/75 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        <div className="flex flex-col gap-6 text-lg text-white/80 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-wrap">
              {p}
            </p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
