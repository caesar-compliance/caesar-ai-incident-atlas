# Public Deployment Plan

**Task:** T016 — Public Deployment Plan  
**Date:** 19 May 2026  
**Status:** Planning only. No deployment. Requires Control Tower approval.

---

## 1. Proposed Public URL

**Primary candidate:** `incidents.caesar.no`  
Alternative: `atlas.caesar.no` or a subdirectory such as `caesar.no/incidents/`

Domain ownership and DNS configuration must be confirmed by Artem before T017.

---

## 2. What Would Be Published

| Item | Published? | Notes |
|---|---|---|
| `site/index.html` | ✅ Yes | Main application page |
| `site/assets/styles.css` | ✅ Yes | |
| `site/assets/app.js` | ✅ Yes | |
| `site/README.md` | Optional | Not required; static hosts can ignore |
| `data/incident-index.json` | ✅ Yes | Required — fetched by `app.js` |
| `data/incidents/INC-0001…INC-0010.json` | ✅ Yes | Required — fetched by `app.js` |
| `data/taxonomy/*.json` | ✅ Yes (recommended) | Fetched indirectly; required for future taxonomy display |
| `schemas/incident.schema.json` | Optional | Not fetched by site; useful for transparency |

---

## 3. What Must Remain Unpublished

The following must **not** be served publicly under any hosting configuration:

| Item | Reason |
|---|---|
| `work-items/` | Internal planning and QA docs |
| `docs/` | Internal product docs (DECISION_LOG, blueprints) |
| `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md` | Internal research notes |
| `INCIDENT_FIELD_MAPPING_DRAFTS.md` | Internal field-mapping drafts |
| `LOCAL_ARCHITECTURE_MINING_PLAN.md` | Internal competitive research |
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | Internal governance policy |
| `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` | Internal source review |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Internal register |
| `V0_2_DRAFT_PRODUCT_CONTRACT.md` | Internal contract draft |
| All `*_RECOMMENDATION.md` planning docs | Internal planning |
| `.git/` | Version history (excluded automatically by all hosts) |

**Safe publish strategy:** publish only `site/` and `data/` (incident + taxonomy JSON), served from the same origin. Do not serve the repo root.

---

## 4. Path Dependency Note

`site/assets/app.js` fetches data using relative paths:

```
fetch("../data/incident-index.json")
fetch("../data/incidents/INC-000N-…json")
```

This means `data/` must be accessible at `../data/` relative to `site/`. When served from a static host:

- If publish root = repo root → `data/` is at correct relative path ✅
- If publish root = `site/` only → `data/` is missing ❌

**Recommended approach for T017:** set publish root to repo root and configure the host to serve `site/index.html` as default, or copy `data/` into `site/data/` and update the path constants in `app.js` before deployment.

**Preferred:** copy `data/` into `site/data/` and update the two path constants in `app.js`. This keeps the deployment root as `site/` and avoids exposing the entire repo.

---

## 5. Pre-Deployment QA Steps

1. `python3 tools/validate_dataset.py` — must exit 0.
2. `python3 -m http.server 8080` from repo root → `http://localhost:8080/site/` must load all 10 cards.
3. Manual browser check: search, sort, filter, deep link, expand/collapse all work.
4. No console errors in browser DevTools.
5. Confirm no internal docs are in the publish directory.
6. Confirm no secrets or credentials are in any committed file.

---

## 6. Rollback Concept

No dynamic backend — rollback is a static file redeploy.

1. Identify the last known-good git commit.
2. Check out that commit locally.
3. Re-run `python3 tools/validate_dataset.py` to confirm it passes.
4. Re-deploy the static files.

Most static hosts (GitHub Pages, Cloudflare Pages) retain prior deploy history and support instant rollback via the dashboard.

---

## 7. Update Process After New Incident Records

1. Create new record in `data/incidents/INC-NNNN-…json` (requires CT approval).
2. Add entry to `data/incident-index.json`.
3. Run `python3 tools/validate_dataset.py` — must pass.
4. Commit changes on a feature branch.
5. CT reviews and approves.
6. Merge to main and re-trigger static deployment (manual or CI-triggered push).

No rebuild required — site is fully client-side, reads JSON at runtime.

---

## 8. No-Scraper / No-Database / No-Backend Boundary

The Caesar AI Incident Atlas public site is and must remain:

- Static HTML/CSS/JS only.
- No server-side code.
- No database.
- No scraper or automated data ingestion.
- No external API calls from the browser.
- No user accounts, sessions, or cookies.
- No analytics or tracking scripts.

Any future feature requiring server-side logic requires a new architecture decision and explicit CT approval.

---

## 9. Approval Steps Before Public Deployment

1. **Legal/license review** — CT confirms all 10 source URLs are cleared for public citation. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`.
2. **Wording risk review** — CT or legal counsel reviews record summaries and lessons for defamation, misrepresentation, or liability risk.
3. **Domain decision** — CT confirms `incidents.caesar.no` (or alternative) and DNS ownership.
4. **Hosting decision** — CT selects a hosting option from `HOSTING_OPTION_MATRIX.md`.
5. **T017 implementation** — agent implements deployment config and path fix.
6. **Final local QA** — `python3 tools/validate_dataset.py` and browser smoke test pass.
7. **CT explicit approval** — CT issues: `"Approve public deployment"` before any publish action.
