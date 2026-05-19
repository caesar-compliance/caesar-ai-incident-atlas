# Approved Candidate Set for Record Creation

> **Planning document — not incident records.**  
> This document lists the candidates approved by Control Tower for record creation planning. No records have been created. Candidates are referenced by CAND-NNN IDs only.  
>
> **Prepared:** 19 May 2026  
> **Task:** T007 — First Incident Record Creation Plan  
> **Branch:** `docs/T007-first-incident-record-creation-plan`

---

## Summary

| Wave | Count | Candidates |
|---|---|---|
| Tier 1 — First wave (T008) | 4 | CAND-003, CAND-006, CAND-011, CAND-012 |
| Tier 2/3 — Second wave (T009+) | 6 | CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015 |
| Postponed (excluded from planning) | 4 | CAND-001, CAND-007, CAND-008, CAND-013 |
| Rejected (excluded permanently) | 1 | CAND-014 |

---

## Tier 1 — First Wave (T008 Scope)

### CAND-003 — LLM Fabricated Legal Case Citations

**Planned future ID:** `INC-0001` (pending Control Tower confirmation of ID sequence)  
**Sector:** Legal / Professional Services  
**Failure modes:** FM-HALL, FM-REL  
**Source anchor:** Mata v. Avianca, S.D.N.Y., Case No. 22-cv-1461 (2023) — public court record  
**Source quality:** Very strong (primary court document)  
**Confidence target:** high  
**Severity target:** medium

**Open questions:**
- Confirm that CourtListener URL for the case is still live and accessible at time of T008.
- Should the record name the attorney? The attorney is named in the public court record. Confirm naming convention with Control Tower — this is a matter of public record but Caesar should apply consistent individual-naming policy.
- Bar association sanctions: confirm whether additional regulatory proceedings were initiated.

---

### CAND-006 — Autonomous Vehicle Pedestrian Fatality

**Planned future ID:** `INC-0002` (pending Control Tower confirmation)  
**Sector:** Transportation / Autonomous Vehicles  
**Failure modes:** FM-SAFE, FM-REL  
**Source anchor:** NTSB Accident Report HWY18MH010 (November 2019) — primary government investigation  
**Source quality:** Very strong (primary NTSB report)  
**Confidence target:** high  
**Severity target:** critical

**Open questions:**
- Privacy: the victim is named in the NTSB report (public record). Confirm whether Caesar records should name individual victims or use a general description only. Recommended: do not name the victim; use "a pedestrian" and reference the NTSB report for full details.
- Company name is in the NTSB report. Confirm that naming the company is appropriate given public record status. Recommended: yes, the NTSB report names the company; Caesar may reference what the NTSB found.
- The safety driver monitoring system was reportedly disabled: confirm this is stated in the NTSB report, not only in media.

---

### CAND-011 — LLM Chatbot Unauthorised Contract Commitment (Air Canada)

**Planned future ID:** `INC-0003` (pending Control Tower confirmation)  
**Sector:** Consumer Services / Retail  
**Failure modes:** FM-HALL, FM-UNAUTH  
**Source anchor:** Air Canada v. Moffatt, BC Civil Resolution Tribunal, 2024 — tribunal ruling (public)  
**Source quality:** Very strong (primary tribunal document)  
**Confidence target:** high  
**Severity target:** medium

**Open questions:**
- Confirm exact CRT case citation number and whether ruling is available directly on civilresolutionbc.ca.
- The ruling names the company (Air Canada) and the claimant (Mr. Moffatt). Confirm whether Caesar records name claimants in tribunal proceedings or use "a customer" framing. Recommended: name the company (public record); describe the claimant as "a customer" unless there is a specific reason to name them.
- Confirm the exact dollar amount of the disputed fare — this is in the public tribunal record and adds factual precision.

---

### CAND-012 — Automated Benefits Denial (Dutch SyRI System)

**Planned future ID:** `INC-0004` (pending Control Tower confirmation)  
**Sector:** Government / Public Services  
**Failure modes:** FM-BIAS, FM-TRANS, FM-UNAUTH  
**Source anchor:** Hague District Court ruling, ECLI:NL:RBDHA:2020:1878, February 2020 — court ruling (public)  
**Source quality:** Strong (primary court document, Dutch language — key findings have been reported in English)  
**Confidence target:** high  
**Severity target:** high

**Open questions:**
- The primary source is in Dutch. Confirm whether Caesar will cite the Dutch original and provide an original English paraphrase of the key findings, or whether an official English translation is available.
- Confirm: the UN Special Rapporteur report (October 2019) is a secondary source pre-dating the ruling — should be listed as additional context, not primary.
- Confirm that the SyRI system was fully discontinued after the ruling and that this is stated in a primary source, not only in media reporting.
- The ruling addresses fundamental rights under ECHR Article 8. The summary should note this without asserting that any specific individual's rights were violated beyond what the court confirmed at a systemic level.

