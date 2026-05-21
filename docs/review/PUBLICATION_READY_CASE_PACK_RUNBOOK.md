# Publication Ready Case Pack Runbook

## Purpose
Build publication-ready case pack for PKT-0006 (EDPB Automated Decision & Profiling).

## Command
```bash
node scripts/build-promotion-readiness-report.mjs PKT-0006
```

## Output Files
- `data/source-verifications/real/PKT-0006-source-verification.json`
- `data/publication-previews/real/inc-0013-preview.json`
- `data/control-maps/real/PKT-0006-control-map.json`
- `data/reviews/real/PKT-0006-readiness-report.json`

## Approval Warning
**Control Tower approval required** before any public incident creation.
Add approval to `data/reviews/real/approved-promotions.json` to proceed.

## Safety Status
- No public incident created (INC-0013 not published)
- All artifacts marked as dry-run/local only
- Source verification: metadata only
- Clean-room wording confirmed
