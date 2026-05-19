# First Incident Candidate Review Table

> **Candidate only — not incident records.**  
> This table is a summary review aid for Control Tower. It does not constitute a final incident selection decision.  
>
> **Prepared:** 19 May 2026  
> **Task:** T006 — First Incident Candidate Dossier Preparation  
> **Branch:** `research/T006-first-incident-candidate-dossier-preparation`

---

## Instructions for Reviewers

- Review each row against the dossiers in `FIRST_INCIDENT_CANDIDATE_DOSSIERS.md`
- Override recommended status with Control Tower decision
- Mark "Approved for T007" only after explicit Control Tower sign-off
- Do not create any incident JSON records until T007 is formally initiated

---

## Review Table

| Candidate ID | Short Title | Sector | Primary Failure Mode | Source Quality | Confidence | Severity | Diversity Value | Legal/Source Risk | Recommended Status |
|---|---|---|---|---|---|---|---|---|---|
| CAND-002 | Facial recognition wrongful arrest | Law Enforcement | FM-BIAS | Strong | High | High | High — bias/law enforcement | Low | **Accept** |
| CAND-003 | LLM fabricated legal case citations | Legal | FM-HALL | Very Strong | High | Medium | High — hallucination/legal | Very Low | **Accept** |
| CAND-004 | AI recruitment gender bias | Employment | FM-BIAS | Strong | High | Medium | High — bias/employment | Low-Medium | **Accept** |
| CAND-005 | Content moderation over-removal | Social Media | FM-REL | Strong | High | Medium | High — reliability/platform | Low | **Accept** |
| CAND-006 | Autonomous vehicle pedestrian fatality | Transportation | FM-SAFE | Very Strong | High | Critical | High — safety/AV | Very Low | **Accept** |
| CAND-009 | AI-generated NCII images | Consumer Technology | FM-PRIV | Medium-Strong | High | High | High — privacy/safety/consumer | Medium | **Accept** |
| CAND-010 | AI diagnostic bias underrepresented populations | Healthcare | FM-BIAS | Strong | High | High | High — bias/healthcare | Low | **Accept** |
| CAND-011 | LLM chatbot unauthorised contract commitment | Consumer Services | FM-HALL + FM-UNAUTH | Very Strong | High | Medium | High — agent/unauthorized action | Very Low | **Accept** |
| CAND-012 | Automated benefits denial SyRI | Government | FM-BIAS + FM-TRANS | Strong | High | High | High — bias/government/court ruling | Low | **Accept** |
| CAND-015 | LLM hiring assessment discrimination | Employment | FM-BIAS | Strong | Medium-High | Medium | Medium — bias/employment (regulatory) | Low-Medium | **Accept** |
| CAND-001 | Healthcare chatbot inaccurate treatment | Healthcare | FM-HALL + FM-SAFE | Medium | Medium | High | Medium — hallucination/healthcare | Medium | **Postpone** |
| CAND-007 | Predictive policing deployment | Law Enforcement | FM-BIAS | Medium | Medium | High | Medium — systemic pattern, not discrete incident | Medium-High | **Postpone** |
| CAND-008 | AI financial advice inaccuracy | Financial Services | FM-HALL + FM-REL | Weak | Low-Medium | Medium | Medium — financial sector | High | **Postpone** |
| CAND-013 | AI code generation security vulnerabilities | Software Dev | FM-SEC | Strong | Medium-High | Medium-High | Medium — academic finding, not discrete incident | Medium | **Postpone** |
| CAND-014 | AI surveillance false flags | Government/Security | FM-BIAS + FM-REL | Medium | Medium | High | Low — overlap with CAND-002 | Medium-High | **Reject** |

---

## Diversity Coverage Summary

The 10 Accept candidates together cover:

| Failure Mode Category | Candidates |
|---|---|
| Privacy / Data Leakage (FM-PRIV) | CAND-009 |
| Bias / Discrimination (FM-BIAS) | CAND-002, CAND-004, CAND-010, CAND-012, CAND-015 |
| Hallucination / Misinformation (FM-HALL) | CAND-003, CAND-005, CAND-011 |
| Unauthorised AI Agent Action (FM-UNAUTH) | CAND-011 |
| Safety / Harm (FM-SAFE) | CAND-006, CAND-009 |
| Reliability / Model Failure (FM-REL) | CAND-005 |
| Transparency / Explainability Failure (FM-TRANS) | CAND-012 |
| Security / Prompt Injection (FM-SEC) | None in Accept set — CAND-013 (Postpone) |

| Sector | Candidates |
|---|---|
| Healthcare | CAND-010 |
| Law Enforcement / Criminal Justice | CAND-002 |
| Legal / Professional Services | CAND-003 |
| Employment / HR | CAND-004, CAND-015 |
| Social Media / Content Platforms | CAND-005 |
| Transportation | CAND-006 |
| Consumer Technology | CAND-009 |
| Consumer Services | CAND-011 |
| Government / Public Services | CAND-012 |

**Note:** FM-SEC (Security/Prompt Injection) is not represented in the Accept set. CAND-013 is the closest but is Postponed pending identification of a discrete production incident. This gap should be noted in T007 planning.

---

## Source Type Distribution (Accept Candidates)

| Source Type | Candidates |
|---|---|
| Official government / regulatory report | CAND-006 (NTSB), CAND-012 (Dutch court), CAND-015 (EEOC) |
| Court / legal ruling | CAND-011 (BC CRT), CAND-012 (Dutch court) |
| Academic / peer-reviewed publication | CAND-010 (Science, Nature Medicine) |
| Investigative journalism (multi-source) | CAND-002 (ACLU + NIST), CAND-004 (Reuters), CAND-005 (Meta blog + news) |
| Company public statement / acknowledgement | CAND-005 (Meta), CAND-009 (platform statements) |
| Public court record | CAND-003 (SDNY), CAND-011 (BC CRT) |

---

## Control Tower Review Columns

*To be completed by Control Tower during review:*

| Candidate ID | CT Status | CT Notes | Approved for T007 |
|---|---|---|---|
| CAND-002 | — | — | — |
| CAND-003 | — | — | — |
| CAND-004 | — | — | — |
| CAND-005 | — | — | — |
| CAND-006 | — | — | — |
| CAND-009 | — | — | — |
| CAND-010 | — | — | — |
| CAND-011 | — | — | — |
| CAND-012 | — | — | — |
| CAND-015 | — | — | — |
