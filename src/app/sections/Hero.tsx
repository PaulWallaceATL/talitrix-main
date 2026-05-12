import Image from "next/image";
import Link from "next/link";
import React from "react";
import StaggeredText from "@/components/react-bits/staggered-text";

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex items-center">
      <Image
        src={"/talitrix-bg.jpg"}
        alt=""
        width={1920}
        height={1080}
        quality={100}
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className=" text-center  max-h-190 py-16 mt-24 flex flex-col gap-36 justify-between h-full items-center w-full">
        <div id="title-h1" className="relative z-1">
          <StaggeredText
            as="h1"
            text={"The Standard for\nModern Supervision."}
            className="text-7xl text-center justify-center"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        </div>

        <div className="max-w-72 relative z-20" id="hero-desc">
          <p className="text-xl text-white/75">
            A single, unified ecosystem. Inside the walls and out.
          </p>
          <Link
            href="/talitrix-one"
            className="rounded-full cursor-pointer mt-6 w-full py-5 bg-white/15 backdrop-blur-md inline-flex items-center justify-center transition-all duration-300 hover:scale-[1.04] hover:bg-white/25 hover:shadow-[0px_19px_65.2px_rgba(248,122,19,0.4)]"
            style={{
              boxShadow:
                "0px 19px 65.2px rgba(248, 122, 19, 0.1), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
            }}
          >
            Explore Talitrix ONE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
