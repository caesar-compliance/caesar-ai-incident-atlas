# License and Source Safety Checklist — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Version:** 0.3 (plan — not yet fully verified)
**Status:** Planning document. License verification is partially complete. Remaining verifications are pending manual review. Requires Control Tower approval before use in v0.3.
**Work item:** T004

---

## Purpose

This document defines how to check source and dataset license status before use, records the findings of license verification checks performed during T004, and defines the default rules for each source. It operationalizes the `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` for the specific sources used by Caesar AI Incident Atlas.

This document does not constitute legal advice. License questions with material business impact should be reviewed by a qualified legal professional.

---

## 1. How to Check Source and Dataset License Status Before Use

### Step 1.1 — Identify the source

Before using any external source, identify:
- The source name and URL.
- Whether it is a code repository, a data repository, a public website, or a publication.
- The operator or publisher.

### Step 1.2 — Find the license

For code repositories:
- Check the `LICENSE` or `LICENSE.md` file in the repository root.
- Check the `README.md` for license badges or license statements.
- Check the repository's GitHub/GitLab metadata for the license field.

For data repositories and databases:
- Check the website's Terms of Use, Terms of Service, or Data License page.
- Check the database's documentation for data reuse terms.
- Check for Creative Commons or Open Data Commons license badges.

For public websites:
- Check the website's Terms of Use or Copyright page.
- Check the footer for copyright notices.
- Check for Creative Commons license notices.

For publications:
- Check the publication's copyright notice.
- Check the publisher's reuse policy.

### Step 1.3 — Record the finding

