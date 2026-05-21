# Decisions: T046 — Local Draft Review Console and Promotion Gate

### [DEC-112] — 21 May 2026 — Local Draft Review Console and Promotion Gate Model

**Status:** Approved

**Decisions:**

1. **Local-Only Sandboxed Dashboard (D28):** Implemented a complete review console dashboard strictly isolated inside `tools/review-console/`, operating on a locally compiled bundle with absolutely zero exposure to the public `site/` root.
2. **0% External Network Dependency (D29):** Designed the review interface with zero external scripts, stylesheets, or CDN links to ensure perfect offline utility and absolute protection against assets tampering or network leaking.
3. **Comprehensive Case-to-Control Auditing View (D30):** Displays all 21 Case-to-Control model fields, including missing governance controls, specific audit evidence requirements, developer training lessons, and vendor/client checklists, validating pipeline suitability.
4. **Interactive Multi-Stage Promotion Gate Visualizer (D31):** Built a front-end promotion step visualizer demonstrating the automated checks, curated clean-room validations, and ultimate human-in-the-loop sign-off required for case promotion.
5. **Absolute Promotion Block Invariant (D32):** Hardcoded a strict containment block preventing synthetic or mock candidate/draft data from ever being written to public site directories, with visible warnings highlighting their sandboxed test status.
6. **Consolidated Review Compiler (D33):** Designed `scripts/build-review-bundle.mjs` to aggregate mock candidates, drafts, and digests into `tools/review-console/review-bundle.json` in one rapid step.
7. **Strict Sandboxing and Leakage Validator (D34):** Designed `scripts/validate-review-console.mjs` to programmatically audit files under `site/` to ensure zero mock data, mock digests, or review dashboard files leak into production.
8. **Mock Review Gate Decisions Blueprint (D35):** Authored `data/reviews/mock/mock-review-decisions.json` establishing synthetic gate parameters that record curation actions while blocking promotion.
9. **Curator and Promotion Governance Policy (D36):** Codified DRAFT_REVIEW_WORKFLOW.md, PROMOTION_GATE_POLICY.md, and PUBLICATION_PROMOTION_CHECKLIST.md, formalizing the exact 10-stage promotion workflow, sensitive named-company screening, and Control Tower explicit approval rules.
10. **Runbook and Schema Validator Extension (D37):** Updated automation runbooks and schema extension documentation to formally incorporate the review console compilation steps and containment validators.

**Rationale:** Serves as a perfect offline simulator and training ground for curators to review automated discoveries and draft briefs, establishing rigorous, auditable review safeguards before any actual web admin tooling or live scrapers are ever developed.
