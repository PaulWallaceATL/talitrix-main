"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Footer from "./Footer2";

gsap.registerPlugin(ScrollTrigger);

const FooterReveal = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapRef.current || !spacerRef.current) return;

    // Reveal animation only runs on >=768px. Below that the spacer
    // collapses to auto height and the footer just follows <main> in
    // normal flow — no scroll-driven translate, no extra spacer pull.
    gsap.matchMedia().add("(min-width: 768px)", () => {
      gsap.fromTo(
        wrapRef.current,
        { y: "-80%" },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <div ref={spacerRef} className="">
      <div
        ref={wrapRef}
        className="bottom-0 left-0 right-0 z-0 md:will-change-transform"
      >
        <Footer />
      </div>
    </div>
  );
};

export default FooterReveal;
