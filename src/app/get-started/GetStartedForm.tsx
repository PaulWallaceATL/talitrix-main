"use client";

import { useState } from "react";
import {
  TextField,
  TextArea,
  SelectField,
  SubmitButton,
} from "@/components/FormField";

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
  { value: "tband", label: "T-Band Hardware" },
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

export default function GetStartedForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/get-started", {
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
          Briefing Request Received
        </span>
        <h3 className="text-2xl">We'll be in touch within one business day.</h3>
        <p className="text-white/60 max-w-md mx-auto">
          A member of the Talitrix briefing team will reach out to schedule
          your tailored read-out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="First Name" name="firstName" required />
        <TextField label="Last Name" name="lastName" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="Title / Role" name="title" required />
        <TextField
          label="Work Email"
          name="email"
          type="email"
          required
          placeholder="you@agency.gov"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="Agency / Organization" name="agency" required />
        <SelectField
          label="Agency Type"
          name="agencyType"
          required
          options={agencyTypes}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="Phone" name="phone" type="tel" />
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

      <div className="pt-2">
        <SubmitButton loading={status === "loading"}>
          Request Briefing
        </SubmitButton>
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <p className="text-xs text-white/40 max-w-lg">
        Your information is held in confidence and used only to schedule and
        prepare your private briefing.
      </p>
    </form>
  );
}
