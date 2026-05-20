# T038 — Draft First New Incident Record — Task

**Task ID:** T038  
**Date:** 20 May 2026  
**Status:** Complete  
**Branch:** records/T038-create-inc0011-cand013

---

## Objective

Create the first new incident record from approved candidate CAND-013 only.

---

## Approved Candidate

- **CAND-013** — Spirometry race bias → **INC-0011**

---

## Checklist

- [x] Confirm git and deployment state
- [x] Create branch: records/T038-create-inc0011-cand013
- [x] Inspect schema and existing records for conventions
- [x] Draft INC-0011 JSON record
- [x] Update root data/incident-index.json (11 records)
- [x] Sync to site/data/ (copy incident + update index)
- [x] Create INC0011_GOVERNANCE_REVIEW_NOTE.md
- [x] Update lifecycle docs (PROJECT_STATE, NEXT_ACTIONS, CHANGELOG, README, ROADMAP)
- [x] Create work item docs
- [x] Run validation
- [x] Commit and push

---

## Constraints Verified

- [x] Only CAND-013 approved — no other candidates drafted
- [x] Only one new record created (INC-0011)
- [x] No scraping performed
- [x] No bulk source downloads
- [x] No copied third-party text
- [x] No legal conclusions in record
- [x] G-01/G-02 scope unchanged for INC-0001–INC-0010
- [x] INC-0011 marked as requiring separate CT sign-off
- [x] No DNS/CNAME/hosting changes
- [x] No secrets exposed

---

## Output

| File | Purpose |
|---|---|
| data/incidents/INC-0011-spirometry-race-correction-medical-guideline.json | New incident record |
| site/data/incidents/INC-0011-spirometry-race-correction-medical-guideline.json | Public site copy |
| INC0011_GOVERNANCE_REVIEW_NOTE.md | Source/wording review for CT |

---

**Next:** T039 — INC-0011 Source/Wording Gate Sign-Off + Live Smoke Test
