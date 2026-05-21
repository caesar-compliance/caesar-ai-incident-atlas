// apply-private-promotion-signoff-decision.mjs (T068)
// Bounded local-only patch for private promotion signoff review fields.
// Must not enable publication, real packets, previews, or public records.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SIGNOFF_LATEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-latest.json');
const SIGNOFF_MANIFEST_PATH = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'private-promotion-signoff-manifest.json');

function log(msg) {
  process.stdout.write(`[Signoff Patch] ${msg}\n`);
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

const args = process.argv.slice(2);
let signoffId = null;
let field = null;
let status = null;
let reason = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--signoff-id' && args[i + 1]) { signoffId = args[i + 1]; i++; }
  else if (args[i] === '--field' && args[i + 1]) { field = args[i + 1]; i++; }
  else if (args[i] === '--status' && args[i + 1]) { status = args[i + 1]; i++; }
  else if (args[i] === '--reason' && args[i + 1]) { reason = args[i + 1]; i++; }
}

const ALLOWED_FIELDS = [
  'legal_review_status',
  'source_quotation_review_status',
  'public_narrative_review_status',
  'publication_risk_review_status',
  'control_tower_publication_approval_status'
];
const ALLOWED_STATUSES = ['pending', 'blocked', 'passed'];

if (!signoffId || !field || !status || !reason) {
  log('Usage: node scripts/apply-private-promotion-signoff-decision.mjs --signoff-id <id> --field <field> --status <pending|blocked|passed> --reason "<short reason>"');
  process.exit(1);
}

if (!ALLOWED_FIELDS.includes(field)) {
  log(`ERROR: Unsupported field "${field}". Allowed: ${ALLOWED_FIELDS.join(', ')}`);
  process.exit(1);
}

if (!ALLOWED_STATUSES.includes(status)) {
  log(`ERROR: Unsupported status "${status}". Allowed: ${ALLOWED_STATUSES.join(', ')}`);
  process.exit(1);
}

if (reason.length > 250) {
  log('ERROR: Reason must be short Caesar-native text (max 250 chars).');
  process.exit(1);
}

const HTML_PATTERN = /<(!DOCTYPE )?html|<[a-z][\s\S]*>/i;
if (HTML_PATTERN.test(reason)) {
  log('ERROR: Reason must not contain raw HTML/body structures.');
  process.exit(1);
}

async function run() {
  const signoff = readJson(SIGNOFF_LATEST_PATH);
  if (!signoff) {
    log('ERROR: private-promotion-signoff-latest.json not found. Run build-private-promotion-signoff.mjs first.');
    process.exit(1);
  }

  if (signoff.signoff_id !== signoffId) {
    log(`ERROR: signoff_id mismatch. Expected ${signoff.signoff_id}, got ${signoffId}`);
    process.exit(1);
  }

  signoff[field] = status;
  signoff.signoff_notes = `${signoff.signoff_notes || ''} | ${field}=${status}: ${reason}`.slice(0, 500);
  signoff.updated_at = new Date().toISOString();
  signoff.reviewer_mode = 'interactive_patch';

  const allPassed = ALLOWED_FIELDS.every(f => signoff[f] === 'passed');
  if (allPassed) {
    log('ERROR: T068 validation requires not all review fields passed. Cannot set all fields to passed.');
    process.exit(1);
  }

  // Hard safety: never allow publication paths
  signoff.public_publish_allowed = false;
  signoff.real_promotion_packet_allowed = false;
  signoff.public_preview_allowed = false;
  signoff.public_record_creation_allowed = false;
  signoff.remote_write_allowed = false;
  signoff.raw_text_storage_allowed = false;
  signoff.html_storage_allowed = false;

  if (status === 'passed') {
    const blockerKey = field.replace('_status', '').replace(/_/g, ' ');
    signoff.unresolved_blockers = (signoff.unresolved_blockers || []).filter(
      b => !b.toLowerCase().includes(blockerKey.split(' ')[0])
    );
    if (!signoff.resolved_checklist_items.includes(field)) {
      signoff.resolved_checklist_items.push(field);
    }
  }

  const pendingCount = ALLOWED_FIELDS.filter(f => signoff[f] === 'pending').length;
  const blockedCount = ALLOWED_FIELDS.filter(f => signoff[f] === 'blocked').length;
  if (blockedCount > 0 || (signoff.unresolved_blockers || []).length > 0) {
    signoff.signoff_status = 'private_review_blocked';
  } else if (pendingCount > 0) {
    signoff.signoff_status = 'private_review_pending';
  }

  signoff.next_allowed_step = 'complete_private_review_checklist_before_T069';

  writeJson(SIGNOFF_LATEST_PATH, signoff);

  const runDir = path.join(ROOT, 'data', 'reviews', 'private-promotion-signoffs', 'runs', signoff.source_run_id);
  if (fs.existsSync(runDir)) {
    writeJson(path.join(runDir, 'private-promotion-signoff.json'), signoff);
  }

  const manifest = readJson(SIGNOFF_MANIFEST_PATH) || {
    _schema: 'caesar-atlas/reviews/private-promotion-signoff-manifest/v1',
    source_run_id: signoff.source_run_id,
    signoff_count: 1
  };
  manifest.generated_at = new Date().toISOString();
  manifest.unresolved_blocker_count = (signoff.unresolved_blockers || []).length;
  manifest.signoff_status_summary = signoff.signoff_status;
  manifest.public_publish_allowed_count = 0;
  writeJson(SIGNOFF_MANIFEST_PATH, manifest);

  log(`Updated ${field} = ${status} for signoff ${signoffId}`);
  log(`signoff_status: ${signoff.signoff_status}`);
  log(`unresolved_blocker_count: ${manifest.unresolved_blocker_count}`);
  log('Safety: all publication permission flags remain false');
}

run().catch(err => {
  log(`Fatal error: ${err.message}`);
  process.exit(1);
});
