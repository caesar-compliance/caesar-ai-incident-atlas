# Design Decisions — T065 Controlled Approval of One Private Intake + Draft Candidate Packet

## Candidate Selection Strategy
- **ICO AI and Algorithms Record Selected**: `INTAKE-GREEN-RUN-20260521-202417-001` selected as the single test bed candidate due to high keyword hit density, high legal relevance, and robust compliance themes suited for downstream AI governance case draft testing.
- **Isolated Control Gate**: Only exactly one intake was approved. The other three records remain set to `needs_more_review` to strictly limit scope and prevent mass/unauthorized promotions.

## Safe Status Exposure
- **Local Triage overlay**: The Review Console UI dynamically overlays active approvals, making the local console triaging functional and alive.
- **Hosted Dry-Run Payload Sanitization**: Excluded active approvals from public/hosted uploads to avoid leaking any unapproved private information or active markers online.
- **Safe Public Counts**: Updated the ops status JSON to export a dynamic, safe count (`private_draft_active_approval_count: 1`, `private_draft_candidate_packet_count: 1`) without exposing intake/decision IDs, hashes, source URLs, reasons, or private notes.
