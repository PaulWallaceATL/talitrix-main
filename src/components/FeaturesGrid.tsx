"use client";

import { motion } from "motion/react";
import { ICONS, type CapabilityIconName } from "@/lib/icon-registry";

export type FeatureGridItem = {
  title: string;
  body: string;
  icon: CapabilityIconName;
};

interface Props {
  items: FeatureGridItem[];
  /** Number of columns at the lg+ breakpoint. Defaults to 4. */
  columns?: 3 | 4;
}

/**
 * Clean icon-grid section. Mirrors the React Bits Features 1 layout
 * from the agencies brief: small rounded icon block, bold title, short
 * description body — laid out as a 2 / 3 / 4-column grid, no card
 * containers. Items fade-and-rise into view on scroll with a small
 * stagger.
 */
export default function FeaturesGrid({ items, columns = 4 }: Props) {
  const gridCols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className={`grid grid-cols-1 ${gridCols} gap-x-8 gap-y-10 sm:gap-y-12`}
    >
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] ?? ICONS.sparkles;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: 0.04 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-3"
          >
            <div className="size-11 rounded-xl bg-white/[0.04] border border-border-gray flex items-center justify-center text-primary mb-1">
              <Icon className="w-5 h-5" strokeWidth={1.6} />
            </div>
            <h3 className="text-base sm:text-lg text-white leading-snug min-h-[2lh]">
              {item.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed min-h-[3lh]">
              {item.body}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
