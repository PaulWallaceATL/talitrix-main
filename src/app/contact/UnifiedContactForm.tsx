"use client";

import { useState } from "react";
import {
  TextField,
  TextArea,
  SelectField,
  SubmitButton,
} from "@/components/FormField";
import { OUTREACH_TYPES, type OutreachType } from "./outreach";

const agencyTypes = [
  { value: "sheriff", label: "Sheriff's Office" },
  { value: "doc", label: "Department of Corrections" },
  { value: "pretrial", label: "Pretrial Services" },
  { value: "probation", label: "Probation / Community Supervision" },
  { value: "court", label: "Court / Judicial" },
  { value: "state", label: "State Agency" },
  { value: "other", label: "Other" },
];

const interestAreas = [
  { value: "tband", label: "All in ONE Band Hardware" },
  { value: "intake", label: "ONE Intake" },
  { value: "jms", label: "ONE Jail Management" },
  { value: "probation", label: "ONE Pre-Trial & Probation" },
  { value: "score", label: "Talitrix Score" },
  { value: "platform", label: "Full Talitrix ONE Platform" },
];

const timelines = [
  { value: "immediate", label: "Immediate (0–3 months)" },
  { value: "near", label: "Near-term (3–6 months)" },
  { value: "this-year", label: "This fiscal year" },
  { value: "next-year", label: "Next fiscal year" },
  { value: "exploring", label: "Exploring / no timeline yet" },
];

type Props = {
  type: OutreachType;
  onTypeChange: (t: OutreachType) => void;
};

export default function UnifiedContactForm({ type, onTypeChange }: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isBriefing = type === "briefing";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, unknown>;
    data.type = type;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submission failed.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-3 py-12 text-center">
        <span className="text-primary text-xs uppercase tracking-[0.3em]">
          {isBriefing ? "Briefing Request Received" : "Message Received"}
        </span>
        <h3 className="text-2xl">
          {isBriefing
            ? "We'll be in touch within one business day."
            : "Thanks — we'll be in touch."}
        </h3>
        <p className="text-white/60 max-w-md mx-auto">
          {isBriefing
            ? "A member of the Talitrix briefing team will reach out to schedule your tailored read-out."
            : "A member of the Talitrix team will respond within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-widest text-white/60">
          What can we help with?
        </span>
        <div
          role="tablist"
          aria-label="Outreach type"
          className="grid grid-cols-2 sm:grid-cols-5 gap-2"
        >
          {OUTREACH_TYPES.map((t) => {
            const active = type === t.value;
            return (
              <button
                key={t.value}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => onTypeChange(t.value)}
                className={`px-3 py-3 rounded-xl border text-xs sm:text-sm transition-colors ${
                  active
                    ? "bg-primary/15 border-primary/60 text-white"
                    : "bg-white/[0.04] border-border-gray text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="First Name" name="firstName" required />
        <TextField label="Last Name" name="lastName" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label={isBriefing ? "Work Email" : "Email"}
          name="email"
          type="email"
          required
          placeholder="you@agency.gov"
        />
        <TextField label="Phone" name="phone" type="tel" />
      </div>

      {isBriefing ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TextField label="Title / Role" name="title" required />
            <TextField label="Agency / Organization" name="agency" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SelectField
              label="Agency Type"
              name="agencyType"
              required
              options={agencyTypes}
            />
            <TextField
              label="Population / Caseload Size"
              name="caseload"
              placeholder="e.g. 1,200 inmates · 4,500 caseload"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SelectField
              label="Primary Area of Interest"
              name="interest"
              required
              options={interestAreas}
            />
            <SelectField
              label="Deployment Timeline"
              name="timeline"
              required
              options={timelines}
            />
          </div>

          <TextArea
            label="What outcomes are you trying to drive?"
            name="message"
            rows={5}
            placeholder="Briefly describe your goals, current systems, and any context our team should know."
          />
        </>
      ) : (
        <>
          <TextField label="Organization" name="organization" />
          <TextArea
            label="How can we help?"
            name="message"
            required
            rows={6}
            placeholder="Tell us a little about what you're working on…"
          />
        </>
      )}

      <div className="pt-2">
        <SubmitButton loading={status === "loading"}>
          {isBriefing ? "Request Briefing" : "Send Message"}
        </SubmitButton>
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <p className="text-xs text-white/40 max-w-lg">
        {isBriefing
          ? "Your information is held in confidence and used only to schedule and prepare your private briefing."
          : "By submitting this form you agree to our privacy policy. Talitrix uses your information only to respond to your inquiry."}
      </p>
    </form>
  );
}
