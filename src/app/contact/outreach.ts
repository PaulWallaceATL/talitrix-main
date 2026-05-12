export type OutreachType =
  | "briefing"
  | "support"
  | "partnerships"
  | "press"
  | "other";

export const OUTREACH_TYPES: {
  value: OutreachType;
  label: string;
  short: string;
}[] = [
  { value: "briefing", label: "Sales & Briefings", short: "Briefing" },
  { value: "support", label: "Customer Support", short: "Support" },
  { value: "partnerships", label: "Partnerships", short: "Partner" },
  { value: "press", label: "Press & Media", short: "Press" },
  { value: "other", label: "Something else", short: "Other" },
];
