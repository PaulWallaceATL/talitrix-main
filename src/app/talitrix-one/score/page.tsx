import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import HalftoneWave from "@/components/react-bits/halftone-wave";
import SimpleGraph from "@/components/react-bits/simple-graph";
import CapabilitiesScroller from "@/components/CapabilitiesScroller";
import FeaturesShowcase, {
  type FeatureShowcaseItem,
} from "@/components/FeaturesShowcase";

export const metadata: Metadata = {
  title: "The Talitrix Score | Talitrix ONE",
  description:
    "The Talitrix Score transforms behavioral data into measurable intelligence — earlier risk visibility, stronger context for intervention, and a defensible record over time.",
};

const scoreData = [
  { value: 32, label: "Day 1" },
  { value: 38, label: "Day 5" },
  { value: 41, label: "Day 10" },
  { value: 47, label: "Day 15" },
  { value: 55, label: "Day 20" },
  { value: 62, label: "Day 25" },
  { value: 68, label: "Day 30" },
  { value: 74, label: "Day 35" },
  { value: 79, label: "Day 40" },
  { value: 84, label: "Day 45" },
  { value: 88, label: "Day 50" },
  { value: 91, label: "Day 55" },
];

const phases: FeatureShowcaseItem[] = [
  {
    title: "Aggregate",
    short: "Continuous behavioral signal",
    description:
      "Continuously aggregates alerts, activity, and intervention history across the supervision lifecycle — turning dozens of disconnected feeds into one continuous behavioral signal.",
    bullets: [
      "Compliance, activity, and intervention in one stream",
      "Continuous aggregation, not periodic snapshots",
      "Connected across the full ONE platform",
    ],
    icon: "layers",
  },
  {
    title: "Score",
    short: "Transparent and explainable",
    description:
      "Translates behavioral signals into a transparent, explainable score over time — every contributing input visible to operators, supervisors, and reviewers.",
    bullets: [
      "Score is transparent and explainable end-to-end",
      "Every contributing signal visible to operators",
      "No black-box: the math is reviewable",
    ],
    icon: "barChart",
  },
  {
    title: "Surface",
    short: "Earlier risk identification",
    description:
      "Surfaces risk and trend changes early so teams can intervene before a violation is recorded — and act on context, not just paperwork.",
    bullets: [
      "Trend changes surfaced earlier than periodic reviews",
      "In-context alerts for officers and supervisors",
      "Earlier intervention, stronger outcomes",
    ],
    icon: "eye",
  },
  {
    title: "Defend",
    short: "Defensible behavioral record",
    description:
      "Produces a defensible behavioral record — backed by chain-of-custody and expert-witness support — that holds up in court and oversight reviews.",
    bullets: [
      "Secure chain of custody on every signal",
      "Expert witness support for legal review",
      "Court-admissible behavioral evidence",
    ],
    icon: "shieldCheck",
  },
];

const features = [
  {
    title: "Continuous Behavioral Signal",
    body: "Aggregates compliance, activity, and intervention history into one continuous signal — not periodic snapshots.",
  },
  {
    title: "Earlier Risk Identification",
    body: "Surface trend changes earlier, giving supervision teams more time to intervene before a violation occurs.",
  },
  {
    title: "Transparent & Explainable",
    body: "Every score is explainable. No black-box. Every contributing signal is visible to operators and reviewers.",
  },
  {
    title: "Court-Admissible Record",
    body: "Captured through a secure chain of custody — making the record reliable for legal review and sentencing.",
  },
  {
    title: "Expert Witness Support",
    body: "Talitrix experts can support prosecutors, defense, and judges to interpret the score in court.",
  },
  {
    title: "Strengthens Accountability",
    body: "Connects alerts, activity, and intervention into one continuous view that holds up under scrutiny.",
  },
];

export default function TalitrixScorePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="The Talitrix Score"
        title={
          <StaggeredText
            as="h1"
            text={"Behavioral Intelligence\n& Defensible Data."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        body={
          <p>
            Behavioral data turned into measurable intelligence — earlier risk
            visibility, stronger context for intervention, and a defensible
            record of participant behavior over time.
          </p>
        }
        background={
          <HalftoneWave
            colorA="#f87a13"
            colorB="#ff9a4d"
            backgroundColor="#000000"
            speed={0.6}
            gridDensity={70}
            dotSize={0.4}
            softness={1.2}
            opacity={0.7}
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
            How the Score Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 leading-tight max-w-2xl">
            Four steps from signal to defensible record.
          </h2>

          <FeaturesShowcase items={phases} />
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16 items-center">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Sample Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Watch behavior become evidence.
            </h2>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed mt-6">
              A participant&apos;s compliance score over the first 60 days of
              supervision — captured continuously, explained transparently,
              and ready to defend if questioned.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-border-gray rounded-2xl p-6 bg-white/[0.03] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-white/50 tracking-widest uppercase">
                    Sample Score Trajectory
                  </span>
                  <h4 className="text-lg mt-1">
                    Participant compliance · last 60 days
                  </h4>
                </div>
                <span className="text-primary text-sm">+184%</span>
              </div>
              <SimpleGraph
                data={scoreData}
                lineColor="#f87a13"
                dotColor="#f87a13"
                height={220}
                showGrid
                gridStyle="dashed"
                gridLines="horizontal"
                gradientFade
                graphLineThickness={2.5}
                animateOnScroll
                animateOnce
                curved
                showDots={false}
                calculatePercentageDifference={false}
              />
            </div>
          </div>
        </div>

        <CapabilitiesScroller features={features} />
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            From reactive supervision to proactive intervention.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See how the Talitrix Score makes the rest of the platform
            actionable — and how it stands up in the courtroom.
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
