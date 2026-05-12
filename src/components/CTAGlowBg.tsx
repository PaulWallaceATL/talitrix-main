"use client";

import { useEffect, useRef } from "react";

export default function AnimatedGlowShape() {
  const layer1Ref = useRef<SVGGElement | null>(null);
  const layer2Ref = useRef<SVGGElement | null>(null);
  const layer3Ref = useRef<SVGGElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let frameId = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) * 0.003;

      if (layer1Ref.current) {
        const x = Math.sin(t * 0.45) * 60;
        const y = Math.cos(t * 0.35) * 30;
        const scale = 1 + Math.sin(t * 0.4) * 0.025;
        const opacity = 0.9 + Math.sin(t * 0.8) * 0.08;

        layer1Ref.current.setAttribute(
          "transform",
          `translate(${x} ${y}) scale(${scale})`,
        );
        layer1Ref.current.setAttribute("opacity", `${opacity}`);
      }

      if (layer2Ref.current) {
        const x = Math.sin(t * 0.6 + 1.2) * 90;
        const y = Math.cos(t * 0.45 + 0.5) * 35;
        const scale = 1 + Math.sin(t * 0.55 + 1) * 0.035;
        const opacity = 0.82 + Math.sin(t * 0.9 + 0.4) * 0.1;

        layer2Ref.current.setAttribute(
          "transform",
          `translate(${x} ${y}) scale(${scale})`,
        );
        layer2Ref.current.setAttribute("opacity", `${opacity}`);
      }

      if (layer3Ref.current) {
        const x = Math.sin(t * 0.38 + 2.3) * 28;
        const y = Math.cos(t * 0.3 + 1.8) * 14;
        const scale = 1 + Math.sin(t * 0.42 + 1.7) * 0.02;
        const opacity = 0.92 + Math.sin(t * 0.7 + 2) * 0.06;

        layer3Ref.current.setAttribute(
          "transform",
          `translate(${x} ${y}) scale(${scale})`,
        );
        layer3Ref.current.setAttribute("opacity", `${opacity}`);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 h-[85vh] overflow-hidden pointer-events-none">
      <svg
        ref={svgRef}
        viewBox="0 0 1793 717"
        className="absolute bottom-[-6%] left-1/2 h-full w-[120%] -translate-x-1/2"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={layer1Ref} filter="url(#filter0_f_363_2395)">
          <path
            d="M1140.5 341.179C1577.32 61.7698 1706 816.679 2063.8 200L2011.61 1080.68L-87 1004.17L-61.3335 300.213C139.466 198.226 188.994 263.393 288.068 393.75L291.336 398.049C375.842 509.202 399.744 815.003 1140.5 341.179Z"
            fill="#F87A13"
          />
        </g>

        <g ref={layer2Ref} filter="url(#filter1_f_363_2395)">
          <path
            d="M1362.43 462.38C1690.5 306.38 1550 726.679 2039 306.38L2018.93 1188.38H-81.0688V483.958C115.881 374.722 167.751 438.041 271.509 564.702L274.931 568.88C363.431 676.88 568.305 839.995 1362.43 462.38Z"
            fill="#F9AD6F"
          />
        </g>

        <g ref={layer3Ref} filter="url(#filter2_f_363_2395)">
          <path
            d="M1581 655.531C2097.35 607.983 1959 400.118 2039.07 420.133L2019 1302.13H-80.9995V597.71C118.104 487.281 267.659 666.691 433.5 689.031C749 731.531 576.5 748.031 1581 655.531Z"
            fill="white"
          />
        </g>

        <defs>
          <filter
            id="filter0_f_363_2395"
            x="-287"
            y="0"
            width="2550.8"
            height="1280.68"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur_363_2395"
            />
          </filter>

          <filter
            id="filter1_f_363_2395"
            x="-181.069"
            y="206.38"
            width="2320.07"
            height="1082"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_363_2395"
            />
          </filter>

          <filter
            id="filter2_f_363_2395"
            x="-281"
            y="218.779"
            width="2520.07"
            height="1283.35"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur_363_2395"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
