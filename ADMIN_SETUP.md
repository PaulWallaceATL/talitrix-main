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

| Name                              | Where to find it                                                             | Notes                                                                                             |
| --------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase → Project Settings → **API** → "Project URL"                         | Public                                                                                             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase → Project Settings → **API** → "anon public" key                     | Public; not currently used in the browser but expected to exist                                    |
| `SUPABASE_SERVICE_ROLE_KEY`       | Supabase → Project Settings → **API** → "service_role" key                    | **Secret.** Never expose to the browser. Used server-side for reads + writes.                      |
| `ADMIN_PASSWORD`                  | You choose                                                                    | The single password used to sign in at `/admin/login`. Pick something long and random.            |
| `ADMIN_SESSION_SECRET`            | You generate                                                                  | Used to sign the admin session cookie. Must be ≥ 16 chars. Generate with `openssl rand -hex 32`.   |

For local development add the same five values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
ADMIN_PASSWORD=replace-with-a-long-passphrase
ADMIN_SESSION_SECRET=replace-with-openssl-rand-hex-32
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

## 4. What lives where

```
src/
  proxy.ts                                  # Protects /admin/* (Next 16 proxy)
  lib/
    admin-auth.ts                           # Password + signed cookie logic
    supabase.ts                             # Supabase clients (admin/anon)
  app/
    api/
      contact/route.ts                      # Public POST  → contact_submissions
      get-started/route.ts                  # Public POST  → get_started_submissions
      participant-registration/route.ts     # Public POST  → participant_registrations
      admin/
        login/route.ts                      # Sets the admin session cookie
        logout/route.ts                     # Clears the admin session cookie
        news/route.ts                       # GET list / POST create
        news/[id]/route.ts                  # GET / PATCH / DELETE
        submissions/[type]/[id]/route.ts    # DELETE a submission
    admin/
      login/                                # Login page (no sidebar)
      LogoutButton.tsx
      (authed)/                             # Everything below requires the cookie
        layout.tsx                          # Sidebar shell
        page.tsx                            # Dashboard with counts
        news/                               # List / new / edit
        submissions/[type]/                 # contact | get-started | participant-registration
    news/
      page.tsx                              # Reads published articles from Supabase
      [slug]/page.tsx                       # Public article page
```

---

## 5. Behavior of the public forms

The three forms (`/contact`, `/get-started`, `/participant-registration`) now
POST to their respective `/api/...` endpoints. On success the user sees the
existing confirmation screen. On failure they see an inline error and can
retry. Every successful submission is inserted into Supabase and is visible
in the admin dashboard within seconds.

---

## 6. Hardening checklist (when you're ready)

- Rotate `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` regularly.
- Add basic rate-limiting to `/api/contact`, `/api/get-started`,
  `/api/participant-registration`, and `/api/admin/login` (e.g. via
  [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)).
- Move to per-admin accounts (Supabase Auth or Clerk) when more than one
  person needs access — single shared passwords don't scale.
- For `participant_registrations`, evaluate Supabase column-level encryption
  (pgsodium) or move sensitive fields to a separate, more restricted store
  for compliance with state PII rules.
