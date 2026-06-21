"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type IconName =
  | "stack"
  | "watch"
  | "intake"
  | "facility"
  | "route"
  | "pulse"
  | "globe"
  | "shieldStar"
  | "team"
  | "scale"
  | "userHeart";

type NavItem = {
  label: string;
  href: string;
  desc?: string;
  icon?: IconName;
  menuEyebrow?: string;
  /** Render the mega menu items in a single stacked column */
  stacked?: boolean;
  /** Indent this item under the entry above it (stacked menus only) */
  indent?: boolean;
  /** Small category tag shown next to the label, e.g. Hardware / Module */
  tag?: string;
  children?: NavItem[];
};

type NavMenuSection = {
  eyebrow: string;
  column: "left" | "right";
  items: NavItem[];
};

type NavMenuItem = NavItem & {
  overview?: NavItem;
  sections?: NavMenuSection[];
};

type MenuCta = {
  eyebrow: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
};

const isChildActive = (
  child: NavItem,
  siblings: NavItem[],
  pathname: string | null,
) => {
  if (!pathname) return false;
  if (pathname !== child.href && !pathname.startsWith(`${child.href}/`)) {
    return false;
  }
  // If a sibling has a more specific (longer) matching href, defer to it so
  // a parent overview link doesn't light up on every sub-page.
  const moreSpecific = siblings.some(
    (s) =>
      s !== child &&
      s.href.length > child.href.length &&
      (pathname === s.href || pathname.startsWith(`${s.href}/`)),
  );
  return !moreSpecific;
};

const getMenuLinks = (item: NavMenuItem): NavItem[] => {
  if (item.sections) {
    const links = item.overview ? [item.overview] : [];
    return links.concat(item.sections.flatMap((section) => section.items));
  }
  return item.children ?? [];
};

const NAV_TREE: NavMenuItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Platform",
    href: "/talitrix-one",
    overview: {
      label: "TalitrixONE Overview",
      href: "/talitrix-one",
      icon: "stack",
      desc: "One connected ecosystem supporting ITW and OTW electronic monitoring and community supervision.",
    },
    sections: [
      {
        eyebrow: "Inside the Walls",
        column: "left",
        items: [
          {
            label: "ONE Jail Management System",
            href: "/talitrix-one/jail-management",
            icon: "facility",
            desc: "Facility operations and management",
            tag: "ITW",
          },
          {
            label: "Individual Monitoring",
            href: "/talitrix-one/all-in-one-band",
            icon: "watch",
            desc: "Inside-the-walls monitoring with the Talitrix All-In-One band.",
            tag: "Hardware",
          },
        ],
      },
      {
        eyebrow: "Outside the Walls",
        column: "left",
        items: [
          {
            label: "ONE Pre-Trial",
            href: "/talitrix-one/pretrial",
            icon: "route",
            desc: "Where electronic monitoring and supervision begins.",
            tag: "OTW",
          },
          {
            label: "ONE Probation",
            href: "/talitrix-one/probation",
            icon: "team",
            desc: "End-to-end electronic monitoring solutions for community supervision.",
            tag: "OTW",
          },
        ],
      },
      {
        eyebrow: "Hardware + Intelligence",
        column: "right",
        items: [
          {
            label: "All-In-One Band",
            href: "/talitrix-one/all-in-one-band",
            icon: "watch",
            desc: "One band designed for ITW and OTW electronic monitoring and supervision.",
            tag: "Hardware",
          },
          {
            label: "Talitrix Score",
            href: "/talitrix-one/score",
            icon: "pulse",
            desc: "Data-driven insights designed to support better outcomes.",
            tag: "Intelligence",
          },
        ],
      },
    ],
  },
  {
    label: "Who We Serve",
    href: "/solutions/agencies",
    stacked: true,
    children: [
      {
        label: "Agencies",
        href: "/solutions/agencies",
        icon: "shieldStar",
        desc: "For sheriffs, courts, pretrial, probation, and DAs.",
      },
      {
        label: "Participants",
        href: "/solutions/participants",
        icon: "userHeart",
        desc: "Support, clarity, and dignity for the people you serve.",
      },
    ],
  },
  { label: "News", href: "/news" },
];

