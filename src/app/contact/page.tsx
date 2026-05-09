import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import ContactForm from "./ContactForm";
import {
  subtleOrangeAurora,
  blackSky,
} from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "Contact | Talitrix",
  description:
    "Talk with the Talitrix team. Sales, partnerships, support, and press inquiries.",
};

const channels = [
  {
    label: "Sales & Briefings",
    value: "sales@talitrix.com",
    body: "Talk with our team about deploying Talitrix ONE in your agency.",
  },
  {
    label: "Customer Support",
    value: "support@talitrix.com",
    body: "Existing customer? Our 24/7 support team is here to help.",
  },
  {
    label: "Press & Media",
    value: "press@talitrix.com",
    body: "Press inquiries, interviews, and media briefings.",
  },
  {
    label: "Partnerships",
    value: "partners@talitrix.com",
    body: "Explore integration, channel, and ecosystem partnerships.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="Contact"
        title={
          <StaggeredText
            as="h1"
            text={"Talk with the\nTalitrix team."}
            className="text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="Whether you're scoping a deployment or asking a single question — we're easy to reach."
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

      <section className="relative px-16 py-24 border-b border-border-gray">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
                Direct Channels
              </span>
              <h2 className="text-3xl md:text-4xl leading-tight">
                Reach the right team, faster.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
              {channels.map((c) => (
                <div
                  key={c.label}
                  className="bg-background p-6 flex flex-col gap-2 min-h-[150px]"
                >
                  <span className="text-xs text-white/50 uppercase tracking-widest">
                    {c.label}
                  </span>
                  <a
                    href={`mailto:${c.value}`}
                    className="text-primary text-sm hover:underline"
                  >
                    {c.value}
                  </a>
                  <p className="text-white/65 text-sm leading-relaxed mt-1">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-border-gray rounded-2xl p-8 bg-white/[0.02]">
              <h3 className="text-lg mb-2">Headquarters</h3>
              <p className="text-white/65 text-sm leading-relaxed">
                Talitrix Inc.
                <br />
                Operating across North America.
                <br />
                Mon — Fri, 8:00 AM – 6:00 PM ET
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-border-gray rounded-2xl p-10 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  General Inquiry
                </span>
                <h2 className="text-3xl mb-2">Send us a message.</h2>
                <p className="text-white/60 mb-8">
                  We typically respond within one business day.
                </p>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
