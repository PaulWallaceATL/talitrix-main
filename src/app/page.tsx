import WatchScene from "@/components/WatchScene";
import ExplodedSection from "./sections/ExplodedSection";
import Hero from "./sections/Hero";
import PlatformSection from "./sections/PlatformSection";
import FooterReveal from "@/components/FooterReveal";
import BottomCTA from "./sections/BottomCTA";
import { MobileDeployCTA } from "@/components/MobileBandShowcase";

export default function Home() {
  return (
    <>
      <main id="watch-trigger" className="relative z-10 bg-background">
        <WatchScene />
        <Hero />
        <ExplodedSection />
        <PlatformSection />
        <MobileDeployCTA />
        <BottomCTA />
      </main>
      {/*
        Curtain reveal: <main> is opaque (bg-background) at z-10, the
        footer is pinned at z-0 beneath it, and the BottomCTA scrolls
        past to uncover it. FooterReveal owns the spacer + parallax lift
        so the footer rises slightly as it appears, giving the curtain a
        softer feel than a flat uncover.
      */}
      <FooterReveal />
    </>
  );
}