const MENU_CTAS: Record<string, MenuCta> = {
  Platform: {
    eyebrow: "See TalitrixONE In Action",
    headline: "Tailored briefings for your agency.",
    ctaLabel: "Talk to Our Team",
    ctaHref: "/contact",
  },
  "Who We Serve": {
    eyebrow: "See the Platform In Action",
    headline: "Talk to our team about your operation.",
    ctaLabel: "Talk to Our Team",
    ctaHref: "/contact",
  },
};

const RIGHT_LINKS: NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Participant Registration", href: "https://register.talitrix.com/" },
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
  const [menuLeft, setMenuLeft] = useState<number | null>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<string, HTMLElement | null>>({});

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

  // Auto-hide on scroll-down, reveal on scroll-up. We track scroll
  // direction via raw scrollY deltas (rAF-throttled) and toggle a
  // -translate-y-full on the header. The navbar always re-shows in
  // the top SHOW_AT_TOP px so the very top of the page never feels
  // like a hidden state.
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollYRef.current = window.scrollY;

    // Tight thresholds: hide almost immediately on any downward
    // scroll, only force-show in the very top 10 px so the navbar
    // doesn't pop in when the user is bouncing at the page top.
    const SHOW_AT_TOP = 10;
    const DELTA_THRESHOLD = 1;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollYRef.current;

        if (currentY < SHOW_AT_TOP) {
          setNavHidden(false);
        } else if (delta > DELTA_THRESHOLD) {
          setNavHidden(true);
        } else if (delta < -DELTA_THRESHOLD) {
          setNavHidden(false);
        }

        lastScrollYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    }, 200);
  };

  // Platform menu: center on viewports ≤1440px, align with the trigger
  // on wider screens. Other menus always align with their trigger.
  const measureMenuLeft = (label: string) => {
    const item = NAV_TREE.find((i) => i.label === label);
    if (typeof window === "undefined") return;

    const vw = window.innerWidth;
    const panelWidth = Math.min(
      0.94 * vw,
      item?.sections ? 1080 : item?.stacked ? 600 : 1080,
    );

    if (item?.sections && vw <= 1440) {
      setMenuLeft(null);
      return;
    }

    const trigger = triggerRefs.current[label];
    if (!trigger) return;

    const rawLeft = trigger.getBoundingClientRect().left;
    setMenuLeft(Math.max(16, Math.min(rawLeft, vw - panelWidth - 16)));
  };

  const onTriggerEnter = (label: string) => {
    cancelClose();
    measureMenuLeft(label);
    setOpenMenu(label);
  };

  const onTriggerClick = (label: string) => {
    cancelClose();
    measureMenuLeft(label);
    setOpenMenu((cur) => (cur === label ? null : label));
  };

  const isPathInGroup = (item: NavMenuItem) => {
    const links = getMenuLinks(item);
    if (links.length === 0) return pathname === item.href;
    return links.some(
      (c) => pathname === c.href || pathname?.startsWith(`${c.href}/`),
    );
  };

  const activeMenuItem = NAV_TREE.find(
    (i) => i.label === openMenu && (i.children || i.sections),
  );
  const activeCta = activeMenuItem ? MENU_CTAS[activeMenuItem.label] : null;

  // Don't apply the auto-hide while an interactive menu is open —
  // hiding the navbar would also pull the megamenu / drawer offscreen
  // mid-interaction.
  const isAnyMenuOpen = drawerOpen || openMenu !== null;
  const headerHidden = navHidden && !isAnyMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 h-16 lg:h-20 xl:h-24 left-0 w-full z-40 border-b border-border-gray flex items-stretch backdrop-blur-md bg-black/10 transition-transform duration-300 will-change-transform text-sm xl:text-base ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center px-6 lg:px-10 2xl:px-16 border-border-gray lg:border-r shrink-0">
          <Link href={"/"} onClick={() => setDrawerOpen(false)}>
            <Image
              src={"/talitrix-logo.svg"}
              alt="Talitrix Logo"
              width={197}
              height={32}
              priority
              className="object-contain h-5 lg:h-6 w-auto"
            />
          </Link>
        </div>

        <nav
          className="hidden lg:flex gap-6 xl:gap-12 px-6 xl:px-12 items-center w-full"
          onMouseLeave={scheduleClose}
        >
          {NAV_TREE.map((item) => {
            const isActive = isPathInGroup(item);
            const isOpen = openMenu === item.label;
            if (item.children || item.sections) {
              return (
                <div
                  key={item.label}
                  ref={(el) => {
                    triggerRefs.current[item.label] = el;
                  }}
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
                      isActive ? "text-primary" : "text-white"
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

        <div className="hidden lg:flex gap-6 xl:gap-12 px-6 xl:px-12 items-center border-x border-border-gray shrink-0">
          {RIGHT_LINKS.map((nav) => {
            const active = pathname === nav.href;
            const className = `flex gap-1 shrink-0 transition-colors hover:text-primary ${
              active ? "text-primary" : ""
            }`;

            if (nav.href.startsWith("http")) {
              return (
                <a
                  href={nav.href}
                  key={nav.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {nav.label}
                </a>
              );
            }

            return (
              <Link href={nav.href} key={nav.href} className={className}>
                {nav.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/get-started"
          className="hidden lg:flex shrink-0 px-8 2xl:px-16 bg-white/14 backdrop-blur-lg items-center transition-colors hover:bg-primary/40"
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
      </header>

      {/* Megamenu lives outside <header> on purpose: the header has its own
          backdrop-blur, and a descendant backdrop-filter can't see past an
          ancestor's filter in Chromium/WebKit. Rendering as a sibling lets
          the panel blur the page content directly. */}
      {activeMenuItem && (
        <div
          id={`mega-${activeMenuItem.label.toLowerCase()}`}
          className={`hidden lg:block fixed top-24 z-50 transition-transform duration-300 ${
            headerHidden ? "translate-y-[-200%]" : ""
          } ${menuLeft === null ? "left-1/2 -translate-x-1/2" : ""}`}
          style={menuLeft === null ? undefined : { left: menuLeft }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          role="menu"
        >
          {/* Invisible hover bridge so the cursor never leaves the menu zone while moving from trigger to panel */}
          <div className="absolute -top-3 left-0 right-0 h-3" aria-hidden />

          <div
            className={`relative ${
              activeMenuItem.stacked
                ? "w-[min(94vw,600px)]"
                : "w-[min(94vw,1080px)]"
            } rounded-b-2xl border border-white/15 bg-black/50 backdrop-blur-2xl overflow-hidden`}
            style={{
              boxShadow:
                "0 30px 80px rgba(0, 0, 0, 0.6), 0 8px 30px rgba(248, 122, 19, 0.08)",
            }}
          >
            <div className="px-8 pt-7 pb-5">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                {activeMenuItem.menuEyebrow ?? activeMenuItem.label}
              </span>
            </div>

            {activeMenuItem.sections ? (
              <PlatformMegaMenu
                item={activeMenuItem}
                pathname={pathname}
                cta={activeCta}
                onNavigate={() => setOpenMenu(null)}
              />
            ) : (
              <>
                <div
                  className={`px-4 pb-3 grid gap-x-4 gap-y-1 ${
                    activeMenuItem.stacked ? "grid-cols-1" : "md:grid-cols-2"
                  }`}
                >
                  {activeMenuItem.children!.map((child) => (
                    <MenuLink
                      key={`${child.href}-${child.label}`}
                      child={child}
                      siblings={activeMenuItem.children!}
                      pathname={pathname}
                      onNavigate={() => setOpenMenu(null)}
                    />
                  ))}
                </div>

                {activeCta && (
                  <MenuCtaFooter cta={activeCta} onNavigate={() => setOpenMenu(null)} />
                )}
              </>
            )}
          </div>
        </div>
      )}

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
              if (item.children || item.sections) {
                const sectionOpen = openMobileSection === item.label;
                const groupActive = isPathInGroup(item);
                const cta = MENU_CTAS[item.label];
                return (
                  <div key={item.label} className="border-b border-border-gray">
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
                        sectionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col px-3 pb-4 gap-1">
                          {item.sections ? (
                            <>
                              {item.overview && (
                                <MenuLink
                                  child={item.overview}
                                  siblings={getMenuLinks(item)}
                                  pathname={pathname}
                                  onNavigate={() => setDrawerOpen(false)}
                                  compact
                                />
                              )}
                              {item.sections.map((section) => (
                                <div key={section.eyebrow} className="mt-3">
                                  <p className="px-3 pb-2 text-[11px] uppercase tracking-[0.25em] text-primary">
                                    {section.eyebrow}
                                  </p>
                                  <div className="flex flex-col gap-1">
                                    {section.items.map((child) => (
                                      <MenuLink
                                        key={`${child.href}-${child.label}`}
                                        child={child}
                                        siblings={getMenuLinks(item)}
                                        pathname={pathname}
                                        onNavigate={() => setDrawerOpen(false)}
                                        compact
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            item.children!.map((child) => (
                              <MenuLink
                                key={`${child.href}-${child.label}`}
                                child={child}
                                siblings={item.children!}
                                pathname={pathname}
                                onNavigate={() => setDrawerOpen(false)}
                                compact
                              />
                            ))
                          )}

                          {cta && (
                            <Link
                              href={cta.ctaHref}
                              onClick={() => setDrawerOpen(false)}
                              className="mt-2 mx-1 flex items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/20 px-4 py-3 transition-colors"
                            >
                              <span className="flex flex-col min-w-0">
                                <span className="text-xs uppercase tracking-[0.25em] text-primary/80">
                                  {cta.eyebrow}
                                </span>
                                <span className="text-sm text-white/85 mt-0.5">
                                  {cta.headline}
                                </span>
                              </span>
                              <span className="text-primary text-sm whitespace-nowrap">
                                {cta.ctaLabel} →
                              </span>
                            </Link>
                          )}
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
                    active ? "text-primary" : "text-white hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {RIGHT_LINKS.map((nav) => {
              const active = pathname === nav.href;
              const className = `px-6 py-5 border-b border-border-gray text-lg transition-colors ${
                active ? "text-primary" : "text-white hover:text-primary"
              }`;

              if (nav.href.startsWith("http")) {
                return (
                  <a
                    key={nav.href}
                    href={nav.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDrawerOpen(false)}
                    className={className}
                  >
                    {nav.label}
                  </a>
                );
              }

              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setDrawerOpen(false)}
                  className={className}
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
        transformBox: "fill-box",
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
        transformBox: "fill-box",
        transformOrigin: "center",
        transform: open ? "translate(0,-6px) rotate(-45deg)" : "none",
      }}
    />
  </svg>
);

const MenuLink = ({
  child,
  siblings,
  pathname,
  onNavigate,
  compact = false,
}: {
  child: NavItem;
  siblings: NavItem[];
  pathname: string | null;
  onNavigate: () => void;
  compact?: boolean;
}) => {
  const childActive = isChildActive(child, siblings, pathname);
  const iconSize = compact ? 18 : 20;
  const iconBox = compact ? "size-9 rounded-lg" : "size-10 rounded-xl";
  const padding = compact ? "p-3" : "p-4";
  const indent = !compact && child.indent ? "ml-7" : compact ? "" : "";
  const descClass = compact
    ? "text-xs text-white/55 leading-snug"
    : "text-sm text-white/55 leading-snug";

  return (
    <Link
      href={child.href}
      onClick={onNavigate}
      role="menuitem"
      className={`group flex items-start ${compact ? "gap-3" : "gap-4"} ${padding} rounded-xl transition-colors ${indent} ${
        childActive ? "bg-primary/10" : "hover:bg-white/4"
      }`}
    >
      <span
        className={`shrink-0 ${iconBox} flex items-center justify-center border transition-colors ${
          childActive
            ? "bg-primary/20 border-primary/50 text-primary"
            : "bg-primary/10 border-primary/25 text-primary group-hover:bg-primary/15 group-hover:border-primary/40"
        }`}
      >
        {child.icon && <NavIcon name={child.icon} size={iconSize} />}
      </span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <span
          className={`flex ${compact ? "flex-wrap" : ""} items-center gap-2`}
        >
          <span
            className={`text-base leading-snug ${
              childActive ? "text-primary" : "text-white"
            }`}
          >
            {child.label}
          </span>
          {child.tag && (
            <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-primary/80 border border-primary/30 bg-primary/[0.08] rounded-full px-2 py-0.5">
              {child.tag}
            </span>
          )}
        </span>
        {child.desc && (
          <span className={descClass}>{child.desc}</span>
        )}
      </span>
    </Link>
  );
};

const MenuCtaFooter = ({
  cta,
  onNavigate,
  boxed = false,
}: {
  cta: MenuCta;
  onNavigate: () => void;
  boxed?: boolean;
}) => {
  if (boxed) {
    return (
      <div className="rounded-xl border border-white/15 bg-white/[0.03] p-5 flex flex-col gap-4">
        <div className="flex flex-col min-w-0">
          <span className="text-xs uppercase tracking-[0.25em] text-primary/80">
            {cta.eyebrow}
          </span>
          <span className="text-sm text-white/85 mt-1">{cta.headline}</span>
        </div>
        <Link
          href={cta.ctaHref}
          onClick={onNavigate}
          className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm bg-primary/15 hover:bg-primary/30 border border-primary/40 text-primary transition-colors whitespace-nowrap"
        >
          {cta.ctaLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t border-white/10 bg-white/2 px-8 py-5 flex items-center justify-between gap-4">
      <div className="flex flex-col min-w-0 shrink">
        <span className="text-xs uppercase tracking-[0.25em] text-primary/80">
          {cta.eyebrow}
        </span>
        <span className="text-sm text-white/85 mt-1">{cta.headline}</span>
      </div>
      <Link
        href={cta.ctaHref}
        onClick={onNavigate}
        className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm bg-primary/15 hover:bg-primary/30 border border-primary/40 text-primary transition-colors whitespace-nowrap"
      >
        {cta.ctaLabel}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
};

const PlatformMegaMenu = ({
  item,
  pathname,
  cta,
  onNavigate,
}: {
  item: NavMenuItem;
  pathname: string | null;
  cta: MenuCta | null;
  onNavigate: () => void;
}) => {
  const siblings = getMenuLinks(item);
  const leftSections =
    item.sections?.filter((section) => section.column === "left") ?? [];
  const rightSections =
    item.sections?.filter((section) => section.column === "right") ?? [];

  return (
    <div className="px-4 pb-6">
      {item.overview && (
        <MenuLink
          child={item.overview}
          siblings={siblings}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      )}

      <div className="mt-2 grid md:grid-cols-2 gap-x-6 gap-y-6">
        <div className="flex flex-col gap-6">
          {leftSections.map((section) => (
            <div key={section.eyebrow}>
              <p className="px-4 pb-2 text-[11px] uppercase tracking-[0.25em] text-primary">
                {section.eyebrow}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map((child) => (
                  <MenuLink
                    key={`${child.href}-${child.label}`}
                    child={child}
                    siblings={siblings}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {rightSections.map((section) => (
            <div key={section.eyebrow}>
              <p className="px-4 pb-2 text-[11px] uppercase tracking-[0.25em] text-primary">
                {section.eyebrow}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map((child) => (
                  <MenuLink
                    key={`${child.href}-${child.label}`}
                    child={child}
                    siblings={siblings}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}

          {cta && (
            <MenuCtaFooter cta={cta} onNavigate={onNavigate} boxed />
          )}
        </div>
      </div>
    </div>
  );
};

const NavIcon = ({ name, size = 20 }: { name: IconName; size?: number }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "stack":
      return (
        <svg {...common}>
          <path d="M12 3 3 7l9 4 9-4-9-4Z" />
          <path d="M3 12l9 4 9-4" />
          <path d="M3 17l9 4 9-4" />
        </svg>
      );
    case "watch":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="6" />
          <path d="M12 9v3l2 1" />
          <path d="M9 3h6l-1 3M9 21h6l-1-3" />
        </svg>
      );
    case "intake":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="12" height="16" rx="2" />
          <path d="M9 4v2h6V4" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      );
    case "facility":
      return (
        <svg {...common}>
          <path d="M4 21V8l8-4 8 4v13" />
          <path d="M4 21h16" />
          <path d="M9 21v-5h6v5" />
          <path d="M9 12h.01M12 12h.01M15 12h.01" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 6h6a4 4 0 0 1 0 8H9.5a4 4 0 0 0 0 8H15" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "shieldStar":
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
          <path d="m12 9 1.2 2.5 2.8.4-2 1.9.5 2.7L12 15.3l-2.5 1.2.5-2.7-2-1.9 2.8-.4L12 9Z" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M14 20a4 4 0 0 1 7 0" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 4v16" />
          <path d="M6 20h12" />
          <path d="M6 8h12" />
          <path d="M6 8 3 14a3 3 0 0 0 6 0L6 8Z" />
          <path d="M18 8l-3 6a3 3 0 0 0 6 0L18 8Z" />
        </svg>
      );
    case "userHeart":
      return (
        <svg {...common}>
          <circle cx="10" cy="8" r="3.5" />
          <path d="M3.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M19.5 11.5c-1.7-2-4.5-.6-4.5 1.6 0 2.4 4.5 4.4 4.5 4.4s4.5-2 4.5-4.4c0-2.2-2.8-3.6-4.5-1.6Z" />
        </svg>
      );
  }
};
