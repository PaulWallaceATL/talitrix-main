"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
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

const LenisResetOnRouteChange = () => {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    if (typeof window !== "undefined" && window.location.hash) return;
    // Hard-reset Lenis's internal target so it doesn't smoothly drift back
    // to the previous page's scroll position after a navigation/reload.
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
};

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // Lenis is wired to the home page's scroll-driven watch animation.
  // Inner pages use native scroll so the html/body height clamp doesn't
  // block scrolling.
  if (pathname !== "/") {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <ScrollTriggerSyncer />
      <LenisResetOnRouteChange />
      {children}
      <ParallaxEffects />
    </ReactLenis>
  );
};

export default LenisProvider;
