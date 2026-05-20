# T038 — Implementation Report

**Task:** T038 — Draft First New Incident Record  
**Date:** 20 May 2026  
**Version:** 0.7.6  
**Branch:** records/T038-create-inc0011-cand013

---

## Summary

First new incident record created from approved candidate CAND-013. Dataset expanded from 10 to 11 records. INC-0011 prepared for CT review with governance review note.

---

## Work Performed

### Record Creation

| Field | Value |
|---|---|
| incident_id | INC-0011 |
| title | Medical society issues revised guidance on race-based correction factors in pulmonary function testing algorithms |
| date | 18 July 2023 |
| sector | healthcare-medical |
| failure_modes | FM-BIAS |
| severity | high |
| confidence | high |
| source | ATS official statement + PubMed |

### Files Created

1. **data/incidents/INC-0011-spirometry-race-correction-medical-guideline.json** — Root incident record
2. **site/data/incidents/INC-0011-spirometry-race-correction-medical-guideline.json** — Public site copy
3. **INC0011_GOVERNANCE_REVIEW_NOTE.md** — Source/wording review for CT sign-off

### Files Updated

- data/incident-index.json (11 entries)
- site/data/incident-index.json (11 entries)
- PROJECT_STATE.md
- NEXT_ACTIONS.md
- CHANGELOG.md
- README.md
- ROADMAP.md
- ROADMAP_NEXT_PHASES.md

---

## Key Decisions

### DEC-T038-001: Record Framing

Frame as professional society guidance revision based on emerging evidence. Avoid accusatory language. No named entity wrongdoing. Neutral, factual description of algorithmic practice reassessment.

### DEC-T038-002: Source Selection

Primary: ATS official statement (Tier 1). Secondary: PubMed/NIH academic index (Tier 2). Both public domain. URL citation only.

### DEC-T038-003: Governance Status

INC-0011 explicitly NOT covered by prior G-01/G-02 approval. Separate CT sign-off required. Documented in INC0011_GOVERNANCE_REVIEW_NOTE.md.

---

## Safety Confirmation

| Constraint | Status |
|---|---|
| One record only | Verified |
| CAND-013 only | Verified |
| No scraping | Verified |
| No bulk downloads | Verified |
| No copied text | Verified |
| No DNS/CNAME changes | Verified |
| G-01/G-02 scope preserved | Verified |

---

## Validation Results

- `python3 tools/validate_dataset.py` — PASS (11 records)
- Root/site data sync — Verified
- No CNAME/internal docs in site/ — Verified
- Git clean — Verified

---

## Next Step

T039 — INC-0011 Source/Wording Gate Sign-Off + Live Smoke Test

---

**Not legal advice.**
