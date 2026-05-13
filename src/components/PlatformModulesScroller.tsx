"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Watch,
  ClipboardList,
  Building2,
  Route,
  Activity,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

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
    eyebrow: "The Hardware",
    title: "All in ONE Band",
    body: "The first independent wrist-worn GPS monitoring device — multi-carrier SIM, biometric sensing, and proximity-based skin detection.",
    icon: Watch,
    blob: "rgba(248, 122, 19, 0.85)",
  },
  {
    href: "/talitrix-one/intake",
    number: "02",
    eyebrow: "ONE Intake",
    title: "The Starting Point for Continuity.",
    body: "Centralizes booking, identity, classification, and initial assessments — captured once, carried forward across the system.",
    icon: ClipboardList,
    blob: "rgba(255, 165, 80, 0.85)",
  },
  {
    href: "/talitrix-one/jail-management",
    number: "03",
    eyebrow: "ONE Jail Management",
    title: "Connected Operations Inside the Facility.",
    body: "Brings the full custody lifecycle into one connected system. Paired with the All in ONE Band, JMS extends visibility into participant movement and wellness.",
    icon: Building2,
    blob: "rgba(255, 100, 0, 0.85)",
  },
  {
    href: "/talitrix-one/pretrial-probation",
    number: "04",
    eyebrow: "ONE Pre-Trial & Probation",
    title: "End-to-End Community Supervision.",
    body: "Brings monitored and non-monitored populations into one connected system — unifying case management, risk tracking, and compliance.",
    icon: Route,
    blob: "rgba(255, 180, 100, 0.85)",
  },
  {
    href: "/talitrix-one/score",
    number: "05",
    eyebrow: "The Talitrix Score",
    title: "Behavioral Intelligence and Defensible Data.",
    body: "Transforms behavioral data into measurable intelligence — earlier visibility into risk and a defensible record over time.",
    icon: Activity,
    blob: "rgba(255, 130, 30, 0.85)",
  },
];

export default function PlatformModulesScroller() {
  return (
    <div className="-mx-6 md:-mx-16">
      <div className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 px-6 md:px-16 w-max snap-x snap-mandatory">
          {modules.map((m, i) => (
            <ModuleCard key={m.href} mod={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setHoverCapable(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Show body always on touch devices, only on hover for hover-capable devices
  const reveal = hoverCapable ? hovered : true;

  const Icon = mod.icon;
  const words = mod.body.split(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="snap-start shrink-0 w-[280px] sm:w-[300px] lg:w-[320px]"
    >
      <Link
        href={mod.href}
        className="group relative flex flex-col rounded-2xl border border-border-gray bg-white/[0.03] hover:border-primary/40 p-6 sm:p-7 min-h-[360px] overflow-hidden transition-colors"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: reveal ? 0.7 : 0,
            scale: reveal ? 1 : 0.75,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute left-1/2 -bottom-24 w-72 h-72 rounded-full pointer-events-none blur-2xl"
          style={{
            background: `radial-gradient(circle, ${mod.blob} 0%, rgba(0,0,0,0) 70%)`,
            x: "-50%",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Icon className="w-5 h-5 text-white/85" strokeWidth={1.6} />
          <span className="text-xs text-white/40 tracking-widest">
            {mod.number}
          </span>
        </div>

        <span className="relative mt-3 text-primary text-xs uppercase tracking-[0.3em]">
          {mod.eyebrow}
        </span>

        <p className="relative mt-3 text-sm text-white/75 leading-relaxed flex flex-wrap">
          {words.map((w, wi) => (
            <motion.span
              key={wi}
              initial={false}
              animate={{
                opacity: reveal ? 1 : 0,
                y: reveal ? 0 : 4,
                filter: reveal ? "blur(0px)" : "blur(3px)",
              }}
              transition={{
                duration: 0.3,
                delay: reveal && hoverCapable ? wi * 0.025 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </p>

        <div className="relative mt-auto flex items-center justify-between pt-8">
          <span className="text-base sm:text-lg text-white leading-tight pr-2">
            {mod.title}
          </span>
          <motion.span
            initial={false}
            animate={{
              backgroundColor: hovered ? mod.blob : "rgba(255,255,255,0.08)",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          >
            <motion.span
              animate={{ x: hovered ? 2 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}
