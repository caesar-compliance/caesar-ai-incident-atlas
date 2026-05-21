# T049 Implementation Report

## Summary

Promotion CLI and public case dry-run system implemented. All safety gates operational.

## Files Created

| File | Purpose | Lines |
|------|---------|-------|
| `scripts/rank-promotion-candidates.mjs` | Score and rank promotion packets | ~220 |
| `scripts/promote-approved-case.mjs` | Promote approved case or generate dry-run previews | ~422 |
| `scripts/validate-promotion-dry-run.mjs` | Validate promotion safety | ~170 |
| `data/reviews/real/approved-promotions.json` | Control Tower approval registry | 7 |
| `data/reviews/real/approved-promotions.example.json` | Approval format example | 47 |
| `docs/review/PROMOTION_CLI_RUNBOOK.md` | Quick reference guide | 97 |

## Safety Features Implemented

1. **Dual-mode operation**:
   - Without approval: generates dry-run previews only
   - With approval: promotes exactly one case

2. **Hard gates**:
   - Empty approvals array = dry-run only
   - Multiple approvals rejected
   - Yellow/Red sources blocked
   - source_text_copied: true = always blocked
   - Existing public record = blocked

3. **Audit trail**:
   - All actions logged
   - Promotion metadata embedded in public records
   - Rankings and scores preserved

## Ranking Criteria

| Factor | Weight |
|--------|--------|
| Green source tier | +50 |
| Source URL verified | +15 |
| No source text copied | +15 |
| Legal domain classified | +10 |
| Commercial domain classified | +10 |
| Governance lesson documented | +10 |
| Low defamation risk | +10 |
| Missing controls documented | +5 |
| Evidence requirements clear | +5 |
| Reviews completed | +5 each |
| Yellow/Red source | -100/-200 (blocked) |

## Pipeline Flow

```
data/drafts/real/ -> scripts/build-promotion-packets.mjs
                         |
                         v
data/promotion-packets/real/
                         |
                         v
scripts/rank-promotion-candidates.mjs
                         |
                         v
data/reviews/real/ranked-promotion-candidates.json
                         |
                         v
scripts/promote-approved-case.mjs
    |                              |
(no approval)                  (approval exists)
    |                              |
    v                              v
data/promotion-previews/real/  data/incidents/INC-0013.json
    (dry_run: true)              site/data/incidents/
                                 (public: true)
```

## Test Results

| Test | Result |
|------|--------|
| Rank candidates | ✅ 6 packets ranked |
| Dry-run generation | ✅ 5 previews created |
| No public without approval | ✅ Confirmed |
| Validator passes | ✅ 0 failures |
