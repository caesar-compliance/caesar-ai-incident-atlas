# Third-Party Code and License Register — caesar-ai-incident-atlas

**Last updated:** 19 May 2026
**Purpose:** Running register of all third-party sources reviewed, considered, or used in the Caesar AI Incident Atlas project.

---

## How to Use This Register

Add an entry to this register whenever:
- a third-party repository is studied as part of local architecture mining;
- a third-party source is considered for code or data reuse;
- a third-party source is approved for reuse and included in the project.

This register is an internal risk control document. It does not constitute legal advice.

---

## Register

### Section A: Sources Studied (No Reuse)

Sources that have been studied for architecture mining, inspiration, or domain knowledge. No code or data from these sources has been copied into the Caesar repository.

---

#### A-001 — AI Incident Database (AIID)

| Field | Value |
|---|---|
| Source name | AI Incident Database |
| URL | https://incidentdatabase.ai/ |
| Repository | https://github.com/responsible-ai-collaborative/aiid |
| Source type | Public repository + public website |
| Study date | 19 May 2026 (initial research) |
| Studied by | Caesar AI Governance Hub research phase |
| License (code) | Verify current license before any reuse |
| License (data) | **CC BY-SA 4.0** — Creative Commons Attribution ShareAlike 4.0 (verified 19 May 2026) |
| License verified | **Yes** — verified 19 May 2026 from official Terms of Use page (https://incidentdatabase.ai/terms-of-use/, effective August 7, 2025) |
| Code reuse | Not approved — study only |
| Data reuse | Citation permitted with attribution. Direct import requires Control Tower approval — CC BY-SA 4.0 ShareAlike clause has implications for Caesar's commercial product direction. The `text` field of reports is excluded from CC BY-SA 4.0. |
| Study purpose | Data model, record structure, taxonomy approach, citation model, search UX |
| Caesar use | Benchmark reference and citation source for incident records |
| Notes | Primary incident reference. Cite as secondary source with attribution. Do not copy the `text` field of AIID reports. Any direct data import beyond citation requires Control Tower approval and legal review of ShareAlike implications. Attribution format: "Source: AI Incident Database (AIID), https://incidentdatabase.ai/, licensed under CC BY-SA 4.0." |

---

#### A-002 — OECD AI Incidents and Hazards Monitor

| Field | Value |
|---|---|
| Source name | OECD AI Incidents and Hazards Monitor |
| URL | https://oecd.ai/en/incidents |
| Repository | N/A (public website) |
| Source type | Public website / official resource |
| Study date | 19 May 2026 (initial research) |
| Studied by | Caesar AI Governance Hub research phase |
| License (code) | N/A |
| License (data) | Verify OECD data reuse terms before any reuse |
| License verified | No — pending verification |
| Code reuse | N/A |
| Data reuse | Not approved — pending license verification |
| Study purpose | Policy-facing incident classification, hazards framing, OECD AI Principles alignment |
| Caesar use | Benchmark reference and citation source |
| Notes | Authoritative policy source. Cite as reference. Do not copy data without verifying OECD terms. |

---

#### A-003 — AIAAIC Repository

| Field | Value |
|---|---|
| Source name | AIAAIC Repository (AI, Algorithmic, and Automation Incidents and Controversies) |
| URL | https://www.aiaaic.org/aiaaic-repository |
| Repository | N/A (public website / spreadsheet) |
| Source type | Public website / dataset |
| Study date | 19 May 2026 (initial research) |
| Studied by | Caesar AI Governance Hub research phase |
| License (code) | N/A |
| License (data) | Verify AIAAIC data reuse terms before any reuse |
| License verified | No — pending verification |
| Code reuse | N/A |
| Data reuse | Not approved — pending license verification |
| Study purpose | Incident coverage, sector organization, public accountability framing |
| Caesar use | Benchmark reference and citation source |
| Notes | Broad incident coverage. Verify data terms before citing specific records. |

---

#### A-004 — MIT AI Incident Tracker

| Field | Value |
|---|---|
| Source name | MIT AI Incident Tracker |
| URL | https://airisk.mit.edu/ai-incident-tracker |
| Repository | N/A (public website) |
| Source type | Public website |
| Study date | 19 May 2026 (initial research) |
| Studied by | Caesar AI Governance Hub research phase |
| License (code) | N/A |
| License (data) | Verify MIT tracker data reuse terms before any reuse |
| License verified | No — pending verification |
| Code reuse | N/A |
| Data reuse | Not approved — pending license verification |
| Study purpose | Risk/cause/harm/severity classification dimensions, dashboard UX, filter design |
| Caesar use | Benchmark reference for classification dimensions and UX patterns |
| Notes | Derived from AIID. Verify both AIID and MIT tracker terms before citing specific records. |

---

#### A-005 — IBM AI Risk Atlas / AI Atlas Nexus

| Field | Value |
|---|---|
| Source name | IBM AI Risk Atlas / AI Atlas Nexus |
| URL | https://github.com/IBM/ai-atlas-nexus |
| Repository | https://github.com/IBM/ai-atlas-nexus |
| Source type | Public repository |
| Study date | 19 May 2026 (initial research) |
| Studied by | Caesar AI Governance Hub research phase |
| License (code) | Apache-2.0 (verify current license before any reuse) |
| License (data) | Apache-2.0 (verify current license before any reuse) |
| License verified | Yes — verified 19 May 2026 from official repository license file (https://github.com/IBM/ai-atlas-nexus/blob/main/LICENSE) |
| Code reuse | Conditional — permissive if Apache-2.0 confirmed; requires attribution and Control Tower approval |
| Data reuse | Conditional — permissive if Apache-2.0 confirmed; requires attribution and Control Tower approval |
| Study purpose | Risk taxonomy structure, ontology design, ID conventions, risk-to-action mapping |
| Caesar use | Taxonomy design inspiration; potential reference for control mapping approach |
| Notes | Apache-2.0 confirmed for repository. Citation and study are permitted. Direct code/data reuse remains approval-gated and requires attribution if approved. If reuse is approved, add to THIRD_PARTY_NOTICES.md. |

---

#### A-006 — OECD Common Reporting Framework for AI Incidents

| Field | Value |
|---|---|
| Source name | OECD Common Reporting Framework for AI Incidents |
| URL | https://www.oecd.org/en/publications/towards-a-common-reporting-framework-for-ai-incidents_f326d4ac-en.html |
| Repository | N/A (publication) |
| Source type | Academic / official publication |
| Study date | 19 May 2026 (initial research) |
| Studied by | Caesar AI Governance Hub research phase |
| License (code) | N/A |
| License (data) | OECD publication terms apply |
| License verified | No |
| Code reuse | N/A |
| Data reuse | Not approved — cite as reference only |
| Study purpose | Incident reporting fields, consistency model, what information is needed for policy-relevant records |
| Caesar use | Reference for incident record field design |
| Notes | Cite as reference. Do not reproduce substantial portions of the publication. |

---

### Section B: Sources Approved for Reuse

*No sources have been approved for code or data reuse as of 19 May 2026.*

When a source is approved for reuse, add an entry here with:
- approval date;
- approving party (Control Tower);
- what specifically is approved for reuse;
- attribution requirements;
- link to THIRD_PARTY_NOTICES.md entry.

---

### Section C: Sources Rejected for Reuse

*No sources have been formally reviewed and rejected for reuse as of 19 May 2026.*

When a source is reviewed and rejected for reuse, add an entry here with:
- rejection date;
- reason for rejection;
- whether study-only use is still permitted.

---

## Pending License Verifications

The following sources require license verification before any data or code reuse can be considered:

| Source | What needs verification | Priority |
|---|---|---|
| OECD AI Incidents Monitor | Data reuse terms | High — needed before dataset MVP |
| AIAAIC Repository | Data reuse terms | High — needed before dataset MVP |
| MIT AI Incident Tracker | Data reuse terms | Medium |

AIID data license (CC BY-SA 4.0) and IBM AI Atlas Nexus license (Apache-2.0) were verified in T004. Remaining pending verifications should be completed before incident curation that cites OECD, AIAAIC, or MIT tracker records.

---

## Register Maintenance

This register must be updated:
- whenever a new source is studied;
- whenever a license is verified;
- whenever a reuse decision is made;
- whenever a source is added to or removed from the project.

The register is reviewed as part of each major phase closeout.
