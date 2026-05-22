# Task T070 Validation Checklist

## Validation Commands Run

1. **Verify pipeline and repository validation checks:**
   ```bash
   git diff --check
   python3 tools/validate_dataset.py
   python3 tools/validate_pipeline_schemas.py
   node scripts/validate-public-site.mjs
   ```

2. **Verify safety checks for all private candidate workflows:**
   ```bash
   node scripts/validate-hosted-sync-safety.mjs
   node scripts/validate-private-candidate-review-intake.mjs
   node scripts/validate-private-review-decisions.mjs
   node scripts/validate-private-draft-approval-markers.mjs
   node scripts/validate-private-draft-candidate-package.mjs
   node scripts/validate-private-promotion-dry-run.mjs
   node scripts/validate-private-promotion-signoff.mjs
   node scripts/validate-private-promotion-packet-candidate.mjs
   ```

3. **Verify the T070 Blocker Resolution workflow runner:**
   ```bash
   node scripts/run-private-publication-blocker-resolution-workflow.mjs
   node scripts/validate-private-publication-blocker-resolution.mjs
   ```

4. **Verify local database schema migrations and dev-runtime checks:**
   ```bash
   node scripts/validate-supabase-schema.mjs
   node scripts/test-cloudflare-worker-local.mjs
   ```

## Validation Checklist

- [x] Schema validity for `private-publication-blocker-resolution.schema.json`
- [x] Exactly one latest resolution dossier is outputted deterministicly
- [x] Correctly matches key parent references (`signoff_id`, `dry_run_id`, `package_id`, etc.)
- [x] T068 signoff remains historically blocked (`private_review_blocked`)
- [x] Blocker resolution status remains `private_package_blockers_partially_resolved`
- [x] Purely technical blocker (`"no promotion packet created"`) is marked `resolved` based on local T069 candidate package evidence reference
- [x] The other 5 human/legal/publication blockers remain strictly blocked or requiring human review
- [x] Public record count remains exactly 13, and latest remains INC-0013
- [x] No INC-0014 exists in data/ or site/
- [x] All publication permissions and public record creation flags strictly evaluate to false
- [x] Hosted payload is successfully dry-run exported and sanitized
- [x] Zero private dossier data leaked to `site/` folder
