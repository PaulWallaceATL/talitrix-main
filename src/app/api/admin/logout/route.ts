import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthenticatedAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  // Only a valid session can clear its own cookie — prevents anonymous
  // logout-CSRF from forcing an admin's session to drop.
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
