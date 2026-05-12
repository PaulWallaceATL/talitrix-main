"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type Props = {
  /** Video source URL. If omitted, the play button stays decorative. */
  videoSrc?: string;
  /** Optional poster image displayed before play. */
  poster?: string;
  eyebrow?: string;
  headline: string;
  body?: string;
};

export default function VideoBlock({
  videoSrc,
  poster,
  eyebrow,
  headline,
  body,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const canPlay = !!videoSrc;

  return (
    <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mb-10 sm:mb-14">
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-5">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
          {headline}
        </h2>
        {body && (
          <p className="text-white/70 text-base sm:text-lg leading-relaxed mt-5 max-w-2xl">
            {body}
          </p>
        )}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <button
          type="button"
          onClick={() => canPlay && setIsPlaying(true)}
          aria-label={canPlay ? "Play video" : "Video coming soon"}
          className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 aspect-video flex items-center justify-center group cursor-pointer"
          style={{
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.55), 0 0 80px rgba(248, 122, 19, 0.1)",
          }}
        >
          {isPlaying && canPlay ? (
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
              poster={poster}
            >
              <source src={videoSrc} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              {poster ? (
                <Image
                  src={poster}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1080px"
                  className="object-cover opacity-70"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-black to-black" />
              )}

              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              <div
                className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  boxShadow:
                    "0 0 40px rgba(248, 122, 19, 0.45), inset 0 0 20px rgba(248, 122, 19, 0.18)",
                }}
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current ml-1" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
