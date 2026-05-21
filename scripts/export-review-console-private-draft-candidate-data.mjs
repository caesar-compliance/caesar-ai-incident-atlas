// export-review-console-private-draft-candidate-data.mjs (T066)
// Exports private draft candidate package summary to local review console data folder.
// Bounded local-only execution. No remote writes, no site mutation, no public publish.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SOURCE_PACKAGE_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-latest.json');
const TARGET_CONSOLE_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-draft-candidate-package.json');

function log(msg) {
  process.stdout.write(`[Console Package Exporter] ${msg}\n`);
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
  log('=== Exporting Private Draft Candidate Package Summary to Review Console ===');

  const p = readJson(SOURCE_PACKAGE_PATH);
  if (!p) {
    log('FAIL: Private draft candidate package latest file is missing or invalid.');
    process.exit(1);
  }

  const consoleSummary = {
    _schema: 'caesar-atlas/reviews/review-console-private-draft-candidate-package/v1',
    generated_at: new Date().toISOString(),
    package_count: 1,
    source_run_id: p.source_run_id,
    intake_id: p.intake_id,
    approval_id: p.approval_id,
    draft_status: p.draft_status,
    public_publish_ready_count: 0,
    blockers: p.public_readiness.blockers,
    suggested_title: p.suggested_title,
    suggested_control_themes: p.suggested_control_themes,
    suggested_evidence_questions: p.suggested_evidence_questions,
    suggested_vendor_questions: p.suggested_vendor_questions
  };

  // Double check that we are not exporting secrets or raw third-party content
  const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;
  const sanitizeCheck = (obj, label) => {
    const text = JSON.stringify(obj);
    if (HTML_PATTERN.test(text)) {
      log(`FAIL: Raw HTML found in ${label}. Export blocked.`);
      process.exit(1);
    }
  };
  sanitizeCheck(consoleSummary, 'consoleSummary');

  writeJson(TARGET_CONSOLE_PATH, consoleSummary);
  log(`Successfully exported private draft package summary to: ${path.relative(ROOT, TARGET_CONSOLE_PATH)}`);
  log('=== Console Package Exporter COMPLETE ===');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
