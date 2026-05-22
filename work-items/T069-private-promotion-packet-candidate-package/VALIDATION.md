# Task T069 Validation

## Validation Commands
```bash
# General dataset validation
python3 tools/validate_dataset.py
python3 tools/validate_pipeline_schemas.py

# Public site validation
node scripts/validate-public-site.mjs

# Hosted sync safety and other validators
node scripts/validate-hosted-sync-safety.mjs
node scripts/validate-private-candidate-review-intake.mjs
node scripts/validate-private-review-decisions.mjs
node scripts/validate-private-draft-approval-markers.mjs
node scripts/validate-private-draft-candidate-package.mjs
node scripts/validate-private-promotion-dry-run.mjs
node scripts/validate-private-promotion-signoff.mjs

# T069-specific validators
node scripts/run-private-promotion-packet-candidate-workflow.mjs
node scripts/validate-private-promotion-packet-candidate.mjs
```

## Validation Checklist
- [x] Schema validity checks pass.
- [x] Unresolved blocker count remains greater than 0.
- [x] Publication-blocked state is preserved.
- [x] All publication permission flags are false.
- [x] Public record count is exactly 13 with INC-0013 as the latest.
- [x] No private data leaked under site/.
- [x] No Supabase write attempted or Cloudflare Worker deployed.
