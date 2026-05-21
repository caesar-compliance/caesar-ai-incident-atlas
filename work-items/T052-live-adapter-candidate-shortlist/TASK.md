# T052 — Live Adapter Collection + Candidate Shortlist

## Goal
Run the real adapter pipeline, collect fresh Green-source candidates, improve adapters based on actual run results, and produce a high-signal shortlist for first public promotion review.

## Deliverables
- [x] Live adapter run audit (`data/watch/runs/latest-live-adapter-audit.json`)
- [x] Adapter improvements (FTC URL fix, CNIL/EDPB/EU filters)
- [x] Case shortlist builder script (`scripts/build-case-shortlist.mjs`)
- [x] Shortlist validation script (`scripts/validate-case-shortlist.mjs`)
- [x] Shortlist data (`data/reviews/real/case-shortlist.json`)
- [x] Review console shortlist tab
- [x] Updated one-command runner with shortlist stages
- [x] Minimal runbook documentation

## Run Results
- Sources fetched: 6 OK, 1 failed (FTC)
- Candidates detected: 35 new
- After quality classification: 9 promotion eligible, 38 blocked
- Case-quality ready: 1 (CAND-0060: The Action Plan - EU Commission)

## Safety Confirmation
- Public dataset remains at 12 records
- No INC-0013 created
- All data stays local (data/watch/, data/reviews/)
- No site/ contamination
