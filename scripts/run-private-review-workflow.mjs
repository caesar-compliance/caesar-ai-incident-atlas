// run-private-review-workflow.mjs (T063)
// Bounded local-only runner for private review intake workflow steps.
// No network, no remote writes, no site mutation, no public publish.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const LOG_OUT_PATH = path.join(ROOT, 'data', 'reviews', 'intake', 'private-review-workflow-latest.json');

function log(msg) {
  process.stdout.write(`[Private Review Workflow] ${msg}\n`);
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
  log('Starting private review intake workflow...');
  const latestRun = readJson(LATEST_RUN_PATH);
  const runId = latestRun ? latestRun.run_id : 'UNKNOWN-RUN';

  const stages = [
    { name: 'build-private-candidate-review-intake', script: 'scripts/build-private-candidate-review-intake.mjs' },
    { name: 'export-review-console-private-intake', script: 'scripts/export-review-console-private-intake.mjs' },
    { name: 'export-hosted-review-intake-payloads', script: 'scripts/export-hosted-review-intake-payloads.mjs' },
    { name: 'validate-private-candidate-review-intake', script: 'scripts/validate-private-candidate-review-intake.mjs' }
  ];

  const executed = [];
  let success = true;
  let errorMsg = null;

  for (const stage of stages) {
    log(`Running stage: ${stage.name} (${stage.script})...`);
    try {
      const output = execSync(`node ${stage.script}`, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' });
      executed.push({ stage: stage.name, status: 'PASS', output: output.trim().split('\n').slice(-3) });
    } catch (err) {
      log(`Stage ${stage.name} FAILED: ${err.message}`);
      executed.push({ stage: stage.name, status: 'FAIL', error: err.message, stderr: err.stderr ? err.stderr.trim() : null });
      success = false;
      errorMsg = err.message;
      break;
    }
  }

  // Load manifest counts to add to the log if available
  const manifestPath = path.join(ROOT, 'data', 'reviews', 'intake', 'private-candidate-intake-manifest.json');
  const manifest = readJson(manifestPath);

  const logPayload = {
    _schema: 'caesar-atlas/reviews/private-review-workflow-log/v1',
    generated_at: new Date().toISOString(),
    source_run_id: runId,
    success,
    error: errorMsg,
    stages_executed: executed,
    summary: manifest ? {
      intake_count: manifest.intake_count || 0,
      needs_review_count: manifest.needs_review_count || 0,
      blocked_count: manifest.blocked_count || 0,
      publish_ready_count: manifest.publish_ready_count || 0,
      safety_status: manifest.safety_status || {}
    } : null
  };

  writeJson(LOG_OUT_PATH, logPayload);
  log(`Consise sanitized workflow log written to: ${path.relative(ROOT, LOG_OUT_PATH)}`);

  if (!success) {
    process.exit(1);
  }
  log('Private review intake workflow completed successfully.');
}

run().catch(err => {
  log(`Fatal error running workflow: ${err.message}`);
  process.exit(1);
});
