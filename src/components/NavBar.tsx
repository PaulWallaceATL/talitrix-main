"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  desc?: string;
  children?: NavItem[];
};

const NAV_TREE: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Platform",
    href: "/talitrix-one",
    children: [
      {
        label: "Talitrix ONE",
        href: "/talitrix-one",
        desc: "The unified ecosystem connecting hardware, software, and intelligence.",
      },
      {
        label: "T-Band",
        href: "/talitrix-one/t-band",
        desc: "The first independent wrist-worn GPS monitoring device.",
      },
      {
        label: "ONE Intake",
        href: "/talitrix-one/intake",
        desc: "Centralized booking, identity, and classification.",
      },
      {
        label: "ONE Jail Management",
        href: "/talitrix-one/jail-management",
        desc: "The custody lifecycle on one connected system.",
      },
      {
        label: "ONE Pre-Trial & Probation",
        href: "/talitrix-one/pretrial-probation",
        desc: "End-to-end community supervision in a single platform.",
      },
      {
        label: "Talitrix Score",
        href: "/talitrix-one/score",
        desc: "Behavioral intelligence and defensible data.",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "All Solutions",
        href: "/solutions",
        desc: "How Talitrix ONE adapts to every stakeholder in the lifecycle.",
      },
      {
        label: "Sheriffs & Agency Leaders",
        href: "/solutions/sheriffs",
        desc: "Decisions you can stand behind.",
      },
      {
        label: "Pretrial & Supervision",
        href: "/solutions/pretrial",
        desc: "Proactive intervention, not reactive administration.",
      },
      {
        label: "Courts & Legal",
        href: "/solutions/courts",
        desc: "Data integrity and institutional credibility.",
      },
      {
        label: "Participants",
        href: "/solutions/participants",
        desc: "Support, clarity, and dignity.",
      },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "News", href: "/news" },
];

