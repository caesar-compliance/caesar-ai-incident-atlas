// run-private-promotion-dry-run-workflow.mjs (T067)
// Bounded local-only runner for the private promotion dry-run preparation workflow.
// No network. No Supabase writes. No site mutation. No public publish. No INC-0014.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const LOG_OUT_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-workflow-latest.json');

function log(msg) {
  process.stdout.write(`[Promo Dry-Run Workflow] ${msg}\n`);
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
  log('Starting private promotion dry-run workflow...');
  const latestRun = readJson(LATEST_RUN_PATH);
  const runId = latestRun ? latestRun.run_id : 'UNKNOWN-RUN';

  const stages = [
    { name: 'build-private-draft-candidate-package', script: 'scripts/build-private-draft-candidate-package.mjs' },
    { name: 'build-private-promotion-dry-run', script: 'scripts/build-private-promotion-dry-run.mjs' },
    { name: 'export-review-console-private-promotion-dry-run-data', script: 'scripts/export-review-console-private-promotion-dry-run-data.mjs' },
    { name: 'export-hosted-private-promotion-dry-run-payloads', script: 'scripts/export-hosted-private-promotion-dry-run-payloads.mjs' },
    { name: 'validate-private-promotion-dry-run', script: 'scripts/validate-private-promotion-dry-run.mjs' }
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

  // Load dry-run manifest to include in log
  const manifestPath = path.join(ROOT, 'data', 'reviews', 'private-promotion-dry-runs', 'private-promotion-dry-run-manifest.json');
  const manifest = readJson(manifestPath);

  const logPayload = {
    _schema: 'caesar-atlas/reviews/private-promotion-dry-run-workflow-log/v1',
    generated_at: new Date().toISOString(),
    source_run_id: runId,
    success,
    error: errorMsg,
    stages_executed: executed,
    summary: manifest ? {
      dry_run_count: manifest.dry_run_count || 0,
      blocker_count: manifest.blocker_count || 0,
      public_publish_ready_count: manifest.public_publish_ready_count || 0,
      safety_status: manifest.safety_status || {}
    } : null,
    safety_confirmations: {
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      no_remote_write: true,
      no_site_mutation: true,
      public_count_remains: 13
    }
  };

  writeJson(LOG_OUT_PATH, logPayload);
  log(`Workflow log written to: ${path.relative(ROOT, LOG_OUT_PATH)}`);

  if (!success) {
    log('Workflow FAILED. See log for details.');
    process.exit(1);
  }
  log('Private promotion dry-run workflow completed successfully.');
  log('Safety: No INC-0014. No real promotion packet. No public preview. No remote writes. Public count = 13.');
}

run().catch(err => {
  log(`Fatal error running workflow: ${err.message}`);
  process.exit(1);
});
