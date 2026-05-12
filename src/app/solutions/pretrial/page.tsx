import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import StaggeredText from "@/components/react-bits/staggered-text";
import { Globe } from "@/components/react-bits/globe";

export const metadata: Metadata = {
  title: "For Pretrial & Community Supervision Leaders | Talitrix Solutions",
  description:
    "Talitrix ONE for Pretrial and Community Supervision Leaders — a single, unified view of activity, compliance, and case history with the Supervisor T-App.",
};

const bullets = [
  "Unified participant activity & compliance view",
  "Supervisor T-App for live field access",
  "Reduced administrative friction",
  "Court-ready documentation, on demand",
];

const otherSegments = [
  { href: "/solutions/sheriffs", label: "Sheriffs & Agency Leaders" },
  { href: "/solutions/courts", label: "Courts & Legal" },
  { href: "/solutions/participants", label: "Participants" },
];

export default function PretrialPage() {
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
            02 · For Pretrial & Community Supervision Leaders
          </span>
          <StaggeredText
            as="h1"
            text={"Proactive Intervention,\nNot Reactive Administration."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-6">
            Manage high caseloads with confidence and clarity.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/talitrix-one" variant="secondary">
              Explore the Platform
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden bg-white/[0.02]">
        <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs text-white/40 tracking-widest">02</span>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">
              For Pretrial & Community Supervision Leaders
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mt-2">
              The full picture, in one place.
            </h2>
            <p className="text-white/65 text-base sm:text-lg mt-4">
              More time for active case management, earlier intervention, and
              stronger participant outcomes.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              Effective supervision depends on having the full picture in one
              place. Talitrix ONE gives supervision teams a single, unified
              view of participant activity, compliance, and case history —
              reducing administrative friction and improving operational
              efficiency. With the Supervisor T-App, teams have instant
              access to live compliance data and court-ready documentation,
              creating more time for active case management, earlier
              intervention, and stronger participant outcomes.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-sm text-white/80 border border-border-gray rounded-lg p-4 bg-white/[0.02]"
                >
                  <span className="text-primary">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex flex-wrap gap-4 sm:gap-6">
              <CTAButton href="/get-started" variant="ghost">
                Request a briefing
              </CTAButton>
              <CTAButton href="/contact" variant="ghost">
                Talk with our team
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
              See the rest of the lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Every stakeholder. One platform.
            </h2>
            <p className="text-white/65 mt-6 max-w-md leading-relaxed">
              Talitrix ONE is shaped by the realities of every role across the
              justice lifecycle.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherSegments.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-center justify-between gap-3 p-5 rounded-xl border border-border-gray bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-colors"
              >
                <span className="text-white">{s.label}</span>
                <span className="text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
