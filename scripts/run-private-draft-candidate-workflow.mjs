// run-private-draft-candidate-workflow.mjs (T066)
// Bounded local-only runner for shaping the private draft candidate package.
// No network, no remote writes, no site mutation, no public publish.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const LATEST_RUN_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'real-green-run-latest.json');
const LOG_OUT_PATH = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-workflow-latest.json');

function log(msg) {
  process.stdout.write(`[Private Package Workflow] ${msg}\n`);
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
  log('Starting private draft candidate package workflow...');
  const latestRun = readJson(LATEST_RUN_PATH);
  const runId = latestRun ? latestRun.run_id : 'UNKNOWN-RUN';

  const stages = [
    { name: 'build-private-draft-candidate-packets', script: 'scripts/build-private-draft-candidate-packets.mjs' },
    { name: 'build-private-draft-candidate-package', script: 'scripts/build-private-draft-candidate-package.mjs' },
    { name: 'export-review-console-private-draft-candidate-data', script: 'scripts/export-review-console-private-draft-candidate-data.mjs' },
    { name: 'export-hosted-private-draft-candidate-payloads', script: 'scripts/export-hosted-private-draft-candidate-payloads.mjs' },
    { name: 'validate-private-draft-candidate-package', script: 'scripts/validate-private-draft-candidate-package.mjs' }
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
  const manifestPath = path.join(ROOT, 'data', 'reviews', 'private-draft-candidates', 'private-draft-candidate-package-manifest.json');
  const manifest = readJson(manifestPath);

  const logPayload = {
    _schema: 'caesar-atlas/reviews/private-draft-candidate-workflow-log/v1',
    generated_at: new Date().toISOString(),
    source_run_id: runId,
    success,
    error: errorMsg,
    stages_executed: executed,
    summary: manifest ? {
      package_count: manifest.package_count || 0,
      safety_status: manifest.safety_status || {}
    } : null
  };

  writeJson(LOG_OUT_PATH, logPayload);
  log(`Concise sanitized workflow log written to: ${path.relative(ROOT, LOG_OUT_PATH)}`);

  if (!success) {
    process.exit(1);
  }
  log('Private draft candidate package workflow completed successfully.');
}

run().catch(err => {
  log(`Fatal error running workflow: ${err.message}`);
  process.exit(1);
});
