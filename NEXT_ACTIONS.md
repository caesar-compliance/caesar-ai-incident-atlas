# Next Actions — caesar-ai-incident-atlas

**Last updated:** 20 May 2026 (T023)

---

## Execution Boundaries

This repository is in the **T023 post-smoke-test** phase. GitHub Pages is live at `https://atlas.caesar.no/`. HTTP→HTTPS redirect confirmed (301). JSON data confirmed live (HTTP 200, 10 records). G-10 HTTP/redirect/data checks PASS. Interactive browser UI test (search/filter/sort/DevTools) pending CT manual verification.

The v0.2 draft contract is stable. See `V0_2_DRAFT_PRODUCT_CONTRACT.md` before starting any implementation work.

The clean-room policy is active. See `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` and `LOCAL_ARCHITECTURE_MINING_PLAN.md` before studying any external source.

The T004 preparation documents are now complete. See `DATASET_MVP_IMPLEMENTATION_PLAN.md`, `FIRST_INCIDENT_SELECTION_CRITERIA.md`, `SOURCE_VERIFICATION_WORKFLOW.md`, and `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` before starting any incident curation work.

---

## Current Status

| Task | Status |
|---|---|
| T001 / v0.2.0 — Full-scale blueprint | Complete |
| T002 — Clean-room acceleration policy | Complete |
| T003 — v0.2 draft contract review | Complete |
| T004 — Dataset MVP Preparation | Complete |
| T005 — Dataset MVP Schema and Taxonomy Files | Complete |
| T006 — First Incident Candidate Dossier Preparation | Complete |
| T007 — First Incident Record Creation Plan | Complete |
| T008 — First Tier 1 Incident Record Batch | Complete |
| T009 — Dataset MVP Review and QA Hardening | Complete |
| T010 — Second-Wave Incident Record Batch | Complete |
| T011 — Dataset MVP Public Readiness Review | Complete |
| T012 — Minimal Static Site Prototype | Complete — local only |
| T013 — Static Site Functional Completion | Complete — local functional MVP |
| T014 — Local QA Tooling and Release Candidate Gate | Complete |
| T015 — Static Site Release Candidate Hardening | Complete — local RC PASS |
| T016 — Public Deployment Plan | Complete — planning only, no deployment |
| T017 — Static Publish Package Preparation | Complete — site/ self-contained |
| T018A — Public Release Gate Review Pack | Complete — review materials prepared |
| T019 — Public Release Gate Closure | Complete — gate evidence consolidated, deployment readiness documented |
| T021 — GitHub Pages Deployment Activation | Complete — workflow deployed, default URL live |
| T022 — Post-Deploy Verification + Custom Domain Closeout | **Complete** — custom domain, HTTPS enforced, closeout docs |
| T023 — Browser Smoke + HTTP→HTTPS Redirect Verification | **Complete (partial)** — redirect 301 confirmed, JSON 200, 10 records live; interactive G-10 test pending CT |
| v0.4 Dataset MVP — full 10-record batch | Complete — INC-0001 through INC-0010 validated |

---

## Next Recommended Step: Manual CT Browser Smoke Test → T024

**Public deployment is LIVE at `https://atlas.caesar.no/`.** T023 HTTP/redirect checks complete.

**Verified in T023:**
- `http://atlas.caesar.no/` → 301 → `https://atlas.caesar.no/` ✅
- `https://atlas.caesar.no/` → HTTP 200 ✅
- `https://atlas.caesar.no/data/incident-index.json` → HTTP 200, 10 records ✅
- `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` → 301 → `https://atlas.caesar.no/` ✅
- `python3 tools/validate_dataset.py` → PASS, 10 records ✅
- No CNAME, no internal docs in `site/`, workflow uploads only `site/` ✅

**Deployment facts (T021/T022):**
- GitHub Pages source: GitHub Actions workflow (`.github/workflows/pages.yml`)
- Public root: `site/`
- Default GitHub Pages URL: `https://caesar-compliance.github.io/caesar-ai-incident-atlas/` (redirects to custom domain)
- Custom domain: `atlas.caesar.no` — manually added in GitHub Pages settings
- DNS: `atlas CNAME caesar-compliance.github.io TTL 1 hour` — manually configured
- HTTPS certificate: approved (expires 2026-08-18)
- Enforce HTTPS: enabled (T022)
- Repo root: not exposed
- No Cloudflare/Netlify/Coolify/VPS
- No secrets

**G-10 status:** HTTP/redirect/data checks PASS (T023). Interactive 14-step browser UI test (search, filter, sort, DevTools console/network) requires manual CT verification. See `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md §5` for checklist.

**If CT completes interactive G-10 test:** proceed to T024 — Public MVP Status Lock + Product Polish Backlog.

**Remaining governance items (unchanged — CT sign-off required before v1.0):**
1. **G-01** — Legal/licence review: CT confirms all 10 source URLs cleared
2. **G-02** — Wording/legal risk review: CT or counsel reviews record summaries

See `PUBLICATION_RISK_GATE.md` for full gate status.

---

## Pending License Verifications (Before v0.3)

The following license verifications must be completed before incident records citing these sources can be created:

| Source | Pages to verify | Priority |
|---|---|---|
| OECD AI Incidents Monitor | https://oecd.ai/terms and https://www.oecd.org/en/about/terms-conditions.html | High |
| AIAAIC Repository | https://www.aiaaic.org/aiaaic-repository/user-guide | High |
| MIT AI Incident Tracker | https://airisk.mit.edu/ | Medium |

AIID (CC BY-SA 4.0) and IBM AI Atlas Nexus (Apache-2.0) are verified. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` for details.

---

## Safe Autonomous Tasks

The following tasks can be executed autonomously without Control Tower approval:

- Improving documentation formatting and clarity.
- Fixing typos or broken links in documentation.
- Updating REPO_INVENTORY.md when new files are added.
- Updating CHANGELOG.md with accurate entries.
- Completing a THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md for a source already listed in the register.
- Completing pending license verifications and recording findings in LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md and THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md.

---

## Tasks Requiring Control Tower Approval

The following tasks require Artem / Control Tower review before execution:

- Starting T018 (requires CT review of `PUBLICATION_RISK_GATE.md`; legal review completion; hosting decision; explicit CT approval before any deployment activation).
- Starting v0.3 Dataset MVP.
- Implementing any product code (scripts, automated tooling, application features).
- Creating any incident records.
- Selecting incident sources and verifying data licenses.
- Choosing the static site generator technology.
- Any cross-repository changes or integrations.
- Any reuse of third-party code or data.

---

## Blocked Tasks

- v0.3 Dataset MVP — blocked until T006 dossier shortlist is approved.
- Incident record creation — blocked until T006 is approved and workflow gates are passed.
- Any mass import or scraping workflow — blocked unless separately approved.

---

## Cross-Repository Coordination Notes

- Incident export format must be compatible with `caesar-ai-evidence` incident-mapping schema. Maintain compatibility in future schema updates.
- T005 schema/taxonomy files exist; keep changes backward-compatible unless a new decision is approved.
- Future Governance OS integration requires stable incident IDs (INC-0001 format) and taxonomy IDs — locked in v0.2 contract.
- Do not edit `caesar-ai-evidence` or any sibling repository from this repository.
- AIID CC BY-SA 4.0 ShareAlike clause must be reviewed before any direct AIID data import. See `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 2.1.
