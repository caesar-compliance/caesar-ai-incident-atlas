# Live Adapter Collection Runbook (T052)

## One Command
```bash
node scripts/run-real-pipeline.mjs
```

## Outputs
- `data/watch/runs/latest-watch-summary.json` - Source health summary
- `data/watch/runs/latest-adapter-summary.json` - Adapter performance
- `data/watch/runs/latest-candidate-quality-report.json` - Quality classification
- `data/reviews/real/ranked-promotion-candidates.json` - Ranked candidates
- `data/reviews/real/case-shortlist.json` - Top 5 for Control Tower review
- `tools/review-console/real-review-bundle.json` - Review console data

## Safety Notes
- All outputs stay in `data/` (outside `site/`)
- No public incidents created
- Dry-run only for promotion
- Control Tower approval required for any public promotion

## Adapter Fixes
If source fails:
1. Check `data/watch/runs/latest-watch-summary.json`
2. Update URL in `data/watch/config/green-source-watch-targets.json`
3. Re-run pipeline
