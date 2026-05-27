"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import StaggeredText, {
  type StaggeredTextHandle,
} from "@/components/react-bits/staggered-text";
import CTAGlowBg from "@/components/CTAGlowBg";

export const BOTTOM_CTA_REVEAL_EVENT = "reveal-bottom-cta";

const BottomCTA = () => {
  const headlineRef = useRef<StaggeredTextHandle>(null);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches,
  );
  const [ctaRevealed, setCtaRevealed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    const onReveal = () => {
      if (!window.matchMedia("(max-width: 1023px)").matches) return;
      setCtaRevealed(true);
      headlineRef.current?.replay();
    };

    window.addEventListener(BOTTOM_CTA_REVEAL_EVENT, onReveal);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener(BOTTOM_CTA_REVEAL_EVENT, onReveal);
    };
  }, []);

  return (
    <div
      id="bottom-cta"
      className="relative z-20 mb-8 mt-0 max-lg:-mt-[38vh] px-4 sm:mt-16 sm:px-8 lg:mt-16 lg:px-16"
    >
      <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl px-6 pt-10 pb-32 sm:gap-14 sm:rounded-4xl sm:px-10 sm:pt-16 sm:pb-90 lg:gap-16 lg:pb-90">
        <CTAGlowBg />
        <StaggeredText
          ref={headlineRef}
          as="h2"
          text="Deploy the new standard in your jurisdiction."
          className="max-w-md justify-center text-center text-3xl leading-[1.1] sm:max-w-2xl sm:text-5xl lg:max-w-162 lg:text-6xl"
          segmentBy="words"
          duration={0.7}
          delay={70}
          blur
          manual={isMobile}
        />
        <div
          id="bottom-cta-buttons"
          className={`relative z-10 flex flex-col justify-center gap-3 transition-opacity duration-500 sm:flex-row sm:gap-4 ${
            isMobile && !ctaRevealed ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link
            href="/contact?type=briefing"
            className="rounded-xl bg-white px-6 py-4 text-base font-semibold text-zinc-800 shadow-[0_10px_40px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-[1.05] hover:bg-primary hover:text-white hover:shadow-[0_18px_55px_rgba(248,122,19,0.45)] sm:px-8 sm:py-5 sm:text-xl"
          >
            Request a Briefing
          </Link>
          <Link
            href="/talitrix-one"
            className="group flex items-center gap-2 rounded-xl bg-white/5 px-6 py-4 text-base font-semibold backdrop-blur-lg transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 sm:px-8 sm:py-5 sm:text-xl"
            style={{
              boxShadow:
                "inset 1px -1px 3px rgba(255, 255, 255, 0.5), inset -3px -1px 5px rgba(255, 255, 255, 0.5)",
            }}
          >
            Explore Talitrix ONE
            <FiArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomCTA;
