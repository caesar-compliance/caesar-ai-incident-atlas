# Governance Sign-Off Pack — caesar-ai-incident-atlas

**Task:** T025 — Source/License + Wording Review Sign-Off Pack (updated T026 — Source Risk Hardening; updated T027 — INC-0006 Source Risk Decision Packet; updated T040 — INC-0012 added)
**Date:** 20 May 2026
**Version:** 0.6.7
**Status:** ✅ G-01 APPROVED with caution · ✅ G-02 APPROVED with caution — NOT LEGAL ADVICE
**T026 Update:** INC-0005 court record added; INC-0008 US DEFIANCE Act record added; INC-0009 NIH/PubMed record added. INC-0009 moved from Needs counsel review → Sign-off with caution. INC-0006 unchanged — counsel review still recommended.
**T027 Update:** Targeted source search for INC-0006 completed (20 May 2026). No safer public-domain replacement source found. Reuters remains sole primary source. No data or wording changes. Decision packet created: `INC0006_SOURCE_RISK_DECISION_PACKET.md`. INC-0006 G-01 status remains Needs counsel review. Recommended CT action: seek narrow counsel confirmation on Reuters URL citation acceptability before G-01 final sign-off.
**T029 Update:** Governance gate decision record prepared: `GOVERNANCE_GATE_DECISION_RECORD.md`. No explicit CT approval statements received in task prompt. G-01/G-02 remain pending. Decision packet ready for CT/counsel review.
**T030 Update:** Counsel follow-up packet prepared: `COUNSEL_REVIEW_PACKET_INC0006.md`. Narrow review question and four decision options (A–D) provided for CT/counsel. Exact optional CT sign-off language included. No approval recorded. G-01/G-02 remain pending. INC-0006 remains counsel-review/caution item.
**T031 Update:** Explicit CT approval received (20 May 2026). G-01 and G-02 approved with caution for current 10-record public MVP. INC-0006 Reuters citation accepted with caution. See §5 for recorded sign-off. Not legal advice. Does not approve future records, scraping, external datasets, broader distribution, or copied third-party text.
**T038 Update:** INC-0011 added under CT approval. G-01/G-02 approval for INC-0001–INC-0010 does not automatically extend to INC-0011. See `INC0011_GATE_SIGNOFF_RECORD.md`.
**T040 Update:** INC-0012 added from CAND-008 (AI hiring disability bias — EEOC + DOJ ADA guidance). Dataset now 12 records. INC-0012 review status: `prepared_for_CT_review`. G-01/G-02 approval for INC-0001–INC-0011 does not extend to INC-0012. See `INC0012_GOVERNANCE_REVIEW_NOTE.md`.

---

## 1. Status Summary

| Item | Status |
|---|---|
| Technical Public MVP | ✅ LIVE + VERIFIED at `https://atlas.caesar.no/` |
| Version | v0.6.2 |
| G-10 Browser smoke test | ✅ PASS (CT confirmation 20 May 2026) |
| G-01 Source/license review | ✅ **APPROVED with caution** — 20 May 2026, INC-0006 Reuters citation accepted with caution |
| G-02 Wording/legal-risk review | ✅ **APPROVED with caution** — 20 May 2026, current public MVP wording cleared |
| Dataset | 10 records (INC-0001 through INC-0010) — no new records added |
| No legal advice | This document does not constitute legal advice |

---

## 2. G-01 Source/License Review Table (INC-0001–INC-0010)

