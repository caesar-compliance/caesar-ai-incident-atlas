# VALIDATION - T066 Private Draft Candidate Packet Shaping

## Automated Validations
- `scripts/validate-private-draft-candidate-package.mjs` - Validates the shaped draft packages against schemas and safety constraints.
- `scripts/validate-hosted-sync-safety.mjs` - Confirms the Supabase dry-run payloads are fully sanitized and safe for future offline mapping.
- `tools/validate_pipeline_schemas.py` - Syntactic validation of pipeline schema files.
- `tools/validate_dataset.py` - High-integrity dataset counts and referential validations.

## Manual Verification
- Review Console dropdown option "Private Draft Candidate Package" maps successfully and displays the structured local-only package summary.
- Safety labels ("Private draft candidate only", "Not public", "No INC-0014", "Human review required") verified under review UI panel.
- Verified absence of `INC-0014` file generation or public record count increase.
