import React from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  glow?: boolean;
  children?: React.ReactNode;
};

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  body,
  align = "left",
  glow = true,
  children,
}: PageHeroProps) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-border-gray">
      {glow && (
        <>
          <div className="absolute -top-40 -left-32 w-[700px] h-[700px] bg-primary/20 blur-[180px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-primary/10 blur-[200px] pointer-events-none" />
        </>
      )}

      <div
        className={`relative z-10 px-16 pt-48 pb-28 max-w-7xl ${
          align === "center" ? "mx-auto text-center" : ""
        }`}
      >
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            {eyebrow}
          </span>
        )}
        <h1 className="text-5xl md:text-7xl leading-[1.05] mb-6">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/75 max-w-3xl leading-relaxed mb-6">
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

export default PageHero;
