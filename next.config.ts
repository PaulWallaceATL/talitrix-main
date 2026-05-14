import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // Solutions pages consolidated to two audiences (Agencies + Participants).
      // The old per-role pages all forward to the unified Agencies page so
      // existing inbound links and SEO equity are preserved.
      {
        source: "/solutions/sheriffs",
        destination: "/solutions/agencies",
        permanent: true,
      },
      {
        source: "/solutions/pretrial",
        destination: "/solutions/agencies",
        permanent: true,
      },
      {
        source: "/solutions/courts",
        destination: "/solutions/agencies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
