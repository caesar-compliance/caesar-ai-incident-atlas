# T024 — Public MVP Status Lock + Product Polish Backlog

**Branch:** `status/T024-public-mvp-lock`  
**Created:** 20 May 2026

---

## Goal

Lock the project status as technical Public MVP live and verified after G-10 passed, while keeping G-01/G-02 governance/legal review items clearly pending. Create a compact product polish backlog for future work.

---

## Checklist

- [x] Confirm git state clean (main @ eebfe1f)
- [x] Create branch `status/T024-public-mvp-lock`
- [x] Verify live state:
  - [x] `curl -I https://atlas.caesar.no/` → HTTP 200
  - [x] `curl -I http://atlas.caesar.no/` → 301 redirect
  - [x] `curl -I https://atlas.caesar.no/data/incident-index.json` → HTTP 200
  - [x] `gh run list --workflow pages.yml` → latest success
  - [x] `gh api repos/caesar-compliance/caesar-ai-incident-atlas/pages` → built, https_enforced=true
- [x] Local validation:
  - [x] `python3 tools/validate_dataset.py` → PASS (10 records)
  - [x] `grep -R "../data/" site/` → clean
  - [x] `find site -maxdepth 3 -type f` → 21 files
  - [x] `find site -maxdepth 4 (CNAME/work-items/docs)` → empty
  - [x] Workflow `path: site` confirmed
  - [x] `git diff --check` → clean
- [x] Update status docs:
  - [x] PROJECT_STATE.md
  - [x] NEXT_ACTIONS.md
  - [x] CHANGELOG.md
  - [x] REPO_INVENTORY.md
  - [x] PUBLICATION_RISK_GATE.md (G-10 → PASS)
  - [x] RELEASE_CANDIDATE_GATE.md
  - [x] DEPLOYMENT_READINESS_CHECKLIST.md
  - [x] README.md
  - [x] site/README.md
- [x] Create PRODUCT_POLISH_BACKLOG.md
- [x] Create work-items/T024-public-mvp-lock/ (TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md)
- [x] Commit: `docs: lock technical public MVP status (T024)`
- [x] Push branch
- [x] Merge to main (if safe)

---

## Constraints (Hard)

- Do NOT change DNS
- Do NOT add CNAME
- Do NOT change GitHub Pages custom domain
- Do NOT add Cloudflare, Netlify, Coolify, VPS, nginx, or other hosting config
- Do NOT add secrets
- Do NOT create new incident records
- Do NOT import external datasets
- Do NOT scrape
- Do NOT copy third-party text/data/code
- Do NOT change legal/source/incident content
- Do NOT expose repo root
- Public root must remain site/
- Workflow must continue uploading only site/
- Keep documentation compact

---

## Required Status

- Technical Public MVP: LIVE + VERIFIED
- Live URL: https://atlas.caesar.no/
- Deployment: GitHub Pages via GitHub Actions
- Public root: site/
- G-10: PASS by Control Tower manual browser confirmation on 20 May 2026
- G-01: pending CT source/license sign-off
- G-02: pending CT/counsel wording/legal-risk review
- No new records were added
- No scraping/import was performed
- No DNS/CNAME changes in T024
- Repo root is not exposed
