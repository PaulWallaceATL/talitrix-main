import { Resend } from "resend";

const LEADS_TO = process.env.LEADS_TO_EMAIL ?? "bdleads@talitrix.com";
const FROM =
  process.env.RESEND_FROM ?? "Talitrix Website <notifications@talitrix.com>";

function resendApiKey(): string | null {
  return process.env.RESEND_API_KEY ?? process.env.RESEND ?? null;
}

function line(label: string, value: string | null | undefined): string {
  if (!value?.trim()) return "";
  return `${label}: ${value.trim()}\n`;
}

export type BriefingLead = {
  kind: "briefing";
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  agency: string;
  agencyType: string;
  phone: string | null;
  caseload: string | null;
  interest: string;
  timeline: string;
  message: string | null;
};

export type ContactLead = {
  kind: "contact";
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  organization: string | null;
  message: string;
};

export type LeadPayload = BriefingLead | ContactLead;

function formatLeadText(lead: LeadPayload): string {
  const header =
    lead.kind === "briefing"
      ? `New briefing / get-started lead (${lead.type})`
      : `New contact form lead (${lead.type})`;

  const shared =
    line("Name", `${lead.firstName} ${lead.lastName}`) +
    line("Email", lead.email);

  if (lead.kind === "briefing") {
    return (
      `${header}\n\n` +
      shared +
      line("Title", lead.title) +
      line("Agency", lead.agency) +
      line("Agency type", lead.agencyType) +
      line("Phone", lead.phone) +
      line("Caseload", lead.caseload) +
      line("Interest", lead.interest) +
      line("Timeline", lead.timeline) +
      line("Message", lead.message)
    ).trim();
  }

  return (
    `${header}\n\n` +
    shared +
    line("Phone", lead.phone) +
    line("Organization", lead.organization) +
    line("Message", lead.message)
  ).trim();
}

function subjectFor(lead: LeadPayload): string {
  const name = `${lead.firstName} ${lead.lastName}`;
  if (lead.kind === "briefing") {
    return `[Talitrix Lead] Briefing request — ${name} (${lead.agency})`;
  }
  return `[Talitrix Lead] Contact — ${name} (${lead.type})`;
}

export async function sendLeadEmail(lead: LeadPayload): Promise<void> {
  const apiKey = resendApiKey();
  if (!apiKey) {
    console.warn("lead email skipped: RESEND_API_KEY is not set");
    return;
  }

  const resend = new Resend(apiKey);
  const text = formatLeadText(lead);

  const { error } = await resend.emails.send({
    from: FROM,
    to: [LEADS_TO],
    replyTo: lead.email,
    subject: subjectFor(lead),
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
