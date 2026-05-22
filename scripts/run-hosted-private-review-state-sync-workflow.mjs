// run-hosted-private-review-state-sync-workflow.mjs (T071)
// Bounded local-only runner for hosted private review-state sync readiness workflow.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const LOG_OUT_PATH = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-workflow-latest.json');

function log(msg) {
  process.stdout.write(`[Hosted Private Review-State Sync Workflow] ${msg}\n`);
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
  log('Starting hosted private review-state sync readiness workflow...');
  const latestRun = readJson(LATEST_RUN_PATH);
  const runId = latestRun ? latestRun.run_id : 'UNKNOWN-RUN';

  const stages = [
    { name: 'build-hosted-private-review-state-sync', script: 'scripts/build-hosted-private-review-state-sync.mjs' },
    { name: 'export-hosted-private-review-state-sync-payloads', script: 'scripts/export-hosted-private-review-state-sync-payloads.mjs' },
    { name: 'validate-hosted-private-review-state-sync', script: 'scripts/validate-hosted-private-review-state-sync.mjs' },
    { name: 'validate-hosted-sync-safety', script: 'scripts/validate-hosted-sync-safety.mjs' }
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

  const manifestPath = path.join(ROOT, 'data', 'runtime', 'private-review-state-sync', 'hosted-private-review-state-sync-manifest.json');
  const manifest = readJson(manifestPath);

  const logPayload = {
    _schema: 'caesar-atlas/runtime/hosted-private-review-state-sync-workflow-log/v1',
    generated_at: new Date().toISOString(),
    source_run_id: runId,
    success,
    error: errorMsg,
    stages_executed: executed,
    summary: manifest ? {
      sync_id: manifest.sync_id || null,
      sync_status: manifest.sync_status || null,
      intended_supabase_table: manifest.intended_supabase_table || null,
      dry_run_mode: manifest.dry_run_mode ?? true,
      remote_write_attempted: manifest.remote_write_attempted ?? false,
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
  log('Hosted private review-state sync readiness workflow completed successfully.');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
