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
  // Build-time only optimizations. These change how the bundle is produced —
  // not how anything renders, animates, or behaves at runtime.
  //
  // optimizePackageImports rewrites barrel imports (e.g. `react-icons/io5`,
  // `motion/react`) to per-symbol paths so only the icons/utilities actually
  // used are bundled, cutting unused JavaScript and main-thread parse cost.
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react", "motion"],
  },
  // Strip console.log/debug/info from production client bundles while keeping
  // error + warn for diagnostics. Purely a build-time size/CPU saving.
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
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
      {
        source: "/talitrix-one/intake",
        destination: "/talitrix-one/jail-management",
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