---

## Tier 2 — Second Wave (T009 or Later)

These 6 candidates are approved in principle but are not in scope for T008. They are planned for a second record batch task, subject to Control Tower approval at that time.

### CAND-002 — Facial Recognition Wrongful Arrest

**Target wave:** T009 (second wave)  
**Source anchor:** NIST FRVT reports + ACLU Robert Williams case documentation  
**Open questions before T009:**
- Confirm primary case anchor (Robert Williams, Detroit, 2020).
- Confirm whether the Williams civil settlement is publicly documented with details suitable for citation.
- NIST FRVT reports cover accuracy differentials at system level — confirm that a specific named case can be combined with NIST data without conflating system-level findings with individual case facts.

---

### CAND-004 — AI Recruitment Gender Bias (Amazon)

**Target wave:** T009 (second wave)  
**Source anchor:** Reuters investigative report, October 2018  
**Open questions before T009:**
- Confirm that the Reuters article is still accessible and that the URL is stable.
- Reuters cited "five sources with knowledge of the matter" — confirm the hedging language in the summary accounts for the absence of direct company confirmation.
- Was a formal discrimination complaint ever filed? Check EEOC records for any related filing.

---

### CAND-005 — Content Moderation Over-Removal (COVID-19)

**Target wave:** T009 (second wave)  
**Source anchor:** Meta/Facebook public blog acknowledgement, March 2020  
**Open questions before T009:**
- Confirm that the specific Meta Transparency Centre blog post is still accessible.
- Twitter/X separately acknowledged similar issues — confirm whether the record should be Meta-only or multi-platform. Recommended: anchor on Meta with a note that similar issues were reported at other platforms.
- Confirm exact date range of the moderation errors from the blog post.

---

### CAND-009 — AI-Generated Non-Consensual Intimate Images

**Target wave:** T009 (second wave)  
**Source anchor:** Platform public statements; UK Online Safety Act / US DEFIANCE Act legislative context  
**Open questions before T009:**
- Identify a specific platform-level primary source (company statement, policy announcement, or enforcement action) to anchor the record on.
- Victim privacy: record must focus exclusively on platform/system governance failure. Do not name, describe, or imply the identity of any individual victim.
- Confirm which legislative references are most precise (UK Online Safety Act commencement date, DEFIANCE Act status).

---

### CAND-010 — AI Diagnostic Bias in Underrepresented Populations

**Target wave:** T009 (second wave)  
**Source anchor:** Obermeyer et al. (2019), Science journal  
**Open questions before T009:**
- Confirm that the Obermeyer et al. (2019) study involves a named commercial vendor — if so, confirm what the vendor has publicly stated about the findings.
- Confirm whether the study concerns a specific deployed healthcare system or is a research evaluation of a commercially licensed algorithm.
- A `date_note` will be required — the study covers deployment over a multi-year period, not a single incident date.

---

### CAND-015 — LLM Hiring Assessment Discrimination

**Target wave:** T009 (second wave)  
**Source anchor:** EEOC Technical Assistance Guidance, May 2023 + NYC Local Law 144  
**Open questions before T009:**
- Identify a specific named EEOC enforcement action if available by time of T009.
- NYC Local Law 144 requires bias audits for covered employers — confirm whether any audit failure has been publicly documented and could serve as a primary incident anchor.
- Confirm whether the record should reference the regulatory guidance as a systemic concern or anchor on a specific named enforcement case.

---

## Why Postponed Candidates Remain Excluded

| Candidate | Reason for exclusion |
|---|---|
| CAND-001 — Healthcare chatbot inaccurate treatment guidance | No confirmed named primary source for a specific provider. A named company + official report or regulatory action is needed before a record can be created. |
| CAND-007 — Predictive policing deployment | Systemic pattern, not a discrete documentable incident. A specific jurisdiction, system, and documented individual harm event is needed. |
| CAND-008 — AI financial advice inaccuracy | No confirmed discrete company-acknowledged incident. A specific regulatory enforcement action or company statement is needed. |
| CAND-013 — AI code generation security vulnerabilities | Academic study documents a general risk pattern; not a discrete production incident with confirmed exploitation. A specific production incident is needed. |

Postponed candidates may be revisited in future tasks if stronger primary sources become available.

---

## Why CAND-014 Remains Rejected

| Candidate | Reason for rejection |
|---|---|
| CAND-014 — AI surveillance false flags | Significant overlap with CAND-002 (same failure mode FM-BIAS, similar sector). Weak discrete incident documentation. Insufficient distinctive value. |

CAND-014 will not be revisited unless a substantially distinct documented incident is identified.
