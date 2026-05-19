# Dataset MVP — Public Readiness Review

> **Task:** T011 — Dataset MVP Public Readiness Review  
> **Date:** 19 May 2026  
> **Scope:** INC-0001 through INC-0010  
> **Prior QA:** `FIRST_RECORD_BATCH_QA_REPORT.md` (T008), `DATASET_MVP_REVIEW_REPORT.md` (T009), `SECOND_WAVE_QA_REPORT.md` (T010)

---

## 1 — Internal Consistency

| Check | Result |
|---|---|
| Total records | 10 (INC-0001–INC-0010) |
| Schema: all 10 pass `jsonschema` Draft 2020-12 | ✅ PASS |
| Taxonomy: all FM/CTL/sector/EV/severity/confidence refs valid | ✅ PASS |
| No INC-0011+ | ✅ PASS |
| All records use `source_type` (not deprecated `database`) | ✅ PASS |
| `incident_id` sequence: INC-0001–INC-0010 contiguous | ✅ PASS |
| `date` field format consistent across all records | ✅ PASS |
| No duplicate incident_id values | ✅ PASS |

**Internal consistency: fully consistent. No issues.**

---

## 2 — Sector & Failure Mode Coverage

| Sector | Records | FM Coverage |
|---|---|---|
| `legal-compliance` | INC-0001 | FM-HALL, FM-REL |
| `transportation-autonomous` ⚠️ draft | INC-0002 | FM-SAFE, FM-REL |
| `retail-ecommerce` ⚠️ draft | INC-0003 | FM-HALL, FM-UNAUTH |
| `public-sector` | INC-0004 | FM-BIAS, FM-TRANS, FM-UNAUTH |
| `law-enforcement` | INC-0005 | FM-BIAS, FM-TRANS |
| `hiring-employment` | INC-0006, INC-0010 | FM-BIAS; FM-BIAS, FM-TRANS |
| `media-content` | INC-0007, INC-0008 | FM-REL, FM-TRANS; FM-PRIV, FM-SAFE, FM-UNAUTH |
| `healthcare-medical` | INC-0009 | FM-BIAS, FM-REL |

**7 distinct sectors. 8 distinct FM IDs used.** Two draft sectors (INC-0002, INC-0003) — see risks below.

---

## 3 — Record Strength Assessment

### Strongest (primary official source — court/government/tribunal)

| ID | Title (short) | Source | Confidence |
|---|---|---|---|
| INC-0001 | LLM fabricated court citations | US federal court order | high |
| INC-0002 | AV pedestrian fatality | NTSB HWY18MH010 | high |
| INC-0003 | Air Canada chatbot contract | BC CRT tribunal ruling | high |
| INC-0004 | Dutch SyRI welfare system | Hague District Court | high |
| INC-0009 | Healthcare algorithm racial bias | Obermeyer et al., Science | high |

### Strong (company-acknowledged or major investigative)

| ID | Title (short) | Source | Confidence |
|---|---|---|---|
| INC-0005 | Facial recognition wrongful arrest | ACLU + NIST FRVT | high |
| INC-0006 | AI recruitment gender bias | Reuters investigative | high |
| INC-0007 | COVID-19 content moderation over-removal | Meta company statement | high |

### Adequate with caution label

| ID | Title (short) | Source | Confidence | Caution |
|---|---|---|---|---|
| INC-0008 | AI-generated NCII platform restrictions | Microsoft blog + UK OSA | medium | Platform safety response anchor; no regulatory ruling |
| INC-0010 | EEOC guidance on AI hiring discrimination | EEOC guidance + NYC LL144 | medium | Regulatory guidance level; no specific enforcement case |

---

## 4 — What Must Be Fixed Before Public Display

| Item | Severity | Action |
|---|---|---|
| `transportation-autonomous` sector — draft status | Low | Add caution label or stabilise ID before public display |
| `retail-ecommerce` sector — draft status | Low | Same as above |
| FM-REL — draft status (INC-0002, INC-0007, INC-0009) | Low | Add caution label or stabilise before public display |
| INC-0008: Microsoft blog URL may change | Low | Monitor; consider adding DOI/archived URL if available |
| INC-0010: No specific enforcement case | Low | Display with confidence: medium; add caution label |

**No blocking corrections required to the JSON records themselves.** All fixes are presentational or documentation-level.

---

## 5 — Recommendation

> **✅ Ready with caveats.**

The 10-record Dataset MVP is internally consistent, fully schema-valid, taxonomy-compliant, and covers 7 sectors and 8 failure modes. It is suitable for minimal public presentation planning (T012).

**Caveats before public display:**
1. Two draft sector IDs must be either stabilised in taxonomy or displayed with a "draft taxonomy" label.
2. FM-REL draft status should be labelled.
3. INC-0008 and INC-0010 (confidence: medium) should display confidence level visibly.
4. No record should be displayed without a clear "as of [date]" access stamp and a note that sources have not been independently re-verified at the time of public display.

None of these caveats require record changes before T012 planning begins.
