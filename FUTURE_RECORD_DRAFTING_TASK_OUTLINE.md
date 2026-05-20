# Future Record Drafting Task Outline — T037+ Template

**Task:** Template for future T037+ drafting tasks  
**Date:** 20 May 2026  
**Version:** 0.7.4  
**Status:** Planning template — NOT for execution until CT approves

---

## ⚠️ WARNING: Do Not Use Until CT Approves

This is a template/outline for a future task. Do not begin drafting records until:
- CT provides explicit written approval for record creation
- All 12 gates per candidate are completed
- G-01/G-02 equivalent approval is obtained for the new record(s)

---

## Preconditions for Drafting

Before any drafting begins, confirm:

| Check | Status |
|---|---|
| CT explicit approval for record creation | Required |
| Candidate selected from `FIRST_DRAFTING_BATCH_SELECTION.md` | Required |
| Source pack finalized and reviewed | **Complete (T037)** — see `BATCH1_FINAL_SOURCE_PACKS.md` |
| Primary source URL confirmed stable | **Complete (T037)** — see `BATCH1_SOURCE_URL_REGISTER.md` |
| Wording/legal-risk review completed | Required |
| Counsel gate resolved (if triggered) | Not required for batch-1 candidates |
| G-01/G-02 equivalent approval scope defined | Required |

---

## Safe Drafting Workflow

### Step 1: Create feature branch
```bash
git checkout -b drafting/INC-0011-[candidate-id]
```

### Step 2: Draft incident JSON
- Create in `data/incidents/` (not `site/data/`)
- Assign next sequential ID (INC-0011)
- Populate all required fields per schema
- Use only approved, hedged wording

### Step 3: Update index
- Add entry to `data/incident-index.json`
- Do not update `site/data/incident-index.json` yet

### Step 4: Validate locally
```bash
python3 tools/validate_dataset.py
```
Must exit 0.

### Step 5: CT review
- Submit for CT review before any site/data sync
- CT provides explicit publication approval

### Step 6: Sync to site/data
Only after CT publication approval:
- Copy incident JSON to `site/data/incidents/`
- Update `site/data/incident-index.json`
- Confirm SHA-256 hashes match

### Step 7: Final validation
```bash
python3 tools/validate_dataset.py
git diff --check
```

### Step 8: Merge and deploy
```bash
git add .
git commit -m "data: add INC-0011 [title] (TXXX)"
git push origin drafting/INC-0011-[candidate-id]
# Merge to main after final CT approval
```

---

## Required Files to Read Before Drafting

- `schemas/incident.schema.json`
- `V0_2_FIELD_PRIORITY_TABLE.md`
- `SOURCE_AND_CITATION_POLICY_DRAFT.md`
- `RECORD_CREATION_QA_CHECKLIST.md`
- `INCIDENT_RECORD_CREATION_GATE_CHECKLIST.md`
- `PUBLIC_MVP_BASELINE_FREEZE.md`
- `P1_CANDIDATE_SOURCE_PACKS.md` (for selected candidate)

---

## Validation Commands

```bash
# Full validation
python3 tools/validate_dataset.py

# Check for external dependencies
grep -R "cdn\." site/assets/app.js site/index.html || true

# Check for CNAME/internal docs in site
find site -maxdepth 4 \( -name "CNAME" -o -path "*/work-items/*" -o -path "*/docs/*" \) -print

# Check for INC-0011+ files
find data/incidents -name "*INC-0011*" -o -name "*INC-0012*" | sort
```

---

## Data Sync Rules

| Rule | Requirement |
|---|---|
| Root data authoritative | `data/incidents/` is the source of truth |
| Site/data is publish copy | `site/data/` copies root data only after CT approval |
| SHA-256 verification | Hashes must match between root and site copies |
| Index consistency | `data/incident-index.json` leads; `site/data/incident-index.json` follows |

---

## Public Site Smoke-Test Requirement

Before merge to main:
- Local validation passes
- No site/data changes until CT publication approval
- After merge: verify `https://atlas.caesar.no/` loads
- Confirm new record appears in list and search

---

## Approval Rules

| Approval Type | Required For |
|---|---|
| CT candidate approval | Starting drafting for any candidate |
| CT publication approval | Merging record to main / publishing |
| Counsel sign-off | Candidates with counsel gate triggered |
| G-01/G-02 equivalent | Each new batch or record |

---

## Rollback Notes

If issues discovered after merge:
1. Revert commit on main
2. Push revert
3. Confirm GitHub Pages redeploy
4. Verify live site no longer shows problematic record

---

**Disclaimer:** This is a planning template only. Not for execution until CT approves. Not legal advice.
