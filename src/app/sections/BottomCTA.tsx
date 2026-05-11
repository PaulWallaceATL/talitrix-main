import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const BottomCTA = () => {
  return (
    <div className="px-16">
      <div className="bg-[url('/cta-bg.jpg')] bg-cover bg-bottom pb-90 pt-16 rounded-4xl flex flex-col gap-16 items-center">
        <h2 className="text-center text-6xl max-w-162.5">
          Deploy the new standard in your jurisdiction.
        </h2>
        <div className="flex gap-4">
          <Link
            href={"/"}
            className="px-8 py-5 bg-white rounded-xl text-zinc-800 font-semibold text-xl"
          >
            Request a Breifing
          </Link>
          <Link
            href={"/"}
            className="px-8 py-5 bg-white/3 rounded-xl font-semibold text-xl backdrop-blur-lg flex gap-2 items-center"
            style={{
              boxShadow:
                "inset 1px -1px 3px rgba(255, 255, 255, 0.5), inset -3px -1px 5px rgba(255, 255, 255, 0.5)",
            }}
          >
            View the ecosystem <FiArrowUpRight className="size-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomCTA;
