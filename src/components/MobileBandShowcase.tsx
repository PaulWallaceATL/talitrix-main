"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import {
  IoChatbubblesOutline,
  IoFitnessOutline,
  IoShieldCheckmarkOutline,
  IoSwapHorizontalOutline,
} from "react-icons/io5";
import { BsSim } from "react-icons/bs";
import { TbDeviceWatchSearch } from "react-icons/tb";
import type { IconType } from "react-icons";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  title: string;
  body: string;
  Icon: IconType;
};

const FEATURES: Feature[] = [
  {
    title: "Two-Way Communication",
    body: "Direct contact between participants and officers, right from the wrist.",
    Icon: IoChatbubblesOutline,
  },
  {
    title: "Three-Carrier SIM",
    body: "AT&T, T-Mobile, and Verizon Wireless coverage on a single device.",
    Icon: BsSim,
  },
  {
    title: "Heart Rate & SpO\u2082 Sensors",
    body: "Continuous wellness telemetry for proactive supervision.",
    Icon: IoFitnessOutline,
  },
  {
    title: "Proximity Sensors",
    body: "Skin-detection and tamper alerts with a defensible record.",
    Icon: IoShieldCheckmarkOutline,
  },
  {
    title: "Inside & Outside the Walls",
    body: "One device, custody operations through community supervision.",
    Icon: TbDeviceWatchSearch,
  },
  {
    title: "Replaceable Wrist & Ankle Straps",
    body: "Fit and form factor that adapt to the program and the person.",
    Icon: IoSwapHorizontalOutline,
  },
];

const MobileBandShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const items = Array.from(
        list.querySelectorAll<HTMLLIElement>(":scope > li"),
      );
      if (items.length === 0) return;

      gsap.set(items, { opacity: 0, y: 28, filter: "blur(8px)" });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: list,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative -mt-12 bg-background px-6 pt-2 pb-16 lg:hidden"
    >
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-md flex-col gap-4 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">
          Built into the Band
        </span>
        <h2 className="text-3xl leading-[1.1] text-white sm:text-4xl">
          Modern technology.{" "}
          <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            Human-centered design.
          </span>
        </h2>
      </div>

      <ul
        ref={listRef}
        className="relative z-10 mx-auto mt-10 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {FEATURES.map(({ title, body, Icon }) => (
          <li
            key={title}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border-gray bg-white/[0.03] p-5 will-change-[opacity,transform,filter]"
            style={{
              boxShadow:
                "inset 0 0 1.5px rgba(255,255,255,0.4), inset 1px -2px 4px rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.10] text-primary"
              style={{
                boxShadow:
                  "inset 0 0 1.5px rgba(255,255,255,0.6), inset 1px -2px 4px rgba(255,255,255,0.18)",
              }}
            >
              <Icon className="size-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base leading-snug text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MobileBandShowcase;

export const MobileDeployCTA = () => {
  return (
    <section className="relative bg-background px-6 pt-4 pb-24 lg:hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[260px] w-[420px] max-w-full bg-[radial-gradient(circle_at_center,rgba(248,122,19,0.22),transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <h2 className="text-3xl leading-[1.1] text-white">
          Deploy the new standard in your jurisdiction.
        </h2>
        <div className="flex w-full flex-col gap-3">
          <Link
            href="/contact?type=briefing"
            className="rounded-xl bg-white px-6 py-4 text-base font-semibold text-zinc-800 shadow-[0_10px_40px_rgba(255,255,255,0.08)]"
          >
            Request a Briefing
          </Link>
          <Link
            href="/talitrix-one"
            className="group flex items-center justify-center gap-2 rounded-xl bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur-lg"
            style={{
              boxShadow:
                "inset 1px -1px 3px rgba(255, 255, 255, 0.5), inset -3px -1px 5px rgba(255, 255, 255, 0.5)",
            }}
          >
            Explore Talitrix ONE
            <FiArrowUpRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
