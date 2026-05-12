"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollToTopInstant = () => {
  if (typeof window === "undefined") return;
  // Honor in-page anchor links (CTAButton scrollTo, TOC links, etc.)
  if (window.location.hash) return;

  // Override `scroll-behavior: smooth` on html with an instant jump,
  // and reset documentElement / body in case any wrapper holds scroll state.
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
};

const refreshScrollTrigger = () => {
  // Two RAFs: one for paint, one for layout — gives pinned sections their
  // correct anchor positions after we yank the scroll back to the top.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
};

const ScrollResetOnLoad = () => {
  const pathname = usePathname();

  // Set scroll restoration to manual exactly once. Stops the browser from
  // restoring a stale scroll position when the user hits reload.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // On every (initial mount + client-side navigation) reset to top and
  // re-anchor ScrollTrigger so pinned/scrubbed sections recompute.
  useEffect(() => {
    scrollToTopInstant();
    refreshScrollTrigger();
  }, [pathname]);

  // Handle bfcache restores (browser back/forward), where the page is
  // brought back from cache with the previous scroll position intact.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPageShow = (event: PageTransitionEvent) => {
      scrollToTopInstant();
      if (event.persisted) refreshScrollTrigger();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
};

export default ScrollResetOnLoad;
