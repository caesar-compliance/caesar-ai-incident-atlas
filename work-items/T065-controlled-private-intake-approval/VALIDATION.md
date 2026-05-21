# Validation Log — T065 Controlled Approval of One Private Intake + Draft Candidate Packet

## Automated Integration Testing
The controlled gate and approval flow are validated using the new regression test suite `scripts/test-controlled-private-draft-approval.mjs`.

The suite verifies that:
1. Exactly one active approval marker file exists in the directory.
2. Attempting to create a duplicate active approval marker fails with status 1.
3. Exactly one draft candidate packet is compiled and correctly references the active marker.
4. Core safety constraints (no raw HTML, no leaks, false public publication/promotion/site/remote flags) are strictly respected.
5. No new files have leaked into public preview, real promotion packets, or public `site/` directories.
6. All three core pipeline validators (`validate-private-draft-approval-markers.mjs`, `validate-private-review-decisions.mjs`, `validate-hosted-sync-safety.mjs`) pass successfully.

## Verification Checklist
- `node scripts/test-controlled-private-draft-approval.mjs` -> PASS
- `node scripts/validate-private-draft-approval-markers.mjs` -> PASS
- `node scripts/validate-private-review-decisions.mjs` -> PASS
- `node scripts/validate-hosted-sync-safety.mjs` -> PASS
- `node scripts/validate-ops-status.mjs` -> PASS
