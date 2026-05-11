import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import StaggeredText from "@/components/react-bits/staggered-text";
import { Globe } from "@/components/react-bits/globe";

export const metadata: Metadata = {
  title: "Solutions | Talitrix",
  description:
    "Talitrix solutions for Sheriffs, Pretrial & Community Supervision Leaders, Courts & Legal Professionals, and Participants — built around the realities of modern supervision.",
};

const segments = [
  {
    href: "/solutions/sheriffs",
    number: "01",
    eyebrow: "For Sheriffs & Agency Leaders",
    headline: "Decisions You Can Stand Behind.",
    subheadline:
      "Accountability, operational efficiency, and public safety outcomes.",
  },
  {
    href: "/solutions/pretrial",
    number: "02",
    eyebrow: "For Pretrial & Community Supervision Leaders",
    headline: "Proactive Intervention, Not Reactive Administration.",
    subheadline: "Manage high caseloads with confidence and clarity.",
  },
  {
    href: "/solutions/courts",
    number: "03",
    eyebrow: "For Courts & Legal Professionals",
    headline: "Data Integrity and Institutional Credibility.",
    subheadline:
      "Court-admissible documentation and defensible behavioral intelligence.",
  },
  {
    href: "/solutions/participants",
    number: "04",
    eyebrow: "For Participants",
    headline: "Support, Clarity, and Dignity.",
    subheadline: "A system designed to help participants succeed.",
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="relative w-full overflow-hidden border-b border-border-gray">
        <div className="absolute inset-0 z-0 opacity-80">
          <Globe
            primaryColor="#f87a13"
            neutralColor="rgba(255, 122, 19, 0.35)"
            atmosphereColor="#f87a13"
            globeColor="#0a0a0a"
            showAtmosphere
            autoRotateSpeed={0.4}
            arcCount={6}
            arcInterval={1500}
            arcAnimationDuration={1800}
            cameraAltitude={2.4}
            interactive={false}
            pointSize={0.18}
            atmosphereAltitude={0.18}
            globeOpacity={0.85}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/60 to-background/30 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="relative z-10 px-6 md:px-16 pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-32 max-w-7xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Solutions
          </span>
          <StaggeredText
            as="h1"
            text={"Built for the\npeople who run it."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-6">
            Talitrix ONE is shaped by the realities of the agencies, courts,
            and participants it serves.
          </p>
          <p className="text-base md:text-lg text-white/65 max-w-3xl leading-relaxed">
            Modern supervision demands more than another point solution. It
            demands continuity — and a platform that adapts to the operational
            realities of every stakeholder in the lifecycle.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/talitrix-one" variant="secondary">
              Explore the Platform
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Customer Segments
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              One platform.
              <br />
              <span className="text-white/60">
                Every stakeholder in the lifecycle.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              See how Talitrix ONE adapts to the operational realities of each
              role — from agency leadership to community supervision, courts,
              and the participants themselves.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-border-gray bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-colors min-h-[260px]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-white/40 tracking-widest">
                  {s.number}
                </span>
                <span className="text-primary text-xs uppercase tracking-[0.3em] text-right">
                  {s.eyebrow}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl leading-tight">
                {s.headline}
              </h3>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                {s.subheadline}
              </p>
              <span className="mt-auto text-primary text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore segment <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.1] mb-6 sm:mb-8">
            One platform.
            <br />
            <span className="text-white/60">
              Every stakeholder in the lifecycle.
            </span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            See how Talitrix ONE adapts to your agency&apos;s reality and your
            community&apos;s outcomes.
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
