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
    const scaleHeight = window.innerHeight;
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

      const scale = cw < 768 ? 0.5 : cw < 1536 ? 0.7 : scaleHeight / ih;
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

    // Frame scrub is desktop-only. Below 1024px the watch holds at the
    // first frame inside the hero section instead of trying to play a
    // sequence that can't be read at that size.
    mm.add("(min-width: 1024px)", () => {
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
          end: "+=4500",
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
      timeline1.to(watch, { x: 0 }, 0);
      timeline1.to("#title-h1", { y: 150, duration: 1 }, 0);
      timeline1.to("#hero-desc", { y: -100, opacity: 1, duration: 1 }, 0);
      timeline1.to("#hero-desc", { pointerEvents: "none", delay: 0.1 }, 0);
    });

    return () => {
      mm.revert();
      window.removeEventListener("resize", resize);
      window.clearTimeout(failSafe);

      obj.frame = 0;
      renderFrame(0);
    };
  });

  return (
    <div
      className="w-full h-screen absolute lg:fixed left-0 top-0 z-10 opacity-0 pointer-events-none"
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
