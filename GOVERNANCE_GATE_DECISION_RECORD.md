# Governance Gate Decision Record — caesar-ai-incident-atlas

**Task:** T029 — Governance Gate Decision Pack + Optional G-01/G-02 Sign-Off Recording  
**Date:** 20 May 2026  
**Version:** 0.6.6
**Branch:** `governance/T029-gate-decision-pack`
**Status:** Decision record prepared — NOT LEGAL ADVICE
**T030 Update:** Counsel follow-up packet prepared: `COUNSEL_REVIEW_PACKET_INC0006.md`. Narrow review question and four decision options (A–D) provided for CT/counsel. Exact optional CT sign-off language included. No approval recorded. G-01/G-02 remain pending.

---

## 1. Current Public MVP Status

| Item | Status |
|---|---|
| Technical Public MVP | ✅ **LIVE + VERIFIED** at `https://atlas.caesar.no/` |
| Version | v0.6.4 |
| Dataset | 10 records (INC-0001 through INC-0010) |
| G-10 | ✅ **PASS** — Control Tower manual browser confirmation on 20 May 2026 |
| G-01 | ⚠ **Pending** — source/license review requires CT sign-off |
| G-02 | ⚠ **Pending** — wording/legal-risk review requires CT/counsel sign-off |
| Not legal advice | This document does not constitute legal advice |

**Live site verification (20 May 2026):**
- `https://atlas.caesar.no/` → HTTP 200 ✅
- `https://atlas.caesar.no/data/incident-index.json` → HTTP 200 ✅  
- `https://atlas.caesar.no/robots.txt` → HTTP 200 ✅
- `https://atlas.caesar.no/sitemap.xml` → HTTP 200 ✅
- GitHub Pages workflow: latest deploy successful ✅

---

## 2. G-01 Source/License Status Table (INC-0001–INC-0010)

| ID | Current Source-Risk Status | Source Basis | Recommended Decision | Notes |
|---|---|---|---|---|
| INC-0001 | Ready for sign-off | US Federal Court record (RECAP) — public domain | Ready for sign-off | Mata v. Avianca — court docket, lowest risk |
| INC-0002 | Ready for sign-off | NTSB federal agency report — public domain | Ready for sign-off | HWY18MH010 — government work, lowest risk |
| INC-0003 | Ready for sign-off | Canadian Tribunal decision — public domain | Ready for sign-off | Moffatt v. Air Canada — tribunal decision |
| INC-0004 | Ready for sign-off | Dutch Court decision — public domain | Ready for sign-off | ECLI:NL:RBDHA:2020:1878 — court ruling |
| INC-0005 | Sign-off with caution | Court record + NIST + ACLU (T026 hardened) | Sign-off with caution | CourtListener/RECAP + NIST public domain anchors |
| INC-0006 | Needs counsel review | Reuters investigative report only | Needs counsel review | **Last remaining Reuters citation issue** |
| INC-0007 | Ready for sign-off | Meta company statements | Ready for sign-off | Company statements used as source |
| INC-0008 | Sign-off with caution | Microsoft + UK OSA + US DEFIANCE Act (T026) | Sign-off with caution | Two public-domain legislative sources added |
| INC-0009 | Sign-off with caution | Science + PubMed/NIH (T026 hardened) | Sign-off with caution | NIH/PubMed public domain reduces AAAS reliance |
| INC-0010 | Ready for sign-off | EEOC guidance + NYC LL144 — public domain | Ready for sign-off | Government sources, lowest risk |

### G-01 Summary

| Category | Count | Records |
|---|---|---|
| Ready for sign-off | 6 | INC-0001, INC-0002, INC-0003, INC-0004, INC-0007, INC-0010 |
| Sign-off with caution | 3 | INC-0005, INC-0008, INC-0009 |
| Needs counsel review | 1 | **INC-0006** (Reuters citation) |
| Needs source replacement | 0 | — |

**Key Issue:** INC-0006 remains the only material G-01 caution item because it relies on Reuters URL citation. T027 targeted source search found no safer public-domain replacement.

---

## 3. G-02 Wording/Legal-Risk Status Table (INC-0001–INC-0010)

| ID | Wording Risk Status | Hedge/Source Attribution Status | Recommended Decision | Notes |
|---|---|---|---|---|
| INC-0001 | Ready for sign-off | ✅ "According to court order", "court found" | Ready for sign-off | Direct paraphrase of court findings |
| INC-0002 | Ready for sign-off | ✅ "NTSB report stated" | Ready for sign-off | Factual per official report |
| INC-0003 | Ready for sign-off | ✅ "Tribunal found" | Ready for sign-off | Direct paraphrase of tribunal decision |
| INC-0004 | Ready for sign-off | ✅ "Court found" | Ready for sign-off | Direct paraphrase of judicial finding |
| INC-0005 | Ready for sign-off | ✅ "Contributes to" hedging | Ready for sign-off | Individual not named; source cited |
| INC-0006 | Sign-off with caution | ✅ "Reportedly" hedging throughout | Sign-off with caution | Company characterization; adequate hedging |
| INC-0007 | Ready for sign-off | ✅ "Incorrectly removes" describes outcome | Ready for sign-off | Meta's own statements used |
| INC-0008 | Ready for sign-off | ✅ Confidence: medium displayed | Ready for sign-off | Medium confidence flagged appropriately |
| INC-0009 | Ready for sign-off | ✅ "Systematically underestimate" per paper | Ready for sign-off | Vendor acknowledged findings |
| INC-0010 | Ready for sign-off | ✅ Clarified as guidance, not enforcement | Ready for sign-off | Medium confidence appropriately flagged |

