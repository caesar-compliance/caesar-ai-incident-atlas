# T047 — Real Green-Source Watcher MVP Implementation Report

## Summary of Changes

### New Files Created
1. `data/watch/config/green-source-watch-targets.json` - Configuration of 7 official Green sources.
2. `data/watch/config/target-keywords.json` - Practical curation keywords (AI, legal, commercial, exclusions).
3. `scripts/watch-green-sources.mjs` - Main manual CLI watcher engine.
4. `scripts/dedupe-real-candidates.mjs` - Candidate de-duplication reporting engine.
5. `scripts/build-real-review-bundle.mjs` - Local review bundle aggregation script.
6. `scripts/validate-real-watcher.mjs` - Rigorous compliance and safety barrier auditor.
7. `docs/watch/REAL_GREEN_SOURCE_WATCHER_RUNBOOK.md` - Operational manual pipeline runbook.

### Existing Files Modified
1. `schemas/pipeline/candidate.schema.json` - Extended `status` enum to include `real_detected`.
2. `tools/review-console/index.html` - Integrated a visual dropdown in the sidebar to toggle between Mock and Real local-only candidate bundles.
3. `tools/review-console/assets/review-console.js` - Dynamic parser/renderer that pulls either bundle, populates the curated fields, and displays a strict `PROMOTION BLOCKED` warning banner when reviewing real candidates.

## Watcher Pipeline Execution Metrics

- **Run Time**: `2026-05-21T12:38:39.066Z`
- **Watch Targets Configured**: 7 enabled Green-tier sources
- **Sources Fetched**: 4 succeeded, 3 failed (expected dynamic URL 404s)
- **Extracted Links**: 479 raw URL targets parsed
- **Real Candidates Detected**: 6 candidates
- **Errors/Warnings**: 0 execution crashes (graceful fetch timeout and status handling)

## Containment & Path Verification

- **Real Candidate Output Directory**: `data/watch/real-candidates/2026-05-21/`
- **Real Local Review Bundle Path**: `tools/review-console/real-review-bundle.json`
- **Run Log Location**: `data/watch/runs/watch-run-2026-05-21T12-38-39.066Z.json`
- **Deduplication Report Location**: `data/watch/runs/latest-real-dedupe-report.json`
- **Public site/ Leakage**: `None` (verified 100% clean by validation suite)
