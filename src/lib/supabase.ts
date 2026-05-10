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
