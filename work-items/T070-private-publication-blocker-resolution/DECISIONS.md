# Task T070 Design and Implementation Decisions

1. **Strict Private Bounds:** All dossier output directories, files, and payload structures are contained entirely under private areas (`data/reviews/`, `tools/review-console/data/`, and `data/ops/supabase/`). No private dossier detail is exposed inside the `site/` tree.
2. **Deterministic Resolution ID Suffixing:** The resolution dossier ID is generated as `PUB-BLOCKER-RES-[GREEN-RUN-ID]-[INTAKE-SUFFIX]`, aligning deterministically with the linked regulatory green run and the original private intake candidate.
3. **Selective Technical Blocker Resolution:** Only the `"no promotion packet created"` blocker is marked as `resolved`. It cites the preparing T069 candidate packet ID as evidence. The other 5 blockers represent human/legal approvals, so they must remain unresolved in code.
4. **Aggregate Public-Safe Metadata:** The public ops status file `latest-status.json` is updated to include safe aggregate metadata only (`t070_private_blocker_resolution_present: true`), keeping the detailed blocker ledger strictly hidden from public viewers.
5. **Dry-Run Supabase Schema Alignments:** Exporter payloads target `atlas_private_publication_blocker_resolutions` table as an intended dry-run destination. No actual database writing is executed.
6. **Robust Validation Orchestration:** The validator script asserts the exact state of all public and private files. Any leakage, flag mutation, or record addition causes a validation failure.
