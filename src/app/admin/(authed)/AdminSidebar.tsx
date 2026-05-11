"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "../LogoutButton";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News Articles" },
  { href: "/admin/submissions/contact", label: "Contact" },
  { href: "/admin/submissions/get-started", label: "Get Started" },
  {
    href: "/admin/submissions/participant-registration",
    label: "Participant Registration",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-border-gray bg-black/80 backdrop-blur-md flex items-stretch">
        <Link
          href="/admin"
          className="flex items-center px-5 border-r border-border-gray"
        >
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">
              Talitrix
            </span>
            <span className="text-sm">Admin</span>
          </span>
        </Link>
        <div className="flex-1" />
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="admin-mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="h-full aspect-square flex items-center justify-center border-l border-border-gray text-white hover:text-primary transition-colors"
        >
          <BurgerIcon open={open} />
        </button>
      </header>

      <aside
        id="admin-mobile-nav"
        aria-hidden={!open ? "true" : undefined}
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-border-gray bg-black/95 backdrop-blur-md flex flex-col transform transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:max-w-none lg:bg-black/40 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-6 py-6 border-b border-border-gray flex items-center justify-between">
          <Link
            href="/admin"
            className="flex flex-col"
            onClick={() => setOpen(false)}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Talitrix
            </span>
            <span className="text-lg">Admin</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-white/80 hover:bg-white/[0.05] hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-gray flex flex-col gap-3">
          <Link
            href="/"
            className="text-xs text-white/50 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            ← Back to talitrix.com
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

const BurgerIcon = ({ open }: { open: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line
      x1="3"
      y1="6"
      x2="21"
      y2="6"
      style={{
        transition: "transform 200ms ease, opacity 200ms ease",
        transformOrigin: "center",
        transform: open ? "translate(0,6px) rotate(45deg)" : "none",
      }}
    />
    <line
      x1="3"
      y1="12"
      x2="21"
      y2="12"
      style={{
        transition: "opacity 150ms ease",
        opacity: open ? 0 : 1,
      }}
    />
    <line
      x1="3"
      y1="18"
      x2="21"
      y2="18"
      style={{
        transition: "transform 200ms ease, opacity 200ms ease",
        transformOrigin: "center",
        transform: open ? "translate(0,-6px) rotate(-45deg)" : "none",
      }}
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
