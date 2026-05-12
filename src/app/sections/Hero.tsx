import Image from "next/image";
import Link from "next/link";
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
        priority
        fetchPriority="high"
        sizes="100vw"
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="px-6 text-center max-h-190 pt-20 sm:pt-24 pb-12 sm:pb-16 mt-16 sm:mt-24 flex flex-col gap-16 sm:gap-24 lg:gap-36 justify-between h-full items-center w-full">
        <div id="title-h1" className="relative z-1">
          <StaggeredText
            as="h1"
            text={"The Standard for\nModern Supervision."}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center justify-center leading-[1.1]"
            segmentBy="words"
            duration={0.7}
            direction="bottom"
            delay={70}
            blur
          />
        </div>

        <div className="max-w-72 relative z-20" id="hero-desc">
          <p className="text-base sm:text-lg md:text-xl text-white/75">
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
