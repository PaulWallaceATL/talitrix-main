import Link from "next/link";
import KnowledgeEditor from "../KnowledgeEditor";

export default function NewKnowledgePage() {
  return (
    <div className="px-6 py-8 md:px-12 md:py-12 max-w-4xl">
      <header className="mb-8 md:mb-10">
        <Link
          href="/admin/knowledge"
          className="text-xs text-white/50 hover:text-primary"
        >
          ← All knowledge
        </Link>
        <h1 className="text-3xl sm:text-4xl mt-4">New Knowledge Entry</h1>
        <p className="text-white/60 mt-3 max-w-2xl">
          Anything you save here flows into the AI newsroom writer the next
          time it generates ideas, briefs, or full articles.
        </p>
      </header>

      <KnowledgeEditor mode="create" />
    </div>
  );
}
