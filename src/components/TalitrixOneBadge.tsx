import Image from "next/image";

/**
 * Small TalitrixONE logo pill used in the hero of every platform page so
 * each module is visually branded as part of the TalitrixONE ecosystem.
 */
const TalitrixOneBadge = () => (
  <div className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md px-5 py-2.5">
    <Image
      src="/talitrixone-logo.png"
      alt="TalitrixONE"
      width={397}
      height={41}
      className="h-3 sm:h-3.5 w-auto"
    />
  </div>
);

export default TalitrixOneBadge;
