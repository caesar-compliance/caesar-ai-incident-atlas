# T025 — Source/License + Wording Review Sign-Off Pack

**Branch:** `review/T025-source-wording-signoff-pack`  
**Created:** 20 May 2026

---

## Goal

Prepare compact final sign-off pack for G-01 source/license review and G-02 wording/legal-risk review. Do not claim final legal approval.

---

## Checklist

- [x] Confirm git state clean (main @ 412f2ce)
- [x] Create branch `review/T025-source-wording-signoff-pack`
- [x] Create `GOVERNANCE_SIGNOFF_PACK.md`:
  - [x] Status summary
  - [x] G-01 source/license table (INC-0001–INC-0010)
  - [x] G-02 wording/legal-risk table (INC-0001–INC-0010)
  - [x] High-risk wording checklist
  - [x] CT sign-off placeholder section
- [x] Optional wording risk scan:
  - [x] Scan for prohibited terms
  - [x] Document findings (no red flags)
- [x] Update docs:
  - [x] PROJECT_STATE.md
  - [x] NEXT_ACTIONS.md
  - [x] CHANGELOG.md
  - [x] REPO_INVENTORY.md
  - [x] README.md
- [x] Create work-items/T025-source-wording-signoff-pack/ (TASK.md, VALIDATION.md, IMPLEMENTATION_REPORT.md, DECISIONS.md)
- [x] Validation
- [x] Commit: `docs: prepare governance sign-off pack (T025)`
- [x] Push branch
- [x] Merge to main (if safe)

---

## Constraints (Hard)

- Do NOT change DNS
- Do NOT add CNAME
- Do NOT change GitHub Pages custom domain
- Do NOT add external hosting config
- Do NOT add secrets
- Do NOT create new incident records
- Do NOT import external datasets
- Do NOT scrape
- Do NOT copy third-party text/data/code
- Do NOT rewrite incident records except documented typo/safety fixes
- Do NOT add new sources
- Do NOT claim legal advice
- Do NOT mark G-01/G-02 as finally approved
- Do NOT expose repo root

---

## Required Status

- Technical Public MVP: LIVE + VERIFIED (unchanged)
- G-10: PASS (unchanged)
- G-01: prepared for CT/counsel sign-off (not claimed as approved)
- G-02: prepared for CT/counsel sign-off (not claimed as approved)
- No new records added
- No scraping/import performed
- No DNS/CNAME/hosting changes
