import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Talitrix ONE | The Unified Ecosystem",
  description:
    "Talitrix ONE is a closed-loop ecosystem connecting hardware, software, and behavioral intelligence into one continuous platform — built for the full justice lifecycle.",
};

const modules = [
  {
    id: "tband",
    number: "01",
    eyebrow: "The Hardware",
    title: "T-Band (PhoenixBand)",
    headline: "Dignity by Design.",
    body: "The T-Band is the first independent wrist-worn GPS monitoring device in the industry. Designed to operate inside and outside the walls, it eliminates the need for multiple vendors or device types. Multi-carrier SIM connectivity provides redundancy, alongside biometric sensors that monitor heart rate and blood oxygen (SpO₂). For community supervision, it utilizes proximity-based skin detection — checking for contact approximately 20 times per second — triggering biometric verification only if a disruption is detected. The outcome: high-confidence tamper detection with optimized performance, battery life, and reliability — all while treating the person wearing it with dignity.",
    bullets: [
      "Independent wrist-worn GPS monitoring",
      "Multi-carrier SIM redundancy",
      "Heart rate & SpO₂ biometric sensing",
      "Proximity-based skin detection (~20Hz)",
      "Tamper-resistant, dignified form factor",
    ],
  },
  {
    id: "intake",
    number: "02",
    eyebrow: "ONE Intake",
    title: "The Starting Point for Continuity.",
    headline: "Intake that powers every downstream module.",
    body: "ONE Intake centralizes booking and intake processing, establishing the identity, classification, and initial assessments for every individual entering the system. As the foundation for every downstream ONE module, it ensures that accurate, comprehensive data is captured once and carried forward across the system, ultimately reducing administrative burden and preventing information gaps.",
    bullets: [
      "Centralized booking & identity verification",
      "Standardized classification & risk assessment",
      "Single record carried across the lifecycle",
      "Reduced administrative friction",
      "Eliminated re-entry and data gaps",
    ],
  },
  {
    id: "jail",
    number: "03",
    eyebrow: "ONE Jail Management",
    title: "Connected Operations Inside the Facility.",
    headline: "Inside the walls, on one continuous system.",
    body: "ONE Jail Management System (JMS) brings the full custody lifecycle into one connected system — giving facility staff the visibility to manage daily operations with greater continuity, accountability, and efficiency. When paired with the Talitrix T-Band, JMS extends that visibility into participant movement, wellness, and facility activity, creating a more complete picture of what's happening inside the walls to support safer facilities and stronger operational decision-making.",
    bullets: [
      "Real-time housing & movement visibility",
      "Incident tracking & compliance reporting",
      "Wellness telemetry via T-Band",
      "Operational dashboards & audit trails",
      "Unified record across custody lifecycle",
    ],
  },
  {
    id: "probation",
    number: "04",
    eyebrow: "ONE Pre-Trial & Probation",
    title: "End-to-End Community Supervision.",
    headline: "Outside the walls. Same continuous platform.",
    body: "ONE Pre-Trial & Probation brings all participant populations into one connected system — whether they are on electronic monitoring or not. By unifying case management, risk tracking, and compliance reporting in one place, agencies gain clearer visibility across caseloads and more time to focus on intervention, accountability, and outcomes.",
    bullets: [
      "Single system for monitored & non-monitored participants",
      "Unified case management & compliance",
      "Risk tracking and intervention tooling",
      "Court-ready documentation",
      "Caseload visibility across teams",
    ],
  },
  {
    id: "score",
    number: "05",
    eyebrow: "The Talitrix Score",
    title: "Behavioral Intelligence and Defensible Data.",
    headline: "Move from reactive supervision to proactive intervention.",
    body: "The Talitrix Score transforms behavioral data into measurable intelligence, giving supervision teams earlier visibility into risk, stronger context for intervention, and a defensible record of participant behavior over time. By connecting alerts, activity, and intervention history into one continuous view, agencies can make more informed decisions and strengthen accountability across supervision.",
    bullets: [
      "Continuous behavioral signal aggregation",
      "Earlier risk identification",
      "Transparent, explainable scoring",
      "Court-admissible evidentiary record",
      "Expert witness support available",
    ],
  },
];

export default function TalitrixOnePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageHero
        eyebrow="The Platform"
        title={
          <>
            Talitrix ONE.
            <br />
            <span className="text-white/60">The Unified Ecosystem.</span>
          </>
        }
        subtitle="A connected ecosystem built for the full justice lifecycle."
        body={
          <p>
            Talitrix ONE is a closed-loop ecosystem that connects hardware,
            software, and behavioral intelligence into one continuous
            platform. Built to support the full justice lifecycle, its modular
            architecture allows agencies to deploy what they need while
            maintaining continuity across facilities, supervision teams, and
            community-based programs.
          </p>
        }
      >
        <div className="flex flex-wrap gap-4 mt-10">
          <CTAButton href="/get-started">Request a Briefing</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Contact Sales
          </CTAButton>
        </div>
      </PageHero>

      <section className="relative px-16 py-24 border-b border-border-gray">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
          {modules.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="bg-background p-8 flex flex-col gap-3 hover:bg-white/5 transition-colors min-h-[180px]"
            >
              <span className="text-xs text-white/40 tracking-widest">
                {m.number}
              </span>
              <span className="text-primary text-xs uppercase tracking-widest">
                {m.eyebrow}
              </span>
              <h3 className="text-lg leading-tight">{m.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {modules.map((m, i) => (
        <section
          key={m.id}
          id={m.id}
          className={`relative px-16 py-32 border-b border-border-gray overflow-hidden ${
            i % 2 === 1 ? "bg-white/[0.02]" : ""
          }`}
        >
          <div
            className={`absolute pointer-events-none ${
              i % 2 === 0
                ? "-top-40 -left-32 w-[600px] h-[600px]"
                : "-bottom-40 -right-32 w-[600px] h-[600px]"
            } bg-primary/10 blur-[180px]`}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs text-white/40 tracking-widest">
                {m.number} · {m.eyebrow}
              </span>
              <h2 className="text-4xl md:text-5xl leading-tight">
                {m.headline}
              </h2>
              <h3 className="text-xl text-primary mt-4">{m.title}</h3>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8">
              <p className="text-lg text-white/75 leading-relaxed">{m.body}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {m.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm text-white/80 border border-border-gray rounded-lg p-4 bg-white/[0.02]"
                  >
                    <span className="text-primary">✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <CTAButton href="/get-started" variant="ghost">
                  Request a deep dive
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="relative px-16 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Deploy the New Standard
          </span>
          <h2 className="text-4xl md:text-6xl leading-[1.1] mb-8">
            The future of supervision starts here.
          </h2>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
            One unified platform, behavioral intelligence, and operational
            efficiency — helping agencies act earlier, work smarter, and
            improve outcomes for participants and the communities they serve.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/solutions" variant="secondary">
              View Solutions
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
