# Task T069 Checklist

- [x] Clean ignored duplicate macOS files (`* 2.*`, `* 3.*`, `.DS_Store`).
- [x] Create json schema: `schemas/pipeline/private-promotion-packet-candidate.schema.json`.
- [x] Create builder script: `scripts/build-private-promotion-packet-candidate.mjs`.
- [x] Create review console export script: `scripts/export-review-console-private-promotion-packet-candidate-data.mjs` and update HTML/JS dashboard UI to selection candidate.
- [x] Create hosted dry-run export script: `scripts/export-hosted-private-promotion-packet-candidate-payloads.mjs`.
- [x] Create validator script: `scripts/validate-private-promotion-packet-candidate.mjs`.
- [x] Create workflow runner script: `scripts/run-private-promotion-packet-candidate-workflow.mjs`.
- [x] Extend integrations: `scripts/validate-hosted-sync-safety.mjs` and `scripts/export-ops-status.mjs`.
- [x] Complete verification, fast-forward merge and push to origin main.
