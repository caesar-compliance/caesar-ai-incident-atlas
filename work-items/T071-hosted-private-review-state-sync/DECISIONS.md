# Architectural Decisions — T071 Hosted Private Review-State Sync Readiness

1. **Metadata-Only Schema Sync**: To prevent any accidental leaking of incident narrative or raw source HTML, the Supabase sync payload is strictly limited to hash fingerprints, parent chain IDs, and blocker status counts.
2. **Local Worker Mock Contract Route handlers**: Cloudflare Worker mock route endpoints for private review-state queries are added to the routing tree but return mock dry-run structures only, unless explicit keys are injected.
3. **Draft SQL Separation**: The Supabase migrations are kept locally in `infra/supabase/migrations/` as additive DDL and are not automatically applied to the active database.
4. **No Remote writes by default**: All sync dossier generation sets `remote_write_attempted: false` and `dry_run: export_only` to guarantee no accidental database connection attempts in the local pipelines.
5. **No Site assets leak**: Review console JSON data for the sync readiness is saved strictly under `tools/review-console/data/`, which is outside `site/` and excluded from public deployments.
6. **Unified Workflow Orchestrator**: The workflow for building, exporting, validating, and testing safety parameters is coordinated by `run-hosted-private-review-state-sync-workflow.mjs` to guarantee single-command auditability.
