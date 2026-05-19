# Clean-Room Implementation Policy — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Approved internal policy
**Work item:** T002

---

## Purpose

This document defines the clean-room implementation approach for Caesar AI Incident Atlas. It establishes how the project uses external sources for inspiration and learning while ensuring that all Caesar code, schemas, data, and documentation are original implementations.

This is an internal project policy and risk control document. It does not constitute legal advice or a legal compliance guarantee. License questions with material business impact should be reviewed by a qualified legal professional.

---

## 1. Clean-Room Definition

A clean-room implementation is one where:

- the developer studies external sources to understand patterns, approaches, and domain knowledge;
- the developer then writes original code, schemas, and data from scratch, informed by that understanding;
- no external code, schemas, data, or text is copied directly into the Caesar repository;
- the resulting Caesar implementation is an original work, not a derivative of any external source.

The clean-room boundary is the Caesar repository. Everything inside the repository must be original Caesar work or explicitly approved third-party material with proper attribution.

---

## 2. Default Implementation Approach

The default approach for all Caesar AI Incident Atlas implementation is:

```
1. Study external sources locally (outside Caesar repo).
2. Write a review summary using the review template.
3. Design Caesar-native implementation from first principles.
4. Implement original Caesar code, schemas, and data.
5. Document sources of inspiration in review files and decision log.
6. Never copy external material into the Caesar repo without approval.
```

This applies to:
- JSON schemas and data models;
- taxonomy structures and IDs;
- incident record formats;
- control and evidence mappings;
- static site templates and components;
- CLI scripts and tooling;
- documentation structure and wording.

---

## 3. License Classification Table

This table defines what is permitted for each license category. All decisions are subject to verification of the actual current license of each specific source.

### 3.1 Classification table

| License category | Can study locally? | Can run locally? | Can copy code? | Can copy data? | Can use as UX inspiration? | Approval required? |
|---|---|---|---|---|---|---|
| **MIT / Apache-2.0 / BSD** | Yes | Yes | Yes, with attribution and license notice | Depends on data license | Yes | Yes — document in register |
| **GPL / LGPL** | Yes | Yes | High risk for Caesar products — see notes | Depends on data license | Yes | Yes — Control Tower review required |
| **AGPL** | Yes | Yes | High risk — do not copy without Control Tower approval | Depends on data license | Yes | Yes — Control Tower review required |
| **Creative Commons (CC-BY, CC-BY-SA)** | Yes | Yes | No code copying; text/data reuse depends on variant | CC-BY: yes with attribution; CC-BY-SA: copyleft applies | Yes | Yes — document variant and attribution |
| **Creative Commons (CC-BY-NC, CC-BY-ND)** | Yes | Yes | No | NC: no commercial use; ND: no derivatives | Yes | Yes — Control Tower review required |
| **No license** | Yes | Yes, for local study only | No — all rights reserved by default | No | Yes | Yes — Control Tower review required before any reuse |
| **Public website / no code** | Yes | N/A | No — website content is copyrighted | No — unless explicitly licensed | Yes | No — UX inspiration is always permitted |
| **Proprietary SaaS** | Yes (public UI) | No | No | No | Yes | No — UX inspiration is always permitted |
| **Business Source License (BSL)** | Yes | Yes, for internal study only | No — commercial restrictions apply | No | Yes | Yes — Control Tower review required |
| **EUPL** | Yes | Yes | Copyleft — compatibility must be verified | Depends on data license | Yes | Yes — Control Tower review required |
| **ODC-BY (Open Data Commons)** | Yes | Yes | N/A (data license) | Yes, with attribution | Yes | Yes — document attribution |
| **Unknown / unverified** | Yes | Yes, for local study only | No | No | Yes | Yes — verify license before any reuse |

### 3.2 Notes on GPL / LGPL

GPL and LGPL can create copyleft obligations when distributing software or offering network services. Copying GPL code into Caesar products that are distributed or offered as a service may require releasing Caesar source code under GPL terms. This is a significant business risk. Do not copy GPL code without Control Tower review and legal assessment.

LGPL is more permissive for library linking but still carries obligations. Verify the specific LGPL version and use case before any reuse.

### 3.3 Notes on AGPL

