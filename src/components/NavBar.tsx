"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin") ?? false;
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

  if (isAdmin) return null;

  const allLinks = [...NavData.LT, ...NavData.RT];

  return (
    <>
      <header
        className={`h-16 lg:h-24 left-0 w-full z-40 border-b border-border-gray flex items-stretch ${
          isHome
            ? "absolute top-0"
            : "fixed top-0 backdrop-blur-md bg-black/40"
        }`}
      >
        <div className="flex items-center px-6 lg:px-16 border-border-gray lg:border-r shrink-0">
          <Link href={"/"} onClick={() => setOpen(false)}>
            <Image
              src={"/talitrix-logo.svg"}
              alt="Talitrix Logo"
              width={188}
              height={24}
              className="object-contain h-5 lg:h-6 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex gap-16 px-16 items-center w-full">
          {NavData.LT.map((nav, i) => {
            const active = pathname === nav.href;
            return (
              <Link
                href={nav.href}
                key={i}
                className={`transition-colors hover:text-primary ${
                  active ? "text-primary" : ""
                }`}
              >
                {nav.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex gap-16 px-16 items-center border-x border-border-gray shrink-0">
          {NavData.RT.map((nav, i) => (
            <Link
              href={nav.href}
              key={i}
              className="flex gap-1 shrink-0 transition-colors hover:text-primary"
            >
              {nav.label}
            </Link>
          ))}
        </div>

        <Link
          href="/get-started"
          className="hidden lg:flex shrink-0 px-16 bg-white/14 backdrop-blur-lg items-center transition-colors hover:bg-primary/40"
        >
          Get Started
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden ml-auto h-full aspect-square flex items-center justify-center border-l border-border-gray text-white hover:text-primary transition-colors"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <BurgerIcon open={open} />
        </button>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-16 left-0 right-0 bg-black border-b border-border-gray transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-2"
          } max-h-[calc(100dvh-4rem)] overflow-y-auto`}
        >
          <nav className="flex flex-col">
            {allLinks.map((nav) => {
              const active = pathname === nav.href;
              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setOpen(false)}
                  className={`px-6 py-5 border-b border-border-gray text-lg transition-colors ${
                    active
                      ? "text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {nav.label}
                </Link>
              );
            })}
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className="px-6 py-5 bg-white/10 hover:bg-primary/40 backdrop-blur-md text-lg transition-colors"
            >
              Get Started →
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;

const BurgerIcon = ({ open }: { open: boolean }) => (
  <svg
    width="24"
    height="24"
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

const NavData = {
  LT: [
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Services", href: "/services" },
    { label: "News", href: "/news" },
  ],
  RT: [
    { label: "Contact", href: "/contact" },
    { label: "Participant Registration", href: "/participant-registration" },
  ],
};
