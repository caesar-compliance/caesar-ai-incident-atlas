import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const DEDUPE_REPORT_PATH = path.join(ROOT, 'data', 'watch', 'runs', 'latest-real-dedupe-report.json');
const DRAFTS_REAL_DIR = path.join(ROOT, 'data', 'drafts', 'real');

// Domain classification maps
const JURISDICTION_LEGAL_DOMAIN_MAP = {
  'UK': 'privacy_biometrics',
  'EU': 'privacy_biometrics',
  'FR': 'privacy_biometrics',
  'US': 'consumer_protection'
};

const CASE_TYPE_FAILURE_MODE_MAP = {
  'enforcement': ['FM-ENFORCEMENT-ACTION', 'FM-REGULATORY-PENALTY'],
  'lawsuit': ['FM-LITIGATION-RISK', 'FM-CIVIL-LIABILITY'],
  'regulator_guidance': ['FM-GOVERNANCE-GAP', 'FM-COMPLIANCE-DEFICIT'],
  'court_decision': ['FM-JUDICIAL-RULING', 'FM-PRECEDENT-RISK'],
  'settlement': ['FM-SETTLEMENT-OBLIGATION', 'FM-REPUTATIONAL-DAMAGE'],
  'public_sector_incident': ['FM-PUBLIC-SECTOR-FAILURE', 'FM-ACCOUNTABILITY-GAP'],
  'vendor_governance_failure': ['FM-VENDOR-RISK', 'FM-THIRD-PARTY-OVERSIGHT'],
  'serious_incident_report': ['FM-INCIDENT-REPORTING', 'FM-HARM-REALISATION'],
  'commercial_ai_failure': ['FM-COMMERCIAL-AI-FAILURE', 'FM-PRODUCT-LIABILITY'],
  'official_investigation': ['FM-INVESTIGATION-TRIGGER', 'FM-REGULATORY-SCRUTINY']
};

const CASE_TYPE_MISSING_CONTROLS_MAP = {
  'enforcement': ['CTL-REGULATORY-MONITORING', 'CTL-ENFORCEMENT-RESPONSE-PLAN'],
  'lawsuit': ['CTL-LEGAL-RISK-REGISTER', 'CTL-LITIGATION-READINESS'],
  'regulator_guidance': ['CTL-GUIDANCE-TRACKING', 'CTL-COMPLIANCE-UPDATE-PROCESS'],
  'court_decision': ['CTL-CASE-LAW-MONITORING', 'CTL-PRECEDENT-ANALYSIS'],
  'settlement': ['CTL-SETTLEMENT-MANAGEMENT', 'CTL-REMEDIATION-TRACKING'],
  'public_sector_incident': ['CTL-PUBLIC-SECTOR-AUDIT', 'CTL-ACCOUNTABILITY-FRAMEWORK'],
  'vendor_governance_failure': ['CTL-VENDOR-DUE-DILIGENCE', 'CTL-THIRD-PARTY-AUDIT'],
  'serious_incident_report': ['CTL-INCIDENT-RESPONSE', 'CTL-HARM-MITIGATION'],
  'commercial_ai_failure': ['CTL-AI-PRODUCT-TESTING', 'CTL-CONSUMER-PROTECTION-CHECK'],
  'official_investigation': ['CTL-INVESTIGATION-COOPERATION', 'CTL-EVIDENCE-PRESERVATION']
};

const SOURCE_AUTHORITY_MAP = {
  'ico-ai-and-algorithms': 'Information Commissioner\'s Office (ICO)',
  'ftc-ai-enforcement': 'Federal Trade Commission (FTC)',
  'eeoc-ai-guidance': 'Equal Employment Opportunity Commission (EEOC)',
  'doj-ada-ai-guidance': 'US Department of Justice (DOJ)',
  'cnil-ai': 'Commission Nationale de l\'Informatique et des Libertés (CNIL)',
  'edpb-ai': 'European Data Protection Board (EDPB)',
  'european-commission-ai-act': 'European Commission'
};

function scanCandidates(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanCandidates(fullPath, list);
    } else if (item.isFile() && item.name.endsWith('.json')) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (content.candidate_id) list.push(content);
      } catch (e) {
        console.error(`Error reading candidate ${item.name}:`, e.message);
      }
    }
  }
  return list;
}

function getNextDraftId() {
  let maxId = 0;
  if (fs.existsSync(DRAFTS_REAL_DIR)) {
    const files = fs.readdirSync(DRAFTS_REAL_DIR).filter(f => f.endsWith('.json'));
    for (const f of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(DRAFTS_REAL_DIR, f), 'utf8'));
        if (content.draft_id && content.draft_id.startsWith('DRAFT-')) {
          const num = parseInt(content.draft_id.replace('DRAFT-', ''), 10);
          if (!isNaN(num) && num > maxId) maxId = num;
        }
      } catch (e) { /* skip */ }
    }
  }
  return `DRAFT-${String(maxId + 1).padStart(4, '0')}`;
}

