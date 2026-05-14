import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import DepthCard from "@/components/react-bits/depth-card";
import { orangeAurora, blackSky } from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "ONE Pre-Trial | Talitrix ONE",
  description:
    "ONE Pre-Trial brings every pre-trial participant — monitored or not — into one connected system. Risk frameworks, conditions tracking, court-ready documentation, and defensible records in a single platform.",
};

const phases = [
  {
    phase: "Risk Assessment",
    body: "Standardized pre-trial risk frameworks applied consistently to inform release and conditions decisions.",
  },
  {
    phase: "Conditions Tracking",
    body: "Court-ordered conditions, contacts, and check-ins managed in one place across the pre-trial team.",
  },
  {
    phase: "Court-Ready Documentation",
    body: "Compliance records produced on demand for every appearance — same system the team uses daily.",
  },
  {
    phase: "Continuous Risk Signal",
    body: "Live risk and compliance signals — including from the All-In-One Band and Talitrix Score where applicable.",
  },
];

const features = [
  {
    title: "All Pre-Trial Participants in One Place",
    body: "Monitored and non-monitored pre-trial populations on a single connected platform — no separate spreadsheets.",
  },
  {
    title: "Faster, Better Release Decisions",
    body: "Risk and compliance signals available the moment a judge, prosecutor, or pre-trial officer needs them.",
  },
  {
    title: "Court-Ready by Default",
    body: "Every check-in, alert, and condition status documented with a chain of custody you can stand behind.",
  },
  {
    title: "Reduced Failure-to-Appear",
    body: "Proactive alerts for upcoming court dates and condition gaps reduce no-shows and missed obligations.",
  },
  {
    title: "Earlier Intervention",
    body: "Surface compliance and risk signals early so teams can intervene before a violation is recorded.",
  },
  {
    title: "Connected to the Whole ONE Platform",
    body: "Inherits the intake record, integrates with ONE Jail Management System, and feeds the Talitrix Score continuously.",
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
              Built for the realities of pre-trial.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              From risk assessment to court appearance — same record, same
              tooling, same accountability across every pre-trial participant.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {features.map((f, i) => (
            <DepthCard
              key={f.title}
              title={f.title}
              description={f.body}
              width={340}
              height={300}
              borderRadius="20px"
              maxRotation={10}
              maxTranslation={12}
              spotlight
              spotlightColor="rgba(248, 122, 19, 0.2)"
              contentClassName="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md p-6 flex flex-col justify-end"
              revealAnimation="fade"
              staggerDelay={70 + i * 25}
            />
          ))}
        </div>
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
