# T060 Decisions

**DEC-137** — Schema `$id` set to `caesar-atlas/pipeline/manual-watch-run/v1`. `public_publish_count` constrained to max 0. `remote_write_attempted`, `cron_triggered`, `public_site_mutated` all `const: false`.

**DEC-138** — Queue builder reads existing `green-source-watch-targets.json` and `target-keywords.json` without fetching the network. All 7 sources are green-tier and enabled by default. AIID/OECD/AIAAIC pattern-blocked at source_id level.

**DEC-139** — Envelope builder generates `run_id` as `WATCH-RUN-YYYYMMDD-HHMMSS` from local timestamp. Performs inline structural self-validation without requiring `jsonschema` runtime dependency.

**DEC-140** — Hosted payload exporter writes to `data/ops/supabase/` only (never to `site/`). Maps to `atlas_watch_runs` and `atlas_sources` tables for future Supabase upsert. Mode always `dry_run_export`.

**DEC-141** — `run-local-automation-cycle.mjs` extended with opt-in `--with-watch-queue` flag. Default behavior (no flag) unchanged. No network fetch implied by flag — queue is deterministic.

**DEC-142** — `validate-hosted-sync-safety.mjs` extended with 7 T060-specific checks (25–31) confirming watch-run isolation from site/, payload sanitization, count invariant, and no cron/write markers.
