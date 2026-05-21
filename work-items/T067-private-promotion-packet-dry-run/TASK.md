# TASK — T067 Private Promotion-Packet Dry-Run Preparation

## Scope
Convert T066 private draft candidate package into a private promotion dry-run bundle.

## Checklist
- [x] Branch: task/T067-private-promotion-packet-dry-run
- [x] Schema: schemas/pipeline/private-promotion-dry-run.schema.json
- [x] Builder: scripts/build-private-promotion-dry-run.mjs
- [x] Console exporter: scripts/export-review-console-private-promotion-dry-run-data.mjs
- [x] Hosted payload exporter: scripts/export-hosted-private-promotion-dry-run-payloads.mjs
- [x] Validator: scripts/validate-private-promotion-dry-run.mjs
- [x] Workflow runner: scripts/run-private-promotion-dry-run-workflow.mjs
- [x] validate-hosted-sync-safety.mjs updated (T067 checks)
- [x] export-ops-status.mjs updated (T067 fields)
- [x] Review console UI updated (dry-run bundle selector + handler + detail renderer)
- [x] Work item docs created
- [x] Lifecycle docs updated
- [x] All validations passed
- [x] Committed, merged, pushed

## Safety
- No INC-0014 created
- No real promotion packet
- No public preview
- No remote writes
- Public count remains 13
