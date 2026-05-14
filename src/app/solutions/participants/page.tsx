import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import StaggeredText from "@/components/react-bits/staggered-text";
import { Globe } from "@/components/react-bits/globe";
import FeaturesGrid, { type FeatureGridItem } from "@/components/FeaturesGrid";

export const metadata: Metadata = pageMetadata({
  path: "/solutions/participants",
  title:
    "For Participants | Talitrix Solutions",
  description:
    "Talitrix for Participants — designed around dignity, privacy, and proactive support. The All-In-One Band built to be worn without broadcasting justice involvement, plus the Talitrix Participant App for clarity and a pathway to success.",
  socialDescription:
    "Designed around dignity, privacy, and proactive support — built to help participants succeed in rebuilding their lives.",
});

const features: FeatureGridItem[] = [
  {
    title: "Wrist-worn All-In-One Band designed for dignity",
    body: "Built to be worn without broadcasting justice involvement — preserving dignity in the workplace, at home, and in the community.",
    icon: "shieldCheck",
  },
  {
    title: "Participant App for clarity and support",
    body: "A compliance support tool that helps participants understand their obligations and stay on track — clear communication, clear next steps.",
    icon: "smartphone",
  },
  {
    title: "Proactive alerts before a violation is recorded",
    body: "Surface upcoming court dates, condition gaps, and at-risk behavior early — so participants can correct course before a violation happens.",
    icon: "bell",
  },
  {
    title: "A pathway designed for success, not paperwork",
    body: "Built around dignity, privacy, and proactive support — focused on outcomes that help participants succeed, not punitive enforcement.",
    icon: "route",
  },
];

const otherSegments = [
  { href: "/solutions/agencies", label: "Agencies" },
];

export default function ParticipantsPage() {
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
            02 · For Participants
          </span>
          <StaggeredText
            as="h1"
            text={"Support, Clarity,\nand Dignity."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-6">
            A system designed to help participants succeed — built around
            dignity, privacy, and the proactive support people actually need.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
            <CTAButton href="/participant-registration">
              Begin Registration
            </CTAButton>
            <CTAButton href="/talitrix-one/t-band" variant="secondary">
              Learn about the All in ONE Band
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
                What Participants Get
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
                Designed around dignity, privacy, and success.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-10">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                Talitrix removes the barriers between people committed to
                rebuilding their lives and the support they need to do it —
                built around dignity, clarity, and the outcomes that help
                participants succeed.
              </p>
            </div>
          </div>

          <FeaturesGrid items={features} columns={2} />

          <div className="mt-12 md:mt-16 flex flex-wrap gap-4 sm:gap-6">
            <CTAButton href="/participant-registration" variant="ghost">
              Begin registration
            </CTAButton>
            <CTAButton href="/contact" variant="ghost">
              Get support
            </CTAButton>
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
