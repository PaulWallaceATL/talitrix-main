import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import StaggeredText from "@/components/react-bits/staggered-text";
import { Globe } from "@/components/react-bits/globe";
import AgencyTypesScroller from "@/components/AgencyTypesScroller";
import FeaturesGrid, { type FeatureGridItem } from "@/components/FeaturesGrid";

export const metadata: Metadata = pageMetadata({
  path: "/solutions/agencies",
  title:
    "For Agencies | Talitrix Solutions",
  description:
    "Talitrix ONE for sheriffs, county leadership, pretrial and probation administration, courts, judges, and district attorneys — operational visibility, defensible records, and accountability across the full justice lifecycle.",
  socialDescription:
    "One platform across sheriffs, county leadership, pretrial, probation, courts, judges, and district attorneys.",
});

const audienceTags = [
  "Sheriffs",
  "County Leadership",
  "Pretrial & Probation Admin",
  "Courts & Judges",
  "District Attorneys",
];

const features: FeatureGridItem[] = [
  {
    title: "Operational visibility across the full agency",
    body: "One connected view of custody, supervision, and field operations — so leadership sees the whole picture in real time.",
    icon: "eye",
  },
  {
    title: "Population & program pressure management",
    body: "Surface program capacity, caseload pressure, and incident trends early — so resources land where they have the most impact.",
    icon: "users",
  },
  {
    title: "Unified participant activity & compliance view",
    body: "Activity, conditions, contacts, and compliance status on one record — every officer working from the same source of truth.",
    icon: "activity",
  },
  {
    title: "Court-admissible documentation, on demand",
    body: "Hearing-ready records produced from the same system the team uses daily — no manual reformatting, no missing context.",
    icon: "scale",
  },
  {
    title: "Secure chain of custody for evidentiary data",
    body: "Behavioral and supervision data captured under a secure chain of custody — reliable for legal review and oversight.",
    icon: "lock",
  },
  {
    title: "Transparent, explainable Talitrix Score for every case",
    body: "A behavioral score that's transparent and explainable end-to-end — every contributing signal visible to operators and reviewers.",
    icon: "barChart",
  },
  {
    title: "Supervisor T-App for live, court-ready field access",
    body: "Live compliance data and court-ready documentation in the field — so officers act on real information, not yesterday's report.",
    icon: "smartphone",
  },
  {
    title: "Defensible record behind every supervision decision",
    body: "Every alert, contact, and intervention captured with the durability and auditability needed to hold up under scrutiny.",
    icon: "shieldCheck",
  },
];

const otherSegments = [
  { href: "/solutions/participants", label: "Participants" },
];

export default function AgenciesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="relative w-full min-h-screen flex items-center overflow-hidden border-b border-border-gray">
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

        <div className="relative z-10 px-6 md:px-16 py-20 md:py-24 max-w-7xl">
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

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              One platform. Every role across the justice lifecycle.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-10 flex flex-col gap-4">
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              Talitrix ONE supports every role in the justice lifecycle — from
              custody and field operations to supervision programs, the bench,
              and prosecution. One connected platform, the same defensible
              record, every role working from the same source of truth.
            </p>
            <p className="text-white/65 text-base leading-relaxed">
              Stronger accountability under scrutiny. Stronger protection for
              the communities you serve.
            </p>
          </div>
        </div>

        <AgencyTypesScroller />
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
                What Agencies Get
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
                Built for the realities of running an agency.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-10">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                Operational visibility, defensible records, and accountability
                across the full lifecycle — purpose-built for the way modern
                agencies actually work.
              </p>
            </div>
          </div>

          <FeaturesGrid items={features} columns={4} />

          <div className="mt-12 md:mt-16 flex flex-wrap gap-4 sm:gap-6">
            <CTAButton href="/get-started" variant="ghost">
              Request a briefing
            </CTAButton>
            <CTAButton href="/contact" variant="ghost">
              Talk with our team
            </CTAButton>
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
