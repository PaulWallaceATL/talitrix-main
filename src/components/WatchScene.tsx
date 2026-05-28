"use client";

import InfoPaths from "@/app/sections/components/InfoPaths";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 261;

const getFrameSrc = (i: number) =>
  `/watch-sequence/${String(i).padStart(4, "0")}.webp`;

const WatchScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const watch = watchRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !watch) return;

    let images: HTMLImageElement[] = [];
    const obj = { frame: 0 };
    let revealed = false;
    // Lock the height used for scaling so the watch keeps a fixed pixel
    // size when the viewport height changes (mobile URL bar, devtools, etc.).
    let scaleHeight = window.innerHeight;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(watch, { opacity: 1, duration: 0.4, ease: "power2.out" });
    };

    const renderFrame = (index: number) => {
      const img = images[Math.round(index)];
      if (!img?.complete || !img.naturalWidth) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const cw = canvas.width;
      const ch = canvas.height;

      const scale = cw < 768 ? 0.5 : cw < 1440 ? 0.7 : scaleHeight / ih;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(obj.frame);
    };
    resize();
    window.addEventListener("resize", resize);

    images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      return img;
    });

    if (images[0].complete && images[0].naturalWidth) {
      renderFrame(0);
      reveal();
    } else {
      images[0].onload = () => {
        renderFrame(0);
        reveal();
      };
    }
    const failSafe = window.setTimeout(reveal, 1200);

    // Breakpoint-dependent animations live inside matchMedia so they
    // get torn down and rebuilt automatically when the viewport crosses
    // 768px — no stale `isMobile` value, no manual resize wiring.
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const isMobile = context.conditions?.isMobile === true;

        // Single frame scrub for the entire sequence. Desktop continues to
        // use the fixed +=4500 distance that the design was tuned to.
        // Mobile finishes the full sequence by the time the PlatformSection
        // pin engages so the watch is fully rotated before the cards
        // explode through it, and so we don't keep scrubbing once the
        // MobileBandShowcase features start scrolling into view.
        gsap.to(obj, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          onUpdate() {
            renderFrame(obj.frame);
          },
          scrollTrigger: {
            trigger: "#watch-trigger",
            start: "top top",
            endTrigger: isMobile ? "#platform-section" : undefined,
            end: isMobile ? "top top" : "+=4500",
            scrub: true,
          },
        });

        const timeline1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#watch-trigger",
            start: "top top",
            end: "+=100%",
            scrub: true,
          },
        });
        timeline1.to(watch, { x: isMobile ? 0 : -50 }, 0);
        timeline1.to("#title-h1", { y: isMobile ? 80 : 150, duration: 1 }, 0);
        timeline1.to("#hero-desc", { y: -100, opacity: 1, duration: 1 }, 0);
        timeline1.to("#hero-desc", { pointerEvents: "none", delay: 0.1 }, 0);
      },
    );

    return () => {
      mm.revert();
      window.removeEventListener("resize", resize);
      window.clearTimeout(failSafe);
    };
  });

  return (
    <div
      className="w-full h-full fixed left-0 top-0 z-10 opacity-0 pointer-events-none"
      ref={watchRef}
      id="watchscene"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative size-full"
      >
        <canvas
          ref={canvasRef}
          className="absolute z-10 inset-0 w-full h-full "
        />
        <InfoPaths className="hidden lg:block absolute top-1/2 left-1/2 ml-6 -translate-1/2 z-20 w-100 h-50 text-sm pointer-events-none bg-amber-200/0" />
        {/* <div
          className="absolute top-1/2 left-32 2xl:left-64 -translate-y-1/2 z-20 text-sm pointer-events-none hidden lg:block"
          id="leftInfo"
        >
          <div className="relative" id="leftInfoContent">
            <h3 className="text-3xl font-semibold opacity-40">Features</h3>
            <div className="flex flex-col gap-10 pl-5 mt-5 ">
              <LeftInfoPath
                Icon={IoLocationOutline}
                label={
                  <>
                    Inside & Outside <br /> the Walls
                  </>
                }
                defsId="health"
                className="hidden lg:block z-20 text-sm pointer-events-none"
              />
              <LeftInfoPath
                Icon={IoSwapHorizontalOutline}
                label={
                  <>
                    Replaceable <br /> Straps
                  </>
                }
                defsId="straps"
                className="hidden lg:block z-20 text-sm pointer-events-none"
              />
              <LeftInfoPath
                Icon={IoWifiOutline}
                label={
                  <>
                    Connectivity <br /> & Comms
                  </>
                }
                defsId="straps"
                className="hidden lg:block z-20 text-sm pointer-events-none"
              />
            </div>
          </div>
        </div> */}
        <WatchGlow className="absolute w-105 sm:w-150 md:w-200 h-auto left-1/2 top-1/2 -translate-1/2" />
      </motion.div>
    </div>
  );
};

export default WatchScene;

type WatchGlowProps = React.ComponentProps<"svg">;

const WatchGlow = ({ ...props }: WatchGlowProps) => {
  return (
    <svg
      viewBox="0 0 1176 827"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_f_176_694)">
        <path
          d="M876 494.439C876 567.702 747.058 494.439 588 494.439C428.942 494.439 300 567.702 300 494.439C300 421.176 428.942 300 588 300C747.058 300 876 421.176 876 494.439Z"
          fill="#F87A13"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_176_694"
          x="0"
          y="0"
          width="1176"
          height="827"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_176_694"
          />
        </filter>
      </defs>
    </svg>
  );
};
