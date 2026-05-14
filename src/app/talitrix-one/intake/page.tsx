import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import SynapticShift from "@/components/react-bits/synaptic-shift";
import CapabilitiesScroller from "@/components/CapabilitiesScroller";

export const metadata: Metadata = {
  title: "ONE Intake | Talitrix ONE",
  description:
    "ONE Intake centralizes booking and intake processing — establishing identity, classification, and assessments captured once and carried forward across the system.",
};

const phases = [
  {
    phase: "Identity",
    body: "Verified identity capture establishes a single record from the moment a person enters the system.",
  },
  {
    phase: "Classification",
    body: "Standardized classification and risk frameworks are applied consistently across every intake.",
  },
  {
    phase: "Assessments",
    body: "Initial assessments are collected once at intake and shared with downstream modules — never re-entered.",
  },
  {
    phase: "Continuity",
    body: "The intake record carries forward into JMS, Pre-Trial & Probation, and the Talitrix Score automatically.",
  },
];

const features = [
  {
    title: "One Record, Carried Forward",
    body: "Captured once at intake and propagated to every downstream Talitrix ONE module — no re-entry, no drift.",
  },
  {
    title: "Standardized Risk & Classification",
    body: "Consistent application of agency risk and classification logic across booking and re-bookings.",
  },
  {
    title: "Reduced Administrative Burden",
    body: "Less paperwork, fewer duplicate fields, and less time at the booking desk for staff and participants.",
  },
  {
    title: "No Information Gaps",
    body: "Closes the gap between booking, custody, and supervision so nothing is missed in handoff.",
  },
  {
    title: "Audit-Ready by Default",
    body: "Every intake captures a defensible chain of custody for the data — useful in court and oversight reviews.",
  },
  {
    title: "Configurable to Your Process",
    body: "Aligns to your agency's existing classification matrix and intake workflow — not a forced rewrite.",
  },
];

export default function IntakePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="ONE Intake"
        title={
          <StaggeredText
            as="h1"
            text={"ONE Intake.\nThe Starting Point for Continuity."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="Intake that powers every downstream module."
        body={
          <p>
            ONE Intake centralizes booking and intake processing, establishing
            the identity, classification, and initial assessments for every
            individual entering the system. As the foundation for every
            downstream ONE module, it ensures that accurate, comprehensive
            data is captured once and carried forward across the system —
            ultimately reducing administrative burden and preventing
            information gaps.
          </p>
        }
        background={
          <SynapticShift
            color="#f87a13"
            speed={0.45}
            scale={0.55}
            intensity={1.6}
            falloff={1.2}
            complexity={9}
            breathing
          />
        }
      >
        <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
          <CTAButton scrollTo="learn-more">Learn More</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Contact Sales
          </CTAButton>
        </div>
      </ShaderHero>

      <section
        id="learn-more"
        className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden scroll-mt-24 lg:scroll-mt-32"
      >
        <div className="absolute -top-40 -right-32 w-[700px] h-[700px] bg-primary/10 blur-[200px] pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            The Intake Flow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 leading-tight max-w-2xl">
            Captured once. Carried forward.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
            {phases.map((p, i) => (
              <div
                key={p.phase}
                className="bg-background p-6 sm:p-8 flex flex-col gap-4 min-h-[200px] sm:min-h-[220px]"
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

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Why It Matters
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              The first record sets the tone for every record that follows.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Get intake right and every downstream system inherits accurate,
              defensible, and complete data — without the duplication that
              drags down agency operations.
            </p>
          </div>
        </div>

        <CapabilitiesScroller features={features} />
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            Continuity starts at intake.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See how ONE Intake plugs into the rest of Talitrix ONE — from
            jail management to community supervision and the Talitrix Score.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/talitrix-one" variant="secondary">
              Explore Talitrix ONE
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
