#!/usr/bin/env node
/**
 * Backup local news hero images to Supabase Storage bucket `news-images`.
 * Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or rely on .env via Vercel pull).
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "public", "news-images");

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://bjcwjrkynvramwfwbqoc.supabase.co";
const SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY. Pull it from Vercel (vercel env pull) or export it before running.",
  );
  process.exit(1);
}

const BUCKET = "news-images";

const mimeFromExt = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

async function ensureBucket() {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket/${BUCKET}`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
  });
  if (res.ok) return;
  if (res.status !== 404) {
    throw new Error(`Bucket check failed ${res.status}: ${await res.text()}`);
  }
  const create = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      file_size_limit: 10 * 1024 * 1024,
      allowed_mime_types: Object.values(mimeFromExt),
    }),
  });
  if (!create.ok) {
    throw new Error(
      `Bucket create failed ${create.status}: ${await create.text()}`,
    );
  }
  console.log(`Created bucket ${BUCKET}`);
}

async function upload(filename, bytes, contentType) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filename}`,
    {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": contentType,
        "x-upsert": "true",
        "cache-control": "31536000",
      },
      body: bytes,
    },
  );
  if (!res.ok) {
    throw new Error(`Upload ${filename} failed ${res.status}: ${await res.text()}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`;
}

async function main() {
  await ensureBucket();
  const files = (await readdir(IMAGES_DIR)).filter((f) => !f.startsWith("."));
  console.log(`Uploading ${files.length} files…`);
  const results = [];
  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase();
    const contentType = mimeFromExt[ext] ?? "application/octet-stream";
    const bytes = await readFile(path.join(IMAGES_DIR, filename));
    process.stdout.write(`  ${filename} … `);
    const url = await upload(filename, bytes, contentType);
    console.log("ok");
    results.push({ filename, url });
  }
  console.log(`\nDone. ${results.length} files backed up to ${BUCKET}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
