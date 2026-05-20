# Counsel Review Packet — INC-0006 Reuters Citation

**Task:** T030 — INC-0006 Counsel Review Follow-Up Packet  
**Date:** 20 May 2026  
**Version:** 0.6.6  
**Branch:** `governance/T030-inc0006-counsel-followup`  
**Status:** Prepared for CT/counsel review — NOT LEGAL ADVICE  

---

## 1. Review Question

> **Is it acceptable for the current public MVP to retain INC-0006 with a Reuters URL citation and cautious, attributed wording, without reproducing Reuters text?**

This is the single narrow question requiring CT or counsel resolution before G-01 and G-02 can be formally signed off.

---

## 2. Current Record Status

| Field | Value |
|---|---|
| Record ID | INC-0006 |
| Title | AI-based resume screening tool discontinued after reportedly penalising female candidates |
| Source basis | Reuters investigative report, October 2018 — URL citation only |
| Source URL | `https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G` |
| Reuters text reproduced | No |
| Long quotes reproduced | No |
| Wording hedge | "Reportedly" used throughout; all claims source-attributed |
| Intentional discrimination claim | No |
| Legal liability conclusion | No |
| Company confirmation | Record states company did not publicly confirm all reported details |
| G-01 status | Needs counsel review |
| G-02 status | Sign-off with caution |
| Data change proposed | None — no change to INC-0006 in this packet |
| Safer source found (T027) | No — targeted search found no public-domain or official-record replacement |

---

## 3. Decision Options

### Option A — Accept with caution (recommended if no counsel concern)

- Keep INC-0006 in current public MVP as currently worded.
- Record G-01 as approved with caution — Reuters URL citation accepted as reference-only, no text reproduced.
- Record G-02 as approved with caution — current wording is adequately hedged with "reportedly".
- No broader legal clearance implied by this decision.
- Document: "CT accepts residual Reuters citation risk for current non-commercial MVP only."

### Option B — Seek narrow external counsel confirmation

- Keep G-01 and G-02 pending.
- Ask counsel only the narrow question in §1 above.
- Do not change the public site while counsel review is in progress, unless CT separately decides otherwise.
- If counsel confirms no issue: proceed to Option A decision language.
- If counsel flags a concern: evaluate Options C or D.

### Option C — Temporarily de-emphasize INC-0006

- Keep the record in the dataset and on the public site.
- Mark INC-0006 internally as a counsel-review item in governance docs.
- Consider reduced prominence (e.g., lower display order, UI caution note) only with explicit CT approval.
- Do not implement any de-emphasis in this task — requires a separate CT instruction.

### Option D — Remove or replace

- Not recommended without explicit CT approval.
- T027 targeted search found no suitable replacement source.
- Removal requires explicit CT decision; no removal implemented in this task.

---

## 4. Recommended CT Decision Language

If CT chooses to accept with caution (Option A), the following exact language may be used:

> **G-01:** "CT approves G-01 source/license sign-off with INC-0006 Reuters citation accepted with caution. URL citation only; no Reuters text reproduced; all claims hedged with 'reportedly'. Residual risk accepted for non-commercial public MVP only. Not legal advice."

> **G-02:** "CT approves G-02 wording/legal-risk sign-off for current public MVP wording. All 10 records use appropriate hedging. INC-0006 accepted with caution — 'reportedly' hedge present; no intentional discrimination claim; no legal liability conclusion."

These statements, if issued by CT, should be recorded in `GOVERNANCE_SIGNOFF_PACK.md` §5 and `GOVERNANCE_GATE_DECISION_RECORD.md` §5.

---

## 5. What This Packet Does Not Decide

- Not legal advice.
- Not counsel approval or confirmation.
- Not approval for future larger dataset or additional records.
- Not approval to copy or reproduce third-party text.
- Not approval for scraping, crawling, or dataset import.
- Not a change to any incident record, source URL, or legal content.
- Not a decision on G-01 or G-02 — those remain pending CT/counsel action.

---

## 6. Supporting References

| Document | Relevance |
|---|---|
| `INC0006_SOURCE_RISK_DECISION_PACKET.md` | Full INC-0006 source search, wording risk assessment, options analysis (T027) |
| `GOVERNANCE_GATE_DECISION_RECORD.md` | Current G-01/G-02 gate status and INC-0006 decision section (T029) |
| `GOVERNANCE_SIGNOFF_PACK.md` | G-01/G-02 review tables; CT sign-off section §5 |
| `SOURCE_RISK_HARDENING_REPORT.md` | T026/T027 source improvements and remaining issues |
| `PUBLICATION_RISK_GATE.md` | Full gate status (G-01/G-02 pending) |
| `data/incidents/INC-0006-ai-recruitment-tool-gender-bias-discontinued.json` | INC-0006 record (unchanged) |
| `site/data/incidents/INC-0006-ai-recruitment-tool-gender-bias-discontinued.json` | INC-0006 public copy (unchanged) |

---

**Disclaimer:** This document does not constitute legal advice. It is an operational summary prepared for Control Tower and/or legal counsel review only. Final legal clearance and source approval must be provided by qualified legal counsel or Control Tower.
