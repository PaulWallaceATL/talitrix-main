import type { Metadata } from "next";

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

export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_ALT =
  "Talitrix — The Standard for Modern Supervision";

export const ORGANIZATION_JSON_LD = (siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl,
  logo: `${siteUrl}/talitrix-logo.svg`,
  description:
    "Talitrix builds the All-In-One Band — the first independent wrist-worn GPS supervision device — and the Talitrix ONE platform for sheriffs, departments of corrections, courts, and pretrial supervision.",
  sameAs: [],
});

/**
 * Build a complete page-level Metadata block (title, description,
 * canonical, openGraph, twitter) wired to the shared OG image. Use a
 * shorter `social` copy when the long description is too dense for a
 * social preview.
 */
export function pageMetadata({
  path,
  title,
  description,
  socialTitle,
  socialDescription,
}: {
  path: string;
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
}): Metadata {
  const SITE = getSiteUrl();
  const url = `${SITE}${path}`;
  const ogTitle = socialTitle ?? title;
  const ogDescription = socialDescription ?? description;
  const ogImageUrl = `${SITE}${OG_IMAGE_PATH}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };
}
