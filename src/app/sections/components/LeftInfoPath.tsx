"use client";
import { IoWifiOutline } from "react-icons/io5";

// Single bent-line callout for the bottom-left of the viewport. Mirrors
// the structure of one block from InfoPaths but with the bent path
// horizontally flipped (line origin on the bottom-right, endpoint on
// the top-left where the label sits). Reuses .info-line / .info-box /
// .laser-path classes so InfoPaths' existing useGSAP picks it up for
// the line clipPath reveal, info-box blink-in, and laser-pulse loop.
const LeftInfoPath = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div {...props} id="leftInfoPath">
      <div className="w-full absolute bottom-0 right-0">
        <div className="absolute top-0 -translate-y-7 right-full text-center flex flex-col gap-2 items-center info-box w-25">
          <div
            className="size-14 p-2 bg-white/15  rounded-lg"
            style={{ boxShadow: infoGlass }}
          >
            <IoWifiOutline className="size-full text-primary" />
          </div>
          3-Carrier SIM <br /> + WiFi
        </div>
        <svg
          viewBox="0 0 465 136"
          className="info-line"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
            {/* Mirrored gradient so the bright (orange/white) end lands at
                the line origin near the band, fading toward the label end. */}
            <linearGradient
              id="laser-gradient-left-1"
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Horizontally-mirrored copy of the Tamper Proof bent path:
              starts at (461, 133) bottom-right, bends up, ends at (3.5, 3)
              top-left where the label sits. */}
          <path
            d="M461 133.001H222.05C213.741 133.001 206.142 128.32 202.403 120.9L149.097 15.101C145.358 7.68089 137.759 3 129.45 3H3.5"
            stroke="#A7A7A7"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeMiterlimit="1"
          />
          <path
            className="laser-path"
            d="M461 133.001H222.05C213.741 133.001 206.142 128.32 202.403 120.9L149.097 15.101C145.358 7.68089 137.759 3 129.45 3H3.5"
            stroke="url(#laser-gradient-left-1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#laser-glow-left-1)"
          />
          <circle cx="461" cy="133" r="3" fill="#D9D9D9" />
          <circle cx="3.5" cy="3" r="3" fill="#D9D9D9" />
        </svg>
      </div>
    </div>
  );
};

export default LeftInfoPath;

const infoGlass =
  "inset 0px 0px 1.8px rgba(255, 255, 255, 0.98), inset 1px -2px 4.3px rgba(255, 255, 255, 0.44)";
