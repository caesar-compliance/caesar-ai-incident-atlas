// scripts/deploy-cloudflare-private-runtime-worker.mjs (T073)
// Default mode: dry-run only. Real deploy requires --live-deploy + ATLAS_T073_WORKER_DEPLOY_APPROVED=YES + CF credentials.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OUT_DIR     = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const OUTPUT_PATH = path.join(OUT_DIR, 't073-worker-deploy-result.latest.json');

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

const cfEnv = parseEnvFile(path.join(ROOT, '.env.cloudflare.local'));
const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || cfEnv.CLOUDFLARE_ACCOUNT_ID || '').trim();
const apiToken = (process.env.CLOUDFLARE_API_TOKEN || cfEnv.CLOUDFLARE_API_TOKEN || '').trim();
const workerName = (process.env.CLOUDFLARE_WORKER_NAME || cfEnv.CLOUDFLARE_WORKER_NAME || 'incident-atlas-monitor-dev').trim();
const hasCfCreds = accountId.length > 0 && apiToken.length > 0;

const args = process.argv.slice(2);
const hasLiveDeployFlag = args.includes('--live-deploy');

const deployApproved = process.env.ATLAS_T073_WORKER_DEPLOY_APPROVED === 'YES';
const shouldDeployLive = hasLiveDeployFlag && deployApproved && hasCfCreds;

const now = new Date().toISOString();
let executed = false;
let success = false;
let errorMsg = null;
let deployDetails = null;

if (shouldDeployLive) {
  process.stdout.write('deploy-cloudflare-private-runtime-worker: LIVE deployment approved. Running wrangler deploy...\n');
  try {
    const envVars = {
      ...process.env,
      CLOUDFLARE_ACCOUNT_ID: accountId,
      CLOUDFLARE_API_TOKEN: apiToken,
    };
    
    const workerDir = path.join(ROOT, 'infra', 'cloudflare-worker');
    const r = spawnSync('npx', ['wrangler', 'deploy', '--name', workerName], {
      cwd: workerDir,
      env: envVars,
      encoding: 'utf8'
    });

    if (r.status !== 0) {
      throw new Error(`Wrangler deploy failed: ${r.stderr || r.stdout}`);
    }

    executed = true;
    success = true;
    deployDetails = {
      worker_name: workerName,
      deployed_at: now,
      raw_output: (r.stdout || '').trim().split('\n').slice(-3)
    };
    process.stdout.write('PASS: Cloudflare Worker deployed successfully.\n');
  } catch (err) {
    errorMsg = err.message;
    process.stdout.write('FAIL: Cloudflare Worker deployment failed: ' + errorMsg + '\n');
  }
} else {
  const missing = [];
  if (!hasLiveDeployFlag) missing.push('--live-deploy flag');
  if (!deployApproved) missing.push('ATLAS_T073_WORKER_DEPLOY_APPROVED=YES');
  if (!hasCfCreds) missing.push('Cloudflare Account ID / API Token');

  process.stdout.write('deploy-cloudflare-private-runtime-worker: DRY-RUN ONLY.\n');
  process.stdout.write('  Reason: ' + (missing.length > 0 ? 'Missing ' + missing.join(', ') : 'unknown') + '\n');
  success = true; // dry-run success
}

const deployResult = {
  _schema: 'atlas-private-runtime-activation-worker-deploy-result/v1',
  generated_at: now,
  task: 'T073',
  live_deploy_requested: hasLiveDeployFlag,
  live_deploy_approved: deployApproved,
  worker_deploy_attempted: executed,
  success: success,
  deploy_details: deployDetails,
  errors: errorMsg,
  note: executed ? 'Cloudflare Worker was deployed to remote environment.' : 'Dry-run worker deploy only. No deployment performed.'
};

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(deployResult, null, 2) + '\n');

process.exit(success ? 0 : 1);
