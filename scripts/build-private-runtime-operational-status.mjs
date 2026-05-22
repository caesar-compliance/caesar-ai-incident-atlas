// scripts/build-private-runtime-operational-status.mjs (T073)
// Aggregates Supabase apply/probe/write and Worker deploy/probe details into a unified operational status file.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const activationDir = path.join(ROOT, 'data', 'runtime', 'private-runtime-activation');
const applyPath     = path.join(activationDir, 't073-live-apply-result.latest.json');
const probePath     = path.join(activationDir, 't073-live-probe-result.latest.json');
const writePath     = path.join(activationDir, 't073-private-snapshot-write-result.latest.json');
const deployPath    = path.join(activationDir, 't073-worker-deploy-result.latest.json');
const workerProbePath = path.join(activationDir, 't073-worker-probe-result.latest.json');

const targetPath1 = path.join(activationDir, 'private-runtime-operational-status.latest.json');
const targetPath2 = path.join(ROOT, 'tools', 'review-console', 'data', 'private-runtime-operational-status.json');

function readJson(p) {
  try {
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {}
  return null;
}

const applyRes  = readJson(applyPath);
const probeRes  = readJson(probePath);
const writeRes  = readJson(writePath);
const deployRes = readJson(deployPath);
const workerProbeRes = readJson(workerProbePath);

// Helper to deduce status labels: 'live', 'dry-run', 'blocked'
function getSupabaseApplyStatus(res) {
  if (!res) return 'dry-run';
  if (res.errors) return 'blocked';
  return res.remote_apply_executed ? 'live' : 'dry-run';
}

function getSupabaseProbeStatus(res) {
  if (!res) return 'dry-run';
  if (res.errors) return 'blocked';
  return res.live_probe_attempted ? 'live' : 'dry-run';
}

function getSnapshotWriteStatus(res) {
  if (!res) return 'dry-run';
  if (res.errors) return 'blocked';
  return res.remote_write_attempted ? 'live' : 'dry-run';
}

function getWorkerDeployStatus(res) {
  if (!res) return 'dry-run';
  if (res.errors) return 'blocked';
  return res.worker_deploy_attempted ? 'live' : 'dry-run';
}

function getWorkerProbeStatus(res) {
  if (!res) return 'dry-run';
  if (res.errors) return 'blocked';
  return res.live_probe_attempted ? 'live' : 'dry-run';
}

const statusPayload = {
  _schema: 'caesar-atlas/runtime/private-runtime-operational-status/v1',
  generated_at: new Date().toISOString(),
  task: 'T073',
  operational_components: {
    supabase_table_apply: {
      status: getSupabaseApplyStatus(applyRes),
      executed: applyRes ? applyRes.remote_apply_executed : false,
      approved: applyRes ? applyRes.live_apply_approved : false,
      errors: applyRes ? applyRes.errors : null
    },
    supabase_live_probe: {
      status: getSupabaseProbeStatus(probeRes),
      attempted: probeRes ? probeRes.live_probe_attempted : false,
      success: probeRes ? probeRes.success : false,
      table_exists: probeRes ? probeRes.table_exists : false,
      shape_compatible: probeRes ? probeRes.shape_compatible : false,
      errors: probeRes ? probeRes.errors : null
    },
    private_snapshot_write: {
      status: getSnapshotWriteStatus(writeRes),
      attempted: writeRes ? writeRes.remote_write_attempted : false,
      record_id: (writeRes && writeRes.record_written) ? writeRes.record_written.id : null,
      errors: writeRes ? writeRes.errors : null
    },
    worker_deploy: {
      status: getWorkerDeployStatus(deployRes),
      attempted: deployRes ? deployRes.worker_deploy_attempted : false,
      success: deployRes ? deployRes.success : false,
      errors: deployRes ? deployRes.errors : null
    },
    worker_probe: {
      status: getWorkerProbeStatus(workerProbeRes),
      attempted: workerProbeRes ? workerProbeRes.live_probe_attempted : false,
      success: workerProbeRes ? workerProbeRes.success : false,
      errors: workerProbeRes ? workerProbeRes.errors : null
    }
  },
  safety_constraints: {
    publication_still_blocked: true,
    public_publish_allowed: false,
    public_preview_allowed: false,
    public_record_creation_allowed: false,
    no_inc_0014: true,
    no_public_raw_text: true,
    no_public_raw_diff: true
  }
};

// Ensure directories exist
const dir1 = path.dirname(targetPath1);
if (!fs.existsSync(dir1)) fs.mkdirSync(dir1, { recursive: true });

const dir2 = path.dirname(targetPath2);
if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });

// Write both targets
fs.writeFileSync(targetPath1, JSON.stringify(statusPayload, null, 2) + '\n');
fs.writeFileSync(targetPath2, JSON.stringify(statusPayload, null, 2) + '\n');

process.stdout.write(`PASS: End-to-end private runtime operational status built successfully.\n`);
process.stdout.write(`  Target 1: ${path.relative(ROOT, targetPath1)}\n`);
process.stdout.write(`  Target 2: ${path.relative(ROOT, targetPath2)}\n`);
process.exit(0);
