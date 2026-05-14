import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import StaggeredText from "@/components/react-bits/staggered-text";
import CTAGlowBg from "@/components/CTAGlowBg";

const BottomCTA = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 mb-8">
      <div className="overflow-hidden relative pb-32 sm:pb-60 lg:pb-90 pt-12 sm:pt-16 px-6 sm:px-10 rounded-3xl sm:rounded-4xl flex flex-col gap-10 sm:gap-14 lg:gap-16 items-center">
        <CTAGlowBg />
        <StaggeredText
          as="h2"
          text="Deploy the new standard in your jurisdiction."
          className="text-center justify-center text-3xl sm:text-5xl lg:text-6xl max-w-md sm:max-w-2xl lg:max-w-[40.625rem] leading-[1.1]"
          segmentBy="words"
          duration={0.7}
          delay={70}
          blur
        />
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center relative z-10">
          <Link
            href="/contact?type=briefing"
            className="px-6 sm:px-8 py-4 sm:py-5 bg-white rounded-xl text-zinc-800 font-semibold text-base sm:text-xl transition-all duration-300 hover:scale-[1.05] hover:bg-primary hover:text-white shadow-[0_10px_40px_rgba(255,255,255,0.08)] hover:shadow-[0_18px_55px_rgba(248,122,19,0.45)]"
          >
            Request a Briefing
          </Link>
          <Link
            href="/talitrix-one"
            className="group px-6 sm:px-8 py-4 sm:py-5 bg-white/5 rounded-xl font-semibold text-base sm:text-xl backdrop-blur-lg flex gap-2 items-center transition-all duration-300 hover:scale-[1.03] hover:bg-white/10"
            style={{
              boxShadow:
                "inset 1px -1px 3px rgba(255, 255, 255, 0.5), inset -3px -1px 5px rgba(255, 255, 255, 0.5)",
            }}
          >
            Explore Talitrix ONE
            <FiArrowUpRight className="size-5 sm:size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomCTA;
