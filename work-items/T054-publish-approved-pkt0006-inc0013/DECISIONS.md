# T054 — Decisions

**Date:** 21 May 2026

## DEC-T054-01 — Use allowed_public_filename for written incident file

`promote-approved-case.mjs` previously derived the filename from `incident_id.toLowerCase()`. Patched to use `approval.allowed_public_filename` when present so that the descriptive filename `INC-0013-edpb-automated-decision-making-profiling-guidance.json` is used.

## DEC-T054-02 — Add FM-GOVERNANCE-GAP and FM-COMPLIANCE-DEFICIT to taxonomy

These failure modes are appropriate for regulatory guidance cases. Added as stable entries to `data/taxonomy/failure_modes.json` and synced to `site/data/taxonomy/`.

## DEC-T054-03 — Add CTL-GUIDANCE-TRACKING and CTL-COMPLIANCE-UPDATE-PROCESS to taxonomy

Added as stable `compliance_monitoring` category controls. Synced to site taxonomy.

## DEC-T054-04 — Add cross-sector AI governance sector

Added to `data/taxonomy/sectors.json` to match the sector used in the draft/preview. Synced to site.

## DEC-T054-05 — Add optional record_type field to incident schema

Added as optional enum field (`incident` | `guidance` | `governance_case`) to `schemas/incident.schema.json` for display disambiguation. Backward-compatible — existing records unchanged.

## DEC-T054-06 — Strip leading ../ from site index file paths

`updateIndex` was writing `../data/incidents/` for both root and site indexes. Fixed to strip `../` for the site copy so `site/data/incident-index.json` uses correct relative paths.

## DEC-T054-07 — Update all hardcoded count/INC-0013 checks in validators

Updated 5 validators that hardcoded `12` or checked that `INC-0013` doesn't exist. Now derive expected count dynamically from `approved-promotions.json` and verify INC-0013 approved record exists.
