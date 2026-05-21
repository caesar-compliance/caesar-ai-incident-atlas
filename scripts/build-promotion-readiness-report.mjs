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
const CONTROL_MAPS_DIR = path.join(ROOT, 'data', 'control-maps', 'real');
const REVIEWS_DIR = path.join(ROOT, 'data', 'reviews', 'real');

function logInfo(msg) {
  console.log(`\x1b[36m[READINESS]\x1b[0m ${msg}`);
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

function loadPublicPreview(packetId) {
  const previewFiles = fs.readdirSync(PREVIEWS_DIR).filter(f => f.endsWith('.json'));
  for (const file of previewFiles) {
    const previewPath = path.join(PREVIEWS_DIR, file);
    try {
      const preview = JSON.parse(fs.readFileSync(previewPath, 'utf8'));
      if (preview.promotion_packet_id === packetId) {
        return { preview, path: file };
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
    logError(`Failed to parse control map ${packetId}: ${e.message}`);
    return null;
  }
}

function assessReadiness(packet, draft, verification, preview, controlMap) {
  const checks = {
    source_verification: false,
    preview_validation: false,
    control_map: false,
    quality_score: false,
    source_tier: false,
    no_blockers: false
  };

  const issues = [];
  const warnings = [];

  // Source verification check
  if (verification && verification.verification_status !== 'failed') {
    checks.source_verification = true;
  } else {
    issues.push('Source verification missing or failed');
  }

  // Preview validation check
  if (preview && preview.dry_run === true && preview.public === false) {
    checks.preview_validation = true;
  } else {
    issues.push('Publication preview missing or invalid');
  }

  // Control map check
  if (controlMap && controlMap.status === 'local_review_only') {
    checks.control_map = true;
  } else {
    issues.push('Control map missing or invalid');
  }

  // Quality score check
  const qualityScore = packet.quality_score || draft.quality_score || 0;
  if (qualityScore >= 70) {
    checks.quality_score = true;
  } else {
    issues.push(`Quality score too low: ${qualityScore} (minimum 70)`);
  }

  // Source tier check
  const sourceTier = packet.source_tier || 'green';
  if (sourceTier === 'green') {
    checks.source_tier = true;
  } else {
    warnings.push(`Source tier is ${sourceTier.toUpperCase()} - requires explicit override`);
  }

  // Promotion blockers check
  const blockers = packet.promotion_blockers || draft.promotion_blockers || [];
  if (blockers.length === 0) {
    checks.no_blockers = true;
  } else {
    issues.push(`Promotion blockers present: ${blockers.join(', ')}`);
  }

  // Overall readiness
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  const readyForControlTower = passedChecks === totalChecks && issues.length === 0;

  return {
    checks,
    passedChecks,
    totalChecks,
    readyForControlTower,
    issues,
    warnings
  };
}

function buildReadinessReport(packetId) {
  // Load all required artifacts
  const packet = loadPacket(packetId);
  const draft = loadDraft(packet?.draft_id);
  const verification = loadSourceVerification(packetId);
  const previewData = loadPublicPreview(packetId);
  const controlMap = loadControlMap(packetId);

  if (!packet || !draft) {
    logError(`Packet or draft not found for ${packetId}`);
    return null;
  }

  const preview = previewData?.preview;
  const readiness = assessReadiness(packet, draft, verification, preview, controlMap);

  const report = {
    packet_id: packetId,
    draft_id: packet.draft_id,
    recommended_public_case_id: packet.suggested_public_case_id || 'INC-0013',
    recommended_public_filename: packet.suggested_public_filename || 'inc-0013.json',
    
    // Artifact status
    source_verification_status: verification ? verification.verification_status : 'missing',
    preview_status: preview ? 'created' : 'missing',
    control_map_status: controlMap ? 'created' : 'missing',
    
    // Quality metrics
    quality_score: packet.quality_score || draft.quality_score || 0,
    source_tier: packet.source_tier || 'green',
    quality_class: packet.quality_class || draft.quality_class || 'unknown',
    
    // Readiness assessment
    readiness_checks: readiness.checks,
    checks_passed: readiness.passedChecks,
    total_checks: readiness.totalChecks,
    
    // Risk assessment
    remaining_risks: readiness.issues,
    warnings: readiness.warnings,
    
    // Human review requirements
    required_human_checks: [
      'Control Tower explicit approval for publication',
      'Curator review of proposed case title',
      'Legal domain classification confirmation',
      'Clean-room wording audit',
      'Final source verification review'
    ],
    
    // Decision
    ready_for_control_tower_approval: readiness.readyForControlTower,
    
    // Instructions
    approval_instruction: readiness.readyForControlTower 
      ? 'Ready for Control Tower review. Add approval to data/reviews/real/approved-promotions.json to proceed.'
      : 'Address remaining issues before Control Tower review.',
    
    // Artifact paths
    artifact_paths: {
      packet: `data/promotion-packets/real/${packetId}.json`,
      draft: `data/drafts/real/${packet.draft_id}.json`,
      source_verification: verification ? `data/source-verifications/real/${packetId}-source-verification.json` : null,
      public_preview: preview ? `data/publication-previews/real/${previewData.path}` : null,
      control_map: controlMap ? `data/control-maps/real/${packetId}-control-map.json` : null
    },
    
    // Metadata
    generated_at: new Date().toISOString(),
    report_version: '1.0'
  };

  return report;
}

async function main() {
  const packetId = process.argv[2] || 'PKT-0006';
  
  console.log(`=== Building Promotion Readiness Report for ${packetId} ===\n`);

  // Build readiness report
  logInfo('Assessing promotion readiness...');
  const report = buildReadinessReport(packetId);
  
  if (!report) {
    process.exit(1);
  }

  // Write report file
  const reportPath = path.join(REVIEWS_DIR, `${packetId}-readiness-report.json`);
  ensureDir(REVIEWS_DIR);
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  READINESS REPORT SUMMARY');
  console.log(`${'='.repeat(60)}`);
  console.log(`Packet ID: ${report.packet_id}`);
  console.log(`Draft ID: ${report.draft_id}`);
  console.log(`Recommended case: ${report.recommended_public_case_id}`);
  console.log(`Quality score: ${report.quality_score}/100`);
  console.log(`Source tier: ${report.source_tier.toUpperCase()}`);
  console.log(`Checks passed: ${report.checks_passed}/${report.total_checks}`);
  console.log(`Ready for Control Tower: ${report.ready_for_control_tower_approval ? 'YES' : 'NO'}`);
  
  if (report.remaining_risks.length > 0) {
    console.log(`\nRemaining risks:`);
    report.remaining_risks.forEach(risk => console.log(`  - ${risk}`));
  }
  
  if (report.warnings.length > 0) {
    console.log(`\nWarnings:`);
    report.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  console.log(`\n${report.approval_instruction}`);
  console.log(`\nReadiness report written: ${reportPath}`);
  console.log(`${'='.repeat(60)}\n`);

  if (report.ready_for_control_tower_approval) {
    logSuccess('PKT-0006 is ready for Control Tower approval');
  } else {
    logWarning('PKT-0006 requires additional work before Control Tower approval');
  }
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
