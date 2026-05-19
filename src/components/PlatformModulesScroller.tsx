"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import {
  Watch,
  Scale,
  Building2,
  Route,
  Activity,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Module = {
  href: string;
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  blob: string;
};

const modules: Module[] = [
  {
    href: "/talitrix-one/t-band",
    number: "01",
    eyebrow: "Hardware",
    title: "All-In-One Band",
    body: "The first independent wrist-worn GPS monitoring device — 3-Carrier SIM, biometric sensing, and proximity-based skin detection.",
    icon: Watch,
    blob: "rgba(248, 122, 19, 0.85)",
  },
  {
    href: "/talitrix-one/pretrial",
    number: "02",
    eyebrow: "Pre-Trial Supervision",
    title: "ONE Pre-Trial",
    body: "Pre-trial supervision in one connected system — case management, risk tracking, and court-ready documentation in one place.",
    icon: Scale,
    blob: "rgba(255, 165, 80, 0.85)",
  },
  {
    href: "/talitrix-one/jail-management",
    number: "03",
    eyebrow: "Jail Management",
    title: "ONE Jail Management System",
    body: "Brings the full custody lifecycle into one connected system. Paired with the All-In-One Band, JMS extends visibility into participant movement and wellness.",
    icon: Building2,
    blob: "rgba(255, 100, 0, 0.85)",
  },
  {
    href: "/talitrix-one/probation",
    number: "04",
    eyebrow: "Community Supervision",
    title: "ONE Probation",
    body: "End-to-end community supervision in a single platform — monitored and non-monitored populations together with case management and compliance.",
    icon: Route,
    blob: "rgba(255, 180, 100, 0.85)",
  },
  {
    href: "/talitrix-one/score",
    number: "05",
    eyebrow: "Behavioral Intelligence",
    title: "Talitrix Score",
    body: "Transforms behavioral data into measurable intelligence — earlier visibility into risk and a defensible record over time.",
    icon: Activity,
    blob: "rgba(255, 130, 30, 0.85)",
  },
];

export default function PlatformModulesScroller() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.matchMedia().add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions!;
          const navOffset = isDesktop ? 96 : 64;

          gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              pin: true,
              scrub: true,
              start: `top ${navOffset}px`,
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        },
      );
    },
    { scope: pinRef },
  );

  return (
    <div ref={pinRef}>
      <div className="relative z-10 mb-12 grid grid-cols-1 gap-10 md:mb-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="mb-6 inline-block text-xs uppercase tracking-[0.3em] text-primary">
            The Modules
          </span>
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
            One platform.
            <br />
            <span className="text-white/60">Every module connected.</span>
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pt-10">
          <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Modular by design. Continuous by intent. Deploy what your agency needs
            today and extend across the lifecycle as your operation grows.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 flex min-h-[420px] w-screen -translate-x-1/2 items-center overflow-hidden md:min-h-[460px]">
        <div
          ref={trackRef}
          className="flex w-max gap-5 pl-6 will-change-transform md:pl-16"
        >
          {modules.map((m) => (
            <ModuleCard key={m.href} mod={m} />
          ))}
          <div aria-hidden className="w-6 shrink-0 md:w-16" />
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ mod }: { mod: Module }) {
  const [hovered, setHovered] = useState(false);

  const Icon = mod.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[280px] shrink-0 sm:w-[300px] lg:w-[320px]"
    >
      <Link
        href={mod.href}
        className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border-gray bg-white/[0.03] p-6 sm:p-7 transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(248,122,19,0.18)]"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 0.7 : 0,
            scale: hovered ? 1 : 0.75,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${mod.blob} 0%, rgba(0,0,0,0) 70%)`,
            x: "-50%",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Icon className="h-5 w-5 text-white/85" strokeWidth={1.6} />
          <span className="text-xs tracking-widest text-white/40">
            {mod.number}
          </span>
        </div>

        <span className="relative mt-3 text-xs uppercase tracking-[0.3em] text-primary">
          {mod.eyebrow}
        </span>

        <p className="relative mt-3 text-sm leading-relaxed text-white/75">
          {mod.body}
        </p>

        <div className="relative mt-auto flex items-center justify-between pt-8">
          <span className="pr-2 text-base leading-tight text-white sm:text-lg">
            {mod.title}
          </span>
          <motion.span
            initial={false}
            animate={{
              backgroundColor: hovered ? mod.blob : "rgba(255,255,255,0.08)",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.3 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          >
            <motion.span
              animate={{ x: hovered ? 2 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.span>
        </div>
      </Link>
    </div>
  );
}