function buildDraftFromCandidate(candidate, draftId) {
  const jurisdiction = candidate.jurisdiction || 'UNKNOWN';
  const caseType = candidate.preliminary_case_type || 'regulator_guidance';
  const sourceId = candidate.source_id || 'unknown';
  const authority = SOURCE_AUTHORITY_MAP[sourceId] || sourceId;
  const legalDomain = JURISDICTION_LEGAL_DOMAIN_MAP[jurisdiction] || 'governance_failure';
  const failureModes = CASE_TYPE_FAILURE_MODE_MAP[caseType] || ['FM-GOVERNANCE-GAP'];
  const missingControls = CASE_TYPE_MISSING_CONTROLS_MAP[caseType] || ['CTL-GUIDANCE-TRACKING'];

  const titleClean = (candidate.title || 'Untitled')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  const draft = {
    draft_id: draftId,
    candidate_ids: [candidate.candidate_id],
    proposed_case_title: `[DRAFT] ${titleClean} — ${authority} (${jurisdiction})`,
    case_type: caseType,
    jurisdiction,
    source_authorities: [authority],
    source_urls: [candidate.source_url],
    legal_domain: legalDomain,
    commercial_domain: 'cross-sector AI governance',
    failure_mode: failureModes,
    business_risk: `Organisations using AI systems in ${jurisdiction} face regulatory scrutiny from ${authority}. Failure to track and implement guidance from this source may result in enforcement action, fines, or operational restrictions. Relevant to AI procurement, deployment, and compliance programmes.`,
    missing_controls: missingControls,
    required_evidence: [
      'Evidence of regulatory guidance monitoring process',
      'Record of internal impact assessment against this guidance',
      'Documentation of AI system inventory and applicable controls',
      'Board or senior management sign-off on compliance posture'
    ],
    vendor_questions: [
      `Has your organisation reviewed the latest guidance from ${authority}?`,
      'Do you maintain a register of applicable AI regulations and guidance by jurisdiction?',
      'What controls are in place to respond to new regulatory guidance within 30 days?',
      'Can you demonstrate evidence of compliance gap analysis against this guidance?'
    ],
    training_lesson: `Regulatory bodies such as ${authority} issue guidance that directly affects AI system deployments. Organisations must maintain active monitoring processes to detect and respond to new guidance before it becomes an enforcement trigger.`,
    clean_room_summary: `${authority} has published material relating to ${titleClean}. This record reflects metadata detected during a manual Green-source watcher run on ${candidate.detected_at ? candidate.detected_at.substring(0, 10) : 'unknown date'}. This draft is a Caesar-authored internal working document compiled from public metadata only. No source text has been copied. This is not legal advice. This draft requires curator review and Control Tower approval before any public use.`,
    source_risk_level: 'green',
    publish_recommendation: 'needs_legal_review',
    review_status: 'draft',
    local_only: true,
    public: false,
    not_legal_advice: true,
    source_text_copied: false,
    generated_at: new Date().toISOString(),
    pipeline_stage: 'real_draft_needs_review'
  };

  return draft;
}

function build() {
  console.log('=== Building Real Case Drafts from Candidates ===');

  if (!fs.existsSync(REAL_CANDIDATES_DIR)) {
    console.error('No real-candidates directory found. Run watch-green-sources.mjs first.');
    process.exit(1);
  }

  // Load dedupe report to identify unique candidates
  let uniqueIds = null;
  if (fs.existsSync(DEDUPE_REPORT_PATH)) {
    try {
      const dedupeReport = JSON.parse(fs.readFileSync(DEDUPE_REPORT_PATH, 'utf8'));
      uniqueIds = new Set(dedupeReport.unique_candidate_ids || []);
      console.log(`Dedupe report loaded: ${uniqueIds.size} unique candidate(s).`);
    } catch (e) {
      console.warn(`Warning: Could not parse dedupe report: ${e.message}. Processing all candidates.`);
    }
  } else {
    console.warn('No dedupe report found. Processing all candidates.');
  }

  const allCandidates = scanCandidates(REAL_CANDIDATES_DIR);
  const candidates = uniqueIds
    ? allCandidates.filter(c => uniqueIds.has(c.candidate_id))
    : allCandidates;

  console.log(`Processing ${candidates.length} candidate(s) for draft generation.`);

  if (!fs.existsSync(DRAFTS_REAL_DIR)) {
    fs.mkdirSync(DRAFTS_REAL_DIR, { recursive: true });
  }

  // Load existing drafts to avoid re-generating for already-processed candidates
  const existingCandIds = new Set();
  const existingFiles = fs.existsSync(DRAFTS_REAL_DIR)
    ? fs.readdirSync(DRAFTS_REAL_DIR).filter(f => f.endsWith('.json'))
    : [];
  for (const f of existingFiles) {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(DRAFTS_REAL_DIR, f), 'utf8'));
      (d.candidate_ids || []).forEach(id => existingCandIds.add(id));
    } catch (e) { /* skip */ }
  }

  let created = 0;
  let skipped = 0;

  for (const candidate of candidates) {
    if (existingCandIds.has(candidate.candidate_id)) {
      console.log(`Skipping ${candidate.candidate_id} — draft already exists.`);
      skipped++;
      continue;
    }

    const draftId = getNextDraftId();
    const draft = buildDraftFromCandidate(candidate, draftId);

    const draftPath = path.join(DRAFTS_REAL_DIR, `${draftId}.json`);
    fs.writeFileSync(draftPath, JSON.stringify(draft, null, 2), 'utf8');
    console.log(`\x1b[32m[Draft Created]\x1b[0m ${draftId} <- ${candidate.candidate_id} -> ${draftPath}`);

    existingCandIds.add(candidate.candidate_id);
    created++;
  }

  console.log('\n==========================================');
  console.log('       Caesar Real Draft Build Report     ');
  console.log('==========================================');
  console.log(`Candidates processed: ${candidates.length}`);
  console.log(`Drafts created:       ${created}`);
  console.log(`Drafts skipped:       ${skipped}`);
  console.log(`Output dir:           ${DRAFTS_REAL_DIR}`);
  console.log('==========================================\n');
}

build();
