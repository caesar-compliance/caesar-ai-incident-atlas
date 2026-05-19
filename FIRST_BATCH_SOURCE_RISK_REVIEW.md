# First Batch — Source Risk Review

> **Task:** T009 — Dataset MVP Review and QA Hardening  
> **Branch:** `qa/T009-dataset-mvp-review-and-qa-hardening`  
> **Prepared:** 19 May 2026  
> **Scope:** Review of 5 open source risks from T008 for INC-0001 through INC-0004

---

## Risk 1 — INC-0001: CourtListener URL Stability

**T008 risk statement:** CourtListener is a third-party PACER archive. If the specific document URL changes, the canonical reference is the case docket: Mata v. Avianca, S.D.N.Y., Case No. 22-cv-1461.

**T009 review:**

The source entry for INC-0001 already embeds the canonical reference in two places:
- `title`: `"Mata v. Avianca, Inc., No. 22-cv-1461 (S.D.N.Y.) — Order to Show Cause and Sanctions Order, May 2023"`
- `date_note`: `"See Mata v. Avianca, S.D.N.Y., Case No. 22-cv-1461."`

CourtListener (Free Law Project) is a well-established legal archive with a documented permanence policy for RECAP-archived PACER documents. The URL structure (`storage.courtlistener.com/recap/gov.uscourts.nysd.575595/...`) is stable for archived PDFs.

**Decision:** Accept URL as-is. No record change made. If the URL becomes inaccessible, the record can be updated to the PACER direct URL or court website using the canonical case number.

**Status:** ✅ Accepted — low residual risk. Canonical reference already embedded.

---

## Risk 2 — INC-0003: BC CRT Portal URL Stability

**T008 risk statement:** The BC CRT decisions portal URL format may change. The canonical reference is the citation `2024 BCCRT 149`.

**T009 review:**

The source entry for INC-0003 already embeds the canonical citation in the `title` field:
- `title`: `"Moffatt v. Air Canada, 2024 BCCRT 149 — BC Civil Resolution Tribunal Decision, February 2024"`

The BC Civil Resolution Tribunal publishes decisions at `decisions.civilresolutionbc.ca`. The Salesforce-based portal URL (containing `a0k4X000009qFoSQAU`) may be less stable than the canonical citation. However, the citation `2024 BCCRT 149` is searchable via the CRT decisions search portal and is the permanent identifier.

**Decision:** Accept URL as-is. No record change made. Canonical citation `2024 BCCRT 149` already in `title`. If the portal URL changes, the URL field can be updated to the search portal with the citation as the locator.

**Status:** ✅ Accepted — low residual risk. Canonical citation already embedded in title.

---

## Risk 3 — INC-0004: Dutch-Language Primary Source

**T008 risk statement:** The court ruling is in Dutch. Caesar's summary is based on English-language analysis and reporting. If a discrepancy between the Dutch text and English sources is identified, the record may need revision.

**T009 review:**

The source `title` field for the court record already states:
- `"... (Dutch; key findings widely reported in English)"`

The `summary` in INC-0004 attributes all findings explicitly to "the ruling of the Hague District Court" and uses the court's ECLI identifier (`ECLI:NL:RBDHA:2020:1878`). No factual claims are made beyond what has been confirmed across multiple authoritative English-language legal and governance sources.

No web access was used in T009 to re-verify the Dutch text. No new information changed this assessment.

**Decision:** No record change. The existing flagging is adequate. Residual risk carried forward: if a discrepancy between the Dutch ruling and English summaries is identified, the record should be reviewed.

**Status:** ⚠️ Residual risk — low. Adequately flagged. No blocking issue.

---

## Risk 4 — INC-0004: SyRI Discontinuation Primary Source

**T008 risk statement:** The discontinuation of SyRI is widely reported in credible legal and media sources but a specific Dutch government primary announcement URL was not confirmed at time of record creation.

**T009 review:**

The `impact` field states:
> "The Dutch government did not appeal the ruling. The SyRI system was discontinued following the ruling."

This is written in past tense with implicit attribution to the ruling as the causal context. No specific Dutch government primary announcement URL was found or confirmed in T009 (no web access used in this task to search for one). The claim is widely attested in legal and governance literature, but the primary government source URL remains unconfirmed.

**Decision:** No record change. The cautious wording ("was discontinued following the ruling") is appropriate. Marked as an open unresolved risk. A future curator can add a primary Dutch government source URL if one is identified.

**Status:** ⚠️ Unresolved — the claim is well-attested but primary government source URL not independently confirmed. Low risk given the cautious wording.

---

## Risk 5 — Draft Sector Status: `transportation-autonomous` and `retail-ecommerce`

**T008 risk statement:** Both sectors are `draft` in the taxonomy. If they are removed or renamed in a future taxonomy update, records INC-0002 and INC-0003 will need sector field updates.

**T009 review:**

Both sector IDs exist in `data/taxonomy/sectors.json` with `status: draft`. Both sectors accurately represent the incidents:
- `transportation-autonomous` is the correct sector for an autonomous vehicle testing programme (INC-0002)
- `retail-ecommerce` is the correct sector for an airline customer service chatbot context (INC-0003)

Alternatives considered:
- Using `general` — would lose meaningful sector categorisation.
- Renaming to a stable sector — no current stable sector maps to these cases.
- Promoting to stable — out of scope for T009; requires taxonomy governance decision.

**Decision:** Keep both sectors as `draft`. No record change. Taxonomy stabilisation deferred to T010+ taxonomy review.

**Status:** ⚠️ Residual risk — low. Both sectors are accurate; draft status is explicitly noted in taxonomy file. Stabilisation is a future taxonomy task.

---

## Summary Table

| Risk | Record | Action Taken | Status |
|---|---|---|---|
| CourtListener URL stability | INC-0001 | None — canonical ref already in title | ✅ Accepted |
| BC CRT portal URL | INC-0003 | None — canonical citation `2024 BCCRT 149` in title | ✅ Accepted |
| Dutch-language primary source | INC-0004 | None — flagging adequate | ⚠️ Residual |
| SyRI discontinuation source | INC-0004 | None — cautious wording retained | ⚠️ Unresolved |
| Draft sector status | INC-0002, INC-0003 | None — deferred to T010+ taxonomy task | ⚠️ Residual |

**No record changes were made as a result of this source risk review.**
