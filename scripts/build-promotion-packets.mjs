import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DRAFTS_REAL_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const PACKETS_REAL_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');

function getNextPublicCaseId() {
  // Always suggests starting from INC-0013 onward without creating it
  const INCIDENTS_DIR = path.join(ROOT, 'data', 'incidents');
  let maxId = 12; // Current baseline is INC-0012
  if (fs.existsSync(INCIDENTS_DIR)) {
    const files = fs.readdirSync(INCIDENTS_DIR).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const m = f.match(/inc-(\d+)\.json/i);
      if (m) {
        const num = parseInt(m[1], 10);
        if (!isNaN(num) && num > maxId) maxId = num;
      }
    }
  }
  const next = maxId + 1;
  return {
    suggested_id: `INC-${String(next).padStart(4, '0')}`,
    suggested_filename: `inc-${String(next).padStart(4, '0')}.json`
  };
}

function getNextPacketId() {
  let maxId = 0;
  if (fs.existsSync(PACKETS_REAL_DIR)) {
    const files = fs.readdirSync(PACKETS_REAL_DIR).filter(f => f.endsWith('.json'));
    for (const f of files) {
      try {
        const p = JSON.parse(fs.readFileSync(path.join(PACKETS_REAL_DIR, f), 'utf8'));
        if (p.packet_id && p.packet_id.startsWith('PKT-')) {
          const num = parseInt(p.packet_id.replace('PKT-', ''), 10);
          if (!isNaN(num) && num > maxId) maxId = num;
        }
      } catch (e) { /* skip */ }
    }
  }
  return `PKT-${String(maxId + 1).padStart(4, '0')}`;
}

function buildPacketFromDraft(draft, packetId) {
  const { suggested_id, suggested_filename } = getNextPublicCaseId();

  const missingInfo = [];
  if (!draft.clean_room_summary || draft.clean_room_summary.length < 100) {
    missingInfo.push('Clean-room summary requires expansion by a Caesar curator before publication.');
  }
  if (!draft.required_evidence || draft.required_evidence.length < 2) {
    missingInfo.push('Additional evidence citations required.');
  }
  if ((draft.source_urls || []).length < 1) {
    missingInfo.push('At least one verified source URL is required.');
  }
  missingInfo.push('Independent curator review of proposed_case_title for neutrality and accuracy.');
  missingInfo.push('Legal domain classification confirmation by a qualified reviewer.');
  missingInfo.push('Control Tower sign-off on publication timing and risk posture.');

  const packet = {
    packet_id: packetId,
    draft_id: draft.draft_id,
    candidate_ids: draft.candidate_ids || [],
    source_urls: draft.source_urls || [],
    source_tier: draft.source_risk_level || 'green',
    quality_class: draft.quality_class || 'unclassified',
    quality_score: draft.quality_score ?? null,
    promotion_blockers: draft.promotion_blockers || [],
    required_reviews: [
      'curator_risk_review',
      'clean_room_wording_audit',
      'legal_domain_classification_review',
      'control_tower_publication_approval'
    ],
    missing_information: missingInfo,
    suggested_public_case_id: suggested_id,
    suggested_public_filename: suggested_filename,
    promotion_allowed: false,
    reason_not_promoted: 'This draft has not completed the required review gates. Control Tower approval, curator review, and clean-room wording audit are all mandatory prerequisites before any public incident record may be created.',
    checklist: {
      curator_review_complete: false,
      clean_room_wording_approved: false,
      legal_domain_confirmed: false,
      control_tower_approved: false,
      publication_approved: false
    },
    safety_declarations: {
      not_approved: true,
      not_public: true,
      control_tower_approval_required: true,
      curator_review_required: true,
      clean_room_wording_review_required: true,
      local_only: true,
      auto_publish: false
    },
    generated_at: new Date().toISOString()
  };

  return packet;
}

function build() {
  console.log('=== Building Promotion Packets from Real Drafts ===');

  if (!fs.existsSync(DRAFTS_REAL_DIR)) {
    console.error('data/drafts/real/ does not exist. Run build-real-case-drafts.mjs first.');
    process.exit(1);
  }

  const draftFiles = fs.readdirSync(DRAFTS_REAL_DIR).filter(f => f.endsWith('.json'));
  if (draftFiles.length === 0) {
    console.warn('No draft files found in data/drafts/real/. Nothing to generate packets for.');
    process.exit(0);
  }

  if (!fs.existsSync(PACKETS_REAL_DIR)) {
    fs.mkdirSync(PACKETS_REAL_DIR, { recursive: true });
  }

  // Load existing packets to avoid re-generating
  const existingDraftIds = new Set();
  const existingFiles = fs.readdirSync(PACKETS_REAL_DIR).filter(f => f.endsWith('.json'));
  for (const f of existingFiles) {
    try {
      const p = JSON.parse(fs.readFileSync(path.join(PACKETS_REAL_DIR, f), 'utf8'));
      if (p.draft_id) existingDraftIds.add(p.draft_id);
    } catch (e) { /* skip */ }
  }

  const BLOCKED_QUALITY_CLASSES = ['generic_page', 'low_relevance', 'event_or_webinar', 'job_or_procurement'];

  let created = 0;
  let skipped = 0;
  let blocked = 0;

  for (const file of draftFiles) {
    let draft;
    try {
      draft = JSON.parse(fs.readFileSync(path.join(DRAFTS_REAL_DIR, file), 'utf8'));
    } catch (e) {
      console.error(`Failed to parse draft ${file}: ${e.message}`);
      continue;
    }

    if (existingDraftIds.has(draft.draft_id)) {
      console.log(`Skipping ${draft.draft_id} — packet already exists.`);
      skipped++;
      continue;
    }

    // Quality gate: refuse packets for blocked quality classes
    if (draft.quality_class && BLOCKED_QUALITY_CLASSES.includes(draft.quality_class)) {
      console.log(`\x1b[31m[Blocked]\x1b[0m ${draft.draft_id} [${draft.quality_class}] — no promotion packet created.`);
      blocked++;
      existingDraftIds.add(draft.draft_id);
      continue;
    }

    // Also refuse if promotion_blockers exist
    if (draft.promotion_blockers && draft.promotion_blockers.length > 0) {
      console.log(`\x1b[31m[Blocked]\x1b[0m ${draft.draft_id} — has promotion blockers: ${draft.promotion_blockers[0]}`);
      blocked++;
      existingDraftIds.add(draft.draft_id);
      continue;
    }

    const packetId = getNextPacketId();
    const packet = buildPacketFromDraft(draft, packetId);

    const packetPath = path.join(PACKETS_REAL_DIR, `${packetId}.json`);
    fs.writeFileSync(packetPath, JSON.stringify(packet, null, 2), 'utf8');
    console.log(`\x1b[32m[Packet Created]\x1b[0m ${packetId} <- ${draft.draft_id} -> ${packetPath}`);

    existingDraftIds.add(draft.draft_id);
    created++;
  }

  console.log('\n==========================================');
  console.log('    Caesar Promotion Packet Build Report  ');
  console.log('==========================================');
  console.log(`Drafts processed:          ${draftFiles.length}`);
  console.log(`Packets created:           ${created}`);
  console.log(`Packets skipped (exists):  ${skipped}`);
  console.log(`Blocked (quality gate):    ${blocked}`);
  console.log(`Output dir:                ${PACKETS_REAL_DIR}`);
  console.log('NOTE: promotion_allowed is false on ALL packets.');
  console.log('NOTE: Suggested IDs are SUGGESTIONS only — no public records created.');
  console.log('==========================================\n');
}

build();
