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
  path: "/talitrix-one/pretrial",
  title:
    "ONE Pre-Trial | Talitrix ONE",
  description:
    "ONE Pre-Trial brings every pre-trial participant — monitored or not — into one connected system. Risk assessment, conditions tracking, court-ready documentation, and continuous risk signal in a single platform.",
  socialDescription:
    "Risk assessment, conditions tracking, court-ready documentation, and continuous risk signal in one platform.",
});

const phases: FeatureShowcaseItem[] = [
  {
    title: "Risk Assessment",
    short: "Standardized frameworks applied consistently",
    description:
      "Standardized pre-trial risk frameworks applied consistently — giving judges, prosecutors, and officers the same defensible signal.",
    bullets: [
      "Configurable to your jurisdiction's risk matrix",
      "Same record across release, supervision, and revocation",
      "Defensible chain of custody for every assessment",
    ],
    icon: "gauge",
  },
  {
    title: "Conditions Tracking",
    short: "Conditions and contacts in one place",
    description:
      "Court-ordered conditions, contacts, check-ins, and notes managed in one place across the pre-trial team — no spreadsheets, no missed handoffs.",
    bullets: [
      "Real-time visibility on every active condition",
      "Automated alerts on missed contacts or violations",
      "Shared view across the supervision team",
    ],
    icon: "clipboardCheck",
  },
  {
    title: "Court-Ready Documentation",
    short: "Compliance records on demand",
    description:
      "Compliance records produced on demand for every court appearance — generated from the same system the team uses daily, with no manual reformatting.",
    bullets: [
      "One-click export for hearings and court reviews",
      "Chain of custody preserved end-to-end",
      "Same record powers expert witness testimony",
    ],
    icon: "scale",
  },
  {
    title: "Continuous Risk Signal",
    short: "Live signals across the lifecycle",
    description:
      "Continuous risk and compliance signals — including telemetry from the All-In-One Band and the Talitrix Score — surfaced where supervision teams already work.",
    bullets: [
      "Telemetry from the All-In-One Band integrated by default",
      "Talitrix Score updates as new signals come in",
      "Earlier intervention before violations are recorded",
    ],
    icon: "activity",
  },
];

const features = [
  {
    title: "All Pre-Trial Participants in One Place",
    body: "Monitored and non-monitored pre-trial populations on a single connected platform — no separate spreadsheets.",
    icon: "users",
  },
  {
    title: "Faster, Better Release Decisions",
    body: "Risk and compliance signals available the moment a judge, prosecutor, or pre-trial officer needs them.",
    icon: "eye",
  },
  {
    title: "Court-Ready by Default",
    body: "Every check-in, alert, and condition status documented with a chain of custody you can stand behind.",
    icon: "fileCheck",
  },
  {
    title: "Reduced Failure-to-Appear",
    body: "Proactive alerts for upcoming court dates and condition gaps reduce no-shows and missed obligations.",
    icon: "calendarCheck",
  },
  {
    title: "Earlier Intervention",
    body: "Surface compliance and risk signals early so teams can intervene before a violation is recorded.",
    icon: "bell",
  },
  {
    title: "Connected to the Talitrix ONE Platform",
    body: "Inherits the intake record, integrates with ONE Jail Management System, and feeds the Talitrix Score continuously.",
    icon: "network",
  },
];

export default function PretrialPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="ONE Pre-Trial"
        title={
          <StaggeredText
            as="h1"
            text={"Pre-Trial Supervision\nin One Connected System."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="From release to resolution. Same continuous platform."
        body={
          <p>
            ONE Pre-Trial brings every pre-trial participant — whether they
            are on electronic monitoring or not — into one connected system.
            By unifying risk frameworks, conditions tracking, and court-ready
            documentation in a single place, agencies gain clearer visibility
            across caseloads and a defensible record behind every release and
            supervision decision.
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
            Four pillars of pre-trial supervision.
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
              Built for the realities of pre-trial.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              From risk assessment to court appearance — same record, same
              tooling, same accountability across every pre-trial participant.
            </p>
          </div>
        </div>

        <CapabilitiesScroller features={features} />
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            One platform. From release to resolution.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See how ONE Pre-Trial extends Talitrix ONE into the community —
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
