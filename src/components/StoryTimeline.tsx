"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  body: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "1960s",
    body: "Harvard researchers designed the first electronic monitoring wearable as a rehabilitative tool rooted in positive behavioral reinforcement.",
  },
  {
    year: "1983",
    body: "The industry commercialized a different vision — the ankle monitor — inspired by a comic-book villain's tracking device.",
  },
  {
    year: "Four Decades",
    body: "As the category evolved around the ankle monitor, restriction replaced rehabilitation as the industry standard — becoming increasingly stigmatized and disconnected from the people wearing it.",
  },
  {
    year: "Today",
    body: "Talitrix introduces a more modern, human-centered approach to monitoring — bringing the technology to the wrist through the industry's first independent wrist-worn GPS device and a connected ITW and OTW ecosystem designed for modern supervision.",
  },
];

const StoryTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const milestones = gsap.utils.toArray<HTMLElement>(".story-milestone");
      milestones.forEach((m) => {
        const dot = m.querySelector(".story-dot");
        const content = m.querySelector(".story-content");
        gsap.from(m, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: m,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: m,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (content) {
          gsap.from(content, {
            x: -16,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: m,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      const line = containerRef.current?.querySelector(".story-line");
      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto">
      {/* Vertical accent line, gradient-faded at both ends */}
      <div
        className="story-line absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/0 via-primary/70 to-primary/0"
        aria-hidden
      />

      <ol className="flex flex-col gap-14 sm:gap-16 list-none">
        {MILESTONES.map((m) => (
          <li
            key={m.year}
            className="story-milestone relative pl-12 sm:pl-16"
          >
            {/* Milestone dot — concentric circles with primary glow */}
            <span
              className="story-dot absolute left-0 top-1.5 flex items-center justify-center size-6 rounded-full bg-primary"
              style={{
                boxShadow:
                  "0 0 0 4px rgba(248,122,19,0.18), 0 0 24px rgba(248,122,19,0.55)",
              }}
              aria-hidden
            >
              <span className="size-1.5 rounded-full bg-white" />
            </span>

            <div className="story-content flex flex-col gap-3">
              <span className="text-primary text-xs sm:text-sm tracking-[0.25em] uppercase">
                {m.year}
              </span>
              <p className="text-white/85 leading-relaxed text-base sm:text-lg max-w-2xl">
                {m.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StoryTimeline;
