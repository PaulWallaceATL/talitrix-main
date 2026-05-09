"use client";

import { useState } from "react";
import {
  TextField,
  SelectField,
  SubmitButton,
} from "@/components/FormField";

const idTypes = [
  { value: "drivers", label: "Driver's License" },
  { value: "state-id", label: "State ID" },
  { value: "passport", label: "Passport" },
  { value: "agency", label: "Agency-issued ID" },
];

export default function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [agree, setAgree] = useState(false);

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
          Identity Verified
        </span>
        <h3 className="text-2xl">You're set up. Step 2 unlocks next.</h3>
        <p className="text-white/60 max-w-md mx-auto">
          Check your email for instructions on pairing your T-Band and
          installing the Talitrix Participant App.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="Legal First Name" name="firstName" required />
        <TextField label="Legal Last Name" name="lastName" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          required
        />
        <TextField
          label="Last 4 of SSN"
          name="ssnLast4"
          required
          placeholder="XXXX"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label="Participant ID"
          name="participantId"
          required
          hint="Provided by your supervising agency."
        />
        <TextField
          label="T-Band Serial Number"
          name="serial"
          hint="Found on the inside of the band, near the lock."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />
        <TextField
          label="Mobile Phone"
          name="phone"
          type="tel"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField
          label="Government ID Type"
          name="idType"
          required
          options={idTypes}
        />
        <TextField label="ID Number" name="idNumber" required />
      </div>

      <TextField
        label="Current Address"
        name="address"
        required
        placeholder="Street, City, State, ZIP"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField label="Supervising Agency" name="agency" required />
        <TextField
          label="Supervisor / Officer Name"
          name="supervisor"
        />
      </div>

      <label className="flex gap-3 items-start text-sm text-white/65 mt-2">
        <input
          type="checkbox"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 accent-primary"
        />
        <span>
          I confirm that the information above is accurate and I understand
          that Talitrix collects this information at the direction of my
          supervising agency. I have reviewed the{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Notice
          </a>{" "}
          and{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Use
          </a>
          .
        </span>
      </label>

      <div className="pt-2">
        <SubmitButton loading={status === "loading"}>
          Continue to Step 2
        </SubmitButton>
      </div>
    </form>
  );
}
