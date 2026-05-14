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
    <footer className="relative border-t border-border-gray bg-black overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-primary/10 blur-[180px] pointer-events-none" />

      <div className="relative z-10 px-6 md:px-16 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-4 flex flex-col gap-6">
          <Image
            src="/talitrix-logo.svg"
            alt="Talitrix"
            width={188}
            height={24}
            style={{ width: "auto", height: "1.5rem" }}
            className="self-start object-contain"
          />
          <p className="text-white/60 max-w-xs leading-relaxed">
            The new standard in monitoring and supervision technology.
            One platform. Complete continuity.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-3 bg-white/10 hover:bg-primary/30 backdrop-blur-md text-sm transition-colors border border-white/15"
            >
              Contact Sales
              <FaPaperPlane className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <span className="text-xs uppercase tracking-widest text-white/40">
              Follow Us
            </span>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-primary/20 hover:border-primary/40 hover:text-primary text-white/75 flex items-center justify-center transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FooterLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-white/40">
                {column.title}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-border-gray px-6 md:px-16 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span>© {new Date().getFullYear()} Talitrix. All rights reserved.</span>
          <span className="hidden sm:inline text-white/25">•</span>
          <span>U.S. Patent No. 11,507,909</span>
        </div>
        <div className="flex gap-4 sm:gap-6 flex-wrap">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
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
      { label: "Agencies", href: "/solutions/agencies" },
      { label: "Participants", href: "/solutions/participants" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
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
