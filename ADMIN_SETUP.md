# Talitrix Admin — Setup Guide

This adds an admin section at **`/admin`** that lets you:

- Create / edit / publish / delete every news article shown on `/news`.
- View every submission from the public **Contact**, **Get Started**, and
  **Participant Registration** forms (and delete them once handled).

Authentication is intentionally simple: a single shared **admin password** —
no email signups, no Supabase Auth users.

---

## 1. Create the database tables in Supabase

1. Open your Supabase project.
2. Go to **SQL Editor → New query**.
3. Paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it.

The script is idempotent — you can re-run it safely. It creates:

| Table                         | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `news_articles`               | Backing store for `/news` and `/news/[slug]`         |
| `contact_submissions`         | Captures every submission of the `/contact` form    |
| `get_started_submissions`     | Captures every submission of `/get-started`          |
| `participant_registrations`   | Captures every submission of `/participant-registration` |

> RLS is **enabled** on every table but no policies are added — the Next.js
> server uses the **Service Role** key, which bypasses RLS. The anon key has
> no access by default, so nothing leaks if you ever expose it to the browser.

---

## 2. Environment variables

Add the following in **Vercel → Project → Settings → Environment Variables**
(set them for **Production**, **Preview**, and **Development**, then redeploy):

### Required

| Name                              | Where to find it                                                             | Notes                                                                                             |
| --------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase → Project Settings → **API** → "Project URL"                         | Public                                                                                             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase → Project Settings → **API** → "anon public" key                     | Public; not currently used in the browser but expected to exist                                    |
| `SUPABASE_SERVICE_ROLE_KEY`       | Supabase → Project Settings → **API** → "service_role" key                    | **Secret.** Never expose to the browser. Used server-side for reads + writes.                      |
| `ADMIN_PASSWORD`                  | You choose                                                                    | The single password used to sign in at `/admin/login`. Pick something long and random.            |
| `ADMIN_SESSION_SECRET`            | You generate                                                                  | Used to sign the admin session cookie. Must be ≥ 16 chars. Generate with `openssl rand -hex 32`.   |

### Required for AI article generation (the ✦ "Generate Article" button + auto-newsroom)

| Name                | Where to find it                                                          | Notes                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OPENAI_API_KEY`    | [platform.openai.com → API keys](https://platform.openai.com/api-keys)     | **Secret.** Server-only. Without this, the AI panels return a clear error and the rest of the admin still works.                                       |
| `OPENAI_MODEL`      | _Optional_ — defaults to `gpt-4o`                                          | Text model. Override to `gpt-4o-mini` for cheaper drafts, or a newer model when one ships.                                                              |
| `OPENAI_IMAGE_MODEL`| _Optional_ — defaults to `gpt-image-1`                                     | Image model used by the one-click auto-generator. Falls back to `dall-e-3` if you set it that way.                                                      |

### Strongly recommended for SEO

| Name                   | Value                                                              | Why                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Your real production origin (e.g. `https://talitrix.com`)          | Used as the `metadataBase`, in canonical URLs, Open Graph tags, JSON-LD, the sitemap, and `robots.txt`. If unset, the app falls back to the Vercel deployment URL.    |

For local development add everything you set above to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
ADMIN_PASSWORD=replace-with-a-long-passphrase
ADMIN_SESSION_SECRET=replace-with-openssl-rand-hex-32

OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o            # optional

