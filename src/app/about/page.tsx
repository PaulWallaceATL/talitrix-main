import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import StaggeredText from "@/components/react-bits/staggered-text";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";
import DepthCard from "@/components/react-bits/depth-card";
import SynapticShift from "@/components/react-bits/synaptic-shift";
import VideoBlock from "@/components/VideoBlock";
import { orangeAurora, blackSky } from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "About | Talitrix",
  description:
    "Talitrix is redefining electronic monitoring — technology designed around people, not punishment. Learn how we set the global standard in modern supervision.",
};

const principles = [
  {
    title: "People First",
    body: "We build for the human experience, supporting the professionals who depend on our technology and the participants who wear it.",
  },
  {
    title: "Radical Accountability",
    body: "We carry the responsibility of operating in one of the most consequential spaces in the world completely, with integrity and without exception.",
  },
  {
    title: "Uncompromising Excellence",
    body: "We hold ourselves to a standard of technological excellence that expands what this industry believes is possible.",
  },
  {
    title: "Intelligence With Purpose",
    body: "Every insight our platform generates exists to drive better decisions and stronger outcomes.",
  },
  {
    title: "Dignity by Design",
    body: "We design technology around the dignity, privacy, and humanity of the people who use it.",
  },
  {
    title: "Conviction Over Convention",
    body: "We refuse to accept what everyone else has settled for.",
  },
];

const timeline = [
  {
    year: "1960s",
    title: "The Original Vision",
    body: "Harvard researchers develop the first wearable electronic monitoring technology as a rehabilitative tool — rooted in positive behavioral reinforcement.",
  },
  {
    year: "1983",
    title: "A Wrong Turn",
    body: "The industry commercialized a different vision: the ankle monitor, inspired by a comic-book villain's tracking device. Surveillance replaced support.",
  },
  {
    year: "Four Decades",
    title: "A Category Disconnected",
    body: "The category prioritized surveillance over success — disconnected from the outcomes it claimed to support.",
  },
  {
    year: "Today",
    title: "Talitrix",
    body: "We brought the technology to the wrist — and back to its original purpose. The T-Band is the industry's first independent wrist-worn GPS monitoring device, paired with a complete unified ecosystem.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="About Talitrix"
        title={
          <StaggeredText
            as="h1"
            text={"Redefining\nthe Category."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.8}
            delay={70}
            blur
          />
        }
        subtitle="Technology designed around people, not punishment."
        body={
          <p>
            Talitrix is setting the global standard in monitoring and
            supervision technology — delivering an industry-defining
            ecosystem that makes criminal-justice professionals more
            effective, participants more successful, and communities safer.
          </p>
        }
        background={
          <AuroraBlur
            layers={orangeAurora}
            skyLayers={blackSky}
            speed={0.9}
            bloomIntensity={2.4}
            brightness={0.7}
            saturation={1.1}
            verticalFade={0.85}
            movementX={-1.5}
            movementY={-2}
          />
        }
      >
        <div className="flex flex-wrap gap-4 mt-10">
          <CTAButton href="/get-started">Request a Briefing</CTAButton>
          <CTAButton href="/talitrix-one" variant="secondary">
            Explore Talitrix ONE
          </CTAButton>
        </div>
      </ShaderHero>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray">
        <div className="max-w-5xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-10 leading-tight">
            Forty years off course.
            <br />
            <span className="text-white/60">One company correcting it.</span>
          </h2>

          <BlurHighlight
            highlightedBits={[
              "rehabilitative tool",
              "comic-book villain's tracking device",
              "back to its original purpose",
              "first independent wrist-worn GPS monitoring device",
            ]}
            highlightColor="rgba(248, 122, 19, 0.4)"
            highlightClassName="text-white"
            blurAmount={6}
            inactiveOpacity={0.35}
            blurDuration={1.1}
            highlightDuration={0.9}
            viewportOptions={{ once: true, amount: 0.4 }}
            className="space-y-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-3xl"
          >
            <p>
              In the early 1960s, Harvard researchers developed the first
              wearable electronic monitoring technology as a rehabilitative
              tool — rooted in positive behavioral reinforcement and
              outcomes.
            </p>
            <p>
              By 1983, the industry had commercialized a different vision:
              the ankle monitor, inspired by a comic-book villain's tracking
              device. For the next four decades, the category prioritized
              surveillance over success — and disconnected from the outcomes
              it claimed to support.
            </p>
            <p>
              Talitrix was built to change that. We brought the technology to
              the wrist — and back to its original purpose. We built the
              T-Band, the industry's first independent wrist-worn GPS
              monitoring device, and developed a complete ecosystem around
              it.
            </p>
          </BlurHighlight>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <SynapticShift
            color="#f87a13"
            speed={0.3}
            scale={0.4}
            intensity={1.2}
            falloff={1.4}
            complexity={8}
            breathing
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 leading-tight max-w-2xl">
            From rehabilitation to surveillance — and back again.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="bg-background/80 backdrop-blur-md p-6 sm:p-8 flex flex-col gap-4 min-h-[220px] sm:min-h-[260px]"
              >
                <span className="text-primary text-sm tracking-widest">
                  {item.year}
                </span>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="text-white/65 leading-relaxed text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoBlock
        eyebrow="Watch"
        headline="The standard, in motion."
        body="A walkthrough of the Talitrix ONE platform — the T-Band hardware, the connected dashboards, and the Talitrix Score that ties it all together."
      />

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-primary/10 blur-[200px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              What we believe
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Built on
              <br />
              conviction.
            </h2>
            <p className="text-white/65 mt-6 max-w-sm leading-relaxed">
              What we built is shaped by what we believe.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {principles.map((p, i) => (
            <DepthCard
              key={p.title}
              title={p.title}
              description={p.body}
              width={340}
              height={260}
              borderRadius="20px"
              maxRotation={12}
              maxTranslation={14}
              spotlight
              spotlightColor="rgba(248, 122, 19, 0.18)"
              contentClassName="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md p-7 flex flex-col justify-end"
              revealAnimation="fade"
              staggerDelay={80 + i * 30}
            />
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            Today, Talitrix is setting the global standard in monitoring and
            supervision technology.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            And we are just getting started.
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
