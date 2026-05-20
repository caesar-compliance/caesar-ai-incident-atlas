# T028 Validation

**Date:** 20 May 2026

## Validation Checklist

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` | PASS — 10 records, no data changes |
| `grep -R "../data/" site/assets/app.js site/index.html` | Clean — no relative path leaks |
| `find site -maxdepth 3 -type f \| sort` | 25 files (21 pre-T028 + robots.txt, sitemap.xml, index.html updated, styles.css updated, app.js updated) |
| `find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \)` | Empty — no CNAME, no internal docs in site/ |
| `grep -R "upload-pages-artifact" .github/workflows/pages.yml` | Confirmed |
| `grep -R "path: site" .github/workflows/pages.yml` | Confirmed |
| `git diff --check` | No whitespace errors |
| External scripts in site/index.html | None (only assets/app.js) |
| Analytics/tracking added | None |
| External CSS/fonts added | None |
| New incident records added | 0 |
| Source/legal content changed | None |
| DNS/CNAME/hosting config changed | None |
| Secrets added | None |
| G-01 approved | No — still pending |
| G-02 approved | No — still pending |
| Repo root exposed | No |
| OG meta tags reference external scripts | No |
| canonical URL correct | https://atlas.caesar.no/ |
| sitemap.xml contains only public root URL | Yes |
| robots.txt does not disallow root | Correct — Allow: / |

## Browser Check Required (manual)

- Load https://atlas.caesar.no/ after deploy
- Verify 10 cards visible, About panel visible in sidebar, footer visible
- Search/filter/sort functional
- Deep link #INC-0005 opens and scrolls
- No console errors
