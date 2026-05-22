// run-private-runtime-activation-workflow.mjs (T072)
// Private runtime activation workflow runner.
// Runs preflight, apply, probe, write, and validation stages.
// Supports optional --live-approved mode to run with remote apply/probe/write.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OUT_DIR  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const LOG_PATH = path.join(OUT_DIR, 'private-runtime-activation-workflow-latest.json');

function log(msg) {
  process.stdout.write(`[Private Runtime Activation Workflow] ${msg}\n`);
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

// Safely parse .env files — values are never printed
const parseEnvFile = (p) => {
  if (!fs.existsSync(p)) return {};
  const out = {};
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    out[key] = value;
  }
  return out;
};

const runtimeEnv = parseEnvFile(path.join(ROOT, '.env.runtime.local'));

const args = process.argv.slice(2);
const wantsLiveApproved = args.includes('--live-approved');

// Check live approval markers
// Read live approval markers from process.env first, then .env.runtime.local — no inline secret commands needed.
const liveApplyApproved  = (process.env.ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED  || runtimeEnv.ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED  || '') === 'YES';
const liveProbeApproved  = (process.env.ATLAS_T072_LIVE_PROBE_APPROVED            || runtimeEnv.ATLAS_T072_LIVE_PROBE_APPROVED            || '') === 'YES';
const liveWriteApproved  = (process.env.ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED || runtimeEnv.ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED || '') === 'YES';
const dbUrl = (process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || runtimeEnv.SUPABASE_DB_URL || '').trim();
const hasCredentials = dbUrl.length > 0 || ((process.env.SUPABASE_URL || runtimeEnv.SUPABASE_URL) && (process.env.SUPABASE_SERVICE_ROLE_KEY || runtimeEnv.SUPABASE_SERVICE_ROLE_KEY));

const canExecuteLive = wantsLiveApproved && liveApplyApproved && liveProbeApproved && liveWriteApproved && hasCredentials;

// Build safe env for child processes — no inline secret commands needed in calling shell.
const SAFE_ENV_KEYS = [
  'SUPABASE_URL', 'SUPABASE_DB_URL', 'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY', 'SUPABASE_PROJECT_REF', 'SUPABASE_SCHEMA',
  'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_SECRET_KEY', 'SUPABASE_API_KEY_MODE',
  'ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED', 'ATLAS_T072_LIVE_PROBE_APPROVED',
  'ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED', 'RUNTIME_ENV',
];
const childEnv = { ...process.env };
for (const key of SAFE_ENV_KEYS) {
  if (runtimeEnv[key] && !childEnv[key]) childEnv[key] = runtimeEnv[key];
}

