# Implementation Report — T064 Explicit Private Draft Approval Gate

## Overview
T064 introduces a local-only explicit approval gate that prevents private review decisions from being promoted to draft candidate packets unless they have a matching, active, non-expired approval marker verified by Control Tower.

## Core Components Developed
1. **Schema (`schemas/pipeline/private-draft-approval-marker.schema.json`)**:
   - Defines strict fields for the local-only approval marker.
   - Enforces scope constraints (`private_draft_candidate_only`), safety flags, and prohibits external write/public publication rights.

2. **Template Generator (`scripts/create-private-draft-approval-template.mjs`)**:
   - Programmatically builds disabled "draft" template approval markers in `data/reviews/approvals/`.

3. **Approvals Validator (`scripts/validate-private-draft-approval-markers.mjs`)**:
   - Ensures all templates correspond to schema guidelines and contain zero active approvals.

4. **Approval Applier (`scripts/apply-explicit-private-draft-approval.mjs`)**:
   - Applies the explicit approval marker if all command parameters (`--intake-id`, `--decision-id`, `--approval-id`, `--control-tower-approval YES`, `--reason`) match an active marker file.

5. **Packet Builder & Decision Validator Updates**:
   - Upgraded `build-private-draft-candidate-packets.mjs` and `validate-private-review-decisions.mjs` to dynamically verify matching active markers.

6. **Safety & Hosted Payload Exporters**:
   - Upgraded `export-hosted-review-decision-payloads.mjs`, `validate-hosted-sync-safety.mjs`, and `export-ops-status.mjs` to incorporate template bootstrap outputs, strict baseline sanity checks, and safe public counts.
