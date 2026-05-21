import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const REVIEWS_DIR = path.join(ROOT, 'data', 'reviews', 'real');
const PREVIEWS_DIR = path.join(ROOT, 'data', 'promotion-previews', 'real');
const VERIFICATIONS_DIR = path.join(ROOT, 'data', 'source-verifications', 'real');
const CONTROL_MAPS_DIR = path.join(ROOT, 'data', 'control-maps', 'real');
const INCIDENTS_DIR = path.join(ROOT, 'data', 'incidents');
const SITE_INCIDENTS_DIR = path.join(ROOT, 'site', 'data', 'incidents');
const INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const SITE_INDEX_PATH = path.join(ROOT, 'site', 'data', 'incident-index.json');

function logInfo(msg) {
  console.log(`\x1b[36m[PROMOTE]\x1b[0m ${msg}`);
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

function loadApprovedPromotions() {
  const approvalsPath = path.join(REVIEWS_DIR, 'approved-promotions.json');
  if (!fs.existsSync(approvalsPath)) {
    return { approvals: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(approvalsPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse approved-promotions.json: ${e.message}`);
    return { approvals: [] };
  }
}

function loadPacket(packetId) {
  const packetPath = path.join(PACKETS_DIR, `${packetId}.json`);
  if (!fs.existsSync(packetPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(packetPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadDraft(draftId) {
  const draftPath = path.join(DRAFTS_DIR, `${draftId}.json`);
  if (!fs.existsSync(draftPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(draftPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadRankedCandidates() {
  const rankedPath = path.join(REVIEWS_DIR, 'ranked-promotion-candidates.json');
  if (!fs.existsSync(rankedPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(rankedPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadSourceVerification(packetId) {
  const verificationPath = path.join(VERIFICATIONS_DIR, `${packetId}-source-verification.json`);
  if (!fs.existsSync(verificationPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(verificationPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadPublicPreview(packetId) {
  if (!fs.existsSync(PREVIEWS_DIR)) return null;
  const previewFiles = fs.readdirSync(PREVIEWS_DIR).filter(f => f.endsWith('.json'));
  for (const file of previewFiles) {
    const previewPath = path.join(PREVIEWS_DIR, file);
    try {
      const preview = JSON.parse(fs.readFileSync(previewPath, 'utf8'));
      if (preview.promotion_packet_id === packetId) {
        return preview;
      }
    } catch (e) {
      // Skip invalid files
    }
  }
  return null;
}

function loadControlMap(packetId) {
  const controlMapPath = path.join(CONTROL_MAPS_DIR, `${packetId}-control-map.json`);
  if (!fs.existsSync(controlMapPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(controlMapPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadReadinessReport(packetId) {
  const reportPath = path.join(REVIEWS_DIR, `${packetId}-readiness-report.json`);
  if (!fs.existsSync(reportPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const BLOCKED_QUALITY_CLASSES = [
  'generic_page', 'low_relevance', 'event_or_webinar', 'job_or_procurement',
  'blocked_generic_page', 'blocked_low_relevance', 'likely_policy_update',
];
const QUALITY_SCORE_THRESHOLD = 70;

function validateApproval(approval, packet, draft) {
  const errors = [];

  // Required fields check
  if (!approval.packet_id) errors.push('Missing packet_id');
  if (!approval.draft_id) errors.push('Missing draft_id');
  if (!approval.approved_by) errors.push('Missing approved_by');
  if (approval.approved_by !== 'Control Tower') {
    errors.push(`approved_by must be exactly 'Control Tower', got: ${approval.approved_by}`);
  }
  if (!approval.approval_date) errors.push('Missing approval_date');
  if (!approval.allowed_public_case_id) errors.push('Missing allowed_public_case_id');
  if (!approval.allowed_public_filename) errors.push('Missing allowed_public_filename');
  if (!approval.approval_scope) errors.push('Missing approval_scope');

  // Packet/draft match check
  if (approval.packet_id !== packet?.packet_id) {
    errors.push(`Approval packet_id ${approval.packet_id} does not match packet ${packet?.packet_id}`);
  }
  if (approval.draft_id !== draft?.draft_id) {
    errors.push(`Approval draft_id ${approval.draft_id} does not match draft ${draft?.draft_id}`);
  }

  // NEW: Source verification requirement
  const sourceVerification = loadSourceVerification(approval.packet_id);
  if (!sourceVerification) {
    errors.push(`Source verification missing: ${approval.packet_id}-source-verification.json`);
  } else if (sourceVerification.verification_status === 'failed') {
    errors.push(`Source verification failed for ${approval.packet_id}`);
  } else if (!['verified', 'partially_verified'].includes(sourceVerification.verification_status)) {
    errors.push(`Source verification status invalid: ${sourceVerification.verification_status}`);
  }

  // NEW: Public preview requirement
  const publicPreview = loadPublicPreview(approval.packet_id);
  if (!publicPreview) {
    errors.push(`Public preview missing for ${approval.packet_id}`);
  } else if (publicPreview.dry_run !== true || publicPreview.public !== false) {
    errors.push(`Public preview has invalid safety flags for ${approval.packet_id}`);
  }

  // NEW: Control map requirement
  const controlMap = loadControlMap(approval.packet_id);
  if (!controlMap) {
    errors.push(`Control map missing: ${approval.packet_id}-control-map.json`);
  }

  // NEW: Readiness report requirement
  const readinessReport = loadReadinessReport(approval.packet_id);
  if (!readinessReport) {
    errors.push(`Readiness report missing: ${approval.packet_id}-readiness-report.json`);
  } else if (readinessReport.ready_for_control_tower_approval !== true) {
    errors.push(`Readiness report indicates not ready for Control Tower approval`);
  }

  // Source tier check
  const sourceTier = packet?.source_tier || 'green';
  if (sourceTier === 'yellow' || sourceTier === 'red') {
    const override = approval.override_flags?.override_source_tier;
    if (!override) {
      errors.push(`${sourceTier.toUpperCase()} tier source requires explicit override_source_tier flag`);
    }
  }

  // Quality class gate — hard block
  const qualityClass = packet?.quality_class || draft?.quality_class || null;
  if (qualityClass && BLOCKED_QUALITY_CLASSES.includes(qualityClass)) {
    errors.push(`QUALITY GATE BLOCKED: quality_class="${qualityClass}" — generic/low-relevance/event/job pages cannot be promoted`);
  }

  // Quality score gate
  const qualityScore = packet?.quality_score ?? draft?.quality_score ?? null;
  if (qualityScore !== null && qualityScore < QUALITY_SCORE_THRESHOLD) {
    errors.push(`QUALITY SCORE TOO LOW: ${qualityScore} < ${QUALITY_SCORE_THRESHOLD} — promotion refused`);
  }

  // Promotion blockers
  const promotionBlockers = packet?.promotion_blockers || draft?.promotion_blockers || [];
  if (promotionBlockers.length > 0) {
    errors.push(`PROMOTION BLOCKERS PRESENT: ${promotionBlockers[0]}`);
  }

  // Copied text check
  if (draft?.source_text_copied === true) {
    errors.push('Draft has source_text_copied: true - promotion blocked (cannot override)');
  }

  // Existing public record check
  const publicPath = path.join(INCIDENTS_DIR, approval.allowed_public_filename);
  const sitePath = path.join(SITE_INCIDENTS_DIR, approval.allowed_public_filename);
  if (fs.existsSync(publicPath) || fs.existsSync(sitePath)) {
    errors.push(`Public record already exists: ${approval.allowed_public_filename}`);
  }

  return errors;
}

function buildPublicIncidentRecord(draft, packet, approval) {
  const caseId = approval.allowed_public_case_id;
  const cleanTitle = draft.proposed_case_title
    ?.replace(/^\[DRAFT\]\s*/i, '')
    ?.replace(/\s*—\s*Information Commissioner's Office.*$/i, '')
    ?.replace(/\s*—\s*European Data Protection Board.*$/i, '') || 'Untitled Case';

  const incident = {
    incident_id: caseId,
    title: cleanTitle,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    date_note: `Draft generated from ${draft.candidate_ids?.[0] || 'unknown candidate'}. Requires final date verification before permanent publication.`,
    sector: [draft.commercial_domain || 'cross-sector AI governance'],
    ai_system_context: `AI governance case from ${draft.jurisdiction || 'unknown'} jurisdiction`,
    summary: draft.clean_room_summary || draft.training_lesson || 'Summary pending final curation.',
    failure_modes: draft.failure_mode || ['FM-GOVERNANCE-GAP'],
    severity: 'medium',
    confidence: 'medium',
    controls: draft.missing_controls || ['CTL-GOVERNANCE-REVIEW'],
    evidence_required: draft.required_evidence || ['Evidence of compliance review process'],
    lessons: [draft.training_lesson || 'Governance lesson pending final review'],
    sources: draft.source_urls?.map((url, idx) => ({
      url: url,
      source_type: draft.case_type === 'enforcement' ? 'regulator_report' : 'public_database_pointer',
      accessed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: draft.source_authorities?.[0] ? `${draft.source_authorities[0]} reference` : `Source ${idx + 1}`
    })) || [],
    harms: ['Potential regulatory non-compliance', 'Operational risk from guidance gap'],
    affected_stakeholders: ['AI system operators', 'Compliance officers', 'Legal teams'],
    impact: draft.business_risk || 'Business impact assessment pending.',
    _promotion_metadata: {
      promoted_from_draft: draft.draft_id,
      promoted_from_packet: packet.packet_id,
      promoted_at: new Date().toISOString(),
      approved_by: approval.approved_by,
      approval_date: approval.approval_date,
      approval_scope: approval.approval_scope
    }
  };

  return incident;
}

function buildDryRunPreview(draft, packet, rank) {
  const suggestedId = packet.suggested_public_case_id || 'INC-0013';
  const cleanTitle = draft.proposed_case_title
    ?.replace(/^\[DRAFT\]\s*/i, '') || 'Untitled Case';

  const preview = {
    _dry_run_preview: true,
    _public: false,
    _not_approved: true,
    _warning: 'THIS IS A DRY-RUN PREVIEW ONLY. NOT A PUBLIC RECORD. NOT APPROVED FOR PUBLICATION.',
    incident_id: suggestedId,
    title: `[PREVIEW] ${cleanTitle}`,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    date_note: 'DRAFT PREVIEW: Date requires verification from actual source material',
    sector: [draft.commercial_domain || 'cross-sector AI governance'],
    ai_system_context: `DRAFT: AI governance case from ${draft.jurisdiction || 'unknown'} jurisdiction`,
    summary: `[DRAFT PREVIEW] ${draft.clean_room_summary || draft.training_lesson || 'Summary pending final curation.'}`,
    failure_modes: draft.failure_mode || ['FM-GOVERNANCE-GAP'],
    severity: 'medium',
    confidence: 'medium',
    controls: draft.missing_controls || ['CTL-GOVERNANCE-REVIEW'],
    evidence_required: draft.required_evidence || ['Evidence of compliance review process'],
    lessons: [`[DRAFT] ${draft.training_lesson || 'Governance lesson pending final review'}`],
    sources: draft.source_urls?.map((url, idx) => ({
      url: url,
      source_type: 'public_database_pointer',
      accessed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: `[DRAFT] ${draft.source_authorities?.[0] || 'Source'} reference`
    })) || [],
    harms: ['[DRAFT] Potential regulatory non-compliance'],
    affected_stakeholders: ['[DRAFT] AI system operators'],
    impact: `[DRAFT] ${draft.business_risk || 'Business impact assessment pending.'}`,
    _preview_metadata: {
      from_draft: draft.draft_id,
      from_packet: packet.packet_id,
      rank: rank,
      generated_at: new Date().toISOString(),
      promotion_blocked_reason: 'No explicit Control Tower approval in approved-promotions.json'
    }
  };

  return preview;
}

function updateIndex(newIncident) {
  // Load current index
  let index;
  try {
    index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  } catch (e) {
    logError(`Failed to load incident-index.json: ${e.message}`);
    return false;
  }

  // Check if already exists
  const exists = index.incidents?.some(i => i.incident_id === newIncident.incident_id);
  if (exists) {
    logWarning(`Incident ${newIncident.incident_id} already in index`);
    return false;
  }

  // Add to index
  index.incidents.push({
    incident_id: newIncident.incident_id,
    file: `../data/incidents/${newIncident.incident_id.toLowerCase()}.json`,
    title: newIncident.title,
    date: newIncident.date,
    sector: newIncident.sector,
    severity: newIncident.severity,
    confidence: newIncident.confidence,
    failure_modes: newIncident.failure_modes
  });

  // Sort by incident_id
  index.incidents.sort((a, b) => a.incident_id.localeCompare(b.incident_id));
  index.generated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Write index
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2), 'utf8');

  // Copy to site
  ensureDir(path.dirname(SITE_INDEX_PATH));
  fs.writeFileSync(SITE_INDEX_PATH, JSON.stringify(index, null, 2), 'utf8');

  return true;
}

function writePublicIncident(incident) {
  const filename = `${incident.incident_id.toLowerCase()}.json`;
  const dataPath = path.join(INCIDENTS_DIR, filename);
  const sitePath = path.join(SITE_INCIDENTS_DIR, filename);

  ensureDir(INCIDENTS_DIR);
  ensureDir(SITE_INCIDENTS_DIR);

  fs.writeFileSync(dataPath, JSON.stringify(incident, null, 2), 'utf8');
  fs.writeFileSync(sitePath, JSON.stringify(incident, null, 2), 'utf8');

  return { dataPath, sitePath };
}

function generateDryRunPreviews(rankedCandidates) {
  logInfo('Generating dry-run previews (no approvals found)...');

  ensureDir(PREVIEWS_DIR);

  // Clean old previews
  const existing = fs.readdirSync(PREVIEWS_DIR).filter(f => f.endsWith('.json'));
  for (const f of existing) {
    fs.unlinkSync(path.join(PREVIEWS_DIR, f));
  }

  // Filter to promotion-eligible candidates only
  const eligibleCandidates = rankedCandidates.filter(c => c.promotion_eligible === true);

  if (eligibleCandidates.length === 0) {
    logWarning('No promotion-eligible candidates found for dry-run preview.');
    // Write a no-candidate-ready report
    const noCandidateReport = {
      _dry_run_preview: true,
      _public: false,
      _not_approved: true,
      no_publication_candidate_ready: true,
      reason: 'All ranked candidates are blocked by quality gates (generic_page, low_relevance, event, job, or promotion_blockers). No dry-run preview generated.',
      blocked_candidates: rankedCandidates.map(c => ({
        packet_id: c.packet_id,
        draft_id: c.draft_id,
        quality_class: c.quality_class,
        quality_score: c.quality_score,
        promotion_eligible: c.promotion_eligible,
        risk_flags: (c.risk_flags || []).slice(0, 2),
      })),
      generated_at: new Date().toISOString(),
    };
    const reportPath = path.join(PREVIEWS_DIR, 'no-candidate-ready-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(noCandidateReport, null, 2), 'utf8');
    logWarning(`No-candidate-ready report written: ${reportPath}`);
    return [];
  }

  const previews = [];
  const top5Eligible = eligibleCandidates.slice(0, 5);

  for (const candidate of top5Eligible) {
    const packet = loadPacket(candidate.packet_id);
    const draft = loadDraft(candidate.draft_id);

    if (!packet || !draft) {
      logWarning(`Skipping ${candidate.packet_id} - missing packet or draft`);
      continue;
    }

    const preview = buildDryRunPreview(draft, packet, candidate.rank);
    const previewFilename = `preview-${packet.packet_id.toLowerCase()}-${packet.suggested_public_case_id?.toLowerCase() || 'unknown'}.json`;
    const previewPath = path.join(PREVIEWS_DIR, previewFilename);

    fs.writeFileSync(previewPath, JSON.stringify(preview, null, 2), 'utf8');
    previews.push({
      packet_id: candidate.packet_id,
      draft_id: candidate.draft_id,
      preview_path: previewPath,
      preview_incident_id: preview.incident_id
    });

    logSuccess(`Generated preview: ${previewFilename}`);
  }

  return previews;
}

async function main() {
  console.log('=== Caesar Promotion CLI ===\n');

  const approvalsData = loadApprovedPromotions();
  const approvals = approvalsData.approvals || [];

  // Check if any approvals exist
  if (approvals.length === 0) {
    logWarning('No approvals found in approved-promotions.json');
    logInfo('Mode: DRY-RUN ONLY (no public records will be created)');

    // Load ranked candidates and generate previews
    const rankedData = loadRankedCandidates();
    if (!rankedData || !rankedData.ranked_candidates?.length) {
      logError('No ranked candidates found. Run rank-promotion-candidates.mjs first.');
      process.exit(1);
    }

    const previews = generateDryRunPreviews(rankedData.ranked_candidates);

    console.log(`\n${'='.repeat(60)}`);
    console.log('  DRY-RUN SUMMARY');
    console.log(`${'='.repeat(60)}`);
    console.log(`Previews generated: ${previews.length}`);
    console.log(`Preview location: ${PREVIEWS_DIR}`);
    console.log('\nStatus: NO PUBLIC RECORDS CREATED');
    console.log('Action: Add approval to data/reviews/real/approved-promotions.json to promote');
    console.log(`${'='.repeat(60)}\n`);

    process.exit(0);
  }

  // Process approvals (one at a time for safety)
  logInfo(`Found ${approvals.length} approval(s)`);

  if (approvals.length > 1) {
    logError('Multiple approvals found. This script processes ONE approval per run for safety.');
    logInfo('Please ensure only ONE approval is in approved-promotions.json');
    process.exit(1);
  }

  const approval = approvals[0];
  logInfo(`Processing approval for packet: ${approval.packet_id}`);

  // Load packet and draft
  const packet = loadPacket(approval.packet_id);
  const draft = loadDraft(approval.draft_id);

  if (!packet) {
    logError(`Packet ${approval.packet_id} not found`);
    process.exit(1);
  }
  if (!draft) {
    logError(`Draft ${approval.draft_id} not found`);
    process.exit(1);
  }

  // Validate approval
  const validationErrors = validateApproval(approval, packet, draft);
  if (validationErrors.length > 0) {
    logError('Approval validation failed:');
    validationErrors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  logSuccess('Approval validation passed');

  // Build public incident record
  logInfo('Building public incident record...');
  const incident = buildPublicIncidentRecord(draft, packet, approval);

  // Safety check: ensure dry_run is not set
  if (incident._dry_run_preview || incident._not_approved) {
    logError('Safety check failed: record has dry_run flags');
    process.exit(1);
  }

  // Write public incident
  const { dataPath, sitePath } = writePublicIncident(incident);
  logSuccess(`Created public incident: ${dataPath}`);
  logSuccess(`Copied to site: ${sitePath}`);

  // Update index
  if (updateIndex(incident)) {
    logSuccess('Updated incident-index.json');
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  PROMOTION COMPLETE');
  console.log(`${'='.repeat(60)}`);
  console.log(`Incident ID: ${incident.incident_id}`);
  console.log(`Title: ${incident.title}`);
  console.log(`Source: ${draft.source_authorities?.[0] || 'Unknown'}`);
  console.log(`Approved by: ${approval.approved_by}`);
  console.log(`Approval date: ${approval.approval_date}`);
  console.log(`\nFiles created:`);
  console.log(`  ${dataPath}`);
  console.log(`  ${sitePath}`);
  console.log(`\nNEXT: Run validate-promotion-dry-run.mjs to confirm safety`);
  console.log(`${'='.repeat(60)}\n`);
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
