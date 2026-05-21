# Publication Promotion Checklist

This checklist must be fully completed and checked off prior to promoting any incident draft to a public Atlas incident record.

---

## 1. Compliance Vetting & Schemas
- [ ] **Schema Conformance**: The JSON schema is 100% compliant with `/schemas/incident.schema.json`.
- [ ] **Validation Pass**: Running `python3 tools/validate_dataset.py` finishes with zero errors.
- [ ] **Index Consistency**: The record is correctly mapped in the central indexing registry.

## 2. Licensing & Source Vetting
- [ ] **Intellectual Property Safety**: Sources do not violate any copy protection or proprietary terms.
- [ ] **License Check**: Authoritative texts from government portals (EEOC, CNIL, FTC, etc.) are public domain or appropriately licensed.
- [ ] **Source Tier Vetting**:
  - `Green Tier`: Approved for fast-track manual promotion.
  - `Yellow/Red Tier`: Explicitly audited by risk assessors for authenticity and hardened against bias.

## 3. Clean-Room Content prose
- [ ] **Neutral Phrasing**: All summaries are written in an objective, dry, matter-of-fact tone.
- [ ] **No Allegation Unhedged**: The text avoids framing allegations as established facts. Phrases like "alleged", "reported", or "enforcement note outlines that..." are used.
- [ ] **Trademark Safety**: No named commercial brands are target-defamed. The description focuses on failure modes and missing controls.

## 4. Case-to-Control Mapping
- [ ] **Failure Mode Codes**: Properly references registered Failure Mode taxonomy codes.
- [ ] **Control Codes**: Designated missing controls mapped to the active control catalogue.
- [ ] **Actionable Audit Evidence**: Evidence criteria are clearly specified and verifiable.

## 5. Control Tower Sign-Off
- [ ] **Control Tower Review**: Peer review has been completed by at least two administrators.
- [ ] **Separate Branch Creation**: Work is performed on a dedicated incident branch, never directly on `main`.
- [ ] **Safety Containment**: Ensure no synthetic mock data from `data/drafts/mock/` or `data/candidates/mock/` is promoted or included.
