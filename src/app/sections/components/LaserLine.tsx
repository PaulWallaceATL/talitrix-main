"use client";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import type { IconType } from "react-icons";

// Breakpoint used for the responsive viewBox swap. Must match the
// `@media` query in InfoPaths.module.css that swaps the path `d`, so
// the SVG coordinate system and the geometry stay in sync.
const SM_VIEWBOX_QUERY = "(max-width: 1440px)";

interface LaserLineProps extends Omit<ComponentProps<"svg">, "id"> {
  defsId: string;
  d?: string;
  viewBox?: string;
  // Used in place of `viewBox` when SM_VIEWBOX_QUERY matches.
  viewBoxSm?: string;
  pathClassName?: string;
  startDot?: { cx: number; cy: number };
  endDot?: { cx: number; cy: number };
  strokeWidth?: number;
  Icon: IconType;
  label: ReactNode;
  infoBoxClassName?: string;
}

const defaultInfoBoxClassName =
  "lg:absolute lg:-translate-y-6 lg:px-2 flex lg:gap-2 gap-4 items-center info-box info-box-1 lg:w-25 lg:p-0 p-3 bg-white/5 lg:bg-transparent lg:rounded-none rounded-lg border border-white/20 lg:border-0 h-full";

const infoGlass =
  "inset 0px 0px 1.8px rgba(255, 255, 255, 0.98), inset 1px -2px 4.3px rgba(255, 255, 255, 0.44)";

const LaserLine = ({
  defsId,
  d,
  viewBox,
  viewBoxSm,
  pathClassName,
  startDot,
  endDot,
  strokeWidth = 1.5,
  className,
  Icon,
  label,
  infoBoxClassName = "top-0 left-full",
  ...svgProps
}: LaserLineProps) => {
  const filterId = `laser-glow-${defsId}`;
  const gradientId = `laser-gradient-${defsId}`;
  const isSm = useMediaQuery(SM_VIEWBOX_QUERY);
  const activeViewBox = isSm && viewBoxSm ? viewBoxSm : viewBox;

  return (
    <>
      <svg
        viewBox={activeViewBox}
        className={`info-line overflow-visible hidden lg:block ${className ?? ""}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        {...svgProps}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={8} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          className={pathClassName}
          d={d}
          stroke="#A7A7A7"
          strokeOpacity="0.4"
          strokeWidth={strokeWidth}
          strokeMiterlimit="1"
        />
        <path
          className={`laser-path ${pathClassName ?? ""}`}
          d={d}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={`url(#${filterId})`}
        />
        {endDot && (
          <circle cx={endDot.cx} cy={endDot.cy} r="3" fill="#D9D9D9" />
        )}
        {startDot && (
          <circle cx={startDot.cx} cy={startDot.cy} r="3" fill="#D9D9D9" />
        )}
      </svg>

      {Icon && label && (
        <div className={cn(defaultInfoBoxClassName, infoBoxClassName)}>
          <div
            className="xl:size-12 lg:size-10 size-12 p-2 bg-white/15 rounded-lg shrink-0"
            style={{ boxShadow: infoGlass }}
          >
            <Icon className="size-full text-primary" />
          </div>
          <span className="lg:whitespace-nowrap lg:h-10 flex flex-col lg:justify-center lg:text-xs xl:text-sm">
            {label}
          </span>
        </div>
      )}
    </>
  );
};

export default LaserLine;
