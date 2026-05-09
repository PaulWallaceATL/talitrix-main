import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getCounts() {
  const sb = supabaseAdmin();
  const [news, contact, getStarted, registration] = await Promise.all([
    sb.from("news_articles").select("*", { count: "exact", head: true }),
    sb.from("contact_submissions").select("*", { count: "exact", head: true }),
    sb
      .from("get_started_submissions")
      .select("*", { count: "exact", head: true }),
    sb
      .from("participant_registrations")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    news: news.count ?? 0,
    contact: contact.count ?? 0,
    getStarted: getStarted.count ?? 0,
    registration: registration.count ?? 0,
  };
}

export default async function AdminDashboard() {
  let counts: Awaited<ReturnType<typeof getCounts>> | null = null;
  let envError: string | null = null;
  try {
    counts = await getCounts();
  } catch (err) {
    envError = err instanceof Error ? err.message : String(err);
  }

  const cards = [
    {
      label: "News Articles",
      href: "/admin/news",
      count: counts?.news ?? 0,
      cta: "Manage articles",
    },
    {
      label: "Contact Submissions",
      href: "/admin/submissions/contact",
      count: counts?.contact ?? 0,
      cta: "View submissions",
    },
    {
      label: "Get Started Briefings",
      href: "/admin/submissions/get-started",
      count: counts?.getStarted ?? 0,
      cta: "View briefings",
    },
    {
      label: "Participant Registrations",
      href: "/admin/submissions/participant-registration",
      count: counts?.registration ?? 0,
      cta: "View registrations",
    },
  ];

  return (
    <div className="px-12 py-12 max-w-6xl">
      <header className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">
          Overview
        </span>
        <h1 className="text-4xl mt-2">Dashboard</h1>
        <p className="text-white/60 mt-3 max-w-2xl">
          Manage news articles and review every submission from the public
          forms.
        </p>
      </header>

      {envError && (
        <div className="mb-8 p-6 rounded-2xl border border-red-500/40 bg-red-500/5 text-red-200 text-sm">
          <strong className="block mb-2">Supabase not configured.</strong>
          {envError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group p-8 rounded-2xl border border-border-gray bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-colors flex flex-col gap-4"
          >
            <span className="text-xs uppercase tracking-widest text-white/50">
              {c.label}
            </span>
            <span className="text-5xl">{c.count}</span>
            <span className="mt-auto text-primary text-sm inline-flex gap-2 items-center group-hover:gap-3 transition-all">
              {c.cta} <span>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
