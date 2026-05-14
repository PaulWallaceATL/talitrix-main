"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ICONS, type CapabilityIconName } from "@/lib/icon-registry";

export type AgencyType = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: CapabilityIconName;
  blob: string;
};

const types: AgencyType[] = [
  {
    number: "01",
    eyebrow: "Custody & Field Operations",
    title: "Sheriffs",
    body: "From booking to release to community supervision — Talitrix ONE gives sheriffs visibility, accountability, and a defensible record across the full lifecycle.",
    icon: "shieldCheck",
    blob: "rgba(248, 122, 19, 0.85)",
  },
  {
    number: "02",
    eyebrow: "County Operations",
    title: "County Leadership",
    body: "Manage population pressure, oversee programs, and demonstrate operational accountability to constituents and oversight bodies — on one connected platform.",
    icon: "building",
    blob: "rgba(255, 165, 80, 0.85)",
  },
  {
    number: "03",
    eyebrow: "Supervision Programs",
    title: "Pretrial & Probation Admin",
    body: "Caseload visibility, conditions tracking, and the Supervisor T-App — built for the realities of running pretrial and probation programs at scale.",
    icon: "clipboardCheck",
    blob: "rgba(255, 100, 0, 0.85)",
  },
  {
    number: "04",
    eyebrow: "Bench & Sentencing",
    title: "Courts & Judges",
    body: "A transparent, explainable Talitrix Score — backed by chain-of-custody behavioral data and expert witness support — for stronger sentencing and supervision decisions.",
    icon: "scale",
    blob: "rgba(255, 180, 100, 0.85)",
  },
  {
    number: "05",
    eyebrow: "Prosecution",
    title: "District Attorneys",
    body: "Court-admissible behavioral evidence with secure chain of custody — making participant activity, compliance, and risk reliable inputs for legal review.",
    icon: "gavel",
    blob: "rgba(255, 130, 30, 0.85)",
  },
];

/**
 * Horizontal snap-scroll of agency-type cards. Visual idiom mirrors
 * PlatformModulesScroller — icon + number row, orange eyebrow, hover-
 * reveal body with word stagger, title pinned to the bottom. No link
 * wrapper because these cards are descriptive, not navigational.
 */
export default function AgencyTypesScroller() {
  return (
    <div className="-mx-6 md:-mx-16">
      <div className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 px-6 md:px-16 w-max snap-x snap-mandatory">
          {types.map((t, i) => (
            <AgencyCard key={t.title} type={t} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AgencyCard({ type, index }: { type: AgencyType; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setHoverCapable(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const reveal = hoverCapable ? hovered : true;
  const Icon = ICONS[type.icon] ?? ICONS.sparkles;
  const words = type.body.split(" ");

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
      <div className="group relative flex flex-col rounded-2xl border border-border-gray bg-white/[0.03] hover:border-primary/40 p-6 sm:p-7 min-h-[360px] overflow-hidden transition-colors">
        <motion.div
          initial={false}
          animate={{
            opacity: reveal ? 0.7 : 0,
            scale: reveal ? 1 : 0.75,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute left-1/2 -bottom-24 w-72 h-72 rounded-full pointer-events-none blur-2xl"
          style={{
            background: `radial-gradient(circle, ${type.blob} 0%, rgba(0,0,0,0) 70%)`,
            x: "-50%",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Icon className="w-5 h-5 text-white/85" strokeWidth={1.6} />
          <span className="text-xs text-white/40 tracking-widest">
            {type.number}
          </span>
        </div>

        <span className="relative mt-3 text-primary text-xs uppercase tracking-[0.3em]">
          {type.eyebrow}
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

        <div className="relative mt-auto flex items-end justify-between pt-8">
          <span className="text-base sm:text-lg text-white leading-tight pr-2">
            {type.title}
          </span>
          <motion.span
            initial={false}
            animate={{
              backgroundColor: hovered ? type.blob : "rgba(255,255,255,0.08)",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs tracking-widest"
            aria-hidden
          >
            {type.number}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
