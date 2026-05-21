// run-local-automation-cycle.mjs (T056)
// One-command local automation cycle runner.
// Runs all pipeline + export + validation stages in order.
// Logs to data/ops/latest-local-automation-cycle.log
// No interactive prompts. No background timers. Bounded execution only.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);
const OPS_DIR = path.join(ROOT, 'data', 'ops');
const LOG_PATH = path.join(OPS_DIR, 'latest-local-automation-cycle.log');

if (!fs.existsSync(OPS_DIR)) fs.mkdirSync(OPS_DIR, { recursive: true });

// T060: optional flag to include manual watch-run queue build/export steps
// Default: OFF (safe). Enable with: node scripts/run-local-automation-cycle.mjs --with-watch-queue
const WITH_WATCH_QUEUE = process.argv.includes('--with-watch-queue');

// T061: optional flag to include bounded green-source manual run
// Default: OFF (safe). Enable with: node scripts/run-local-automation-cycle.mjs --with-bounded-green-run
// Can combine: --with-bounded-green-run --execute-green-fetch (requires explicit --execute-green-fetch for network)
const WITH_BOUNDED_GREEN = process.argv.includes('--with-bounded-green-run');

// T062: optional flag to include private candidate review intake generation, export, and validation
// Default: OFF (safe). Enable with: node scripts/run-local-automation-cycle.mjs --with-review-intake
const WITH_REVIEW_INTAKE = process.argv.includes('--with-review-intake');

// T063: optional flag to run ONLY the private review intake workflow bounded
const REVIEW_INTAKE_ONLY = process.argv.includes('--review-intake-only');

const STAGES = [
  { name: 'run-real-pipeline',              script: 'scripts/run-real-pipeline.mjs',                   args: [],          optional: false },
  { name: 'export-ops-status',              script: 'scripts/export-ops-status.mjs',                   args: [],          optional: false },
  { name: 'validate-ops-status',            script: 'scripts/validate-ops-status.mjs',                 args: [],          optional: false },
  { name: 'build-public-case-pages',        script: 'scripts/build-public-case-pages.mjs',             args: [],          optional: true  },
  { name: 'build-rss-feeds',               script: 'scripts/build-rss-feeds.mjs',                     args: [],          optional: false },
  { name: 'validate-public-site',           script: 'scripts/validate-public-site.mjs',                args: [],          optional: false },
  // T060 — manual watch-run queue stages (optional, no network fetch, no publish, no remote write)
  ...(WITH_WATCH_QUEUE ? [
    { name: 'build-manual-watch-run-queue',     script: 'scripts/build-manual-watch-run-queue.mjs',    args: [],          optional: false },
    { name: 'build-manual-watch-run-envelope',  script: 'scripts/build-manual-watch-run-envelope.mjs', args: [],         optional: false },
    { name: 'export-hosted-watch-run-payloads', script: 'scripts/export-hosted-watch-run-payloads.mjs', args: [],        optional: false },
    { name: 'validate-manual-watch-run',        script: 'scripts/validate-manual-watch-run.mjs',       args: [],          optional: false },
  ] : []),
  // T061 — bounded green-source manual run stages
  ...(WITH_BOUNDED_GREEN ? [
    { name: 'build-manual-watch-run-queue',       script: 'scripts/build-manual-watch-run-queue.mjs',       args: [],          optional: false },
    { name: 'build-manual-watch-run-envelope',    script: 'scripts/build-manual-watch-run-envelope.mjs',  args: [],          optional: false },
    { name: 'run-bounded-green-source-manual-run', script: 'scripts/run-bounded-green-source-manual-run.mjs', args: process.argv.includes('--execute-green-fetch') ? ['--execute-green-fetch'] : [], optional: false },
    { name: 'build-private-candidate-signals',    script: 'scripts/build-private-candidate-signals.mjs',    args: [],          optional: false },
    { name: 'export-hosted-watch-run-payloads',  script: 'scripts/export-hosted-watch-run-payloads.mjs',  args: [],          optional: false },
    { name: 'validate-bounded-green-source-run', script: 'scripts/validate-bounded-green-source-run.mjs', args: [],          optional: false },
  ] : []),
  // T062 — private candidate review intake stages
  ...(WITH_REVIEW_INTAKE ? [
    { name: 'build-private-candidate-review-intake',    script: 'scripts/build-private-candidate-review-intake.mjs',    args: [],          optional: false },
    { name: 'export-review-console-private-intake',    script: 'scripts/export-review-console-private-intake.mjs',    args: [],          optional: false },
    { name: 'export-hosted-review-intake-payloads',    script: 'scripts/export-hosted-review-intake-payloads.mjs',    args: [],          optional: false },
    { name: 'validate-private-candidate-review-intake', script: 'scripts/validate-private-candidate-review-intake.mjs', args: [],          optional: false },
  ] : []),
];

const logStream = fs.createWriteStream(LOG_PATH, { flags: 'w' });
const startTime = Date.now();

function log(msg) {
  const ts = new Date().toISOString();
  const line = '[' + ts + '] ' + msg;
  process.stdout.write(line + '\n');
  logStream.write(line + '\n');
}

function runStage(script, args) {
  return new Promise((resolve) => {
    const fullPath = path.join(ROOT, script);
    if (!fs.existsSync(fullPath)) {
      resolve({ exitCode: null, skipped: true });
      return;
    }
    const child = spawn('node', [fullPath, ...args], { cwd: ROOT, stdio: 'pipe' });
    let out = '';
    child.stdout.on('data', d => { out += d.toString(); });
    child.stderr.on('data', d => { out += d.toString(); });
    child.on('close', code => resolve({ exitCode: code, output: out, skipped: false }));
    child.on('error', err => resolve({ exitCode: 1, output: err.message, skipped: false }));
  });
}

async function main() {
  if (REVIEW_INTAKE_ONLY) {
    log('=== Local Automation Cycle START (Intake Workflow Only) ===');
    const result = await runStage('scripts/run-private-review-workflow.mjs', []);
    if (result.output) logStream.write(result.output + '\n');
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    log('=== Local Automation Cycle DONE ===');
    log('Log written to: ' + LOG_PATH);
    if (result.exitCode === 0) {
      log('PASS: run-private-review-workflow');
      process.exit(0);
    } else {
      log('FAIL (exit ' + result.exitCode + '): run-private-review-workflow');
      process.exit(1);
    }
  }

  log('=== Local Automation Cycle START ===');
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const stage of STAGES) {
    log('--- Stage: ' + stage.name + ' ---');
    const result = await runStage(stage.script, stage.args);

    if (result.skipped) {
      if (stage.optional) {
        log('SKIP (optional, not found): ' + stage.script);
        skipped++;
        continue;
      } else {
        log('FAIL (required, not found): ' + stage.script);
        if (result.output) logStream.write(result.output + '\n');
        failed++;
        break;
      }
    }

    if (result.output) logStream.write(result.output + '\n');

    if (result.exitCode === 0) {
      log('PASS: ' + stage.name);
      passed++;
    } else {
      log('FAIL (exit ' + result.exitCode + '): ' + stage.name);
      failed++;
      break;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  log('=== Local Automation Cycle DONE ===');
  log('Passed: ' + passed + '  Failed: ' + failed + '  Skipped: ' + skipped + '  Elapsed: ' + elapsed + 's');
  log('Log written to: ' + LOG_PATH);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  log('FATAL: ' + err.message);
  logStream.end();
  process.exit(1);
});
