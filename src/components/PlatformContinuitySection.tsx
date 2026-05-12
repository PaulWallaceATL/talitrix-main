"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  /** Optional id for in-page anchoring. */
  id?: string;
};

/**
 * Self-contained version of the homepage's PlatformSection. Same fanned
 * card stack, same pinned 400% scroll, same supervisor scale + h2 fade
 * + cards fade choreography, and the same Intelligence with Purpose
 * reveal at the end. Only difference: the watch is a local element here
 * because inner pages do not mount the global #watchscene canvas.
 */
const PlatformContinuitySection = ({ id }: Props) => {
  const platformRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h2bRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const platform = platformRef.current;
      const placeholder = placeholderRef.current;
      if (!platform || !placeholder) return;

      // Reveal: until now the section is opacity-0 so it cannot flash
      // over surrounding content on first paint.
      gsap.set(platform, { opacity: 1 });

      const h2Split = SplitText.create(h2Ref.current, {
        type: "lines",
        mask: "lines",
      });
      const h2bSplit = SplitText.create(h2bRef.current, {
        type: "lines",
        mask: "lines",
      });
      const pSplit = SplitText.create(pRef.current, {
        type: "lines",
        mask: "lines",
      });

      // h2 reveal as the section enters
      gsap.from(h2Split.lines, {
        y: "100%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: platform,
          start: "20% center",
          toggleActions: "play none none reverse",
        },
      });

      // Pinned scroll choreography — mirrors the homepage's tl2.
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: platform,
          start: "top top",
          end: "+=400%",
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      });
      tl2.to(screenRef.current, { rotate: "-12deg" }, 0);
      tl2.to(
        watchRef.current,
        { x: "-22%", delay: 0.1, ease: "power4.inOut" },
        0,
      );
      tl2.to(
        watchRef.current,
        { x: "-50%", opacity: 0, duration: 0.5, ease: "power1.in" },
        0.8,
      );
      tl2.to(cardRef.current, { scale: 2.5, y: -50 }, 0.8);
      tl2.to(h2Ref.current, { y: -200, opacity: 0, duration: 0.5 }, 0.8);
      tl2.to(h2Ref.current, { pointerEvents: "none" }, 0.8);
      tl2.to(".pcs-card", { opacity: 0, duration: 0.3 }, 0.8);

      // Reveal Intelligence with Purpose + paragraph at the end of the pin.
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: placeholder,
          start: "-=200 bottom",
          toggleActions: "play none none reverse",
        },
      });
      tl3.from(h2bSplit.lines, { y: "100%", stagger: 0.2 }, 0);
      tl3.from(pSplit.lines, { y: "100%", stagger: 0.2 }, 0);
    },
    { scope: platformRef },
  );

  return (
    <div
      ref={platformRef}
      id={id}
      className="relative opacity-0 bg-background border-b border-border-gray"
    >
      <div className="w-full h-screen relative overflow-hidden">
        {/* Fanned card stack */}
        <div className="absolute top-1/2 h-60 sm:h-80 lg:h-100 left-1/2 -translate-1/2 z-5">
          <div
            ref={screenRef}
            className="flex gap-3 sm:gap-4 lg:gap-6 w-[150vw] sm:w-[120vw] lg:w-250 h-[300vw] sm:h-[200vw] lg:h-500 origin-bottom rotate-55"
          >
            <div className="w-full pcs-card">
              <Image
                src="/platform/one-shield.jpg"
                alt="ONE Shield"
                width={462}
                height={587}
                className="w-full rounded-2xl origin-bottom-right -rotate-12"
              />
            </div>
            <div className="w-full pcs-card">
              <Image
                src="/platform/one-gaurdian.jpg"
                alt="ONE Guardian"
                width={462}
                height={587}
                className="w-full rounded-2xl"
              />
            </div>
            <div className="w-full relative">
              <div className="origin-bottom-left rotate-12 relative">
                <div className="relative" ref={cardRef}>
                  <div className="top-[36%] absolute w-full flex flex-col items-center gap-2">
                    <h3 className="tracking-widest text-center">TALITRIX</h3>
                    <div className="size-30 relative">
                      <div className="top-1/2 left-1/2 -translate-1/2 text-primary text-4xl absolute">
                        63
                      </div>
                      <ScoreRing />
                    </div>
                  </div>
                  <div className="pcs-card">
                    <Image
                      src="/platform/one-supervisor1.jpg"
                      alt="ONE Supervisor"
                      width={462}
                      height={587}
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local T-Band overlay (replaces homepage's global #watchscene) */}
        <div
          ref={watchRef}
          className="absolute left-1/2 top-1/2 -translate-1/2 z-10 w-[420px] sm:w-[600px] md:w-[800px] aspect-square pointer-events-none"
        >
          <div
            className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.45),rgba(248,122,19,0.1)_45%,transparent_72%)] blur-2xl"
            aria-hidden
          />
          <Image
            src="/watch-sequence/0000.webp"
            alt="Talitrix T-Band"
            fill
            className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
            priority
            sizes="(min-width: 768px) 800px, (min-width: 640px) 600px, 420px"
          />
        </div>

        {/* Heading — fades out at progress 0.8 */}
        <div className="text-center px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 lg:py-24 relative z-20">
          <h2
            ref={h2Ref}
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] pb-2"
          >
            One Platform. <br /> Complete{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-primary">
              Continuity
            </span>
          </h2>
        </div>
      </div>

      {/* Trigger marker for tl3 (mirrors homepage's #placeholder) */}
      <div ref={placeholderRef} className="h-px w-full" aria-hidden />

      {/* Intelligence with Purpose — revealed at end of the pin */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between px-6 sm:px-12 lg:px-16 absolute items-start lg:items-center top-1/2 left-1/2 w-full max-w-[1500px] -translate-1/2 z-20">
        <h2
          ref={h2bRef}
          className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] pb-2"
        >
          Intelligence <br /> with{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-primary">
            Purpose.
          </span>
        </h2>
        <p
          ref={pRef}
          className="w-full max-w-md lg:w-80 text-base sm:text-lg lg:text-xl"
        >
          Move from reactive supervision to proactive intervention by
          identifying potential issues before they become operational problems.
        </p>
      </div>
    </div>
  );
};

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
