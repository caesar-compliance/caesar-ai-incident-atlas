// One-command real pipeline runner (T051)
// Runs all pipeline stages in order, stops on first failure.
// Writes full log to data/watch/runs/latest-real-pipeline.log
// Safety: no interactive prompts, no public records created, dry-run for promotion.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);
const RUNS_DIR = path.join(ROOT, 'data', 'watch', 'runs');
const LOG_PATH = path.join(RUNS_DIR, 'latest-real-pipeline.log');

// Pipeline stages in execution order
const PIPELINE_STAGES = [
  { name: 'watch-green-sources',       script: 'scripts/watch-green-sources.mjs',        args: [] },
  { name: 'classify-candidate-quality', script: 'scripts/classify-candidate-quality.mjs', args: [] },
  { name: 'dedupe-real-candidates',     script: 'scripts/dedupe-real-candidates.mjs',     args: [] },
  { name: 'build-real-case-drafts',     script: 'scripts/build-real-case-drafts.mjs',     args: [] },
  { name: 'validate-real-drafts',       script: 'scripts/validate-real-drafts.mjs',       args: [] },
  { name: 'build-promotion-packets',    script: 'scripts/build-promotion-packets.mjs',    args: [] },
  { name: 'validate-promotion-packets', script: 'scripts/validate-promotion-packets.mjs', args: [] },
  { name: 'rank-promotion-candidates',  script: 'scripts/rank-promotion-candidates.mjs',  args: [] },
  { name: 'promote-approved-case',      script: 'scripts/promote-approved-case.mjs',      args: ['--dry-run'] },
  { name: 'validate-promotion-dry-run', script: 'scripts/validate-promotion-dry-run.mjs', args: [] },
  { name: 'build-real-review-bundle',   script: 'scripts/build-real-review-bundle.mjs',   args: [] },
  { name: 'validate-review-console',    script: 'scripts/validate-review-console.mjs',    args: [] },
  { name: 'validate-candidate-quality', script: 'scripts/validate-candidate-quality.mjs', args: [] },
  { name: 'validate-real-watcher',      script: 'scripts/validate-real-watcher.mjs',      args: [] },
];

function runStage(script, args, logStream) {
  return new Promise((resolve) => {
    const fullPath = path.join(ROOT, script);
    const child = spawn('node', [fullPath, ...args], { cwd: ROOT, stdio: 'pipe' });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => {
      const text = d.toString();
      stdout += text;
      process.stdout.write(text);
      logStream.write(text);
    });

    child.stderr.on('data', (d) => {
      const text = d.toString();
      stderr += text;
      process.stderr.write(text);
      logStream.write(text);
    });

    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    child.on('error', (err) => {
      const msg = `[runner] Failed to start ${script}: ${err.message}\n`;
      process.stderr.write(msg);
      logStream.write(msg);
      resolve({ code: 1, stdout, stderr: stderr + msg });
    });
  });
}

async function main() {
  if (!fs.existsSync(RUNS_DIR)) fs.mkdirSync(RUNS_DIR, { recursive: true });

  const startTime = new Date();
  const logStream = fs.createWriteStream(LOG_PATH, { flags: 'w' });
  const header = `=== Caesar Real Pipeline Run ===\nStarted: ${startTime.toISOString()}\n${'='.repeat(50)}\n`;
  logStream.write(header);
  process.stdout.write(header);

  const results = [];
  let failed = false;
  let failedStage = null;

  for (const stage of PIPELINE_STAGES) {
    const line = `\n[${stage.name}] Running ${stage.script}${stage.args.length ? ' ' + stage.args.join(' ') : ''}...\n`;
    logStream.write(line);
    process.stdout.write(line);

    const scriptPath = path.join(ROOT, stage.script);
    if (!fs.existsSync(scriptPath)) {
      const skip = `[${stage.name}] SKIP — script not found: ${stage.script}\n`;
      logStream.write(skip);
      process.stdout.write(skip);
      results.push({ stage: stage.name, status: 'skipped', code: null });
      continue;
    }

    const { code } = await runStage(stage.script, stage.args, logStream);
    const status = code === 0 ? 'PASS' : 'FAIL';
    const summary = `[${stage.name}] ${status} (exit ${code})\n`;
    logStream.write(summary);
    process.stdout.write(summary);
    results.push({ stage: stage.name, status, code });

    if (code !== 0) {
      failed = true;
      failedStage = stage.name;
      break;
    }
  }

  const endTime = new Date();
  const durationMs = endTime - startTime;

  const footer = `\n${'='.repeat(50)}\nPipeline ${failed ? 'FAILED' : 'PASSED'}\n` +
    (failed ? `Failed at stage: ${failedStage}\n` : '') +
    `Duration: ${(durationMs / 1000).toFixed(1)}s\nEnded: ${endTime.toISOString()}\nLog: ${LOG_PATH}\n${'='.repeat(50)}\n`;
  logStream.write(footer);
  process.stdout.write(footer);

  // Stage summary table
  const tableHeader = '\nStage Results:\n';
  logStream.write(tableHeader);
  process.stdout.write(tableHeader);
  for (const r of results) {
    const row = `  ${r.status.padEnd(8)} ${r.stage}\n`;
    logStream.write(row);
    process.stdout.write(row);
  }

  logStream.end();
  process.exit(failed ? 1 : 0);
}

main().catch(err => {
  console.error('[runner] Fatal:', err);
  process.exit(1);
});
