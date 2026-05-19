# T021 Decisions

## DEC-108 — G-12 Clearance

G-12 cleared by explicit Control Tower instruction: `"Approve public deployment"`.

## DEC-109 — Default URL Deployment

Deploy to GitHub Pages default URL. Custom domain deferred to T022.

## DEC-110 — No CNAME

CNAME file intentionally not added. DNS configuration deferred.

## DEC-111 — Publish Directory

Workflow configured to upload only `site/` directory. Repo root not exposed.

## DEC-112 — Jekyll Bypass

`site/.nojekyll` added to disable Jekyll processing and serve static files as-is.

## DEC-113 — Workflow Permissions

Minimal permissions: `contents: read`, `pages: write`, `id-token: write`.

## DEC-114 — Version Bump

CHANGELOG updated to v0.5.7 for T021 deployment activation.
