import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import HalftoneWave from "@/components/react-bits/halftone-wave";
import CapabilitiesScroller from "@/components/CapabilitiesScroller";
import BandSupervisionSection from "@/components/BandSupervisionSection";

export const metadata: Metadata = {
  title: "ONE Jail Management System (JMS) | Talitrix ONE",
  description:
    "ONE Jail Management System brings the full custody lifecycle into one connected system — visibility into housing, movement, wellness, and operations, especially when paired with the All-In-One Band.",
};

const phases = [
  {
    phase: "Custody Lifecycle",
    body: "Booking through release on a single connected system — every event captured in one place.",
  },
  {
    phase: "Movement Visibility",
    body: "When paired with the All-In-One Band, JMS extends visibility into participant movement across the facility.",
  },
  {
    phase: "Wellness Telemetry",
    body: "Heart rate and SpO₂ telemetry from the All-In-One Band surfaces wellness signals that staff can act on.",
  },
  {
    phase: "Operational Decisions",
    body: "Dashboards and audit trails support safer facilities and stronger operational decision-making.",
  },
];

const features = [
  {
    title: "ONE Intake",
    body: "Centralized booking, identity, classification, and initial assessments — captured once and carried forward across the custody lifecycle.",
    icon: "doorOpen",
  },
  {
    title: "Connected Operations",
    body: "Daily operations managed with greater continuity, accountability, and efficiency on one system.",
    icon: "network",
  },
  {
    title: "Real-Time Housing & Movement",
    body: "See where people are, when they moved, and what's happening in each housing unit — live.",
    icon: "mapPin",
  },
  {
    title: "Reduced Administrative Burden",
    body: "Less paperwork, fewer duplicate fields, and less time at the booking desk for staff and participants.",
    icon: "fileMinus",
  },
  {
    title: "Incident & Compliance",
    body: "Capture incidents, track responses, and produce compliance reports without leaving the system.",
    icon: "shieldAlert",
  },
  {
    title: "Unified Custody Records",
    body: "JMS shares its record with ONE Pre-Trial, ONE Probation, and the Talitrix Score — one continuous picture.",
    icon: "database",
  },
];

export default function JailManagementPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="ONE Jail Management System"
        title={
          <StaggeredText
            as="h1"
            text={"Connected Operations\nInside the Facility."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        body={
          <p>
            The full custody lifecycle on one connected system — managing
            housing, movement, incidents, and compliance with the visibility
            and accountability modern facilities need.
          </p>
        }
        background={
          <HalftoneWave
            colorA="#f87a13"
            colorB="#ff9a4d"
            backgroundColor="#000000"
            speed={0.55}
            gridDensity={70}
            dotSize={0.42}
            softness={1.3}
            opacity={0.85}
            rotation={10}
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
            What JMS Connects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 leading-tight max-w-2xl">
            Four pillars of facility operations.
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
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              The full custody lifecycle on one platform.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              JMS replaces the patchwork of point tools with a single connected
              system — and gets stronger when paired with the Talitrix All-In-One Band.
            </p>
          </div>
        </div>

        <CapabilitiesScroller features={features} />
      </section>

      <BandSupervisionSection />

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            Safer facilities. Stronger decisions.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See how ONE JMS extends with the All-In-One Band and connects to Pre-Trial
            & Probation across the lifecycle.
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
