# T055 — Implementation Report

## Branch
`feat/T055-public-case-ux-validator-polish`

## Starting commit
`2cc45f9` (main, T054 complete)

## Files changed

### Validator fixes
- `scripts/validate-real-drafts.mjs` — removed stale `inc-0013.json` absent check; added positive check for published `INC-0013-edpb-...json`; added INC-0014 block
- `scripts/validate-digests.mjs` — removed INC-0013 safety violation block (now published); CAND/mock block retained

### Data
- `data/incident-index.json` — updated `note` field to reflect 13 records
- `site/data/incident-index.json` — synced note field

### Public UX
- `site/assets/app.js` — Record Type filter, Jurisdiction filter, guidance disclaimer in detail view, improved search (jurisdiction, record_type, source URLs), `isGuidance` context for section labels, "records" count label
- `site/index.html` — added `filter-record-type` and `filter-jurisdiction` sidebar groups, updated search placeholder
- `site/assets/styles.css` — `.guidance-notice`, case page layout classes (`.case-page-layout`, `.case-header`, `.case-title`, `.case-index-*`, etc.)

### New scripts
- `scripts/build-public-case-pages.mjs` — generates `site/cases/index.html` + `site/cases/<slug>/index.html` for all 13 records
- `scripts/validate-public-site.mjs` — 22-check public site smoke validator

### Generated site assets (13 records)
- `site/cases/index.html`
- `site/cases/INC-0001-mata-v-avianca-court-citations/index.html`
- … (all 13 cases)
- `site/cases/INC-0013-edpb-automated-decision-making-profiling-guidance/index.html`
- `site/rss.xml`, `site/digests/weekly.xml`, `site/digests/monthly.xml` (rebuilt)

### Docs
- `site/README.md` — removed stale INC-0013 block mention
- `work-items/T055-*/` — TASK, VALIDATION, DECISIONS, IMPLEMENTATION_REPORT

## Public count
**13 records** — unchanged.

## Validator summary
All 12 validators + diff-check: **PASS**.
