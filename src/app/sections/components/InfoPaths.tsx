"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { IoMdFingerPrint } from "react-icons/io";
import {
  IoChatbubblesOutline,
  IoFitnessOutline,
  IoLockClosedOutline,
  IoSwapHorizontalOutline,
  IoWifiOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger, SplitText);

type CalloutSide = "left" | "right";
type CalloutPosition = "top" | "middle" | "bottom";

interface CalloutSpec {
  side: CalloutSide;
  position: CalloutPosition;
  Icon: IconType;
  label: ReactNode;
}

// Three callouts per side. Right side keeps the original Biometric Sensors
// at the top and Tamper Proof (formerly "Unique Lock") at the bottom, with
// 2-Way Communication added in the middle. Left side adds three more band
// features in the same vertical rhythm.
const CALLOUTS: CalloutSpec[] = [
  {
    side: "right",
    position: "top",
    Icon: IoMdFingerPrint,
    label: (
      <>
        Biometric <br /> Sensors
      </>
    ),
  },
  {
    side: "right",
    position: "middle",
    Icon: IoChatbubblesOutline,
    label: (
      <>
        2-Way <br /> Communication
      </>
    ),
  },
  {
    side: "right",
    position: "bottom",
    Icon: IoLockClosedOutline,
    label: (
      <>
        Tamper <br /> Proof
      </>
    ),
  },
  {
    side: "left",
    position: "top",
    Icon: IoWifiOutline,
    label: (
      <>
        3-Carrier SIM <br /> + WiFi
      </>
    ),
  },
  {
    side: "left",
    position: "middle",
    Icon: IoFitnessOutline,
    label: (
      <>
        Heart Rate <br /> &amp; SpO₂
      </>
    ),
  },
  {
    side: "left",
    position: "bottom",
    Icon: IoSwapHorizontalOutline,
    label: (
      <>
        Replaceable <br /> Straps
      </>
    ),
  },
];

const InfoPaths = ({ ...props }: React.ComponentProps<"div">) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lines = gsap.utils.toArray<HTMLElement>(".info-line");
    const info = gsap.utils.toArray<HTMLElement>(".info-box");
    const laserPaths = gsap.utils.toArray<SVGPathElement>(".laser-path");

    const para = SplitText.create("#explode-p", {
      type: "lines",
      mask: "lines",
    });
    const h2 = SplitText.create("#explode-h2", {
      type: "lines",
      mask: "lines",
    });

    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: "#exploded",
        start: "-=20%",
        end: "+=20%",
        scrub: true,
      },
    });

    gsap.from("#explode-bg", {
      y: 700,
      opacity: 0.3,
      scrollTrigger: {
        trigger: "#exploded",
        start: "top bottom",
        end: "130%",
        scrub: true,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#exploded",
        start: "40% center",
        toggleActions: "play none none reverse",
      },
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#exploded",
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });

    tl2.to("#explode-h2", { y: -150, duration: 1, ease: "none" }, 0);

    gsap.from(para.lines, {
      y: "100%",
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#exploded",
        start: "10% center",
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(h2.lines, {
      y: "100%",
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#exploded",
        start: "40% center",
        toggleActions: "play none none reverse",
      },
    });

    lines.forEach((line, i) => {
      timeline.from(
        line,
        {
          clipPath: "inset(0 100% 0 0)",
          ease: "power3.inOut",
          duration: 1.5,
          delay: i * 0.18,
        },
        0,
      );
    });
    info.forEach((item, i) => {
      timeline.from(
        item,
        {
          opacity: 0,
          ease: "power3.inOut",
          duration: 0.1,
          repeat: 1,
          delay: i * 0.18,
        },
        1.3,
      );
    });

    laserPaths.forEach((path, i) => {
      const length = path.getTotalLength();
      const dashLength = 60;
      path.style.strokeDasharray = `${dashLength} ${length}`;
      path.style.strokeDashoffset = `${dashLength}`;

      gsap.to(path, {
        strokeDashoffset: -length,
        duration: 2,
        repeat: -1,
        delay: i * 0.6,
        ease: "none",
      });
    });
  });

  return (
    <div {...props} ref={sectionRef} id="infoPaths">
      {/* Shared SVG defs (filter + gradients) so each callout reuses one
          glow filter and one of two laser gradients (left-to-right vs
          right-to-left). Sized 0/0 so it doesn't take layout space. */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden
        focusable="false"
      >
        <defs>
          <filter
            id="laser-glow-shared"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="laser-grad-ltr" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="laser-grad-rtl" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {CALLOUTS.map((c, i) => (
        <CalloutBlock key={`${c.side}-${c.position}-${i}`} {...c} />
      ))}
    </div>
  );
};

