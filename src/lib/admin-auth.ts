import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "talitrix_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set to a string of at least 16 characters.",
    );
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function checkAdminPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqualStr(submitted, expected);
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `v1.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [v, expiresStr, sig] = parts;
  if (v !== "v1") return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  const payload = `${v}.${expiresStr}`;
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  return timingSafeEqualStr(sig, expected);
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const c = await cookies();
  return verifySessionToken(c.get(ADMIN_COOKIE)?.value);
}

export const SESSION_TTL_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
