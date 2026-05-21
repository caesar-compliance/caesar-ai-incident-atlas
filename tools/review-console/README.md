# Atlas Local Draft Review Console (Mock Simulator)

This directory contains the **Local Draft Review Console**, an offline-only, local-first mock audit workspace designed to simulate the curation, validation, and promotion-gate workflow for discovered case drafts before they are ever published to the public Atlas repository.

> [!WARNING]
> **STRICT SECURITY CONTAINMENT WARNING**
> This console operates **exclusively** on synthetic mock discovery candidates, drafts, and digests. All mock files are kept strictly outside the public site root `site/`. The Promotion Gate simulator hardcodes blocking mechanisms that prevent any mock or synthetic draft from ever being promoted to a public incident record.

## Architecture & Layout

The review console consists of the following local assets:
- **`index.html`**: A clean, single-page client interface featuring high-fidelity dark styling.
- **`assets/review-console.css`**: Premium glassmorphic stylesheets, custom HSL-tailored colors, animated indicator pulses, and responsive grids.
- **`assets/review-console.js`**: Client-side logic that loads compiled review bundles, handles fuzzy draft searches, links active drafts with their source candidates, and drives the multi-stage Promotion Gate validation visualizer.
- **`review-bundle.json`**: An aggregated JSON bundle built by `scripts/build-review-bundle.mjs` containing mock candidates, drafts, and weekly preview digests.

## Features

1. **Synthetic & Mock Visual Demarcation**: Strict warning headers and status pills label every field as synthetic to prevent any confusion with active regulatory datasets.
2. **Dynamic Draft Selector**: Enables real-time searching, category selection, and instant viewing of the case taxonomy.
3. **Comprehensive Case Auditor**: Displays critical metadata (Candidate ID, Draft ID, Jurisdiction, Case Type, Source URLs) alongside advanced case-to-control model mapping elements (Failure Modes, Missing Controls, Audit Evidence, and Curator Training Insights).
4. **Promotion Gate Visual Simulator**: Simulates the multi-tiered Control Tower Promotion validation, showing a hard barrier interception blocking synthetic publication:
   - Discovered Candidate (Mock) `[PASS]`
   - JSON Schema Compliance `[PASS]`
   - Curator Review `[SIMULATED PASS]`
   - Clean Room Wording Audit `[SIMULATED PASS]`
   - Control Tower Publication Approval `[BLOCKED]`

## Quick Start (Local Setup)

Because the console is completely offline and does not fetch remote URLs or use external CDNs, it reads the local `review-bundle.json`. Follow these steps to spin it up:

### 1. Compile the Review Bundle
Regenerate the combined JSON bundle from the latest mock inputs:
```bash
node scripts/build-review-bundle.mjs
```

### 2. Launch the Review Console
Start a local static server inside the repository or under the `tools/review-console` folder:
```bash
# Using standard Python 3 http.server
python3 -m http.server 8000 --directory tools/review-console/
```

Open [http://localhost:8000](http://localhost:8000) in your web browser.

## Safety Containment Checklist
To protect public release channels, the following limits are enforced by script validators:
- No review console files can exist under the `site/` folder.
- The `review-bundle.json` file must reference only candidates/drafts that contain `mock` or `synthetic` in their ID or paths.
- No synthetic cases can ever be written to `site/data/incidents` or included in the public RSS/atom feeds.
