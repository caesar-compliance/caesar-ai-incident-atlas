# Caesar AI Incident Atlas — Real Green-Source Watcher MVP Runbook

This document details the operational commands and safety constraints for the manual, operator-triggered Green-source watcher pipeline. All outputs from this pipeline are kept strictly confidential and local-only, stored outside the public `site/` root.

## Quick Start Pipeline Execution

Run the manual pipeline stages in sequence:

### 1. Fetch & Detect Candidates
Fetches active Green watch targets, parses index pages/feeds, filters by target keywords, and writes real detected candidate records to disk:
```bash
node scripts/watch-green-sources.mjs
```
- **Inputs**: `data/watch/config/green-source-watch-targets.json`, `data/watch/config/target-keywords.json`
- **Outputs**: `data/watch/real-candidates/YYYY-MM-DD/CAND-XXXX.json`, `data/watch/runs/watch-run-*.json`

### 2. Run De-duplication Report
Scans detected candidates and produces a reporting-only duplicates audit without modifying or deleting files:
```bash
node scripts/dedupe-real-candidates.mjs
```
- **Inputs**: `data/watch/real-candidates/`
- **Outputs**: `data/watch/runs/latest-real-dedupe-report.json`

### 3. Compile Real Local Review Bundle
Aggregates all real candidate records into a local-only review console bundle:
```bash
node scripts/build-real-review-bundle.mjs
```
- **Inputs**: `data/watch/real-candidates/`
- **Outputs**: `tools/review-console/real-review-bundle.json`

### 4. Execute Compliance & Safety Audit
Verifies that all containment barriers and safety policies are 100% satisfied:
```bash
node scripts/validate-real-watcher.mjs
```

---

## Safety & Ingestion Rules

1. **Green Targets Only**: Only official approved Green-tier regulatory sources represented in the source catalog can be fetched. Yellow/Red tiers (e.g. databases like AIID/OECD/AIAAIC) must NOT be configured for manual watch fetches.
2. **Offline Containment**: Real detected candidates, run logs, and the real review bundle must stay strictly inside `data/watch/` and `tools/review-console/`. They must **NEVER** be committed or copied under `site/`.
3. **Metadata-Only Storage**: Do NOT store full HTML page bodies, CSS, or copied third-party article paragraphs. Keep records strict and minimal: URLs, titles, date published, detected keywords, jurisdiction, and Caesar internal note annotations.
4. **No Automated Triggers**: Do NOT define GitHub Actions cron triggers or automated schedule workflows for this pipeline. It is strictly an operator-run manual pipeline.
5. **No Public Incidents**: Under no circumstances should real candidates be promoted to public incident numbers (like `INC-0013`) or digest files under `site/` without formal manual curation and promotion gates.
