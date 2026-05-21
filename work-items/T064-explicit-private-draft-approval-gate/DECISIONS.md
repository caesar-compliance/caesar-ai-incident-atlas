# Design Decisions — T064 Explicit Private Draft Approval Gate

## Gate Isolation Architecture
- **Local-Only Boundary**: All approval markers reside within `data/reviews/approvals/` and are fully gitignored or checked by safety sync parameters so they never leak into the public `site/`.
- **Zero Active Approval Baseline**: Under T064, no real intake record is approved by default. The system remains in a pristine needs-review baseline, containing 0 approved decisions and 0 packets.
- **Fail-Safe Packet Builder**: If any review decision is marked as `approve_for_private_draft` but lacks a corresponding active approval marker verifying the Control Tower signature, `build-private-draft-candidate-packets.mjs` immediately exits with a non-zero code.
