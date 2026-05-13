import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import StaggeredText from "@/components/react-bits/staggered-text";
import { Globe } from "@/components/react-bits/globe";

export const metadata: Metadata = {
  title: "For Participants | Talitrix Solutions",
  description:
    "Talitrix for Participants — a wrist-worn All in ONE Band designed for dignity and a Participant App for proactive support, clear communication, and a pathway to success.",
};

const bullets = [
  "Wrist-worn All in ONE Band designed for dignity",
  "Participant App: clarity & support",
  "Proactive alerts before violations",
  "Pathway designed for success",
];

const otherSegments = [
  { href: "/solutions/sheriffs", label: "Sheriffs & Agency Leaders" },
  { href: "/solutions/pretrial", label: "Pretrial & Supervision" },
  { href: "/solutions/courts", label: "Courts & Legal" },
];

export default function ParticipantsPage() {
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
            04 · For Participants
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
            A system designed to help participants succeed.
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

      <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden bg-white/[0.02]">
        <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs text-white/40 tracking-widest">04</span>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">
              For Participants
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mt-2">
              Removing barriers to rebuilding a life.
            </h2>
            <p className="text-white/65 text-base sm:text-lg mt-4">
              Designed around dignity, privacy, and the support needed to
              succeed.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              Talitrix removes the barriers between people committed to
              rebuilding their lives and the support they need to do it. The
              All in ONE Band is designed to be worn without broadcasting justice
              involvement, preserving dignity in the workplace and community.
              The Talitrix Participant App serves as a compliance support
              tool, providing proactive alerts and clear communication to
              help participants understand their obligations and correct
              behavior before a violation is recorded.
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
              <CTAButton href="/participant-registration" variant="ghost">
                Begin registration
              </CTAButton>
              <CTAButton href="/contact" variant="ghost">
                Get support
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
