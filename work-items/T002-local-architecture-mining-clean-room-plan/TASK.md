# TASK.md — T002: Local Architecture Mining / Clean-Room Acceleration Plan

**Work item:** T002
**Branch:** `docs/T002-local-architecture-mining-clean-room-plan`
**Date started:** 19 May 2026
**Assigned to:** AI execution agent (Kiro)
**Control Tower:** Artem / ChatGPT

---

## Objective

Create a safe acceleration policy that allows Caesar AI Incident Atlas to learn from public repositories, open-source projects, public incident databases, and benchmark websites — without contaminating the Caesar repository with third-party code, restricted material, or unlicensed data.

This task is documentation-only. No product code, no scrapers, no schemas, no incident records, no static site.

---

## Scope

### Files to create

- [ ] `LOCAL_ARCHITECTURE_MINING_PLAN.md`
- [ ] `CLEAN_ROOM_IMPLEMENTATION_POLICY.md`
- [ ] `THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md`
- [ ] `THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md`
- [ ] `work-items/T002-local-architecture-mining-clean-room-plan/TASK.md` (this file)
- [ ] `work-items/T002-local-architecture-mining-clean-room-plan/VALIDATION.md`
- [ ] `work-items/T002-local-architecture-mining-clean-room-plan/IMPLEMENTATION_REPORT.md`
- [ ] `work-items/T002-local-architecture-mining-clean-room-plan/DECISIONS.md`

### Files to update

- [ ] `README.md`
- [ ] `ARCHITECTURE.md`
- [ ] `ROADMAP.md`
- [ ] `PROJECT_STATE.md`
- [ ] `NEXT_ACTIONS.md`
- [ ] `CHANGELOG.md`
- [ ] `REPO_INVENTORY.md`
- [ ] `docs/DECISION_LOG.md`

---

## Checklist

### Policy documents

- [x] LOCAL_ARCHITECTURE_MINING_PLAN.md — defines what can be studied locally, how, and what outputs are allowed back into the Caesar repo
- [x] CLEAN_ROOM_IMPLEMENTATION_POLICY.md — defines the clean-room implementation approach and license classification table
- [x] THIRD_PARTY_REPOSITORY_REVIEW_TEMPLATE.md — reusable template for documenting a third-party repository review
- [x] THIRD_PARTY_CODE_AND_LICENSE_REGISTER.md — register of all third-party sources reviewed or considered for this project

### Work item files

- [x] TASK.md (this file)
- [x] VALIDATION.md
- [x] IMPLEMENTATION_REPORT.md
- [x] DECISIONS.md

### Existing file updates

- [x] README.md — added reference to clean-room policy
- [x] ARCHITECTURE.md — added section on local architecture mining approach
- [x] ROADMAP.md — updated T002 phase status
- [x] PROJECT_STATE.md — updated current task and next step
- [x] NEXT_ACTIONS.md — updated with T003 as next recommended step
- [x] CHANGELOG.md — added v0.2.1 entry
- [x] REPO_INVENTORY.md — added all new files
- [x] docs/DECISION_LOG.md — added DEC-010 through DEC-012

---

## Constraints

- Documentation only.
- No product code.
- No scraper.
- No static site.
- No schema files.
- No incident records.
- No copied third-party files.
- Do not clone external repos inside this repository.
- Do not add external code snippets.
- Do not claim legal compliance; describe as internal project policy and risk control.

---

## Why This Step Was Chosen

The blueprint (T001 / v0.2.0) defined what to build. Before building the dataset MVP (v0.3), the team needs a clear policy for how to safely study external sources. Without this policy, there is a risk that:

- an agent copies restricted data or code into the Caesar repo;
- a license violation occurs during dataset curation;
- the clean-room integrity of the Caesar codebase is compromised.

This task establishes the guardrails before any external source is consulted for implementation.
