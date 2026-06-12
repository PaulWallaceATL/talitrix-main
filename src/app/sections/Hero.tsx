import Image from "next/image";
import Link from "next/link";
import StaggeredText from "@/components/react-bits/staggered-text";

const Hero = () => {
  return (
    <div className="relative w-full h-svh flex items-center">
      <Image
        src={"/talitrix-bg.jpg"}
        alt=""
        width={1920}
        height={1080}
        quality={100}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="relative px-0 sm:px-6 text-center max-h-190 pt-16 sm:pt-20 pb-12 sm:pb-16 mt-16 sm:mt-24 flex flex-col justify-end sm:justify-between h-full items-center w-full">
        <div
          id="title-h1"
          className="absolute left-1/2 z-20 w-[90vw] max-w-[90vw] -translate-x-1/2 top-[14vh] sm:static sm:w-auto sm:max-w-none sm:translate-x-0 sm:top-auto"
        >
          <StaggeredText
            as="h1"
            text={"One Connected System.\nInside and Outside the Walls."}
            className="w-full text-[clamp(1.625rem,8.8vw,2.85rem)] sm:text-5xl md:text-6xl lg:text-7xl text-center justify-center leading-[1.08] whitespace-nowrap sm:whitespace-pre-wrap"
            segmentBy="lines"
            duration={0.7}
            direction="bottom"
            delay={70}
            blur
          />
        </div>

        <div
          className="relative z-20 mx-auto flex w-full max-w-72 flex-col items-center text-center sm:max-w-none"
          id="hero-desc"
        >
          <p className="w-full whitespace-nowrap text-center text-[clamp(0.875rem,4.6vw,1.25rem)] sm:text-xl text-white/75">
            The standard for modern supervision
          </p>
          <Link
            href="/talitrix-one"
            className="rounded-full cursor-pointer mt-6 w-full max-w-72 py-5 bg-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-[1.04] hover:bg-white/25 hover:shadow-[0px_19px_65.2px_rgba(248,122,19,0.4)]"
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
