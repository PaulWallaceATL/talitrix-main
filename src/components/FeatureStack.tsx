import type { ComponentType } from "react";

export type FeatureStackItem = {
  title: string;
  body: string;
  eyebrow?: string;
  Icon: ComponentType<{ className?: string }>;
};

type Props = {
  items: FeatureStackItem[];
  className?: string;
};

/**
 * Vertical "orange stack" feature list — the same icon/title/body treatment
 * used in BandSupervisionSection. Used as the mobile replacement for the
 * horizontal card scrollers.
 */
export default function FeatureStack({ items, className }: Props) {
  return (
    <div className={`flex flex-col gap-8 sm:gap-10 ${className ?? ""}`}>
      {items.map((f) => {
        const Icon = f.Icon;
        return (
          <div key={f.title} className="flex gap-4 sm:gap-5">
            <div
              className="flex-shrink-0 size-12 sm:size-14 rounded-xl border border-primary/25 bg-primary/[0.08] backdrop-blur-md flex items-center justify-center"
              style={{
                boxShadow:
                  "inset 0 0 1.5px rgba(255,255,255,0.6), inset 1px -2px 4px rgba(255,255,255,0.18)",
              }}
            >
              <Icon className="size-5 sm:size-6 text-primary" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              {f.eyebrow ? (
                <span className="text-[11px] uppercase tracking-[0.25em] text-primary/70">
                  {f.eyebrow}
                </span>
              ) : null}
              <h3 className="text-xl leading-tight text-primary sm:text-2xl">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                {f.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
