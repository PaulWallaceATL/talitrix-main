import WatchScene from "@/components/WatchScene";
import Hero from "./sections/Hero";
import ExplodedSection from "./sections/ExplodedSection";
import PlatformSection from "./sections/PlatformSection";

export default function Home() {
  return (
    <main id="watch-trigger">
      <WatchScene />
      <Hero />
      <ExplodedSection />
      <PlatformSection />
    </main>
  );
}
