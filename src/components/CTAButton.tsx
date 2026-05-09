import Link from "next/link";
import React from "react";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const CTAButton = ({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) => {
  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-8 py-4 bg-white/15 backdrop-blur-md transition-transform hover:scale-[1.02] hover:bg-white/20 text-base ${className}`}
        style={{
          boxShadow:
            "0px 19px 65.2px rgba(248, 122, 19, 0.25), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
        }}
      >
        {children}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-8 py-4 border border-white/20 hover:bg-white/5 text-base transition-colors ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-primary hover:text-white transition-colors group text-sm ${className}`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
};

export default CTAButton;
