"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Network,
  MapPin,
  ShieldAlert,
  HeartPulse,
  ClipboardCheck,
  Database,
  Users,
  Gauge,
  Scale,
  CalendarCheck,
  Bell,
  Link2,
  Watch,
  Building2,
  Route,
  Activity,
  Brain,
  Eye,
  TrendingUp,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// Icon registry — keys are stable strings that pages pass across the
// RSC boundary. Lucide components live here on the client side only.
// Add a new entry whenever a page wants an icon that isn't listed.
const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  network: Network,
  mapPin: MapPin,
  shieldAlert: ShieldAlert,
  heartPulse: HeartPulse,
  clipboardCheck: ClipboardCheck,
  database: Database,
  users: Users,
  gauge: Gauge,
  scale: Scale,
  calendarCheck: CalendarCheck,
  bell: Bell,
  link: Link2,
  watch: Watch,
  building: Building2,
  route: Route,
  activity: Activity,
  brain: Brain,
  eye: Eye,
  trendingUp: TrendingUp,
  scrollText: ScrollText,
  shieldCheck: ShieldCheck,
};

export type CapabilityIconName = keyof typeof ICONS;

export type CapabilityFeature = {
  title: string;
  body: string;
  /** Optional small uppercase orange label above the body copy. */
  eyebrow?: string;
  /**
   * Optional icon name (key into the ICONS registry). Falls back to
   * `defaultIcon` (or `'sparkles'`). Pages pass strings rather than
   * Lucide components so the data can cross the RSC boundary safely.
   */
  icon?: CapabilityIconName;
};

interface Props {
  features: CapabilityFeature[];
  /** Used for any feature that doesn't supply its own icon name. */
  defaultIcon?: CapabilityIconName;
}

// Rotating palette for the per-card blob glow + number-chip hover color.
const BLOBS = [
  "rgba(248, 122, 19, 0.85)",
  "rgba(255, 165, 80, 0.85)",
  "rgba(255, 100, 0, 0.85)",
  "rgba(255, 180, 100, 0.85)",
  "rgba(255, 130, 30, 0.85)",
  "rgba(255, 90, 20, 0.85)",
];

/**
 * Horizontal snap-scroll of capability cards. Mirrors the visual idiom
 * of PlatformModulesScroller and BandFeaturesScroller: icon +
 * number-badge row, optional orange eyebrow, hover-reveal body with
 * word stagger, and the title + numbered chip pinned to the bottom of
 * the card. Cards fade-and-rise into view on scroll.
 */
export default function CapabilitiesScroller({
  features,
  defaultIcon = "sparkles",
}: Props) {
  return (
    <div className="-mx-6 md:-mx-16">
      <div className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 px-6 md:px-16 w-max snap-x snap-mandatory">
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              feature={f}
              index={i}
              defaultIcon={defaultIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  index,
  defaultIcon,
}: {
  feature: CapabilityFeature;
  index: number;
  defaultIcon: CapabilityIconName;
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
  const Icon = ICONS[feature.icon ?? defaultIcon] ?? ICONS.sparkles;
  const number = String(index + 1).padStart(2, "0");
  const blob = BLOBS[index % BLOBS.length];
  const words = feature.body.split(" ");

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
            background: `radial-gradient(circle, ${blob} 0%, rgba(0,0,0,0) 70%)`,
            x: "-50%",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Icon className="w-5 h-5 text-white/85" strokeWidth={1.6} />
          <span className="text-xs text-white/40 tracking-widest">
            {number}
          </span>
        </div>

        {feature.eyebrow ? (
          <span className="relative mt-3 text-primary text-xs uppercase tracking-[0.3em]">
            {feature.eyebrow}
          </span>
        ) : null}

        <p
          className={`relative ${feature.eyebrow ? "mt-3" : "mt-4"} text-sm text-white/75 leading-relaxed flex flex-wrap`}
        >
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
            {feature.title}
          </span>
          <motion.span
            initial={false}
            animate={{
              backgroundColor: hovered ? blob : "rgba(255,255,255,0.08)",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs tracking-widest"
            aria-hidden
          >
            {number}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
