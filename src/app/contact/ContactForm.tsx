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
  const [status, setStatus] = useState<"idle" | "loading" | "success">(
    "idle",
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
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

      <p className="text-xs text-white/40 max-w-lg">
        By submitting this form you agree to our privacy policy. Talitrix uses
        your information only to respond to your inquiry.
      </p>
    </form>
  );
}
