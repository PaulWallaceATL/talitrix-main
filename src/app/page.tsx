import WatchScene from "@/components/WatchScene";
import ExplodedSection from "./sections/ExplodedSection";
import Hero from "./sections/Hero";
import PlatformSection from "./sections/PlatformSection";
import MobileHome from "./sections/MobileHome";
import Footer from "@/components/Footer";
import BottomCTA from "./sections/BottomCTA";

export default function Home() {
  return (
    <main id="watch-trigger">
      <div className="hidden lg:block">
        <WatchScene />
        <Hero />
        <ExplodedSection />
        <PlatformSection />
        <div id="placeholder"></div>
      </div>

      <div className="lg:hidden">
        <MobileHome />
      </div>

      <BottomCTA />
      <Footer />
    </main>
  );
}
