# T052 Validation

## Automated Checks
```bash
node scripts/run-real-pipeline.mjs
node scripts/validate-case-shortlist.mjs
git diff --check
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py
```

## Safety Checklist
- [x] No public incident created
- [x] Public count remains 12
- [x] No INC-0013 exists
- [x] No site/admin exists
- [x] No candidates/drafts/packets/previews/shortlist under site/
- [x] No scheduled workflows
- [x] No Yellow sources fetched
- [x] AIID/OECD/AIAAIC not fetched
- [x] No copied text
- [x] No full HTML/body stored
- [x] Public root remains site/

## Adapter Improvements Verified
- [x] FTC URL updated (404 fixed)
- [x] CNIL pagination filters added
- [x] EDPB language variants filtered
- [x] EU Commission generic page filters added
- [x] Shared module pagination filters added

## Shortlist Validation
- [x] 5 items in shortlist
- [x] All required fields present
- [x] Recommended actions valid
- [x] Local only (not in site/)
