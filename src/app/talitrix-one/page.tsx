import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import ShaderHero from "@/components/ShaderHero";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import StaggeredText from "@/components/react-bits/staggered-text";
import EcosystemFlow from "@/components/EcosystemFlow";
import { orangeAurora, blackSky } from "@/components/AuroraPresets";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talitrix ONE | The Unified Ecosystem",
  description:
    "Talitrix ONE is a closed-loop ecosystem connecting hardware, software, and behavioral intelligence into one continuous platform — built for the full justice lifecycle.",
};

const modules = [
  {
    href: "/talitrix-one/t-band",
    number: "01",
    eyebrow: "The Hardware",
    title: "T-Band (PhoenixBand)",
    headline: "Dignity by Design.",
    body: "The first independent wrist-worn GPS monitoring device — multi-carrier SIM, biometric sensing, and proximity-based skin detection.",
  },
  {
    href: "/talitrix-one/intake",
    number: "02",
    eyebrow: "ONE Intake",
    title: "The Starting Point for Continuity.",
    headline: "Intake that powers every downstream module.",
    body: "Centralizes booking, identity, classification, and initial assessments — captured once, carried forward across the system.",
  },
  {
    href: "/talitrix-one/jail-management",
    number: "03",
    eyebrow: "ONE Jail Management",
    title: "Connected Operations Inside the Facility.",
    headline: "Inside the walls, on one continuous system.",
    body: "Brings the full custody lifecycle into one connected system. Paired with the T-Band, JMS extends visibility into participant movement and wellness.",
  },
  {
    href: "/talitrix-one/pretrial-probation",
    number: "04",
    eyebrow: "ONE Pre-Trial & Probation",
    title: "End-to-End Community Supervision.",
    headline: "Outside the walls. Same continuous platform.",
    body: "Brings monitored and non-monitored populations into one connected system — unifying case management, risk tracking, and compliance.",
  },
  {
    href: "/talitrix-one/score",
    number: "05",
    eyebrow: "The Talitrix Score",
    title: "Behavioral Intelligence and Defensible Data.",
    headline: "Move from reactive supervision to proactive intervention.",
    body: "Transforms behavioral data into measurable intelligence — earlier visibility into risk and a defensible record over time.",
  },
];

export default function TalitrixOnePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="The Platform"
        title={
          <StaggeredText
            as="h1"
            text={"Talitrix ONE.\nThe Unified Ecosystem."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="A connected ecosystem built for the full justice lifecycle."
        body={
          <p>
            Talitrix ONE is a closed-loop ecosystem that connects hardware,
            software, and behavioral intelligence into one continuous platform.
            Built to support the full justice lifecycle, its modular
            architecture allows agencies to deploy what they need while
            maintaining continuity across facilities, supervision teams, and
            community-based programs.
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
          <CTAButton href="/get-started">Request a Briefing</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Contact Sales
          </CTAButton>
        </div>
      </ShaderHero>

      <section className="relative px-6 md:px-16 py-20 md:py-28 border-b border-border-gray overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-5">
              The Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              One device.
              <br />
              <span className="text-white/60">
                Every part of the lifecycle.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl self-end">
              The T-Band sits at the center of a continuous platform — feeding
              live data and behavioral signals to every workflow across the
              justice lifecycle, from intake to community supervision.
            </p>
          </div>
        </div>

        <EcosystemFlow />
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
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

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-border-gray bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-colors min-h-[260px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 tracking-widest">
                  {m.number}
                </span>
                <span className="text-primary text-xs uppercase tracking-[0.3em]">
                  {m.eyebrow}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl leading-tight">{m.title}</h3>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                {m.body}
              </p>
              <span className="mt-auto text-primary text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore module <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Deploy the New Standard
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            The future of supervision starts here.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            One unified platform, behavioral intelligence, and operational
            efficiency — helping agencies act earlier, work smarter, and
            improve outcomes for participants and the communities they serve.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/solutions/sheriffs" variant="secondary">
              View Solutions
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
