# tools/

Local QA tooling for the Caesar AI Incident Atlas dataset and site.

## validate_dataset.py

Run from the **repository root**:

```bash
python3 tools/validate_dataset.py
```

### What it checks

| Check | Description |
|---|---|
| `data/incident-index.json` | Valid JSON, exists |
| Record count | Exactly 10 INC-*.json files |
| INC-0011+ | None present |
| JSON syntax | All 10 records parse cleanly |
| ID format | `INC-NNNN` pattern, matches filename |
| Schema | All records validate against `schemas/incident.schema.json` (requires `jsonschema`) |
| Deprecated fields | No `source.database`; all sources have `source_type` |
| Failure modes | All FM-* IDs exist in `data/taxonomy/failure_modes.json` |
| Controls | All CTL-* IDs exist in `data/taxonomy/controls.json` |
| Sectors | All sector IDs exist in `data/taxonomy/sectors.json` |
| Severity / Confidence | Valid enum values only |
| Evidence types | EV-NNN IDs in `evidence_required` exist in `data/taxonomy/evidence_types.json` |
| Index ↔ files | Index entries match actual files |
| Site files | `site/index.html`, `styles.css`, `app.js`, `README.md` all exist |
| External dependencies | No CDN, font, or analytics references in site files |

### Requirements

- Python 3.8+
- `jsonschema` package for schema validation: `pip install jsonschema`

### Exit codes

- `0` — all checks pass
- `1` — one or more checks failed (details printed to stdout)

## Notes

- No network calls.
- No file writes.
- No auto-fixes.
- Not a product CLI — local QA only.
