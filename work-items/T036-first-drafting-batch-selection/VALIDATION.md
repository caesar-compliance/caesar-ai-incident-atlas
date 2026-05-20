# T036 — Validation Checklist

## Constraint Validation
- [ ] No new incident JSON records created
- [ ] No changes to `data/incidents/`
- [ ] No changes to `site/data/incidents/`
- [ ] No changes to `data/incident-index.json`
- [ ] No INC-0011+ files created
- [ ] No site file changes (index.html, styles.css, app.js)
- [ ] No CNAME added
- [ ] No DNS changes
- [ ] No workflow changes
- [ ] No secrets exposed

## Content Validation
- [ ] `FIRST_DRAFTING_BATCH_SELECTION.md` created
- [ ] `FIRST_DRAFTING_BATCH_GATE_MATRIX.md` created
- [ ] `FUTURE_RECORD_DRAFTING_TASK_OUTLINE.md` created
- [ ] Planning docs updated with T036 status
- [ ] Lifecycle docs updated with T036 status

## Dataset Validation
- [ ] `python3 tools/validate_dataset.py` passes
- [ ] 10 records confirmed (INC-0001–INC-0010)
- [ ] No INC-0011+ files found
- [ ] `git diff --check` clean

## Safety Checks
- [ ] No scraping performed
- [ ] No external data imported
- [ ] No third-party text copied
- [ ] All candidates remain `not_approved_candidate`
