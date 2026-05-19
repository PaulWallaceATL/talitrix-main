"use client";

import { useState } from "react";
import Link from "next/link";
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
  return (
    <div className="flex flex-col gap-5">
      {modules.map((m, i) => (
        <ModuleCard key={m.href} mod={m} index={i} />
      ))}
    </div>
  );
}

function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  const [hovered, setHovered] = useState(false);

  const Icon = mod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="w-full"
    >
      <Link
        href={mod.href}
        className="group relative flex flex-col rounded-2xl border border-border-gray bg-white/[0.03] p-6 sm:p-7 min-h-[280px] overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(248,122,19,0.18)]"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 0.7 : 0,
            scale: hovered ? 1 : 0.75,
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

        <p className="relative mt-3 text-sm text-white/75 leading-relaxed">
          {mod.body}
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
