"use client";

import type { ReactNode } from "react";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ScrollHoverCard from "@/components/ScrollHoverCard";
import {
  HeartHandshake,
  BatteryFull,
  ShieldCheck,
  Link2,
  Globe,
  Hammer,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    number: "01",
    eyebrow: "Wear",
    title: "Dignity by Design",
    body: "A wrist form factor that lets participants live, work, and reintegrate without broadcasting justice involvement.",
    icon: HeartHandshake,
  },
  {
    number: "02",
    eyebrow: "Performance",
    title: "Optimized Battery & Performance",
    body: "Skin-detection logic minimizes unnecessary verification, preserving battery life and on-device performance.",
    icon: BatteryFull,
  },
  {
    number: "03",
    eyebrow: "Evidence",
    title: "High-Confidence Tamper Evidence",
    body: "Continuous proximity checks combined with biometric verification produce a defensible tamper record.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    eyebrow: "Integration",
    title: "Closed-Loop with Talitrix ONE",
    body: "Telemetry streams directly into ONE Jail Management System, ONE Pre-Trial, ONE Probation, and the Talitrix Score — no integration gaps.",
    icon: Link2,
  },
  {
    number: "05",
    eyebrow: "Inside & Outside",
    title: "One Vendor, Inside & Outside the Walls",
    body: "Eliminates the need for separate ankle-monitor and facility-tracking vendors. One device, one record, every phase.",
    icon: Globe,
  },
  {
    number: "06",
    eyebrow: "Field-Ready",
    title: "Built for the Field",
    body: "Engineered for the realities of supervision — durable, reliable, and ready for in-field All-In-One Band fitting workflows.",
    icon: Hammer,
  },
];

type Props = {
  header?: ReactNode;
};

export default function BandFeaturesScroller({ header }: Props) {
  return (
    <HorizontalScrollSection header={header}>
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <ScrollHoverCard
            key={feature.title}
            icon={<Icon className="h-5 w-5 text-white/85" strokeWidth={1.6} />}
            number={feature.number}
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
