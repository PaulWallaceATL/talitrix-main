"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { BsSim } from "react-icons/bs";
import {
  IoChatbubblesOutline,
  IoFitnessOutline,
  IoShieldCheckmarkOutline,
  IoSwapHorizontalOutline,
} from "react-icons/io5";
import { TbDeviceWatchSearch } from "react-icons/tb";
import styles from "./InfoPaths.module.css";
import LaserLine from "./LaserLine";

gsap.registerPlugin(ScrollTrigger, SplitText);

const InfoPaths = ({ ...props }: React.ComponentProps<"div">) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lines = gsap.utils.toArray<HTMLElement>(".info-line");
    const info = gsap.utils.toArray<HTMLElement>(".info-box-1");
    const laserPaths = gsap.utils.toArray<SVGPathElement>(".laser-path");

    const para = SplitText.create("#explode-p", {
      type: "lines",
      mask: "lines",
    });
    const h2 = SplitText.create("#explode-h2", {
      type: "lines",
      mask: "lines",
    });

    // Fade in/out the right-side InfoPaths AND both left-side callouts
    // together as the exploded section enters/leaves the viewport. Using
    // a tighter '-=10%' / 'top center' window so when the user scrolls
    // back up toward the hero the lines disappear immediately rather
    // than lingering past the section boundary.
    gsap.from(
      [
        sectionRef.current,
        // "#leftInfoContent", --- IGNORE ---
      ],
      {
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: "#exploded",
          start: "-=10%",
          end: "top center",
          scrub: true,
        },
      },
    );

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

    // Pin range and h2 lift are smaller on mobile — the section is
    // shorter and -150 lifts the headline too far off-screen. Wrapped
    // in matchMedia so the pin trigger rebuilds cleanly at 768px.
    gsap.matchMedia().add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const isMobile = context.conditions?.isMobile === true;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#exploded",
              start: "top top",
              end: isMobile ? "+=90%" : "+=120%",
              pin: true,
              pinSpacing: true,
              scrub: true,
            },
          })
          .to(
            "#explode-h2",
            { y: isMobile ? -50 : -50, duration: 1, ease: "none" },
            0,
          );
      },
    );

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
    // Fade all info-boxes in together (right-side trio + the two
    // LeftInfoPath instances). Previous 'i * 0.3' stagger meant the
    // left callouts (positions 3 and 4 in DOM order) didn't appear
    // until ~0.9 / 1.2s after the first right-side icon, which read
    // as them 'loading later'.
    info.forEach((item) => {
      timeline.from(
        item,
        {
          opacity: 0,
          ease: "power3.inOut",
          duration: 0.1,
          repeat: 1,
        },
        1.3,
      );
    });

    // timeline.from(
    //   "#leftInfo",
    //   {
    //     opacity: 0,
    //     x: -30,
    //     ease: "power3.inOut",
    //     duration: 1,
    //   },
    //   0.2,
    // );
    // timeline.from(
    //   ".left-info",
    //   {
    //     opacity: 0,
    //     y: 50,
    //     ease: "power3.inOut",
    //     stagger: 0.1,
    //     duration: 1,
    //   },
    //   0.2,
    // );

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
      <div className="w-full absolute bottom-1/2 left-[46%]">
        <LaserLine
          defsId="heart-rate"
          viewBox="0 0 479 175"
          d="M0.019043 169.505L238.433 174.058C245.96 174.202 253.037 170.488 257.194 164.212L358.782 10.8508C362.857 4.69915 369.744 1.00003 377.123 1.00007L472.519 1.00061"
          pathClassName={styles.heartRatePath}
          startDot={{ cx: 3, cy: 170 }}
          endDot={{ cx: 475, cy: 1 }}
          Icon={IoFitnessOutline}
          label={
            <>
              Heart Rate &amp;
              <br /> SpO2 Sensors <br />{" "}
              <span className="opacity-50">
                for health &amp; wellness <br /> monitoring
              </span>
            </>
          }
        />
      </div>
      <div className="w-[80%] absolute -bottom-5 left-full">
        <LaserLine
          defsId="tamper"
          viewBox="0 0 393 54"
          d="M0.458008 0.88916L85.5903 44.7314C95.3607 49.7631 106.192 52.3882 117.181 52.3882H391.458"
          pathClassName={styles.tamperPath}
          startDot={{ cx: 1, cy: 1 }}
          endDot={{ cx: 389, cy: 52 }}
          Icon={IoShieldCheckmarkOutline}
          infoBoxClassName="top-full left-full "
          label={
            <>
              Proximity Sensors <br />{" "}
              <span className="opacity-50">for band tamper</span>
            </>
          }
        />
      </div>
      <div className=" w-1/2 absolute top-[150%] right-[60%]">
        <LaserLine
          defsId="replaceStraps"
          viewBox="0 0 189 63"
          d="M0 61.2661H135.23C142.584 61.2661 149.451 57.5922 153.532 51.475L187.5 0.555176"
          pathClassName={styles.replaceStraps}
          startDot={{ cx: 3, cy: 61 }}
          endDot={{ cx: 186, cy: 3 }}
          infoBoxClassName="top-full right-full flex-row-reverse text-right"
          Icon={IoSwapHorizontalOutline}
          label={
            <>
              Replaceable Wrist <br /> &amp; Ankle Straps
            </>
          }
        />
      </div>
      <div className=" w-1/2 absolute top-0 right-full translate-x-[-40%] translate-y-12">
        <LaserLine
          defsId="monitoring"
          viewBox="0 0 192 158"
          d="M0 157L62.4858 157C68.2937 157 73.5797 153.647 76.0551 148.393L141.445 9.60658C143.92 4.35261 149.206 0.999802 155.014 0.999802H192"
          pathClassName={styles.monitoring}
          startDot={{ cx: 1, cy: 157 }}
          endDot={{ cx: 191, cy: 1 }}
          infoBoxClassName="top-full right-full flex-row-reverse text-right"
          Icon={TbDeviceWatchSearch}
          label={
            <>
              ITW and OTW <br />
              <span className="opacity-50">Monitoring Capabilities</span>
            </>
          }
        />
      </div>
      <div className=" w-1/2 absolute top-0 right-full translate-x-[-20%] -translate-y-18">
        <LaserLine
          defsId="communication"
          viewBox="0 0 192 62"
          d="M0 1L49.2873 1C54.8843 1 60.2709 3.13323 64.3502 6.96534L117.65 57.0347C121.729 60.8668 127.116 63 132.713 63L192 63"
          pathClassName={styles.communication}
          startDot={{ cx: 1, cy: 1 }}
          endDot={{ cx: 191, cy: 63 }}
          infoBoxClassName="top-0 right-full flex-row-reverse text-right"
          Icon={IoChatbubblesOutline}
          label={
            <>
              Two-Way <br /> Communication
            </>
          }
        />
      </div>
      <div className=" w-[80%] absolute bottom-full left-[60%] translate-x-[-40%] translate-y-[-90%]">
        <LaserLine
          defsId="sim"
          viewBox="0 0 320 103"
          d="M0.848633 104L58.5932 11.3623C62.6107 4.91721 69.6684 1 77.2631 1H320.849"
          pathClassName={styles.sim}
          startDot={{ cx: 1, cy: 103 }}
          endDot={{ cx: 320, cy: 1 }}
          infoBoxClassName="top-0 left-full "
          Icon={BsSim}
          label={
            <>
              Three Carrier SIM <br />{" "}
              <span className="opacity-50">
                (AT&amp;T, T-Mobile and <br /> Verizon Wireless)
              </span>
            </>
          }
        />
      </div>
    </div>
  );
};

export default InfoPaths;
