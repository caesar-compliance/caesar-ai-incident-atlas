# T018A — Public Release Gate Review Pack

**Scope:** Prepare review materials for Control Tower after T017 completion.  
**Constraint:** NO deployment. NO approval of public release.  

---

## Checklist

- [ ] Create `PUBLIC_RELEASE_REVIEW_PACK.md` with:
  - [ ] Repository status table
  - [ ] Source/license review table (INC-0001–INC-0010)
  - [ ] Wording/legal-risk review table (INC-0001–INC-0010)
  - [ ] Manual browser smoke-test checklist (G-10)
  - [ ] Control Tower sign-off checklist
  - [ ] Clear NO-GO statement
- [ ] Update `README.md` Project Status section (remove stale T010/T011 wording)
- [ ] Update `PUBLIC_DEPLOYMENT_PLAN.md` path-dependency section (T017 complete)
- [ ] Update `T017_DEPLOYMENT_IMPLEMENTATION_RECOMMENDATION.md` (add superseded note)
- [ ] Update `PUBLICATION_RISK_GATE.md` (reference review pack)
- [ ] Create work item docs (this folder)
- [ ] Update `CHANGELOG.md`
- [ ] Update `PROJECT_STATE.md`
- [ ] Update `NEXT_ACTIONS.md`
- [ ] Update `REPO_INVENTORY.md`
- [ ] Update `docs/DECISION_LOG.md`
- [ ] Run validation: `python3 tools/validate_dataset.py`
- [ ] Verify site/ contains no internal docs
- [ ] Commit with conventional commit message
