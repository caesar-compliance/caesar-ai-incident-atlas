# Real Pipeline One-Command Runbook

## Run

```
node scripts/run-real-pipeline.mjs
```

## Outputs

| Path | Description |
|---|---|
| `data/watch/real-candidates/YYYY-MM-DD/` | Detected candidate JSON files |
| `data/watch/runs/latest-watch-summary.json` | Last watcher run summary |
| `data/watch/runs/latest-adapter-summary.json` | Adapter run report (T051) |
| `data/watch/runs/latest-candidate-quality-report.json` | Quality classification report |
| `data/reviews/real/ranked-promotion-candidates.json` | Ranked promotion candidates |
| `data/watch/runs/latest-real-pipeline.log` | Full pipeline log |
| `tools/review-console/real-review-bundle.json` | Review console data bundle |

## Safety

- No public incidents are created (promote runs in `--dry-run` mode only).
- All candidates remain in `data/watch/` — never written to `site/`.
- Control Tower approval required before any promotion.
- No Yellow/Red sources fetched.
- No third-party text copied or full HTML stored.
