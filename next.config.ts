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
      // /talitrix-one/pretrial-probation was split into two dedicated
      // pages (/pretrial and /probation). Forward old inbound links
      // to the Pre-Trial page (chronologically the first phase).
      {
        source: "/talitrix-one/pretrial-probation",
        destination: "/talitrix-one/pretrial",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
