"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import StaggeredText from "@/components/react-bits/staggered-text";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Optional id for in-page anchoring. */
  id?: string;
  /** Tailwind classes for the outer <section>. */
  className?: string;
};

const PlatformContinuitySection = ({ id, className = "" }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const guardianRef = useRef<HTMLDivElement>(null);
  const supervisorRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      gsap.set([shieldRef.current, guardianRef.current, supervisorRef.current], {
        willChange: "transform, opacity, filter",
      });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      intro
        .from(
          watchRef.current,
          {
            opacity: 0,
            scale: 0.55,
            y: 60,
            filter: "blur(20px)",
            duration: 1.1,
          },
          0,
        )
        .from(
          shieldRef.current,
          {
            opacity: 0,
            x: -180,
            y: 40,
            rotate: -22,
            filter: "blur(10px)",
            duration: 1.1,
          },
          0.15,
        )
        .from(
          guardianRef.current,
          {
            opacity: 0,
            x: 180,
            y: 40,
            rotate: 22,
            filter: "blur(10px)",
            duration: 1.1,
          },
          0.25,
        )
        .from(
          supervisorRef.current,
          {
            opacity: 0,
            x: 220,
            y: 80,
            rotate: 28,
            scale: 0.8,
            filter: "blur(12px)",
            duration: 1.15,
          },
          0.4,
        )
        .from(
          scoreRef.current,
          {
            opacity: 0,
            scale: 0.6,
            duration: 0.7,
            ease: "back.out(1.7)",
          },
          0.9,
        );

      // Idle floating motion — gentle, infinite
      const float = (
        target: Element | null,
        amount: number,
        duration: number,
        delay: number,
      ) => {
        if (!target) return;
        gsap.to(target, {
          y: `+=${amount}`,
          duration,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay,
        });
      };
      float(shieldRef.current, 12, 4.2, 1.6);
      float(guardianRef.current, -10, 4.6, 1.8);
      float(supervisorRef.current, 14, 4.8, 2.0);
      float(watchRef.current, -8, 5.0, 2.1);

      // Scroll parallax — cards drift outward as the section exits
      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 30%",
          end: "bottom top",
          scrub: 1,
        },
      });
      parallax
        .to(shieldRef.current, { x: "-=80", rotate: "-=4" }, 0)
        .to(guardianRef.current, { x: "+=60", rotate: "+=3" }, 0)
        .to(supervisorRef.current, { x: "+=120", y: "+=40" }, 0)
        .to(watchRef.current, { y: "-=50" }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative bg-background overflow-hidden border-b border-border-gray ${className}`}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(248,122,19,0.18),transparent_55%)] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 px-6 md:px-16 pt-20 md:pt-28 text-center max-w-5xl mx-auto">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
          The Ecosystem
        </span>
        <StaggeredText
          as="h2"
          text={"One Platform.\nComplete Continuity."}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.1]"
          segmentBy="words"
          duration={0.7}
          delay={70}
          blur
        />
      </div>

      <div
        ref={stageRef}
        className="relative mx-auto mt-12 md:mt-16 mb-20 md:mb-24 max-w-6xl h-[460px] sm:h-[560px] md:h-[640px] px-4"
      >
        {/* ONE Shield — back-left, slight tilt */}
        <div
          ref={shieldRef}
          className="absolute left-[2%] sm:left-[6%] md:left-[10%] top-[18%] w-[55%] sm:w-[44%] md:w-[40%] -rotate-[8deg] origin-bottom-right"
        >
          <CardLabel>One Shield</CardLabel>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]">
            <Image
              src="/platform/one-shield.jpg"
              alt="ONE Shield app"
              width={462}
              height={587}
              className="w-full h-auto block"
              sizes="(min-width: 768px) 40vw, 55vw"
            />
          </div>
        </div>

        {/* ONE Guardian — back-right, slight tilt */}
        <div
          ref={guardianRef}
          className="absolute right-[18%] sm:right-[20%] md:right-[22%] top-[16%] w-[55%] sm:w-[44%] md:w-[40%] rotate-[6deg] origin-bottom-left"
        >
          <CardLabel align="right">One Guardian</CardLabel>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]">
            <Image
              src="/platform/one-gaurdian.jpg"
              alt="ONE Guardian app"
              width={462}
              height={587}
              className="w-full h-auto block"
              sizes="(min-width: 768px) 40vw, 55vw"
            />
          </div>
        </div>

        {/* ONE Supervisor — right, separated, smaller */}
        <div
          ref={supervisorRef}
          className="absolute right-[1%] sm:right-[2%] md:right-[2%] top-[28%] w-[36%] sm:w-[28%] md:w-[24%] rotate-[8deg] origin-bottom-left"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]">
            <Image
              src="/platform/one-supervisor1.jpg"
              alt="ONE Supervisor app"
              width={462}
              height={587}
              className="w-full h-auto block"
              sizes="(min-width: 768px) 24vw, 36vw"
            />
            {/* Recreated Talitrix score ring overlay (matches PlatformSection) */}
            <div
              ref={scoreRef}
              className="absolute top-[36%] left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-2"
            >
              <h3 className="tracking-widest text-center text-[10px] sm:text-xs">
                TALITRIX
              </h3>
              <div className="size-16 sm:size-20 md:size-24 relative">
                <div className="top-1/2 left-1/2 -translate-1/2 text-primary text-2xl sm:text-3xl md:text-4xl absolute font-medium">
                  63
                </div>
                <ScoreRing />
              </div>
            </div>
          </div>
        </div>

        {/* Central T-Band watch */}
        <div
          ref={watchRef}
          className="absolute left-[8%] sm:left-[14%] md:left-[18%] top-[10%] sm:top-[6%] z-20 w-[68%] sm:w-[58%] md:w-[52%]"
        >
          <div className="relative w-full aspect-square">
            <div
              className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.45),rgba(248,122,19,0.1)_45%,transparent_72%)] blur-2xl pointer-events-none"
              aria-hidden
            />
            <Image
              src="/watch-sequence/0200.webp"
              alt="Talitrix T-Band"
              fill
              className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
              priority
              sizes="(min-width: 768px) 52vw, 68vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const CardLabel = ({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) => (
  <div
    className={`mb-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/55 ${
      align === "right" ? "text-right pr-2" : "pl-2"
    }`}
  >
    {children}
  </div>
);

const ScoreRing = () => (
  <svg
    viewBox="0 0 162 161"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="w-full h-full"
  >
    <path
      d="M161.5 80.5C161.5 124.959 125.459 161 81 161C36.5411 161 0.5 124.959 0.5 80.5C0.5 36.0411 36.5411 0 81 0C125.459 0 161.5 36.0411 161.5 80.5ZM12.1625 80.5C12.1625 118.518 42.9821 149.338 81 149.338C119.018 149.338 149.838 118.518 149.838 80.5C149.838 42.4821 119.018 11.6625 81 11.6625C42.9821 11.6625 12.1625 42.4821 12.1625 80.5Z"
      fill="#282625"
    />
    <path
      d="M5.83123 80.5C2.61073 80.5 -0.0219779 77.8858 0.211101 74.6737C1.0328 63.3499 4.24272 52.3046 9.65491 42.2741C15.992 30.5294 25.1496 20.5444 36.3037 13.2175C47.4578 5.89063 60.2584 1.45175 73.554 0.300234C86.8495 -0.851282 100.223 1.3207 112.47 6.62075C124.718 11.9208 135.456 20.1827 143.718 30.6629C151.98 41.1432 157.507 53.5131 159.801 66.6597C162.096 79.8063 161.086 93.3171 156.862 105.976C153.255 116.788 147.401 126.689 139.709 135.04C137.527 137.408 133.819 137.279 131.614 134.931C129.41 132.584 129.547 128.909 131.699 126.513C137.998 119.505 142.804 111.263 145.799 102.286C149.411 91.4602 150.275 79.9068 148.313 68.6648C146.35 57.4229 141.624 46.845 134.559 37.8831C127.494 28.9211 118.312 21.8562 107.839 17.324C97.3654 12.7918 85.9296 10.9345 74.5603 11.9192C63.1909 12.9039 52.2448 16.6997 42.7066 22.9651C33.1685 29.2305 25.3376 37.7689 19.9186 47.812C15.4248 56.1406 12.7065 65.2872 11.9093 74.6756C11.6368 77.8846 9.05172 80.5 5.83123 80.5V80.5Z"
      fill="#FF7300"
    />
  </svg>
);

export default PlatformContinuitySection;
