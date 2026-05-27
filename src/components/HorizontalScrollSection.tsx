"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  header?: ReactNode;
  children: ReactNode;
};

export default function HorizontalScrollSection({ header, children }: Props) {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const cards = cardsRef.current;
      const track = trackRef.current;
      if (!pin || !cards || !track) return;

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.matchMedia().add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions!;
          const navOffset = isDesktop ? 96 : 64;

          // Desktop: pin the whole section (header + cards travel together)
          // so the established scroll-driven hero behavior is preserved.
          // Mobile: pin only the cards row. The header scrolls naturally
          // first, and the scrub doesn't engage until the cards row reaches
          // navOffset — i.e. they are actually visible on screen.
          const triggerEl = isDesktop ? pin : cards;

          gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              pin: triggerEl,
              scrub: true,
              start: `top ${navOffset}px`,
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        },
      );
    },
    { scope: pinRef },
  );

  return (
    <div ref={pinRef}>
      {header}
      <div
        ref={cardsRef}
        className="relative left-1/2 flex min-h-[420px] w-screen -translate-x-1/2 items-center overflow-hidden md:min-h-[460px]"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-5 pl-6 will-change-transform md:pl-16"
        >
          {children}
          <div aria-hidden className="w-6 shrink-0 md:w-16" />
        </div>
      </div>
    </div>
  );
}
