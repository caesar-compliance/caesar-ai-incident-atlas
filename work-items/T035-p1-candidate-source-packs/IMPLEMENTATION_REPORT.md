# T035 — Implementation Report

**Task:** T035 — P1 Candidate Source Pack Planning
**Branch:** `planning/T035-p1-candidate-source-packs`
**Date:** 20 May 2026
**Version:** 0.7.3
**Status:** Complete — Planning only — NOT legal advice

---

## Summary

T035 completed source-pack planning for all 8 P1 candidates from T034. Sources were manually identified via web lookup; no scraping or bulk downloads were performed. No records were created. No candidates were approved. A first drafting batch of 4 candidates is recommended for CT selection.

## Starting State

| Field | Value |
|---|---|
| Starting main commit | `7187abd` (T034 merge) |
| Branch | `planning/T035-p1-candidate-source-packs` |
| Dataset at task start | 10 records — INC-0001–INC-0010 |

## Files Created

| File | Description |
|---|---|
| `P1_CANDIDATE_SOURCE_PACKS.md` | Full source packs for all 8 P1 candidates: source URLs, tiers, risk assessments, drafting readiness |
| `P1_CANDIDATE_SOURCE_RISK_MATRIX.md` | Overview table, readiness ranking, defer/exclusion list, source tier summary |
| `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` | First batch of 4 recommended (CAND-013, CAND-008, CAND-011, CAND-010); 4 deferred |
| `work-items/T035-p1-candidate-source-packs/TASK.md` | Task scope checklist |
| `work-items/T035-p1-candidate-source-packs/VALIDATION.md` | Validation checklist |
| `work-items/T035-p1-candidate-source-packs/IMPLEMENTATION_REPORT.md` | This file |
| `work-items/T035-p1-candidate-source-packs/DECISIONS.md` | 10 decisions (DEC-T035-001–010) |

## Files Updated

| File | Change |
|---|---|
| `CHANGELOG.md` | `[0.7.3]` entry added |
| `ROADMAP.md` | T035 block added |
| `ROADMAP_NEXT_PHASES.md` | v0.7 status updated; T036 as next step |
| `PROJECT_STATE.md` | v0.7.3; T035 complete |
| `NEXT_ACTIONS.md` | T035 complete; T036 recommended |
| `REPO_INVENTORY.md` | T035 files indexed |
| `README.md` | Project status updated |

## Source Pack Summary

| Candidate | Tier 1 Found | Readiness | Counsel Needed |
|---|---|---|---|
| CAND-001 | CFPB Circulars | `source_pack_ready_for_CT_review` | No |
| CAND-002 | ⚠️ Partial only | `needs_primary_source` | No (if found) |
| CAND-003 | PMC Tier 2 | `source_pack_ready_for_CT_review` | No |
| CAND-004 | Wis. Sup. Ct. | `needs_counsel_gate` | **Yes** |
| CAND-008 | EEOC + DOJ | `source_pack_ready_for_CT_review` | No |
| CAND-010 | Court orders | `source_pack_ready_for_CT_review` | No |
| CAND-011 | ICO statement | `source_pack_ready_for_CT_review` | No |
| CAND-013 | ATS + 3×Tier 2 | `source_pack_ready_for_CT_review` | No |

**First batch recommendation:** CAND-013, CAND-008, CAND-011, CAND-010.

## Validation Results

| Check | Result |
|---|---|
| `python3 tools/validate_dataset.py` | ✅ PASS — 10 records |
| `git diff --check` | ✅ CLEAN |
| No INC-0011+ files | ✅ Confirmed |
| `site/` unchanged | ✅ Confirmed |
| No CNAME/DNS/hosting changes | ✅ Confirmed |
| No G-01/G-02 expansion | ✅ Confirmed |

## Confirmation Statements

- **Dataset**: 10 records only. INC-0001–INC-0010. No new records created.
- **Site exposure**: None. `site/` unchanged.
- **Candidates**: All 8 P1 candidates reviewed; all remain `not_approved_candidate`.
- **Approval scope**: Unchanged — current 10-record public MVP only.

## Recommended Next Step

**T036 — CT First Drafting Batch Selection.** CT reviews `P1_CANDIDATE_PRIORITIZATION_RECOMMENDATION.md` and selects which candidates from the batch-1 list (CAND-013, CAND-008, CAND-011, CAND-010) to proceed with. CT provides explicit written approval for each selected candidate. Planning only — no record creation until CT approval received.

**Disclaimer:** Not legal advice. No candidates approved.
