# Automated Publication Rules

## 1. Safety Baseline
> [!WARNING]
> **Safety Baseline Rule:** The default setting for the Caesar Case Atlas is **absolute manual approval**. Auto-publication is disabled by default across all tiers. No automated script is permitted to write or deploy files directly to the public web root (`site/`) without human oversight and sign-off.

---

## 2. Ingestion Tier Publishing Rules

### Green Tier (Regulator / Court Decisions)
- **Rules:** Eligible for automatic detection and drafting.
- **Future Auto-Publish Eligibility:** May only become eligible for auto-publication under future phases if:
  1. The source is explicitly white-listed in `sources.yml`.
  2. The draft passes 100% of automated schema and validator checks.
  3. The clean-room summary contains zero defamation flags or named individuals.
  4. The record has been cross-referenced against a strict negative list of sensitive companies or domains.

### Yellow Tier (OECD, Academic, Company Reports)
- **Rules:** Programmatic draft creation is permitted.
- **Auto-Publish Eligibility:** **Strictly Prohibited.** Must be explicitly reviewed, adjusted, and approved by the Control Tower.

### Red Tier (News / Social Media / Blogs)
- **Rules:** Metadata logs only.
- **Auto-Publish Eligibility:** **Strictly Prohibited.** Red tier candidates can never be promoted or published automatically.

---

## 3. Exclusion Gates and Mandatory Review Triggers

A draft is automatically blocked from any automated promotion and routed to mandatory human review if it triggers any of the following:

1. **Sensitive Named Companies:** The case involves any high-profile corporate entity or government partner.
2. **Defamation Risk Flags:** The case mentions specific individuals by name, or contains unhedged claims of fraud, bias, or negligence.
3. **No Legal Foundation:** The case rests entirely on news reports without any official court docket, agency order, or regulatory settlement URL.
4. **License Mismatch:** The primary source contains restrictive commercial terms or copyright warnings that conflict with Caesar's publication rights.
5. **No Independent Claims:** The draft makes assertions that go beyond the factual text of the source citation. No original editorial conclusions may be added.
6. **No Legal Advice:** The draft must not contain prescriptive compliance statements that could be interpreted as formal legal advice.