export default InfoPaths;

function CalloutBlock({ side, position, Icon, label }: CalloutSpec) {
  const isRight = side === "right";
  const isMid = position === "middle";

  // Block size: mid-row uses a short horizontal connector; top/bottom use
  // a wider elbow connector.
  const W = isMid ? 320 : 440;
  const H = isMid ? 60 : 180;

  // Path: starts near the watch (inner edge of block) and ends at the
  // outer corner where the label sits.
  // Right side, top:    inner-bottom -> outer-top    (elbow up)
  // Right side, middle: inner-mid    -> outer-mid    (straight)
  // Right side, bottom: inner-top    -> outer-bottom (elbow down)
  // Left side mirrors x.
  const inset = 4;
  const innerX = isRight ? inset : W - inset;
  const outerX = isRight ? W - inset : inset;
  let pathD: string;
  let endY: number;
  if (position === "middle") {
    pathD = `M ${innerX} ${H / 2} L ${outerX} ${H / 2}`;
    endY = H / 2;
  } else if (position === "top") {
    // Inner-bottom -> outer-top via S-curve.
    const innerY = H - inset;
    endY = inset;
    const c1x = isRight ? W * 0.42 : W * 0.58;
    const c2x = isRight ? W * 0.58 : W * 0.42;
    pathD = `M ${innerX} ${innerY} C ${c1x} ${innerY} ${c2x} ${endY} ${outerX} ${endY}`;
  } else {
    // Inner-top -> outer-bottom via S-curve.
    const innerY = inset;
    endY = H - inset;
    const c1x = isRight ? W * 0.42 : W * 0.58;
    const c2x = isRight ? W * 0.58 : W * 0.42;
    pathD = `M ${innerX} ${innerY} C ${c1x} ${innerY} ${c2x} ${endY} ${outerX} ${endY}`;
  }

  // Block container positioning within InfoPaths:
  //   right side -> right: 0 (with horizontal label cluster spilling outward)
  //   left  side -> left:  0
  //   top    -> anchored to InfoPaths top
  //   bottom -> anchored to InfoPaths bottom
  //   middle -> vertical center of InfoPaths
  const containerStyle: React.CSSProperties = { width: W, height: H };
  if (isRight) containerStyle.right = 0;
  else containerStyle.left = 0;
  if (position === "top") containerStyle.top = 0;
  else if (position === "bottom") containerStyle.bottom = 0;
  else {
    containerStyle.top = "50%";
    containerStyle.transform = "translateY(-50%)";
  }

  // Label sits adjacent to the path endpoint. Vertically: above for top,
  // below for bottom, centered for middle. Horizontally pinned to the
  // outer edge of the block.
  const labelStyle: React.CSSProperties = {};
  if (isRight) labelStyle.right = -10;
  else labelStyle.left = -10;
  if (position === "top") labelStyle.top = -56;
  else if (position === "bottom") labelStyle.bottom = -56;
  else {
    labelStyle.top = "50%";
    labelStyle.transform = "translateY(-50%)";
    if (isRight) labelStyle.right = -120;
    else labelStyle.left = -120;
  }

  const gradId = isRight ? "laser-grad-ltr" : "laser-grad-rtl";
  // Label-row alignment: right-side stacks center-right, left-side
  // center-left, middle stacks centered to the side of the line.
  const labelAlign = isRight ? "items-center" : "items-center";

  return (
    <div className="absolute" style={containerStyle}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="info-line absolute inset-0 w-full h-full overflow-visible"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          stroke="#A7A7A7"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="laser-path"
          d={pathD}
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#laser-glow-shared)"
        />
        <circle
          cx={outerX}
          cy={endY}
          r="3"
          fill="#D9D9D9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className={`info-box absolute text-center flex flex-col gap-2 ${labelAlign} w-28 leading-tight text-sm`}
        style={labelStyle}
      >
        <div
          className="size-12 p-2 bg-white/15 rounded-lg"
          style={{ boxShadow: infoGlass }}
        >
          <Icon className="size-full text-primary" />
        </div>
        {label}
      </div>
    </div>
  );
}

const infoGlass =
  "inset 0px 0px 1.8px rgba(255, 255, 255, 0.98), inset 1px -2px 4.3px rgba(255, 255, 255, 0.44)";
