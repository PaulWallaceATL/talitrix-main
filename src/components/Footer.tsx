import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black overflow-hidden">
      <div className="px-4 sm:px-8 lg:px-16 py-16 flex flex-col gap-16">
        <div className="grid grid-cols-2 w-full gap-x-8 sm:gap-x-16 gap-y-16 lg:flex lg:justify-between lg:flex-wrap">
          <div className="col-span-2 lg:col-span-1 flex flex-col justify-between gap-4 text-xl">
            <p className="max-w-70">
              3460 Preston Ridge Rd STE 125 Alpharetta, GA 30005
            </p>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-primary">SOCIALS</h3>
              <div className="flex gap-4">
                {SOCIALS.map((s) => {
                  const Icon = s.Icon;

                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
          group relative flex size-12 overflow-hidden rounded-md border border-white/20 p-3
          transition-all duration-300 ease-out
          hover:scale-105 hover:border-white/40
          active:scale-95
        "
                      style={{
                        boxShadow:
                          "inset -3px -1px 2.7px rgba(255, 255, 255, 0.24), 0 0 0 rgba(255,255,255,0)",
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
                      }}
                    >
                      <span
                        className="
            pointer-events-none absolute inset-0 -translate-x-full
            bg-linear-to-r from-transparent via-white/30 to-transparent
            transition-transform duration-700 ease-out
            group-hover:translate-x-full
          "
                      />

                      <span
                        className="
            pointer-events-none absolute inset-0 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
          "
                        style={{
                          boxShadow: "0 8px 30px rgba(255,255,255,0.18)",
                        }}
                      />

                      <Icon
                        className="
            relative z-10 size-full transition-transform duration-300 ease-out
            group-hover:scale-110 group-hover:-rotate-6
          "
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {FooterLinks.map((footer) => (
            <div
              className={`flex flex-col gap-5 ${footer.orderClass ?? ""}`}
              key={footer.title}
            >
              <h3 className="text-primary text-xl font-semibold uppercase">
                {footer.title}
              </h3>
              <div className="flex flex-col gap-5 text-sm">
                {footer.links.map((link) => {
                  const label = link.shortLabel ? (
                    <>
                      <span className="lg:hidden">{link.shortLabel}</span>
                      <span className="hidden lg:inline">{link.label}</span>
                    </>
                  ) : (
                    link.label
                  );

                  return link.external ? (
                    <a
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="duration-300 transition-colors hover:text-primary"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      key={link.label}
                      className="duration-300 transition-colors hover:text-primary"
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-t border-white/30 lg:h-30 flex flex-col lg:flex-row justify-between text-sm">
        <div className="max-w-250 w-full gap-6 justify-between py-6 px-4 sm:px-8 lg:px-16 h-full flex items-center flex-wrap lg:flex-nowrap">
          <div className="flex gap-4">
            <p className="opacity-50">Sales</p>
            <a
              href="mailto:info@talitrix.com"
              aria-label="Talitrix sales email"
              className="duration-300 transition-colors hover:text-primary"
            >
              info@talitrix.com
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <p className="opacity-50 min-w-27 xl:min-w-30 max-w-27 xl:max-w-full">
              Onboarding and Participants
            </p>
            <a
              href="tel:+16787997677"
              aria-label="Talitrix onboarding and participants phone"
              className="duration-300 transition-colors hover:text-primary whitespace-nowrap"
            >
              +1 (678)-799-7677
            </a>
          </div>
        </div>
        <div className="flex lg:max-w-125 py-6 px-4 sm:px-8 lg:px-16 items-center justify-between w-full border-white/30 border-t lg:border-l lg:border-t-0 h-full gap-4 flex-wrap">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="duration-300 transition-colors hover:text-primary"
          >
            Login
          </a>
          <a
            href={PAYMENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="duration-300 transition-colors hover:text-primary"
          >
            Payment Portal
          </a>
          <Link
            href="/contact"
            className="duration-300 transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 lg:px-16 py-8 text-sm gap-10">
        <div className="max-w-125 flex justify-between w-full">
          <Link
            href="/privacy"
            className="duration-300 transition-colors hover:text-primary"
          >
            Privacy Policy
          </Link>
          <span>U.S. Patent No. 11,507,909</span>
        </div>
        <p className="whitespace-nowrap">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="text-primary">TALITRIX</span>
        </p>
      </div>
      <div className="relative lg:block hidden">
        <div className="absolute top-0 left-0 size-full bg-linear-to-b from-background to-transparent from-10%"></div>
        <Image
          src="/talitrix-logo.svg"
          alt="Talitrix"
          width={376.9}
          height={48}
          className="object-contain w-full h-auto"
          priority={false}
        />
      </div>
    </footer>
  );
};

export default Footer;

const PAYMENT_PORTAL_URL =
  "https://billing.stripe.com/p/login/5kA9Do80vb7zfkc9AA";
const PARTICIPANT_REGISTRATION_URL = "https://register.talitrix.com/";
const LOGIN_URL = "https://app.talitrix.com/login";

const SOCIALS = [
  {
    label: "Talitrix on LinkedIn",
    href: "https://www.linkedin.com/company/talitrix",
    Icon: FaLinkedinIn,
  },
  {
    label: "Talitrix on Facebook",
    href: "https://www.facebook.com/talitrix",
    Icon: FaFacebookF,
  },
  {
    label: "Talitrix on Instagram",
    href: "https://www.instagram.com/talitrix",
    Icon: FaInstagram,
  },
];

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Shorter label shown on mobile where horizontal space is tight. */
  shortLabel?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
  /** Mobile grid ordering (reset to DOM order at lg via lg:order-none). */
  orderClass?: string;
};

const FooterLinks: FooterColumn[] = [
  {
    title: "Platform",
    orderClass: "order-1 lg:order-none",
    links: [
      { label: "TalitrixONE Overview", href: "/talitrix-one" },
      { label: "All-In-One Band", href: "/talitrix-one/all-in-one-band" },
      { label: "ONE Pre-Trial", href: "/talitrix-one/pretrial" },
      {
        label: "ONE Jail Management System",
        shortLabel: "ONE Jail Management",
        href: "/talitrix-one/jail-management",
      },
      { label: "ONE Probation", href: "/talitrix-one/probation" },
      { label: "Talitrix Score", href: "/talitrix-one/score" },
    ],
  },
  {
    title: "Who We Serve",
    orderClass: "order-3 lg:order-none",
    links: [
      { label: "Agencies", href: "/solutions/agencies" },
      { label: "Participants", href: "/solutions/participants" },
    ],
  },
  {
    title: "Company",
    orderClass: "order-4 lg:order-none",
    links: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Get Started",
    orderClass: "order-2 lg:order-none",
    links: [
      { label: "Request a Briefing", href: "/get-started" },
      { label: "Login", href: LOGIN_URL, external: true },
      { label: "Payment Portal", href: PAYMENT_PORTAL_URL, external: true },
      { label: "Participant Registration", href: PARTICIPANT_REGISTRATION_URL, external: true },
      { label: "Contact Sales", href: "/contact" },
    ],
  },
];
