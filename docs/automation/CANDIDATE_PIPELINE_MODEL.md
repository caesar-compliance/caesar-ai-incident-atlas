# Ingestion & Candidate Pipeline Model

## 1. Pipeline Overview
The Caesar AI Legal & Governance Case Atlas relies on a structured, multi-stage ingestion pipeline. This pipeline ensures that newly discovered events are programmatically filtered, checked for licensing and copyright risks, and drafted under a strict editorial policy.

```
  [Stage 1: Source Registry]
             │
             ▼
     [Stage 2: Watcher] (RSS monitors & scrapers)
             │
             ▼
    [Stage 3: Candidate] (Raw CAND-XXXX log)
             │
             ▼
      [Stage 4: Dedupe] (Cross-reference URLs & keys)
             │
             ▼
   [Stage 5: Source-Risk Gate] (Verify source tier)
             │
             ▼
  [Stage 6: Clean-Room Summary] (Draft DRAFT-XXXX Caesar summary)
             │
             ▼
  [Stage 7: Legal/Commercial Classification] (Taxonomy tags)
             │
             ▼
  [Stage 8: Control/Evidence Mapping] (Caesar intelligence layer)
             │
             ▼
    [Stage 9: Public Case] (INC-XXXX production file)
             │
             ▼
     [Stage 10: Digest] (Weekly / Monthly static briefing)
```

---

## 2. Ingestion Stages

### 1. Source Registry
A curated list of monitored endpoints. Controls the configuration for all automated watchers.

### 2. Watcher
Automated RSS readers and static site monitors. 
> [!NOTE]
> **T043 Boundary:** No active watcher is implemented in T043. Watchers exist purely as a conceptual design in the pipeline.
>
> **T045 Prototype Boundary:** An offline mock pipeline prototype is implemented in T045. It supports scanning synthetic mock updates, converting them to candidates, executing deduplication checks, and preparing case drafts and weekly previews. All data is sandboxed offline.

### 3. Candidate (`CAND-XXXX`)
A raw detection log indicating a potential case. Contains discovery URL, preliminary classifications, and date published. Validated against `schemas/pipeline/candidate.schema.json`.

### 4. Dedupe
Checks the candidate's canonical URL and generated dedupe hash against already published cases, drafts, and active candidates to prevent duplicate records.

### 5. Source-Risk Gate
Determines if the primary source is Green, Yellow, or Red, enforcing safety rules accordingly.

### 6. Clean-Room Summary & Draft (`DRAFT-XXXX`)
Converts the candidate into an intermediate draft record. An AI agent compiles a factual summary in highly hedged wording. Validated against `schemas/pipeline/case-draft.schema.json`.

### 7. Legal/Commercial Classification
Categorizes the draft based on the legal domains, system types, and sectors involved.

### 8. Control/Evidence Mapping
Maps the case to failure modes (`FM-*`), missing controls (`CTL-*`), required evidence, vendor procurement questions, and training lessons.

### 9. Public Case (`INC-XXXX`)
Upon manual approval, the draft is converted into a production incident JSON, added to the static dataset, and published.

### 10. Digest
New public cases are automatically appended to the static weekly/monthly briefings and the RSS syndication XML feed.
