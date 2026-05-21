# T049 — Final Implementation Report

## Task Summary

**T049: Promotion CLI + Public Case Dry-Run + Candidate Ranking**

Built the real promotion machinery for Atlas with hard safety gates preventing unauthorized public record creation.

---

## Execution Summary

| Metric | Value |
|--------|-------|
| Starting commit | `bd6068a` |
| Branch | `feat/T049-promotion-cli-public-case-dry-run` |
| Final branch commit | `e754335` |
| Final main commit | `e754335` |
| Files created | 17 |
| Files modified | 5 |

---

## Files Created

| File | Purpose |
|------|---------|
| `scripts/rank-promotion-candidates.mjs` | Score and rank promotion packets by safety criteria |
| `scripts/promote-approved-case.mjs` | Dual-mode CLI: dry-run previews OR promote approved case |
| `scripts/validate-promotion-dry-run.mjs` | Safety validation for promotion system |
| `data/reviews/real/approved-promotions.json` | Control Tower approval registry (empty = dry-run only) |
| `data/reviews/real/approved-promotions.example.json` | Approval format documentation |
| `data/reviews/real/ranked-promotion-candidates.json` | Ranked candidate list with scores |
| `data/promotion-previews/real/preview-pkt-0001-inc-0013.json` | Dry-run preview for top candidate |
| `data/promotion-previews/real/preview-pkt-0002-inc-0013.json` | Dry-run preview for rank 2 |
| `data/promotion-previews/real/preview-pkt-0003-inc-0013.json` | Dry-run preview for rank 3 |
| `data/promotion-previews/real/preview-pkt-0004-inc-0013.json` | Dry-run preview for rank 4 |
| `data/promotion-previews/real/preview-pkt-0005-inc-0013.json` | Dry-run preview for rank 5 |
| `docs/review/PROMOTION_CLI_RUNBOOK.md` | Quick reference for promotion workflow |
| `work-items/T049-promotion-cli-public-case-dry-run/TASK.md` | Task definition |
| `work-items/T049-promotion-cli-public-case-dry-run/VALIDATION.md` | Validation checklist |
| `work-items/T049-promotion-cli-public-case-dry-run/IMPLEMENTATION_REPORT.md` | Implementation details |
| `work-items/T049-promotion-cli-public-case-dry-run/DECISIONS.md` | Technical decisions |
| `work-items/T049-promotion-cli-public-case-dry-run/FINAL_REPORT.md` | This file |

## Files Modified

| File | Change |
|------|--------|
| `NEXT_ACTIONS.md` | Updated to T049 complete |
| `CHANGELOG.md` | Added v0.11.0 with T049 details |
| `REPO_INVENTORY.md` | Added T048/T049 entries |
| `tools/review-console/index.html` | Added ranked candidates panel |
| `tools/review-console/assets/review-console.js` | Added loadRankedCandidates() function |

---

## Ranked Promotion Candidates (Top 5)

| Rank | Packet | Draft | Score | Status |
|------|--------|-------|-------|--------|
| 1 | PKT-0001 | DRAFT-0001 | 130 | ✓ Ready |
| 2 | PKT-0002 | DRAFT-0002 | 130 | ✓ Ready |
| 3 | PKT-0003 | DRAFT-0003 | 130 | ✓ Ready |
| 4 | PKT-0004 | DRAFT-0004 | 130 | ✓ Ready |
| 5 | PKT-0005 | DRAFT-0005 | 130 | ✓ Ready |
| 6 | PKT-0006 | DRAFT-0006 | 130 | ✓ Ready |

**Top Recommendation:** PKT-0001 (DRAFT-0001) - "Make a complaint — Information Commissioner's Office (UK)"

**Score breakdown:**
- Green source tier (+50)
- Source URL verified (+15)
- Legal domain classified (+10)
- Commercial domain classified (+10)
- Governance lesson documented (+10)
- Low defamation risk (+10)
- Missing controls documented (+5)
- Evidence requirements clear (+5)
- Clean-room confirmed: no source text copied (+15)

