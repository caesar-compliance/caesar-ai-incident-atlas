# T055 — Public Case UX + Validator Fix + Live Atlas Polish

## Goal
Improve live public Atlas now that INC-0013 is published. Fix stale validators, add public type/badge handling, add search/filter improvements, add static case detail pages, rebuild RSS, validate, deploy.

## Scope
- Fix stale `validate-real-drafts.mjs` INC-0013 checks
- Fix stale `validate-digests.mjs` INC-0013 block
- Update `data/incident-index.json` note field
- Add Record Type + Jurisdiction filters to `site/assets/app.js` + sidebar
- Add guidance disclaimer in detail view for guidance/governance_case records
- Create `scripts/build-public-case-pages.mjs` — generates `site/cases/` static pages
- Create `scripts/validate-public-site.mjs` — public site smoke validator
- Rebuild RSS feeds via `build-rss-feeds.mjs`
- Update `site/assets/styles.css` for new UI elements

## Hard limits (unchanged)
- No INC-0014
- No new published cases
- No Yellow sources, no scraping, no CDN
- Public root remains `site/`
- Pages workflow unchanged
