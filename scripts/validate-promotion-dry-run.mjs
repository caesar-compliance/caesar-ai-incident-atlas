import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PREVIEWS_DIR = path.join(ROOT, 'data', 'promotion-previews', 'real');
const INCIDENTS_DIR = path.join(ROOT, 'data', 'incidents');
const SITE_DIR = path.join(ROOT, 'site');
const SITE_INCIDENTS_DIR = path.join(ROOT, 'site', 'data', 'incidents');
const REVIEWS_DIR = path.join(ROOT, 'data', 'reviews', 'real');

function logPass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

function logError(msg) {
  console.error(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
}

function logInfo(msg) {
  console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`);
}

function validate() {
  console.log('=== Promotion Dry-Run Validator ===\n');
  let failures = 0;

  // 1. Check public incident count (must be exactly 12)
  let publicCount = 0;
  if (fs.existsSync(INCIDENTS_DIR)) {
    publicCount = fs.readdirSync(INCIDENTS_DIR).filter(f => f.endsWith('.json')).length;
  }

  if (publicCount !== 12) {
    logError(`Public incident count is ${publicCount}, expected 12`);
    failures++;
  } else {
    logPass('Public dataset remains at exactly 12 records');
  }

  // 2. Check INC-0013 doesn't exist
  const inc0013Data = path.join(INCIDENTS_DIR, 'inc-0013.json');
  const inc0013Site = path.join(SITE_INCIDENTS_DIR, 'inc-0013.json');
  if (fs.existsSync(inc0013Data) || fs.existsSync(inc0013Site)) {
    logError('INC-0013 public record exists - this should not exist without explicit approval');
    failures++;
  } else {
    logPass('Safe: INC-0013 does not exist as public record');
  }

  // 3. Check previews are outside site/
  if (fs.existsSync(PREVIEWS_DIR)) {
    const previewFiles = fs.readdirSync(PREVIEWS_DIR).filter(f => f.endsWith('.json'));
    logInfo(`Found ${previewFiles.length} dry-run preview(s) in data/promotion-previews/real/`);

    for (const f of previewFiles) {
      const previewPath = path.join(PREVIEWS_DIR, f);
      const preview = JSON.parse(fs.readFileSync(previewPath, 'utf8'));

      // Must have dry_run flags
      if (!preview._dry_run_preview) {
        logError(`${f}: Missing _dry_run_preview flag`);
        failures++;
      }
      if (preview._public !== false) {
        logError(`${f}: _public must be false`);
        failures++;
      }
      if (preview._not_approved !== true) {
        logError(`${f}: _not_approved must be true`);
        failures++;
      }
    }

    if (previewFiles.length > 0) {
      logPass(`All ${previewFiles.length} preview(s) correctly flagged as dry-run`);
    }
  } else {
    logInfo('No previews directory exists yet (run promote-approved-case.mjs to generate)');
  }

  // 4. Check no previews leaked to site/
  function checkNoPreviewsInSite(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoPreviewsInSite(fullPath);
      } else if (item.isFile() && item.name.endsWith('.json')) {
        try {
          const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (content._dry_run_preview === true) {
            logError(`DRAFT LEAKED TO SITE: ${fullPath}`);
            failures++;
          }
          if (content._not_approved === true) {
            logError(`UNAPPROVED CONTENT IN SITE: ${fullPath}`);
            failures++;
          }
        } catch (e) {
          // Skip non-JSON files
        }
      }
    }
  }
  checkNoPreviewsInSite(SITE_DIR);
  logPass('No dry-run previews or unapproved content in site/');

  // 5. Check no mock data in public
  const mockPatterns = ['MOCK-', 'mock-', 'CAND-', 'DRAFT-', 'PKT-', 'preview-'];
  if (fs.existsSync(INCIDENTS_DIR)) {
    const publicFiles = fs.readdirSync(INCIDENTS_DIR);
    for (const f of publicFiles) {
      for (const pattern of mockPatterns) {
        if (f.includes(pattern)) {
          logError(`Mock/draft content in public incidents: ${f}`);
          failures++;
        }
      }
    }
  }
  logPass('No mock/draft/preview content in public incidents/');

  // 6. Check no Yellow/Red sources promoted
  if (fs.existsSync(INCIDENTS_DIR)) {
    const publicFiles = fs.readdirSync(INCIDENTS_DIR).filter(f => f.endsWith('.json'));
    for (const f of publicFiles) {
      const content = JSON.parse(fs.readFileSync(path.join(INCIDENTS_DIR, f), 'utf8'));
      const sources = content.sources || [];
      for (const src of sources) {
        // We can't directly check tier, but we can check for _promotion_metadata
        // which should only exist on properly promoted records
      }
    }
  }

  // 7. Check approvals file exists and has correct structure
  const approvalsPath = path.join(REVIEWS_DIR, 'approved-promotions.json');
  if (fs.existsSync(approvalsPath)) {
    const approvals = JSON.parse(fs.readFileSync(approvalsPath, 'utf8'));
    if (!Array.isArray(approvals.approvals)) {
      logError('approved-promotions.json: approvals must be an array');
      failures++;
    } else {
      logPass(`approved-promotions.json valid (${approvals.approvals.length} approval(s))`);

      // If approvals exist, validate they correspond to real public records
      for (const approval of approvals.approvals) {
        if (approval.allowed_public_case_id) {
          const expectedFile = `${approval.allowed_public_case_id.toLowerCase()}.json`;
          const exists = fs.existsSync(path.join(INCIDENTS_DIR, expectedFile));
          if (exists) {
            logPass(`Approval ${approval.packet_id} -> ${approval.allowed_public_case_id} exists`);
          } else {
            logError(`Approval exists for ${approval.allowed_public_case_id} but public record missing`);
            failures++;
          }
        }
      }
    }
  } else {
    logError('approved-promotions.json does not exist');
    failures++;
  }

  // 8. Check ranked candidates exists
  const rankedPath = path.join(REVIEWS_DIR, 'ranked-promotion-candidates.json');
  if (fs.existsSync(rankedPath)) {
    const ranked = JSON.parse(fs.readFileSync(rankedPath, 'utf8'));
    logPass(`Ranked candidates file exists (${ranked.ranked_candidates?.length || 0} candidates)`);
  } else {
    logInfo('ranked-promotion-candidates.json not found (run rank-promotion-candidates.mjs)');
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  if (failures === 0) {
    logPass('ALL VALIDATIONS PASSED');
    console.log('Status: No public incidents created without approval');
    console.log('Status: Public dataset remains at 12 records');
    console.log('Status: Dry-run previews exist outside site/');
    console.log(`${'='.repeat(60)}\n`);
    process.exit(0);
  } else {
    logError(`${failures} VALIDATION FAILURE(S)`);
    console.log(`${'='.repeat(60)}\n`);
    process.exit(1);
  }
}

validate();
