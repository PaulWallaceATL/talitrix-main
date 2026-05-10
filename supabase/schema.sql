-- ============================================================================
-- Talitrix Admin Schema
-- Run this entire file in the Supabase SQL Editor for the project that the
-- Vercel deployment will talk to (Project Settings → API → "URL" and "service_role").
--
-- Why these choices:
--   * The Talitrix Next.js app talks to Supabase ONLY through the server using
--     the SERVICE ROLE key. RLS is therefore not what protects this data —
--     access control happens in the Next.js app via the admin password +
--     signed session cookie + middleware on /admin/*.
--   * RLS is still ENABLED on every table so that if anyone is ever given the
--     anon key (e.g. you build a public dashboard later), nothing leaks by
--     default. No policies are added — the service role bypasses RLS.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------- updated_at trigger helper ---------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- News articles ---------------------------------------------------
create table if not exists public.news_articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  category      text not null,
  excerpt       text not null,
  content       text not null,
  featured      boolean not null default false,
  published     boolean not null default true,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- SEO fields (added in v2 — safe to re-run on existing tables)
alter table public.news_articles
  add column if not exists meta_title       text,
  add column if not exists meta_description text,
  add column if not exists keywords         text[],
  add column if not exists og_image_url     text,
  add column if not exists author_name      text;

create index if not exists news_articles_published_idx
  on public.news_articles (published, published_at desc);

create index if not exists news_articles_featured_idx
  on public.news_articles (featured) where featured = true;

drop trigger if exists trg_news_articles_updated_at on public.news_articles;
create trigger trg_news_articles_updated_at
before update on public.news_articles
for each row execute function public.set_updated_at();

alter table public.news_articles enable row level security;

-- ---------- Contact form submissions ---------------------------------------
create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text,
  organization  text,
  inquiry_type  text not null,
  message       text not null,
  created_at    timestamptz not null default now()
);

create index if not exists contact_submissions_created_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- ---------- "Get Started" briefing requests --------------------------------
create table if not exists public.get_started_submissions (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  title        text not null,
  email        text not null,
  agency       text not null,
  agency_type  text not null,
  phone        text,
  caseload     text,
  interest     text not null,
  timeline     text not null,
  message      text,
  created_at   timestamptz not null default now()
);

create index if not exists get_started_submissions_created_idx
  on public.get_started_submissions (created_at desc);

alter table public.get_started_submissions enable row level security;

-- ---------- Participant registrations --------------------------------------
-- Sensitive fields (ssn_last4, dob, id_number) live here. Access is restricted
-- to the admin dashboard only. Consider Supabase column-level encryption /
-- pgsodium if you need at-rest encryption for compliance.
create table if not exists public.participant_registrations (
  id              uuid primary key default gen_random_uuid(),
  first_name      text not null,
  last_name       text not null,
  dob             text not null,
  ssn_last4       text not null,
  participant_id  text not null,
  serial_number   text,
  email           text not null,
  phone           text not null,
  id_type         text not null,
  id_number       text not null,
  address         text not null,
  agency          text not null,
  supervisor      text,
  agreed          boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists participant_registrations_created_idx
  on public.participant_registrations (created_at desc);

create index if not exists participant_registrations_participant_idx
  on public.participant_registrations (participant_id);

alter table public.participant_registrations enable row level security;