NEXT_PUBLIC_SITE_URL=https://talitrix.com
```

> Rotating `ADMIN_SESSION_SECRET` immediately invalidates every active admin
> session — useful if you ever suspect the cookie was leaked.

---

## 3. Sign in

1. Deploy / run `pnpm dev`.
2. Visit **`/admin`** — you'll be redirected to **`/admin/login`**.
3. Enter the value of `ADMIN_PASSWORD`. You're now signed in for 7 days.

Use **Sign out** in the sidebar to clear the cookie.

---

## 4. Generating articles with AI

There are two AI flows — pick whichever fits the moment:

### A. ✦ Auto-newsroom (one click → 1–5 full articles)

On **Admin → News** there's a glowing **"✦ Auto-generate articles"** panel at
the top of the page.

1. Pick a count (**1–5**).
2. Optional toggles:
   - **Use live web research** — runs an OpenAI web search first to anchor
     the topics in the current state of community supervision, electronic
     monitoring, pretrial reform, etc.
   - **Publish immediately** — uncheck to save as drafts.
3. Click **✦ Generate N articles**.

Behind the scenes, for each article the server:

1. Plans a unique, on-brand topic (with web-research context if enabled).
2. Generates a structured article (title, slug, category, excerpt, body,
   meta title, meta description, keywords) in Talitrix's voice.
3. Generates a 1536×1024 cinematic editorial hero image with `gpt-image-1`.
4. Uploads the image to Supabase Storage (auto-creates the `news-images`
   public bucket on first use).
5. Inserts the row into `news_articles` with the storage URL set as
   `og_image_url` so it appears on the article page, the index, **and** in
   the Open Graph / Twitter card.

Typical run: **15–35 seconds per article**, parallelized.

### B. ✦ AI Assistant (one article from your brief)

On **Admin → News → New Article** the existing "✦ AI Assistant" panel is
still there for when you want manual control:

1. Drop a brief into the textbox.
2. Pick a category and (optional) tone notes.
3. Click **✦ Generate Article** — fills every field, you edit, then save.

### Model + voice notes

The system prompt is tuned to Talitrix's voice ("Dignity by Design",
trade-publication tone, no marketing fluff, never invent named pilot
agencies or statistics).

- Text model: `OPENAI_MODEL` (default `gpt-4o`).
- Image model: `OPENAI_IMAGE_MODEL` (default `gpt-image-1`).

### Supabase Storage requirement

The auto-newsroom needs a public bucket named **`news-images`**. The first
auto-generation run will create it for you using the service role key — no
manual setup required. If you want to verify or pre-create it manually:

- Supabase → **Storage → New bucket** → name `news-images`, **Public bucket**
  ON, file size limit 10 MB, allowed MIME types `image/png, image/jpeg,
  image/webp`.

---

## 5. SEO & discoverability

The site ships with aggressive, on-by-default SEO:

- **`metadataBase`** + canonical URLs on every page (`NEXT_PUBLIC_SITE_URL`).
- **Open Graph** + **Twitter Cards** on every page (with per-article images
  when set in the editor; otherwise falls back to `/public/og-image.png`).
- **JSON-LD** structured data:
  - `Organization` site-wide (in `<head>` via the root layout).
  - `Blog` on `/news`.
  - `NewsArticle` + `BreadcrumbList` on each article page.
- Auto-generated **sitemap** at `/sitemap.xml` that pulls every published
  article from Supabase with `lastmod` from `updated_at`.
- Auto-generated **robots.txt** at `/robots.txt` that disallows `/admin`
  and `/api/admin` and points to the sitemap.
- Per-article **meta_title**, **meta_description**, **keywords**, **author**,
  and **og_image_url** — all editable, all auto-filled by the AI generator.
- Reading-time estimate, `wordCount`, `articleSection`, and `timeRequired`
  in the article JSON-LD.

> Add `/public/og-image.png` (1200×630) for the default social image. If you
> want per-article social images, paste a CDN URL into the "Social Image URL"
> field in the editor.

---

## 6. What lives where

```
src/
  proxy.ts                                  # Protects /admin/* (Next 16 proxy)
  lib/
    admin-auth.ts                           # Password + signed cookie logic
    supabase.ts                             # Supabase clients (admin/anon)
    seo.ts                                  # Site URL helpers + Organization JSON-LD
  app/
    layout.tsx                              # Site-wide metadata, OG, Organization JSON-LD
    sitemap.ts                              # Dynamic /sitemap.xml (static + DB articles)
    robots.ts                               # /robots.txt — blocks /admin and /api/admin
    api/
      contact/route.ts                      # Public POST  → contact_submissions
      get-started/route.ts                  # Public POST  → get_started_submissions
      participant-registration/route.ts     # Public POST  → participant_registrations
      admin/
        login/route.ts                      # Sets the admin session cookie
        logout/route.ts                     # Clears the admin session cookie
        news/route.ts                       # GET list / POST create
        news/[id]/route.ts                  # GET / PATCH / DELETE
        news/generate/route.ts              # POST → OpenAI single structured article draft
        news/auto/route.ts                  # POST → research + 1–5 full articles + images
        submissions/[type]/[id]/route.ts    # DELETE a submission
    admin/
      login/                                # Login page (no sidebar)
      LogoutButton.tsx
      (authed)/                             # Everything below requires the cookie
        layout.tsx                          # Sidebar shell
        page.tsx                            # Dashboard with counts
        news/                               # List / new / edit (with AI panel + SEO)
        submissions/[type]/                 # contact | get-started | participant-registration
    news/
      page.tsx                              # Reads published articles from Supabase
      [slug]/page.tsx                       # Public article page (Article + Breadcrumb JSON-LD)
```

---

## 7. Behavior of the public forms

The three forms (`/contact`, `/get-started`, `/participant-registration`) now
POST to their respective `/api/...` endpoints. On success the user sees the
existing confirmation screen. On failure they see an inline error and can
retry. Every successful submission is inserted into Supabase and is visible
in the admin dashboard within seconds.

---

## 8. Hardening checklist (when you're ready)

- Rotate `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` regularly.
- Add basic rate-limiting to `/api/contact`,
  `/api/participant-registration`, and `/api/admin/login` (e.g. via
  [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)).
- Move to per-admin accounts (Supabase Auth or Clerk) when more than one
  person needs access — single shared passwords don't scale.
- For `participant_registrations`, evaluate Supabase column-level encryption
  (pgsodium) or move sensitive fields to a separate, more restricted store
  for compliance with state PII rules.
