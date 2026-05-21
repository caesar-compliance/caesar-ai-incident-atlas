import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');

const draftMap = {};
const draftFiles = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.json') && f !== '.gitkeep');
for (const f of draftFiles) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(DRAFTS_DIR, f), 'utf8'));
    if (d.draft_id) draftMap[d.draft_id] = d;
  } catch(e) {}
}

const packetFiles = fs.readdirSync(PACKETS_DIR).filter(f => f.endsWith('.json') && f !== '.gitkeep');
let updated = 0;

for (const f of packetFiles) {
  const fp = path.join(PACKETS_DIR, f);
  const pkt = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (pkt.quality_class !== undefined) {
    console.log(`${f}: already has quality_class=${pkt.quality_class}`);
    continue;
  }
  const draft = draftMap[pkt.draft_id];
  if (!draft) { console.log(`${f}: draft ${pkt.draft_id} not found`); continue; }
  pkt.quality_class = draft.quality_class || 'unclassified';
  pkt.quality_score = draft.quality_score ?? null;
  pkt.promotion_blockers = draft.promotion_blockers || [];
  fs.writeFileSync(fp, JSON.stringify(pkt, null, 2), 'utf8');
  console.log(`Updated ${f}: ${pkt.quality_class} score=${pkt.quality_score} blockers=${pkt.promotion_blockers.length}`);
  updated++;
}

console.log(`\nBackfill complete. ${updated} packet(s) updated.`);
