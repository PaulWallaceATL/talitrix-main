import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import GetStartedForm from "./GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started | Talitrix",
  description:
    "Request a briefing on Talitrix ONE — the unified ecosystem for modern supervision.",
};

const steps = [
  {
    number: "01",
    title: "Tell us about your agency",
    body: "Share your goals, current systems, and operational pressure points so we can prepare a tailored briefing.",
  },
  {
    number: "02",
    title: "Receive a tailored briefing",
    body: "We'll send a private read-out covering platform fit, deployment model, and projected outcomes.",
  },
  {
    number: "03",
    title: "Walk through the platform live",
    body: "A working session with the Talitrix team — including hardware, dashboards, and the Talitrix Score.",
  },
  {
    number: "04",
    title: "Plan your deployment",
    body: "From pilot to full deployment — with a documented playbook, milestones, and a named success manager.",
  },
];

export default function GetStartedPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageHero
        eyebrow="Get Started"
        title={
          <>
            Deploy the
            <br />
            <span className="text-white/60">new standard.</span>
          </>
        }
        subtitle="Request a briefing on Talitrix ONE and see the unified ecosystem in action."
        body={
          <p>
            We'll respond within one business day to schedule a private,
            tailored briefing for your agency's leadership and operational
            teams.
          </p>
        }
      />

      <section className="relative px-16 py-24 border-b border-border-gray">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
                What Happens Next
              </span>
              <h2 className="text-3xl md:text-4xl leading-tight">
                Four steps to a tailored briefing.
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

            <div className="border border-border-gray rounded-2xl p-6 bg-white/[0.02]">
              <p className="text-white/65 text-sm leading-relaxed">
                Already have a procurement vehicle, RFP, or pilot timeline?
                Mention it in the form — our team will route your request to
                the right specialist.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-border-gray rounded-2xl p-10 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Request a Briefing
                </span>
                <h2 className="text-3xl mb-2">Tell us about your agency.</h2>
                <p className="text-white/60 mb-8">
                  Every field is confidential. We respond within one business
                  day.
                </p>

                <GetStartedForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
