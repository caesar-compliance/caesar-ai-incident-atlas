# T057 — Decisions

## D-01: Finder " 2." duplicate files go into .gitignore, not deleted

macOS Finder creates `filename 2.json` duplicates. These are untracked — adding a `* 2.*` gitignore pattern keeps working tree clean without destroying any data.

## D-02: .env.example tracked; .env and .env.* always ignored

`.env.example` is the canonical reference for required env vars. All real-value files are gitignored. `!.env.example` in `.gitignore` ensures the example is never accidentally ignored.

## D-03: sync-supabase-hosted.mjs requires 5 explicit guards for real push

Prevents accidental activation. Missing any of: `--push` flag, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ATLAS_CONFIRM_HOSTED_SYNC=YES`, `ATLAS_HOSTED_SYNC_MODE=push` → dry-run only.

## D-04: Bootstrap payloads include only safe public metadata

No raw HTML, no candidate details, no drafts, no packets, no previews, no source verification internals. Only fields already present in `data/incident-index.json` and the public site.

## D-05: Worker local test uses minimal Response/Request shim, not miniflare

Avoids npm dependency. Node 18+ built-in `URL` + custom `MockRequest`/`MockResponse` classes are sufficient to test all route logic.

## D-06: export-ops-status.mjs gets hosted_sync_status + backend_mode fields

These are safe informational fields. They do not change `automation_mode` (stays `manual_local`). Allows the public site monitoring panel to display backend readiness without implying live connectivity.
