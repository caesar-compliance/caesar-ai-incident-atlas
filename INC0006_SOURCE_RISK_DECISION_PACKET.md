# INC-0006 Source Risk Decision Packet — T027

**Task:** T027 — Targeted INC-0006 Counsel/Source-Risk Resolution Pack
**Date:** 20 May 2026
**Version:** 0.6.3
**Branch:** `review/T027-inc0006-source-resolution`
**Status:** Decision packet prepared — NOT LEGAL ADVICE

---

## 1. Current Problem Statement

INC-0006 ("AI-based resume screening tool discontinued after reportedly penalising female candidates") relies solely on a Reuters investigative report (October 2018) as its primary source. This creates two residual risks:

- **Source/license risk (G-01):** Reuters T&Cs apply to the URL citation. Reuters is a `credible_media` source, not a public-domain official record. T025 and T026 identified this as the last "Needs counsel review" item in G-01.
- **Wording risk (G-02):** The summary uses "reportedly" and source-attribution hedging throughout. G-02 assessment is "Sign-off with caution" — not blocking, but counsel review is advisable before broader distribution.

No safe public-domain replacement was found in T026. T027 performs a targeted second-pass search.

---

## 2. INC-0006 Record Summary

| Field | Value |
|---|---|
| Incident ID | INC-0006 |
| Title | AI-based resume screening tool discontinued after reportedly penalising female candidates |
| Date | 10 October 2018 (date of Reuters report) |
| Sector | hiring-employment |
| Failure mode | FM-BIAS |
| Severity | medium |
| Confidence | high |
| Primary source | Reuters investigative report, 10 Oct 2018 (`credible_media`) |
| Source URL | `https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G` |
| Source risk (T025) | Needs counsel review |
| Source risk (T026) | Unchanged — no safe replacement found |

---

## 3. Safer-Source Search Result (T027)

Targeted manual search performed on 20 May 2026.

| Source Type Sought | Found? | Detail |
|---|---|---|
| Official Amazon company page/statement | No | Amazon spokesperson statement issued verbally to media only; no standalone page on `aboutamazon.com` or `amazon.com` |
| Court / regulator / government record | No | No EEOC enforcement action, no court case, no OFCCP finding on this specific tool |
| EEOC May 2023 AI guidance (`eeoc.gov`) | Partial — not usable | Document confirmed to exist via `eeoc.gov/eeoc-publications`; direct URL returns 404; cannot add without stable accessible URL |
| US Congress hearing record | Not verified | Target page returned 403 Forbidden |
| Academic/institutional record independent of Reuters | No | Widely cited in secondary literature only |

**Search verdict: No safer source suitable for addition found.**

---

## 4. Options Assessment

### Option A — Safer source found and added
**Not applicable.** No qualifying safer source found.

### Option B — No safer source; wording confirmed adequate ✅ SELECTED
Current INC-0006 wording is already well-hardened:
- All summary sentences use "According to the Reuters report" or "reportedly"
- No intentional discrimination language
- No definitive legal conclusions
- "The company did not publicly confirm all details of the reporting" — present in record
- No article text reproduced

**No data or wording changes required.** Record remains publishable with caution. Counsel review recommended before broader distribution or G-01 final sign-off.

### Option C — Public prominence isolation
**Not required at this time.** Record is already live in the Technical Public MVP with adequate hedging. Isolation is a CT-level decision if CT determines the Reuters source risk is unacceptable.

---

## 5. Public Wording Risk Assessment

| Risk Category | Assessment |
|---|---|
| Defamation / libel | Low. All claims attributed to Reuters report. No statements of intent, guilt, or legal wrongdoing. |
| Copyright infringement | Low. No Reuters text reproduced. Title and summary are original paraphrase. URL citation only. |
| Reuters T&C compliance | Residual. URL citation for reference purposes is generally accepted practice, but Reuters' specific terms should be confirmed for institutional publication contexts. |
| Overclaiming causation | None. "risk of gender-correlated discrimination" and "potential exclusion" — appropriately qualified. |
| Legal conclusion | None. No "violated", "illegal", "discriminated against" language used. |
| Private individual naming | None. |

---

## 6. Recommended CT Decision

> **Recommended resolution: Option B — Retain Reuters source with counsel review before broader distribution.**

Specific recommended CT actions:
1. **Accept** INC-0006 as currently worded for the Technical Public MVP (already live). Wording is adequately hedged.
2. **Seek counsel confirmation** on one narrow question: whether citing a single Reuters article URL (without reproducing text) in a non-commercial public knowledge-base context is consistent with Reuters' standard terms of use.
3. **If counsel confirms** no issue: update `GOVERNANCE_SIGNOFF_PACK.md` §5 G-01 row for INC-0006 to "Sign-off with caution" and proceed to T028 CT Final Sign-Off.
4. **If counsel flags a concern**: evaluate (a) temporarily de-emphasising INC-0006, (b) seeking a secondary corroborating source, or (c) accepting residual risk with documented CT decision.

---

## 7. Proposed Final Sign-Off Language (for GOVERNANCE_SIGNOFF_PACK.md §5)

> INC-0006 — G-01: Cleared with caution. Source is a Reuters investigative report (`credible_media`). URL citation only; no text reproduced; all claims source-attributed with "reportedly" hedging. Counsel confirmed [date] that URL citation in this non-commercial knowledge-base context is acceptable. Residual risk: company did not publicly confirm all reported details.

*(Leave blank until counsel confirmation is received.)*

---

## 8. Disclaimer

**This document does not constitute legal advice.** Source risk assessments, wording evaluations, and recommended actions are operational summaries for internal Control Tower review only. Final legal clearance must be provided by qualified legal counsel. No approval of any kind is granted by this document.

---

## References

- `SOURCE_RISK_HARDENING_REPORT.md` — T026 hardening pass + T027 addendum
- `GOVERNANCE_SIGNOFF_PACK.md` — G-01/G-02 sign-off tables
- `PUBLICATION_RISK_GATE.md` — Gate status
- `data/incidents/INC-0006-ai-recruitment-tool-gender-bias-discontinued.json` — Record
- `site/data/incidents/INC-0006-ai-recruitment-tool-gender-bias-discontinued.json` — Public copy