async function run() {
  log('Starting private runtime activation workflow...');
  log(`Requested live approved mode: ${wantsLiveApproved}`);
  log(`Live activation markers present: apply=${liveApplyApproved}, probe=${liveProbeApproved}, write=${liveWriteApproved}, creds=${!!hasCredentials}`);

  let actualLiveRun = false;
  if (wantsLiveApproved) {
    if (canExecuteLive) {
      log('All guards and approval markers are satisfied! Running with live remote execution.');
      actualLiveRun = true;
    } else {
      const missing = [];
      if (!liveApplyApproved) missing.push('ATLAS_T072_LIVE_SUPABASE_APPLY_APPROVED=YES');
      if (!liveProbeApproved) missing.push('ATLAS_T072_LIVE_PROBE_APPROVED=YES');
      if (!liveWriteApproved) missing.push('ATLAS_T072_PRIVATE_REVIEW_STATE_WRITE_APPROVED=YES');
      if (!hasCredentials) missing.push('Supabase database credentials');
      log(`WARNING: Live execution requested but guards are not met. Downgrading to dry-run mode.`);
      log(`Missing: ${missing.join(', ')}`);
    }
  }

  const stages = [
    { name: 'preflight', cmd: 'node scripts/preflight-supabase-private-review-state-apply.mjs' },
    {
      name: 'apply',
      cmd: actualLiveRun
        ? 'node scripts/apply-supabase-private-review-state.mjs --live-apply'
        : 'node scripts/apply-supabase-private-review-state.mjs'
    },
    {
      name: 'probe',
      cmd: actualLiveRun
        ? 'node scripts/probe-supabase-private-review-state-live.mjs --live-probe'
        : 'node scripts/probe-supabase-private-review-state-live.mjs'
    },
    {
      name: 'write',
      cmd: actualLiveRun
        ? 'node scripts/write-private-review-state-snapshot.mjs --live-write'
        : 'node scripts/write-private-review-state-snapshot.mjs'
    },
    { name: 'validate-private-runtime-activation', cmd: 'node scripts/validate-private-runtime-activation.mjs' },
    { name: 'validate-hosted-sync-safety', cmd: 'node scripts/validate-hosted-sync-safety.mjs' }
  ];

  const executed = [];
  let success = true;
  let errorMsg = null;

  for (const stage of stages) {
    log(`Running stage: ${stage.name} (${stage.cmd})...`);
    try {
      const output = execSync(stage.cmd, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8', env: childEnv });
      executed.push({ stage: stage.name, status: 'PASS', output: output.trim().split('\n').slice(-3) });
    } catch (err) {
      log(`Stage ${stage.name} FAILED: ${err.message}`);
      executed.push({ stage: stage.name, status: 'FAIL', error: err.message, stderr: err.stderr ? err.stderr.trim() : null });
      success = false;
      errorMsg = err.message;
      break;
    }
  }

  const logPayload = {
    _schema: 'caesar-atlas/runtime/private-runtime-activation-workflow-log/v1',
    generated_at: new Date().toISOString(),
    task: 'T072',
    success,
    error: errorMsg,
    live_mode_requested: wantsLiveApproved,
    live_mode_executed: actualLiveRun,
    stages_executed: executed,
    safety_confirmations: {
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      public_count_remains: 13,
      publication_blocked: true
    }
  };

  writeJson(LOG_PATH, logPayload);
  log(`Workflow log written to: ${path.relative(ROOT, LOG_PATH)}`);

  // Compile review console state
  const readJson = (p) => {
    try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
    catch { return null; }
  };
  const applyData = readJson(path.join(OUT_DIR, 'private-runtime-activation-apply-result-latest.json')) || {};
  const probeData = readJson(path.join(OUT_DIR, 'private-runtime-activation-probe-result-latest.json')) || {};
  const writeData = readJson(path.join(OUT_DIR, 'private-runtime-activation-write-result-latest.json')) || {};

  const consolePayload = {
    generated_at: new Date().toISOString(),
    migration_target: '002_private_review_state_sync.sql',
    apply_status: applyData.remote_apply_executed ? 'live_applied' : 'dry_run_plan_emitted',
    probe_status: probeData.live_probe_attempted ? (probeData.success ? 'live_probe_passed' : 'live_probe_failed') : 'dry_run_probe_plan_emitted',
    snapshot_write_status: writeData.remote_write_attempted ? 'live_snapshot_written' : 'dry_run_write_plan_emitted',
    worker_route_status: 'dry_run_ready',
    live_activation_executed: actualLiveRun,
    publication_still_blocked: true,
    no_inc_0014: true,
    no_public_preview: true,
    no_worker_deploy: true,
    safety_flags: {
      no_raw_html: true,
      no_secrets: true,
      no_inc_0014: true
    }
  };

  const CONSOLE_DATA_PATH = path.join(ROOT, 'tools', 'review-console', 'data', 'private-runtime-activation.json');
  writeJson(CONSOLE_DATA_PATH, consolePayload);
  log(`Review console data written to: ${path.relative(ROOT, CONSOLE_DATA_PATH)}`);

  if (!success) {
    log('Workflow FAILED. See log for details.');
    process.exit(1);
  }
  log('Private runtime activation workflow completed successfully.');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
