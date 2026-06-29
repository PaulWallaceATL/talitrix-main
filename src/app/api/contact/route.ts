import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/lead-email";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

function str(v: unknown, max = 2000): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

const BRIEFING_TYPES = new Set(["briefing", "sales"]);

export async function POST(req: Request) {
  const limit = checkRateLimit(req, {
    key: "contact",
    limit: 5,
    windowMs: 60_000,
  });
  if (!limit.ok) return rateLimitResponse(limit.retryAfter);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = (str(body.type, 60) ?? "other").toLowerCase();
  const firstName = str(body.firstName, 120);
  const lastName = str(body.lastName, 120);
  const email = str(body.email, 320);

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const sb = supabaseAdmin();

  if (BRIEFING_TYPES.has(type)) {
    const title = str(body.title, 200);
    const agency = str(body.agency, 200);
    const agencyType = str(body.agencyType, 60);
    const interest = str(body.interest, 60);
    const timeline = str(body.timeline, 60);

    if (!title || !agency || !agencyType || !interest || !timeline) {
      return NextResponse.json(
        { error: "Missing required briefing fields." },
        { status: 400 },
      );
    }

    const { error } = await sb.from("get_started_submissions").insert({
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
      console.error("briefing insert failed", error);
      return NextResponse.json(
        { error: "Could not save submission." },
        { status: 500 },
      );
    }

    try {
      await sendLeadEmail({
        kind: "briefing",
        type,
        firstName,
        lastName,
        email,
        title,
        agency,
        agencyType,
        phone: str(body.phone, 60),
        caseload: str(body.caseload, 200),
        interest,
        timeline,
        message: str(body.message, 5000),
      });
    } catch (emailError) {
      console.error("briefing lead email failed", emailError);
    }
  } else {
    const message = str(body.message, 5000);
    if (!message) {
      return NextResponse.json(
        { error: "Please include a message." },
        { status: 400 },
      );
    }

    const phone = str(body.phone, 60);
    const organization = str(body.organization, 200);

    const { error } = await sb.from("contact_submissions").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      organization,
      inquiry_type: type,
      message,
    });

    if (error) {
      console.error("contact insert failed", error);
      return NextResponse.json(
        { error: "Could not save submission." },
        { status: 500 },
      );
    }

    try {
      await sendLeadEmail({
        kind: "contact",
        type,
        firstName,
        lastName,
        email,
        phone,
        organization,
        message,
      });
    } catch (emailError) {
      console.error("contact lead email failed", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
