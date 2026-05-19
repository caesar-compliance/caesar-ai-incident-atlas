# T026 Validation Checklist

**Date:** 20 May 2026

## Automated Validation

- [x] `python3 tools/validate_dataset.py` — exits 0; PASS; 10 records
- [x] `grep -R "../data/" site/assets/app.js site/index.html site/README.md` — clean (no relative path leaks)
- [x] `find site -maxdepth 4 ( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" )` — empty
- [x] `grep -R "upload-pages-artifact" .github/workflows/pages.yml` — confirmed
- [x] `grep -R "path: site" .github/workflows/pages.yml` — confirmed
- [x] `git diff --check` — clean

## Data Integrity

- [x] Root data count: 10 records (INC-0001 through INC-0010)
- [x] No INC-0011 or higher created
- [x] INC-0005 root ↔ site/data synced
- [x] INC-0008 root ↔ site/data synced
- [x] INC-0009 root ↔ site/data synced
- [x] INC-0006 unchanged — no sync required

## Schema Compliance

- [x] INC-0005 additional source uses valid source_type: `court_record`
- [x] INC-0008 additional source uses valid source_type: `regulator_report`
- [x] INC-0009 additional source uses valid source_type: `agency_report`
- [x] All added source objects include required fields: url, source_type, accessed, title

## Safety Constraints

- [x] No new incident records created
- [x] No scraping or bulk import performed
- [x] No DNS, CNAME, or hosting configuration changed
- [x] No secrets added
- [x] No G-01/G-02 marked as finally approved
- [x] No third-party article text copied
- [x] No legal conclusions made
- [x] Public root remains site/
- [x] Repo root not exposed

## Documentation

- [x] SOURCE_RISK_HARDENING_REPORT.md created
- [x] GOVERNANCE_SIGNOFF_PACK.md updated (rows + summary + header)
- [x] PROJECT_STATE.md updated (v0.6.2)
- [x] NEXT_ACTIONS.md updated (T026 complete, T027 options)
- [x] CHANGELOG.md updated (v0.6.2 entry)
- [x] REPO_INVENTORY.md updated (T026 files)
- [x] PUBLICATION_RISK_GATE.md updated (T026 note)
- [x] RELEASE_CANDIDATE_GATE.md updated (T026 note)
- [x] README.md updated (T026 status)
