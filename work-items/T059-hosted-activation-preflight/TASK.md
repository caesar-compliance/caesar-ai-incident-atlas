# T059 — Hosted Activation Preflight + Local Supabase Migration Smoke + Operator Go-Live Checklist

**Status:** Implementation Ready  
**Target Repository:** caesar-ai-incident-atlas  
**Previous Task:** T058 — Worker Supabase API Integration (Complete)

---

## Goal

Prepare Caesar AI Incident Atlas for controlled real hosted activation by adding:
1. Bounded local Supabase migration smoke checks
2. Hosted activation preflight tooling
3. Operator-ready go-live scripts/checklists

**Constraints:**
- No live Supabase project touched
- No Cloudflare Worker deployed
- No cron enabled
- No remote migration applied
- Public count remains 13
- Latest remains INC-0013
- No INC-0014

---

## Deliverables

### A. Scripts (Create)
- `scripts/smoke-supabase-local-migration.mjs` — Local schema validation only
- `scripts/preflight-hosted-activation.mjs` — Readiness checker (not deployer)
- `scripts/print-hosted-activation-commands.mjs` — Safe command checklist for operator

### B. Generated Artifacts
- `data/ops/supabase/local-migration-smoke.json` — Smoke test output
- `data/ops/supabase/hosted-activation-preflight.json` — Preflight results
- `data/ops/supabase/hosted-activation-manifest.json` — Activation manifest

### C. Updated Scripts
- `scripts/validate-hosted-sync-safety.mjs` — Add checks for new T059 artifacts
- `scripts/export-ops-status.mjs` — Add `hosted_activation_status` field

### D. Documentation (Create)
- `work-items/T059-hosted-activation-preflight/TASK.md` — This file
- `work-items/T059-hosted-activation-preflight/VALIDATION.md` — Validation checklist
- `work-items/T059-hosted-activation-preflight/IMPLEMENTATION_REPORT.md` — Final report
- `work-items/T059-hosted-activation-preflight/DECISIONS.md` — Task decisions

### E. Lifecycle Docs (Update)
- `CHANGELOG.md` — Add v0.18.0 entry
- `NEXT_ACTIONS.md` — Update current status
- `ROADMAP_NEXT_PHASES.md` — Note T059 complete
- `REPO_INVENTORY.md` — Add new files
- `docs/DECISION_LOG.md` — Add DEC-132 through DEC-136
- `PROJECT_STATE.md` — Update to T059

---

## Safety Boundaries

| Boundary | Rule |
|----------|------|
| Remote Supabase | No connection unless explicit probe script used |
| Remote migration | `supabase db push` never runs automatically |
| Worker deploy | `wrangler deploy` never runs automatically |
| Cron | Remains disabled/commented |
| Secrets | Never committed, never printed |
| Public count | Must remain 13 |
| Latest record | Must remain INC-0013 |
| INC-0014 | Must not exist |

---

## Validation Gates

All scripts must pass before merge:
- [ ] `node scripts/smoke-supabase-local-migration.mjs` — PASS or graceful SKIP
- [ ] `node scripts/preflight-hosted-activation.mjs` — Completes without error
- [ ] `node scripts/print-hosted-activation-commands.mjs` — Outputs checklist
- [ ] `node scripts/validate-hosted-sync-safety.mjs` — All 20+ checks PASS
- [ ] All existing validators continue to pass
