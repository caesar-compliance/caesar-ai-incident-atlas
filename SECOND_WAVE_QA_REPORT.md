# Second Wave — QA Report

> **Task:** T010 — Second-Wave Incident Record Batch  
> **Branch:** `data/T010-second-wave-incident-record-batch`  
> **Prepared:** 19 May 2026  
> **Scope:** INC-0005 through INC-0010 (CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015)  
> **Validator:** Python `jsonschema` 4.23.0, `Draft202012Validator`

---

## 1 — Records Created

| ID | Filename | Candidate | Sector | Severity | Confidence |
|---|---|---|---|---|---|
| INC-0005 | `INC-0005-facial-recognition-wrongful-arrest-law-enforcement.json` | CAND-002 | `law-enforcement` | high | high |
| INC-0006 | `INC-0006-ai-recruitment-tool-gender-bias-discontinued.json` | CAND-004 | `hiring-employment` | medium | high |
| INC-0007 | `INC-0007-content-moderation-over-removal-covid19-pandemic.json` | CAND-005 | `media-content` | medium | high |
| INC-0008 | `INC-0008-ai-image-generation-ncii-platform-restrictions.json` | CAND-009 | `media-content` | high | medium |
| INC-0009 | `INC-0009-healthcare-algorithm-racial-bias-resource-allocation.json` | CAND-010 | `healthcare-medical` | high | high |
| INC-0010 | `INC-0010-eeoc-guidance-ai-hiring-tools-discrimination-risk.json` | CAND-015 | `hiring-employment` | medium | medium |

**Candidates skipped:** None. All 6 passed the source gate.

---

## 2 — Schema Compatibility

**Validator:** `jsonschema` 4.23.0, `Draft202012Validator`  
**Schema:** `schemas/incident.schema.json`

| Record | Result | Errors |
|---|---|---|
| INC-0005 | ✅ PASS | 0 |
| INC-0006 | ✅ PASS | 0 |
| INC-0007 | ✅ PASS | 0 |
| INC-0008 | ✅ PASS | 0 |
| INC-0009 | ✅ PASS | 0 |
| INC-0010 | ✅ PASS | 0 |

**All 6 records: PASS. Zero schema violations.**

---

## 3 — Taxonomy Compatibility

All taxonomy references validated against:
- `data/taxonomy/failure_modes.json`
- `data/taxonomy/controls.json`
- `data/taxonomy/sectors.json`
- `data/taxonomy/evidence_types.json`
- `data/taxonomy/severity_levels.json`
- `data/taxonomy/confidence_levels.json`

**Result: zero taxonomy issues.**

### Failure Mode Coverage (second wave)

| FM ID | Status | Records |
|---|---|---|
| FM-BIAS | stable | INC-0005, INC-0006, INC-0008, INC-0009, INC-0010 |
| FM-TRANS | stable | INC-0005, INC-0007, INC-0010 |
| FM-REL | draft | INC-0007, INC-0009 |
| FM-PRIV | stable | INC-0008 |
| FM-SAFE | stable | INC-0008 |
| FM-UNAUTH | stable | INC-0008 |

Note: FM-REL draft status — taxonomy `usage_note` permits top-level FM-REL in v0.2 records (per DEC-064 T009).

### Sector Coverage (second wave)

| Sector ID | Status | Records |
|---|---|---|
| `law-enforcement` | stable | INC-0005 |
| `hiring-employment` | stable | INC-0006, INC-0010 |
| `media-content` | stable | INC-0007, INC-0008 |
| `healthcare-medical` | stable | INC-0009 |

**Note:** All 4 new sectors used in second-wave records are confirmed stable IDs in `data/taxonomy/sectors.json`. No draft sectors used in second-wave records.

### Control Coverage (second wave)

| CTL ID | Status | Records |
|---|---|---|
| CTL-TEST-002 | stable | INC-0005, INC-0006, INC-0009, INC-0010 |
| CTL-OVER-001 | stable | INC-0005, INC-0006, INC-0007, INC-0008, INC-0009, INC-0010 |
| CTL-DOC-002 | stable | INC-0005, INC-0010 |
| CTL-RISK-001 | stable | INC-0005, INC-0006, INC-0009, INC-0010 |
| CTL-MON-001 | stable | INC-0007 |
| CTL-INC-001 | stable | INC-0007 |
| CTL-TEST-001 | stable | INC-0008 |
| CTL-VEN-001 | stable | INC-0008 |
| CTL-DOC-001 | stable | INC-0008, INC-0009 |

---

## 4 — Citation Completeness

| Record | Sources | Source Types | Canonical Reference |
|---|---|---|---|
| INC-0005 | 2 | `credible_media`, `agency_report` | ACLU case documentation + NIST FRVT Part 3 |
| INC-0006 | 1 | `credible_media` | Reuters Oct 2018 (hedging language applied) |
| INC-0007 | 2 | `company_statement` × 2 | Meta Transparency Centre + Meta COVID-19 blog |
| INC-0008 | 2 | `company_statement`, `regulator_report` | Microsoft safety announcement + UK OSA s.188 |
| INC-0009 | 1 | `academic_paper` | Obermeyer et al., Science DOI stable |
| INC-0010 | 2 | `regulator_report` × 2 | EEOC guidance + NYC Local Law 144 |

All records have at least one source. All sources have `url`, `source_type`, `accessed`, and `title`. No `database` field used. All source types from schema enum.

