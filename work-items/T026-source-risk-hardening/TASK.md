# T026 — Source Risk Hardening Pass for Public MVP

**Branch:** `review/T026-source-risk-hardening`  
**Date:** 20 May 2026  
**Version:** 0.6.2

## Checklist

- [x] Read GOVERNANCE_SIGNOFF_PACK.md, PUBLICATION_RISK_GATE.md, PROJECT_STATE.md, NEXT_ACTIONS.md, CHANGELOG.md, REPO_INVENTORY.md, README.md, schemas/incident.schema.json
- [x] Read INC-0005, INC-0006, INC-0008, INC-0009 JSON records
- [x] Confirm git state clean (main at dbe1c1b)
- [x] Create branch review/T026-source-risk-hardening
- [x] Assess INC-0005 — court record added (CourtListener/RECAP, Williams v. City of Detroit)
- [x] Assess INC-0006 — no safe replacement; counsel review unchanged
- [x] Assess INC-0008 — US DEFIANCE Act congress.gov record added
- [x] Assess INC-0009 — PubMed PMID 31649194 NIH NLM record added
- [x] Sync site/data/incidents/ for changed records (INC-0005, INC-0008, INC-0009)
- [x] Run python3 tools/validate_dataset.py — PASS
- [x] Create SOURCE_RISK_HARDENING_REPORT.md
- [x] Update GOVERNANCE_SIGNOFF_PACK.md (rows + risk summary + header)
- [x] Update PROJECT_STATE.md (v0.6.2, T026)
- [x] Update NEXT_ACTIONS.md (T026 status, T027 options)
- [x] Update CHANGELOG.md (v0.6.2 entry)
- [x] Update REPO_INVENTORY.md (T026 files)
- [x] Update PUBLICATION_RISK_GATE.md (T026 note)
- [x] Update RELEASE_CANDIDATE_GATE.md (T026 note)
- [x] Update README.md (T026 status)
- [x] Create work-items/T026-source-risk-hardening/ docs
- [x] Commit, push, merge to main

## Constraints Confirmed

- No new incident records created
- No scraping or bulk import
- No DNS, CNAME, or hosting changes
- No secrets
- No G-01/G-02 marked as finally approved
- Public root remains site/
- No third-party article text copied
- No legal conclusions made
