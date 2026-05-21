# T061 — Bounded Real Green-Source Manual Run + Private Candidate Signals

## Goal
Run the first controlled real Green-source manual monitoring pass and produce private, metadata-only candidate signal outputs that can feed the future review/publish pipeline — without Supabase writes, without cron, without Worker deployment, and without public site mutation.

## Scope

### A. Manual Green-Source Run Policy
- `data/watch/config/manual-green-run-policy.json`
- Safety boundaries for bounded manual runs

### B. Real Bounded Green-Source Runner
- `scripts/run-bounded-green-source-manual-run.mjs`
- Requires `--execute-green-fetch` flag for network
- Dry-run planning only by default

### C. Candidate Signal Builder
- `scripts/build-private-candidate-signals.mjs`
- Metadata-only signal detection from observations

### D. Hosted Payload Exporter Update
- Update `scripts/export-hosted-watch-run-payloads.mjs`
- Export T061 private run metadata as Supabase-ready dry-run payloads

### E. Manual Green Run Validator
- `scripts/validate-bounded-green-source-run.mjs`
- Comprehensive safety validation

### F. Existing Pipeline Integration
- Update `scripts/run-local-automation-cycle.mjs` with `--with-bounded-green-run` flag
- Update `scripts/export-ops-status.mjs` with `bounded_green_run_status`
- Update `scripts/validate-hosted-sync-safety.mjs` with T061 checks

### G. Work Item Documentation
- TASK.md (this file)
- VALIDATION.md
- IMPLEMENTATION_REPORT.md
- DECISIONS.md

### H. Lifecycle Documentation Updates
- CHANGELOG.md
- NEXT_ACTIONS.md
- ROADMAP_NEXT_PHASES.md
- REPO_INVENTORY.md
- docs/DECISION_LOG.md
- PROJECT_STATE.md

## Safety Boundaries

| Boundary | Value |
|---|---|
| Allowed tiers | green only |
| Blocked tiers | yellow, red |
| Blocked sources | aiid, oecd, aiaaic |
| Max sources per run | 7 |
| Timeout per source | 10000 ms |
| Max response bytes | 524288 (512KB) |
| Store full HTML | false |
| Store raw body | false |
| Store long quotes | false |
| Store hashes | true |
| Store HTTP metadata | true |
| Remote write | false |
| Cron triggered | false |
| Public site mutated | false |
| Public publish count | 0 |

## Execution

1. Validate existing files pass
2. Create branch `task/T061-bounded-green-source-manual-run`
3. Implement all components
4. Run all validators
5. Merge to main and push

## Blockers

- No Supabase remote migration
- No Supabase remote writes
- No Cloudflare Worker deployment
- No cron enablement
- No DNS/CNAME/Pages config change
- No INC-0014 publication
- No secrets committed
