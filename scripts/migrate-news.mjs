#!/usr/bin/env node
/**
 * Scrape legacy Squarespace news posts from talitrix.com and emit migration JSON.
 * Run: node scripts/migrate-news.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "news-images");
const OUT_JSON = path.join(ROOT, "scripts", "migrated-news.json");

const LIST_URLS = [
  "https://www.talitrix.com/news?format=json",
  "https://www.talitrix.com/news?offset=1696280160133&format=json",
];

const CATEGORY_MAP = {
  press: "Announcement",
  announcement: "Announcement",
  company: "Company",
  platform: "Platform",
  engineering: "Engineering",
  courts: "Courts",
  perspective: "Perspective",
};

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function htmlToPlainText(html) {
  let s = html.split(/#block-/)[0];
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/p>/gi, "\n\n");
  s = s.replace(/<\/h[1-6]>/gi, "\n\n");
  s = s.replace(/<\/li>/gi, "\n");
  s = s.replace(/<li[^>]*>/gi, "• ");
  s = s.replace(/<[^>]+>/g, "");
  s = decodeHtml(s);
  s = s.replace(/\r/g, "");
  s = s.replace(/[ \t]+\n/g, "\n");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

function firstParagraph(text) {
  const p = text.split(/\n\n/).find((b) => b.trim().length > 40);
  return (p ?? text).replace(/\s+/g, " ").trim();
}

function mapCategory(item) {
  const raw = (item.categories?.[0] ?? item.tags?.[0] ?? "announcement")
    .toLowerCase()
    .trim();
  return CATEGORY_MAP[raw] ?? "Announcement";
}

function extFromUrl(url) {
  try {
    const base = path.basename(new URL(url).pathname);
    const ext = path.extname(base.split("?")[0]).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) return ext;
  } catch {
    /* ignore */
  }
  return ".jpg";
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image fetch failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

async function fetchAllItems() {
  const items = [];
  for (const url of LIST_URLS) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
    const data = await res.json();
    items.push(...(data.items ?? []));
  }
  return items;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const items = await fetchAllItems();
  console.log(`Found ${items.length} articles`);

  const articles = [];
  for (const item of items) {
    const slug = item.urlId;
    process.stdout.write(`Processing ${slug}… `);

    const content = htmlToPlainText(item.body ?? "");
    const excerpt = firstParagraph(content).slice(0, 500);
    const publishedAt = item.publishOn
      ? new Date(item.publishOn).toISOString()
      : item.addedOn
        ? new Date(item.addedOn).toISOString()
        : null;

    const article = {
      slug,
      title: item.title?.trim() || slug,
      category: mapCategory(item),
      excerpt,
      content,
      featured: false,
      published: true,
      published_at: publishedAt,
      meta_title: (item.title ?? slug).slice(0, 120),
      meta_description: excerpt.slice(0, 160),
      keywords: item.tags?.length ? item.tags : null,
      author_name: item.author?.displayName ?? "Talitrix Editorial",
      og_image_url: null,
    };

    if (item.assetUrl) {
      const ext = extFromUrl(item.assetUrl);
      const filename = `${slug}${ext}`;
      const localPath = path.join(OUT_DIR, filename);
      try {
        await downloadImage(item.assetUrl, localPath);
        article.og_image_url = `/news-images/${filename}`;
      } catch (err) {
        console.log(`image error: ${err.message}`);
      }
    }

    articles.push(article);
    console.log("ok");
  }

  articles.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
  if (articles[0]) articles[0].featured = true;

  await writeFile(OUT_JSON, JSON.stringify(articles, null, 2));
  console.log(`Wrote ${articles.length} articles to ${OUT_JSON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
