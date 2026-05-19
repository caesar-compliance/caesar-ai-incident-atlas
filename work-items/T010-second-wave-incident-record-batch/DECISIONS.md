# T010 Decisions Log

**Task:** T010 — Second-Wave Incident Record Batch  
**Branch:** `data/T010-second-wave-incident-record-batch`  
**Date:** 19 May 2026

---

## DEC-T010-001 — All 6 Candidates Pass Source Gate

**Decision:** All 6 approved candidates (CAND-002, CAND-004, CAND-005, CAND-009, CAND-010, CAND-015) passed the source gate. All 6 records created. No candidates skipped.

**Rationale:** Each candidate had at least one identifiable primary or strong secondary source. Source quality ranged from `medium` (CAND-009) to `high`. Confidence levels assigned conservatively based on source type. Residual risks documented.

---

## DEC-T010-002 — INC-0005 (CAND-002): Robert Williams Case Used as Primary Anchor; Individual Not Named

**Decision:** The Detroit facial recognition wrongful arrest is anchored on ACLU civil litigation documentation and NIST FRVT Part 3. The individual (Robert Williams) is not named in the record; referenced by role only.

**Rationale:** The case is the best-documented primary facial recognition wrongful arrest case in the public record. Naming the victim is not required for governance value and creates unnecessary individual exposure. ACLU URL is the case documentation; individual can be identified from ACLU materials if needed.

---

## DEC-T010-003 — INC-0006 (CAND-004): Confidence `high` Despite Secondary-Only Source

**Decision:** INC-0006 confidence set to `high` despite no direct company confirmation. Reuters investigative report cited 5 sources with knowledge. Company's tool discontinuation is consistent with the reported findings.

**Rationale:** Reuters is a Tier 1 international news agency. The report's consistency with the company's action (discontinuing the tool) provides corroborating evidence. Hedging language applied throughout the record. `high` confidence is appropriate for well-corroborated investigative journalism.

---

## DEC-T010-004 — INC-0007 (CAND-005): Anchored on Meta Only; Not Multi-Platform

**Decision:** INC-0007 anchored on Meta/Facebook only, not Twitter/X. Meta's public acknowledgement is the clearest primary anchor.

**Rationale:** T007 guidance recommended anchoring on Meta with a note that similar issues occurred at other platforms. The record notes this pattern without creating a multi-platform record that would be harder to cite accurately.

---

## DEC-T010-005 — INC-0008 (CAND-009): Microsoft Bing Image Creator Used as Platform Anchor; Confidence `medium`

**Decision:** INC-0008 anchored on Microsoft's January 2024 safety announcement for Bing Image Creator. Confidence set to `medium` — the primary source is a company safety response, not a court or regulatory enforcement action.

**Rationale:** Microsoft's named public statement is the most specific and stable primary anchor available for NCII generation platform restrictions. Broader pattern is well-documented but individual cases require victim privacy protection. `medium` confidence reflects the evidence type (company safety announcement rather than regulatory finding).

---

## DEC-T010-006 — INC-0008 (CAND-009): FM-PRIV Added to Taxonomy (Already Present)

**Decision:** FM-PRIV was confirmed present in `data/taxonomy/failure_modes.json` before use. No new taxonomy IDs created.

**Rationale:** T010 task instructions require using only existing taxonomy IDs unless a clearly necessary addition is documented. FM-PRIV was already present. Verification confirmed before use.

---

## DEC-T010-007 — INC-0009 (CAND-010): Anchored on Obermeyer et al. Science Paper; Vendor Not Named in Record

**Decision:** INC-0009 anchored on Obermeyer et al. (2019), Science. Vendor (reported as Optum/UnitedHealth algorithm) not named in the Caesar record.

**Rationale:** The Science paper is the authoritative primary source. The vendor's full primary statement URL was not independently confirmed at record creation. Naming the vendor without confirmed primary source would create a risk of inaccuracy. The study's findings are clearly attributable to the paper.

---

## DEC-T010-008 — INC-0010 (CAND-015): Confidence `medium`; Upgrade Path Documented

**Decision:** INC-0010 confidence set to `medium`. No specific EEOC enforcement action confirmed at record creation. Upgrade to `high` possible if a specific named enforcement case is identified in T011+.

**Rationale:** EEOC guidance is a primary official source on the regulatory risk pattern. No specific adjudicated case against a named employer was confirmed. The record is valuable as a regulatory-guidance-level incident; `medium` confidence is appropriate and documented in the record.

---

## DEC-T010-009 — No New Taxonomy IDs Required

**Decision:** All failure mode, control, sector, severity, confidence, and evidence type IDs used in second-wave records were confirmed present in existing taxonomy files. No new taxonomy IDs created.

**Rationale:** Second-wave candidates were matched to existing stable taxonomy IDs. No gaps were identified that required new IDs.

---

## DEC-T010-010 — T011 Requires Control Tower Approval; No Automatic Build

**Decision:** T011 — Dataset MVP Public Readiness Review or Minimal Static Site Planning — requires explicit Control Tower approval. T011 must not automatically begin building a public site.

**Rationale:** Static site and public-facing implementation decisions require explicit Control Tower governance approval per the v0.2 Draft Contract and clean-room policy.
