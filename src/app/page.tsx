import WatchScene from "@/components/WatchScene";
import ExplodedSection from "./sections/ExplodedSection";
import Hero from "./sections/Hero";
import PlatformSection from "./sections/PlatformSection";
import Footer from "@/components/Footer";
import BottomCTA from "./sections/BottomCTA";

export default function Home() {
  return (
    <main id="watch-trigger">
      <WatchScene />
      <Hero />
      <ExplodedSection />
      <PlatformSection />
      <div id="placeholder"></div>
      <BottomCTA />
      <Footer />
    </main>
  );
}
