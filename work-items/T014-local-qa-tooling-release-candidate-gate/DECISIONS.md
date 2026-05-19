# T014 — Decisions

**Date:** 19 May 2026  
**New decisions:** 3

---

### DEC-T014-001 — Validator Uses Integer Comparison for INC-0011+ Check

**Decision:** INC-0011+ detection extracts the 4-digit numeric portion of the filename with `re.search(r"INC-(\d{4})", ...)` and compares as `int >= 11`. Regex-only approaches (used in T011 and the first T014 draft) are fragile and produced false positives.

**Rationale:** Integer comparison is unambiguous, readable, and immune to digit-length edge cases.

---

### DEC-T014-002 — Validator Runs from Repo Root; Paths Derived via `__file__`

**Decision:** `tools/validate_dataset.py` derives `ROOT` from `os.path.dirname(os.path.dirname(os.path.abspath(__file__)))`. The script always targets the correct paths regardless of the working directory the caller uses, as long as the file is at `tools/validate_dataset.py`.

**Rationale:** Avoids `FileNotFoundError` when the script is invoked from an unexpected directory.

---

### DEC-T014-003 — RELEASE_CANDIDATE_GATE.md Is a Manual Checklist Only; No Automation

**Decision:** `RELEASE_CANDIDATE_GATE.md` defines a human-reviewed pre-deployment checklist. It is not enforced programmatically. No CI gate, no bot, no automated merge check.

**Rationale:** The project has no CI pipeline. The checklist is a governance document for Control Tower review, not an enforcement mechanism.
