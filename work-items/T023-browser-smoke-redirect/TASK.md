# T023 — Browser Smoke Test + HTTP-to-HTTPS Redirect Verification

**Date:** 20 May 2026  
**Branch:** `verify/T023-browser-smoke-redirect`  
**Starting commit:** `83eb911`

---

## Task Checklist

### Git / Branch
- [x] Confirmed `main` clean at `83eb911`
- [x] Created branch `verify/T023-browser-smoke-redirect`

### GitHub Pages API Check
- [x] `gh api repos/caesar-compliance/caesar-ai-incident-atlas/pages` — status: built; cname: atlas.caesar.no; https_enforced: true; certificate: approved (expires 2026-08-18)
- [x] Latest workflow run: `26131240793` — ✅ success

### Live URL Checks
- [x] `https://atlas.caesar.no/` — HTTP 200 ✅
- [x] `http://atlas.caesar.no/` — HTTP 301 → `https://atlas.caesar.no/` ✅ redirect confirmed
- [x] `https://atlas.caesar.no/data/incident-index.json` — HTTP 200 ✅ all 10 records
- [x] `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` — HTTP 301 → `https://atlas.caesar.no/` ✅

### G-10 Browser Smoke Test
- [x] HTTP/redirect/data checks: PASS
- [x] JSON endpoint returns all 10 records (INC-0001 through INC-0010) confirmed via `read_url_content`
- [ ] Interactive 14-step browser UI test (search, filter, sort, DevTools) — **pending CT manual verification**

### Local Validation
- [x] `python3 tools/validate_dataset.py` — PASS, 10 records, exits 0
- [x] No `../data/` paths in `site/assets/app.js`
- [x] `find site -maxdepth 4 ( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" )` — empty
- [x] `find site -maxdepth 3 -type f` — 21 files confirmed
- [x] Workflow uploads only `path: site` — confirmed
- [x] `git diff --check` — clean

### Documentation
- [x] `PROJECT_STATE.md` updated
- [x] `NEXT_ACTIONS.md` updated
- [x] `CHANGELOG.md` — v0.5.9 entry added
- [x] `REPO_INVENTORY.md` updated
- [x] `PUBLICATION_RISK_GATE.md` — G-10 updated with T023 results
- [x] `RELEASE_CANDIDATE_GATE.md` — T023 status note added
- [x] `DEPLOYMENT_READINESS_CHECKLIST.md` updated
- [x] `README.md` updated
- [x] `site/README.md` updated

### Work Item
- [x] `work-items/T023-browser-smoke-redirect/TASK.md`
- [x] `work-items/T023-browser-smoke-redirect/VALIDATION.md`
- [x] `work-items/T023-browser-smoke-redirect/IMPLEMENTATION_REPORT.md`
- [x] `work-items/T023-browser-smoke-redirect/DECISIONS.md`
