import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import BandFeaturesScroller from "@/components/BandFeaturesScroller";
import PlatformContinuitySection from "@/components/PlatformContinuitySection";

export const metadata: Metadata = {
  title: "All-In-One Band | Talitrix ONE",
  description:
    "The All-In-One Band is the first independent wrist-worn GPS monitoring device — 3-Carrier SIM, biometric sensors, proximity-based skin detection, and tamper-resistant by design.",
};

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
        body={
          <p>
            The first independent wrist-worn GPS monitoring device — built for
            both Inside and Outside the Walls supervision, with 3-Carrier SIM
            connectivity, biometric sensing, and proximity-based tamper
            detection.
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
            <div className="hidden lg:block absolute top-1/2 right-[-30%] xl:right-[-20%] -translate-y-1/2 w-[1100px] xl:w-[1300px] aspect-square pointer-events-none">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              The Outcome
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              High confidence. Quiet hardware.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              The All-In-One Band is engineered so that supervision teams get the signal
              they need — and participants get the dignity they deserve.
            </p>
          </div>
        </div>

        <BandFeaturesScroller />
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
