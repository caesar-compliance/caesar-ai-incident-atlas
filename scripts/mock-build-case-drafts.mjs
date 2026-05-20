import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const CANDIDATES_DIR = path.join(ROOT, 'data', 'candidates', 'mock');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'mock');

function run() {
  console.log('--- Caesar Atlas Mock Drafts Builder: Compiling Case Drafts ---');

  if (!fs.existsSync(CANDIDATES_DIR)) {
    console.error(`Error: Mock candidates directory not found at ${CANDIDATES_DIR}`);
    process.exit(1);
  }

  // Load all cand-*.json files
  const files = fs.readdirSync(CANDIDATES_DIR)
    .filter(file => file.startsWith('cand-') && file.endsWith('.json'));

  console.log(`Loaded ${files.length} candidate files for drafting.`);

  // Ensure drafts directory exists
  fs.mkdirSync(DRAFTS_DIR, { recursive: true });

  const draftMappings = {
    'CAND-0013': {
      proposed_case_title: 'Mock Case: EEOC Resume Screening Discrimination Warning',
      legal_domain: 'hiring_employment',
      commercial_domain: 'Human Resources',
      failure_mode: ['FM-DISCRIMINATION-BIAS'],
      business_risk: 'Significant regulatory scrutiny and class-action liability under mock governance rules.',
      missing_controls: ['CTL-BIAS-AUDITING', 'CTL-HUMAN-IN-THE-LOOP'],
      required_evidence: ['Linguistic bias audit reports', 'Human review logs'],
      vendor_questions: ['Has this resume tool been audited for systematic bias against non-native speakers?'],
      training_lesson: 'Avoid using unhedged language model filters for critical qualification screening.',
      clean_room_summary: 'MOCK SYNTHETIC DRAFT: Standardized testing report outlining how automated hiring resume screening systems can introduce demographic bias without continuous human audibility.',
      publish_recommendation: 'needs_legal_review',
      review_status: 'draft',
      source_authorities: ['EEOC']
    },
    'CAND-0014': {
      proposed_case_title: 'Mock Case: CNIL Biometric Retail Profiling Consent Enforcement',
      legal_domain: 'privacy_biometrics',
      commercial_domain: 'Retail',
      failure_mode: ['FM-PRIVACY-NON-CONSENT'],
      business_risk: 'Substantial GDPR fines and loss of consumer trust in the retail space.',
      missing_controls: ['CTL-BIOMETRIC-CONSENT-GATE', 'CTL-DATA-MINIMIZATION-AUDIT'],
      required_evidence: ['Explicit opt-in forms', 'Biometric hash database encryption logs'],
      vendor_questions: ['Do you store raw biometric facial images or only localized numerical hashes?'],
      training_lesson: 'Never deploy biometric analysis in public venues without active, uncoerced consumer opt-in.',
      clean_room_summary: 'MOCK SYNTHETIC DRAFT: Regulatory enforcement advisory analyzing consumer consent gates for emotional and facial profiling systems deployed inside physical spaces.',
      publish_recommendation: 'needs_legal_review',
      review_status: 'draft',
      source_authorities: ['CNIL']
    },
    'CAND-0015': {
      proposed_case_title: 'Mock Case: FDA Diagnostic Drift Clinical Calibration Alert',
      legal_domain: 'healthcare',
      commercial_domain: 'Clinical Medicine',
      failure_mode: ['FM-ALGORITHMIC-DRIFT'],
      business_risk: 'Severe patient safety liability and clinical malpractice exposure.',
      missing_controls: ['CTL-CONTINUOUS-DRIFT-MONITORING', 'CTL-CLINICAL-OVERRIDE-PROTOCOL'],
      required_evidence: ['Drift threshold validation logs', 'Practitioner feedback reports'],
      vendor_questions: ['What dataset drift detection mechanisms are built into the clinical recommendation software?'],
      training_lesson: 'Establish continuous verification systems to capture diagnostic variance as patient demographics shift.',
      clean_room_summary: 'MOCK SYNTHETIC DRAFT: Safety warning outlining calibration errors in healthcare AI models resulting from clinical environment shifts.',
      publish_recommendation: 'needs_legal_review',
      review_status: 'draft',
      source_authorities: ['FDA']
    },
    'CAND-0016': {
      proposed_case_title: 'Mock Case: CFPB Explainable Adverse Action Credit Underwriting Alert',
      legal_domain: 'financial_services',
      commercial_domain: 'Consumer Finance',
      failure_mode: ['FM-EXPLAINABILITY-FAILURE'],
      business_risk: 'Regulatory enforcement actions and compliance penalties under credit protection laws.',
      missing_controls: ['CTL-MODEL-EXPLAINABILITY-AUDIT', 'CTL-CONSUMER-EXPLAINABILITY-REPORTS'],
      required_evidence: ['Model explainability metrics', 'Credit denial reason mapping lists'],
      vendor_questions: ['How are model feature weights translated into consumer adverse action reason codes?'],
      training_lesson: 'Ensure ML-driven scoring models produce human-understandable explanation codes.',
      clean_room_summary: 'MOCK SYNTHETIC DRAFT: Credit scoring advisory outlining the transparency requirements for automated underwriting decisioning algorithms.',
      publish_recommendation: 'needs_legal_review',
      review_status: 'draft',
      source_authorities: ['CFPB']
    },
    'CAND-0017': {
      proposed_case_title: 'Mock Case: Third-Party Customer Chatbot Hallucination and Data Leak',
      legal_domain: 'vendor_risk',
      commercial_domain: 'Insurance & Customer Support',
      failure_mode: ['FM-LLM-HALLUCINATION', 'FM-DATA-LEAKAGE'],
      business_risk: 'Exposure of competitive pricing secrets and breach of customer confidentiality.',
      missing_controls: ['CTL-VENDOR-RISK-ASSESSMENT', 'CTL-LLM-GUARDRAILS-FIREWALL'],
      required_evidence: ['Vendor due diligence questionnaires', 'Firewall input/output validation logs'],
      vendor_questions: ['What guardrails or leakage prevention filters are implemented in your hosted chatbot API?'],
      training_lesson: 'Never hook customer-facing LLMs directly to backend knowledge bases without deep input/output guardrails.',
      clean_room_summary: 'MOCK SYNTHETIC DRAFT: Commercial incident review on corporate data leakage caused by vendor conversational interface hallucinations.',
      publish_recommendation: 'needs_legal_review',
      review_status: 'draft',
      source_authorities: ['Media Reports']
    }
  };

  for (const file of files) {
    const filePath = path.join(CANDIDATES_DIR, file);
    let cand;
    try {
      cand = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error(`Failed to parse candidate ${filePath}:`, err);
      continue;
    }

    const mapping = draftMappings[cand.candidate_id];
    if (!mapping) {
      console.warn(`No metadata mapping defined for ${cand.candidate_id}, skipping draft creation.`);
      continue;
    }

    const draftNum = cand.candidate_id.split('-')[1];
    const draftId = `DRAFT-${draftNum}`;

    const draft = {
      draft_id: draftId,
      candidate_ids: [cand.candidate_id],
      proposed_case_title: mapping.proposed_case_title,
      case_type: cand.preliminary_case_type,
      jurisdiction: cand.jurisdiction,
      source_authorities: mapping.source_authorities,
      source_urls: [cand.source_url],
      legal_domain: mapping.legal_domain,
      commercial_domain: mapping.commercial_domain,
      failure_mode: mapping.failure_mode,
      business_risk: mapping.business_risk,
      missing_controls: mapping.missing_controls,
      required_evidence: mapping.required_evidence,
      vendor_questions: mapping.vendor_questions,
      training_lesson: mapping.training_lesson,
      clean_room_summary: mapping.clean_room_summary + ' Used strictly for offline validation/testing.',
      source_risk_level: cand.source_tier,
      publish_recommendation: mapping.publish_recommendation,
      review_status: mapping.review_status
    };

    const draftFilePath = path.join(DRAFTS_DIR, `${draftId.toLowerCase()}.json`);
    fs.writeFileSync(draftFilePath, JSON.stringify(draft, null, 2), 'utf8');
    console.log(`Saved case draft file: ${draftFilePath}`);
  }

  console.log('--- Drafts Builder Done ---\n');
}

run();
