# Decision Log — caesar-ai-incident-atlas

**Last updated:** 19 May 2026

This document records all high-level technical, strategic, and governance decisions made for the `caesar-ai-incident-atlas` repository.

---

## Decision History

### [DEC-001] — 19 May 2026 — Repository Standardization and Governance

**Status:** Approved

**Decisions:**

1. **Ecosystem standards alignment.** This repository follows the standards, layouts, and style guides defined in the central Caesar AI Governance Hub.
2. **Execution framework.** Artem and ChatGPT act as the planning/review Control Tower. AI coding agents serve as executors.
3. **Competitor code policy.** No restricted competitor code or proprietary structures may be copied. All designs must be built from original specifications or permissively licensed open-source standards.

**Rationale:** Maintains structural coherence across all Caesar AI tools, preserves legal safety, and establishes a disciplined workflow for agent-driven development.

---

### [DEC-002] — 19 May 2026 — Product Positioning: Governance Mapping Layer, Not Incident Collection

**Status:** Approved

**Decision:**

Caesar AI Incident Atlas is positioned as a governance mapping layer, not a general-purpose incident database. Its primary value is:

```
incident → failure mode → relevant controls → required evidence → lessons
```

It does not aim to replace AIID, OECD AI Incidents Monitor, or AIAAIC. It adds a practical governance layer on top of publicly reported incidents.

**Rationale:**

- AIID, OECD, and AIAAIC already collect incidents well. Competing directly would require significant ongoing curation effort with limited differentiation.
- The governance mapping layer (incident → controls → evidence) is the unique Caesar value proposition.
- This positioning aligns with the broader Caesar ecosystem goal: turning AI usage and AI failures into structured governance evidence.
- It reduces legal risk by focusing on governance lessons rather than incident reporting.

---

### [DEC-003] — 19 May 2026 — Source and Citation Model: Citation-First, No Data Copying Without License Verification

**Status:** Approved

**Decision:**

Every incident record must include at least one verified public source. The Atlas does not copy data from external databases without verifying applicable data licenses. It cites sources carefully and adds original governance mapping value.

**Rationale:**

- Protects Caesar from data license violations.
- Maintains credibility through transparent sourcing.
- Avoids legal risk from reproducing third-party content without permission.
- Aligns with the Caesar license and code policy defined in the hub.

---

### [DEC-004] — 19 May 2026 — Wording Policy: Careful, Factual, No Legal Claims

**Status:** Approved

**Decision:**

All incident summaries and documentation must:

- use careful wording such as "reportedly", "according to public reports", "publicly documented";
- not make legal claims about organizations or individuals;
- not claim the incident dataset is complete or exhaustive;
- not claim that implementing controls would have prevented the incident with certainty;
- use phrases such as "curated public incident knowledge", "maps incidents to controls and evidence", "supports governance review", "helps explain practical AI risks".

**Rationale:**

- Protects Caesar and referenced organizations from defamation or legal claims.
- Maintains credibility and trust with users.
- Aligns with the Caesar safe wording policy defined in the hub.

---

### [DEC-005] — 19 May 2026 — Data Format: JSON with JSON Schema Validation

**Status:** Approved

**Decision:**

Incident records, taxonomy, and mapping data will be stored as JSON files validated against JSON Schema definitions.

**Rationale:**

- JSON is machine-readable and compatible with the `caesar-ai-evidence` format.
- JSON Schema provides validation without requiring a database or runtime.
- Easy to export, version-control, and consume by downstream tools.
- No external dependencies required for the data layer.

---

### [DEC-006] — 19 May 2026 — Taxonomy Structure: Two-Level Hierarchy

**Status:** Approved

**Decision:**

The failure mode taxonomy uses a two-level hierarchy:

```
Level 1: Category (e.g. FM-PRIV — Privacy)
Level 2: Sub-category (e.g. FM-PRIV-001 — Training data leakage)
```

**Rationale:**

- Simple enough to maintain with a small team.
- Detailed enough to be useful for control mapping.
- Consistent with IBM AI Risk Atlas taxonomy approach (Apache-2.0 reference).
- Extensible: new sub-categories can be added without restructuring the top level.

---

### [DEC-007] — 19 May 2026 — AI Agent Failure Category: Distinct Sub-Category

**Status:** Approved

**Decision:**

AI agent failures are treated as a distinct sub-category within the taxonomy, reflecting the growing use of autonomous AI agents in enterprise workflows. They are classified under FM-UNAUTH (Unauthorized action) and FM-SEC (Security) with agent-specific sub-categories.

**Rationale:**

- AI agent failures are a distinct and growing risk category.
- They require specific controls (agent governance, approval workflows, scope limits) that differ from general AI system controls.
- This aligns with the `caesar-ai-agent-ledger` product in the ecosystem.
- Differentiates Caesar from generic AI incident databases that do not focus on agent-specific governance.

---

### [DEC-008] — 19 May 2026 — Static Site: Future Phase, Not MVP

**Status:** Approved

**Decision:**

The public searchable static site at `incidents.caesar.no` is planned for v0.4, after the dataset MVP (v0.3) is complete. The MVP focuses on the data model, taxonomy, and incident records.

**Rationale:**

- Building the site before the data is ready would be premature.
- The data model and taxonomy must be stable before generating site pages.
- This follows the Caesar build order: data first, then presentation.

---

### [DEC-009] — 19 May 2026 — Benchmark References: Study and Cite, Do Not Copy

**Status:** Approved

**Decision:**

The following sources are used as benchmarks and citation references:

- AI Incident Database (AIID) — primary incident reference
- OECD AI Incidents and Hazards Monitor — policy-facing classification
- AIAAIC Repository — public-interest incident coverage
- MIT AI Incident Tracker — risk/cause/harm/severity dimensions
- IBM AI Risk Atlas / AI Atlas Nexus — risk taxonomy (Apache-2.0)

None of these sources' data or code is copied without verifying applicable licenses. Caesar adds original governance mapping value on top of publicly available information.

**Rationale:**

- Respects data licenses and intellectual property.
- Maintains Caesar's credibility as an original product.
- Aligns with the Caesar license and code policy.
