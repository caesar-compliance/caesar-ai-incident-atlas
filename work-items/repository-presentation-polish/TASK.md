# Repository Presentation Polish

**Branch:** `task/repository-presentation-polish`  
**Scope:** README, GitHub About metadata, safe merged-branch cleanup — presentation only.

## Goals

1. Polish README for visitor-friendly presentation (match regulation-watch / vendor-watch style).
2. Update GitHub repository description, homepage, and topics.
3. Delete stale remote branches fully merged into `main`.
4. Document validation before and after changes.

## Out of scope

- Product logic, datasets, DNS, Pages settings, dependencies, secrets.

## Acceptance

- [x] README header with live site, status table, what-it-is / what-it-is-not
- [x] `gh repo edit` description, homepage `https://atlas.caesar.no`, topics
- [x] Remote branches merged into `main` deleted; only `main` remains on origin
- [x] `python3 tools/validate_dataset.py` passes on tracked files (no untracked duplicate INC files)
