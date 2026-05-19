# Decision Log — caesar-ai-incident-atlas

**Last updated:** 19 May 2026 (T007 — DEC-045)

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

### [DEC-010] — 19 May 2026 — Local Architecture Mining Is Permitted Outside the Caesar Repository

**Status:** Approved

**Decision:**

External repositories, public incident databases, and benchmark websites may be cloned and studied locally on a developer's machine or in a separate directory outside the Caesar repository. This is explicitly permitted and encouraged as part of the product development process.

The Caesar repository itself remains a clean zone. No external files, code, schemas, or data may be committed to the Caesar repository without explicit Control Tower approval and license verification.

**Rationale:**

- Local architecture mining accelerates product development by allowing the team to learn from existing implementations.
- Keeping the clean-room boundary at the repository level (not the developer's machine) is practical and sufficient for risk control.
- This approach is consistent with standard clean-room software development practice.

---

### [DEC-011] — 19 May 2026 — No-License Repositories Are Study-Only by Default

**Status:** Approved

**Decision:**

Any repository or source that does not have a clearly identified license is treated as study-only by default. All rights are reserved by the author under copyright law when no license is present. No code, data, schemas, or text from no-license sources may be copied into the Caesar repository without explicit permission from the author and Control Tower approval.

**Rationale:**

- Copyright law reserves all rights to the author by default when no license is granted.
- Assuming permissive use of no-license material is a legal risk.
- The study-only default is conservative and protects Caesar from inadvertent copyright infringement.

---

### [DEC-012] — 19 May 2026 — AGPL and GPL Are High-Risk Categories for Caesar Products

**Status:** Approved

**Decision:**

AGPL and GPL licensed code is classified as high-risk for Caesar products. Copying AGPL or GPL code into Caesar repositories that are distributed or offered as a service may trigger copyleft obligations requiring Caesar to release its source code under the same license. This is incompatible with Caesar's commercial product direction.

Default policy: do not copy AGPL or GPL code into Caesar repositories without separate Control Tower approval and legal review.

AGPL is higher risk than GPL because its copyleft extends to network use (SaaS), which is directly relevant to Caesar AI Governance OS.

**Rationale:**

- Caesar AI Governance OS is planned as a commercial SaaS / self-hosted product.
- AGPL copyleft triggered by network use would require open-sourcing Caesar's commercial platform.
- GPL copyleft triggered by distribution would require open-sourcing distributed Caesar products.
- The risk is material and must be managed explicitly.

---

### [DEC-013] — 19 May 2026 — Permissive-License Code Requires Attribution, License Notice, and Explicit Approval

**Status:** Approved

**Decision:**

Even when a source uses a permissive license (MIT, Apache-2.0, BSD), copying code into the Caesar repository requires:

1. Verification of the actual current license of the specific file or repository.
2. Explicit Control Tower approval for the specific reuse.
3. Attribution in the form of a `THIRD_PARTY_NOTICES.md` entry with the full license notice.
4. Documentation in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`.

The default approach remains clean-room Caesar-native implementation even for permissive-license sources. Reuse is permitted but not the default.

**Rationale:**

- Permissive licenses still require attribution and license notices.
- Deliberate reuse decisions are better than accidental copying.
- Documenting reuse decisions creates a clear audit trail.
- Clean-room implementation produces more original and differentiated Caesar products.

---

### [DEC-014] — 19 May 2026 — T003 Is the Next Step Before Dataset MVP

**Status:** Approved

**Decision:**

The next task after T002 (clean-room policy) is T003: review and reconcile `DATA_MODEL_DRAFT.md`, `TAXONOMY_DRAFT.md`, and the source/citation policy into a stable v0.2 draft contract. The dataset MVP (v0.3) does not begin until T003 is complete and approved by the Control Tower.

**Rationale:**

- The data model and taxonomy must be stable before incident records are created.
- The source/citation policy must be clear before any external data is referenced.
- Starting the dataset MVP with an unstable data model would require rework.
- T003 is a low-risk documentation task that can be completed quickly and provides a solid foundation for v0.3.

### [DEC-015] — 19 May 2026 — Incident IDs Use Sequential Four-Digit Format

**Status:** Approved

**Decision:** Incident IDs use the format `INC-0001`, `INC-0002`, etc. Sequential, zero-padded to four digits.

**Rationale:** Sequential IDs are simpler to manage than content-based IDs. Four digits (not three) provides room for up to 9,999 records without a format change. Encoding content into IDs (e.g. INC-HALL-2023-001) creates maintenance burden when taxonomy or dates change.

---

### [DEC-016] — 19 May 2026 — Evidence Requirements Are Free-Text Strings for v0.2

**Status:** Approved

**Decision:** The `evidence_required` field in incident records uses free-text strings for v0.2, not EV- ID references.

**Rationale:** Free-text strings are easier to write and read during early curation. The evidence type registry (EV-001 through EV-014) is the reference, but incident records describe evidence requirements in plain language. EV- ID references will be introduced in v0.3 or v0.4 once the registry is stable and the curation process is mature.

---

### [DEC-017] — 19 May 2026 — Export Format Is One File Per Incident

**Status:** Approved

**Decision:** The caesar-ai-evidence export format produces one file per incident, not a single combined file.

**Rationale:** Per-incident files are easier to manage, version, and selectively import. A combined export can always be generated from individual files. The reverse is harder. Per-incident files also align with the one-JSON-file-per-incident data storage approach.

---

### [DEC-018] — 19 May 2026 — Schema Is Lenient for v0.2 — 11 Required Fields

**Status:** Approved

**Decision:** The v0.2 incident record schema requires only 11 fields: incident_id, title, date, sources, summary, failure_modes, severity, confidence, controls, evidence_required, lessons. All other fields are optional or deferred.

**Rationale:** A strict schema with many required fields slows down curation and produces incomplete records. A lenient schema allows the first batch of records to be created quickly. Optional fields can be added as the curation process matures. The 11 required fields are sufficient to deliver the core governance mapping value.

---

### [DEC-019] — 19 May 2026 — Taxonomy Versioned Together With Dataset

**Status:** Approved

**Decision:** The taxonomy is versioned together with the incident dataset, not separately. Breaking changes (changing or removing existing IDs) require a major version bump. Additive changes (new sub-categories, new controls) do not.

**Rationale:** The taxonomy and dataset are tightly coupled. Separate versioning adds complexity without clear benefit at this stage. Versioning them together makes the dependency explicit and reduces the risk of version mismatch.

---

### [DEC-020] — 19 May 2026 — FM-REL Sub-Categories Are Draft for v0.2

**Status:** Approved

**Decision:** The FM-REL (Reliability) top-level category is stable for v0.2. Its four sub-categories (FM-REL-001 through FM-REL-004) are draft and should not be used in v0.2 incident records. Use the top-level FM-REL only.

**Rationale:** Reliability incidents are harder to document from public sources compared to other failure modes. The sub-categories may need refinement once the first batch of records is curated. Using only the top-level category avoids premature commitment to sub-category definitions.

---

### [DEC-021] — 19 May 2026 — system_type Is Free-Text for v0.2; Controlled Vocabulary Deferred

**Status:** Approved

**Decision:** The `system_type` field is a free-text string for v0.2. A controlled vocabulary will be introduced in v0.3 or v0.4 once patterns emerge from the first batch of incident records.

**Rationale:** Defining a controlled vocabulary before seeing real data risks creating categories that do not match the actual incident dataset. Free-text allows curators to describe system types naturally, and the controlled vocabulary can be derived from the patterns that emerge.

---

### [DEC-022] — 19 May 2026 — T004 Is the Next Step After T003

**Status:** Approved

**Decision:** The next task after T003 is T004 — Dataset MVP Preparation. T004 prepares the final schema implementation plan, first incident candidate selection criteria, source verification workflow, and licensing/source safety checklist. No data ingestion in T004 unless separately approved.

**Rationale:** T003 defines the product model. T004 prepares the implementation plan and candidate selection before any incident records are created. This staged approach reduces the risk of creating records that need to be reworked due to unclear model or source policy.

---

### [DEC-023] — 19 May 2026 — T004 Preparation Documents Placed in Repository Root

**Status:** Approved

**Decision:** The four T004 preparation documents are placed in the repository root rather than in `docs/`:
- `DATASET_MVP_IMPLEMENTATION_PLAN.md`
- `FIRST_INCIDENT_SELECTION_CRITERIA.md`
- `SOURCE_VERIFICATION_WORKFLOW.md`
- `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`

**Rationale:** These documents are active operational references that curators and agents will use during v0.3 implementation. Placing them in the root makes them immediately visible alongside other active policy documents (`V0_2_DRAFT_PRODUCT_CONTRACT.md`, `SOURCE_AND_CITATION_POLICY_DRAFT.md`, etc.). The `docs/` folder is reserved for research, analysis, and background documents. The T004 preparation documents are operational, not background. This overrides the earlier references in ROADMAP.md and NEXT_ACTIONS.md that listed them under `docs/`.

---

### [DEC-024] — 19 May 2026 — AIID Data License Verified as CC BY-SA 4.0

**Status:** Approved

**Decision:** The AI Incident Database (AIID) data license has been verified as **Creative Commons Attribution ShareAlike 4.0 (CC BY-SA 4.0)** for the following collections: incidents, quickadd, duplicates, taxa, classifications, entities, entity_relationships. The `text` field of the reports collection is explicitly excluded from the CC BY-SA 4.0 license.

**Source:** AIID Terms of Use page (https://incidentdatabase.ai/terms-of-use/), effective August 7, 2025. Verified 19 May 2026.

**Implications:**
1. AIID incident records can be cited as secondary sources in Caesar incident records, with attribution.
2. The `text` field of AIID reports cannot be copied into Caesar incident records.
3. Any direct import of AIID data (beyond citation) requires Control Tower approval. The CC BY-SA 4.0 ShareAlike clause means derivative works must be distributed under the same license — this has implications for Caesar's commercial product direction and must be reviewed before any direct data import.

**Rationale:** Verification was performed by fetching the official AIID Terms of Use page during T004. The license is clearly stated and unambiguous for the listed collections.

---

### [DEC-025] — 19 May 2026 — IBM AI Atlas Nexus License Confirmed as Apache-2.0

**Status:** Approved

**Decision:** The IBM AI Atlas Nexus license has been confirmed as **Apache License 2.0** from the GitHub repository (https://github.com/IBM/ai-atlas-nexus). This confirms the earlier partial verification recorded in `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md` entry A-005.

**Source:** GitHub repository page for IBM/ai-atlas-nexus, verified 19 May 2026.

**Implications:** IBM AI Atlas Nexus can be cited as a reference and inspiration source. Any direct reuse of code or data still requires Control Tower approval and proper attribution. The default approach remains clean-room Caesar-native implementation.

**Rationale:** Verification was performed by fetching the GitHub repository page during T004. The Apache-2.0 license is clearly stated in the repository metadata and README.

---

### [DEC-026] — 19 May 2026 — OECD, AIAAIC, and MIT Tracker License Verifications Remain Pending

**Status:** Approved (pending items acknowledged)

**Decision:** The data reuse terms for OECD AI Incidents Monitor, AIAAIC Repository, and MIT AI Incident Tracker could not be fully verified during T004 from automated web access. Manual verification is required before these sources can be cited in Caesar incident records.

The specific pages requiring manual verification are documented in `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md` section 6.

**Implication:** Caesar incident records in v0.3 must not cite OECD, AIAAIC, or MIT tracker records until the manual verifications are complete and recorded. Incidents can be sourced from AIID (with CC BY-SA 4.0 attribution rules applied) and from primary sources (official reports, news) without these verifications.

**Rationale:** Web access during T004 could not extract the full content of the OECD terms page, AIAAIC user guide, or MIT tracker terms. Rather than guessing or assuming permissive terms, the conservative approach is to mark these as pending and require manual verification.

---

### [DEC-027] — 19 May 2026 — T005 Is the Next Step After T004

**Status:** Approved

**Decision:** The next task after T004 is T005 — Dataset MVP Schema and Taxonomy Files, but only after Control Tower approval of T004.

T005 scope (proposed):
- Create `schemas/incident.schema.json`, `schemas/taxonomy.schema.json`, `schemas/export.schema.json`
- Create `data/taxonomy/failure-modes.json`, `data/taxonomy/controls.json`, `data/taxonomy/evidence-types.json`, `data/taxonomy/sectors.json`
- Create `data/mappings/control-evidence.json`
- Create `exports/.gitkeep`
- Create validation documentation

T005 must not create real incident records unless separately approved.

**Rationale:** The schema and taxonomy files are the prerequisite for incident record creation. They must be created and validated before any incident records are curated. T005 is a lower-risk step than incident curation because it does not involve external data or source verification. Separating schema creation (T005) from incident curation (v0.3) allows the schema to be reviewed and approved before any records are created against it.

---

### [DEC-028] — 19 May 2026 — T005 Incident Schema Uses Lenient 11-Field Contract

**Status:** Approved

**Decision:** `schemas/incident.schema.json` is implemented as a lenient v0.2 schema requiring only the 11 fields defined in DEC-018 and `V0_2_FIELD_PRIORITY_TABLE.md`.

The schema enforces:
- `incident_id` pattern `INC-0001`;
- source fields (`url`, `database`, `accessed`) as required in each source entry;
- severity enum (`low`, `medium`, `high`, `critical`);
- confidence enum (`low`, `medium`, `high`);
- `failure_modes` and `controls` ID prefix patterns;
- free-text `evidence_required` for v0.2.

**Rationale:** This preserves contract stability, avoids overfitting, and keeps curation practical for the first dataset phase.

---

### [DEC-029] — 19 May 2026 — T005 Taxonomy Files Use Stable-First Entries with Explicit Draft Status

**Status:** Approved

**Decision:** T005 taxonomy JSON files in `data/taxonomy/` are created with Caesar-native IDs and concise descriptions. Entries use explicit `status` markers (`stable` or `draft`) where relevant.

Files created:
- `failure_modes.json`
- `controls.json`
- `evidence_types.json`
- `sectors.json`
- `confidence_levels.json`
- `severity_levels.json`

**Rationale:** Stable-first taxonomy supports immediate schema alignment while preserving caution around draft areas from `V0_2_TAXONOMY_REVIEW.md`.

---

### [DEC-030] — 19 May 2026 — `data/incidents/` Remains Empty in T005

**Status:** Approved

**Decision:** `data/incidents/` is created with `.gitkeep` only. No real incident records, no fake records, and no sample placeholders are created in T005.

**Rationale:** T005 is limited to schema/taxonomy/validation foundation work. Incident content curation is deferred to later approval-gated steps.

---

### [DEC-031] — 19 May 2026 — T006 Is the Next Likely Step After T005

**Status:** Approved

**Decision:** The next step after T005 is likely T006 — First Incident Candidate Dossier Preparation, only after Control Tower approval.

T006 scope should include candidate dossier preparation for 10–20 possible incidents with:
- public source links;
- source verification notes;
- provisional confidence/severity rationale;
- Control Tower review package.

T006 must not mass-import data and must not create final incident records unless separately approved.

**Rationale:** Dossier-first sequencing preserves source-quality and license-safety gates before committing incident records.

---

### [DEC-032] — 19 May 2026 — T006: Candidate Dossier Format is Markdown Prose

**Status:** Approved

**Decision:** Candidate dossiers are written as structured Markdown prose documents, not as JSON incident objects.

**Rationale:** Dossiers are pre-approval research documents. JSON format would risk confusion with final incident records. Markdown accommodates hedging language, open questions, and source annotations.

---

### [DEC-033] — 19 May 2026 — T006: Candidate ID Format CAND-NNN

**Status:** Approved

**Decision:** Provisional candidate IDs use the format `CAND-001`, `CAND-002`, etc. These are temporary research identifiers, not final incident IDs.

**Rationale:** Clearly distinct from final `INC-XXXX` IDs. Prevents premature assignment of incident record identifiers before Control Tower approval.

---

### [DEC-034] — 19 May 2026 — T006: Public Primary Sources Only; No External Dataset Import

**Status:** Approved

**Decision:** Dossiers reference only publicly available primary sources. AIID, AIAAIC, OECD, MIT Tracker, and IBM databases used only as discovery pointers — no data copied.

**Rationale:** Aligned with `SOURCE_AND_CITATION_POLICY_DRAFT.md` and `LICENSE_AND_SOURCE_SAFETY_CHECKLIST.md`. Discovery pointers are acceptable; copying structured data is not.

---

### [DEC-035] — 19 May 2026 — T006: Schema Usability Observations Recorded Without Modifying Schema

**Status:** Approved

**Decision:** Schema friction observations from dossier preparation are recorded in `work-items/T006.../DECISIONS.md` and summarised in `work-items/T006.../IMPLEMENTATION_REPORT.md`. The schema itself is not modified in T006.

**Rationale:** T006 is a research task, not a schema revision task. Observations should inform a future revision in T007 or a dedicated schema update task.

**Key observations:**
1. `source.database` field too narrow for court/regulatory sources — rename consideration for v0.3.
2. `evidence_required` as free text works for v0.2 but will not scale; array of taxonomy IDs preferred for v0.3.
3. No taxonomy ID validation in `failure_modes` array — backlog item.
4. `incident_date` requires `YYYY-MM-DD` but many public incidents have year/month precision only — consider `date_precision` field in v0.3.

---

### [DEC-036] — 19 May 2026 — T006: 15 Candidates Prepared — 10 Accept, 4 Postpone, 1 Reject

**Status:** Approved

**Decision:** 15 candidate dossiers prepared. 10 recommended Accept, 4 Postpone, 1 Reject. Candidates cover 9 sectors and 7 of 8 failure mode categories (FM-SEC gap noted).

**Rationale:** 15 provides sufficient diversity for first MVP batch review while keeping the review manageable. All 10 Accept candidates have strong or very strong primary source quality.

---

### [DEC-037] — 19 May 2026 — T006: T007 is Next Step — Gated on Control Tower Approval

**Status:** Approved

**Decision:** The next step after T006 is T007 — First Incident Record Creation Plan, but only after explicit Control Tower review and approval of the T006 dossier shortlist. `data/incidents/` remains empty except `.gitkeep` until T007 is formally approved and initiated.

**Rationale:** Incident record creation is a critical governance gate. Premature record creation would undermine source-quality and license-safety controls established in T004 and T005.

---

### [DEC-038] — 19 May 2026 — T007: `source.database` Field Must Be Renamed Before T008

**Status:** Approved

**Decision:** The `source.database` field in `schemas/incident.schema.json` must be renamed to `source_type` with an expanded enum before any incident records are created in T008. The current enum `["AIID", "OECD", "AIAAIC", "MIT", "news", "official", "other"]` cannot accurately represent the source types of the approved candidates (court records, NTSB reports, civil tribunal rulings, academic papers).

**Proposed enum:** `["court_record", "government_report", "regulatory_decision", "company_statement", "news", "academic", "civil_tribunal", "legislative", "other"]`

**Rationale:** Field naming accuracy matters for downstream consumers. `database` implies a structured external database reference. All 4 Tier 1 candidates require source types not cleanly expressible in the current enum.

---

### [DEC-039] — 19 May 2026 — T007: T008 Limited to Tier 1 Candidates Only

**Status:** Approved

**Decision:** T008 scope is limited to the four Tier 1 candidates (CAND-003, CAND-006, CAND-011, CAND-012). Second-wave candidates are planned for T009. All four Tier 1 candidates have unambiguous primary official sources.

**Rationale:** Starting with the strongest sources minimises risk of schema, citation, or wording errors in the first production records and establishes a quality baseline.

---

### [DEC-040] — 19 May 2026 — T007: `incident_date` Partial-Precision Workaround

**Status:** Approved

**Decision:** Where only month/year precision is available, use last day of month as `date` value and add a `date_note` field with actual precision. Where only year is available, use `1 January YYYY` with a `date_note`. Propose `date_precision` enum field in v0.3 schema.

**Rationale:** v0.2 schema requires `DD Month YYYY` format. Many public incidents only have month or year precision.

---

### [DEC-041] — 19 May 2026 — T007: `evidence_required` EV-XXX Prefix Convention

**Status:** Approved

**Decision:** `evidence_required` array entries in T008 records use the format `"EV-XXX — [description]"` (e.g., `"EV-004 — Human oversight record"`). This embeds taxonomy IDs for future structured parsing while remaining v0.2 schema compliant.

**Rationale:** Forward-compatible with a future array-of-IDs approach without requiring a schema change in v0.2.

---

### [DEC-042] — 19 May 2026 — T007: `failure_modes` and `controls` Use Canonical Taxonomy IDs Only

**Status:** Approved

**Decision:** `failure_modes` and `controls` array entries must use exact taxonomy IDs from `data/taxonomy/failure_modes.json` and `data/taxonomy/controls.json`. No free-text entries permitted.

**Rationale:** Prevents taxonomy drift and ensures forward compatibility even though the v0.2 schema does not validate against the taxonomy file.

---

### [DEC-043] — 19 May 2026 — T007: `lessons` Field Must Be Governance-Oriented

**Status:** Approved

**Decision:** The `lessons` array must contain actionable governance lessons referencing a control gap or improvement, not re-descriptions of the incident. Lessons should be generalisable beyond the specific case.

**Rationale:** The Atlas's primary value is the governance mapping layer. Lessons must be useful to compliance teams.

---

### [DEC-044] — 19 May 2026 — T007: `summary` Field — Original Caesar Writing Only

**Status:** Approved

**Decision:** The `summary` field must be written entirely in Caesar's own words. No copying or close paraphrasing of source text. Required wording conventions: `"The [court/tribunal] found that..."` for officially confirmed facts; `"Reportedly..."` or `"According to [source]..."` for secondary-source facts.

**Rationale:** Source and citation policy requires original writing. Protects Caesar from copyright and defamation risk.

---

### [DEC-045] — 19 May 2026 — T007: Schema Modification Deferred to T008 Pre-Work

**Status:** Approved

**Decision:** `schemas/incident.schema.json` is not modified in T007. The `source.database` rename is the first action in T008 pre-work, before any records are written. All schema friction observations are documented in T007 DECISIONS.md and IMPLEMENTATION_REPORT.md.

**Rationale:** T007 is a planning task. Schema changes in a planning task would be premature and out of scope.
