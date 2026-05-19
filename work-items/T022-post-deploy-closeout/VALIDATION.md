# T022 Validation

## Automated / CLI Checks

| Check | Command / Method | Result |
|---|---|---|
| Dataset validator | `python3 tools/validate_dataset.py` | ✅ PASS — exits 0; 10 records |
| No `../data/` paths | `grep -R "../data/" site/assets/app.js site/index.html site/README.md` | ✅ Clean |
| No CNAME in site/ | `find site -name "CNAME"` | ✅ None |
| No work-items/ in site/ | `find site -path "*/work-items/*"` | ✅ None |
| No docs/ in site/ | `find site -path "*/docs/*"` | ✅ None |
| Workflow path | `grep "path: site" .github/workflows/pages.yml` | ✅ `path: site` confirmed |
| Working tree clean | `git diff --check` | ✅ Clean |
| Site file count | `find site -maxdepth 3 -type f \| sort` | ✅ 20 files (incl. .nojekyll, README.md, index.html, app.js, styles.css, incident-index.json, 10 incident JSON, 6 taxonomy JSON) |

## Live URL Checks

| URL | Method | Result |
|---|---|---|
| `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` | `curl -sI` | HTTP 301 → `http://atlas.caesar.no/` |
| `http://atlas.caesar.no/` | `curl -sI` | HTTP 200 |
| `https://atlas.caesar.no/` | `curl -sI` | HTTP 200 |
| `https://caesar-compliance.github.io/caesar-ai-incident-atlas/data/incident-index.json` | `curl -sI` | HTTP 301 → custom domain |

## GitHub Pages API State

| Field | Value |
|---|---|
| status | `built` |
| build_type | `workflow` |
| cname | `atlas.caesar.no` |
| html_url | `https://atlas.caesar.no/` |
| https_certificate.state | `approved` |
| https_certificate.expires_at | `2026-08-18` |
| https_enforced | `true` (set T022) |

## Workflow Run State

| Run | Status |
|---|---|
| ID 26130812095 — trigger: re-run Pages deployment (T021) | ✅ success |
| ID 26130771958 — merge: enable GitHub Pages default deployment | ✗ failed (prior run, superseded) |

## G-10 Status

| Type | Status |
|---|---|
| Static file checks | ✅ PASS |
| HTTP 200 at live URL | ✅ PASS |
| Manual 14-step browser UI test | ⚠ Still required — no interactive browser in agent context |

## Safety Checks

| Item | Status |
|---|---|
| No DNS changed | ✅ Confirmed |
| No CNAME file added to repo | ✅ Confirmed |
| No new incident records | ✅ Confirmed |
| No secrets added | ✅ Confirmed |
| No external hosting config | ✅ Confirmed |
| No scraping | ✅ Confirmed |
| No third-party content copied | ✅ Confirmed |
| Repo root not exposed | ✅ Confirmed — only `site/` published |
