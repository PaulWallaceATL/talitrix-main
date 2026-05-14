import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import StaggeredText from "@/components/react-bits/staggered-text";
import { Globe } from "@/components/react-bits/globe";

export const metadata: Metadata = {
  title: "For Agencies | Talitrix Solutions",
  description:
    "Talitrix ONE for justice agencies — sheriffs, county leadership, pretrial administration, courts, judges, and district attorneys. One unified platform for operational visibility, defensible records, and accountability across the full justice lifecycle.",
};

const audienceTags = [
  "Sheriffs",
  "County Leadership",
  "Pretrial & Probation Admin",
  "Courts & Judges",
  "District Attorneys",
];

const bullets = [
  "Operational visibility across the full agency",
  "Population & program pressure management",
  "Unified participant activity & compliance view",
  "Court-admissible documentation, on demand",
  "Secure chain of custody for evidentiary data",
  "Transparent, explainable Talitrix Score",
  "Supervisor T-App for live field access",
  "Defensible record behind every decision",
];

const otherSegments = [
  { href: "/solutions/participants", label: "Participants" },
];

export default function AgenciesPage() {
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
            01 · For Agencies
          </span>
          <StaggeredText
            as="h1"
            text={"Decisions You\nCan Stand Behind."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-6">
            Built for sheriffs, county leadership, pretrial and probation
            administration, courts, judges, and district attorneys.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {audienceTags.map((tag) => (
              <span
                key={tag}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-primary/30 bg-primary/[0.08] text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
            <CTAButton scrollTo="learn-more">Learn More</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Contact Sales
            </CTAButton>
          </div>
        </div>
      </section>

      <section
        id="learn-more"
        className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden scroll-mt-24 lg:scroll-mt-32"
      >
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs text-white/40 tracking-widest">01</span>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">
              For Agencies
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mt-2">
              One platform. Every role across the justice lifecycle.
            </h2>
            <p className="text-white/65 text-base sm:text-lg mt-4">
              Stronger accountability under scrutiny. Stronger protection for
              the communities you serve.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              Talitrix ONE provides the operational visibility agencies need
              to manage population pressure, strengthen program oversight, and
              improve efficiency across supervision. By connecting participant
              activity, compliance records, and case history in one system,
              Talitrix creates a secure, defensible record behind every
              decision — helping agencies operate with greater accountability
              under scrutiny and stronger protection for the communities they
              serve.
            </p>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              For pretrial and community supervision teams, Talitrix ONE
              delivers a single, unified view of participant activity,
              compliance, and case history. The Supervisor T-App provides
              instant access to live compliance data and court-ready
              documentation — creating more time for active case management,
              earlier intervention, and stronger participant outcomes.
            </p>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              For courts, judges, and district attorneys, Talitrix captures
              behavioral data and supervision records through a secure chain
              of custody — creating a clear, reliable record for legal review.
              The Talitrix Score is transparent, explainable, and backed by
              expert witness support, giving courts greater confidence in
              sentencing and supervision decisions.
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
              Also designed for
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              The people you serve.
            </h2>
            <p className="text-white/65 mt-6 max-w-md leading-relaxed">
              Talitrix ONE supports both sides of the supervision relationship
              — agencies and the participants in their care.
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
