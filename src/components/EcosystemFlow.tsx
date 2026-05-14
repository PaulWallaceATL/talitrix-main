"use client";

import Image from "next/image";
import CenterFlow from "@/components/react-bits/center-flow";

const ECOSYSTEM_NODES = [
  "Corrections",
  "Pretrial Electronic Monitoring",
  "Probation",
  "Health & Wellness",
  "Community Supervision",
  "County Detention",
  "Transport",
];

type Props = {
  watchFrame?: string;
};

export default function EcosystemFlow({
  watchFrame = "/watch-sequence/0188.webp",
}: Props) {
  return (
    <>
      {/* Mobile: stacked All-In-One Band + 2-column ecosystem grid.
          The radial diagram is unreadable below ~sm because the nodes overlap
          the center hub on a phone-sized viewport, so we swap to a vertical
          hierarchy that keeps the same visual language (orange borders, glow,
          black/blur cards) without the cramped geometry. */}
      <div className="sm:hidden">
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative size-44 rounded-3xl border-2 border-primary/40 bg-black/60 backdrop-blur-md"
            style={{
              boxShadow:
                "0 0 60px 12px rgba(248, 122, 19, 0.25), inset 0 0 30px rgba(248, 122, 19, 0.08)",
            }}
          >
            <div className="absolute -inset-6 pointer-events-none">
              <Image
                src={watchFrame}
                alt="Talitrix All-In-One Band"
                fill
                priority
                sizes="280px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Decorative connector — gradient line + orange dot */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-primary/0" />
            <div className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(248,122,19,0.6)]" />
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            {ECOSYSTEM_NODES.map((label) => (
              <div
                key={label}
                className="rounded-xl border border-primary/30 bg-black/60 backdrop-blur-md p-4 min-h-[78px] flex items-center justify-center text-center"
                style={{
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.45), 0 0 14px rgba(248, 122, 19, 0.06)",
                }}
              >
                <span className="text-[11px] sm:text-xs text-white/90 font-medium leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet+: original radial CenterFlow */}
      <div className="hidden sm:block relative w-full h-[620px] md:h-[720px] lg:h-[760px]">
        <CenterFlow
          centerSize={240}
          nodeSize={120}
          nodeDistance={0.82}
          pulseColor="#f87a13"
          glowColor="#f87a13"
          lineColor="rgba(255, 255, 255, 0.18)"
          pulseDuration={5}
          pulseInterval={6}
          pulseLength={0.4}
          lineWidth={1.5}
          pulseWidth={2}
          pulseSoftness={10}
          maxGlowIntensity={28}
          glowDecay={0.95}
          borderRadius={36}
          centerBackground="rgba(0, 0, 0, 0.55)"
          centerFillsArea
          centerContent={
            <div className="absolute -inset-12 sm:-inset-16 md:-inset-20 pointer-events-none">
              <Image
                src={watchFrame}
                alt="Talitrix All-In-One Band"
                fill
                priority
                sizes="(max-width: 768px) 320px, 420px"
                className="object-contain"
              />
            </div>
          }
          nodeItems={ECOSYSTEM_NODES.map((label) => ({
            content: (
              <span className="text-[11px] sm:text-xs text-center leading-tight px-2 text-white/90 font-medium">
                {label}
              </span>
            ),
          }))}
        />
      </div>
    </>
  );
}
