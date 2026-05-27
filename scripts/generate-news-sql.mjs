#!/usr/bin/env node
/** Generate SQL to replace test news articles with migrated content. */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articles = JSON.parse(
  await readFile(path.join(__dirname, "migrated-news.json"), "utf8"),
);

function sqlStr(v) {
  if (v === null || v === undefined) return "NULL";
  const s = String(v);
  if (!s.includes("\n") && !s.includes("'") && s.length < 200) {
    return `'${s.replace(/'/g, "''")}'`;
  }
  const tag = `t${Math.random().toString(36).slice(2, 10)}`;
  return `$${tag}$${s}$${tag}$`;
}

function sqlArray(arr) {
  if (!arr?.length) return "NULL";
  const inner = arr.map((v) => sqlStr(v)).join(", ");
  return `ARRAY[${inner}]::text[]`;
}

const lines = ["BEGIN;", "DELETE FROM public.news_articles;", ""];

for (const a of articles) {
  lines.push(`INSERT INTO public.news_articles (
  slug, title, category, excerpt, content, featured, published, published_at,
  meta_title, meta_description, keywords, og_image_url, author_name
) VALUES (
  ${sqlStr(a.slug)},
  ${sqlStr(a.title)},
  ${sqlStr(a.category)},
  ${sqlStr(a.excerpt)},
  ${sqlStr(a.content)},
  ${a.featured ? "true" : "false"},
  ${a.published ? "true" : "false"},
  ${a.published_at ? sqlStr(a.published_at) : "NULL"},
  ${sqlStr(a.meta_title)},
  ${sqlStr(a.meta_description)},
  ${sqlArray(a.keywords)},
  ${sqlStr(a.og_image_url)},
  ${sqlStr(a.author_name)}
);`);
  lines.push("");
}

lines.push("COMMIT;");

const out = path.join(__dirname, "migrate-news.sql");
await writeFile(out, lines.join("\n"));
console.log(`Wrote ${articles.length} inserts to ${out}`);
