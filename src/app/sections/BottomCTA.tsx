import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import StaggeredText from "@/components/react-bits/staggered-text";

const BottomCTA = () => {
  return (
    <div className="px-16">
      <div className="bg-[url('/cta-bg.jpg')] bg-cover bg-bottom pb-90 pt-16 rounded-4xl flex flex-col gap-16 items-center">
        <StaggeredText
          as="h2"
          text="Deploy the new standard in your jurisdiction."
          className="text-center justify-center text-6xl max-w-162.5"
          segmentBy="words"
          duration={0.7}
          delay={70}
          blur
        />
        <div className="flex gap-4">
          <Link
            href="/contact?type=briefing"
            className="px-8 py-5 bg-white rounded-xl text-zinc-800 font-semibold text-xl transition-all duration-300 hover:scale-[1.05] hover:bg-primary hover:text-white shadow-[0_10px_40px_rgba(255,255,255,0.08)] hover:shadow-[0_18px_55px_rgba(248,122,19,0.45)]"
          >
            Request a Briefing
          </Link>
          <Link
            href="/talitrix-one"
            className="group px-8 py-5 bg-white/5 rounded-xl font-semibold text-xl backdrop-blur-lg flex gap-2 items-center transition-all duration-300 hover:scale-[1.03] hover:bg-white/10"
            style={{
              boxShadow:
                "inset 1px -1px 3px rgba(255, 255, 255, 0.5), inset -3px -1px 5px rgba(255, 255, 255, 0.5)",
            }}
          >
            View the ecosystem
            <FiArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomCTA;
