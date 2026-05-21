# T048 — Real Candidate-to-Draft Pipeline

**Status:** COMPLETE  
**Branch:** `feat/T048-real-candidate-draft-promotion-pack`  
**Completed:** 2026-05-21

## Summary

Implements the full local-only pipeline from Green-source candidates → case drafts → promotion packets, with watcher hardening and upgraded review console.

## Pipeline Commands

```bash
# 1. Run watcher (network required, operator only)
node scripts/watch-green-sources.mjs

# 2. Deduplicate candidates
node scripts/dedupe-real-candidates.mjs

# 3. Build real case drafts from unique candidates
node scripts/build-real-case-drafts.mjs

# 4. Build promotion packets from drafts
node scripts/build-promotion-packets.mjs

# 5. Build real review bundle
node scripts/build-real-review-bundle.mjs

# 6. Validate everything
node scripts/validate-real-watcher.mjs
node scripts/validate-real-drafts.mjs
node scripts/validate-promotion-packets.mjs
node scripts/validate-review-console.mjs
```

## Data Paths

| Stage | Path |
|---|---|
| Real candidates | `data/watch/real-candidates/YYYY-MM-DD/*.json` |
| Dedupe report | `data/watch/runs/latest-real-dedupe-report.json` |
| Watch summary | `data/watch/runs/latest-watch-summary.json` |
| Real drafts | `data/drafts/real/DRAFT-NNNN.json` |
| Promotion packets | `data/promotion-packets/real/PKT-NNNN.json` |
| Review bundle | `tools/review-console/real-review-bundle.json` |

## Safety Constraints

- `local_only: true` on all drafts
- `public: false` on all drafts
- `promotion_allowed: false` on all packets
- `not_legal_advice: true` on all drafts
- `source_text_copied: false` on all drafts
- No drafts, packets, or candidates written to `site/`
- No INC-0013 or new public incident records created
- No scheduled GitHub workflows enabled
- GitHub Pages target remains `site/` only
