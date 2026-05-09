import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="h-24 absolute top-0 left-0 w-full z-40 border-b border-border-gray flex">
      <div className="flex items-center px-16 border-border-gray border-r shrink-0">
        <Link href={"/"}>
          <Image
            src={"/talitrix-logo.svg"}
            alt="Talitrix Logo"
            width={188.45}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </Link>
      </div>
      <nav className="flex gap-16 px-16 items-center w-full">
        {NavData.LT.map((nav, i) => (
          <Link href={nav.href} key={i} className="flex gap-1">
            {nav.label} <span className="text-xs text-white/70">0{i + 1}</span>
          </Link>
        ))}
      </nav>
      <div className="flex gap-16 px-16 items-center border-x border-border-gray shrink-0">
        {NavData.RT.map((nav, i) => (
          <Link href={nav.href} key={i} className="flex gap-1 shrink-0">
            {nav.label}
          </Link>
        ))}
      </div>
      <button className="shrink-0 px-16 bg-white/14 backdrop-blur-lg">
        Get Started
      </button>
    </header>
  );
};

export default NavBar;

const NavData = {
  LT: [
    {
      label: "About",
      href: "/",
    },
    {
      label: "Solutions",
      href: "/",
    },
    {
      label: "Services",
      href: "/",
    },
    {
      label: "News",
      href: "/",
    },
  ],
  RT: [
    {
      label: "Contact",
      href: "/",
    },
    {
      label: "Participant Registration",
      href: "/",
    },
  ],
};
