import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "About | Talitrix",
  description:
    "Talitrix is redefining electronic monitoring — technology designed around people, not punishment. Learn how we set the global standard in modern supervision.",
};

const principles = [
  {
    title: "People First",
    body: "We build for the human experience, supporting the professionals who depend on our technology and the participants who wear it.",
  },
  {
    title: "Radical Accountability",
    body: "We carry the responsibility of operating in one of the most consequential spaces in the world completely, with integrity and without exception.",
  },
  {
    title: "Uncompromising Excellence",
    body: "We hold ourselves to a standard of technological excellence that expands what this industry believes is possible.",
  },
  {
    title: "Intelligence With Purpose",
    body: "Every insight our platform generates exists to drive better decisions and stronger outcomes.",
  },
  {
    title: "Dignity by Design",
    body: "We design technology around the dignity, privacy, and humanity of the people who use it.",
  },
  {
    title: "Conviction Over Convention",
    body: "We refuse to accept what everyone else has settled for.",
  },
];

const timeline = [
  {
    year: "1960s",
    title: "The Original Vision",
    body: "Harvard researchers develop the first wearable electronic monitoring technology as a rehabilitative tool — rooted in positive behavioral reinforcement.",
  },
  {
    year: "1983",
    title: "A Wrong Turn",
    body: "The industry commercialized a different vision: the ankle monitor, inspired by a comic-book villain's tracking device. Surveillance replaced support.",
  },
  {
    year: "Four Decades",
    title: "A Category Disconnected",
    body: "The category prioritized surveillance over success — disconnected from the outcomes it claimed to support.",
  },
  {
    year: "Today",
    title: "Talitrix",
    body: "We brought the technology to the wrist — and back to its original purpose. The T-Band is the industry's first independent wrist-worn GPS monitoring device, paired with a complete unified ecosystem.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageHero
        eyebrow="About Talitrix"
        title={
          <>
            Redefining
            <br />
            the Category.
          </>
        }
        subtitle="Technology designed around people, not punishment."
        body={
          <p>
            Talitrix is setting the global standard in monitoring and
            supervision technology — delivering an industry-defining ecosystem
            that makes criminal-justice professionals more effective,
            participants more successful, and communities safer.
          </p>
        }
      >
        <div className="flex flex-wrap gap-4 mt-10">
          <CTAButton href="/get-started">Request a Briefing</CTAButton>
          <CTAButton href="/talitrix-one" variant="secondary">
            Explore Talitrix ONE
          </CTAButton>
        </div>
      </PageHero>

      <section className="relative px-16 py-32 border-b border-border-gray">
        <div className="max-w-5xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl mb-10 leading-tight">
            Forty years off course.
            <br />
            <span className="text-white/60">One company correcting it.</span>
          </h2>
          <div className="space-y-6 text-lg text-white/75 leading-relaxed max-w-3xl">
            <p>
              In the early 1960s, Harvard researchers developed the first
              wearable electronic monitoring technology as a rehabilitative
              tool — rooted in positive behavioral reinforcement and outcomes.
            </p>
            <p>
              By 1983, the industry had commercialized a different vision: the
              ankle monitor, inspired by a comic-book villain's tracking
              device. For the next four decades, the category prioritized
              surveillance over success — and disconnected from the outcomes
              it claimed to support.
            </p>
            <p className="text-white">
              Talitrix was built to change that. We brought the technology to
              the wrist — and back to its original purpose. We built the
              T-Band, the industry's first independent wrist-worn GPS
              monitoring device, and developed a complete ecosystem around it.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-16 py-32 border-b border-border-gray overflow-hidden">
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Timeline
          </span>
          <h2 className="text-4xl md:text-5xl mb-16 leading-tight max-w-2xl">
            From rehabilitation to surveillance — and back again.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="bg-background p-8 flex flex-col gap-4 min-h-[260px]"
              >
                <span className="text-primary text-sm tracking-widest">
                  {item.year}
                </span>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="text-white/65 leading-relaxed text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-16 py-32 border-b border-border-gray">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
              What we believe
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Built on
              <br />
              conviction.
            </h2>
            <p className="text-white/65 mt-6 max-w-sm leading-relaxed">
              What we built is shaped by what we believe.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="bg-background p-8 flex flex-col gap-3 min-h-[200px]"
              >
                <span className="text-xs text-white/40 tracking-widest">
                  0{i + 1}
                </span>
                <h3 className="text-xl text-primary">{p.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-16 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-6xl leading-[1.1] mb-8">
            Today, Talitrix is setting the global standard in monitoring and
            supervision technology.
          </h2>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
            And we are just getting started.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/get-started">Request a Briefing</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Contact Sales
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
