import Image from "next/image";
import Link from "next/link";

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
            className="object-contain"
          />
          <p className="text-white/60 max-w-xs leading-relaxed">
            The new standard in monitoring and supervision technology.
            One platform. Complete continuity.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/get-started"
              className="rounded-full px-5 sm:px-6 py-3 bg-white/10 hover:bg-primary/30 backdrop-blur-md text-sm transition-colors border border-white/15"
            >
              Request a Briefing
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-5 sm:px-6 py-3 bg-transparent hover:bg-white/5 text-sm transition-colors border border-white/15"
            >
              Contact Sales
            </Link>
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

      <div className="relative z-10 border-t border-border-gray px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
        <span>© {new Date().getFullYear()} Talitrix. All rights reserved.</span>
        <div className="flex gap-4 sm:gap-6 flex-wrap">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/security" className="hover:text-white">
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterLinks = [
  {
    title: "Platform",
    links: [
      { label: "Talitrix ONE", href: "/talitrix-one" },
      { label: "T-Band", href: "/talitrix-one/t-band" },
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
      { label: "All Solutions", href: "/solutions" },
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
