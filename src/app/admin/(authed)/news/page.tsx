import Link from "next/link";
import { supabaseAdmin, type NewsArticle } from "@/lib/supabase";
import DeleteArticleButton from "./DeleteArticleButton";
import AutoGeneratePanel from "./AutoGeneratePanel";

export const dynamic = "force-dynamic";

async function getArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabaseAdmin()
    .from("news_articles")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as NewsArticle[];
}

export default async function AdminNewsPage() {
  let articles: NewsArticle[] = [];
  let envError: string | null = null;
  try {
    articles = await getArticles();
  } catch (err) {
    envError = err instanceof Error ? err.message : String(err);
  }

  return (
    <div className="px-12 py-12 max-w-6xl">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            News
          </span>
          <h1 className="text-4xl mt-2">Articles</h1>
          <p className="text-white/60 mt-3 max-w-xl">
            Create, edit, publish, and delete the articles that appear at{" "}
            <span className="text-primary">/news</span>.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="px-6 py-3 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 text-sm"
          style={{
            boxShadow:
              "0px 19px 65.2px rgba(248, 122, 19, 0.2), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
          }}
        >
          + New Article
        </Link>
      </header>

      {envError && (
        <div className="mb-8 p-6 rounded-2xl border border-red-500/40 bg-red-500/5 text-red-200 text-sm">
          {envError}
        </div>
      )}

      <div className="mb-10">
        <AutoGeneratePanel />
      </div>

      {!envError && articles.length === 0 ? (
        <div className="p-10 rounded-2xl border border-border-gray bg-white/[0.02] text-white/60 text-sm">
          No articles yet. Create your first one to publish it to{" "}
          <span className="text-primary">/news</span>.
        </div>
      ) : (
        <div className="rounded-2xl border border-border-gray overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-white/60 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Category</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Published</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-border-gray hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-white">
                        {a.title}
                        {a.featured && (
                          <span className="ml-2 inline-block text-[10px] uppercase tracking-widest text-primary border border-primary/40 rounded-full px-2 py-0.5">
                            Featured
                          </span>
                        )}
                      </span>
                      <span className="text-white/40 text-xs">/{a.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">{a.category}</td>
                  <td className="px-6 py-4">
                    {a.published ? (
                      <span className="text-emerald-400">Published</span>
                    ) : (
                      <span className="text-white/40">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    {a.published_at
                      ? new Date(a.published_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <Link
                        href={`/news/${a.slug}`}
                        target="_blank"
                        className="text-xs text-white/50 hover:text-primary"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/news/${a.id}/edit`}
                        className="text-xs text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteArticleButton id={a.id} title={a.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
