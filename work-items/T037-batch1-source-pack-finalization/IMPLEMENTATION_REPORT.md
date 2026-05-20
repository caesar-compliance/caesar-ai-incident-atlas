# T037 — Implementation Report

**Task:** T037 — Batch-1 Source Pack Finalization  
**Date:** 20 May 2026  
**Version:** 0.7.5  
**Branch:** planning/T037-batch1-source-pack-finalization

---

## Summary

Source pack finalization completed for 4 selected batch-1 candidates. All primary source URLs verified. No records created. No data changed. All candidates remain `not_approved_candidate`.

---

## Work Performed

### Source Verification

| Candidate | Sources Verified | Status |
|---|---|---|
| CAND-013 | ATS statement, PubMed PMID 38607551, ATS Journal | Confirmed accessible |
| CAND-008 | EEOC guidance, DOJ ADA guidance, Joint press release | Confirmed accessible |
| CAND-011 | ICO statement, Southern Co-op statement | Confirmed (ICO via search) |
| CAND-010 | Johnson v. Dunn (N.D. Ala.), CourtListener pattern | URL pattern confirmed |

### Documents Created

1. **BATCH1_FINAL_SOURCE_PACKS.md** — Per-candidate source verification
2. **BATCH1_DRAFTING_READINESS_MATRIX.md** — Readiness tables, drafting order, T038 options
3. **BATCH1_SOURCE_URL_REGISTER.md** — Source URLs with reproduction rules

### Documents Updated

- FIRST_DRAFTING_BATCH_SELECTION.md
- FIRST_DRAFTING_BATCH_GATE_MATRIX.md
- FUTURE_RECORD_DRAFTING_TASK_OUTLINE.md
- PROJECT_STATE.md
- NEXT_ACTIONS.md
- CHANGELOG.md
- ROADMAP.md
- ROADMAP_NEXT_PHASES.md
- README.md

---

## Key Findings

### Safest to Riskiest Drafting Order

1. **CAND-013** (Spirometry) — Strongest source base, clinical framing, no named individual
2. **CAND-008** (AI hiring disability) — Policy frame eliminates named-entity risk
3. **CAND-010** (LLM sanctions) — Court records authoritative; Johnson v. Dunn selected
4. **CAND-011** (ICO facial recognition) — Named company/vendor; requires accurate framing

### Recommended T038 Options

- **Option A:** Single candidate drafting (recommend CAND-013)
- **Option B:** Batch drafting (2–4 candidates)
- **Option C:** Refine further (not recommended — sources are sufficient)
- **Option D:** Defer drafting (CT decision)

---

## Safety Confirmation

| Constraint | Status |
|---|---|
| No new records | Verified |
| No data changes | Verified |
| No site changes | Verified |
| No DNS/CNAME changes | Verified |
| No scraping | Verified — manual search only |
| G-01/G-02 scope unchanged | Verified — 10-record MVP only |

---

## Next Step

T038 — CT Approval for First Record Drafting, or defer if CT wants additional refinement.

---

**Not legal advice.**
