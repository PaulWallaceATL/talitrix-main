import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import BandSupervisionSection from "@/components/BandSupervisionSection";
import PlatformContinuitySection from "@/components/PlatformContinuitySection";

export const metadata: Metadata = pageMetadata({
  path: "/talitrix-one/all-in-one-band",
  title:
    "All-In-One Band — Inside and Outside the Walls | Talitrix ONE",
  description:
    "The All-In-One Band is the first independent wrist-worn GPS monitoring device — built for Inside and Outside the Walls supervision with Three Carrier SIM connectivity, biometric sensing, and proximity-based tamper detection.",
  socialTitle: "All-In-One Band | Talitrix ONE",
  socialDescription:
    "Wrist-worn GPS for Inside and Outside the Walls supervision — Three Carrier SIM, biometrics, wellness telemetry, and tamper detection.",
});

export default function AllInOneBandPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        contentClassName="lg:max-w-2xl xl:max-w-3xl"
        eyebrow="The Hardware"
        title={
          <StaggeredText
            as="h1"
            text={"All-In-One Band.\nInside and Outside the Walls."}
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
            both Inside and Outside the Walls supervision, with Three Carrier
            SIM connectivity, biometric sensing, and proximity-based tamper
            detection.
          </p>
        }
        background={
          <div className="absolute inset-0 overflow-hidden bg-black">
            {/* Soft orange aurora behind the band, weighted to the
                right so it sits behind the band image and never bleeds
                across the hero text on the left. */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_82%_50%,rgba(248,122,19,0.32),transparent_55%)] pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute top-1/2 right-[4%] -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-primary/25 blur-[150px] pointer-events-none"
              aria-hidden
            />

            {/* All-In-One Band hero image — anchored to the right edge so it
                never overlaps the headline. Hidden below lg so the hero text
                gets full width on tablet and mobile. */}
            <div className="hidden lg:flex absolute inset-y-0 left-[62%] xl:left-[64%] 2xl:left-[66%] right-0 items-center justify-end pr-[3%] xl:pr-[5%] pointer-events-none">
              <div className="relative w-full max-w-[720px] xl:max-w-[840px] 2xl:max-w-[960px] aspect-square">
                <Image
                  src="/watch-sequence/0188.webp"
                  alt="Talitrix All-In-One Band, 3/4 angled view"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, min(38vw, 960px)"
                  className="object-contain object-right"
                />
              </div>
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

      <div id="learn-more" className="scroll-mt-24 lg:scroll-mt-32">
        <BandSupervisionSection
          eyebrow="The All-In-One Band"
          headline={
            <>
              One Band.{" "}
              <span className="text-primary">
                Built for Every Stage of Supervision.
              </span>
            </>
          }
          body="Built for both Inside the Walls and Outside the Walls supervision — one device that follows the participant from custody operations to community release."
        />
      </div>

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
