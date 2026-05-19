"use client";

import type { ReactNode } from "react";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ScrollHoverCard from "@/components/ScrollHoverCard";
import { ICONS, type CapabilityIconName } from "@/lib/icon-registry";

export type AgencyType = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: CapabilityIconName;
};

const types: AgencyType[] = [
  {
    number: "01",
    eyebrow: "Custody & Field Operations",
    title: "Sheriffs",
    body: "From booking to release to community supervision — Talitrix ONE gives sheriffs visibility, accountability, and a defensible record across the full lifecycle.",
    icon: "shieldCheck",
  },
  {
    number: "02",
    eyebrow: "County Operations",
    title: "County Leadership",
    body: "Manage population pressure, oversee programs, and demonstrate operational accountability to constituents and oversight bodies — on one connected platform.",
    icon: "building",
  },
  {
    number: "03",
    eyebrow: "Supervision Programs",
    title: "Pretrial & Probation Admin",
    body: "Caseload visibility, conditions tracking, and the Supervisor T-App — built for the realities of running pretrial and probation programs at scale.",
    icon: "clipboardCheck",
  },
  {
    number: "04",
    eyebrow: "Bench & Sentencing",
    title: "Courts & Judges",
    body: "A transparent, explainable Talitrix Score — backed by chain-of-custody behavioral data and expert witness support — for stronger sentencing and supervision decisions.",
    icon: "scale",
  },
  {
    number: "05",
    eyebrow: "Prosecution",
    title: "District Attorneys",
    body: "Court-admissible behavioral evidence with secure chain of custody — making participant activity, compliance, and risk reliable inputs for legal review.",
    icon: "gavel",
  },
];

type Props = {
  header?: ReactNode;
};

export default function AgencyTypesScroller({ header }: Props) {
  return (
    <HorizontalScrollSection header={header}>
      {types.map((type) => {
        const Icon = ICONS[type.icon] ?? ICONS.sparkles;

        return (
          <ScrollHoverCard
            key={type.title}
            icon={<Icon className="h-5 w-5 text-white/85" strokeWidth={1.6} />}
            number={type.number}
            eyebrow={type.eyebrow}
            body={type.body}
            title={type.title}
            footer="number"
          />
        );
      })}
    </HorizontalScrollSection>
  );
}
