# T049 — Promotion CLI + Public Case Dry-Run + Candidate Ranking

## Goal

Build the real promotion machinery for Atlas without creating public records without explicit approval.

## Acceptance Criteria

- [x] `scripts/rank-promotion-candidates.mjs` ranks packets by safety criteria
- [x] `data/reviews/real/ranked-promotion-candidates.json` exists with top 5
- [x] `data/reviews/real/approved-promotions.json` exists (empty approvals array)
- [x] `data/reviews/real/approved-promotions.example.json` shows format
- [x] `scripts/promote-approved-case.mjs` generates dry-run previews without approval
- [x] `scripts/promote-approved-case.mjs` refuses to promote without explicit approval
- [x] `scripts/promote-approved-case.mjs` promotes only one case per run
- [x] `scripts/validate-promotion-dry-run.mjs` confirms safety
- [x] Review console shows ranked candidates and approval status
- [x] No public INC-0013 created without explicit approval
- [x] Public dataset remains at 12 records without approval

## Safety Gates

1. **Empty approvals = Dry-run only**: No public records created
2. **One approval per run**: Script refuses multiple approvals
3. **Yellow/Red blocked**: Requires explicit override flag
4. **Copied text blocked**: Always refused
5. **Existing record blocked**: Cannot overwrite
6. **No site/ exposure**: Previews stay in data/, never site/

## File Changes

### Created
- `scripts/rank-promotion-candidates.mjs`
- `scripts/promote-approved-case.mjs`
- `scripts/validate-promotion-dry-run.mjs`
- `data/reviews/real/approved-promotions.json`
- `data/reviews/real/approved-promotions.example.json`
- `docs/review/PROMOTION_CLI_RUNBOOK.md`

### Updated
- `tools/review-console/index.html` (ranked candidates display)
- `NEXT_ACTIONS.md`
- `CHANGELOG.md`
- `ARCHITECTURE.md` (pipeline section)
