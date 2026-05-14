"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import {
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoWifiOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
          delay: i * 0.3,
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
          delay: i * 0.3,
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
        delay: i * 1,
        ease: "none",
      });
    });
  });
  return (
    <div {...props} ref={sectionRef} id="infoPaths">
      <div className="w-full absolute bottom-1/2">
        <svg
          viewBox="0 0 479 315"
          className="info-line"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="laser-glow-1"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="laser-gradient-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M4 309.005L238.862 313.49C248.225 313.669 256.675 307.901 259.919 299.117L363.978 17.3778C367.169 8.73765 375.405 3.00003 384.615 3.00009L476.5 3.00061"
            stroke="#A7A7A7"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeMiterlimit="1"
          />
          <path
            className="laser-path"
            d="M4 309.005L238.862 313.49C248.225 313.669 256.675 307.901 259.919 299.117L363.978 17.3778C367.169 8.73765 375.405 3.00003 384.615 3.00009L476.5 3.00061"
            stroke="url(#laser-gradient-1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#laser-glow-1)"
          />
          <circle cx="476" cy="3" r="3" fill="#D9D9D9" />
          <circle cx="3" cy="309" r="3" fill="#D9D9D9" />
        </svg>

        <div className="absolute top-0 -translate-y-7 left-full text-center flex flex-col gap-2 items-center info-box w-25">
          <div
            className="size-14 p-2 bg-white/15  rounded-lg"
            style={{ boxShadow: infoGlass }}
          >
            <IoLocationOutline className="size-full text-primary" />
          </div>
          ITW + OTW <br /> Monitoring
        </div>
      </div>
      {/* Middle-right callout: copy of the Tamper Proof bent line, anchored
          one step higher so it sits parallel-above the Tamper Proof bend
          (no crossover) and starts at the same right-of-band x position. */}
      <div className="w-full absolute bottom-[78%] left-[65%]">
        <div className="absolute top-0 -translate-y-7 left-full text-center flex flex-col gap-2 items-center info-box w-25">
          <div
            className="size-14 p-2 bg-white/15  rounded-lg"
            style={{ boxShadow: infoGlass }}
          >
            <IoWifiOutline className="size-full text-primary" />
          </div>
          Connectivity <br /> & Comms
        </div>
        <svg
          viewBox="0 0 465 136"
          className="info-line"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="laser-glow-3"
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
            <linearGradient id="laser-gradient-3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M4 133.001H242.95C251.259 133.001 258.858 128.32 262.597 120.9L315.903 15.101C319.642 7.68089 327.241 3 335.55 3H461.5"
            stroke="#A7A7A7"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeMiterlimit="1"
          />
          <path
            className="laser-path"
            d="M4 133.001H242.95C251.259 133.001 258.858 128.32 262.597 120.9L315.903 15.101C319.642 7.68089 327.241 3 335.55 3H461.5"
            stroke="url(#laser-gradient-3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#laser-glow-3)"
          />
          <circle cx="462" cy="3" r="3" fill="#D9D9D9" />
          <circle cx="3" cy="133" r="3" fill="#D9D9D9" />
        </svg>
      </div>
      <div className="w-full absolute bottom-0 left-1/2">
        <div className="absolute top-0 -translate-y-7 left-full text-center flex flex-col gap-2 items-center info-box w-25">
          <div
            className="size-14 p-2 bg-white/15  rounded-lg"
            style={{ boxShadow: infoGlass }}
          >
            <IoShieldCheckmarkOutline className="size-full text-primary" />
          </div>
          Proximity <br /> Tamper
        </div>
        <svg
          viewBox="0 0 465 136"
          className="info-line"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="laser-glow-2"
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

            <linearGradient id="laser-gradient-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C42" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M4 133.001H242.95C251.259 133.001 258.858 128.32 262.597 120.9L315.903 15.101C319.642 7.68089 327.241 3 335.55 3H461.5"
            stroke="#A7A7A7"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeMiterlimit="1"
          />
          <path
            className="laser-path"
            d="M4 133.001H242.95C251.259 133.001 258.858 128.32 262.597 120.9L315.903 15.101C319.642 7.68089 327.241 3 335.55 3H461.5"
            stroke="url(#laser-gradient-2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#laser-glow-2)"
          />
          <circle cx="462" cy="3" r="3" fill="#D9D9D9" />
          <circle cx="3" cy="133" r="3" fill="#D9D9D9" />
        </svg>
      </div>
    </div>
  );
};

export default InfoPaths;

const infoGlass =
  "inset 0px 0px 1.8px rgba(255, 255, 255, 0.98), inset 1px -2px 4.3px rgba(255, 255, 255, 0.44)";
