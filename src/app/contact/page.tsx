import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import ContactExperience from "./ContactExperience";
import { OUTREACH_TYPES, type OutreachType } from "./outreach";
import {
  subtleOrangeAurora,
  blackSky,
} from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "Contact | Talitrix",
  description:
    "Talk with the Talitrix team. Briefings, partnerships, support, press, and general inquiries — one place to reach the right team.",
};

const VALID_TYPES = new Set<OutreachType>(
  OUTREACH_TYPES.map((t) => t.value),
);

type SearchParams = Promise<{ type?: string }>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { type } = await searchParams;
  const initialType: OutreachType =
    type && VALID_TYPES.has(type as OutreachType)
      ? (type as OutreachType)
      : "briefing";

  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="Contact"
        title={
          <StaggeredText
            as="h1"
            text={"Talk with the\nTalitrix team."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="Whether you're scoping a deployment, opening a support ticket, or asking a single question — one form, the right team."
        background={
          <AuroraBlur
            layers={subtleOrangeAurora}
            skyLayers={blackSky}
            speed={0.7}
            bloomIntensity={1.8}
            brightness={0.55}
            saturation={1.0}
            verticalFade={0.85}
            movementX={-1.2}
            movementY={-1.6}
          />
        }
      />

      <ContactExperience initialType={initialType} />

      <Footer />
    </main>
  );
}
