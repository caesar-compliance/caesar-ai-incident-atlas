# Caesar Atlas Mock Pipeline Runbook

This runbook outlines instructions for executing, inspecting, and validating the sandboxed, offline Atlas auto-discovery mock pipeline prototype.

---

## 1. Pipeline Overview
The prototype mimics the future Case Atlas ingestion pipeline by processing synthetic mock inputs through five logical phases:

```
[mock-sources/] ──► [mock-watch-sources.mjs] ──► [mock-build-candidates.mjs]
                                                           │
                                                           ▼
[mock-weekly-preview.json] ◄── [mock-build-digest-preview.mjs] ◄── [mock-build-case-drafts.mjs]
```

---

## 2. Ingestion Commands
To run the entire mock pipeline from the repository root:

```bash
# 1. Scan and normalize local mock sources
node scripts/mock-watch-sources.mjs

# 2. Build ingestion candidates (CAND-0013 to CAND-0017)
node scripts/mock-build-candidates.mjs

# 3. Deduplicate candidate keys and output report
node scripts/mock-dedupe-candidates.mjs

# 4. Promote unique candidates to draft case packs (DRAFT-0013 to DRAFT-0017)
node scripts/mock-build-case-drafts.mjs

# 5. Compile non-public weekly digest preview
node scripts/mock-build-digest-preview.mjs
```

---

## 3. Sandboxing & Safety Verification
To verify that all mock items are 100% compliant with JSON schemas and no files or references have leaked into production directories:

```bash
node scripts/validate-mock-pipeline.mjs
```

---

## 4. Key Files and Sandboxed Locations
- **Synthetic Input Sources**: `mock-sources/official/` and `mock-sources/yellow/`
- **Candidate Outputs**: `data/candidates/mock/`
- **Draft Case Packs**: `data/drafts/mock/`
- **Weekly Digest Preview**: `data/digests/mock/mock-weekly-preview.json`

---

## 5. Local Draft Review Console

To compile the review bundle database and launch the interactive curation review console:

```bash
# 1. Compile all mock candidates, drafts, and digests into one bundle
node scripts/build-review-bundle.mjs

# 2. Verify Review Console safety, containment, and lack of leaks
node scripts/validate-review-console.mjs

# 3. Launch local-only review console web dashboard
python3 -m http.server 8000 --directory tools/review-console/
```

Open [http://localhost:8000](http://localhost:8000) in your web browser.
