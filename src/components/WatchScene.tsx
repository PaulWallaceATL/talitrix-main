"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfoPaths from "@/app/sections/components/InfoPaths";
import LeftInfoPath from "@/app/sections/components/LeftInfoPath";
import { motion } from "motion/react";

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

      const isMobile = cw < 768;
      // On mobile (portrait), the contain-scale leaves the watch tiny
      // because viewport width is the limiting dimension. Scale up
      // ~1.7x so the watch face dominates the screen but the rotated
      // band profile still fits within the viewport at most angles.
      const scale = isMobile ? (cw / iw) * 1.7 : Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = ch - dh;

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
    // Failsafe: even if the first frame is extremely slow, don't leave the
    // overlay hidden forever — fade it in after a short window.
    const failSafe = window.setTimeout(reveal, 1200);

    const tl = gsap.to(obj, {
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

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    timeline1.to(watch, { x: isMobile ? 0 : -180 }, 0);
    timeline1.to("#title-h1", { y: isMobile ? 80 : 150, duration: 1 }, 0);
    timeline1.to("#hero-desc", { y: -100, opacity: 1, duration: 1 }, 0);
    timeline1.to("#hero-desc", { pointerEvents: "none", delay: 0.1 }, 0);

    // On mobile only: fade the watch overlay out just before the
    // PlatformSection cards take over, and fade it back in if the
    // user scrolls back up. We use toggleActions (not scrub) here so
    // the play/reverse cycle is independent of PlatformSection's tl2,
    // which also targets #watchscene opacity — sharing the same scrub
    // would leave the watch stuck at 0 on the way back up.
    let fadeTrigger: ScrollTrigger | undefined;
    if (isMobile) {
      const fade = gsap.fromTo(
        watch,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: "#platform-section",
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
      fadeTrigger = fade.scrollTrigger ?? undefined;
    }

    return () => {
      fadeTrigger?.kill();
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
          className="absolute z-10 inset-0 w-full h-full"
        />
        <InfoPaths className="hidden lg:block absolute top-1/2 left-[60%] ml-6 -translate-1/2 z-20 w-100 h-50 text-xl pointer-events-none" />
        <LeftInfoPath className="hidden lg:block absolute bottom-[15%] left-[15%] z-20 w-100 h-50 text-xl pointer-events-none" />
        <WatchGlow className="absolute w-[420px] sm:w-[600px] md:w-[800px] h-auto left-1/2 top-1/2 -translate-1/2" />
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
