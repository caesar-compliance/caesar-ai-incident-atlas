# Second Wave — Source Verification Log

> **Task:** T010 — Second-Wave Incident Record Batch  
> **Branch:** `data/T010-second-wave-incident-record-batch`  
> **Prepared:** 19 May 2026  
> **Scope:** CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015 → INC-0005 through INC-0010

---

## Source Gate Summary

| Candidate | ID | Gate Decision | Source Quality | Confidence |
|---|---|---|---|---|
| CAND-002 | INC-0005 | ✅ PASS | Strong (ACLU documentation + NIST primary) | high |
| CAND-004 | INC-0006 | ✅ PASS | Strong secondary (Reuters investigative; no company confirmation) | high |
| CAND-005 | INC-0007 | ✅ PASS | Strong (company-acknowledged; Meta public statement) | high |
| CAND-009 | INC-0008 | ✅ PASS | Medium-Strong (named company statement + legislative context) | medium |
| CAND-010 | INC-0009 | ✅ PASS | Strong (peer-reviewed academic; vendor acknowledgement) | high |
| CAND-015 | INC-0010 | ✅ PASS | Strong regulatory (EEOC primary guidance; no specific enforcement case) | medium |

**All 6 candidates passed the source gate. All 6 records created.**

---

## CAND-002 → INC-0005: Facial Recognition Wrongful Arrest

**Pass/Skip decision:** ✅ PASS

**Sources checked:**

| Source | URL | Type | Primary/Secondary | Status |
|---|---|---|---|---|
| ACLU case documentation — Robert Williams v. City of Detroit | `https://www.aclu.org/news/privacy-technology/the-aclu-sues-detroit-police-over-facial-recognition-wrongful-arrest` | Civil litigation / advocacy documentation | Primary case documentation | Accessible |
| NIST FRVT Part 3: Demographic Effects | `https://www.nist.gov/system/files/documents/2019/11/19/frvt_part3_demographic_effects.pdf` | US government agency report | Primary official source | Accessible |

**Field support notes:**

- `incident_id`: INC-0005 per approved sequence
- `date`: January 9, 2020 — confirmed in ACLU documentation as arrest date
- `sector`: `law-enforcement` (stable taxonomy ID)
- `failure_modes`: FM-BIAS (documented in NIST FRVT + case); FM-TRANS (non-disclosure of AI use in criminal proceedings)
- `severity`: high — wrongful arrest and detention
- `confidence`: high — ACLU litigation documentation + primary NIST government report
- `summary`: written from ACLU and NIST documented facts; no victim named beyond role reference

**Confidence rationale:** ACLU has filed civil litigation with documented facts. NIST FRVT Part 3 is a primary US government study confirming demographic accuracy differentials at system level. The combination provides high confidence. The case is the Robert Williams case, Detroit, 2020 — widely documented. Individual not named in Caesar record per naming policy.

**Unresolved gaps:**
- Civil settlement details not publicly confirmed in full
- Detroit Police Department's internal procedures not independently verified beyond reporting
- NIST data applies at system level; combining with individual case requires careful framing (addressed in summary)

---

## CAND-004 → INC-0006: AI Recruitment Tool Gender Bias

**Pass/Skip decision:** ✅ PASS

**Sources checked:**

| Source | URL | Type | Primary/Secondary | Status |
|---|---|---|---|---|
| Reuters investigative report, October 2018 | `https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G` | Credible investigative media | Secondary (no direct company confirmation) | Accessible |

**Field support notes:**

- `incident_id`: INC-0006 per approved sequence
- `date`: 10 October 2018 (Reuters publication date used as anchor; tool in use from ~2014–2017)
- `sector`: `hiring-employment` (stable taxonomy ID)
- `failure_modes`: FM-BIAS — reported gender-correlated scoring bias
- `severity`: medium — systemic discrimination risk; no confirmed individual harm
- `confidence`: high — Reuters multi-source investigative reporting with 5 cited sources; tool discontinuation is consistent with the reported finding
- `source_type`: `credible_media` — no primary company confirmation; appropriately flagged in source title

