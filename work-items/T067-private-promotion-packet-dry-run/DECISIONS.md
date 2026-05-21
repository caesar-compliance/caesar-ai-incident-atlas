# DECISIONS — T067 Private Promotion-Packet Dry-Run Preparation

## Design Decisions

1. **suggested_public_record_id as structured object**: Rather than a bare string like "INC-0014-SUGGESTED", the field is modelled as a structured object with `suggested_id`, `id_status: "suggestion_only"`, and `creates_public_record: false`. This prevents any automated tooling from accidentally treating it as a real record.

2. **Strict schema constraints**: All safety booleans (`public_publish_ready`, `real_promotion_packet_created`, `public_preview_created`, `public_record_created`, `public_site_mutated`, `remote_write_attempted`, `raw_text_stored`, `html_stored`) are schema-enforced to `false` via JSON Schema `enum: [false]`.

3. **Caesar-native proposed_public_summary**: The summary is generated from metadata only — source name, control theme IDs, and a fixed disclaimer — with no third-party text copy.

4. **Legal review checklist pre-filled with open items**: `public_narrative_lawyer_approved` and `publication_risk_approved` are schema-enforced `false` to explicitly document that these gates have not been passed.

5. **Hosted payload strips private identifiers**: `intake_id`, `decision_id`, `approval_id`, `candidate_hash`, `source_url`, `governance_chain`, and `proposed_evidence_questions` are omitted from the Supabase dry-run payload to prevent leaking private pipeline state.
