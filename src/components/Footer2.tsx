import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-black overflow-hidden">
      <div className="p-16 flex flex-col gap-16">
        <Image
          src="/talitrix-logo.svg"
          alt="Talitrix"
          width={376.9}
          height={48}
          className="self-start object-contain w-auto h-12"
        />
        <div className="flex w-full justify-between gap-4 gap-y-16 flex-wrap">
          <div className="flex flex-col justify-between gap-4 text-xl">
            <a href="#" className="max-w-70">
              3460 Preston Ridge Rd STE 125 Alpharetta, GA 30005
            </a>
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
          {FooterLinks.map((footer, index) => (
            <div className="flex flex-col gap-5" key={footer.title}>
              <h3 className="text-primary text-xl font-semibold uppercase">
                {footer.title}
              </h3>
              <div className="flex flex-col gap-2">
                {footer.links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.label}
                    className="duration-300 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-t border-white/30 h-30 flex justify-between">
        <div className="max-w-250 w-full gap-6 justify-between px-16 h-full flex items-center">
          <div className="flex gap-4">
            <p className="opacity-50">Sales</p>
            <a
              href="mailto:info@talitrix.com"
              aria-label="Talitrix sales mail"
              className="duration-300 transition-colors hover:text-primary"
            >
              info@talitrix.com
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <p className="opacity-50  min-w-30">Onboarding and Participants</p>
            <a
              href="tel:+1(678)-799-7677"
              aria-label="Talitrix sales mail"
              className="duration-300 transition-colors hover:text-primary whitespace-nowrap"
            >
              +1 (678)-799-7677
            </a>
          </div>
        </div>
        <div className="flex max-w-125 px-16 items-center justify-between w-full border-white/30 border-l">
          <Link
            href={""}
            className="duration-300 transition-colors hover:text-primary"
          >
            Payment Portal
          </Link>
          <Link
            href={"/contact"}
            className="duration-300 transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex justify-between px-16 py-8">
        <div className="max-w-125 flex justify-between w-full">
          <Link
            href="/privacy"
            className="duration-300 transition-colors hover:text-primary"
          >
            Privacy Policy
          </Link>
          <span>U.S. Patent No. 11,507,909</span>
        </div>
        <p>
          Copyright © 2026 <span className="text-primary">TALITRIX</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

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

const FooterLinks = [
  {
    title: "Platform",
    links: [
      { label: "Talitrix ONE", href: "/talitrix-one" },
      { label: "All in ONE Band", href: "/talitrix-one/t-band" },
      { label: "ONE Intake", href: "/talitrix-one/intake" },
      { label: "ONE Jail Management", href: "/talitrix-one/jail-management" },
      {
        label: "ONE Pre-Trial & Probation",
        href: "/talitrix-one/pretrial-probation",
      },
      { label: "Talitrix Score", href: "/talitrix-one/score" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Sheriffs & Agency Leaders", href: "/solutions/sheriffs" },
      { label: "Pretrial & Supervision", href: "/solutions/pretrial" },
      { label: "Courts & Legal", href: "/solutions/courts" },
      { label: "Participants", href: "/solutions/participants" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
      // { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Request a Briefing", href: "/get-started" },
      { label: "Participant Registration", href: "/participant-registration" },
      { label: "Contact Sales", href: "/contact" },
    ],
  },
];
