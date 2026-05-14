import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import DepthCard from "@/components/react-bits/depth-card";
import PlatformContinuitySection from "@/components/PlatformContinuitySection";

export const metadata: Metadata = {
  title: "All-In-One Band | Talitrix ONE",
  description:
    "The All-In-One Band is the first independent wrist-worn GPS monitoring device — 3-Carrier SIM, biometric sensors, proximity-based skin detection, and tamper-resistant by design.",
};

const phases = [
  {
    phase: "Independent GPS",
    body: "First wrist-worn GPS monitoring device that operates independently — inside and outside the walls.",
  },
  {
    phase: "3-Carrier SIM",
    body: "Built-in redundancy across carriers ensures continuous connectivity in the field and across regions.",
  },
  {
    phase: "Biometric Sensing",
    body: "Heart rate and blood-oxygen (SpO₂) sensors give supervision teams a continuous wellness picture.",
  },
  {
    phase: "Tamper Detection",
    body: "Proximity-based skin detection ~20 times per second, triggering biometric verification only on disruption.",
  },
];

const features = [
  {
    title: "Dignity by Design",
    body: "A wrist form factor that lets participants live, work, and reintegrate without broadcasting justice involvement.",
  },
  {
    title: "Optimized Battery & Performance",
    body: "Skin-detection logic minimizes unnecessary verification, preserving battery life and on-device performance.",
  },
  {
    title: "High-Confidence Tamper Evidence",
    body: "Continuous proximity checks combined with biometric verification produce a defensible tamper record.",
  },
  {
    title: "Closed-Loop with Talitrix ONE",
    body: "Telemetry streams directly into JMS, ONE Pre-Trial & Probation, and the Talitrix Score — no integration gaps.",
  },
  {
    title: "One Vendor, Inside & Outside",
    body: "Eliminates the need for separate ankle-monitor and facility-tracking vendors. One device, one record.",
  },
  {
    title: "Built for the Field",
    body: "Engineered for the realities of supervision — durable, reliable, and ready for in-field All-In-One Band fitting workflows.",
  },
];

export default function TBandPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="The Hardware"
        title={
          <StaggeredText
            as="h1"
            text={"All-In-One Band.\nDignity by Design."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="The first independent wrist-worn GPS monitoring device in the industry."
        body={
          <p>
            The All-In-One Band is designed to operate inside and outside the walls,
            eliminating the need for multiple vendors or device types. It
            features 3-Carrier SIM connectivity for redundancy alongside
            biometric sensors that monitor heart rate and blood oxygen (SpO₂).
            For community supervision, it utilizes proximity-based skin
            detection — checking for contact approximately 20 times per second
            — triggering biometric verification only if a disruption is
            detected. The outcome is high-confidence tamper detection with
            optimized performance, battery life, and reliability — all while
            treating the person wearing it with dignity.
          </p>
        }
        background={
          <div className="absolute inset-0 overflow-hidden bg-black">
            {/* Soft orange aurora behind the band, weighted to the
                right so it sits behind the band image and never bleeds
                across the hero text on the left. */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(248,122,19,0.32),transparent_55%)] pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-primary/25 blur-[150px] pointer-events-none"
              aria-hidden
            />

            {/* All-In-One Band hero image, anchored to the right of the
                hero so it doesn't overlap the headline / body / CTAs.
                Hidden below lg so the hero text gets full width on
                tablet and mobile. */}
            <div className="hidden lg:block absolute top-1/2 right-[2%] xl:right-[6%] -translate-y-1/2 w-[460px] xl:w-[560px] aspect-square pointer-events-none">
              <Image
                src="/watch-sequence/0188.webp"
                alt="Talitrix All-In-One Band, 3/4 angled view"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 560px"
                className="object-contain"
              />
            </div>
          </div>
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
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 leading-tight max-w-2xl">
            Four pillars. One independent device.
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
              The Outcome
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              High confidence. Quiet hardware.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              The All-In-One Band is engineered so that supervision teams get the signal
              they need — and participants get the dignity they deserve.
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

      <PlatformContinuitySection />

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            The wrist. The standard.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See the All-In-One Band in person — and how it integrates across the full
            Talitrix ONE platform.
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
