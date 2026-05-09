import Link from "next/link";
import ArticleEditor from "../ArticleEditor";

export default function NewArticlePage() {
  return (
    <div className="px-12 py-12 max-w-4xl">
      <header className="mb-10">
        <Link
          href="/admin/news"
          className="text-xs text-white/50 hover:text-primary"
        >
          ← All articles
        </Link>
        <h1 className="text-4xl mt-4">New Article</h1>
        <p className="text-white/60 mt-3">
          When published, this article appears on the public{" "}
          <span className="text-primary">/news</span> page immediately.
        </p>
      </header>

      <ArticleEditor mode="create" />
    </div>
  );
}