AGPL extends GPL copyleft to network use. If Caesar uses AGPL code in a service offered over a network (including SaaS), the AGPL may require releasing Caesar source code. This is a high-risk category for Caesar's commercial product direction. Do not copy AGPL code into Caesar repositories without explicit Control Tower approval and legal review.

### 3.4 Notes on MIT / Apache-2.0 / BSD

These are permissive licenses. Code may be reused with proper attribution and license notices. However:

- Always verify the actual current license of the specific file or repository before reuse.
- Keep all original copyright notices and license files.
- Document the reuse in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.
- Even with permissive licenses, the default approach is clean-room implementation. Reuse permissive code only when it provides clear value and the reuse is deliberate.

### 3.5 Notes on no-license repositories

A repository with no license file is not open-source. All rights are reserved by the author by default under copyright law. Treat no-license repositories as study-only. Do not copy any code, data, or text without explicit permission from the author.

### 3.6 Notes on public websites

Website content (text, images, UI design) is copyrighted by default. UX inspiration — studying how a site is organized, what filters it offers, how search works — is always permitted. Copying HTML, CSS, JavaScript, or text from a website is not permitted without a compatible license.

---

## 4. Clean-Room Process for Each Implementation Task

Before implementing any Caesar component that was informed by external source study:

### Step 1: Study phase (outside Caesar repo)

- Clone or browse the external source locally.
- Study the architecture, data model, and implementation patterns.
- Take notes in a local scratch file (not committed to Caesar repo).

### Step 2: Review documentation (inside Caesar repo)

- Complete a `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` for each source studied.
- Add the source to `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.
- Document the license and what was studied.

### Step 3: Design phase (inside Caesar repo)

- Write Caesar-native design documents (data model, taxonomy, schema drafts).
- Reference the external sources as inspiration, not as templates.
- Ensure the Caesar design is original and not a copy of any external design.

### Step 4: Implementation phase (inside Caesar repo)

- Implement original Caesar code, schemas, and data.
- Do not open the external source while writing Caesar code.
- If a specific pattern from an external source is used, document it in the decision log.

### Step 5: Review phase

- Review the implementation for any inadvertent copying.
- Verify that no external code, schemas, or data was included.
- Update the register and decision log.

---

## 5. Handling Ambiguous Cases

### "I found a great schema in an MIT-licensed repo. Can I use it?"

Default answer: No, not directly. Study it, understand the design, then write an original Caesar schema that solves the same problem. If there is a strong reason to reuse the schema directly, document the case and get Control Tower approval. Include proper attribution and license notice.

### "I found incident data on a public website. Can I include it?"

Default answer: No, not without verifying the data license. Website content is copyrighted. If the data is from a database with a permissive data license (e.g. ODC-BY), document the license, attribute the source, and get Control Tower approval. Write original summaries based on publicly available information rather than copying records.

### "I found a taxonomy in an Apache-2.0 repo. Can I use the same IDs?"

Default answer: No. Write original Caesar taxonomy IDs and definitions. The Apache-2.0 license allows code reuse with attribution, but the clean-room approach means writing original Caesar taxonomy from first principles. If the external taxonomy is a strong reference, cite it in the decision log.

### "I'm not sure what license a repo has."

Default answer: Treat it as no-license (all rights reserved). Do not copy anything. Study only. Escalate to Control Tower if reuse is needed.

---

## 6. Attribution Requirements

When any external source informs a Caesar design decision:

- Document the source in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.
- Add a note in `docs/DECISION_LOG.md` explaining what was studied and how it influenced the Caesar design.
- If permissive-license code is reused (with approval), add it to a `THIRD_PARTY_NOTICES.md` file with the full license notice.

---

## 7. Relationship to Hub Policy

This document is a project-level implementation of the Caesar AI Governance Hub license and code policy defined in:

```
caesar-ai-governance-hub/research/LICENSE_AND_CODE_POLICY.md
```

If this document conflicts with the hub policy, the hub policy takes precedence. This document adds project-specific detail and process for the incident atlas context.

---

## 8. Policy Review

This policy should be reviewed:

- before starting any new implementation phase;
- when a new external source is being considered for study or reuse;
- when the hub license policy is updated;
- at least once per major version release.

Control Tower (Artem / ChatGPT) is responsible for approving any exceptions to this policy.
