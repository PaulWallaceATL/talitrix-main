export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  const branchUrl = process.env.VERCEL_URL;
  if (branchUrl) return `https://${branchUrl.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_NAME = "Talitrix";

export const ORGANIZATION_JSON_LD = (siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl,
  logo: `${siteUrl}/talitrix-logo.svg`,
  description:
    "Talitrix builds the All in ONE Band — the first independent wrist-worn GPS supervision device — and the Talitrix ONE platform for sheriffs, departments of corrections, courts, and pretrial supervision.",
  sameAs: [],
});
