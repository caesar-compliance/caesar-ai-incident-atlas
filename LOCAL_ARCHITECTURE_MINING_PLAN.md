# Local Architecture Mining Plan — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Status:** Approved internal policy
**Work item:** T002

---

## Purpose

This document defines how the Caesar AI Incident Atlas team may safely study external repositories, public incident databases, open-source projects, and benchmark websites to accelerate product development — without contaminating the Caesar repository with third-party code, restricted material, or unlicensed data.

This is an internal project policy and risk control document. It does not constitute legal advice or a legal compliance guarantee.

---

## 1. Core Principle

Caesar AI Incident Atlas is built as an original product. External sources are studied for inspiration, architecture patterns, and domain knowledge. They are never copied into the Caesar repository without explicit Control Tower approval and license verification.

The clean-room boundary is the Caesar repository itself:

```
External world (study zone)
    ↓ ideas, patterns, summaries, recommendations
Caesar repository (clean zone)
    ↓ original Caesar implementation only
```

Nothing crosses the boundary without passing through the clean-room process defined in `CLEAN_ROOM_IMPLEMENTATION_POLICY.md`.

---

## 2. What May Be Studied Locally

The following activities are permitted for any team member or AI agent working on this project:

### 2.1 Public repositories

- Clone public repositories to a local machine **outside** the Caesar repository directory.
- Read source code, data models, schemas, taxonomies, and configuration files.
- Run the project locally to understand its behavior.
- Take notes, write summaries, and produce Caesar-specific implementation recommendations.
- Document findings in Caesar repository files (summaries only, no copied code).

### 2.2 Public incident databases

- Browse and read public incident databases (AIID, OECD, AIAAIC, MIT tracker).
- Study their data models, record structures, taxonomy approaches, and UI patterns.
- Note which incidents are publicly documented and what sources they cite.
- Write original summaries of publicly available incident information.
- Do not copy database records, datasets, or structured data without verifying the applicable data license.

### 2.3 Public websites and documentation

- Browse and read public websites, documentation, and blog posts.
- Study UI/UX patterns, navigation structures, filter designs, and search implementations.
- Take screenshots for local reference (not committed to Caesar repo).
- Write UX inspiration notes and Caesar-specific design recommendations.

### 2.4 Academic papers and reports

- Read and study academic papers, OECD reports, and official publications.
- Cite them as references in Caesar documentation.
- Summarize findings in original words.
- Do not reproduce substantial portions of copyrighted text.

---

## 3. What Is Not Permitted

The following activities are not permitted without explicit Control Tower approval:

- Cloning external repositories **inside** the Caesar repository directory.
- Copying source code files from external repositories into the Caesar repository.
- Copying schema files, configuration files, or data files from external repositories.
- Copying UI components, CSS, HTML templates, or design assets.
- Copying dataset records, incident data, or taxonomy data without license verification.
- Committing any third-party file to the Caesar repository.
- Using external code in Caesar products without license verification and attribution.
- Reproducing substantial portions of copyrighted text in Caesar documentation.

---

## 4. Permitted Study Targets

The following external sources are approved for local architecture mining:

### 4.1 AI incident databases

| Source | URL | Study purpose |
|---|---|---|
| AI Incident Database (AIID) | https://github.com/responsible-ai-collaborative/aiid | Data model, record structure, taxonomy, search UX, citation model |
| OECD AI Incidents Monitor | https://oecd.ai/en/incidents | Policy framing, classification dimensions, hazards concept |
| AIAAIC Repository | https://www.aiaaic.org/aiaaic-repository | Incident coverage, sector organization, public accountability framing |
| MIT AI Incident Tracker | https://airisk.mit.edu/ai-incident-tracker | Risk/cause/harm/severity dimensions, dashboard UX, filter design |

### 4.2 Risk taxonomy tools

| Source | URL | Study purpose |
|---|---|---|
| IBM AI Atlas Nexus | https://github.com/IBM/ai-atlas-nexus | Risk taxonomy structure, ontology design, ID conventions |
| OECD AI Principles | https://oecd.ai/en/ai-principles | Policy-level risk framing |

