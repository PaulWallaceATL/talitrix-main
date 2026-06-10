import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import StaggeredText from "@/components/react-bits/staggered-text";
import HalftoneWave from "@/components/react-bits/halftone-wave";
import FrameBorder from "@/components/react-bits/frame-border";
import { supabaseAdmin, type NewsArticle } from "@/lib/supabase";
import { getSiteUrl, pageMetadata } from "@/lib/seo";
import RecentStories from "./RecentStories";

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

        <div
          className={`relative z-10 px-6 md:px-16 pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-28 ${
            featured ? "w-full" : "max-w-7xl"
          }`}
        >
          <div
            className={`grid grid-cols-1 gap-8 lg:items-center ${
              featured
                ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16"
                : "max-w-3xl"
            }`}
          >
            <div className="min-w-0">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary mb-6">
                News
              </span>
              <StaggeredText
                as="h1"
                text={"Industry News &\nTalitrix Updates"}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-6"
                segmentBy="words"
                duration={0.7}
                delay={70}
                blur
              />
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                Announcements, briefings, and perspective from the team setting
                the new standard in monitoring and supervision technology.
              </p>
            </div>

            {featured && (
              <div className="min-w-0 flex items-center justify-center lg:justify-end">
                <Link
                  href={`/news/${featured.slug}`}
                  className="group block relative rounded-2xl overflow-hidden w-full max-w-md sm:max-w-lg lg:max-w-none"
                >
                  <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
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

                  <div className="relative z-10 flex flex-col gap-4 border border-border-gray rounded-2xl p-4 sm:p-5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                    {featured.og_image_url && (
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-border-gray">
                        <Image
                          src={featured.og_image_url}
                          alt={featured.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                        <span className="text-primary">
                          Featured · {featured.category}
                        </span>
                        <span className="text-white/45 normal-case tracking-normal">
                          {fmt(featured.published_at)}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-white/65 text-sm leading-relaxed line-clamp-2">
                        {featured.excerpt}
                      </p>
                      <span className="text-primary text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all pt-1">
                        Read the announcement
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {others.length === 0 && !featured ? (
        <section className="relative px-6 md:px-16 py-16 md:py-24 border-b border-border-gray">
          <div className="p-12 rounded-2xl border border-border-gray bg-white/[0.02] text-center">
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              The Talitrix newsroom is just getting started. Subscribe below
              and you&apos;ll get the first field reports and announcements as
              they ship.
            </p>
          </div>
        </section>
      ) : (
        <RecentStories articles={others} />
      )}

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
