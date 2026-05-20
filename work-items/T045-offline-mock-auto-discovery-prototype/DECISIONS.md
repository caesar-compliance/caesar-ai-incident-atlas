# Decisions Log: T045 — Offline Mock Auto-Discovery Prototype

1. **DEC-120: Sandboxed Directory Structure** - Created explicit `mock/` subdirectories under candidate, draft, and digest paths to prevent any accidental leakage to public folders.
2. **DEC-121: Synthetic Safety Labeling** - Mandated that all generated JSON data contain explicit `synthetic: true`, `not_a_real_case: true`, or custom safety metadata.
3. **DEC-122: Candidate Status Extension** - Extended the `status` enum in `schemas/pipeline/candidate.schema.json` to allow `mock_detected` and `mock_candidate` to enable clean pipeline validation.
4. **DEC-123: Exact Schema Conformity** - Programmatically mapped compliance intelligence tags (legal/commercial domains, failure modes, missing controls, required evidence, audit questions) in generated mock drafts to guarantee perfect schema validation.
5. **DEC-124: Dual-Language Auditor** - Designed `scripts/validate-mock-pipeline.mjs` to invoke a lightweight Python schema validation script (`tools/validate_mock_schemas.py`) utilizing standard system `jsonschema` support to assert 100% exact compliance.
