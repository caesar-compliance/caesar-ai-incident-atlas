# QA Validation Checklist — T044 Static Weekly and Monthly Digest MVP

This document details the automated, local, and invariant validation checks required to ensure structural compliance and absolute safety in T044.

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

## 3. Custom Digest Validation
Verify that all weekly/monthly digest JSON files comply structurally and cross-reference correctly with the incident index.
- Run: `node scripts/validate-digests.mjs`
- Expected: `[Pass] All digest validation and security policy checks passed successfully!`
- Status: **PASSED**

## 4. RSS Feed Compilation Check
Verify that all RSS XML feeds compile cleanly without missing assets or syntax errors.
- Run: `node scripts/build-rss-feeds.mjs`
- Expected: `PASS: All RSS XML feeds have been compiled successfully!`
- Status: **PASSED**

## 5. Invariant and Boundary Checks
- **Dataset Count Check**: Confirmed that exactly 12 public incident JSON records exist under `data/incidents/` and `site/data/incidents/`. No new public records created.
  - Run: `git ls-files 'data/incidents/*.json' | wc -l` (Result: 12)
  - Run: `git ls-files 'site/data/incidents/*.json' | wc -l` (Result: 12)
  - Status: **PASSED**
- **Draft Exclusivity**: Confirmed that no files containing the string `INC-0013` exist.
  - Run: `find . -name '*INC-0013*'` (Result: None)
  - Status: **PASSED**
- **Inactive Registry**: Verified that all monitored sources in `data/source-registry/sources.yml` are marked strictly with `status: inactive_draft` and `auto_publish_allowed: false`.
  - Status: **PASSED**
- **No Live Watcher/Scheduled Actions**: Confirmed that no scrapers or network-enabled automated fetch tools are implemented. Verified no scheduled workflows in `.github/workflows/pages.yml`.
  - Status: **PASSED**
- **No Subscriber Database**: Verified that no database schema, dynamic backend server, or transactional subscriber caches exist in the codebase.
  - Status: **PASSED**
- **No Email Provider Integration**: Verified that no external email API integrations (listmonk, Resend, SES) or secrets/env files have been added.
  - Status: **PASSED**
- **Offline / Sandbox Integrity**: No external connections made, no third-party assets/text copied, and public root is strictly maintained as `site/`.
  - Status: **PASSED**
- **File Exist Confirmations**:
  - `site/rss.xml` exists.
  - `site/digests/weekly.xml` exists.
  - `site/digests/monthly.xml` exists.
  - `site/digests/index.html` exists.
  - `site/digests/weekly/index.html` exists.
  - `site/digests/monthly/index.html` exists.
  - Status: **PASSED**
