import React from "react";

type ShaderHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  background: React.ReactNode;
  align?: "left" | "center";
  children?: React.ReactNode;
};

const ShaderHero = ({
  eyebrow,
  title,
  subtitle,
  body,
  background,
  align = "left",
  children,
}: ShaderHeroProps) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-border-gray">
      <div className="absolute inset-0 z-0">{background}</div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />

      <div
        className={`relative z-10 px-6 md:px-16 pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-32 max-w-7xl ${
          align === "center" ? "mx-auto text-center" : ""
        }`}
      >
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            {eyebrow}
          </span>
        )}
        <div className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6">
          {title}
        </div>
        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-6">
            {subtitle}
          </p>
        )}
        {body && (
          <div className="text-base md:text-lg text-white/65 max-w-3xl leading-relaxed">
            {body}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default ShaderHero;
