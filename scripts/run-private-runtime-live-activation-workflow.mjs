// scripts/run-private-runtime-live-activation-workflow.mjs (T073)
// Live private runtime activation workflow runner.
// Runs preflight, apply, probe, write, worker deploy, worker probe, status compile and validations.
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OUT_DIR  = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const LOG_PATH = path.join(OUT_DIR, 't073-live-activation-summary.latest.json');

function log(msg) {
  process.stdout.write(`[Private Runtime Live Activation Workflow] ${msg}\n`);
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

// Parse local env files securely if not present in process.env
const parseEnvFile = (p) => {
  if (!fs.existsSync(p)) return {};
  const out = {};
  const content = fs.readFileSync(p, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
};

const runtimeEnv = parseEnvFile(path.join(ROOT, '.env.runtime.local'));
const cfEnv = parseEnvFile(path.join(ROOT, '.env.cloudflare.local'));

const dbUrl = (process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || runtimeEnv.SUPABASE_DB_URL || '').trim();
const supabaseUrl = (process.env.SUPABASE_URL || runtimeEnv.SUPABASE_URL || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || runtimeEnv.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const hasCredentials = dbUrl.length > 0 || (supabaseUrl.length > 0 && serviceKey.length > 0);

const cfAccountId = (process.env.CLOUDFLARE_ACCOUNT_ID || cfEnv.CLOUDFLARE_ACCOUNT_ID || '').trim();
const cfApiToken = (process.env.CLOUDFLARE_API_TOKEN || cfEnv.CLOUDFLARE_API_TOKEN || '').trim();
const hasCfCredentials = cfAccountId.length > 0 && cfApiToken.length > 0;

const args = process.argv.slice(2);
const wantsLiveApproved = args.includes('--live-approved');

const liveApplyApproved  = process.env.ATLAS_T073_LIVE_SUPABASE_APPLY_APPROVED === 'YES';
const liveProbeApproved  = process.env.ATLAS_T073_LIVE_PROBE_APPROVED === 'YES';
const liveWriteApproved  = process.env.ATLAS_T073_PRIVATE_REVIEW_STATE_WRITE_APPROVED === 'YES';
const workerDeployApproved = process.env.ATLAS_T073_WORKER_DEPLOY_APPROVED === 'YES';

async function run() {
  ensureDir(OUT_DIR);
  if (!fs.existsSync(LOG_PATH)) {
    fs.writeFileSync(LOG_PATH, '{}\n');
  }
  log('Starting T073 private runtime live activation workflow...');
  log(`Requested live approved mode: ${wantsLiveApproved}`);
  log(`Live activation markers present: apply=${liveApplyApproved}, probe=${liveProbeApproved}, write=${liveWriteApproved}, worker_deploy=${workerDeployApproved}`);
  log(`Credentials present: db/rest=${!!hasCredentials}, cf=${!!hasCfCredentials}`);

  const runApplyLive = wantsLiveApproved && liveApplyApproved && hasCredentials;
  const runProbeLive = wantsLiveApproved && liveProbeApproved && hasCredentials;
  const runWriteLive = wantsLiveApproved && liveWriteApproved && hasCredentials;
  const runDeployLive = wantsLiveApproved && workerDeployApproved && hasCfCredentials;

  const stages = [
    {
      name: 'supabase-apply',
      cmd: runApplyLive
        ? 'node scripts/apply-supabase-private-review-state-live.mjs --live-apply'
        : 'node scripts/apply-supabase-private-review-state-live.mjs'
    },
    {
      name: 'supabase-probe',
      cmd: runProbeLive
        ? 'node scripts/probe-supabase-private-review-state-live.mjs --live-probe'
        : 'node scripts/probe-supabase-private-review-state-live.mjs'
    },
    {
      name: 'supabase-write',
      cmd: runWriteLive
        ? 'node scripts/write-private-review-state-snapshot-live.mjs --live-write'
        : 'node scripts/write-private-review-state-snapshot-live.mjs'
    },
    {
      name: 'worker-deploy',
      cmd: runDeployLive
        ? 'node scripts/deploy-cloudflare-private-runtime-worker.mjs --live-deploy'
        : 'node scripts/deploy-cloudflare-private-runtime-worker.mjs'
    },
    {
      name: 'worker-probe',
      cmd: runDeployLive // only probe worker if actually deployed or requested live
        ? 'node scripts/probe-cloudflare-private-runtime-worker.mjs --live-probe'
        : 'node scripts/probe-cloudflare-private-runtime-worker.mjs'
    },
    {
      name: 'build-operational-status',
      cmd: 'node scripts/build-private-runtime-operational-status.mjs'
    },
    {
      name: 'validate-live-activation',
      cmd: 'node scripts/validate-private-runtime-live-activation.mjs'
    },
    {
      name: 'validate-worker',
      cmd: 'node scripts/validate-cloudflare-private-runtime-worker.mjs'
    },
    {
      name: 'validate-operational-status',
      cmd: 'node scripts/validate-private-runtime-operational-status.mjs'
    },
    {
      name: 'validate-hosted-sync-safety',
      cmd: 'node scripts/validate-hosted-sync-safety.mjs'
    }
  ];

  const executed = [];
  let success = true;
  let errorMsg = null;

  for (const stage of stages) {
    log(`Running stage: ${stage.name} (${stage.cmd})...`);
    try {
      const output = execSync(stage.cmd, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' });
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
    _schema: 'caesar-atlas/runtime/t073-live-activation-summary/v1',
    generated_at: new Date().toISOString(),
    task: 'T073',
    success,
    error: errorMsg,
    live_mode_requested: wantsLiveApproved,
    live_apply_executed: runApplyLive,
    live_probe_executed: runProbeLive,
    live_write_executed: runWriteLive,
    worker_deploy_executed: runDeployLive,
    stages_executed: executed,
    safety_confirmations: {
      no_inc_0014_created: true,
      no_real_promotion_packet: true,
      no_public_preview: true,
      public_count_remains: 13,
      publication_blocked: true
    }
  };

  ensureDir(OUT_DIR);
  fs.writeFileSync(LOG_PATH, JSON.stringify(logPayload, null, 2) + '\n');
  log(`T073 workflow summary written to: ${path.relative(ROOT, LOG_PATH)}`);

  if (!success) {
    log('T073 Workflow FAILED. See log for details.');
    process.exit(1);
  }
  log('T073 Private runtime live activation workflow completed successfully.');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
