import Link from "next/link";
import React from "react";

type CTAButtonProps = {
  /** Route to navigate to. Provide either `href` or `scrollTo`. */
  href?: string;
  /** Element id to smooth-scroll to (without the leading `#`). */
  scrollTo?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const primaryClass =
  "inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3.5 sm:py-4 bg-white/15 backdrop-blur-md transition-transform hover:scale-[1.02] hover:bg-white/20 text-sm sm:text-base";

const primaryStyle: React.CSSProperties = {
  boxShadow:
    "0px 19px 65.2px rgba(248, 122, 19, 0.25), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
};

const secondaryClass =
  "inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 hover:bg-white/5 text-sm sm:text-base transition-colors";

const ghostClass =
  "inline-flex items-center gap-2 text-primary hover:text-white transition-colors group text-sm";

const CTAButton = ({
  href,
  scrollTo,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) => {
  const target = scrollTo ? `#${scrollTo}` : (href ?? "#");
  const Tag: React.ElementType = scrollTo ? "a" : Link;
  const linkProps = scrollTo ? { href: target } : { href: target };

  if (variant === "primary") {
    return (
      <Tag
        {...linkProps}
        className={`${primaryClass} ${className}`}
        style={primaryStyle}
      >
        {children}
      </Tag>
    );
  }

  if (variant === "secondary") {
    return (
      <Tag {...linkProps} className={`${secondaryClass} ${className}`}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag {...linkProps} className={`${ghostClass} ${className}`}>
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Tag>
  );
};

export default CTAButton;
