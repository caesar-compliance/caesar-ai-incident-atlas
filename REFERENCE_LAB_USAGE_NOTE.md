# Reference Lab Usage Note

## 1. Context and Target Folder

This document provides strict operational guardrails and guidelines for utilizing the local reference lab established under:

`~/Desktop/Projects/caesar-compliance/_reference-lab/incident-atlas/`

---

## 2. Inviolable Guardrails

All developers, contributors, and automated AI agents must adhere to the following four clean-room principles when working with reference lab materials:

### 1. Local Examples Only
- The cloned repositories inside `_reference-lab/incident-atlas/repos/` are kept local on the development machine.
- They are used strictly to study architecture patterns, API designs, validation schemas, and general structural approaches.
- Git must never be initialized inside the `_reference-lab/` directory.

### 2. Clean-Room Rewrite Required
- Verbatim copying or direct translation of source code (HTML, CSS, JavaScript, TS, Svelte, PHP, Go, Python, etc.) from reference repositories into Caesar Compliance repositories is strictly prohibited.
- All implementation must be original, clean-room Caesar-native code written from scratch based on original specifications.

### 3. Competitor Datasets Are Not Copied
- Wholesale incident records, taxonomy JSON mappings, structural vulnerability trees, or graph files from competitor datasets (such as `aiid` and `avid-db`) must never be imported, copied, or merged into the Caesar production database.
- Citing a verified primary source discovered via these tools is highly encouraged. Copying the competitor's custom summary or taxonomy structure is prohibited.

### 4. High-Risk Licenses Are Reference-Only
- Repositories containing copyleft viral licenses (e.g., `listmonk` and `rss2newsletter` under **AGPL-3.0**), strict non-commercial licenses (e.g., `ai-oversight-tools` under **CC BY-NC-SA 4.0**), or proprietary licenses (e.g., `verifywise` under **BSL 1.1**) must remain strictly reference-only.
- No code or structural derivatives of high-risk repositories may enter Caesar products or SaaS systems under any circumstances.
