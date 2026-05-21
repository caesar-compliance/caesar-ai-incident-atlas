// export-hosted-watch-run-payloads.mjs (T060)
// Exports sanitized Supabase-ready payloads for watch run metadata only.
// Does NOT push to Supabase. Does NOT contact any remote service.
// Does NOT include raw fetched content, candidates, drafts, or packets.
// Outputs:
//   data/ops/supabase/atlas-watch-run.manual-latest.json
//   data/ops/supabase/atlas-watch-run-queue.manual-latest.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const ENVELOPE_PATH = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-run-latest.json');
const QUEUE_PATH    = path.join(ROOT, 'data', 'ops', 'watch-runs', 'manual-queue-latest.json');
const TARGETS_PATH  = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
const OUT_DIR       = path.join(ROOT, 'data', 'ops', 'supabase');

const RUN_OUT_PATH   = path.join(OUT_DIR, 'atlas-watch-run.manual-latest.json');
const QUEUE_OUT_PATH = path.join(OUT_DIR, 'atlas-watch-run-queue.manual-latest.json');

function log(msg) { process.stdout.write(msg + '\n'); }

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

// ── Load inputs ────────────────────────────────────────────────────────────────
const envelope = readJson(ENVELOPE_PATH);
if (!envelope) {
  log('ERROR: manual-run-latest.json not found — run build-manual-watch-run-envelope.mjs first');
  process.exit(1);
}

const queue = readJson(QUEUE_PATH);
if (!queue) {
  log('ERROR: manual-queue-latest.json not found — run build-manual-watch-run-queue.mjs first');
  process.exit(1);
}

const targets = readJson(TARGETS_PATH) || [];

// ── Validate safety before export ─────────────────────────────────────────────
if (envelope.remote_write_attempted !== false) {
  log('ERROR: envelope remote_write_attempted is not false — refusing to export');
  process.exit(1);
}
if (envelope.cron_triggered !== false) {
  log('ERROR: envelope cron_triggered is not false — refusing to export');
  process.exit(1);
}
if (envelope.public_publish_count !== 0) {
  log('ERROR: envelope public_publish_count is not 0 — refusing to export');
  process.exit(1);
}

const now = new Date().toISOString();

// ── atlas_watch_runs payload ───────────────────────────────────────────────────
// Maps to atlas_watch_runs Supabase table. Metadata only. No candidate details.
const watchRunPayload = {
  _schema:                   'caesar-atlas/supabase-payload/atlas-watch-run/manual/v1',
  generated_at:              now,
  mode:                      'dry_run_export',
  remote_write_attempted:    false,
  cron_triggered:            false,
  note:                      'Sanitized payload for atlas_watch_runs table. No remote write performed.',
  run: {
    run_id:                  envelope.run_id,
    created_at:              envelope.created_at,
    mode:                    envelope.mode,
    status:                  envelope.status,
    source_scope:            envelope.source_scope,
    queue_count:             envelope.queue_count,
    enabled_source_count:    envelope.enabled_source_count,
    blocked_source_count:    envelope.blocked_source_count,
    candidate_count:         envelope.candidate_count,
    draft_count:             envelope.draft_count,
    promotion_packet_count:  envelope.promotion_packet_count,
    public_publish_count:    envelope.public_publish_count,
    remote_write_attempted:  envelope.remote_write_attempted,
    cron_triggered:          envelope.cron_triggered,
    public_site_mutated:     envelope.public_site_mutated,
    allowed_source_risk_tiers: envelope.allowed_source_risk_tiers,
    blocked_source_risk_tiers: envelope.blocked_source_risk_tiers,
    safety_flags:            envelope.safety_flags,
  },
};

// ── atlas_sources payload ──────────────────────────────────────────────────────
// Maps to atlas_sources table. Safe metadata only. No fetched content.
const enabledSourceIds = (queue.items || [])
  .filter(i => i.enabled_for_manual_run)
  .map(i => i.source_id);

const sourcePayloads = targets
  .filter(t => enabledSourceIds.includes(t.source_id))
  .map(t => ({
    source_id:    t.source_id,
    label:        t.display_name || t.source_id,
    risk_tier:    t.source_tier || 'green',
    adapter_name: t.adapter || null,
    jurisdiction: t.jurisdiction || null,
    enabled:      true,
  }));

const queuePayload = {
  _schema:                   'caesar-atlas/supabase-payload/atlas-watch-run-queue/manual/v1',
  generated_at:              now,
  mode:                      'dry_run_export',
  remote_write_attempted:    false,
  cron_triggered:            false,
  note:                      'Sanitized queue snapshot for atlas_sources table. No remote write performed.',
  run_id:                    envelope.run_id,
  queue_count:               queue.queue_count,
  enabled_count:             queue.enabled_count,
  blocked_count:             queue.blocked_count,
  allowed_source_risk_tiers: queue.allowed_source_risk_tiers,
  blocked_source_risk_tiers: queue.blocked_source_risk_tiers,
  sources:                   sourcePayloads,
};

// ── Write outputs ──────────────────────────────────────────────────────────────
writeJson(RUN_OUT_PATH,   watchRunPayload);
log('  atlas-watch-run.manual-latest.json');

writeJson(QUEUE_OUT_PATH, queuePayload);
log('  atlas-watch-run-queue.manual-latest.json');

log('\nexport-hosted-watch-run-payloads: OK');
log('  Output: data/ops/supabase/');
log('  mode: dry_run_export');
log('  run_id: '                  + envelope.run_id);
log('  remote_write_attempted: '  + watchRunPayload.remote_write_attempted);
log('  cron_triggered: '          + watchRunPayload.cron_triggered);
log('  enabled_source_count: '    + queue.enabled_count);
log('  No raw HTML. No candidates. No drafts. No secrets.');
