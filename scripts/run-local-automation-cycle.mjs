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

const STAGES = [
  { name: 'run-real-pipeline',          script: 'scripts/run-real-pipeline.mjs',           args: [],          optional: false },
  { name: 'export-ops-status',          script: 'scripts/export-ops-status.mjs',           args: [],          optional: false },
  { name: 'validate-ops-status',        script: 'scripts/validate-ops-status.mjs',         args: [],          optional: false },
  { name: 'build-public-case-pages',    script: 'scripts/build-public-case-pages.mjs',     args: [],          optional: true  },
  { name: 'build-rss-feeds',            script: 'scripts/build-rss-feeds.mjs',             args: [],          optional: false },
  { name: 'validate-public-site',       script: 'scripts/validate-public-site.mjs',        args: [],          optional: false },
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
