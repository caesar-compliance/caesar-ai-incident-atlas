-- Caesar AI Incident Atlas — Supabase schema starter (T056)
-- Safe SQL only. No secrets. No connection strings. Not applied in this task.
-- All tables use uuid PKs and created_at timestamps.

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── atlas_sources ─────────────────────────────────────────────────────────
-- Registry of monitored sources (mirrors data/watch/config/source-registry.json)
create table if not exists atlas_sources (
  id            uuid primary key default gen_random_uuid(),
  source_id     text not null unique,
  label         text not null,
  url           text not null,
  adapter_name  text not null,
  risk_tier     text not null default 'green' check (risk_tier in ('green', 'yellow', 'red')),
  enabled       boolean not null default true,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── atlas_watch_runs ──────────────────────────────────────────────────────
-- One row per automated watcher run
create table if not exists atlas_watch_runs (
  id                     uuid primary key default gen_random_uuid(),
  run_timestamp          timestamptz not null,
  mode                   text not null default 'local' check (mode in ('local', 'scheduled', 'manual')),
  sources_ok             int not null default 0,
  sources_failed         int not null default 0,
  sources_skipped        int not null default 0,
  detected_candidates    int not null default 0,
  promotion_eligible     int not null default 0,
  errors_count           int not null default 0,
  run_log_ref            text,
  created_at             timestamptz not null default now()
);

-- ── atlas_candidates ──────────────────────────────────────────────────────
-- Detected candidate items from watcher runs (pre-review)
create table if not exists atlas_candidates (
  id              uuid primary key default gen_random_uuid(),
  watch_run_id    uuid references atlas_watch_runs(id) on delete set null,
  source_id       text not null,
  candidate_hash  text not null,
  title           text,
  url             text,
  detected_at     timestamptz not null,
  quality_tier    text check (quality_tier in ('case_quality', 'monitor', 'noise', 'pending')),
  quality_score   numeric(4,2),
  status          text not null default 'new' check (status in ('new', 'reviewed', 'promoted', 'rejected', 'duplicate')),
  notes           text,
  created_at      timestamptz not null default now(),
  unique (source_id, candidate_hash)
);

-- ── atlas_drafts ──────────────────────────────────────────────────────────
-- Real case drafts built from case_quality candidates
create table if not exists atlas_drafts (
  id              uuid primary key default gen_random_uuid(),
  candidate_id    uuid references atlas_candidates(id) on delete set null,
  draft_id        text not null unique,
  title           text not null,
  sector          text[],
  severity        text check (severity in ('critical', 'high', 'medium', 'low')),
  confidence      text check (confidence in ('high', 'medium', 'low')),
  failure_modes   text[],
  summary         text,
  status          text not null default 'draft' check (status in ('draft', 'review', 'approved', 'rejected', 'promoted')),
  quality_score   numeric(4,2),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── atlas_promotion_packets ───────────────────────────────────────────────
-- Promotion packets linking drafts to public records
create table if not exists atlas_promotion_packets (
  id              uuid primary key default gen_random_uuid(),
  packet_id       text not null unique,
  draft_id        text references atlas_drafts(draft_id) on delete set null,
  target_inc_id   text,
  status          text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'published')),
  readiness_score numeric(4,2),
  reviewer_notes  text,
  approved_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── atlas_public_records ──────────────────────────────────────────────────
-- Mirror of published incident records for operational DB queries
create table if not exists atlas_public_records (
  id              uuid primary key default gen_random_uuid(),
  incident_id     text not null unique,
  packet_id       text references atlas_promotion_packets(packet_id) on delete set null,
  title           text not null,
  date            text,
  sector          text[],
  severity        text,
  confidence      text,
  failure_modes   text[],
  record_type     text not null default 'incident',
  published_at    timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

-- ── atlas_digest_runs ─────────────────────────────────────────────────────
-- Digest generation runs (weekly/monthly)
create table if not exists atlas_digest_runs (
  id              uuid primary key default gen_random_uuid(),
  digest_type     text not null check (digest_type in ('weekly', 'monthly')),
  period_label    text not null,
  record_count    int not null default 0,
  status          text not null default 'draft' check (status in ('draft', 'published', 'failed')),
  output_path     text,
  created_at      timestamptz not null default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────
create index if not exists idx_candidates_source      on atlas_candidates(source_id);
create index if not exists idx_candidates_status      on atlas_candidates(status);
create index if not exists idx_candidates_quality     on atlas_candidates(quality_tier);
create index if not exists idx_watch_runs_timestamp   on atlas_watch_runs(run_timestamp desc);
create index if not exists idx_public_records_inc_id  on atlas_public_records(incident_id);
create index if not exists idx_drafts_status          on atlas_drafts(status);
create index if not exists idx_packets_status         on atlas_promotion_packets(status);
