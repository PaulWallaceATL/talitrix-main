"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxEffects() {
  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>("[data-parallax]");

    elements.forEach((el) => {
      const speed = Number(el.dataset.speed ?? 0.3);

      gsap.to(el, {
        y: () => -(speed * window.innerHeight * 0.3),
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section, [data-snap], main") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  return null;
}
