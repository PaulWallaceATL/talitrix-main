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

  const firstName = str(body.firstName, 120);
  const lastName = str(body.lastName, 120);
  const title = str(body.title, 200);
  const email = str(body.email, 320);
  const agency = str(body.agency, 200);
  const agencyType = str(body.agencyType, 60);
  const interest = str(body.interest, 60);
  const timeline = str(body.timeline, 60);

  if (
    !firstName ||
    !lastName ||
    !title ||
    !email ||
    !agency ||
    !agencyType ||
    !interest ||
    !timeline
  ) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin()
    .from("get_started_submissions")
    .insert({
      first_name: firstName,
      last_name: lastName,
      title,
      email,
      agency,
      agency_type: agencyType,
      phone: str(body.phone, 60),
      caseload: str(body.caseload, 200),
      interest,
      timeline,
      message: str(body.message, 5000),
    });

  if (error) {
    console.error("get-started insert failed", error);
    return NextResponse.json(
      { error: "Could not save submission." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