---

## 5 — Source Quality Assessment

| Record | Source Category | Quality | Notes |
|---|---|---|---|
| INC-0005 | ACLU civil litigation documentation + primary NIST government report | Strong | Dual-source; NIST is primary official |
| INC-0006 | Reuters investigative media | Strong secondary | No direct company confirmation; hedging applied |
| INC-0007 | Company-acknowledged (Meta public statement) | Strong | Platform self-acknowledged software bug |
| INC-0008 | Named company safety announcement | Medium-Strong | Specific anchor; broader pattern is well-documented |
| INC-0009 | Peer-reviewed academic, Science journal | Strong | DOI-stable; vendor acknowledged findings |
| INC-0010 | Primary EEOC regulatory guidance + municipal law | Strong regulatory | No specific enforcement case confirmed |

---

## 6 — Naming Policy Compliance

| Record | Check | Result |
|---|---|---|
| INC-0005 | Victim not named; ACLU case cited without naming individual | ✅ PASS |
| INC-0006 | Company (Amazon) referenced as consistent with public record; no individual employees named | ✅ PASS |
| INC-0007 | Platform (Meta/Facebook) named as per company statements; no individuals named | ✅ PASS |
| INC-0008 | Platform (Microsoft) named per company statement; no victims named or described | ✅ PASS |
| INC-0009 | Vendor not named in record (vendor acknowledged findings in published reporting; conservative approach taken) | ✅ PASS |
| INC-0010 | No individual named; EEOC and NYC regulatory bodies referenced as institutions | ✅ PASS |

---

## 7 — No Unsupported Legal Conclusions

| Record | Check | Result |
|---|---|---|
| INC-0005 | No finding of unlawful conduct beyond ACLU documentation; framed as "contributed to wrongful arrest" | ✅ PASS |
| INC-0006 | No legal finding of discrimination made; framed as "reportedly" and "according to" | ✅ PASS |
| INC-0007 | No legal finding; framed as platform-acknowledged error | ✅ PASS |
| INC-0008 | No finding of unlawful conduct; framed as harms and platform response | ✅ PASS |
| INC-0009 | No legal finding; framed as study findings and vendor acknowledgement | ✅ PASS |
| INC-0010 | EEOC guidance is official legal guidance — cited accurately without overstating enforcement outcomes | ✅ PASS |

---

## 8 — No Copied Source Text

All summaries and field values are written in Caesar's own words. No verbatim copying from source documents. Source titles and URLs are attributed. **PASS.**

---

## 9 — No External Dataset Import

No external dataset imported. All record content derived from documented public sources via existing dossier information and taxonomy files. **PASS.**

---

## 10 — No License Conflicts Identified

| Source | Type | License | Conflict |
|---|---|---|---|
| ACLU case documentation | Civil rights advocacy publication | Public / press release | None identified |
| NIST FRVT Part 3 | US government report | US government public domain | None |
| Reuters article | Credible media (cited; not reproduced) | Cited only; no text copied | None |
| Meta company statements | Company public blog | Cited only; no text copied | None |
| Microsoft On the Issues blog | Company public blog | Cited only; no text copied | None |
| UK Online Safety Act | UK legislation | Open Government Licence | None |
| Obermeyer et al., Science | Academic journal (DOI cited) | Cited only; no text copied | None |
| EEOC guidance | US government publication | US government public domain | None |
| NYC Local Law 144 | Municipal legislation | Public domain | None |

**No license conflicts identified.** Clean Room Policy and SOURCE_AND_CITATION_POLICY_DRAFT.md requirements met.

---

## 11 — Unresolved Risks

| Record | Risk | Status |
|---|---|---|
| INC-0005 | Detroit case civil settlement details not fully publicly confirmed | ⚠️ Residual — ACLU documentation adequate |
| INC-0006 | No direct company confirmation of Reuters findings | ⚠️ Residual — hedging language applied; well-established public record |
| INC-0008 | Microsoft blog URL may change; DEFIANCE Act US status not confirmed as enacted at record date | ⚠️ Residual — canonical reference is date+subject; OSA separately cited |
| INC-0009 | Vendor's primary statement URL not included in record | ⚠️ Residual — vendor acknowledgement is documented in published literature |
| INC-0010 | No specific EEOC enforcement case confirmed; confidence rated medium | ⚠️ Unresolved — appropriate for guidance-level record; upgrade possible if enforcement case identified in T011+ |
| INC-0008 | Broader NCII pattern diffuse across platforms; specific victim details excluded per policy | ✅ Handled — framing is platform-level governance failure |

---

## 12 — Constraint Confirmation

| Constraint | Result |
|---|---|
| Records created: 6 (INC-0005 through INC-0010) | ✅ |
| No INC-0011 or higher | ✅ |
| Only CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015 | ✅ |
| No records for CAND-001, 007, 008, 013, 014 | ✅ |
| No fake/sample records | ✅ |
| No external dataset import | ✅ |
| No product code / scraper / static site / CLI / database | ✅ |
| No external repo cloned | ✅ |
| No third-party files/data/code copied | ✅ |
| All records pass formal schema validation | ✅ |
| All taxonomy references valid | ✅ |

---

## 13 — Overall Assessment

All 6 second-wave records created, formally validated, and QA-reviewed. Zero schema violations. Zero taxonomy issues. All naming policy requirements met. No unsupported legal conclusions. No copied source text. The second-wave dataset batch is complete.
