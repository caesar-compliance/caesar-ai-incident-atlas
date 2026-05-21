# Supabase — Caesar AI Incident Atlas

Operational database schema for the Atlas monitoring pipeline.  
**No credentials stored here. Not applied in this task.**

## Tables

| Table | Purpose |
|---|---|
| `atlas_sources` | Registry of monitored sources |
| `atlas_watch_runs` | One row per automated watcher execution |
| `atlas_candidates` | Detected candidates from watcher runs |
| `atlas_drafts` | Case drafts from case-quality candidates |
| `atlas_promotion_packets` | Promotion packets linking drafts → public records |
| `atlas_public_records` | Operational mirror of published incident records |
| `atlas_digest_runs` | Weekly / monthly digest generation runs |

## How to apply

1. Create a Supabase project at supabase.com.
2. Open the SQL editor.
3. Paste and run `schema.sql`.
4. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` as environment secrets (never in repo).

## Integration gate

This schema is ready but **not connected**.  
Integration is gated on secrets being configured — see `docs/automation/REAL_AUTOMATED_MONITORING_ARCHITECTURE.md`.
