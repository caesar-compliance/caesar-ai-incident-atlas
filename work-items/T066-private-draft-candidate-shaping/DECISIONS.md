# DECISIONS - T066 Private Draft Candidate Packet Shaping

## Design Decisions

1. **Isolation of Candidate Data**: The rich shaped private draft candidate package is stored in a new designated directory `data/reviews/private-draft-candidates/` which is outside the public site root `site/`. This protects sensitive intake information from accidental exposure in GitHub Pages.
2. **Metadata Synthesizing**: Maintained metadata-only representation without copies of third-party raw text or HTML body.
3. **Hard Constraints enforcement**: Defined strict schema properties for draft status, review requirements, and safety flags to ensure zero possibility of premature public promotion during automated ingestion passes.
4. **Dry-Run Payloads**: Map fields directly to a dry-run local JSON format mirroring the future table schema, ensuring safety boundaries before active database integration is authorized.
