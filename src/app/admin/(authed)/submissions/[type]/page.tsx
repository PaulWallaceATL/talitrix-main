import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import DeleteSubmissionButton from "./DeleteSubmissionButton";

export const dynamic = "force-dynamic";

type SubmissionType = "contact" | "get-started" | "participant-registration";

type FieldGroup = {
  label: string;
  rows: { label: string; key: string; mono?: boolean; pre?: boolean }[];
};

type TypeConfig = {
  table: string;
  title: string;
  eyebrow: string;
  description: string;
  groups: FieldGroup[];
};

const CONFIG: Record<SubmissionType, TypeConfig> = {
  contact: {
    table: "contact_submissions",
    title: "Contact Submissions",
    eyebrow: "Forms",
    description:
      "Every message sent through the public /contact form. Newest first.",
    groups: [
      {
        label: "Contact",
        rows: [
          { label: "First Name", key: "first_name" },
          { label: "Last Name", key: "last_name" },
          { label: "Email", key: "email", mono: true },
          { label: "Phone", key: "phone", mono: true },
          { label: "Organization", key: "organization" },
          { label: "Inquiry Type", key: "inquiry_type" },
        ],
      },
      {
        label: "Message",
        rows: [{ label: "Message", key: "message", pre: true }],
      },
    ],
  },
  "get-started": {
    table: "get_started_submissions",
    title: "Get Started Briefings",
    eyebrow: "Forms",
    description:
      "Every briefing request submitted from /get-started. Newest first.",
    groups: [
      {
        label: "Contact",
        rows: [
          { label: "First Name", key: "first_name" },
          { label: "Last Name", key: "last_name" },
          { label: "Title / Role", key: "title" },
          { label: "Email", key: "email", mono: true },
          { label: "Phone", key: "phone", mono: true },
        ],
      },
      {
        label: "Agency",
        rows: [
          { label: "Agency", key: "agency" },
          { label: "Agency Type", key: "agency_type" },
          { label: "Caseload", key: "caseload" },
          { label: "Interest", key: "interest" },
          { label: "Timeline", key: "timeline" },
        ],
      },
      {
        label: "Outcomes",
        rows: [{ label: "Message", key: "message", pre: true }],
      },
    ],
  },
  "participant-registration": {
    table: "participant_registrations",
    title: "Participant Registrations",
    eyebrow: "Forms",
    description:
      "Identity records submitted from /participant-registration. Sensitive — handle with care.",
    groups: [
      {
        label: "Identity",
        rows: [
          { label: "First Name", key: "first_name" },
          { label: "Last Name", key: "last_name" },
          { label: "Date of Birth", key: "dob" },
          { label: "SSN (last 4)", key: "ssn_last4", mono: true },
          { label: "ID Type", key: "id_type" },
          { label: "ID Number", key: "id_number", mono: true },
        ],
      },
      {
        label: "Contact",
        rows: [
          { label: "Email", key: "email", mono: true },
          { label: "Phone", key: "phone", mono: true },
          { label: "Address", key: "address" },
        ],
      },
      {
        label: "Supervision",
        rows: [
          { label: "Participant ID", key: "participant_id", mono: true },
          { label: "All in ONE Band Serial", key: "serial_number", mono: true },
          { label: "Agency", key: "agency" },
          { label: "Supervisor", key: "supervisor" },
        ],
      },
    ],
  },
};

type Params = Promise<{ type: string }>;

export default async function SubmissionsPage({ params }: { params: Params }) {
  const { type } = await params;
  const cfg = CONFIG[type as SubmissionType];
  if (!cfg) notFound();

  let rows: Record<string, unknown>[] = [];
  let envError: string | null = null;
  try {
    const { data, error } = await supabaseAdmin()
      .from(cfg.table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    rows = (data ?? []) as Record<string, unknown>[];
  } catch (err) {
    envError = err instanceof Error ? err.message : String(err);
  }

  return (
    <div className="px-6 py-8 md:px-12 md:py-12 max-w-6xl">
      <header className="mb-8 md:mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">
          {cfg.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl mt-2">{cfg.title}</h1>
        <p className="text-white/60 mt-3 max-w-2xl">{cfg.description}</p>
        <p className="text-white/40 text-sm mt-3">
          {rows.length} total submission{rows.length === 1 ? "" : "s"}
        </p>
      </header>

      {envError && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl border border-red-500/40 bg-red-500/5 text-red-200 text-sm">
          {envError}
        </div>
      )}

      {!envError && rows.length === 0 ? (
        <div className="p-8 sm:p-10 rounded-2xl border border-border-gray bg-white/[0.02] text-white/60 text-sm">
          Nothing here yet. Submissions captured from the public form will
          appear automatically.
        </div>
      ) : (
        <ul className="flex flex-col gap-5 sm:gap-6">
          {rows.map((r) => {
            const id = String(r.id);
            const created = r.created_at
              ? new Date(String(r.created_at)).toLocaleString()
              : "";
            return (
              <li
                key={id}
                className="rounded-2xl border border-border-gray bg-white/[0.02] overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 px-5 sm:px-6 py-4 border-b border-border-gray bg-white/[0.02]">
                  <div className="flex flex-col">
                    <span className="text-white">
                      {String(r.first_name ?? "")} {String(r.last_name ?? "")}
                    </span>
                    <span className="text-xs text-white/50">{created}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                    <span className="text-xs text-white/40">
                      ID {id.slice(0, 8)}
                    </span>
                    <DeleteSubmissionButton type={type} id={id} />
                  </div>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-6 sm:gap-y-8">
                  {cfg.groups.map((group) => (
                    <div key={group.label} className="flex flex-col gap-3">
                      <span className="text-xs uppercase tracking-widest text-primary/80">
                        {group.label}
                      </span>
                      <dl className="flex flex-col gap-2 text-sm">
                        {group.rows.map((row) => {
                          const v = r[row.key];
                          if (v == null || v === "") return null;
                          return (
                            <div
                              key={row.key}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3"
                            >
                              <dt className="text-white/45 text-xs uppercase tracking-widest">
                                {row.label}
                              </dt>
                              <dd
                                className={`sm:col-span-2 text-white/85 ${
                                  row.mono ? "font-mono text-xs" : ""
                                } ${row.pre ? "whitespace-pre-wrap" : ""}`}
                              >
                                {String(v)}
                              </dd>
                            </div>
                          );
                        })}
                      </dl>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
