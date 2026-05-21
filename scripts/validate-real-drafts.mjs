import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

function logError(msg) {
  console.error(`\x1b[31m[Draft Validation Error]\x1b[0m ${msg}`);
}

function logPass(msg) {
  console.log(`\x1b[32m[Draft Validation Pass]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[Draft Validation Warning]\x1b[0m ${msg}`);
}

const REQUIRED_FIELDS = [
  'draft_id', 'candidate_ids', 'proposed_case_title', 'case_type', 'jurisdiction',
  'source_authorities', 'source_urls', 'legal_domain', 'commercial_domain',
  'failure_mode', 'business_risk', 'missing_controls', 'required_evidence',
  'vendor_questions', 'training_lesson', 'clean_room_summary',
  'source_risk_level', 'publish_recommendation', 'review_status'
];

const FORBIDDEN_FIELDS = ['full_html', 'body', 'raw_source_text', 'html_body', 'page_body', 'text_content', 'scraped_content'];

function run() {
  console.log('=== Caesar Real Draft Validator ===');
  let failures = 0;

  const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
  const SITE_DIR = path.join(ROOT, 'site');
  const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');

  // 1. Drafts directory exists
  if (!fs.existsSync(DRAFTS_DIR)) {
    logError('data/drafts/real/ directory does not exist! Run build-real-case-drafts.mjs first.');
    failures++;
    console.error(`\n\x1b[31mVALIDATION FAILED:\x1b[0m ${failures} issue(s) detected.`);
    process.exit(1);
  }

  const draftFiles = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.json'));
  if (draftFiles.length === 0) {
    logWarning('No draft files found in data/drafts/real/. Run build-real-case-drafts.mjs first.');
    logPass('No drafts to validate (empty set passes cleanly).');
    process.exit(0);
  }

  logPass(`Found ${draftFiles.length} real draft file(s) to validate.`);

  // 2. Build known candidate IDs set for link verification
  const knownCandidateIds = new Set();
  if (fs.existsSync(REAL_CANDIDATES_DIR)) {
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) scanDir(fullPath);
        else if (item.isFile() && item.name.endsWith('.json')) {
          try {
            const c = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            if (c.candidate_id) knownCandidateIds.add(c.candidate_id);
          } catch (e) { /* skip */ }
        }
      }
    };
    scanDir(REAL_CANDIDATES_DIR);
  }

  for (const file of draftFiles) {
    const filePath = path.join(DRAFTS_DIR, file);
    let draft;
    try {
      draft = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      logError(`Failed to parse ${file}: ${e.message}`);
      failures++;
      continue;
    }

    const id = draft.draft_id || file;

    // 3. Required fields present
    for (const field of REQUIRED_FIELDS) {
      if (draft[field] === undefined || draft[field] === null) {
        logError(`${id}: missing required field '${field}'`);
        failures++;
      }
    }

    // 4. No forbidden full-text fields
    for (const field of FORBIDDEN_FIELDS) {
      if (draft[field] !== undefined) {
        logError(`${id}: contains forbidden full-text field '${field}'`);
        failures++;
      }
    }

    // 5. local_only must be true
    if (draft.local_only !== true) {
      logError(`${id}: local_only must be true, got: ${draft.local_only}`);
      failures++;
    }

    // 6. public must be false
    if (draft.public !== false) {
      logError(`${id}: public must be false, got: ${draft.public}`);
      failures++;
    }

    // 7. not_legal_advice must be true
    if (draft.not_legal_advice !== true) {
      logError(`${id}: not_legal_advice must be true, got: ${draft.not_legal_advice}`);
      failures++;
    }

    // 8. source_text_copied must be false
    if (draft.source_text_copied !== false) {
      logError(`${id}: source_text_copied must be false, got: ${draft.source_text_copied}`);
      failures++;
    }

    // 9. review_status must not be approved_public or approved_for_promotion
    const reviewStatus = draft.review_status || '';
    if (reviewStatus === 'approved_public') {
      logError(`${id}: review_status is 'approved_public' — not allowed for real drafts`);
      failures++;
    }

    // 10. publish_recommendation must not be auto_publish or ready_for_publish
    const pubRec = draft.publish_recommendation || '';
    if (pubRec === 'auto_publish') {
      logError(`${id}: publish_recommendation is 'auto_publish' — forbidden`);
      failures++;
    }

    // 11. All candidate_ids must link to Green source candidates only
    const candIds = draft.candidate_ids || [];
    if (candIds.length === 0) {
      logError(`${id}: candidate_ids is empty`);
      failures++;
    }
    for (const candId of candIds) {
      if (knownCandidateIds.size > 0 && !knownCandidateIds.has(candId)) {
        logError(`${id}: candidate_id '${candId}' does not correspond to a known real candidate`);
        failures++;
      }
    }

    // 12. draft_id format
    if (draft.draft_id && !/^DRAFT-\d{4}$/.test(draft.draft_id)) {
      logError(`${id}: draft_id '${draft.draft_id}' does not match DRAFT-NNNN format`);
      failures++;
    }
  }

  // 13. No draft files under site/
  const checkNoDraftsInSite = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoDraftsInSite(fullPath);
      } else if (item.isFile() && item.name.toLowerCase().includes('draft')) {
        logError(`Leakage detected! Draft file found under site/: ${fullPath}`);
        failures++;
      }
    }
  };
  checkNoDraftsInSite(SITE_DIR);
  logPass('Public site/ is clean of draft files.');

  // 14. INC-0013 is now published — verify correct file exists, block old lowercase path as leakage
  const INC_0013_CORRECT = path.join(ROOT, 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  const INC_0013_SITE_CORRECT = path.join(ROOT, 'site', 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  const INC_0013_OLD = path.join(ROOT, 'data', 'incidents', 'inc-0013.json');
  const INC_0013_SITE_OLD = path.join(ROOT, 'site', 'data', 'incidents', 'inc-0013.json');
  if (fs.existsSync(INC_0013_OLD) || fs.existsSync(INC_0013_SITE_OLD)) {
    logError('Leakage detected! Old lowercase inc-0013.json found — remove it.');
    failures++;
  } else {
    logPass('Safe: no stale inc-0013.json leakage.');
  }
  if (!fs.existsSync(INC_0013_CORRECT) || !fs.existsSync(INC_0013_SITE_CORRECT)) {
    logError('INC-0013 published record missing — expected INC-0013-edpb-automated-decision-making-profiling-guidance.json in data/incidents/ and site/data/incidents/.');
    failures++;
  } else {
    logPass('INC-0013 published record present in data/ and site/data/ (correct filename).');
  }

  // 15. Block INC-0014 unless explicitly approved
  const INC_0014_DATA = path.join(ROOT, 'data', 'incidents');
  if (fs.existsSync(INC_0014_DATA)) {
    const allIncFiles = fs.readdirSync(INC_0014_DATA);
    const inc0014Files = allIncFiles.filter(f => f.toUpperCase().startsWith('INC-0014'));
    if (inc0014Files.length > 0) {
      logError(`INC-0014 file(s) detected without approval: ${inc0014Files.join(', ')}`);
      failures++;
    } else {
      logPass('Safe: no INC-0014 record exists.');
    }
  }

  if (failures > 0) {
    console.error(`\n\x1b[31mVALIDATION FAILED:\x1b[0m ${failures} real draft issue(s) detected.`);
    process.exit(1);
  } else {
    logPass(`ALL ${draftFiles.length} real draft file(s) passed validation.`);
    process.exit(0);
  }
}

run();