const RIGHT_LINKS: NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Participant Registration", href: "/participant-registration" },
];

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );
  const [lastPathname, setLastPathname] = useState(pathname);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setDrawerOpen(false);
    setOpenMenu(null);
    setOpenMobileSection(null);
  }

  useEffect(() => {
    if (drawerOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  if (isAdmin) return null;

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  const onTriggerEnter = (label: string) => {
    cancelClose();
    setOpenMenu(label);
  };

  const onTriggerClick = (label: string) => {
    cancelClose();
    setOpenMenu((cur) => (cur === label ? null : label));
  };

  const isPathInGroup = (item: NavItem) => {
    if (!item.children) return pathname === item.href;
    return item.children.some(
      (c) => pathname === c.href || pathname?.startsWith(`${c.href}/`),
    );
  };

  const activeMenuItem = NAV_TREE.find(
    (i) => i.label === openMenu && i.children,
  );

  return (
    <>
      <header
        className={`h-16 lg:h-24 left-0 w-full z-40 border-b border-border-gray flex items-stretch ${
          isHome
            ? "absolute top-0"
            : "fixed top-0 backdrop-blur-md bg-black/40"
        }`}
      >
        <div className="flex items-center px-6 lg:px-10 xl:px-16 border-border-gray lg:border-r shrink-0">
          <Link href={"/"} onClick={() => setDrawerOpen(false)}>
            <Image
              src={"/talitrix-logo.svg"}
              alt="Talitrix Logo"
              width={188}
              height={24}
              className="object-contain h-5 lg:h-6 w-auto"
            />
          </Link>
        </div>

        <nav
          className="hidden lg:flex gap-8 xl:gap-12 px-8 xl:px-12 items-center w-full"
          onMouseLeave={scheduleClose}
        >
          {NAV_TREE.map((item) => {
            const isActive = isPathInGroup(item);
            const isOpen = openMenu === item.label;
            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="h-full flex items-center"
                  onMouseEnter={() => onTriggerEnter(item.label)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${item.label.toLowerCase()}`}
                    onClick={() => onTriggerClick(item.label)}
                    className={`inline-flex items-center gap-1.5 transition-colors hover:text-primary ${
                      isActive || isOpen ? "text-primary" : "text-white"
                    }`}
                  >
                    {item.label}
                    <Chevron open={isOpen} />
                  </button>
                </div>
              );
            }
            return (
              <Link
                href={item.href}
                key={item.label}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(null);
                }}
                className={`transition-colors hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex gap-8 xl:gap-12 px-8 xl:px-12 items-center border-x border-border-gray shrink-0">
          {RIGHT_LINKS.map((nav) => {
            const active = pathname === nav.href;
            return (
              <Link
                href={nav.href}
                key={nav.href}
                className={`flex gap-1 shrink-0 transition-colors hover:text-primary ${
                  active ? "text-primary" : ""
                }`}
              >
                {nav.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/get-started"
          className="hidden lg:flex shrink-0 px-10 xl:px-16 bg-white/14 backdrop-blur-lg items-center transition-colors hover:bg-primary/40"
        >
          Get Started
        </Link>

        <button
          type="button"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav"
          onClick={() => setDrawerOpen((v) => !v)}
          className="lg:hidden ml-auto h-full aspect-square flex items-center justify-center border-l border-border-gray text-white hover:text-primary transition-colors"
        >
          <span className="sr-only">
            {drawerOpen ? "Close menu" : "Open menu"}
          </span>
          <BurgerIcon open={drawerOpen} />
        </button>

        {activeMenuItem && (
          <div
            id={`mega-${activeMenuItem.label.toLowerCase()}`}
            className="hidden lg:block absolute left-0 right-0 top-full bg-black/90 backdrop-blur-xl border-b border-border-gray z-40"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            role="menu"
          >
            <div className="px-10 xl:px-16 py-10">
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-6 block">
                {activeMenuItem.label}
              </span>
              <div
                className={`grid gap-4 ${
                  activeMenuItem.children!.length > 5
                    ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                    : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {activeMenuItem.children!.map((child) => {
                  const childActive =
                    pathname === child.href ||
                    pathname?.startsWith(`${child.href}/`);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpenMenu(null)}
                      role="menuitem"
                      className={`group relative flex flex-col gap-2 p-5 rounded-xl border transition-colors ${
                        childActive
                          ? "border-primary/50 bg-primary/5"
                          : "border-border-gray bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span
                          className={`text-base ${
                            childActive ? "text-primary" : "text-white"
                          }`}
                        >
                          {child.label}
                        </span>
                        <span className="text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </span>
                      {child.desc && (
                        <span className="text-sm text-white/60 leading-relaxed">
                          {child.desc}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setDrawerOpen(false)}
        />

        <div
          className={`absolute top-16 left-0 right-0 bg-black border-b border-border-gray transition-transform duration-300 ${
            drawerOpen ? "translate-y-0" : "-translate-y-2"
          } max-h-[calc(100dvh-4rem)] overflow-y-auto`}
        >
          <nav className="flex flex-col">
            {NAV_TREE.map((item) => {
              if (item.children) {
                const sectionOpen = openMobileSection === item.label;
                const groupActive = isPathInGroup(item);
                return (
                  <div
                    key={item.label}
                    className="border-b border-border-gray"
                  >
                    <button
                      type="button"
                      aria-expanded={sectionOpen}
                      onClick={() =>
                        setOpenMobileSection((cur) =>
                          cur === item.label ? null : item.label,
                        )
                      }
                      className={`w-full flex items-center justify-between px-6 py-5 text-lg transition-colors ${
                        groupActive ? "text-primary" : "text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <Chevron open={sectionOpen} />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        sectionOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-l-2 border-primary/40 ml-6 mb-4 flex flex-col">
                          {item.children.map((child) => {
                            const childActive =
                              pathname === child.href ||
                              pathname?.startsWith(`${child.href}/`);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setDrawerOpen(false)}
                                className={`pl-4 pr-6 py-3 text-base transition-colors ${
                                  childActive
                                    ? "text-primary"
                                    : "text-white/85 hover:text-primary"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`px-6 py-5 border-b border-border-gray text-lg transition-colors ${
                    active
                      ? "text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {RIGHT_LINKS.map((nav) => {
              const active = pathname === nav.href;
              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setDrawerOpen(false)}
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
              onClick={() => setDrawerOpen(false)}
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

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      transition: "transform 200ms ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

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
