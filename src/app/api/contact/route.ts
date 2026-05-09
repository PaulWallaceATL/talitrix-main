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
  const email = str(body.email, 320);
  const message = str(body.message, 5000);
  const inquiryType = str(body.inquiryType, 60);

  if (!firstName || !lastName || !email || !message || !inquiryType) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin()
    .from("contact_submissions")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: str(body.phone, 60),
      organization: str(body.organization, 200),
      inquiry_type: inquiryType,
      message,
    });

  if (error) {
    console.error("contact insert failed", error);
    return NextResponse.json(
      { error: "Could not save submission." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
