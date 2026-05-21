# T049 Validation Report

## Validation Commands

```bash
# Git
git diff --check

# Schema validation
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py

# Pipeline validation
node scripts/validate-digests.mjs
node scripts/build-rss-feeds.mjs
node scripts/validate-mock-pipeline.mjs
node scripts/validate-real-watcher.mjs
node scripts/validate-real-drafts.mjs
node scripts/validate-promotion-packets.mjs

# T049 specific validation
node scripts/rank-promotion-candidates.mjs
node scripts/promote-approved-case.mjs
node scripts/validate-promotion-dry-run.mjs
node scripts/build-real-review-bundle.mjs
node scripts/validate-review-console.mjs
```

## Expected Results

| Command | Expected Result |
|---------|-----------------|
| `rank-promotion-candidates.mjs` | Creates `ranked-promotion-candidates.json` with 6 ranked packets |
| `promote-approved-case.mjs` (no approval) | Generates 5 dry-run previews, no public records |
| `validate-promotion-dry-run.mjs` | Passes with 0 failures, confirms 12 public records |

## Safety Checklist

- [ ] Public incident count = 12
- [ ] INC-0013 does not exist in `data/incidents/` or `site/data/incidents/`
- [ ] Previews only in `data/promotion-previews/real/`
- [ ] No previews in `site/`
- [ ] `approved-promotions.json` has empty approvals array
- [ ] No mock data in public incidents
- [ ] No Yellow/Red sources promoted
- [ ] All dry-run previews have `_dry_run_preview: true`

## Failure Response

If any validation fails:

1. Check `data/reviews/real/approved-promotions.json` is empty
2. Delete any created public records
3. Run `validate-promotion-dry-run.mjs` to confirm safety
4. Review error logs

## Sign-Off

| Check | Status | Date |
|-------|--------|------|
| Git clean | ☐ | |
| All validators pass | ☐ | |
| Public count = 12 | ☐ | |
| No INC-0013 | ☐ | |
| Dry-run previews exist | ☐ | |
| No site leakage | ☐ | |
