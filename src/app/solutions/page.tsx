import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Solutions | Talitrix",
  description:
    "Talitrix solutions for Sheriffs, Pretrial & Community Supervision Leaders, Courts & Legal Professionals, and Participants — built around the realities of modern supervision.",
};

const segments = [
  {
    id: "sheriffs",
    number: "01",
    eyebrow: "For Sheriffs & Agency Leaders",
    headline: "Decisions You Can Stand Behind.",
    subheadline:
      "Accountability, operational efficiency, and public safety outcomes.",
    body: "Talitrix ONE provides the operational visibility agencies need to manage population pressure, strengthen program oversight, and improve efficiency across supervision. By connecting participant activity, compliance records, and case history in one system, Talitrix creates a secure, defensible record behind every decision — helping agencies operate with greater accountability under scrutiny and stronger protection for the communities they serve.",
    bullets: [
      "Operational visibility across the full agency",
      "Population & program pressure management",
      "Defensible record for every decision",
      "Stronger accountability under scrutiny",
    ],
  },
  {
    id: "pretrial",
    number: "02",
    eyebrow: "For Pretrial & Community Supervision Leaders",
    headline: "Proactive Intervention, Not Reactive Administration.",
    subheadline:
      "Manage high caseloads with confidence and clarity.",
    body: "Effective supervision depends on having the full picture in one place. Talitrix ONE gives supervision teams a single, unified view of participant activity, compliance, and case history — reducing administrative friction and improving operational efficiency. With the Supervisor T-App, teams have instant access to live compliance data and court-ready documentation, creating more time for active case management, earlier intervention, and stronger participant outcomes.",
    bullets: [
      "Unified participant activity & compliance view",
      "Supervisor T-App for live field access",
      "Reduced administrative friction",
      "Court-ready documentation, on demand",
    ],
  },
  {
    id: "courts",
    number: "03",
    eyebrow: "For Courts & Legal Professionals",
    headline: "Data Integrity and Institutional Credibility.",
    subheadline:
      "Court-admissible documentation and defensible behavioral intelligence.",
    body: "Every supervision decision depends on what can be seen, documented, and defended. Talitrix captures behavioral data and supervision records through a secure chain of custody, creating a clear and reliable record for legal review. The Talitrix Score is transparent, explainable, and backed by expert witness support, giving courts greater confidence in sentencing and supervision decisions.",
    bullets: [
      "Secure chain of custody for evidentiary data",
      "Transparent, explainable Talitrix Score",
      "Expert witness support",
      "Reliable record for legal review",
    ],
  },
  {
    id: "participants",
    number: "04",
    eyebrow: "For Participants",
    headline: "Support, Clarity, and Dignity.",
    subheadline:
      "A system designed to help participants succeed.",
    body: "Talitrix removes the barriers between people committed to rebuilding their lives and the support they need to do it. The T-Band is designed to be worn without broadcasting justice involvement, preserving dignity in the workplace and community. The Talitrix Participant App serves as a compliance support tool, providing proactive alerts and clear communication to help participants understand their obligations and correct behavior before a violation is recorded.",
    bullets: [
      "Wrist-worn T-Band designed for dignity",
      "Participant App: clarity & support",
      "Proactive alerts before violations",
      "Pathway designed for success",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Built for the
            <br />
            people who run it.
          </>
        }
        subtitle="Talitrix ONE is shaped by the realities of the agencies, courts, and participants it serves."
        body={
          <p>
            Modern supervision demands more than another point solution. It
            demands continuity — and a platform that adapts to the operational
            realities of every stakeholder in the lifecycle.
          </p>
        }
      >
        <div className="flex flex-wrap gap-4 mt-10">
          <CTAButton href="/get-started">Request a Briefing</CTAButton>
          <CTAButton href="/talitrix-one" variant="secondary">
            Explore the Platform
          </CTAButton>
        </div>
      </PageHero>

      <section className="relative px-16 py-24 border-b border-border-gray">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
          {segments.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="bg-background p-8 flex flex-col gap-3 hover:bg-white/5 transition-colors min-h-[180px]"
            >
              <span className="text-xs text-white/40 tracking-widest">
                {s.number}
              </span>
              <span className="text-primary text-xs uppercase tracking-widest">
                {s.eyebrow.replace("For ", "")}
              </span>
              <h3 className="text-lg leading-tight">{s.headline}</h3>
            </a>
          ))}
        </div>
      </section>

      {segments.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`relative px-16 py-32 border-b border-border-gray overflow-hidden ${
            i % 2 === 1 ? "bg-white/[0.02]" : ""
          }`}
        >
          <div
            className={`absolute pointer-events-none w-[600px] h-[600px] bg-primary/10 blur-[180px] ${
              i % 2 === 0 ? "-top-40 -right-32" : "-bottom-40 -left-32"
            }`}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs text-white/40 tracking-widest">
                {s.number}
              </span>
              <span className="text-primary text-xs uppercase tracking-[0.3em]">
                {s.eyebrow}
              </span>
              <h2 className="text-4xl md:text-5xl leading-tight mt-2">
                {s.headline}
              </h2>
              <p className="text-white/65 text-lg mt-4">{s.subheadline}</p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8">
              <p className="text-lg text-white/75 leading-relaxed">{s.body}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm text-white/80 border border-border-gray rounded-lg p-4 bg-white/[0.02]"
                  >
                    <span className="text-primary">✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex gap-6">
                <CTAButton href="/get-started" variant="ghost">
                  Request a briefing
                </CTAButton>
                <CTAButton href="/contact" variant="ghost">
                  Talk with our team
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="relative px-16 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-6xl leading-[1.1] mb-8">
            One platform.
            <br />
            <span className="text-white/60">
              Every stakeholder in the lifecycle.
            </span>
          </h2>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
            See how Talitrix ONE adapts to your agency's reality and your
            community's outcomes.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Contact Sales
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
