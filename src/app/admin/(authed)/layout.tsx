import type { Metadata } from "next";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

export const metadata: Metadata = {
  title: "Admin · Talitrix",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News Articles" },
  { href: "/admin/submissions/contact", label: "Contact" },
  { href: "/admin/submissions/get-started", label: "Get Started" },
  {
    href: "/admin/submissions/participant-registration",
    label: "Participant Registration",
  },
];

export default function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-72 shrink-0 border-r border-border-gray bg-black/40 backdrop-blur-md flex flex-col">
        <div className="px-6 py-6 border-b border-border-gray flex items-center justify-between">
          <Link href="/admin" className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Talitrix
            </span>
            <span className="text-lg">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-1 p-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 rounded-lg text-sm text-white/80 hover:bg-white/[0.05] hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border-gray flex flex-col gap-3">
          <Link
            href="/"
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            ← Back to talitrix.com
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
