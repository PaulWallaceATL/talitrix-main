"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { ICONS, type CapabilityIconName } from "@/lib/icon-registry";

export type FeatureShowcaseItem = {
  title: string;
  /** 1-line summary shown in the left-side list. */
  short: string;
  /** Longer description shown in the right-side detail panel. */
  description: string;
  /** Optional bullet points shown below the description. */
  bullets?: string[];
  /** Icon name (key into the shared icon registry). */
  icon: CapabilityIconName;
};

interface Props {
  items: FeatureShowcaseItem[];
}

/**
 * Two-column interactive feature showcase. Mirrors the React Bits
 * Features 4 layout: clickable feature list on the left, detail panel
 * for the active feature on the right with icon, title, description,
 * and optional bullet list. Active item swaps state with a soft
 * crossfade.
 */
export default function FeaturesShowcase({ items }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = items[activeIdx];
  const ActiveIcon = ICONS[active.icon] ?? ICONS.sparkles;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left list */}
      <div className="lg:col-span-5 flex flex-col gap-2">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon] ?? ICONS.sparkles;
          const isActive = i === activeIdx;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-pressed={isActive}
              className={`flex gap-4 p-4 sm:p-5 rounded-xl border text-left transition-all duration-300 ${
                isActive
                  ? "border-primary/45 bg-primary/[0.06]"
                  : "border-border-gray bg-white/[0.02] hover:border-primary/25 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`flex-shrink-0 size-10 sm:size-11 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isActive
                    ? "bg-primary/[0.15] text-primary"
                    : "bg-white/[0.05] text-white/60"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg leading-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/85"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                  {item.short}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right detail panel */}
      <div className="lg:col-span-7">
        <div className="relative rounded-2xl border border-border-gray bg-white/[0.02] p-6 sm:p-8 lg:p-10 min-h-[360px] overflow-hidden">
          <div
            className="absolute -top-24 right-[-10%] size-72 rounded-full bg-primary/15 blur-[120px] pointer-events-none"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col"
            >
              <div className="size-12 sm:size-14 rounded-xl bg-primary/[0.12] border border-primary/30 flex items-center justify-center mb-6">
                <ActiveIcon
                  className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
                  strokeWidth={1.6}
                />
              </div>
              <h3 className="text-2xl sm:text-3xl text-white mb-4 leading-tight">
                {active.title}
              </h3>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-6">
                {active.description}
              </p>
              {active.bullets && active.bullets.length > 0 ? (
                <ul className="flex flex-col gap-3">
                  {active.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm sm:text-base text-white/85"
                    >
                      <span className="flex-shrink-0 size-5 mt-0.5 rounded-full bg-primary/[0.15] border border-primary/30 flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-primary"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
