import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const CANDS_BASE = path.join(ROOT, 'data', 'watch', 'real-candidates');

function scanCandidates(dir, map = {}) {
  if (!fs.existsSync(dir)) return map;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fp = path.join(dir, item.name);
    if (item.isDirectory()) scanCandidates(fp, map);
    else if (item.isFile() && item.name.endsWith('.json')) {
      try {
        const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
        if (c.candidate_id) map[c.candidate_id] = c;
      } catch(e) {}
    }
  }
  return map;
}

const candMap = scanCandidates(CANDS_BASE);
const draftFiles = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.json') && f !== '.gitkeep');
let updated = 0;

for (const f of draftFiles) {
  const fp = path.join(DRAFTS_DIR, f);
  const draft = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (draft.quality_class !== undefined) {
    console.log(`${f}: already classified (${draft.quality_class})`);
    continue;
  }
  const cid = draft.candidate_ids && draft.candidate_ids[0];
  if (!cid) { console.log(`${f}: no candidate_id`); continue; }
  const cand = candMap[cid];
  if (!cand) { console.log(`${f}: candidate ${cid} not found`); continue; }
  draft.quality_class = cand.quality_class || 'unclassified';
  draft.quality_score = cand.quality_score ?? null;
  draft.promotion_blockers = cand.rejection_reasons || [];
  if (cand.promotion_eligible === false) {
    draft.publish_recommendation = 'blocked_low_quality';
  }
  fs.writeFileSync(fp, JSON.stringify(draft, null, 2), 'utf8');
  console.log(`Updated ${f}: ${draft.quality_class} score=${draft.quality_score} eligible=${cand.promotion_eligible}`);
  updated++;
}

console.log(`\nBackfill complete. ${updated} draft(s) updated.`);