| ID | Title | Source Category | Primary Source Type | Risk Level | Source URL Present | Short Summary Only | CT Decision | Note |
|---|---|---|---|---|---|---|---|---|
| INC-0001 | Attorney submits court filings containing AI-generated fabricated case citations | US Federal Court | Court record (RECAP) | Public domain — lowest risk | ✅ Yes | ✅ Yes — original wording, court finding paraphrased | Ready for sign-off | Mata v. Avianca — public domain US federal court record |
| INC-0002 | Autonomous vehicle fatally strikes pedestrian during public road testing | US Federal Agency | Agency report (NTSB) | Public domain — lowest risk | ✅ Yes | ✅ Yes — NTSB findings paraphrased | Ready for sign-off | NTSB HWY18MH010 — public domain US government work |
| INC-0003 | Airline chatbot provides incorrect fare policy information | Canadian Tribunal | Tribunal decision | Public domain — lowest risk | ✅ Yes | ✅ Yes — tribunal finding paraphrased | Ready for sign-off | Moffatt v. Air Canada — public domain Canadian tribunal decision |
| INC-0004 | Dutch court finds automated welfare risk-scoring system incompatible with fundamental rights | Dutch Court | Court decision | Public domain — lowest risk | ✅ Yes | ✅ Yes — court ruling paraphrased | Ready for sign-off | ECLI:NL:RBDHA:2020:1878 — public domain Dutch court decision |
| INC-0005 | Facial recognition misidentification contributes to wrongful arrest | Court Record + Federal Research + NGO | Court docket (CourtListener/RECAP) + NIST FRVT + ACLU docs | Public domain court record + public domain NIST; ACLU supporting only | ✅ Yes | ✅ Yes — sources cited, no reproduction | Sign-off with caution | T026: court record added (Williams v. City of Detroit, E.D. Mich.) — NIST + court now primary anchors; ACLU demoted to supporting |
| INC-0006 | AI-based resume screening tool discontinued after reportedly penalising female candidates | News Media | Reuters investigative report | Fair use citation; Reuters T&Cs apply | ✅ Yes | ✅ Yes — "reportedly" hedging, no substantial copying | Needs counsel review | T027: targeted source search found no safer replacement. Reuters remains sole primary source. Decision packet: `INC0006_SOURCE_RISK_DECISION_PACKET.md`. Recommended CT action: seek counsel confirmation on Reuters URL citation. |
| INC-0007 | Automated content moderation system incorrectly removes legitimate health-related content | Company Statement | Meta company statements | Fair use citation; Meta terms apply | ✅ Yes | ✅ Yes — paraphrase only | Ready for sign-off | Meta's own statements used as source |
| INC-0008 | AI image generation tools used to produce non-consensual intimate imagery | Company + Legislation | Microsoft statement + UK OSA + US Congress (DEFIANCE Act) | Company statement fair use; UK legislation public domain; US legislation public domain | ✅ Yes | ✅ Yes — confidence: medium flagged | Sign-off with caution | T026: US DEFIANCE Act S.3696 congress.gov record added; two public-domain legislative sources now present; confidence medium per record |
| INC-0009 | Healthcare resource allocation algorithm found to systematically underestimate illness severity in Black patients | Academic Paper + Public Institutional | Science journal article + PubMed/NIH NLM index | AAAS reliance reduced; NIH NLM public domain index added | ✅ Yes | ✅ Yes — no paper text reproduced | Sign-off with caution | T026: PubMed PMID 31649194 (NIH NLM — public domain) added; AAAS sole-reliance concern materially reduced |
| INC-0010 | Regulatory guidance issued on discriminatory risk of AI-based hiring assessment tools | US Government + Local Law | EEOC guidance + NYC LL144 | Public domain — EEOC public; NYC law public | ✅ Yes | ✅ Yes — guidance described, not enforcement | Ready for sign-off | EEOC public domain; NYC LL144 public |

### G-01 Risk Summary

| Category | Count | Records |
|---|---|---|
| Ready for sign-off | 6 | INC-0001, INC-0002, INC-0003, INC-0004, INC-0007, INC-0010 |
| Sign-off with caution | 3 | INC-0005 (court record + NIST — T026), INC-0008 (company + 2× public legislation — T026), INC-0009 (Science + NIH/PubMed — T026) |
| Needs counsel review | 1 | INC-0006 (Reuters T&Cs — T027 targeted search found no safer replacement; decision packet prepared; counsel confirmation recommended) |
| Needs source replacement | 0 | — |

---

## 3. G-02 Wording/Legal-Risk Review Table (INC-0001–INC-0010)

| ID | Main Wording Risk | Defamation/Liability Risk | Sensitive Person/Entity | Hedged/Source-Attributed | CT Decision | Note |
|---|---|---|---|---|---|---|
| INC-0001 | Legal claims about counsel | Low | Attorneys named in public court order | ✅ Yes — "According to...", "court found" | Ready for sign-off | Direct paraphrase of court findings; no editorial addition |
| INC-0002 | Victim naming; company characterization | Low | Victim not named; operator described per NTSB | ✅ Yes — "NTSB report stated" | Ready for sign-off | Factual per official report; no editorial characterization |
| INC-0003 | Company liability claims | Low | Air Canada — public litigation | ✅ Yes — "tribunal found" | Ready for sign-off | Direct paraphrase of tribunal decision |
| INC-0004 | Government system criticism | Low | Dutch government — public litigation | ✅ Yes — "court found" | Ready for sign-off | Direct paraphrase of judicial finding |
| INC-0005 | Law enforcement + individual harm | Low | Individual not named in summary | ✅ Yes — "contributes to" hedging | Ready for sign-off | Porcha Woodridge not named; source cited |
| INC-0006 | Company characterization (Amazon) | Low-Medium | Amazon — publicly reported | ✅ Yes — "reportedly" hedging | Sign-off with caution | T027: wording review confirms adequate hedging. No wording changes required. "Reportedly" hedge present; company did not publicly confirm all details — stated in record. |
| INC-0007 | Platform criticism | Low | Meta — own statements used | ✅ Yes — "incorrectly removes" describes outcome | Ready for sign-off | Meta's own statements used; no defamatory characterization |
| INC-0008 | Platform operators + legislative context | Low | Microsoft — statement used | ✅ Yes — confidence: medium displayed | Ready for sign-off | Medium confidence flagged appropriately |
| INC-0009 | Healthcare system criticism | Low | Algorithm vendor acknowledged findings | ✅ Yes — "systematically underestimate" per paper | Ready for sign-off | Vendor acknowledged findings; no hospitals named |
| INC-0010 | Regulatory guidance (not enforcement) | Low | EEOC guidance (public domain) | ✅ Yes — clarified as guidance, not enforcement | Ready for sign-off | Medium confidence appropriately flagged |

