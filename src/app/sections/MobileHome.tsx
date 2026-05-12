"use client";

import Image from "next/image";
import Link from "next/link";
import StaggeredText from "@/components/react-bits/staggered-text";

const MobileHome = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-black">
        <Image
          src="/talitrix-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-10 gap-8">
          <StaggeredText
            as="h1"
            text={"The Standard for\nModern Supervision."}
            className="text-4xl sm:text-5xl text-center justify-center leading-[1.1]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />

          <p className="text-base text-white/75 max-w-xs">
            A single, unified ecosystem. Inside the walls and out.
          </p>

          <Link
            href="/talitrix-one"
            className="rounded-full px-8 py-4 bg-white/15 backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:bg-white/25 text-base"
            style={{
              boxShadow:
                "0px 19px 65.2px rgba(248, 122, 19, 0.2), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
            }}
          >
            Explore Talitrix ONE
          </Link>
        </div>

        <div className="relative z-10 mt-auto w-full flex justify-center pb-4 px-2">
          <div className="relative w-full max-w-md aspect-[4/3]">
            <Image
              src="/watch-sequence/0145.webp"
              alt="Talitrix T-Band"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* HUMAN EXPERIENCE */}
      <section className="relative px-6 py-20 border-t border-border-gray overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/15 blur-[180px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-8">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Dignity by Design
          </span>
          <StaggeredText
            as="h2"
            text={"Built for human experience."}
            className="text-4xl sm:text-5xl leading-[1.1] justify-start"
            segmentBy="words"
            duration={0.6}
            delay={60}
            blur
          />
          <p className="text-base text-white/75 leading-relaxed max-w-md">
            Proximity-based tamper detection with biometric verification —
            engineered around the dignity, privacy, and humanity of the people
            who wear it.
          </p>
        </div>

        <div className="relative z-10 mt-10 rounded-2xl overflow-hidden border border-border-gray aspect-[4/5]">
          <Image
            src="/watch-sequence/0188.webp"
            alt="Talitrix T-Band detail"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      </section>

      {/* ONE PLATFORM */}
      <section className="relative px-6 py-20 border-t border-border-gray overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary/10 blur-[160px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            The Platform
          </span>
          <StaggeredText
            as="h2"
            text={"One Platform.\nComplete Continuity."}
            className="text-4xl sm:text-5xl leading-[1.1] justify-start"
            segmentBy="words"
            duration={0.6}
            delay={60}
            blur
          />
          <p className="text-base text-white/75 leading-relaxed max-w-md">
            A connected ecosystem from intake through community supervision —
            hardware, software, and behavioral intelligence on one continuous
            platform.
          </p>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <PlatformCard
              src="/platform/one-shield.jpg"
              label="ONE Shield"
              caption="Always-on safety signal."
            />
            <PlatformCard
              src="/platform/one-gaurdian.jpg"
              label="ONE Guardian"
              caption="Live participant context for the field."
            />
            <PlatformCard
              src="/platform/one-supervisor1.jpg"
              label="ONE Supervisor"
              caption="Caseload command center."
            />
          </div>

          <Link
            href="/talitrix-one"
            className="mt-2 inline-flex items-center gap-2 text-primary group"
          >
            Explore the platform
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* INTELLIGENCE WITH PURPOSE */}
      <section className="relative px-6 py-20 border-t border-border-gray overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            The Talitrix Score
          </span>
          <StaggeredText
            as="h2"
            text={"Intelligence with Purpose."}
            className="text-4xl sm:text-5xl leading-[1.1] justify-start"
            segmentBy="words"
            duration={0.6}
            delay={60}
            blur
          />
          <p className="text-base text-white/75 leading-relaxed max-w-md">
            Move from reactive supervision to proactive intervention by
            identifying potential issues before they become operational
            problems.
          </p>
          <Link
            href="/talitrix-one/score"
            className="mt-2 inline-flex items-center gap-2 text-primary group"
          >
            See the Talitrix Score
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

function PlatformCard({
  src,
  label,
  caption,
}: {
  src: string;
  label: string;
  caption: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border-gray bg-white/[0.02] aspect-[4/5]">
      <Image src={src} alt={label} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 flex flex-col gap-1">
        <span className="text-primary text-xs uppercase tracking-[0.25em]">
          {label}
        </span>
        <span className="text-white text-base">{caption}</span>
      </div>
    </div>
  );
}

export default MobileHome;
