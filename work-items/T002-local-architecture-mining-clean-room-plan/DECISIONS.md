# Decisions — T002: Local Architecture Mining / Clean-Room Acceleration Plan

**Work item:** T002
**Date:** 19 May 2026

---

## Decisions Made During T002

The following decisions were made during the execution of T002. They are also recorded in `docs/DECISION_LOG.md` as DEC-010 through DEC-014.

---

### D-T002-001 — Local mining is permitted outside the Caesar repository

External repositories may be cloned and studied locally on a developer's machine or in a separate directory outside the Caesar repository. The clean-room boundary is the repository itself, not the developer's machine.

**Rationale:** Practical and sufficient for risk control. Consistent with standard clean-room software development practice.

---

### D-T002-002 — No-license repositories are study-only by default

Any repository without a clearly identified license is treated as study-only. All rights are reserved by the author under copyright law when no license is present.

**Rationale:** Conservative default that protects Caesar from inadvertent copyright infringement.

---

### D-T002-003 — AGPL and GPL are high-risk categories

AGPL and GPL code must not be copied into Caesar repositories without separate Control Tower approval and legal review. AGPL is higher risk than GPL because its copyleft extends to network use (SaaS).

**Rationale:** Caesar AI Governance OS is planned as a commercial SaaS product. AGPL copyleft triggered by network use would require open-sourcing the commercial platform.

---

### D-T002-004 — Permissive-license reuse requires attribution, license notice, and explicit approval

Even MIT/Apache-2.0/BSD code requires Control Tower approval, attribution, and a THIRD_PARTY_NOTICES.md entry before being copied into the Caesar repository. The default approach remains clean-room implementation.

**Rationale:** Deliberate reuse decisions are better than accidental copying. Creates a clear audit trail.

---

### D-T002-005 — T003 is the next step before dataset MVP

The dataset MVP (v0.3) does not begin until T003 (data model / taxonomy / citation contract) is complete and approved by the Control Tower.

**Rationale:** The data model and taxonomy must be stable before incident records are created. Starting the dataset MVP with an unstable data model would require rework.

---

### D-T002-006 — License classification table covers 12 categories

The clean-room policy covers: MIT/Apache-2.0/BSD, GPL/LGPL, AGPL, Creative Commons (permissive variants), Creative Commons (restrictive variants), no license, public website/no code, proprietary SaaS, Business Source License (BSL), EUPL, ODC-BY, and unknown/unverified.

**Rationale:** These categories cover all sources likely to be encountered during Caesar AI Incident Atlas development. The table provides clear guidance for each category without requiring legal expertise for routine decisions.

---

### D-T002-007 — THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md is the single source of truth for source tracking

All third-party sources studied, considered, or used must be registered in this file. It is the authoritative record for license verification status and reuse decisions.

**Rationale:** A single register is easier to maintain and audit than distributed notes across multiple files.
