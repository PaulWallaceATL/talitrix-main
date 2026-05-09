import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Services | Talitrix",
  description:
    "Talitrix delivers a complete service model — implementation, training, integration, expert witness support, and 24/7 monitoring — so agencies operate with confidence from day one.",
};

const services = [
  {
    number: "01",
    title: "Implementation & Deployment",
    body: "A guided rollout aligned to your agency's operational realities — from intake configuration to in-field T-Band fitting. We deliver the plan, the people, and the playbooks.",
    items: [
      "Project planning & milestone mapping",
      "Hardware provisioning & logistics",
      "Configuration of ONE Intake, JMS, and Probation modules",
      "Pilot, parallel-run, and full cutover support",
    ],
  },
  {
    number: "02",
    title: "Training & Enablement",
    body: "Role-based training programs ensure every user — supervisors, officers, command staff, and IT — operates the platform with confidence on day one.",
    items: [
      "Officer & supervisor T-App training",
      "Command staff dashboard training",
      "On-site, virtual, and on-demand options",
      "Certification & continuing education tracks",
    ],
  },
  {
    number: "03",
    title: "Integration & Interoperability",
    body: "Talitrix ONE is built to work with the systems your agency already trusts. Our integration team connects to RMS, JMS, court calendaring, identity, and state systems with documented chain-of-custody.",
    items: [
      "Records, court, and CJIS-compliant integrations",
      "Identity provider & SSO support",
      "Public-safety partner ecosystem",
      "Documented data lineage & audit trails",
    ],
  },
  {
    number: "04",
    title: "24/7 Monitoring Center",
    body: "Talitrix-operated monitoring, escalation, and alert triage — staffed by trained operators who know the platform end-to-end. A force multiplier for agencies of any size.",
    items: [
      "Real-time alert triage",
      "Tiered escalation playbooks",
      "Documented incident timelines",
      "Coverage available 24/7/365",
    ],
  },
  {
    number: "05",
    title: "Expert Witness Support",
    body: "When supervision evidence enters the courtroom, the record must hold up. Our expert witness team supports prosecutors, defense, and judges with credible, transparent testimony grounded in the Talitrix Score and chain of custody.",
    items: [
      "Court-admissible documentation",
      "Talitrix Score explainability",
      "Pre-trial and trial preparation",
      "Independent expert testimony",
    ],
  },
  {
    number: "06",
    title: "Customer Success",
    body: "Dedicated success managers ensure ongoing alignment between platform capabilities and agency outcomes — from quarterly business reviews to operational tuning.",
    items: [
      "Named success manager",
      "Quarterly business reviews",
      "Outcomes & KPI reporting",
      "Roadmap & feature prioritization",
    ],
  },
];

const phases = [
  { phase: "Discover", body: "Operational walk-through, stakeholder alignment, and outcomes mapping." },
  { phase: "Design", body: "Configuration, integration plan, training plan, and cutover strategy." },
  { phase: "Deploy", body: "Hardware logistics, parallel run, training delivery, and go-live." },
  { phase: "Drive", body: "Ongoing optimization, customer success, and outcomes measurement." },
];

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageHero
        eyebrow="Services"
        title={
          <>
            More than software.
            <br />
            <span className="text-white/60">A complete service model.</span>
          </>
        }
        subtitle="Talitrix delivers the people, the playbooks, and the partnership behind every deployment."
        body={
          <p>
            Modern supervision technology only works when it operates inside
            the realities of the agencies that use it. That's why every
            Talitrix engagement is supported by a service model designed for
            confidence on day one — and for outcomes that hold up over time.
          </p>
        }
      >
        <div className="flex flex-wrap gap-4 mt-10">
          <CTAButton href="/get-started">Request a Briefing</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Talk with our team
          </CTAButton>
        </div>
      </PageHero>

      <section className="relative px-16 py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[700px] h-[700px] bg-primary/10 blur-[200px] pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            The Talitrix Engagement Model
          </span>
          <h2 className="text-4xl md:text-5xl mb-16 leading-tight max-w-2xl">
            Four phases. One continuous partnership.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
            {phases.map((p, i) => (
              <div
                key={p.phase}
                className="bg-background p-8 flex flex-col gap-4 min-h-[220px]"
              >
                <span className="text-primary text-sm tracking-widest">
                  0{i + 1}
                </span>
                <h3 className="text-2xl">{p.phase}</h3>
                <p className="text-white/65 leading-relaxed text-sm">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-16 py-32 border-b border-border-gray">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Service Lines
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              The full service stack.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              Every service line is delivered by Talitrix or a vetted partner —
              with documented playbooks, defined SLAs, and accountability for
              outcomes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-background p-8 flex flex-col gap-4 min-h-[400px]"
            >
              <span className="text-xs text-white/40 tracking-widest">
                {s.number}
              </span>
              <h3 className="text-2xl text-primary">{s.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm">{s.body}</p>
              <ul className="flex flex-col gap-2 mt-2">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-white/70"
                  >
                    <span className="text-primary mt-0.5">·</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-16 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-6xl leading-[1.1] mb-8">
            Built to operate. Designed to last.
          </h2>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
            See how Talitrix services translate into operational outcomes
            inside your agency.
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
