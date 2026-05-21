// export-review-console-decision-data.mjs (T063)
// Exports private review decisions and draft packets to the local review console data folder.
// Bounded local-only execution. No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SOURCE_DECIS_PATH = path.join(ROOT, 'data', 'reviews', 'decisions', 'private-review-decisions-latest.json');
const SOURCE_PACKETS_PATH = path.join(ROOT, 'data', 'reviews', 'draft-candidate-packets', 'private-draft-candidate-packets-latest.json');

const TARGET_DECIS_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-review-decisions.json');
const TARGET_PACKETS_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-draft-candidate-packets.json');

function log(msg) {
  process.stdout.write(`[Console Exporter] ${msg}\n`);
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

async function run() {
  log('=== Exporting Private Decision Data to Review Console ===');

  const decisions = readJson(SOURCE_DECIS_PATH);
  if (!decisions) {
    log('FAIL: Private review decisions latest file is missing.');
    process.exit(1);
  }

  const packets = readJson(SOURCE_PACKETS_PATH);
  if (!packets) {
    log('FAIL: Private draft candidate packets latest file is missing.');
    process.exit(1);
  }

  // Double check that we are not exporting secrets or raw third-party content
  const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;

  const sanitizeCheck = (obj, label) => {
    const text = JSON.stringify(obj);
    if (HTML_PATTERN.test(text)) {
      log(`FAIL: Raw HTML found in ${label}. Export blocked.`);
      process.exit(1);
    }
  };

  sanitizeCheck(decisions, 'decisions');
  sanitizeCheck(packets, 'packets');

  // Write sanitized outputs directly to local review console private data folder
  writeJson(TARGET_DECIS_PATH, decisions);
  writeJson(TARGET_PACKETS_PATH, packets);

  log(`Successfully exported review decisions to: ${path.relative(ROOT, TARGET_DECIS_PATH)}`);
  log(`Successfully exported draft candidate packets to: ${path.relative(ROOT, TARGET_PACKETS_PATH)}`);
  log('=== Console Exporter COMPLETE ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
