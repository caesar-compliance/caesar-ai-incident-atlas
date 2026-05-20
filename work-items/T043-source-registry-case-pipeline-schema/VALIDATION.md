# QA Validation Checklist — T043 Source Registry and Case Pipeline Schema

This document details the automated, local, and invariant validation checks required to ensure structural compliance and absolute safety in T043.

## 1. Automated Dataset Validation
Verify that the existing dataset is unchanged and fully valid.
- Run: `python3 tools/validate_dataset.py`
- Expected: `PASS — all checks passed (12 records, 4 site files)`
- Status: **PASSED**

## 2. Ingestion Pipeline Schema Validation
Verify that `sources.yml` complies with the JSON Schema and that programmatic safety policies are enforced.
- Run: `python3 tools/validate_pipeline_schemas.py`
- Expected: `PASS: all sources.yml entries are fully valid and compliant with safety policies!`
- Status: **PASSED**

## 3. JSON Schema Syntax Validation
Confirm all JSON schema documents parse perfectly.
- Run: `python3 -m json.tool schemas/pipeline/source.schema.json > /dev/null`
- Run: `python3 -m json.tool schemas/pipeline/candidate.schema.json > /dev/null`
- Run: `python3 -m json.tool schemas/pipeline/case-draft.schema.json > /dev/null`
- Expected: Exit code 0 (clean parse)
- Status: **PASSED**

## 4. Invariant and Boundary Checks
- **Dataset Count Check**: Confirmed that exactly 12 public incident JSON records exist under `data/incidents/` and `site/data/incidents/`. No new public records created.
  - Run: `git ls-files 'data/incidents/*.json' | wc -l` (Result: 12)
  - Run: `git ls-files 'site/data/incidents/*.json' | wc -l` (Result: 12)
  - Status: **PASSED**
- **Draft Exclusivity**: Confirmed that no files containing the string `INC-0013` exist.
  - Run: `find . -name '*INC-0013*'` (Result: None)
  - Status: **PASSED**
- **Inactive Registry**: Verified that all 10 monitored sources in `data/source-registry/sources.yml` are marked strictly with `status: inactive_draft` and `auto_publish_allowed: false`.
  - Status: **PASSED**
- **No Live Watcher/Scheduled Actions**: Confirmed that no scrapers or network-enabled automated fetch tools are implemented. Verified no scheduled workflows in `.github/workflows/pages.yml`.
  - Status: **PASSED**
- **Offline / Sandbox Integrity**: No external connections made, no third-party assets/text copied, and public root is strictly maintained as `site/`.
  - Status: **PASSED**
