import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export const config = {
  matcher: ["/admin/:path*"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (verifySessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}
