import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import RegistrationForm from "./RegistrationForm";
import { warmAurora, warmSky } from "@/components/AuroraPresets";

export const metadata: Metadata = {
  title: "Participant Registration | Talitrix",
  description:
    "Register your Talitrix participant account. Activate your T-Band, set up the Talitrix Participant App, and get the support you need to succeed.",
};

const steps = [
  {
    number: "01",
    title: "Verify your identity",
    body: "Confirm the information your supervising agency has on file.",
  },
  {
    number: "02",
    title: "Pair your T-Band",
    body: "We'll guide you through pairing the device assigned by your supervisor.",
  },
  {
    number: "03",
    title: "Set up your Participant App",
    body: "Receive proactive alerts, communicate with your supervisor, and stay on track.",
  },
];

const support = [
  {
    title: "Designed for dignity",
    body: "The T-Band is designed to be worn without broadcasting justice involvement — preserving your privacy in the workplace and community.",
  },
  {
    title: "Proactive support",
    body: "The Participant App gives you proactive alerts and clear communication to help you understand your obligations and correct course before a violation is recorded.",
  },
  {
    title: "Real human help",
    body: "Talitrix support is available to assist with technical questions about your device or the app — 24/7.",
  },
];

export default function ParticipantRegistrationPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="Participant Registration"
        title={
          <StaggeredText
            as="h1"
            text={"Welcome.\nLet's get you set up."}
            className="text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle="Activate your Talitrix account and the Talitrix Participant App."
        body={
          <p>
            Talitrix is built to support participants — with clarity,
            communication, and the tools you need to succeed. Registration
            takes about five minutes.
          </p>
        }
        background={
          <AuroraBlur
            layers={warmAurora}
            skyLayers={warmSky}
            speed={0.7}
            bloomIntensity={2}
            brightness={0.7}
            saturation={1.05}
            verticalFade={0.85}
            movementX={-1}
            movementY={-1.5}
          />
        }
      />

      <section className="relative px-16 py-24 border-b border-border-gray">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
                What to Expect
              </span>
              <h2 className="text-3xl md:text-4xl leading-tight">
                Three simple steps.
              </h2>
            </div>

            <div className="flex flex-col gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className="bg-background p-6 flex gap-5 items-start"
                >
                  <span className="text-primary text-sm tracking-widest pt-1">
                    {s.number}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg">{s.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {support.map((s) => (
                <div
                  key={s.title}
                  className="border border-border-gray rounded-xl p-5 bg-white/[0.02]"
                >
                  <h3 className="text-primary text-sm mb-1">{s.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-primary/30 rounded-xl p-5 bg-primary/[0.06]">
              <p className="text-sm text-white/80 leading-relaxed">
                Need help with registration? Call Talitrix Participant Support
                at{" "}
                <a
                  href="tel:1-855-TALITRIX"
                  className="text-primary hover:underline"
                >
                  1-855-TALITRIX
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:participants@talitrix.com"
                  className="text-primary hover:underline"
                >
                  participants@talitrix.com
                </a>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-border-gray rounded-2xl p-10 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Step 1 of 3 · Verify Identity
                </span>
                <h2 className="text-3xl mb-2">Begin registration.</h2>
                <p className="text-white/60 mb-8">
                  All information is encrypted and shared only with your
                  supervising agency.
                </p>

                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
