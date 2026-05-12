"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  IoBusinessOutline,
  IoBusOutline,
  IoCheckmarkDoneOutline,
  IoFitnessOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  title: string;
  body: string;
  Icon: IconType;
};

const features: Feature[] = [
  {
    title: "Inside and Outside the Walls",
    body: "Built for both in-facility management and community supervision, reducing operational handoffs and device transitions.",
    Icon: IoBusinessOutline,
  },
  {
    title: "Health and Wellness",
    body: "Monitor vital signs, including heart rate and blood oxygen levels, to provide earlier visibility into potential medical issues and support faster response.",
    Icon: IoFitnessOutline,
  },
  {
    title: "Real-Time Location Visibility",
    body: "Real-time visibility into participant location across facility floors and zones, powered by integrated WiFi and BLE detection.",
    Icon: IoLocationOutline,
  },
  {
    title: "Count Automation",
    body: "Simplify count procedures with automated tracking designed to support faster, more efficient facility operations.",
    Icon: IoCheckmarkDoneOutline,
  },
  {
    title: "Transport Mode",
    body: "Stay connected during participant transport — continuous visibility into location and status from departure to arrival.",
    Icon: IoBusOutline,
  },
  {
    title: "Tamper Detection",
    body: "Continuous proximity-based skin checks with biometric verification produce a defensible record the moment something is off.",
    Icon: IoShieldCheckmarkOutline,
  },
];

// Sample a subset of frames so the section stays light to load while still
// giving a smooth rotation as the user scrolls past the features.
const FRAME_START = 20;
const FRAME_END = 235;
const FRAME_STEP = 3;
const FRAMES = Array.from(
  { length: Math.floor((FRAME_END - FRAME_START) / FRAME_STEP) + 1 },
  (_, i) => FRAME_START + i * FRAME_STEP,
);

const getFrameSrc = (i: number) =>
  `/watch-sequence/${String(i).padStart(4, "0")}.webp`;

const BandSupervisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!section || !sticky || !canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const images: HTMLImageElement[] = FRAMES.map((idx) => {
        const img = new window.Image();
        img.src = getFrameSrc(idx);
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

      // Make sure first frame paints once it loads (in case it isn't cached).
      const first = images[0];
      if (first.complete) {
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
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });

      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Per-feature reveal + active highlight
      const cleanups: Array<() => void> = [];
      featureRefs.current.forEach((el) => {
        if (!el) return;

        const icon = el.querySelector<HTMLElement>(".feature-icon");
        const title = el.querySelector<HTMLElement>(".feature-title");
        const body = el.querySelector<HTMLElement>(".feature-body");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (icon) {
          tl.from(icon, {
            opacity: 0,
            scale: 0.6,
            x: -30,
            filter: "blur(6px)",
            duration: 0.7,
            ease: "back.out(1.6)",
          });
        }
        if (title) {
          tl.from(
            title,
            {
              opacity: 0,
              x: 50,
              filter: "blur(8px)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.55",
          );
        }
        if (body) {
          tl.from(
            body,
            {
              opacity: 0,
              y: 20,
              filter: "blur(6px)",
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.45",
          );
        }

        const activeST = ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: ({ isActive }) => {
            el.classList.toggle("is-active", isActive);
          },
        });

        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
          activeST.kill();
        });
      });

      return () => {
        window.removeEventListener("resize", resize);
        frameTween.scrollTrigger?.kill();
        frameTween.kill();
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden border-b border-border-gray"
    >
      <div
        className="absolute -top-32 -left-40 w-[600px] h-[600px] bg-primary/10 blur-[180px] pointer-events-none"
        aria-hidden
      />

      <div
        ref={headerRef}
        className="relative z-10 px-6 md:px-16 pt-20 md:pt-32 text-center max-w-5xl mx-auto"
      >
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
          Built with the T-Band
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl leading-[1.05]">
          One Band.{" "}
          <span className="text-primary">
            Built for Every Stage of Supervision.
          </span>
        </h2>
        <p className="mt-6 text-sm sm:text-base text-white/65 max-w-2xl mx-auto leading-relaxed">
          Integrated with the Talitrix Jail Management System to support
          greater flexibility, visibility, and responsiveness throughout the
          supervision lifecycle.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-6 px-6 md:px-16 pt-12 md:pt-20 pb-24 md:pb-32 max-w-7xl mx-auto">
        {/* Sticky T-Band column */}
        <div className="relative">
          <div
            ref={stickyRef}
            className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[780px] mx-auto -ml-2 lg:-ml-12 xl:-ml-20">
              <div
                className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.42),rgba(248,122,19,0.1)_45%,transparent_72%)] blur-2xl pointer-events-none"
                aria-hidden
              />
              <canvas
                ref={canvasRef}
                className="relative w-full h-full"
                aria-label="T-Band rendering rotating as you scroll"
              />
            </div>
          </div>
        </div>

        {/* Feature list */}
        <div className="flex flex-col gap-12 md:gap-20 lg:py-[28vh] lg:max-w-md xl:max-w-lg lg:ml-auto">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.title}
                ref={(el) => {
                  featureRefs.current[i] = el;
                }}
                className="group flex gap-4 sm:gap-5 transition-all duration-500 lg:opacity-55 lg:translate-x-2 lg:[&.is-active]:opacity-100 lg:[&.is-active]:translate-x-0"
              >
                <div
                  className="feature-icon flex-shrink-0 size-12 sm:size-14 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-center transition-all duration-500 group-[.is-active]:border-primary/50 group-[.is-active]:bg-primary/[0.12] group-[.is-active]:shadow-[0_0_30px_rgba(248,122,19,0.3)]"
                  style={{
                    boxShadow:
                      "inset 0 0 1.5px rgba(255,255,255,0.6), inset 1px -2px 4px rgba(255,255,255,0.18)",
                  }}
                >
                  <Icon className="size-5 sm:size-6 text-primary transition-transform duration-500 group-[.is-active]:scale-110" />
                </div>
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <h3 className="feature-title text-xl sm:text-2xl text-primary leading-tight">
                    {f.title}
                  </h3>
                  <p className="feature-body text-sm sm:text-base text-white/70 leading-relaxed max-w-md">
                    {f.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BandSupervisionSection;
