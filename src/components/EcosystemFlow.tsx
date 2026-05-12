"use client";

import Image from "next/image";
import CenterFlow from "@/components/react-bits/center-flow";

const ECOSYSTEM_NODES = [
  "Corrections",
  "Pretrial Electronic Monitoring",
  "Probation",
  "Health & Wellness",
  "Community Supervision",
  "Medical & Mental Health",
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
    <div className="relative w-full h-[520px] sm:h-[620px] md:h-[720px] lg:h-[760px]">
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
          <div className="relative w-full h-full">
            <Image
              src={watchFrame}
              alt="Talitrix T-Band"
              fill
              priority
              sizes="(max-width: 768px) 240px, 280px"
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
  );
}
