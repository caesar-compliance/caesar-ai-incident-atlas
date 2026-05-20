# T028 Implementation Report — Public MVP Polish Pass

**Date:** 20 May 2026  
**Branch:** `polish/T028-public-mvp-polish`  
**Version:** v0.6.4  
**Starting main commit:** 02a61a2

---

## Summary

Focused public-facing polish pass on the static site. No records, sources, schema, or legal content changed. No DNS/CNAME/hosting changes. No external dependencies.

---

## Changes Made

### site/index.html
- Added OG meta tags: `og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`
- Added `<link rel="canonical" href="https://atlas.caesar.no/">`
- Updated header version badge: `v0.6.4 · 10 incidents · Live MVP`
- Updated sidebar `aria-label` to "Filters and about"
- Updated notice banner: removed "Local MVP" / "Not publicly deployed"; added "Public MVP live" and "not legal advice"
- Added About/Methodology panel in sidebar with: description, governance mapping chain, dataset metadata table (10 records, INC-0001–INC-0010, v0.6.4, MVP verified 20 May 2026, GitHub Pages / static, source review in progress), not-legal-advice disclaimer
- Added `<footer class="app-footer">` with: Live MVP · 10 curated records · v0.6.4 · GitHub Pages / static · Not legal advice · caesar.no

### site/assets/styles.css
- Added `.about-panel`, `.about-heading`, `.about-text`, `.about-mapping`, `.about-meta-list`, `.about-meta-label`, `.about-disclaimer` styles
- Added `.app-footer`, `.footer-inner`, `.footer-sep`, `.footer-live`, `.footer-disclaimer`, `.footer-link` styles
- Added explicit `:focus-visible` outline rules for `.search-input`, `.sort-select`, `.filter-reset`, `.copy-link-btn`, `.footer-link`
- Mobile (`max-width: 768px`): reduced padding on `.main`, `.app-header`, `.incident-card`; added `.card-meta`, `.card-title` mobile density; added `.about-panel`, `.app-footer` mobile adjustments

### site/assets/app.js
- `updateStatusPanel()`: replaced dynamic `accessed` date from first-record source with fixed fields: Records count, Version v0.6.4, MVP verified 20 May 2026

### site/robots.txt (new)
- `User-agent: *` / `Allow: /` / `Sitemap: https://atlas.caesar.no/sitemap.xml`

### site/sitemap.xml (new)
- Single URL: `https://atlas.caesar.no/`, lastmod 2026-05-20, changefreq monthly, priority 1.0

### Docs updated
- `PROJECT_STATE.md` — v0.6.4, T028 complete
- `NEXT_ACTIONS.md` — T028 status, T029 next
- `CHANGELOG.md` — v0.6.4 entry
- `REPO_INVENTORY.md` — T028 files, site/robots.txt, site/sitemap.xml
- `README.md` — Project Status
- `site/README.md` — Status
- `PRODUCT_POLISH_BACKLOG.md` — completed items marked

---

## Gate Status

| Gate | Status |
|---|---|
| Technical Public MVP | LIVE + VERIFIED |
| G-10 | PASS |
| G-01 | Pending — INC-0006 counsel confirmation |
| G-02 | Pending — CT/counsel sign-off |

---

## Safety Confirmation

- No DNS changed
- No CNAME added
- No custom domain changed
- No secrets
- No new records
- No scraping
- No external hosting config
- No analytics/tracking
- No external scripts
- Repo root not exposed
- G-01/G-02 not approved

---

## Recommended Next Step

**T029 — CT/Counsel Sign-Off Recording for G-01/G-02**
