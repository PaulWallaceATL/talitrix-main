import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import LenisProvider from "@/components/LenisProvider";
import { ORGANIZATION_JSON_LD, SITE_NAME, getSiteUrl } from "@/lib/seo";

const SITE = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Talitrix — Wrist-worn GPS Supervision & the Talitrix ONE Platform",
    template: "%s | Talitrix",
  },
  description:
    "Talitrix builds the T-Band — the first independent wrist-worn GPS supervision device — and the Talitrix ONE platform for sheriffs, departments of corrections, courts, and pretrial supervision. Real-time tracking, biometric verification, tamper detection.",
  applicationName: SITE_NAME,
  keywords: [
    "electronic monitoring",
    "wrist-worn GPS",
    "T-Band",
    "Talitrix ONE",
    "pretrial supervision",
    "probation technology",
    "ankle monitor alternative",
    "biometric verification",
    "jail management software",
    "community supervision",
    "court-ordered monitoring",
    "sheriff technology",
    "DOC software",
  ],
  category: "technology",
  authors: [{ name: SITE_NAME, url: SITE }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE,
    title:
      "Talitrix — Wrist-worn GPS Supervision & the Talitrix ONE Platform",
    description:
      "The new standard in monitoring and supervision technology. T-Band hardware. Talitrix ONE software. Built for sheriffs, DOC, courts, pretrial, and probation.",
    locale: "en_US",
    images: [
      {
        url: `${SITE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Talitrix — the new standard in monitoring and supervision technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talitrix — Wrist-worn GPS Supervision",
    description:
      "T-Band hardware + Talitrix ONE software. Built for sheriffs, DOC, courts, pretrial, and probation.",
    images: [`${SITE}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD(SITE)),
          }}
        />
        <NavBar />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
