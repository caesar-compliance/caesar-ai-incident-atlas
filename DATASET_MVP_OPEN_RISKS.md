# Dataset MVP — Open Risks

> **Task:** T011 — Dataset MVP Public Readiness Review  
> **Date:** 19 May 2026  
> **Prior risk logs:** `FIRST_BATCH_SOURCE_RISK_REVIEW.md` (T009), `SECOND_WAVE_SOURCE_VERIFICATION_LOG.md` (T010)

---

## Risk Register

| # | Risk | Affected Record(s) | Severity | Proposed Handling | Blocks Public MVP? |
|---|---|---|---|---|---|
| R-01 | `transportation-autonomous` sector is draft taxonomy ID | INC-0002 | Low | Stabilise ID in taxonomy or display with "draft taxonomy" label | No |
| R-02 | `retail-ecommerce` sector is draft taxonomy ID | INC-0003 | Low | Same as R-01 | No |
| R-03 | FM-REL is draft taxonomy ID | INC-0002, INC-0007, INC-0009 | Low | Display with draft label; stabilise in T012 taxonomy review | No |
| R-04 | INC-0005: Detroit civil settlement details not fully public | INC-0005 | Low | Hedging language already in record; acceptable for display | No |
| R-05 | INC-0006: No direct Amazon company confirmation; Reuters only | INC-0006 | Low | "According to" framing in record; acceptable | No |
| R-06 | INC-0007: Exact Meta blog URL and removal volume not confirmed | INC-0007 | Low | Company-acknowledged at platform level; acceptable | No |
| R-07 | INC-0008: Microsoft blog URL may change; DEFIANCE Act status unconfirmed | INC-0008 | Low | Monitor URL; note OSA as secondary anchor; no blocking | No |
| R-08 | INC-0008: confidence `medium` — no regulatory ruling, platform safety response only | INC-0008 | Low | Display confidence level visibly; add caution label | No |
| R-09 | INC-0009: Vendor (Optum) not named; vendor statement URL not confirmed | INC-0009 | Low | Science DOI is sufficient anchor; vendor naming conservative | No |
| R-10 | INC-0010: confidence `medium` — EEOC guidance level only; no specific enforcement case | INC-0010 | Low | Display confidence visibly; note "guidance-level record" | No |
| R-11 | INC-0004: Dutch primary source (rechtspraak.nl) is Dutch language | INC-0004 | Low | Record already notes Dutch language; English paraphrase in summary | No |
| R-12 | INC-0004: SyRI discontinuation confirmed via reporting, not a primary source URL in record | INC-0004 | Low | Summary language hedges appropriately; not a public display blocker | No |
| R-13 | All `accessed` dates are 19 May 2026 — source URLs have not been re-verified at display time | All | Medium | Public site must show accessed date and note that URLs were last verified at record creation | No — but must be disclosed |
| R-14 | No formal license audit completed for ACLU, Meta, Microsoft, EEOC, Reuters source URLs | INC-0005–INC-0010 | Low | Sources cited only (not reproduced); URLs are public domain or freely accessible; no text copied | No |
| R-15 | FM-PRIV not yet in stable taxonomy list (status in failure_modes.json to verify) | INC-0008 | Low | FM-PRIV confirmed present in taxonomy; check stable/draft status before display label | No |

---

## Summary

**Total risks:** 15  
**Blocking public MVP:** 0  
**Medium severity:** 1 (R-13 — accessed date disclosure; handled by display note, not a record fix)  
**Low severity:** 14  

No risk currently blocks public MVP planning (T012). All risks are either residual-acceptable or require presentational handling only.