Record the license finding in this document and in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`:
- Source name and URL.
- License found (or "not found").
- URL of the license page or file.
- Date verified.
- What is permitted under the license.
- What is not permitted.
- Whether Control Tower approval is required.

### Step 1.4 — Apply the default rule

If the license is not found or is unclear, apply the default rule: treat as no-license (all rights reserved). Do not use the source for data reuse without explicit permission. Study-only use is permitted.

---

## 2. How to Treat Each Source

### 2.1 AI Incident Database (AIID)

**Official URL:** https://incidentdatabase.ai/
**Terms of Use page:** https://incidentdatabase.ai/terms-of-use/
**Verification date:** 19 May 2026
**Verification method:** Official Terms of Use page fetched and reviewed.

**License finding:**

The AIID Terms of Use (effective August 7, 2025) states that the following database collections are licensed under the **Creative Commons Attribution ShareAlike 4.0 (CC BY-SA 4.0)** license:
- incidents (main incident collection)
- quickadd
- duplicates
- taxa
- classifications
- entities
- entity_relationships

The following data is **not** licensed under Creative Commons:
- submissions (prospective reports before rotation into the reports collection)
- the `text` field of the reports collection
- contents displayed within the database not contained within the database snapshots (e.g., source images and videos)

Database snapshots are available at: https://incidentdatabase.ai/research/snapshots/

**What can be studied:**
- The AIID website and database can be browsed and studied freely.
- AIID incident records can be used as a reference to identify incidents for independent curation.

**What can be cited:**
- AIID incident records can be cited as a secondary source in Caesar incident records, with attribution.
- The AIID URL and incident number should be included in the source entry.

**What cannot be copied:**
- The `text` field of AIID reports cannot be copied into Caesar incident records.
- AIID incident summaries and report text cannot be reproduced verbatim.
- Caesar incident summaries must be written in original words.

**What requires Control Tower approval:**
- Any reuse of AIID data beyond citation (e.g., importing AIID records as structured data) requires Control Tower approval and must comply with CC BY-SA 4.0 attribution and ShareAlike requirements.
- Note: CC BY-SA 4.0 ShareAlike means that derivative works must be distributed under the same CC BY-SA 4.0 license. This has implications for any Caesar product that incorporates AIID data directly. Consult Control Tower before any direct data import.

**Default rule for T004 and v0.3:**
- Cite AIID records as secondary sources. Write original summaries. Do not copy AIID text fields.
- Attribution required: "Source: AI Incident Database (AIID), https://incidentdatabase.ai/, licensed under CC BY-SA 4.0."
- ShareAlike implications must be reviewed by Control Tower before any direct data import.

---

### 2.2 OECD AI Incidents and Hazards Monitor

**Official URL:** https://oecd.ai/en/incidents
**Terms page:** https://oecd.ai/terms (Terms of Reference for ONE AI participants — not a general data license page)
**Verification date:** 19 May 2026
**Verification method:** Web search and URL check. Terms page content could not be fully extracted. Manual verification required.

**License finding: PENDING**

The OECD.AI platform is an official OECD resource. OECD publications and data are generally subject to OECD copyright and terms of use. OECD typically permits citation and reference to its publications but restricts reproduction and commercial use. However, the specific data reuse terms for the OECD AI Incidents Monitor have not been verified from the official source.

**What can be studied:**
- The OECD AI Incidents Monitor can be browsed and studied freely as a public resource.
- OECD incident entries can be used as a reference to identify incidents for independent curation.

**What can be cited:**
- OECD incident entries can likely be cited as a reference source, consistent with standard academic citation practice.
- This requires manual verification of the OECD.AI terms of use.

**What cannot be copied:**
- OECD data and text cannot be copied without verifying the applicable terms.
- Do not reproduce OECD incident summaries verbatim.

**What requires Control Tower approval:**
- Any use beyond citation requires Control Tower approval after manual license verification.

**Pending verification:**
- Manual verification required at: https://oecd.ai/terms and https://www.oecd.org/en/about/terms-conditions.html
- Specific pages to check: OECD.AI Terms of Use, OECD general terms and conditions for data reuse.
- Do not cite OECD AI Incidents Monitor records in Caesar incident records until this verification is complete and recorded.

---

### 2.3 AIAAIC Repository

**Official URL:** https://www.aiaaic.org/aiaaic-repository
**User guide page:** https://www.aiaaic.org/aiaaic-repository/user-guide
**Verification date:** 19 May 2026
**Verification method:** Web search and URL check. User guide page content could not be fully extracted. Manual verification required.

**License finding: PENDING**

The AIAAIC Repository is described as an "independent, grassroots, public interest resource." The specific data reuse terms have not been verified from the official source. The website does not prominently display a Creative Commons or other open data license badge in search results.

**What can be studied:**
- The AIAAIC Repository can be browsed and studied freely as a public resource.
- AIAAIC incident entries can be used as a reference to identify incidents for independent curation.

**What can be cited:**
- AIAAIC incident entries may be citable as a reference source, but this requires verification of the terms of use.

**What cannot be copied:**
- AIAAIC data and text cannot be copied without verifying the applicable terms.
- Do not reproduce AIAAIC incident summaries verbatim.

**What requires Control Tower approval:**
- Any use beyond citation requires Control Tower approval after manual license verification.

**Pending verification:**
- Manual verification required at: https://www.aiaaic.org/aiaaic-repository/user-guide and https://www.aiaaic.org/terms-of-use (if this page exists).
- Specific question: Does AIAAIC permit citation of individual incident entries? Under what conditions?
- Do not cite AIAAIC records in Caesar incident records until this verification is complete and recorded.

---

### 2.4 MIT AI Incident Tracker

**Official URL:** https://airisk.mit.edu/ai-incident-tracker
**Verification date:** 19 May 2026
**Verification method:** Web search. No dedicated license or terms page found in search results. Manual verification required.

**License finding: PENDING**

The MIT AI Incident Tracker is a public resource operated by MIT. It is described as derived from AIID data with additional classification dimensions. The specific data reuse terms have not been verified. Because it is derived from AIID data, the AIID CC BY-SA 4.0 license may apply to the underlying data, but the MIT tracker's own terms must be verified separately.

**What can be studied:**
- The MIT AI Incident Tracker can be browsed and studied freely as a public resource.
- MIT tracker entries can be used as a reference to identify incidents for independent curation.

**What can be cited:**
- MIT tracker entries may be citable as a reference source, but this requires verification of the terms of use.

**What cannot be copied:**
- MIT tracker data and text cannot be copied without verifying the applicable terms.

**What requires Control Tower approval:**
- Any use beyond citation requires Control Tower approval after manual license verification.

**Pending verification:**
- Manual verification required at: https://airisk.mit.edu/ (check for terms of use, about page, or data license page).
- Specific question: What are the data reuse terms for the MIT AI Incident Tracker? Does the AIID CC BY-SA 4.0 license apply to derived data?
- Do not cite MIT tracker records in Caesar incident records until this verification is complete and recorded.

---

### 2.5 IBM AI Atlas Nexus

**Official URL:** https://github.com/IBM/ai-atlas-nexus
**License file:** https://github.com/IBM/ai-atlas-nexus/blob/main/LICENSE
**Verification date:** 19 May 2026
**Verification method:** GitHub repository page fetched and reviewed. License confirmed as Apache-2.0.

**License finding: VERIFIED — Apache-2.0**

IBM AI Atlas Nexus is licensed under the **Apache License 2.0**. This is a permissive open-source license that permits:
- Use, reproduction, and distribution of the software.
- Creation of derivative works.
- Commercial use.

Requirements under Apache-2.0:
- Include a copy of the Apache-2.0 license in any distribution.
- Include attribution notices.
- State any significant changes made to the original files.

**What can be studied:**
- The IBM AI Atlas Nexus repository can be cloned and studied locally.
- The risk taxonomy structure, ontology design, and ID conventions can be studied for inspiration.

**What can be cited:**
- IBM AI Atlas Nexus can be cited as a reference and inspiration source.
- Citation format: "AI Risk Atlas: Taxonomy and Tooling for Navigating AI Risks and Resources" (Bagehorn et al., 2025), arXiv:2503.05780.

**What cannot be copied:**
- Code or data from IBM AI Atlas Nexus cannot be copied into Caesar without Control Tower approval, even under Apache-2.0.
- The default approach remains clean-room Caesar-native implementation.

**What requires Control Tower approval:**
- Any direct reuse of IBM AI Atlas Nexus code or data requires Control Tower approval and must include proper attribution and license notice in `THIRD_PARTY_NOTICES.md`.

**Default rule for T004 and v0.3:**
- Study and cite as inspiration. Do not copy code or data without Control Tower approval.
- If any IBM AI Atlas Nexus material is approved for reuse, add to `THIRD_PARTY_NOTICES.md` with full Apache-2.0 attribution.

---

## 3. Default Rule: No External Dataset Import Without Separate Approval

The default rule for all external datasets, databases, and repositories is:

> **No external dataset, database record, or structured data may be imported into the Caesar AI Incident Atlas repository without separate Control Tower approval.**

This rule applies regardless of the license of the external source. Even permissive licenses (Apache-2.0, CC BY) require explicit approval before data is imported.

The rationale:
- Importing external data creates a dependency on the external source's license terms.
- CC BY-SA 4.0 (AIID) has ShareAlike implications that could affect Caesar's licensing.
- Unverified licenses (OECD, AIAAIC, MIT tracker) must not be assumed to permit import.
- Clean-room implementation is the default approach for all Caesar products.

---

## 4. How to Update THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md

When a license verification is completed:

1. Update the relevant entry in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`:
   - Change "License verified: No — pending verification" to "License verified: Yes — [date]".
   - Add the license type and key terms.
   - Update the "Data reuse" field to reflect the verified status.
   - Add notes on what is permitted and what is not.