**Total: 130 points**

---

## Safety Confirmations

| Check | Result |
|-------|--------|
| No approval file present | ✅ Confirmed (empty approvals array) |
| Public incident count | ✅ 12 records (unchanged) |
| INC-0013 exists | ❌ Not created |
| Dry-run previews generated | ✅ 5 previews in data/promotion-previews/real/ |
| Previews outside site/ | ✅ Confirmed |
| No site/ leakage | ✅ Confirmed |
| No mock data promoted | ✅ Confirmed |
| No Yellow/Red sources promoted | ✅ Confirmed |
| All dry-run flags present | ✅ Confirmed (_dry_run_preview, _not_approved, _public: false) |

---

## Dry-Run Preview Paths

| Preview File | Packet | Draft |
|--------------|--------|-------|
| `data/promotion-previews/real/preview-pkt-0001-inc-0013.json` | PKT-0001 | DRAFT-0001 |
| `data/promotion-previews/real/preview-pkt-0002-inc-0013.json` | PKT-0002 | DRAFT-0002 |
| `data/promotion-previews/real/preview-pkt-0003-inc-0013.json` | PKT-0003 | DRAFT-0003 |
| `data/promotion-previews/real/preview-pkt-0004-inc-0013.json` | PKT-0004 | DRAFT-0004 |
| `data/promotion-previews/real/preview-pkt-0005-inc-0013.json` | PKT-0005 | DRAFT-0005 |

---

## Validation Results

| Validator | Result |
|-----------|--------|
| `git diff --check` | ✅ Pass |
| `python3 tools/validate_dataset.py` | ✅ Pass (12 records) |
| `node scripts/validate-digests.mjs` | ✅ Pass |
| `node scripts/build-rss-feeds.mjs` | ✅ Pass |
| `node scripts/validate-mock-pipeline.mjs` | ✅ Pass |
| `node scripts/validate-real-watcher.mjs` | ✅ Pass |
| `node scripts/validate-real-drafts.mjs` | ✅ Pass |
| `node scripts/validate-promotion-packets.mjs` | ✅ Pass |
| `node scripts/rank-promotion-candidates.mjs` | ✅ Pass (6 ranked) |
| `node scripts/promote-approved-case.mjs` | ✅ Pass (dry-run mode) |
| `node scripts/validate-promotion-dry-run.mjs` | ✅ Pass (0 failures) |
| `node scripts/build-real-review-bundle.mjs` | ✅ Pass |
| `node scripts/validate-review-console.mjs` | ✅ Pass |

---

## Hard Safety Gates Implemented

| Gate | Behavior |
|------|----------|
| Empty approvals array | Dry-run only, no public records |
| Multiple approvals | Script refuses (one per run) |
| Yellow/Red source | Blocked unless explicit override flag |
| source_text_copied: true | Hard block (no override) |
| Existing public record | Blocked |
| No approval scope | Blocked |

---

## Risks Identified

**None.** All candidates are Green tier with no risk flags. All safety validations pass.

---

## Recommended Next Task

**T050 — Curator Review: First Promotion Candidate Evaluation**

Operator/curator should:
1. Open `tools/review-console/index.html` (select Real Pipeline Bundle)
2. Review top candidate (PKT-0001 / DRAFT-0001) in ranked candidates panel
3. Complete curator risk review checklist
4. If approved, add entry to `data/reviews/real/approved-promotions.json`
5. Run `node scripts/promote-approved-case.mjs` to create first public case

---

## Summary

T049 successfully implements the promotion machinery for Atlas with comprehensive safety gates. The system:

- **Ranks** 6 real promotion candidates by safety score
- **Generates** 5 dry-run previews without creating public records
- **Requires** explicit Control Tower approval before any promotion
- **Validates** all safety constraints before allowing public record creation
- **Maintains** public dataset at exactly 12 records

**No public case was created.** Approval file is empty, triggering dry-run mode only.

**First recommended promotion:** PKT-0001 / DRAFT-0001 (ICO Make a complaint) score 130.
