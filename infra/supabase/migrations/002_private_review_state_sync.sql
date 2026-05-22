-- Caesar AI Incident Atlas — Supabase local migration draft (T071)
-- Table: atlas_private_review_state_snapshots
--
-- INTENDED USE ONLY. NOT APPLIED REMOTELY BY T071. NOT PUBLIC EXPORT.
-- NO RAW HTML OR RAW THIRD-PARTY BODY STORAGE. PUBLICATION REMAINS BLOCKED.

-- Additive only. No destructive statements.
create table if not exists atlas_private_review_state_snapshots (
  id                   uuid primary key default gen_random_uuid(),
  source_run_id        text not null,
  chain_ids            jsonb not null,
  sync_status          text not null check (sync_status in ('hosted_private_sync_readiness_prepared', 'hosted_private_sync_blocked_pending_remote_activation')),
  blocker_status       text not null,
  publication_blocked  boolean not null default true,
  public_flags         jsonb not null,
  review_state         jsonb not null,
  hosted_payload_hash  text not null,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- Comments to enforce architecture and safety intent
comment on table atlas_private_review_state_snapshots is 'Private/metadata-only snapshots for hosted review-state sync boundary. Raw content/HTML storage is strictly forbidden.';
comment on column atlas_private_review_state_snapshots.publication_blocked is 'Safety flag ensuring publication remains blocked unless manually overridden.';
comment on column atlas_private_review_state_snapshots.public_flags is 'Strictly false flags to prevent accidental public data exposure or promotion.';

-- Safe index to speed up lookups by run/timestamp
create index if not exists idx_private_snapshots_run on atlas_private_review_state_snapshots(source_run_id);
