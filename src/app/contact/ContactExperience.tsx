"use client";

import { useState } from "react";
import UnifiedContactForm, { type OutreachType } from "./UnifiedContactForm";

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

const briefingSteps = [
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

type Props = {
  initialType: OutreachType;
};

export default function ContactExperience({ initialType }: Props) {
  const [type, setType] = useState<OutreachType>(initialType);
  const isBriefing = type === "briefing";

  return (
    <section className="relative px-6 md:px-16 py-16 md:py-24 border-b border-border-gray">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <aside className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
          {isBriefing ? (
            <BriefingSidebar />
          ) : (
            <ChannelsSidebar />
          )}
        </aside>

        <div className="lg:col-span-7">
          <div className="border border-border-gray rounded-2xl p-6 sm:p-8 md:p-10 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-3">
                {isBriefing ? "Request a Briefing" : "Send a Message"}
              </span>
              <h2 className="text-2xl sm:text-3xl mb-2">
                {isBriefing
                  ? "Tell us about your agency."
                  : "We typically respond within one business day."}
              </h2>
              <p className="text-white/60 mb-6 sm:mb-8">
                {isBriefing
                  ? "Every field is confidential. We respond within one business day."
                  : "Pick the type of outreach below — we'll route you to the right team."}
              </p>

              <UnifiedContactForm type={type} onTypeChange={setType} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelsSidebar() {
  return (
    <>
      <div>
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
          Direct Channels
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
          Reach the right team, faster.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
        {channels.map((c) => (
          <div
            key={c.label}
            className="bg-background p-5 sm:p-6 flex flex-col gap-2 min-h-[140px] sm:min-h-[150px]"
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
    </>
  );
}

function BriefingSidebar() {
  return (
    <>
      <div>
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
          What Happens Next
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
          Four steps to a tailored briefing.
        </h2>
      </div>

      <div className="flex flex-col gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
        {briefingSteps.map((s) => (
          <div
            key={s.number}
            className="bg-background p-5 sm:p-6 flex gap-4 sm:gap-5 items-start"
          >
            <span className="text-primary text-sm tracking-widest pt-1">
              {s.number}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">{s.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-border-gray rounded-2xl p-6 bg-white/[0.02]">
        <p className="text-white/65 text-sm leading-relaxed">
          Already have a procurement vehicle, RFP, or pilot timeline? Mention
          it in the form — our team will route your request to the right
          specialist.
        </p>
      </div>
    </>
  );
}