### 4.3 Static site and search patterns

| Source | URL | Study purpose |
|---|---|---|
| Pagefind | https://github.com/CloudCannon/pagefind | Client-side search implementation patterns |
| Eleventy (11ty) | https://github.com/11ty/eleventy | Static site generation patterns |
| Astro | https://github.com/withastro/astro | Component-based static site patterns |

### 4.4 Evidence and governance format references

| Source | URL | Study purpose |
|---|---|---|
| Clyra Proof | https://github.com/Clyra-AI/proof | Schema-first evidence record design |
| FINOS AI Governance Framework | https://github.com/finos/ai-governance-framework | Governance framework structure |

---

## 5. Local Mining Workflow

When an agent or team member studies an external source, the workflow is:

```
1. Clone or browse the external source locally (outside Caesar repo).
2. Study the architecture, data model, taxonomy, UI, and implementation patterns.
3. Write a review using the THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md.
4. Add the source to THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md.
5. Write Caesar-specific implementation recommendations in original words.
6. Commit only the review summary and recommendations to the Caesar repo.
7. Do not commit any third-party files, code, or data.
```

---

## 6. What Outputs Are Allowed Back Into the Caesar Repository

The following outputs from local architecture mining may be committed to the Caesar repository:

| Output type | Allowed | Notes |
|---|---|---|
| Architecture summaries | Yes | Original words only, no copied text |
| Data model recommendations | Yes | Caesar-native design inspired by patterns studied |
| Taxonomy recommendations | Yes | Original Caesar taxonomy, not copied from external source |
| UI/UX design notes | Yes | Inspiration notes, not copied designs |
| Implementation recommendations | Yes | Original Caesar approach, not copied code |
| License notes | Yes | Document what was studied and its license |
| Third-party review documents | Yes | Using the review template |
| Register entries | Yes | In THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md |
| Copied source code | No | Never without explicit approval and license verification |
| Copied schema files | No | Never without explicit approval and license verification |
| Copied dataset records | No | Never without data license verification |
| Copied UI components | No | Never |
| Copied text from external sources | No | Summarize in original words only |

---

## 7. AI Agent Rules for Architecture Mining

When an AI coding agent (Kiro, Cursor, Claude Code, Codex, or similar) is performing architecture mining:

1. **Do not clone external repositories inside the Caesar repository directory.** Use a separate local directory outside the project.
2. **Do not use file-writing tools to create files containing third-party code.** Write only original Caesar content.
3. **Do not copy schema definitions verbatim** from external sources. Design Caesar schemas from first principles, informed by patterns studied.
4. **Do not copy taxonomy entries verbatim** from external sources. Write original Caesar taxonomy entries.
5. **Do not reproduce substantial portions of external documentation** in Caesar files. Summarize in original words.
6. **Always document the source** of any pattern or idea that informed a Caesar design decision.
7. **When in doubt, stop and ask** the Control Tower before proceeding.

---

## 8. Escalation Triggers

Stop and request Control Tower review if:

- A source has an unclear, missing, or restrictive license.
- A source uses AGPL, GPL, or a custom commercial license.
- The agent is unsure whether a pattern or data element is original or copied.
- A source explicitly prohibits the type of use being considered.
- The agent finds a dataset that would be valuable to include but has unclear data terms.
- Any external file is being considered for direct inclusion in the Caesar repository.

---

## 9. Relationship to Other Policy Documents

| Document | Relationship |
|---|---|
| `CLEAN_ROOM_IMPLEMENTATION_POLICY.md` | Defines the license classification table and clean-room implementation rules |
| `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md` | Template for documenting individual repository reviews |
| `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` | Running register of all sources reviewed |
| `docs/COMPETITOR_BENCHMARKS.md` | Strategic benchmark analysis (product-level, not code-level) |
| Hub `research/LICENSE_AND_CODE_POLICY.md` | Parent ecosystem license policy (takes precedence) |