### G-02 Summary

| Category | Count | Records |
|---|---|---|
| Ready for sign-off | 9 | INC-0001, INC-0002, INC-0003, INC-0004, INC-0005, INC-0007, INC-0008, INC-0009, INC-0010 |
| Sign-off with caution | 1 | INC-0006 (company characterization) |
| Needs counsel review | 0 | — |
| Needs wording revision | 0 | — |

**Key Finding:** All 10 records use appropriate hedging language. No legal conclusions asserted. No private individuals named. G-02 wording is fundamentally sound; only INC-0006 carries caution due to source risk, not wording issues.

---

## 4. INC-0006 Decision Section

**Current State:** INC-0006 relies solely on Reuters investigative report (October 2018). T027 targeted search found no safer public-domain or official-record source.

**Options for CT/Counsel:**

### Option A — Accept Reuters URL citation with caution for MVP
- Keep INC-0006 as currently worded
- Accept "Sign-off with caution" for G-01
- Document that Reuters citation is reference-only, no text reproduced
- Residual risk: company did not publicly confirm all reported details

### Option B — Seek narrow counsel confirmation
- Counsel reviews single question: Is citing a Reuters article URL (without text reproduction) acceptable in non-commercial knowledge-base context?
- If confirmed: proceed with Option A
- if rejected: evaluate Options C/D

### Option C — Temporarily de-emphasize in future distribution
- Keep record in MVP but flag for reduced prominence in broader distribution
- Add caution note in any marketing or high-profile materials
- Seek replacement source for future versions

### Option D — Replace/remove (future CT approval only)
- Remove INC-0006 from public dataset (not recommended for MVP)
- Replace only if qualifying source becomes available
- Requires explicit CT approval

**T027 Recommendation:** Option B (seek narrow counsel confirmation) with fallback to Option A if acceptable.

---

## 5. Final Decision Section

**Explicit Approval Check:** Task prompt does not contain required explicit approval statements:
- Missing: "CT approves G-01 source/license sign-off with INC-0006 Reuters citation accepted with caution."
- Missing: "CT approves G-02 wording/legal-risk sign-off for current public MVP wording."

**Current Status:** G-01 and G-02 remain PENDING.

### G-01 Decision:
- **Status:** PENDING
- **Blocker:** INC-0006 Reuters citation requires counsel review
- **Other records:** 9 ready (6 ready for sign-off, 3 sign-off with caution)
- **Recommended next step:** Seek narrow counsel confirmation on Reuters URL citation acceptability

### G-02 Decision:
- **Status:** PENDING  
- **Assessment:** All 10 records wording-ready (9 ready for sign-off, 1 sign-off with caution)
- **Blocker:** Requires CT/counsel formal review process
- **Recommended next step:** CT/counsel can proceed with review - wording is sound

### Reviewer:
- **Status:** Placeholder pending explicit CT/counsel review

### Date:
- **Status:** 20 May 2026 (decision packet prepared)

### Notes:
- Technical Public MVP remains LIVE + VERIFIED
- No records, sources, or legal content changed in T029
- INC-0006 remains the sole material source-risk item
- All other records ready for sign-off with appropriate caution levels
- Decision packet prepared for CT/counsel review

---

## 6. Safety Confirmation

**No changes made to:**
- Incident records or data
- Source URLs or legal content  
- DNS, CNAME, or hosting configuration
- Site functionality or deployment

**T029 scope:**
- Documentation only (decision record preparation)
- No approval claimed without explicit CT statements
- No legal advice provided

---

## References

- `COUNSEL_REVIEW_PACKET_INC0006.md` — T030 narrow counsel follow-up packet
- `GOVERNANCE_SIGNOFF_PACK.md` — Current G-01/G-02 review tables
- `INC0006_SOURCE_RISK_DECISION_PACKET.md` — Detailed INC-0006 analysis
- `SOURCE_RISK_HARDENING_REPORT.md` — T026/T027 source improvements
- `PUBLICATION_RISK_GATE.md` — Current gate status
- `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` — Gate evidence assessment

---

**Disclaimer:** This document does not constitute legal advice. Final legal clearance and source approval must be provided by qualified legal counsel or Control Tower.