### G-02 Risk Summary

| Category | Count | Records |
|---|---|---|
| Ready for sign-off | 9 | INC-0001, INC-0002, INC-0003, INC-0004, INC-0005, INC-0007, INC-0008, INC-0009, INC-0010 |
| Sign-off with caution | 1 | INC-0006 (company characterization — "reportedly" hedge present) |
| Needs counsel review | 0 | — |
| Needs wording revision | 0 | — |

---

## 4. High-Risk Wording Checklist

Reviewed against `SOURCE_AND_CITATION_POLICY_DRAFT.md` §5:

| Check | Status |
|---|---|
| Avoid stating intent unless source/court found it | ✅ All records comply |
| Avoid overclaiming causation | ✅ No "caused by" without hedging found |
| Avoid naming private individuals unless necessary/public | ✅ No private individuals named in summaries |
| Prefer "reported", "according to", "court found", "agency report stated" | ✅ All records use required hedging |
| Separate incident facts from governance lessons | ✅ Lessons clearly separated in record structure |
| No copied source passages | ✅ All summaries original wording per policy |

### Risky Terms Scan Results

Scanned for: "caused by", "proved", "illegal", "guilty", "fraud", "discriminated", "responsible for", "failed to"

| Term | Finding | Assessment |
|---|---|---|
| "caused by" | Not found in summaries | ✅ No risky causation claims |
| "proved" | Not found | ✅ No overclaiming certainty |
| "illegal" | Not found | ✅ No legal conclusions |
| "guilty" | Not found | ✅ No legal conclusions |
| "fraud" | Found in INC-0004 context only — "fraud detection" describes system's stated purpose per court case; not an accusation | ✅ Acceptable — describes government-stated purpose, not individual accusation |
| "discriminated" | Not found | ✅ No legal conclusions |
| "responsible for" | Not found | ✅ No liability assertions |
| "failed to" | Not found | ✅ No negligence claims |

**Red flags:** None. All risky terms are either absent or used in appropriate factual context (e.g., INC-0004 "fraud detection" describes the system's public purpose in a court case, not an accusation against individuals).

---

## 5. Final CT Sign-Off Section

### G-01 Source/License CT Decision

- [x] **Cleared with caveats:** INC-0006 Reuters citation accepted with caution — URL citation only, no text reproduced, all claims hedged with "reportedly". Residual risk accepted for non-commercial public MVP only.
- All other 9 records: 6 ready for sign-off (public-domain sources), 3 sign-off with caution (see §2 table).

**G-01 Approval:** "CT approves G-01 source/license sign-off with INC-0006 Reuters citation accepted with caution."
**G-01 Reviewer:** Control Tower / Artem
**G-01 Date:** 20 May 2026
**G-01 Notes:** Approval is narrow — current 10-record public MVP only. Does not approve future records, scraping, external dataset import, or copied third-party text. Not legal advice.

### G-02 Wording/Legal-Risk CT Decision

- [x] **All 10 record summaries cleared for public display** — with caution note for INC-0006.
- INC-0006: "reportedly" hedging present; no intentional discrimination claim; no legal liability conclusion; company did not publicly confirm all details — stated in record.

**G-02 Approval:** "CT approves G-02 wording/legal-risk sign-off for current public MVP wording."
**G-02 Reviewer:** Control Tower / Artem
**G-02 Date:** 20 May 2026
**G-02 Notes:** Approval covers current wording of all 10 records. Does not approve future wording changes, additional records, or broader distribution without separate review. Not legal advice.

### Overall Governance Sign-Off

- [x] **Governance review PARTIAL — conditions apply:** G-01 and G-02 approved with caution for current 10-record public MVP. INC-0006 caution note retained. Future records, dataset expansion, broader distribution, or wording changes require separate CT review.

**CT Final Signatory:** Control Tower / Artem
**Final Sign-Off Date:** 20 May 2026

---

## References

- `PUBLICATION_RISK_GATE.md` — Current gate status
- `PUBLIC_RELEASE_REVIEW_PACK.md` — Original source/license and wording review tables (T018A)
- `PUBLIC_RELEASE_GATE_CLOSURE_REPORT.md` — Gate evidence assessment (T019)
- `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` — Source license verification details (T004)
- `SOURCE_AND_CITATION_POLICY_DRAFT.md` — Wording rules and citation policy (T003)
- `PRODUCT_POLISH_BACKLOG.md` — Future work backlog (T024)
- `SOURCE_RISK_HARDENING_REPORT.md` — T026 source risk hardening detail (sources added, records changed, validation results)
- `PUBLIC_MVP_GOVERNANCE_GATE_CLOSEOUT.md` — T031 final gate closeout record

---

**Disclaimer:** This document does not constitute legal advice. Final legal clearance and source approval must be provided by qualified legal counsel or Control Tower.
