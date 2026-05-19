# T018A — Decisions

**Date:** 20 May 2026  
**Task:** T018A — Public Release Gate Review Pack  

---

## DEC-098 — Version Bump Deferred for Documentation-Only Review Pack

**Decision:** T018A does not bump version from 0.5.5 to 0.5.6. Version 0.5.5 is retained.

**Rationale:**
- T018A is documentation-only preparation; no code, data, or functional changes.
- Repository convention: doc-only updates without functional changes do not require version bump.
- Version 0.5.6 reserved for future deployment configuration or dataset updates.
- Semantic versioning: patch bump appropriate for bug fixes; this is review preparation, not a fix.

---

## DEC-099 — Public Release Review Pack Scope

**Decision:** PUBLIC_RELEASE_REVIEW_PACK.md includes all required tables without claiming legal approval or clearing public deployment.

**Content confirmed:**
- Repository status table (concise)
- Source/license review table (INC-0001–INC-0010) with license status and CT clearance pending column
- Wording/legal-risk review table (INC-0001–INC-0010) with hedging language assessment
- Manual browser smoke-test checklist (14-step G-10 checklist)
- Control Tower sign-off checklist (G-01 through G-12)
- Clear NO-GO statement and disclaimers

**Rationale:**
- CT requires structured review materials to assess G-01 and G-02.
- Tables must present facts without asserting legal conclusions.
- Pending status clearly marked for all gates requiring CT sign-off.

---

## DEC-100 — Deployment Config Deferred to T018+ After CT Approval

**Decision:** No hosting configuration (CNAME, GitHub Actions, Cloudflare, Netlify) is added in T018A. All deployment infrastructure deferred to T018B or later, contingent on G-12 explicit approval.

**Rationale:**
- T017 path/package work is complete; site/ is self-contained.
- Hosting selection requires CT decision on domain and provider.
- Deployment config without CT approval would violate hard constraint.
- Clean separation: T018A = review preparation only; T018B+ = deployment config after approval.

---

## Decision Count

Total: 3 decisions (DEC-098 through DEC-100)
