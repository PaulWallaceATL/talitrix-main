"use client";

import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ScrollHoverCard from "@/components/ScrollHoverCard";
import {
  Watch,
  Scale,
  Building2,
  Route,
  Activity,
  type LucideIcon,
} from "lucide-react";

type Module = {
  href: string;
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const modules: Module[] = [
  {
    href: "/talitrix-one/t-band",
    number: "01",
    eyebrow: "Hardware",
    title: "All-In-One Band",
    body: "The first independent wrist-worn GPS monitoring device — 3-Carrier SIM, biometric sensing, and proximity-based skin detection.",
    icon: Watch,
  },
  {
    href: "/talitrix-one/pretrial",
    number: "02",
    eyebrow: "Pre-Trial Supervision",
    title: "ONE Pre-Trial",
    body: "Pre-trial supervision in one connected system — case management, risk tracking, and court-ready documentation in one place.",
    icon: Scale,
  },
  {
    href: "/talitrix-one/jail-management",
    number: "03",
    eyebrow: "Jail Management",
    title: "ONE Jail Management System",
    body: "Brings the full custody lifecycle into one connected system. Paired with the All-In-One Band, JMS extends visibility into participant movement and wellness.",
    icon: Building2,
  },
  {
    href: "/talitrix-one/probation",
    number: "04",
    eyebrow: "Community Supervision",
    title: "ONE Probation",
    body: "End-to-end community supervision in a single platform — monitored and non-monitored populations together with case management and compliance.",
    icon: Route,
  },
  {
    href: "/talitrix-one/score",
    number: "05",
    eyebrow: "Behavioral Intelligence",
    title: "Talitrix Score",
    body: "Transforms behavioral data into measurable intelligence — earlier visibility into risk and a defensible record over time.",
    icon: Activity,
  },
];

const header = (
  <div className="relative z-10 mb-12 grid grid-cols-1 gap-10 md:mb-16 lg:grid-cols-12 lg:gap-16">
    <div className="lg:col-span-5">
      <span className="mb-6 inline-block text-xs uppercase tracking-[0.3em] text-primary">
        The Modules
      </span>
      <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
        One platform.
        <br />
        <span className="text-white/60">Every module connected.</span>
      </h2>
    </div>
    <div className="lg:col-span-7 lg:pt-10">
      <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
        Modular by design. Continuous by intent. Deploy what your agency needs
        today and extend across the lifecycle as your operation grows.
      </p>
    </div>
  </div>
);

export default function PlatformModulesScroller() {
  return (
    <HorizontalScrollSection header={header}>
      {modules.map((mod) => {
        const Icon = mod.icon;

        return (
          <ScrollHoverCard
            key={mod.href}
            href={mod.href}
            icon={<Icon className="h-5 w-5 text-white/85" strokeWidth={1.6} />}
            number={mod.number}
            eyebrow={mod.eyebrow}
            body={mod.body}
            title={mod.title}
            footer="arrow"
          />
        );
      })}
    </HorizontalScrollSection>
  );
}
