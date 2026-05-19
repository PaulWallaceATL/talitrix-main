"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/** Matches Talitrix primary — used for glow + badge on every card hover. */
const CARD_HOVER_ACCENT = "rgba(248, 122, 19, 0.85)";

export type ScrollHoverCardProps = {
  icon: ReactNode;
  number: string;
  eyebrow?: string;
  body: string;
  title: string;
  href?: string;
  footer?: "arrow" | "number";
};

export default function ScrollHoverCard({
  icon,
  number,
  eyebrow,
  body,
  title,
  href,
  footer = "number",
}: ScrollHoverCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardClassName = `group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border bg-white/[0.03] p-6 sm:p-7 transition-[border-color,box-shadow] duration-300 ${
    hovered
      ? "border-primary shadow-[0_0_40px_rgba(248,122,19,0.18)]"
      : "border-border-gray"
  }`;

  const content = (
    <>
      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 0.7 : 0,
          scale: hovered ? 1 : 0.75,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${CARD_HOVER_ACCENT} 0%, rgba(0,0,0,0) 70%)`,
          x: "-50%",
        }}
      />

      <div className="relative flex items-center justify-between">
        {icon}
        <span className="text-xs tracking-widest text-white/40">{number}</span>
      </div>

      {eyebrow ? (
        <span className="relative mt-3 text-xs uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </span>
      ) : null}

      <p
        className={`relative text-sm leading-relaxed text-white/75 ${eyebrow ? "mt-3" : "mt-4"}`}
      >
        {body}
      </p>

      <div className="relative mt-auto flex items-center justify-between pt-8">
        <span className="pr-2 text-base leading-tight text-white sm:text-lg">
          {title}
        </span>
        <motion.span
          initial={false}
          animate={{
            backgroundColor: hovered ? CARD_HOVER_ACCENT : "rgba(255,255,255,0.08)",
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
          }}
          transition={{ duration: 0.3 }}
          className={`flex shrink-0 items-center justify-center rounded-full ${
            footer === "arrow" ? "h-10 w-10" : "h-10 w-10 text-xs tracking-widest"
          }`}
          aria-hidden={footer === "number"}
        >
          {footer === "arrow" ? (
            <motion.span
              animate={{ x: hovered ? 2 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          ) : (
            number
          )}
        </motion.span>
      </div>
    </>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[280px] shrink-0 sm:w-[300px] lg:w-[320px]"
    >
      {href ? (
        <Link href={href} className={cardClassName}>
          {content}
        </Link>
      ) : (
        <div className={cardClassName}>{content}</div>
      )}
    </div>
  );
}