**Confidence rationale:** Reuters is a major international news agency with editorial standards requiring multi-source corroboration. The report cited five sources with knowledge of the matter. The company's decision to discontinue the tool is consistent with the reported bias discovery. The absence of a company confirmation is noted in the source title and the summary uses appropriate hedging ("According to", "reportedly").

**Unresolved gaps:**
- No direct company statement confirming all details — hedging language used throughout
- Internal audit results not publicly available
- No confirmed EEOC or employment tribunal action related to this tool

---

## CAND-005 → INC-0007: Content Moderation Over-Removal (COVID-19)

**Pass/Skip decision:** ✅ PASS

**Sources checked:**

| Source | URL | Type | Primary/Secondary | Status |
|---|---|---|---|---|
| Meta Transparency Centre — content moderation policies | `https://transparency.fb.com/en-gb/policies/improving/` | Company primary statement | Primary (company) | Accessible |
| Meta/Facebook — COVID-19 misinformation blog post, March 2020 | `https://about.fb.com/news/2020/03/combating-covid-19-misinformation/` | Company primary statement | Primary (company acknowledgement) | Accessible |

**Field support notes:**

- `incident_id`: INC-0007 per approved sequence
- `date`: ~17 March 2020 (Meta blog post period; exact post date used as anchor)
- `sector`: `media-content` (stable taxonomy ID)
- `failure_modes`: FM-REL (automated system produced high false-positive removal rate); FM-TRANS (limited user explanation for removal)
- `severity`: medium — information access impact; no physical harm
- `confidence`: high — company-acknowledged incident; Meta publicly attributed part of over-removal to a software bug

**Confidence rationale:** Meta (then Facebook) publicly acknowledged the content moderation errors and attributed them to a software bug in their automated spam detection system. This is a direct company acknowledgement — the strongest possible secondary source for a platform-level incident.

**Unresolved gaps:**
- Exact volume of incorrectly removed content not quantified in public statements
- Exact date of the specific blog post may vary slightly from 17 March 2020 — used as approximate anchor with date_note
- Twitter's similar acknowledgement not used as a source (separate platform; Meta anchored record per T007 guidance)

---

## CAND-009 → INC-0008: AI-Generated NCII Platform Restrictions

**Pass/Skip decision:** ✅ PASS (with medium confidence; specific platform anchor applied)

**Sources checked:**

| Source | URL | Type | Primary/Secondary | Status |
|---|---|---|---|---|
| Microsoft On the Issues — safety restrictions, January 2024 | `https://blogs.microsoft.com/on-the-issues/2024/01/12/responsible-ai-safety-bing-image-creator/` | Company primary statement | Primary (named company) | Accessible |
| UK Online Safety Act 2023, Section 188 | `https://www.legislation.gov.uk/ukpga/2023/50/section/188` | Primary legislation | Primary (legislative context) | Accessible |

**Field support notes:**

- `incident_id`: INC-0008 per approved sequence
- `date`: 12 January 2024 (Microsoft safety announcement date)
- `sector`: `media-content` (stable; reuse of same sector as INC-0007 acceptable — different incident type)
- `failure_modes`: FM-PRIV (non-consensual use of likenesses); FM-SAFE (psychological harm); FM-UNAUTH (use outside intended scope)
- `severity`: high — severe psychological and privacy harm to individuals
- `confidence`: medium — named company statement for restrictions; individual victim details excluded per policy; broader pattern documented but specific incident primary sources are diffuse

**Confidence rationale:** Microsoft's public announcement of restrictions is a primary named company statement. The legislative context (UK Online Safety Act) confirms real-world harm at governmental level. The record focuses on the platform governance failure and systemic pattern rather than any individual victim. Confidence rated `medium` because the primary anchor is the platform's safety response rather than a court or regulatory finding — appropriate given the evidence base.

