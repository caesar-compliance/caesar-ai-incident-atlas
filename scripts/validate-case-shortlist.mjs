// Validate case shortlist — T052 safety and completeness checks

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const SHORTLIST_PATH = path.join(ROOT, 'data', 'reviews', 'real', 'case-shortlist.json');
const SITE_DIR = path.join(ROOT, 'site');

const REQUIRED_FIELDS = [
  'rank', 'packet_id', 'draft_id', 'candidate_ids', 'title',
  'source_authority', 'source_urls', 'quality_class', 'quality_score',
  'promotion_eligible', 'case_quality_ready', 'why_it_matters',
  'governance_value', 'publication_risks', 'missing_information',
  'recommended_action'
];

const VALID_ACTIONS = [
  'ready_for_control_tower_review',
  'needs_more_source_confirmation',
  'guidance_only_not_case',
  'blocked_low_quality'
];

function logPass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

function logFail(msg) {
  console.log(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
}

function logInfo(msg) {
  console.log(`\x1b[34m[INFO]\x1b[0m ${msg}`);
}

function validate() {
  console.log('=== Validating Case Shortlist (T052) ===\n');
  let passed = true;

  // Check shortlist exists
  if (!fs.existsSync(SHORTLIST_PATH)) {
    logFail('case-shortlist.json not found');
    return false;
  }
  logPass('case-shortlist.json exists');

  let shortlist;
  try {
    shortlist = JSON.parse(fs.readFileSync(SHORTLIST_PATH, 'utf8'));
  } catch (e) {
    logFail(`Invalid JSON: ${e.message}`);
    return false;
  }
  logPass('Valid JSON structure');

  // Check required top-level fields
  if (!shortlist.items || !Array.isArray(shortlist.items)) {
    logFail('Missing items array');
    return false;
  }
  logPass('Items array present');

  // Check exactly 5 items
  if (shortlist.items.length !== 5) {
    logFail(`Expected 5 items, found ${shortlist.items.length}`);
    passed = false;
  } else {
    logPass('Exactly 5 items in shortlist');
  }

  // Validate each item
  for (const item of shortlist.items) {
    for (const field of REQUIRED_FIELDS) {
      if (!(field in item)) {
        logFail(`${item.packet_id}: Missing field "${field}"`);
        passed = false;
      }
    }

    if (!VALID_ACTIONS.includes(item.recommended_action)) {
      logFail(`${item.packet_id}: Invalid recommended_action "${item.recommended_action}"`);
      passed = false;
    }

    // Check for public site contamination
    if (item.source_urls) {
      for (const url of item.source_urls) {
        if (typeof url !== 'string' || url.length === 0) {
          logFail(`${item.packet_id}: Invalid source_url`);
          passed = false;
        }
      }
    }
  }
  logPass('All items have required fields');

  // Check for site/ contamination
  const shortlistFilename = path.basename(SHORTLIST_PATH);
  const siteCheckPath = path.join(SITE_DIR, 'data', 'reviews', 'real', shortlistFilename);
  if (fs.existsSync(siteCheckPath)) {
    logFail('Shortlist found in site/ directory - safety violation');
    passed = false;
  } else {
    logPass('Shortlist not in site/ - local only');
  }

  // Check safety declarations
  const siteDataPath = path.join(SITE_DIR, 'data');
  if (fs.existsSync(siteDataPath)) {
    const incidentsPath = path.join(siteDataPath, 'incidents');
    if (fs.existsSync(incidentsPath)) {
      const incidentFiles = fs.readdirSync(incidentsPath).filter(f => f.endsWith('.json'));
      const approvalsPathSL = path.join(ROOT, 'data', 'reviews', 'real', 'approved-promotions.json');
      let approvedCountSL = 0;
      if (fs.existsSync(approvalsPathSL)) {
        try { approvedCountSL = (JSON.parse(fs.readFileSync(approvalsPathSL,'utf8')).approvals||[]).length; } catch(e){}
      }
      const expectedSL = 12 + approvedCountSL;
      if (incidentFiles.length === expectedSL) {
        logPass(`Public dataset at expected count: ${expectedSL} records`);
      } else {
        logFail(`Public dataset changed: ${incidentFiles.length} records (expected ${expectedSL})`);
        passed = false;
      }
    }
  }

  // Check INC-0013 approved record exists (T054)
  const inc13ApprovedPath = path.join(SITE_DIR, 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  if (!fs.existsSync(inc13ApprovedPath)) {
    logFail('INC-0013 approved record (T054) missing from site/data/incidents/');
    passed = false;
  } else {
    logPass('INC-0013 approved record present in site/ (T054)');
  }

  // Summary
  const readyCount = shortlist.items.filter(i => i.case_quality_ready).length;
  logInfo(`${readyCount} items ready for Control Tower review`);

  const topReady = shortlist.items.find(i => i.case_quality_ready);
  if (topReady) {
    logInfo(`Top ready: ${topReady.packet_id} - ${topReady.recommended_action}`);
  }

  console.log('\n' + '='.repeat(50));
  if (passed) {
    console.log('\x1b[32mSHORTLIST VALIDATION PASSED\x1b[0m');
  } else {
    console.log('\x1b[31mSHORTLIST VALIDATION FAILED\x1b[0m');
    process.exit(1);
  }
  console.log('='.repeat(50));

  return passed;
}

validate();
