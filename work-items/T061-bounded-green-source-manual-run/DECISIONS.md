# T061 Decisions

## DEC-143 — Bounded Manual Run Safety Policy
Created explicit policy file (`manual-green-run-policy.json`) encoding all safety constraints. Policy is self-documenting and validates safety invariants.

## DEC-144 — Explicit Flag Required for Network Fetch
The `--execute-green-fetch` flag is required to perform actual network fetches. Without it, the runner performs dry-run planning only and exits 0. This prevents accidental network calls.

## DEC-145 — Metadata-Only Signal Storage
Candidate signals contain only metadata (hashes, HTTP headers, keyword counts, relevance scores). No full text, no HTML, no long third-party content is persisted.

## DEC-146 — Private Run Directory Isolation
All run outputs go to `data/watch/private/runs/<run_id>/`. This directory is explicitly excluded from `site/` publication and not copied to public outputs.

## DEC-147 — Supabase Payloads Remain Dry-Run
Even with real fetch runs, Supabase payloads are marked `mode: dry_run_export` with `remote_write_attempted: false`. No automatic remote writes occur.

## DEC-148 — Zero Signals Is Valid
If no keyword hits are detected, zero candidate signals is an acceptable outcome. The pipeline does not fail on zero signals.

## DEC-149 — Policy Compliance Checklist
The safety manifest includes a `validation_required` array listing all 25 required checks. This creates an explicit audit trail.
