"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Watch frames to scrub through during the pin. Start at frame 0200
// — the 3/4 angle that matches where the homepage watch lands when
// PlatformSection enters — and rotate forward through the rest of
// the sequence (0260) as the user scrolls. Step 2 keeps the
// rotation smooth without doubling the payload.
const WATCH_FRAME_START = 200;
const WATCH_FRAME_END = 260;
const WATCH_FRAME_STEP = 2;
const WATCH_FRAMES = Array.from(
  {
    length:
      Math.floor((WATCH_FRAME_END - WATCH_FRAME_START) / WATCH_FRAME_STEP) + 1,
  },
  (_, i) => WATCH_FRAME_START + i * WATCH_FRAME_STEP,
);
const watchFrameSrc = (i: number) =>
  `/watch-sequence/${String(i).padStart(4, "0")}.webp`;

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
  const watchCanvasRef = useRef<HTMLCanvasElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const platform = platformRef.current;
      const canvas = watchCanvasRef.current;
      if (!platform) return;

      // Reveal: until now the section is opacity-0 so it cannot flash
      // over surrounding content on first paint.
      gsap.set(platform, { opacity: 1 });

      const h2Split = SplitText.create(h2Ref.current, {
        type: "lines",
        mask: "lines",
      });

      gsap.from(h2Split.lines, {
        y: "100%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: platform,
          start: "20% center",
          toggleActions: "play none none reverse",
        },
      });

      const mm = gsap.matchMedia();
      let watchCleanup: (() => void) | undefined;

      mm.add("(min-width: 1280px)", () => {
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const images: HTMLImageElement[] = WATCH_FRAMES.map((idx) => {
            const img = new window.Image();
            img.src = watchFrameSrc(idx);
            return img;
          });
          const obj = { frame: 0 };

          const drawFrame = (index: number) => {
            const img = images[Math.round(index)];
            if (!img?.complete || !img.naturalWidth) return;
            const cw = canvas.clientWidth;
            const ch = canvas.clientHeight;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.min(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;
            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, dx, dy, dw, dh);
          };

          const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            drawFrame(obj.frame);
          };
          resize();
          window.addEventListener("resize", resize);

          const first = images[0];
          if (first.complete && first.naturalWidth) {
            drawFrame(0);
          } else {
            first.addEventListener("load", () => drawFrame(obj.frame), {
              once: true,
            });
          }

          const frameTween = gsap.to(obj, {
            frame: images.length - 1,
            ease: "none",
            snap: "frame",
            onUpdate: () => drawFrame(obj.frame),
            scrollTrigger: {
              trigger: platform,
              start: "top top",
              end: "+=250%",
              scrub: 0.4,
            },
          });

          watchCleanup = () => {
            window.removeEventListener("resize", resize);
            frameTween.scrollTrigger?.kill();
            frameTween.kill();
          };
        }

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: platform,
            start: "top top",
            end: "+=250%",
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
          {
            x: "-50%",
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
          },
          0.8,
        );
        tl2.to(cardRef.current, { opacity: 0, duration: 0.3 }, 0.8);
        tl2.to(h2Ref.current, { y: -200, opacity: 0, duration: 0.5 }, 0.8);
        tl2.to(h2Ref.current, { pointerEvents: "none" }, 0.8);
        tl2.to(".pcs-card", { opacity: 0, duration: 0.3 }, 0.8);
      });

      return () => {
        watchCleanup?.();
        mm.revert();
      };
    },
    { scope: platformRef },
  );

  return (
    <div
      ref={platformRef}
      id={id}
      className="relative opacity-0 bg-background border-b border-border-gray"
    >
      <div className="w-full relative overflow-hidden xl:h-screen">
        <div className="relative z-20 px-6 pt-24 pb-12 text-center sm:px-12 sm:pt-28 sm:pb-14 xl:px-16 xl:pt-32 xl:pb-16">
          <h2
            ref={h2Ref}
            className="pb-2 text-3xl leading-[1.15] font-semibold sm:text-5xl xl:text-6xl"
          >
            One Platform. <br /> Complete{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-primary">
              Continuity
            </span>
          </h2>
        </div>

        <div className="xl:hidden px-6 pb-20">
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            <div className="w-full max-w-85">
              <div className="relative overflow-hidden rounded-3xl p-1 shadow-lg shadow-primary/45">
                <div className="absolute -top-30 size-96 rounded-full bg-radial from-white from-30% to-55% to-primary blur-xl" />
                <Image
                  src="/platform/one-jms.png"
                  alt="ONE JMS incident breakdown"
                  width={462}
                  height={587}
                  className="relative z-10 w-full rounded-2xl"
                />
              </div>
            </div>
            <div className="w-full max-w-85">
              <div className="relative overflow-hidden rounded-3xl p-1 shadow-lg shadow-primary/45">
                <div className="absolute -top-30 size-96 rounded-full bg-radial from-white from-30% to-55% to-primary blur-xl" />
                <Image
                  src="/platform/one-band.png"
                  alt="All-In-One Band"
                  width={462}
                  height={587}
                  className="relative z-10 w-full rounded-2xl"
                />
              </div>
            </div>
            <div className="relative w-full max-w-85">
              <div className="relative">
                <div className="pointer-events-none absolute top-[36%] z-20 flex w-full flex-col items-center gap-1 sm:gap-2">
                  <h3 className="text-center text-sm tracking-widest">TALITRIX</h3>
                  <div className="relative size-32">
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-primary">
                      63
                    </div>
                    <ScoreRing />
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-3xl p-1 shadow-lg shadow-primary/45">
                  <div className="absolute -top-30 size-96 rounded-full bg-radial from-white from-30% to-55% to-primary blur-xl" />
                  <Image
                    src="/platform/one-score.png"
                    alt="Talitrix Score"
                    width={462}
                    height={587}
                    className="relative z-10 w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[68%] left-1/2 z-5 hidden h-100 -translate-1/2 xl:block">
          <div
            ref={screenRef}
            className="flex h-500 w-250 origin-bottom rotate-55 gap-6"
          >
            <div className="w-full pcs-card">
              <Image
                src="/platform/one-jms.png"
                alt="ONE JMS incident breakdown"
                width={462}
                height={587}
                className="w-full origin-bottom-right -rotate-12 rounded-2xl"
              />
            </div>
            <div className="w-full pcs-card">
              <Image
                src="/platform/one-band.png"
                alt="All-In-One Band"
                width={462}
                height={587}
                className="w-full rounded-2xl"
              />
            </div>
            <div className="relative w-full">
              <div className="relative origin-bottom-left rotate-12">
                <div className="relative" ref={cardRef}>
                  <div className="absolute top-[36%] flex w-full flex-col items-center gap-2">
                    <h3 className="text-center text-base tracking-widest">
                      TALITRIX
                    </h3>
                    <div className="relative size-30">
                      <div className="absolute top-1/2 left-1/2 -translate-1/2 text-4xl text-primary">
                        63
                      </div>
                      <ScoreRing />
                    </div>
                  </div>
                  <div className="pcs-card">
                    <Image
                      src="/platform/one-score.png"
                      alt="Talitrix Score"
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

        <div
          ref={watchRef}
          className="pointer-events-none absolute top-[68%] left-1/2 z-10 hidden aspect-square w-[1500px] -translate-1/2 xl:block"
        >
          <div
            className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.5),rgba(248,122,19,0.12)_45%,transparent_72%)] blur-3xl"
            aria-hidden
          />
          <canvas
            ref={watchCanvasRef}
            className="relative h-full w-full"
            aria-label="Talitrix All-In-One Band rotating as you scroll"
          />
        </div>
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
