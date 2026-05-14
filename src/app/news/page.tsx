import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import StaggeredText from "@/components/react-bits/staggered-text";
import HalftoneWave from "@/components/react-bits/halftone-wave";
import FrameBorder from "@/components/react-bits/frame-border";
import { supabaseAdmin, type NewsArticle } from "@/lib/supabase";
import { getSiteUrl, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const SITE = getSiteUrl();

export const metadata: Metadata = pageMetadata({
  path: "/news",
  title: "News & Field Reports | Talitrix",
  description:
    "Announcements, field reports, and engineering deep-dives from Talitrix — the team setting the new standard in wrist-worn GPS supervision and the Talitrix ONE platform.",
  socialDescription:
    "Announcements, field reports, and engineering deep-dives from Talitrix.",
});

function fmt(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}

async function loadArticles(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("news_articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as NewsArticle[];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const all = await loadArticles();
  const featured = all.find((a) => a.featured) ?? all[0] ?? null;
  const others = featured ? all.filter((a) => a.id !== featured.id) : [];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Talitrix News",
    url: `${SITE}/news`,
    publisher: {
      "@type": "Organization",
      name: "Talitrix",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/talitrix-logo.svg`,
      },
    },
    blogPost: all.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.meta_description ?? a.excerpt,
      url: `${SITE}/news/${a.slug}`,
      datePublished: a.published_at ?? a.created_at,
      dateModified: a.updated_at,
      author: {
        "@type": "Organization",
        name: a.author_name ?? "Talitrix",
      },
    })),
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <section className="relative w-full overflow-hidden border-b border-border-gray">
        <div className="absolute inset-0 z-0 opacity-60">
          <HalftoneWave
            colorA="#f87a13"
            colorB="#ffba80"
            backgroundColor="#000000"
            speed={0.5}
            gridDensity={90}
            dotSize={0.42}
            softness={1.4}
            opacity={0.85}
            rotation={15}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

        <div className="relative z-10 px-6 md:px-16 pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-32 max-w-7xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
            News
          </span>
          <StaggeredText
            as="h1"
            text={"Field reports.\nFrom the new standard."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
            Announcements, briefings, and perspective from the team setting
            the new standard in monitoring and supervision technology.
          </p>
        </div>
      </section>

      {featured && (
        <section className="relative px-6 md:px-16 py-16 md:py-24 border-b border-border-gray overflow-hidden">
          <div className="absolute -top-40 -right-32 w-[700px] h-[700px] bg-primary/10 blur-[200px] pointer-events-none" />

          <Link
            href={`/news/${featured.slug}`}
            className="relative z-10 block group"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <FrameBorder
                  color="#f87a13"
                  backgroundColor="#000000"
                  speed={0.7}
                  borderWidth={0.06}
                  noiseStrength={0.5}
                  intensity={1.4}
                  opacity={0.85}
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border border-border-gray rounded-2xl p-6 sm:p-8 md:p-12 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors">
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <span className="text-primary text-xs uppercase tracking-[0.3em]">
                    Featured · {featured.category}
                  </span>
                  <span className="text-white/50 text-sm">
                    {fmt(featured.published_at)}
                  </span>
                </div>
                <div className="lg:col-span-9 flex flex-col gap-6">
                  {featured.og_image_url && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border-gray">
                      <Image
                        src={featured.og_image_url}
                        alt={featured.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl md:text-5xl leading-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl">
                    {featured.excerpt}
                  </p>
                  <div className="pt-2">
                    <span className="text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read the announcement
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="relative px-6 md:px-16 py-16 md:py-24 border-b border-border-gray">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-4">
              {others.length > 0 ? "The Latest" : "Coming Soon"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              {others.length > 0 ? "Recent stories." : "First stories incoming."}
            </h2>
          </div>
          {others.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {[
                "All",
                "Platform",
                "Field Report",
                "Perspective",
                "Engineering",
                "Courts",
              ].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                    i === 0
                      ? "border-primary text-primary"
                      : "border-border-gray text-white/65 hover:text-white hover:border-white/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {others.length === 0 && !featured ? (
          <div className="p-12 rounded-2xl border border-border-gray bg-white/[0.02] text-center">
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              The Talitrix newsroom is just getting started. Subscribe below
              and you&apos;ll get the first field reports and announcements as
              they ship.
            </p>
          </div>
        ) : others.length === 0 ? (
          <div className="p-12 rounded-2xl border border-border-gray bg-white/[0.02] text-center">
            <p className="text-white/70">
              More stories are queued up. Subscribe below to get the next one
              the moment it&apos;s published.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={`/news/${a.slug}`}
                className="bg-background flex flex-col min-h-[280px] hover:bg-white/[0.04] transition-colors group"
              >
                {a.og_image_url && (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border-gray bg-white/[0.02]">
                    <Image
                      src={a.og_image_url}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span className="text-primary tracking-widest uppercase">
                      {a.category}
                    </span>
                    <span>{fmt(a.published_at)}</span>
                  </div>
                  <h3 className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-4">
                    {a.excerpt}
                  </p>
                  <div className="mt-auto pt-2">
                    <span className="text-primary text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read more <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6">
              Stay close to the work.
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
              Briefings, field reports, and announcements — directly from the
              Talitrix team. No marketing noise.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full lg:justify-end">
            <input
              type="email"
              required
              placeholder="you@agency.gov"
              className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/[0.05] border border-border-gray rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-primary text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 text-sm sm:text-base"
              style={{
                boxShadow:
                  "0px 19px 65.2px rgba(248, 122, 19, 0.15), inset -3px -1px 10.9px rgba(255, 255, 255, 0.18), inset 0px 0px 2px #ffffff",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
