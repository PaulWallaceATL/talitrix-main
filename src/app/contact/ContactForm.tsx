"use client";

import { useState } from "react";
import {
  TextField,
  TextArea,
  SelectField,
  SubmitButton,
} from "@/components/FormField";

const inquiryTypes = [
  { value: "sales", label: "Sales & Briefings" },
  { value: "support", label: "Customer Support" },
  { value: "press", label: "Press & Media" },
  { value: "partners", label: "Partnerships" },
  { value: "other", label: "Something else" },
];

export default function ContactForm() {
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
          Message Received
        </span>
        <h3 className="text-2xl">Thanks — we'll be in touch.</h3>
        <p className="text-white/60 max-w-md mx-auto">
          A member of the Talitrix team will respond within one business day.
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
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@agency.gov"
        />
        <TextField label="Phone" name="phone" type="tel" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="Organization" name="organization" />
        <SelectField
          label="Inquiry Type"
          name="inquiryType"
          required
          options={inquiryTypes}
        />
      </div>

      <TextArea
        label="How can we help?"
        name="message"
        required
        rows={6}
        placeholder="Tell us a little about what you're working on…"
      />

      <div className="pt-2">
        <SubmitButton loading={status === "loading"}>
          Send Message
        </SubmitButton>
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <p className="text-xs text-white/40 max-w-lg">
        By submitting this form you agree to our privacy policy. Talitrix uses
        your information only to respond to your inquiry.
      </p>
    </form>
  );
}
