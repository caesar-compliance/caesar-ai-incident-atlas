# T054 — Implementation Report

**Date:** 21 May 2026  
**Branch:** feat/T054-publish-approved-pkt0006-inc0013  
**Starting commit:** 1205ac8

## Steps Completed

1. Created `data/reviews/real/approved-promotions.json` approval entry (PKT-0006 → INC-0013)
2. Patched `scripts/promote-approved-case.mjs`:
   - Use `allowed_public_filename` for written filename
   - Set `record_type` from `draft.case_type`
   - Fix site index path (strip `../`)
   - Strip `_`-prefixed internal fields from public record
   - Accept `_dry_run_preview`/`_public` field variants for preview validation
3. Added taxonomy entries: `FM-GOVERNANCE-GAP`, `FM-COMPLIANCE-DEFICIT`, `CTL-GUIDANCE-TRACKING`, `CTL-COMPLIANCE-UPDATE-PROCESS`, `cross-sector AI governance` sector
4. Added optional `record_type` field to `schemas/incident.schema.json`
5. Ran `node scripts/promote-approved-case.mjs` → created INC-0013 in `data/incidents/` and `site/data/incidents/`
6. Synced taxonomy files to `site/data/taxonomy/`
7. Updated site display (`app.js`, `styles.css`, `index.html`) for guidance badge and dynamic record count
8. Updated 5 validators: `validate_dataset.py`, `validate-promotion-dry-run.mjs`, `validate-promotion-packets.mjs`, `validate-real-watcher.mjs`, `validate-candidate-quality.mjs`, `validate-review-console.mjs`, `validate-case-shortlist.mjs`
9. All 11 validators + RSS + diff check: PASS

## Public Record

- **ID:** INC-0013
- **Title:** Automated decision & profiling (3) — European Data Protection Board (EDPB)
- **Type:** guidance
- **File:** `INC-0013-edpb-automated-decision-making-profiling-guidance.json`
- **Source:** EDPB Green-tier, verified
- **Approved by:** Control Tower, 21 May 2026
