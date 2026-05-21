# T055 — Decisions

## D-01 — Replace old INC-0013 safety block with positive check
Old: validator checked `inc-0013.json` (lowercase) absent — always passed, never detected published file.
New: check published filename exists + block old lowercase path as leakage + block INC-0014.

## D-02 — Remove INC-0013 block from validate-digests
Old block prevented any digest from referencing INC-0013 even after publication. Now removed; mocks/CANDs still blocked.

## D-03 — Record type filter uses `record_type || "incident"` default
Records without explicit `record_type` treated as `incident`. Backward-compatible.

## D-04 — Jurisdiction filter only rendered when data has jurisdiction fields
Silently omitted if no records carry `jurisdiction`. Non-breaking for existing records.

## D-05 — Case pages as static generated HTML under site/cases/
Chosen over JS modal for direct URL shareability (`/cases/INC-0013-.../`). Build script is idempotent and checked into scripts/.

## D-06 — Guidance notice in detail view, not card header
Keeps compact card list. Disclaimer visible only when expanded — reduces visual noise.
