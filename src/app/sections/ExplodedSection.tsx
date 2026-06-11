import Image from "next/image";
import InfoPaths from "./components/InfoPaths";

const ExplodedSection = () => {
  return (
    <div className="relative">
      <div
        className="w-full lg:h-screen pb-0 py-20 lg:pb-20 px-6 sm:px-12 lg:px-16 relative lg:overflow-hidden"
        id="exploded"
      >
        <div className="lg:h-full hidden lg:flex lg:flex-col gap-10 justify-between flex-wrap">
          <h2
            className="text-3xl sm:text-4xl h-auto font-semibold max-w-120 relative z-20"
            id="explode-p"
          >
            Modern technology. Human-centered design.
          </h2>
          <div className="flex justify-end items-end lg:items-start">
            <p
              className="text-xl lg:text-2xl w-full max-w-75  lg:max-w-100 leading-snug text-left lg:text-right relative z-20 lg:opacity-100 opacity-70"
              id="explode-h2"
            >
              One connected system for Inside and Outside the Walls monitoring.
            </p>
          </div>
        </div>

        <div
          className="w-screen lg:w-200 absolute left-0 top-[-20%]"
          id="explode-bg"
        >
          <SectionBg />
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-4 text-center items-center px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Built into the Band
          </span>
          <h2 className="text-3xl leading-[1.1] text-white sm:text-4xl max-w-85 sm:max-w-96">
            Modern technology.{" "}
            <span className="bg-linear-to-r from-white to-primary bg-clip-text text-transparent">
              Human-centered design.
            </span>
          </h2>
          <p className="text-lg leading-snug text-white/70 max-w-85 sm:max-w-96">
            One connected system for Inside and Outside the Walls monitoring.
          </p>
        </div>
        <Image
          src={"/featue-render.png"}
          alt="Talitrix One exploded view"
          className="relative w-full z-20 mx-auto max-w-130"
          width={800}
          height={800}
        />
      </div>
      <div>
        <InfoPaths className="lg:fixed lg:top-1/2 lg:left-1/2 lg:ml-6 lg:-translate-1/2 lg:opacity-0 z-20 relative lg:w-60 xl:w-80 2xl:w-100 lg:h-50 text-sm lg:pointer-events-none grid lg:block grid-cols-1 sm:grid-cols-2 gap-4 mx-auto mt-0 mb-14 lg:my-0 px-6" />
      </div>
    </div>
  );
};

export default ExplodedSection;

const SectionBg = () => {
  return (
    <svg viewBox="0 0 1350 1598" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_290_9685)">
        <path
          d="M949.781 541.218C949.781 667.841 332.861 1198 58.0917 1198C-216.677 1198 614.972 746.694 743.74 629.162C668.486 611.176 -319.922 361.449 237.377 405.116C512.146 405.116 949.781 414.595 949.781 541.218Z"
          fill="#F87A13"
        />
      </g>
      <g filter="url(#filter1_f_290_9685)">
        <path
          d="M880.781 731.078C880.781 813.127 392.547 1033 392.547 1033C392.547 1033 580.537 911.4 580.537 829.352C580.537 747.303 59.3024 614.592 419.866 642.887C597.637 642.887 880.781 649.03 880.781 731.078Z"
          fill="#F87A13"
        />
      </g>
      <g filter="url(#filter2_f_290_9685)">
        <path
          d="M880.782 752.621C880.782 802.183 692.814 935 585.184 935C477.554 935 699.001 861.546 699.001 811.984C699.001 762.422 383.424 682.256 601.724 699.348C709.354 699.348 880.782 703.059 880.782 752.621Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_290_9685"
          x="-397.219"
          y="0"
          width="1747"
          height="1598"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_290_9685"
          />
        </filter>
        <filter
          id="filter1_f_290_9685"
          x="-107.219"
          y="239"
          width="1388"
          height="1194"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_290_9685"
          />
        </filter>
        <filter
          id="filter2_f_290_9685"
          x="124.782"
          y="297"
          width="1156"
          height="1038"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_290_9685"
          />
        </filter>
      </defs>
    </svg>
  );
};
