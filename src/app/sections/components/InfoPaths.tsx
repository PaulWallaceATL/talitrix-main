"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import {
  IoFitnessOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoSwapHorizontalOutline,
  IoWifiOutline,
} from "react-icons/io5";
import LaserLine from "./LaserLine";
import styles from "./InfoPaths.module.css";

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
            { y: isMobile ? -50 : -150, duration: 1, ease: "none" },
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
          viewBox="0 0 479 173"
          pathClassName={styles.heartRatePath}
          startDot={{ cx: 3, cy: 170 }}
          endDot={{ cx: 475, cy: 1 }}
          Icon={IoFitnessOutline}
          label={
            <>
              Heart Rate &amp;
              <br /> SpO2 sensors <br />{" "}
              <span className="opacity-50">
                for health &amp; wellness <br /> monitoring
              </span>
            </>
          }
        />
      </div>
      <div className=" w-48 absolute top-[120%] right-full">
        <LaserLine
          defsId="replaceStraps"
          viewBox="0 0 189 63"
          pathClassName={styles.replaceStraps}
          startDot={{ cx: 3, cy: 61 }}
          endDot={{ cx: 186, cy: 3 }}
          infoBoxClassName="top-full right-full flex-row-reverse text-right"
          Icon={IoSwapHorizontalOutline}
          label={
            <>
              Replaceable wrist <br /> &amp; ankle straps
            </>
          }
        />
      </div>

      <div className="w-[90%] absolute -bottom-5 left-full">
        <LaserLine
          defsId="tamper"
          viewBox="0 0 393 54"
          pathClassName={styles.tamperPath}
          startDot={{ cx: 1, cy: 1 }}
          endDot={{ cx: 389, cy: 52 }}
          Icon={IoShieldCheckmarkOutline}
          infoBoxClassName="top-full left-full "
          label={
            <>
              Proximity sensors <br />{" "}
              <span className="opacity-50">for band tamper</span>
            </>
          }
        />
      </div>
    </div>
  );
};

export default InfoPaths;
