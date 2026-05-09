import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin, type NewsArticle } from "@/lib/supabase";
import ArticleEditor from "../../ArticleEditor";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditArticlePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin()
    .from("news_articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  const article = data as NewsArticle;

  return (
    <div className="px-12 py-12 max-w-4xl">
      <header className="mb-10">
        <Link
          href="/admin/news"
          className="text-xs text-white/50 hover:text-primary"
        >
          ← All articles
        </Link>
        <h1 className="text-4xl mt-4">Edit Article</h1>
        <p className="text-white/60 mt-3">
          Public URL:{" "}
          <Link
            href={`/news/${article.slug}`}
            target="_blank"
            className="text-primary hover:underline"
          >
            /news/{article.slug}
          </Link>
        </p>
      </header>

      <ArticleEditor mode="edit" article={article} />
    </div>
  );
}
