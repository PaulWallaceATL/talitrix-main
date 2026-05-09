import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Link from "next/link";
import StaggeredText from "@/components/react-bits/staggered-text";
import HalftoneWave from "@/components/react-bits/halftone-wave";
import FrameBorder from "@/components/react-bits/frame-border";

export const metadata: Metadata = {
  title: "News | Talitrix",
  description:
    "Announcements, briefings, and field reports from Talitrix — the team setting the new standard in monitoring and supervision technology.",
};

const featured = {
  category: "Announcement",
  date: "May 2026",
  title:
    "Talitrix unveils the T-Band — the first independent wrist-worn GPS supervision device.",
  excerpt:
    "The T-Band brings continuous biometric, location, and tamper-detection capabilities into one dignified, wrist-worn form factor — purpose-built for the realities of modern community supervision.",
  href: "/news/t-band-launch",
};

const articles = [
  {
    category: "Platform",
    date: "April 2026",
    title:
      "Talitrix ONE: a unified ecosystem for the full justice lifecycle.",
    excerpt:
      "Inside the architecture connecting hardware, software, and behavioral intelligence into one continuous platform.",
    href: "/news/talitrix-one-overview",
  },
  {
    category: "Field Report",
    date: "April 2026",
    title:
      "From reactive supervision to proactive intervention — early outcomes from pilot agencies.",
    excerpt:
      "Six pilot agencies report improvements in caseload visibility, intervention timing, and documentation quality during the first 90 days on Talitrix ONE.",
    href: "/news/pilot-outcomes",
  },
  {
    category: "Perspective",
    date: "March 2026",
    title:
      "Dignity by Design: rebuilding the category from the wrist up.",
    excerpt:
      "Why Talitrix moved electronic monitoring back to the original, rehabilitative vision — and what that means for participants, supervisors, and communities.",
    href: "/news/dignity-by-design",
  },
  {
    category: "Engineering",
    date: "March 2026",
    title:
      "Multi-carrier SIM, 20Hz skin-detection, and the path to high-confidence tamper detection.",
    excerpt:
      "A look inside the engineering decisions behind the T-Band's reliability, battery life, and biometric verification flow.",
    href: "/news/engineering-tband",
  },
  {
    category: "Courts",
    date: "February 2026",
    title:
      "Talitrix Score: explainable behavioral intelligence for the courtroom.",
    excerpt:
      "How Talitrix translates participant behavior into transparent, defensible data — and what courts need to know about admissibility and chain of custody.",
    href: "/news/talitrix-score-courts",
  },
  {
    category: "Company",
    date: "January 2026",
    title:
      "Setting the global standard: Talitrix expands its leadership team.",
    excerpt:
      "New additions across product, engineering, and customer success accelerate the company's mission to redefine modern supervision.",
    href: "/news/leadership-expansion",
  },
];

export default function NewsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="relative w-full overflow-hidden border-b border-border-gray">
        <div className="absolute inset-0 z-0 opacity-60">
          <HalftoneWave
            colorA="#f87a13"
            colorB="#ffba80"
            backgroundColor="#000000"
            speed={0.5}
            gridDensity={90}
            dotSize={0.42}
            softness={1.4}
            opacity={0.85}
            rotation={15}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

        <div className="relative z-10 px-16 pt-48 pb-32 max-w-7xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            News
          </span>
          <StaggeredText
            as="h1"
            text={"Field reports.\nFrom the new standard."}
            className="text-5xl md:text-7xl leading-[1.05] mb-6"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
            Announcements, briefings, and perspective from the team setting
            the new standard in monitoring and supervision technology.
          </p>
        </div>
      </section>

      <section className="relative px-16 py-24 border-b border-border-gray overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[700px] h-[700px] bg-primary/10 blur-[200px] pointer-events-none" />

        <Link href={featured.href} className="relative z-10 block group">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
              <FrameBorder
                color="#f87a13"
                backgroundColor="#000000"
                speed={0.7}
                borderWidth={0.06}
                noiseStrength={0.5}
                intensity={1.4}
                opacity={0.85}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 border border-border-gray rounded-2xl p-12 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors">
              <div className="lg:col-span-3 flex flex-col gap-3">
                <span className="text-primary text-xs uppercase tracking-[0.3em]">
                  Featured · {featured.category}
                </span>
                <span className="text-white/50 text-sm">{featured.date}</span>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-6">
                <h2 className="text-3xl md:text-5xl leading-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                  {featured.excerpt}
                </p>
                <div className="pt-2">
                  <span className="text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read the announcement
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="relative px-16 py-24 border-b border-border-gray">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
              The Latest
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Recent stories.
            </h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            {[
              "All",
              "Platform",
              "Field Report",
              "Perspective",
              "Engineering",
              "Courts",
            ].map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                  i === 0
                    ? "border-primary text-primary"
                    : "border-border-gray text-white/65 hover:text-white hover:border-white/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
          {articles.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="bg-background p-8 flex flex-col gap-4 min-h-[280px] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-center justify-between text-xs text-white/50">
                <span className="text-primary tracking-widest uppercase">
                  {a.category}
                </span>
                <span>{a.date}</span>
              </div>
              <h3 className="text-xl leading-tight group-hover:text-primary transition-colors">
                {a.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed line-clamp-4">
                {a.excerpt}
              </p>
              <div className="mt-auto pt-2">
                <span className="text-primary text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read more <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative px-16 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <h2 className="text-4xl md:text-5xl leading-[1.1] mb-6">
              Stay close to the work.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Briefings, field reports, and announcements — directly from the
              Talitrix team. No marketing noise.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full lg:justify-end">
            <input
              type="email"
              required
              placeholder="you@agency.gov"
              className="flex-1 px-6 py-4 bg-white/[0.05] border border-border-gray rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15"
              style={{
                boxShadow:
                  "0px 19px 65.2px rgba(248, 122, 19, 0.15), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
