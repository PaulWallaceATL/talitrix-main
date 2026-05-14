"use client";
import { IoWifiOutline } from "react-icons/io5";

// Single bottom-left callout: label on the left, a short straight
// orange-glow line on the right pointing toward the band. Uses an
// inline flex layout so the label always lands inside the viewport
// (no right-full overflow), and the line stays the same orange-glow
// laser style as the right-side InfoPaths blocks. Reuses
// .info-line / .info-box / .laser-path classes so InfoPaths' existing
// useGSAP picks it up for the line clipPath reveal, info-box
// blink-in, and infinite laser-pulse loop.
const LeftInfoPath = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div {...props} id="leftInfoPath">
      <div className="flex items-center gap-3 h-full w-full">
        <div className="info-box flex flex-col items-center text-center gap-2 w-25 shrink-0">
          <div
            className="size-14 p-2 bg-white/15 rounded-lg"
            style={{ boxShadow: infoGlass }}
          >
            <IoWifiOutline className="size-full text-primary" />
          </div>
          3-Carrier SIM <br /> + WiFi
        </div>

        <div className="flex-1 flex items-center min-w-0">
          <svg
            viewBox="0 0 220 20"
            className="info-line w-full overflow-visible"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <filter
                id="laser-glow-left-1"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Bright tail anchored on the right (band side), fading
                  back toward the label on the left. */}
              <linearGradient
                id="laser-gradient-left-1"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF6B35" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M4 10H216"
              stroke="#A7A7A7"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className="laser-path"
              d="M4 10H216"
              stroke="url(#laser-gradient-left-1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#laser-glow-left-1)"
            />
            <circle cx="4" cy="10" r="3" fill="#D9D9D9" />
            <circle cx="216" cy="10" r="3" fill="#D9D9D9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LeftInfoPath;

const infoGlass =
  "inset 0px 0px 1.8px rgba(255, 255, 255, 0.98), inset 1px -2px 4.3px rgba(255, 255, 255, 0.44)";
