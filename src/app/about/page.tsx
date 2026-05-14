import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import StaggeredText from "@/components/react-bits/staggered-text";
import PrinciplesScroller from "@/components/PrinciplesScroller";
import StoryTimeline from "@/components/StoryTimeline";
import SynapticShift from "@/components/react-bits/synaptic-shift";
import VideoBlock from "@/components/VideoBlock";
import { orangeAurora, blackSky } from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "About | Talitrix",
  description:
    "Talitrix is redefining electronic monitoring — technology designed around people, dignity, and outcomes. Learn how we set the global standard in modern supervision.",
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="Our Story"
        title={
          <StaggeredText
            as="h1"
            text={"A Different Vision for\nMonitoring and Supervision."}
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.05]"
            segmentBy="words"
            duration={0.8}
            delay={70}
            blur
          />
        }
        subtitle="Talitrix is rebuilding monitoring and supervision around dignity, intelligence, and outcomes — bringing the technology back to the wrist and back to its original rehabilitative purpose."
        body={
          <p>
            We design hardware, software, and behavioral intelligence as one
            connected system — built for the realities of agencies inside and
            outside the walls, and for the participants who depend on the
            people who use it. The result is a more modern, human-centered
            standard for the supervision category, and the people it serves.
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
        <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
          <CTAButton scrollTo="story-timeline">Read our story</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Contact Sales
          </CTAButton>
        </div>
      </ShaderHero>

      <VideoBlock
        eyebrow="Watch"
        headline="The standard, in motion."
        body="A walkthrough of the Talitrix ONE platform — the All in ONE Band hardware, the connected dashboards, and the Talitrix Score that ties it all together."
      />

      <section
        id="story-timeline"
        className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden scroll-mt-24 lg:scroll-mt-32"
      >
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

        <div className="relative z-10 max-w-3xl mx-auto mb-12 md:mb-16 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
            From rehabilitation, off course — and back again.
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            Sixty years in four moments.
          </h2>
        </div>

        <div className="relative z-10">
          <StoryTimeline />
        </div>
      </section>

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

        <div className="relative z-10">
          <PrinciplesScroller />
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
