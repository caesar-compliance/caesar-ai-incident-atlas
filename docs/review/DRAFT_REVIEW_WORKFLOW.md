# Curator Draft Review Workflow

This runbook outlines the operational procedures for evaluating discovery drafts using the **Local Draft Review Console** before case promotion.

---

## Curator Procedural Workflow

### Phase 1: Local Setup & Aggregation
Before performing audits, curators must compile all active and mock draft folders into the console database.
1. Run the local bundle compiler:
   ```bash
   node scripts/build-review-bundle.mjs
   ```
2. Start the local server:
   ```bash
   python3 -m http.server 8000 --directory tools/review-console/
   ```
3. Load `http://localhost:8000` in a local-only browser.

---

### Phase 2: Metadata Vetting
For each draft, verify that candidate attributes are properly populated and schema-compliant:
* **Identification**: Confirm the `Draft ID` maps exactly to its respective `Candidate ID(s)`.
* **Classification**: Validate that `Jurisdiction` (e.g. US, EU), `Legal Domain`, and `Commercial Domain` are accurate.
* **Source Quality**: Cross-reference the authority with the assigned `Source Tier`. Green tiers can progress; Yellow and Red tiers require immediate escalation for licensing and authenticity verification.

---

### Phase 3: Case-to-Control Model Auditing
Review the draft to ensure it aligns with the control framework:
1. **Clean-Room Summary**: Read the generated summary. It must be written in high-assurance, neutral prose, avoiding unhedged claims.
2. **Failure Modes**: Confirm the designated Failure Modes (e.g. `FM-DISCRIMINATION-BIAS`) accurately reflect the incident mechanics.
3. **Missing Controls**: Audit the list of controls missing in the incident (e.g. `CTL-HUMAN-IN-THE-LOOP`).
4. **Actionable Evidence**: Check if the required evidence elements are realistic, audit-ready, and verifiable.

---

### Phase 4: Promotion Gate Simulation
To verify safety parameters:
1. Click **"Run Promotion Gate Simulation"**.
2. Observe the automated multi-stage evaluation:
   - **Schema Compliance**: The validator confirms zero syntax errors.
   - **Source Vetting**: Checks status rules.
   - **Interception**: Ensure the visual terminal successfully logs a `MOCK_CONTAINMENT_RULE_VIOLATION` block, verifying that mock objects are permanently bound to the local environment and cannot leak to production site indices.
