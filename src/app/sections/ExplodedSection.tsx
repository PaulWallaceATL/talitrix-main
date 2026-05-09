import InfoPaths from "./components.tsx/InfoPaths";

const ExplodedSection = () => {
  return (
    <div
      className="w-full h-screen py-30 px-16 relative overflow-hidden "
      id="exploded"
    >
      <div className="h-full flex flex-col justify-between pb-20">
        <p className="text-2xl max-w-100" id="explode-p">
          Dignity by Design. Proximity-based tamper detection with biometric
          verification.
        </p>
        <div className="flex justify-end">
          <h2 className="text-6xl w-120 font-semibold" id="explode-h2">
            Built for human experience.
          </h2>
        </div>
      </div>

      <div className="w-200 absolute left-0 top-[10%]" id="explode-bg">
        <SectionBg />
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