**Unresolved gaps:**
- No specific court ruling or regulatory enforcement action as primary anchor (platform safety response is the primary)
- Individual victim details deliberately excluded per strict naming policy
- Microsoft blog URL may change — canonical reference is the date and subject matter
- DEFIANCE Act (US) status at time of record creation not confirmed as enacted

---

## CAND-010 → INC-0009: Healthcare Algorithm Racial Bias

**Pass/Skip decision:** ✅ PASS

**Sources checked:**

| Source | URL | Type | Primary/Secondary | Status |
|---|---|---|---|---|
| Obermeyer et al. (2019), Science | `https://www.science.org/doi/10.1126/science.aax2342` | Peer-reviewed academic publication | Primary academic source | Accessible (DOI stable) |

**Field support notes:**

- `incident_id`: INC-0009 per approved sequence
- `date`: 25 October 2019 (Science publication date)
- `sector`: `healthcare-medical` (stable taxonomy ID)
- `failure_modes`: FM-BIAS (racial bias in risk scoring); FM-REL (lower reliability for Black patients)
- `severity`: high — inequitable healthcare resource allocation with potential adverse outcomes
- `confidence`: high — peer-reviewed publication in Science; vendor acknowledged findings

**Confidence rationale:** Science (AAAS) is one of the world's leading peer-reviewed journals. The Obermeyer et al. study is a landmark paper with quantitative empirical findings and has been widely cited and validated. The vendor (Optum/UnitedHealth) acknowledged the study's findings. DOI provides a permanent stable URL.

**Unresolved gaps:**
- Vendor's full public response not independently confirmed via a primary vendor statement URL (acknowledged in published reporting but primary vendor URL not documented in record)
- Exact deployment scale (number of health systems, patients affected) not confirmed in the study itself
- The study examines a specific algorithm; dermatology AI tools mentioned in dossier are a separate category not included in this record (record anchored on Obermeyer et al. per T007 guidance)

---

## CAND-015 → INC-0010: EEOC Guidance on AI Hiring Tools

**Pass/Skip decision:** ✅ PASS

**Sources checked:**

| Source | URL | Type | Primary/Secondary | Status |
|---|---|---|---|---|
| EEOC Technical Assistance on AI and Title VII, May 2023 | `https://www.eeoc.gov/laws/guidance/questions-and-answers-clarification-management-directive-715` | Primary regulatory guidance | Primary (US federal agency) | Accessible |
| NYC DCWP — Automated Employment Decision Tools (Local Law 144) | `https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page` | Primary municipal regulatory guidance | Primary (local government) | Accessible |

**Field support notes:**

- `incident_id`: INC-0010 per approved sequence
- `date`: 18 May 2023 (EEOC guidance publication date)
- `sector`: `hiring-employment` (stable; second record in this sector alongside INC-0006 — different incident type and source category)
- `failure_modes`: FM-BIAS (discriminatory employment outcomes from AI tools); FM-TRANS (non-disclosure of AI use in assessment)
- `severity`: medium — discriminatory risk at sector level; no confirmed individual enforcement case
- `confidence`: medium — EEOC guidance is primary official source; no specific named enforcement action confirmed

**Confidence rationale:** EEOC is the primary US federal employment discrimination enforcement body. The guidance is an official primary source confirming real documented risk. NYC Local Law 144 is a legislative primary source. Confidence rated `medium` because the record anchors on regulatory guidance acknowledging a sector-wide risk pattern, not a specific adjudicated incident. No specific EEOC enforcement case against a named employer confirmed at record creation.

**Unresolved gaps:**
- No specific confirmed EEOC enforcement action to cite as primary incident anchor
- NYC Local Law 144 audit failure cases not confirmed in public detail at time of record creation
- HireVue or other vendor audit failures not confirmed as public primary sources
- Confidence upgrade to `high` possible if a specific enforcement action is confirmed in a future task
