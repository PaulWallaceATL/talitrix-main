import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import StaggeredText from "@/components/react-bits/staggered-text";
import PlatformModulesScroller from "@/components/PlatformModulesScroller";
import PlatformContinuitySection from "@/components/PlatformContinuitySection";
import { orangeAurora, blackSky } from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "Talitrix ONE | The Unified Ecosystem",
  description:
    "Talitrix ONE is a closed-loop ecosystem connecting hardware, software, and behavioral intelligence into one continuous platform — built for the full justice lifecycle.",
};

export default function TalitrixOnePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="The Platform"
        title={
          <StaggeredText
            as="h1"
            text={"Talitrix ONE."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        body={
          <p>
            Talitrix ONE brings the All-In-One band and Inside and Outside
            the Walls supervision together in one cohesive system built for
            the full justice lifecycle — giving agencies the flexibility to
            support different operational needs through modular technology.
          </p>
        }
        background={
          <AuroraBlur
            layers={orangeAurora}
            skyLayers={blackSky}
            speed={0.85}
            bloomIntensity={2.2}
            brightness={0.65}
            saturation={1.1}
            verticalFade={0.8}
            movementX={-1.6}
            movementY={-2.2}
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

      <section className="relative px-6 md:px-16 py-20 md:py-28 border-b border-border-gray overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-5">
            The Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            One band. Every part of the lifecycle.
          </h2>
          <p className="mt-6 md:mt-8 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            The Talitrix All in One Band connects ITW and OTW supervision
            through a single, continuous flow of live data and intelligence
            across the justice lifecycle.
          </p>
        </div>
      </section>

      <section
        id="learn-more"
        className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden scroll-mt-24 lg:scroll-mt-32"
      >
        <div className="absolute -top-40 -right-32 w-[700px] h-[700px] bg-primary/10 blur-[200px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              The Modules
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              One platform.
              <br />
              <span className="text-white/60">Every module connected.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Modular by design. Continuous by intent. Deploy what your agency
              needs today and extend across the lifecycle as your operation
              grows.
            </p>
          </div>
        </div>

        <PlatformModulesScroller />
      </section>

      <PlatformContinuitySection />

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Deploy the New Standard
          </span>
          <StaggeredText
            as="h2"
            text={"The future of supervision starts here."}
            className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            One unified platform, behavioral intelligence, and operational
            efficiency — helping agencies act earlier, work smarter, and
            improve outcomes for participants and the communities they serve.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/solutions/agencies" variant="secondary">
              View Solutions
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
