"use client";

import React from "react";
import ReactLenis, { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxEffects from "./ParallaxEffects";

gsap.registerPlugin(ScrollTrigger);

const lenisOptions = {
  lerp: 0.1, // smooth deceleration without feeling laggy on the frame sequence
  wheelMultiplier: 1, // natural speed — 2 made the sequence race through frames
  touchMultiplier: 1.5,
  smoothWheel: true,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  autoResize: true,
};

const ScrollTriggerSyncer = () => {
  useLenis(ScrollTrigger.update);
  return null;
};

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={lenisOptions}>
      <ScrollTriggerSyncer />
      {children}
      <ParallaxEffects />
    </ReactLenis>
  );
};

export default LenisProvider;
