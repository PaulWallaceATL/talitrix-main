import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function str(v: unknown, max = 2000): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = {
    first_name: str(body.firstName, 120),
    last_name: str(body.lastName, 120),
    dob: str(body.dob, 20),
    ssn_last4: str(body.ssnLast4, 8),
    participant_id: str(body.participantId, 120),
    email: str(body.email, 320),
    phone: str(body.phone, 60),
    id_type: str(body.idType, 60),
    id_number: str(body.idNumber, 120),
    address: str(body.address, 500),
    agency: str(body.agency, 200),
  };

  for (const [k, v] of Object.entries(required)) {
    if (!v) {
      return NextResponse.json(
        { error: `Missing required field: ${k}` },
        { status: 400 },
      );
    }
  }

  const agreed = body.agree === true || body.agree === "on";
  if (!agreed) {
    return NextResponse.json(
      { error: "You must agree to continue." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin()
    .from("participant_registrations")
    .insert({
      ...required,
      serial_number: str(body.serial, 120),
      supervisor: str(body.supervisor, 200),
      agreed,
    });

  if (error) {
    console.error("participant-registration insert failed", error);
    return NextResponse.json(
      { error: "Could not save submission." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
