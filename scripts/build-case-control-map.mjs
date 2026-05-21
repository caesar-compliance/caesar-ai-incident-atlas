import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const CONTROL_MAPS_DIR = path.join(ROOT, 'data', 'control-maps', 'real');

function logInfo(msg) {
  console.log(`\x1b[36m[CONTROL-MAP]\x1b[0m ${msg}`);
}

function logError(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
}

function logSuccess(msg) {
  console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`);
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

function mapToFrameworks(draft) {
  const frameworks = {};
  
  // EU AI Act mapping
  frameworks['EU AI Act'] = {
    relevant_articles: [
      'Article 9 - Risk Management Systems',
      'Article 10 - Data and Data Governance',
      'Article 13 - Transparency and Provision of Information',
      'Article 14 - Human Oversight'
    ],
    compliance_requirements: [
      'Implement risk management system for high-risk AI systems',
      'Ensure data governance and quality management',
      'Provide transparency information to users',
      'Maintain human oversight measures'
    ],
    gap_indicators: draft.failure_mode || [],
    risk_level: 'medium'
  };

  // GDPR automated decision-making/profiling mapping
  frameworks['GDPR Automated Decision-Making & Profiling'] = {
    relevant_articles: [
      'Article 22 - Automated Individual Decision-Making',
      'Article 15 - Right of Access by Data Subject',
      'Article 21 - Right to Object',
      'Recital 71 - Profiling and Automated Decision-Making'
    ],
    compliance_requirements: [
      'Provide meaningful information about logic involved in automated decision-making',
      'Implement measures to obtain human intervention',
      'Express point of view and contest automated decisions',
      'Conduct Data Protection Impact Assessment (DPIA) for profiling'
    ],
    gap_indicators: ['FM-COMPLIANCE-DEFICIT', 'FM-GOVERNANCE-GAP'],
    risk_level: 'high'
  };

  // NIST AI RMF mapping
  frameworks['NIST AI RMF'] = {
    relevant_functions: [
      'GOVERN - Establish governance structures',
      'MAP - Contextualize AI system risks',
      'MEASURE - Assess AI system performance and impact',
      'MANAGE - Allocate risk resources to treat risks'
    ],
    key_practices: [
      'Establish AI risk management governance structure',
      'Map AI system requirements and context',
      'Measure AI system performance and trustworthiness',
      'Manage identified risks with appropriate controls'
    ],
    gap_indicators: draft.missing_controls || [],
    risk_level: 'medium'
  };

  // ISO 42001 mapping
  frameworks['ISO 42001'] = {
    relevant_clauses: [
      'Clause 5 - Organizational Context',
      'Clause 6 - Planning',
      'Clause 7 - Support',
      'Clause 8 - Operation',
      'Clause 9 - Performance Evaluation',
      'Clause 10 - Improvement'
    ],
    key_controls: [
      'Establish AI management system framework',
      'Develop AI risk assessment procedures',
      'Implement AI system documentation requirements',
      'Create monitoring and measurement processes'
    ],
    gap_indicators: draft.missing_controls || [],
    risk_level: 'medium'
  };

  return frameworks;
}

function buildControlMap(draft, packet) {
  const frameworks = mapToFrameworks(draft);

  const controlMap = {
    packet_id: packet.packet_id,
    draft_id: draft.draft_id,
    failure_mode: draft.failure_mode || [],
    legal_commercial_risk: draft.business_risk || 'Risk assessment pending',
    missing_controls: draft.missing_controls || [],
    required_evidence: draft.required_evidence || [],
    vendor_questions: draft.vendor_questions || [],
    training_lesson: draft.training_lesson || 'Training lesson pending final review',
    governance_lesson: `Regulatory guidance monitoring is essential. ${draft.source_authorities?.[0] || 'Authorities'} provide material that affects compliance requirements.`,
    client_checklist: [
      'Review source guidance from regulatory authority',
      'Assess impact on current AI systems and processes',
      'Update compliance documentation and procedures',
      'Implement required controls within defined timeframe',
      'Document evidence of compliance measures taken'
    ],
    mapped_frameworks: frameworks,
    status: 'local_review_only',
    control_tower_approval_required: true,
    created_at: new Date().toISOString()
  };

  return controlMap;
}

async function main() {
  const packetId = process.argv[2] || 'PKT-0006';
  
  console.log(`=== Building Control Map for ${packetId} ===\n`);

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

  logInfo(`Loaded packet ${packetId} -> draft ${packet.draft_id}`);

  // Build control map
  logInfo('Building control/evidence mapping...');
  const controlMap = buildControlMap(draft, packet);

  // Write control map file
  ensureDir(CONTROL_MAPS_DIR);
  const controlMapPath = path.join(CONTROL_MAPS_DIR, `${packetId}-control-map.json`);
  
  fs.writeFileSync(controlMapPath, JSON.stringify(controlMap, null, 2), 'utf8');

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  CONTROL MAP SUMMARY');
  console.log(`${'='.repeat(60)}`);
  console.log(`Packet ID: ${controlMap.packet_id}`);
  console.log(`Draft ID: ${controlMap.draft_id}`);
  console.log(`Failure modes: ${controlMap.failure_mode.join(', ')}`);
  console.log(`Missing controls: ${controlMap.missing_controls.length} identified`);
  console.log(`Required evidence: ${controlMap.required_evidence.length} items`);
  console.log(`Vendor questions: ${controlMap.vendor_questions.length} questions`);
  console.log(`Frameworks mapped: ${Object.keys(controlMap.mapped_frameworks).length}`);
  
  for (const [framework, mapping] of Object.entries(controlMap.mapped_frameworks)) {
    console.log(`  - ${framework}: ${mapping.risk_level} risk`);
  }
  
  console.log(`Status: ${controlMap.status}`);
  console.log(`Control Tower approval required: ${controlMap.control_tower_approval_required ? 'Yes' : 'No'}`);
  console.log(`\nControl map written: ${controlMapPath}`);
  console.log(`${'='.repeat(60)}\n`);

  logSuccess(`Control map created: ${packetId}-control-map.json`);
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
