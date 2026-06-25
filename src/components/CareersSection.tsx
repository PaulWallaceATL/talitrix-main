import Image from "next/image";

const CAREERS_URL =
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=b84a3280-e2d8-408e-a152-55bc14023670&ccId=19000101_000001&source=CC2&lang=en_US&selectedMenuKey=CareerCenter";

const CareersSection = () => {
  return (
    <section className="relative px-6 md:px-16 py-20 md:py-32 border-b border-border-gray">
      <div className="relative min-h-[560px] overflow-hidden rounded-3xl md:min-h-[640px] md:rounded-[2rem]">
        <Image
          src="/about/careers-team.jpg"
          alt="Talitrix team collaborating in a modern office"
          fill
          priority={false}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" aria-hidden />

        <div className="relative z-10 flex min-h-[560px] flex-col p-6 md:min-h-[640px] md:p-10 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-1 items-end lg:col-span-7">
            <div className="max-w-xl">
              <span className="mb-4 inline-block text-xs uppercase tracking-[0.3em] text-primary">
                Careers
              </span>
              <h2 className="text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
                Join Our Team.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Help us build the standard for modern supervision — technology
                designed around people, dignity, and better outcomes.
              </p>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-4 lg:col-span-5 lg:mt-0 lg:justify-end">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:aspect-[16/11]">
              <Image
                src="/about/office-exterior.png"
                alt="Talitrix office building in Alpharetta, Georgia"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                Alpharetta, GA
              </span>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/45 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                Our team
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-3xl font-medium leading-none text-white sm:text-4xl">
                    30+
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Team members and counting
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-medium leading-none text-white sm:text-4xl">
                    2020
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Founded
                  </p>
                </div>
              </div>

              <a
                href={CAREERS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/15 px-6 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white sm:text-base"
              >
                View Open Roles
                <span aria-hidden className="ml-2">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
