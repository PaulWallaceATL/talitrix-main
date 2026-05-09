import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_TTL_SECONDS,
  checkAdminPassword,
  createSessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.password !== "string" || !body.password) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  if (!checkAdminPassword(body.password)) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 },
    );
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
