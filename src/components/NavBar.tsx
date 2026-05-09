"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) return null;

  return (
    <header
      className={`h-24 left-0 w-full z-40 border-b border-border-gray flex ${
        isHome
          ? "absolute top-0"
          : "fixed top-0 backdrop-blur-md bg-black/40"
      }`}
    >
      <div className="flex items-center px-16 border-border-gray border-r shrink-0">
        <Link href={"/"}>
          <Image
            src={"/talitrix-logo.svg"}
            alt="Talitrix Logo"
            width={188}
            height={24}
            style={{ width: "auto", height: "1.5rem" }}
            className="object-contain"
          />
        </Link>
      </div>
      <nav className="flex gap-16 px-16 items-center w-full">
        {NavData.LT.map((nav, i) => {
          const active = pathname === nav.href;
          return (
            <Link
              href={nav.href}
              key={i}
              className={`flex gap-1 transition-colors hover:text-primary ${
                active ? "text-primary" : ""
              }`}
            >
              {nav.label}{" "}
              <span className="text-xs text-white/70">0{i + 1}</span>
            </Link>
          );
        })}
      </nav>
      <div className="flex gap-16 px-16 items-center border-x border-border-gray shrink-0">
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
        className="shrink-0 px-16 bg-white/14 backdrop-blur-lg flex items-center transition-colors hover:bg-primary/40"
      >
        Get Started
      </Link>
    </header>
  );
};

export default NavBar;

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
