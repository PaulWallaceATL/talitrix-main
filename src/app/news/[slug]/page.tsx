import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { supabaseAdmin, type NewsArticle } from "@/lib/supabase";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("news_articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return (data as NewsArticle) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return { title: `News | ${SITE_NAME}` };
  }

  const SITE = getSiteUrl();
  const url = `${SITE}/news/${article.slug}`;
  const title = article.meta_title || article.title;
  const description = article.meta_description || article.excerpt;
  const image = article.og_image_url || `${SITE}/og-image.png`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: article.keywords ?? undefined,
    authors: [{ name: article.author_name ?? "Talitrix Editorial" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description,
      publishedTime: article.published_at ?? article.created_at,
      modifiedTime: article.updated_at,
      authors: [article.author_name ?? "Talitrix Editorial"],
      section: article.category,
      tags: article.keywords ?? undefined,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

function fmt(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

const HEADING_REGEX = /^[A-Za-z][^.!?\n]{2,80}$/;
function isHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.length > 80) return false;
  if (!HEADING_REGEX.test(trimmed)) return false;
  if (/[.!?]$/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  return words.length >= 2 && words.length <= 12;
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const SITE = getSiteUrl();
  const url = `${SITE}/news/${article.slug}`;
  const title = article.meta_title || article.title;
  const description = article.meta_description || article.excerpt;
  const image = article.og_image_url || `${SITE}/og-image.png`;
  const author = article.author_name ?? "Talitrix Editorial";
  const minutes = readingTime(article.content);

  const blocks = article.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image: [image],
    datePublished: article.published_at ?? article.created_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: author, url: SITE },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE}/talitrix-logo.svg` },
    },
    articleSection: article.category,
    keywords: (article.keywords ?? []).join(", ") || undefined,
    wordCount: article.content.trim().split(/\s+/).length,
    timeRequired: `PT${minutes}M`,
    inLanguage: "en-US",
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${SITE}/news`,
      },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <article className="relative pt-40 pb-24 px-6 md:px-16 max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb">
          <Link
            href="/news"
            className="text-xs text-white/50 hover:text-primary tracking-widest uppercase"
          >
            ← All News
          </Link>
        </nav>

        <header className="mt-8 mb-14 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em]">
            <span className="text-primary">{article.category}</span>
            <span className="text-white/40">{fmt(article.published_at)}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/40">{minutes} min read</span>
            <span className="text-white/40">·</span>
            <span className="text-white/40">By {author}</span>
          </div>
          <h1 className="text-4xl md:text-6xl leading-[1.1]">
            {article.title}
          </h1>
          <p className="text-xl text-white/75 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        <div className="flex flex-col gap-6 text-lg text-white/85 leading-relaxed">
          {blocks.map((block, i) =>
            isHeading(block) ? (
              <h2
                key={i}
                className="text-2xl md:text-3xl mt-8 mb-0 leading-snug text-white"
              >
                {block}
              </h2>
            ) : (
              <p key={i} className="whitespace-pre-wrap">
                {block}
              </p>
            ),
          )}
        </div>

        {article.keywords && article.keywords.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border-gray flex flex-wrap gap-2">
            {article.keywords.map((k) => (
              <span
                key={k}
                className="px-3 py-1 text-xs uppercase tracking-widest text-white/60 border border-border-gray rounded-full"
              >
                {k}
              </span>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-2xl border border-border-gray bg-white/[0.02]">
          <div>
            <p className="text-sm text-white/60">More from Talitrix</p>
            <p className="text-lg">
              See the latest field reports and announcements.
            </p>
          </div>
          <Link
            href="/news"
            className="px-6 py-3 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 text-sm whitespace-nowrap"
          >
            All News →
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
