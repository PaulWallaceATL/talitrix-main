"use client";

import type { ReactNode } from "react";
import {
  Users,
  ShieldCheck,
  Award,
  Brain,
  HeartHandshake,
  Compass,
  type LucideIcon,
} from "lucide-react";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ScrollHoverCard from "@/components/ScrollHoverCard";

type Principle = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const principles: Principle[] = [
  {
    number: "01",
    eyebrow: "Our first instinct",
    title: "People First",
    body: "We build for the human experience, supporting the professionals who depend on our technology and the participants who wear it.",
    icon: Users,
  },
  {
    number: "02",
    eyebrow: "We carry the weight",
    title: "Radical Accountability",
    body: "We carry the responsibility of operating in one of the most consequential spaces in the world completely, with integrity and without exception.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    eyebrow: "Raise the bar",
    title: "Uncompromising Excellence",
    body: "We hold ourselves to a standard of technological excellence that expands what this industry believes is possible.",
    icon: Award,
  },
  {
    number: "04",
    eyebrow: "Insight with intent",
    title: "Intelligence With Purpose",
    body: "Every insight our platform generates exists to drive better decisions and stronger outcomes.",
    icon: Brain,
  },
  {
    number: "05",
    eyebrow: "Respect, built in",
    title: "Dignity by Design",
    body: "We design technology around the dignity, privacy, and humanity of the people who use it.",
    icon: HeartHandshake,
  },
  {
    number: "06",
    eyebrow: "Break the default",
    title: "Conviction Over Convention",
    body: "We refuse to accept what everyone else has settled for.",
    icon: Compass,
  },
];

type Props = {
  header?: ReactNode;
};

export default function PrinciplesScroller({ header }: Props) {
  return (
    <HorizontalScrollSection header={header}>
      {principles.map((principle) => {
        const Icon = principle.icon;

        return (
          <ScrollHoverCard
            key={principle.title}
            icon={<Icon className="h-5 w-5 text-white/85" strokeWidth={1.6} />}
            number={principle.number}
            eyebrow={principle.eyebrow}
            body={principle.body}
            title={principle.title}
            footer="number"
          />
        );
      })}
    </HorizontalScrollSection>
  );
}