2. Update this document (`LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`):
   - Change "License finding: PENDING" to "License finding: VERIFIED — [license type]".
   - Add the verified findings.
   - Update the "What can be cited" and "What requires Control Tower approval" sections.

3. Add a decision log entry in `docs/DECISION_LOG.md` recording the verification finding.

4. Notify the Control Tower that the verification is complete.

---

## 5. Summary Table

| Source | License status | Citation permitted | Data import permitted | Verification required |
|---|---|---|---|---|
| AIID | **Verified** — CC BY-SA 4.0 (data collections) | Yes, with attribution | Requires Control Tower approval (ShareAlike implications) | No further verification needed for citation |
| OECD AI Incidents Monitor | **Pending** — not verified | Likely yes (standard citation) — verify first | Not approved until verified | Manual verification required |
| AIAAIC Repository | **Pending** — not verified | Likely yes (standard citation) — verify first | Not approved until verified | Manual verification required |
| MIT AI Incident Tracker | **Pending** — not verified | Likely yes (standard citation) — verify first | Not approved until verified | Manual verification required |
| IBM AI Atlas Nexus | **Verified** — Apache-2.0 | Yes, with attribution | Requires Control Tower approval | No further verification needed for citation |

---

## 6. Pages Requiring Manual Verification

The following pages must be manually reviewed to complete the pending license verifications:

| Source | Pages to check | What to look for |
|---|---|---|
| OECD AI Incidents Monitor | https://oecd.ai/terms | Data reuse terms, citation permissions, commercial use restrictions |
| OECD AI Incidents Monitor | https://www.oecd.org/en/about/terms-conditions.html | General OECD data reuse policy |
| AIAAIC Repository | https://www.aiaaic.org/aiaaic-repository/user-guide | Data reuse terms, citation permissions |
| AIAAIC Repository | https://www.aiaaic.org/terms-of-use (if exists) | Terms of use for the website and database |
| MIT AI Incident Tracker | https://airisk.mit.edu/ | About page, terms of use, data license |
| MIT AI Incident Tracker | https://airisk.mit.edu/ai-incident-tracker | Any data license notice on the tracker page |

These verifications must be completed before any records from these sources are cited in Caesar incident records.

---

## 7. Important Disclaimers

- This document does not constitute legal advice.
- License verification findings recorded here are based on publicly available information as of 19 May 2026.
- License terms can change. Verify the current license before each new phase of implementation.
- The AIID CC BY-SA 4.0 ShareAlike clause has implications for any Caesar product that incorporates AIID data directly. This must be reviewed by Control Tower and potentially by a qualified legal professional before any direct data import.
- Do not claim that license verification is complete for OECD, AIAAIC, or MIT tracker until the manual verifications listed in section 6 are completed and recorded.
