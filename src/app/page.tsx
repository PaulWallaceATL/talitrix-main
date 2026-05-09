import WatchScene from "@/components/WatchScene";
import Hero from "./sections/Hero";
import ExplodedSection from "./sections/ExplodedSection";

export default function Home() {
  return (
    <main id="watch-trigger">
      <WatchScene />
      <Hero />
      <ExplodedSection />
    </main>
  );
}
