# Validation Plan — T071 Hosted Private Review-State Sync Readiness

This document outlines the commands to execute to verify that T071 is fully compliant, sanitised, and safe.

## Automated Verification Suite

Run each of the following validation commands to ensure schema validation, parent references, sanitisation, and safety gates are cleanly verified:

```bash
# 1. Verify repository health and public dataset invariants
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py
node scripts/validate-public-site.mjs

# 2. Run the main T071 workflow runner
node scripts/run-hosted-private-review-state-sync-workflow.mjs

# 3. Verify specific T071 schema and payload sanitisation
node scripts/validate-hosted-private-review-state-sync.mjs

# 4. Verify comprehensive hosted sync safety across the repository
node scripts/validate-hosted-sync-safety.mjs

# 5. Verify local Cloudflare Worker mock route contract endpoints
node scripts/test-cloudflare-worker-local.mjs
node scripts/test-private-review-state-route-contract.mjs
```

## Manual Review Checklist

- [x] Verify that the dataset count remains exactly **13** public records (up to `INC-0013`).
- [x] Verify that NO `INC-0014` file or references are generated.
- [x] Confirm that no live writes to Supabase or remote worker deploys were attempted.
- [x] Ensure that no private sync payloads are leaked into the public `site/` directory or pages deployment.
