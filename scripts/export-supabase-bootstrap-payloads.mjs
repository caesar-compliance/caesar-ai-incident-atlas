// export-supabase-bootstrap-payloads.mjs (T057)
// Generates sanitized bootstrap payloads for Supabase hosted sync.
// Metadata only. No raw HTML, no drafts, no packets, no previews, no secrets.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const OUT_DIR    = path.join(ROOT, 'data', 'ops', 'supabase');

const INCIDENT_INDEX_PATH  = path.join(ROOT, 'data', 'incident-index.json');
const SOURCES_PATH         = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
const WATCH_SUMMARY_PATH   = path.join(ROOT, 'data', 'watch', 'runs', 'latest-watch-summary.json');

const EXPECTED_RECORD_COUNT = 13;
const EXPECTED_LATEST_ID    = 'INC-0013';

// Safe public record fields only
const PUBLIC_RECORD_FIELDS = new Set([
  'incident_id', 'title', 'date', 'sector', 'severity',
  'confidence', 'failure_modes', 'record_type',
]);

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return null; }
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function writeJson(p, data) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

function log(msg) { process.stdout.write(msg + '\n'); }

// ── Read source data ──────────────────────────────────────────────────────────
const index = readJson(INCIDENT_INDEX_PATH);
if (!index) { log('ERROR: cannot read incident-index.json'); process.exit(1); }

const sources  = readJson(SOURCES_PATH) || [];
const watchRun = readJson(WATCH_SUMMARY_PATH);

const now = new Date().toISOString();

// ── Build atlas-sources.bootstrap.json ───────────────────────────────────────
// Only safe source registry metadata — no fetched content, no raw HTML
const sourcesPayload = sources.map(s => ({
  source_id:    s.source_id,
  label:        s.display_name,
  url:          s.url,
  adapter_name: s.adapter,
  risk_tier:    s.source_tier || 'green',
  enabled:      s.enabled_for_manual_watch !== false,
  jurisdiction: s.jurisdiction || null,
}));

writeJson(path.join(OUT_DIR, 'atlas-sources.bootstrap.json'), {
  _schema:      'atlas-bootstrap/sources/v1',
  generated_at: now,
  mode:         'dry_run',
  count:        sourcesPayload.length,
  records:      sourcesPayload,
});
log('  atlas-sources.bootstrap.json — ' + sourcesPayload.length + ' sources');

// ── Build atlas-public-records.bootstrap.json ─────────────────────────────────
// Only the safe public fields from the public incident index
const publicRecords = (index.incidents || []).map(inc => {
  const safe = {};
  PUBLIC_RECORD_FIELDS.forEach(f => { if (inc[f] !== undefined) safe[f] = inc[f]; });
  return safe;
});

if (publicRecords.length !== EXPECTED_RECORD_COUNT) {
  log('ERROR: expected ' + EXPECTED_RECORD_COUNT + ' records, got ' + publicRecords.length);
  process.exit(1);
}
const sortedIds   = publicRecords.map(r => r.incident_id).sort();
const latestId    = sortedIds[sortedIds.length - 1];
if (latestId !== EXPECTED_LATEST_ID) {
  log('ERROR: expected latest record ' + EXPECTED_LATEST_ID + ', got ' + latestId);
  process.exit(1);
}

writeJson(path.join(OUT_DIR, 'atlas-public-records.bootstrap.json'), {
  _schema:                  'atlas-bootstrap/public-records/v1',
  generated_at:             now,
  mode:                     'dry_run',
  public_record_count:      publicRecords.length,
  latest_public_record_id:  latestId,
  records:                  publicRecords,
});
log('  atlas-public-records.bootstrap.json — ' + publicRecords.length + ' records');

// ── Build atlas-latest-watch-run.bootstrap.json ───────────────────────────────
// Only counts/status/timestamps — no candidate details
const watchRunPayload = watchRun
  ? {
      run_timestamp:       watchRun.run_timestamp,
      mode:                'local',
      sources_ok:          watchRun.sources_ok          || 0,
      sources_failed:      watchRun.sources_failed       || 0,
      sources_skipped:     watchRun.sources_skipped      || 0,
      detected_candidates: watchRun.detected_candidates_count || 0,
      promotion_eligible:  watchRun.promotion_eligible_count  || 0,
      errors_count:        watchRun.errors_count         || 0,
    }
  : {
      run_timestamp:       null,
      mode:                'local',
      note:                'No watch run data available',
    };

writeJson(path.join(OUT_DIR, 'atlas-latest-watch-run.bootstrap.json'), {
  _schema:      'atlas-bootstrap/watch-run/v1',
  generated_at: now,
  mode:         'dry_run',
  run:          watchRunPayload,
});
log('  atlas-latest-watch-run.bootstrap.json');

// ── Build bootstrap-manifest.json ─────────────────────────────────────────────
const manifest = {
  _schema:                  'atlas-bootstrap/manifest/v1',
  generated_at:             now,
  mode:                     'dry_run',
  public_record_count:      publicRecords.length,
  latest_public_record_id:  latestId,
  source_count:             sourcesPayload.length,
  contains_secrets:         false,
  contains_drafts:          false,
  contains_raw_html:        false,
  safe_for_hosted_sync:     true,
  payloads: [
    'atlas-sources.bootstrap.json',
    'atlas-public-records.bootstrap.json',
    'atlas-latest-watch-run.bootstrap.json',
  ],
};

writeJson(path.join(OUT_DIR, 'bootstrap-manifest.json'), manifest);
log('  bootstrap-manifest.json');

log('\nexport-supabase-bootstrap-payloads: OK');
log('  Output: data/ops/supabase/');
log('  mode: dry_run');
log('  public_record_count: ' + publicRecords.length);
log('  source_count: ' + sourcesPayload.length);
log('  safe_for_hosted_sync: true');
