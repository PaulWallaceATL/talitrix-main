"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  ShieldCheck,
  Award,
  Brain,
  HeartHandshake,
  Compass,
  type LucideIcon,
} from "lucide-react";

type Principle = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  blob: string;
};

const principles: Principle[] = [
  {
    number: "01",
    eyebrow: "Our first instinct",
    title: "People First",
    body: "We build for the human experience, supporting the professionals who depend on our technology and the participants who wear it.",
    icon: Users,
    blob: "rgba(248, 122, 19, 0.85)",
  },
  {
    number: "02",
    eyebrow: "We carry the weight",
    title: "Radical Accountability",
    body: "We carry the responsibility of operating in one of the most consequential spaces in the world completely, with integrity and without exception.",
    icon: ShieldCheck,
    blob: "rgba(255, 100, 0, 0.85)",
  },
  {
    number: "03",
    eyebrow: "Raise the bar",
    title: "Uncompromising Excellence",
    body: "We hold ourselves to a standard of technological excellence that expands what this industry believes is possible.",
    icon: Award,
    blob: "rgba(255, 165, 80, 0.85)",
  },
  {
    number: "04",
    eyebrow: "Insight with intent",
    title: "Intelligence With Purpose",
    body: "Every insight our platform generates exists to drive better decisions and stronger outcomes.",
    icon: Brain,
    blob: "rgba(255, 130, 30, 0.85)",
  },
  {
    number: "05",
    eyebrow: "Respect, built in",
    title: "Dignity by Design",
    body: "We design technology around the dignity, privacy, and humanity of the people who use it.",
    icon: HeartHandshake,
    blob: "rgba(255, 180, 100, 0.85)",
  },
  {
    number: "06",
    eyebrow: "Break the default",
    title: "Conviction Over Convention",
    body: "We refuse to accept what everyone else has settled for.",
    icon: Compass,
    blob: "rgba(255, 90, 20, 0.85)",
  },
];

export default function PrinciplesScroller() {
  return (
    <div className="-mx-6 md:-mx-16">
      <div className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 px-6 md:px-16 w-max snap-x snap-mandatory">
          {principles.map((p, i) => (
            <PrincipleCard key={p.title} principle={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PrincipleCard({
  principle,
  index,
}: {
  principle: Principle;
  index: number;
}) {
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

  const Icon = principle.icon;
  const words = principle.body.split(" ");

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
            background: `radial-gradient(circle, ${principle.blob} 0%, rgba(0,0,0,0) 70%)`,
            x: "-50%",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Icon className="w-5 h-5 text-white/85" strokeWidth={1.6} />
          <span className="text-xs text-white/40 tracking-widest">
            {principle.number}
          </span>
        </div>

        <span className="relative mt-3 text-primary text-xs uppercase tracking-[0.3em]">
          {principle.eyebrow}
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
            {principle.title}
          </span>
          <motion.span
            initial={false}
            animate={{
              backgroundColor: hovered
                ? principle.blob
                : "rgba(255,255,255,0.08)",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs tracking-widest"
            aria-hidden
          >
            {principle.number}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
