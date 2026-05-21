# T047 — Real Green-Source Watcher MVP Validation Report

## Automated Validation Execution

All tests have been run and passed:

1. **Safety Containment Audit (`node scripts/validate-real-watcher.mjs`)**:
   - **Result**: `PASS`
   - Verified that only Green-tier sources are tracked.
   - Verified that no reference databases (AIID, OECD, AIAAIC) are fetched.
   - Verified that no real candidates leak to public `site/`.
   - Verified that the core incident count remains exactly 12.
   - Verified that no secrets/env files were introduced.
   - Verified that sitemaps, RSS, and workflows remain untouched and secure.

2. **Git Diff Integrity (`git diff --check`)**:
   - **Result**: `PASS`
   - All trailing spaces and format violations successfully resolved.

3. **Core Dataset Integrity (`python3 tools/validate_dataset.py`)**:
   - **Result**: `PASS`
   - Core incident catalog remains intact with exactly 12 incidents.

4. **Schema Compliance (`python3 tools/validate_pipeline_schemas.py` and mock schemas check)**:
   - **Result**: `PASS`
   - Core pipeline and source registry validation tests successfully compiled.

5. **Static Digest Verification (`node scripts/validate-digests.mjs`)**:
   - **Result**: `PASS`
   - Digests are intact and valid.

6. **RSS compilation (`node scripts/build-rss-feeds.mjs`)**:
   - **Result**: `PASS`
   - Output files `site/rss.xml`, `site/digests/weekly.xml`, and `site/digests/monthly.xml` compiled cleanly.

7. **Review Console Validation (`node scripts/validate-review-console.mjs`)**:
   - **Result**: `PASS`
   - Safety checks for local review bundles successfully passed.

## Manual Pipeline Run Verification

Executing the watcher pipeline sequentially:
1. **`node scripts/watch-green-sources.mjs`**:
   - Fetched 4 green sources successfully (3 failed with expected 404s).
   - Detected 6 real candidates.
   - Saved metadata-only records in `data/watch/real-candidates/2026-05-21/`.
2. **`node scripts/dedupe-real-candidates.mjs`**:
   - Scanned 6 candidate files.
   - Detected 0 duplicates (initial run).
   - Generated de-duplication report at `data/watch/runs/latest-real-dedupe-report.json`.
3. **`node scripts/build-real-review-bundle.mjs`**:
   - Compiled 6 candidates into `tools/review-console/real-review-bundle.json`.
   - All containment and local-only attributes verified.
