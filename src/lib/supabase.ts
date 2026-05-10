import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedAdmin: SupabaseClient | null = null;
let cachedAnon: SupabaseClient | null = null;

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function supabaseAdmin(): SupabaseClient {
  if (cachedAdmin) return cachedAdmin;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!URL || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  cachedAdmin = createClient(URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedAdmin;
}

export function supabaseAnon(): SupabaseClient {
  if (cachedAnon) return cachedAnon;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!URL || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  cachedAnon = createClient(URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedAnon;
}

const NEWS_IMAGES_BUCKET = "news-images";

let bucketEnsured = false;
export async function ensureNewsImagesBucket(): Promise<void> {
  if (bucketEnsured) return;
  const sb = supabaseAdmin();
  const { data: buckets, error } = await sb.storage.listBuckets();
  if (error) throw error;
  const exists = buckets?.some((b) => b.name === NEWS_IMAGES_BUCKET);
  if (!exists) {
    const { error: createErr } = await sb.storage.createBucket(
      NEWS_IMAGES_BUCKET,
      {
        public: true,
        fileSizeLimit: 10 * 1024 * 1024, // 10 MB
        allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
      },
    );
    if (createErr) throw createErr;
  }
  bucketEnsured = true;
}

export async function uploadNewsImage(
  filename: string,
  bytes: Uint8Array,
  contentType = "image/png",
): Promise<string> {
  await ensureNewsImagesBucket();
  const sb = supabaseAdmin();
  const { error } = await sb.storage
    .from(NEWS_IMAGES_BUCKET)
    .upload(filename, bytes, {
      contentType,
      upsert: true,
      cacheControl: "31536000",
    });
  if (error) throw error;
  const { data } = sb.storage.from(NEWS_IMAGES_BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  og_image_url: string | null;
  author_name: string | null;
};
