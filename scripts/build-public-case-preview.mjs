import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const VERIFICATIONS_DIR = path.join(ROOT, 'data', 'source-verifications', 'real');
const PREVIEWS_DIR = path.join(ROOT, 'data', 'publication-previews', 'real');

function logInfo(msg) {
  console.log(`\x1b[36m[PREVIEW]\x1b[0m ${msg}`);
}

function logError(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
}

function logSuccess(msg) {
  console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[WARNING]\x1b[0m ${msg}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadPacket(packetId) {
  const packetPath = path.join(PACKETS_DIR, `${packetId}.json`);
  if (!fs.existsSync(packetPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(packetPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse packet ${packetId}: ${e.message}`);
    return null;
  }
}

function loadDraft(draftId) {
  const draftPath = path.join(DRAFTS_DIR, `${draftId}.json`);
  if (!fs.existsSync(draftPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(draftPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse draft ${draftId}: ${e.message}`);
    return null;
  }
}

function loadSourceVerification(packetId) {
  const verificationPath = path.join(VERIFICATIONS_DIR, `${packetId}-source-verification.json`);
  if (!fs.existsSync(verificationPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(verificationPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse source verification ${packetId}: ${e.message}`);
    return null;
  }
}

function buildCleanRoomTitle(draft) {
  // Remove [DRAFT] prefix and clean up title for publication
  let title = draft.proposed_case_title || 'Untitled Case';
  
  // Remove draft marker
  title = title.replace(/^\[DRAFT\]\s*/i, '');
  
  // Ensure neutral, factual wording
  if (title.includes('European Data Protection Board (EDPB)')) {
    // Keep the official source reference
    title = title.replace(/\s*—\s*European Data Protection Board.*$/i, '');
    title = `${title} — European Data Protection Board (EDPB)`;
  }
  
  return title.trim();
}

function buildCleanRoomSummary(draft, verification) {
  // Build a clean-room summary based only on metadata
  const authority = draft.source_authorities?.[0] || 'European authorities';
  const topic = draft.legal_domain || 'AI governance';
  
  let summary = `${authority} has published material relating to ${topic.replace(/_/g, ' ')}. `;
  
  if (verification && verification.verification_status === 'verified') {
    summary += 'Source verification confirms official authority and accessibility. ';
  }
  
  summary += 'This record reflects metadata detected during regulatory monitoring. ';
  summary += 'Organisations should review the original source material for detailed guidance. ';
  summary += 'This is not legal advice.';
  
  return summary;
}

function buildPublicCasePreview(draft, packet, verification) {
  const caseId = packet.suggested_public_case_id || 'INC-0013';
  const cleanTitle = buildCleanRoomTitle(draft);
  const cleanSummary = buildCleanRoomSummary(draft, verification);

  const preview = {
    // Core incident fields (schema compliant)
    incident_id: caseId,
    title: cleanTitle,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    date_note: 'Publication-ready preview. Date requires final verification from source material.',
    sources: draft.source_urls?.map((url, idx) => ({
      url: url,
      source_type: draft.case_type === 'enforcement' ? 'regulator_report' : 'public_database_pointer',
      accessed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: draft.source_authorities?.[0] ? `${draft.source_authorities[0]} reference` : `Source ${idx + 1}`
    })) || [],
    summary: cleanSummary,
    failure_modes: draft.failure_mode || ['FM-GOVERNANCE-GAP'],
    severity: 'medium',
    confidence: 'medium',
    controls: draft.missing_controls || ['CTL-GOVERNANCE-REVIEW'],
    evidence_required: draft.required_evidence || ['Evidence of compliance review process'],
    lessons: [draft.training_lesson || 'Governance lesson pending final review'],
    
    // Optional fields
    sector: [draft.commercial_domain || 'cross-sector AI governance'],
    ai_system_context: `AI governance case from ${draft.jurisdiction || 'unknown'} jurisdiction`,
    harms: ['Potential regulatory non-compliance', 'Operational risk from guidance gap'],
    affected_stakeholders: ['AI system operators', 'Compliance officers', 'Legal teams'],
    impact: draft.business_risk || 'Business impact assessment pending.',
    
    // Publication readiness flags
    dry_run: true,
    public: false,
    not_approved: true,
    source_text_copied: false,
    control_tower_approval_required: true,
    promotion_packet_id: packet.packet_id,
    source_verification_id: verification ? `${packet.packet_id}-source-verification` : null,
    
    // Metadata
    _preview_metadata: {
      from_draft: draft.draft_id,
      from_packet: packet.packet_id,
      generated_at: new Date().toISOString(),
      clean_room_wording: true,
      ready_for_control_tower_review: true,
      approval_required: 'Control Tower explicit approval needed before publication'
    }
  };

  return preview;
}

async function main() {
  const packetId = process.argv[2] || 'PKT-0006';
  
  console.log(`=== Building Publication Preview for ${packetId} ===\n`);

  // Load packet and draft
  const packet = loadPacket(packetId);
  if (!packet) {
    logError(`Packet ${packetId} not found`);
    process.exit(1);
  }

  const draft = loadDraft(packet.draft_id);
  if (!draft) {
    logError(`Draft ${packet.draft_id} not found`);
    process.exit(1);
  }

  // Load source verification (required for publication preview)
  const verification = loadSourceVerification(packetId);
  if (!verification) {
    logError(`Source verification not found for ${packetId}. Run verify-promotion-source.mjs first.`);
    process.exit(1);
  }

  if (verification.verification_status === 'failed') {
    logError(`Source verification failed for ${packetId}. Cannot build publication preview.`);
    process.exit(1);
  }

  logInfo(`Loaded packet ${packetId} -> draft ${packet.draft_id}`);
  logInfo(`Source verification status: ${verification.verification_status}`);

  // Build publication preview
  logInfo('Building publication-ready preview...');
  const preview = buildPublicCasePreview(draft, packet, verification);

  // Write preview file
  ensureDir(PREVIEWS_DIR);
  const previewFilename = `${packet.suggested_public_case_id?.toLowerCase() || 'inc-0013'}-preview.json`;
  const previewPath = path.join(PREVIEWS_DIR, previewFilename);
  
  fs.writeFileSync(previewPath, JSON.stringify(preview, null, 2), 'utf8');

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  PREVIEW SUMMARY');
  console.log(`${'='.repeat(60)}`);
  console.log(`Packet ID: ${packetId}`);
  console.log(`Draft ID: ${packet.draft_id}`);
  console.log(`Preview case ID: ${preview.incident_id}`);
  console.log(`Title: ${preview.title}`);
  console.log(`Source verification: ${verification.verification_status}`);
  console.log(`Clean-room wording: ${preview._preview_metadata.clean_room_wording ? 'Yes' : 'No'}`);
  console.log(`Control Tower approval required: ${preview.control_tower_approval_required ? 'Yes' : 'No'}`);
  console.log(`Source text copied: ${preview.source_text_copied ? 'Yes' : 'No'}`);
  console.log(`\nPreview written: ${previewPath}`);
  console.log(`\nNext: Review preview and run validate-public-case-preview.mjs`);
  console.log(`${'='.repeat(60)}\n`);

  logSuccess(`Publication preview created: ${previewFilename}`);
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
