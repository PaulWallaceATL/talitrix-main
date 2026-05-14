import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import CapabilitiesScroller from "@/components/CapabilitiesScroller";
import FeaturesShowcase, {
  type FeatureShowcaseItem,
} from "@/components/FeaturesShowcase";
import { orangeAurora, blackSky } from "@/components/AuroraPresets";

export const metadata: Metadata = pageMetadata({
  path: "/talitrix-one/probation",
  title:
    "ONE Probation | Talitrix ONE",
  description:
    "ONE Probation brings every probation participant — monitored or not — into one connected system. Caseload management, long-term tracking, continuous risk signals, and earlier intervention in a single platform.",
  socialDescription:
    "Caseload management, long-term tracking, continuous risk signals, and earlier intervention in one platform.",
});

const phases: FeatureShowcaseItem[] = [
  {
    title: "Caseload Management",
    short: "All cases in one place",
    description:
      "Case files, conditions, contacts, and notes managed in one place across the whole probation team — every officer working from the same record.",
    bullets: [
      "Single record per participant across the team",
      "Conditions, contacts, and notes in one workflow",
      "Built-in handoff visibility — no missing context",
    ],
    icon: "users",
  },
  {
    title: "Long-Term Tracking",
    short: "Sentence and treatment progress",
    description:
      "Track sentence progress, treatment milestones, restitution, and program completion over the full supervision period — with the durability needed for multi-year cases.",
    bullets: [
      "Sentence progress and milestones in one timeline",
      "Treatment, restitution, and program completion tracked",
      "Built for multi-year, long-term supervision cases",
    ],
    icon: "calendarCheck",
  },
  {
    title: "Risk Tracking",
    short: "Continuous compliance signals",
    description:
      "Continuous risk and compliance signals — including telemetry from the All-In-One Band and the Talitrix Score where applicable — surfaced where probation teams already work.",
    bullets: [
      "Live signals from the All-In-One Band",
      "Talitrix Score factored into every officer view",
      "Trend changes visible before they become violations",
    ],
    icon: "trendingUp",
  },
  {
    title: "Earlier Intervention",
    short: "Surface trends early",
    description:
      "Surface trend changes early so probation officers can intervene before a violation is recorded — supporting outcomes-focused supervision instead of reactive paperwork.",
    bullets: [
      "Trend alerts before condition gaps escalate",
      "Officer-facing notifications, not after-the-fact reports",
      "Outcome-focused workflow built around the participant",
    ],
    icon: "bell",
  },
];

const features = [
  {
    title: "End-to-End Community Supervision",
    body: "All probation populations — monitored or not — on a single connected platform.",
    icon: "route",
  },
  {
    title: "Caseload Visibility Across Teams",
    body: "Supervisors and officers share a single view — no handoff gaps or system swaps.",
    icon: "users",
  },
  {
    title: "Outcome-Focused Workflow",
    body: "Less duplicate entry, less search-the-spreadsheet — more time on the work that drives outcomes.",
    icon: "trendingUp",
  },
  {
    title: "Defensible Compliance Record",
    body: "Every interaction, alert, and check-in is captured with a chain of custody you can stand behind.",
    icon: "shieldCheck",
  },
  {
    title: "Court & Revocation Ready",
    body: "Documentation produced on demand for hearings, modifications, and successful completion records.",
    icon: "scale",
  },
  {
    title: "Connected to the Whole ONE Platform",
    body: "Inherits the pre-trial and intake record, integrates with ONE Jail Management System, and feeds the Talitrix Score continuously.",
    icon: "network",
  },
];

export default function ProbationPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="ONE Probation"
        title={
          <StaggeredText
            as="h1"
            text={"End-to-End\nCommunity Supervision."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="Outside the walls. Same continuous platform."
        body={
          <p>
            ONE Probation brings every probation participant into one
            connected system — whether they are on electronic monitoring or
            not. By unifying caseload management, risk tracking, and
            compliance reporting in a single place, agencies gain clearer
            visibility across caseloads and more time for the work that
            drives outcomes.
          </p>
        }
        background={
          <AuroraBlur
            layers={orangeAurora}
            skyLayers={blackSky}
            speed={0.85}
            bloomIntensity={2.1}
            brightness={0.65}
            saturation={1.1}
            verticalFade={0.85}
            movementX={-1.5}
            movementY={-2}
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
            What&apos;s Connected
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 leading-tight max-w-2xl">
            Four pillars of community supervision.
          </h2>

          <FeaturesShowcase items={phases} />
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Built for the realities of caseloads.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Move from reactive paperwork to proactive case management —
              with the same record, the same tooling, and the same
              accountability across every participant.
            </p>
          </div>
        </div>

        <CapabilitiesScroller features={features} />
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            Same platform. Outside the walls.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See how ONE Probation extends Talitrix ONE into the community —
            and how the Talitrix Score makes that record defensible.
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
