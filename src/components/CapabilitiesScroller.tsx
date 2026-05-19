"use client";

import type { ReactNode } from "react";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ScrollHoverCard from "@/components/ScrollHoverCard";
import { ICONS, type CapabilityIconName } from "@/lib/icon-registry";

export type { CapabilityIconName };

export type CapabilityFeature = {
  title: string;
  body: string;
  eyebrow?: string;
  icon?: CapabilityIconName;
};

interface Props {
  features: CapabilityFeature[];
  defaultIcon?: CapabilityIconName;
  header?: ReactNode;
}

const BLOBS = [
  "rgba(248, 122, 19, 0.85)",
  "rgba(255, 165, 80, 0.85)",
  "rgba(255, 100, 0, 0.85)",
  "rgba(255, 180, 100, 0.85)",
  "rgba(255, 130, 30, 0.85)",
  "rgba(255, 90, 20, 0.85)",
];

export default function CapabilitiesScroller({
  features,
  defaultIcon = "sparkles",
  header,
}: Props) {
  return (
    <HorizontalScrollSection header={header}>
      {features.map((feature, index) => {
        const Icon = ICONS[feature.icon ?? defaultIcon] ?? ICONS.sparkles;
        const number = String(index + 1).padStart(2, "0");
        const blob = BLOBS[index % BLOBS.length];

        return (
          <ScrollHoverCard
            key={feature.title}
            blob={blob}
            icon={<Icon className="h-5 w-5 text-white/85" strokeWidth={1.6} />}
            number={number}
            eyebrow={feature.eyebrow}
            body={feature.body}
            title={feature.title}
            footer="number"
          />
        );
      })}
    </HorizontalScrollSection>
  );
}
