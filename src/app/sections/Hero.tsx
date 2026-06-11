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
      <div className="px-2 sm:px-6 text-center max-h-190 pt-16 sm:pt-20 pb-12 sm:pb-16 mt-16 sm:mt-24 flex flex-col gap-16 sm:gap-24 lg:gap-36 justify-between h-full items-center w-full">
        <div id="title-h1" className="relative z-1 mt-20 sm:mt-0">
          <StaggeredText
            as="h1"
            text={"One Connected System.\nInside and Outside the Walls."}
            className="text-[clamp(1.5rem,7.2vw,2.75rem)] sm:text-5xl md:text-6xl lg:text-7xl text-center justify-center leading-[1.1] whitespace-nowrap sm:whitespace-pre-wrap"
            segmentBy="words"
            duration={0.7}
            direction="bottom"
            delay={70}
            blur
          />
        </div>

        <div className="max-w-72 relative z-20" id="hero-desc">
          <p className="whitespace-nowrap text-[clamp(0.875rem,4.6vw,1.25rem)] sm:text-xl text-white/75">
            The standard for modern supervision
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
