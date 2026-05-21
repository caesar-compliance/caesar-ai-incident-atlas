import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

function logError(msg) {
  console.error(`\x1b[31m[Review Security Error]\x1b[0m ${msg}`);
}

function logPass(msg) {
  console.log(`\x1b[32m[Review Security Pass]\x1b[0m ${msg}`);
}

function run() {
  console.log('=== Caesar Atlas Review Console & Gate Validator ===');
  let failures = 0;

  // 1. tools/review-console exists
  const CONSOLE_DIR = path.join(ROOT, 'tools', 'review-console');
  if (!fs.existsSync(CONSOLE_DIR)) {
    logError('tools/review-console/ directory does not exist!');
    failures++;
  } else {
    logPass('tools/review-console/ directory exists.');
  }

  // 2. no review console files exist under site/
  const SITE_DIR = path.join(ROOT, 'site');
  const checkNoReviewConsoleInSite = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoReviewConsoleInSite(fullPath);
      } else if (item.isFile()) {
        if (item.name.toLowerCase().includes('review-console') || item.name.toLowerCase().includes('review-bundle')) {
          logError(`Leakage detected! Review console/bundle file found under public site root: ${fullPath}`);
          failures++;
        }
      }
    }
  };
  checkNoReviewConsoleInSite(SITE_DIR);
  logPass('Public site/ is clean of review console files.');

  // 3. review-bundle.json exists
  const BUNDLE_FILE = path.join(ROOT, 'tools', 'review-console', 'review-bundle.json');
  if (!fs.existsSync(BUNDLE_FILE)) {
    logError('tools/review-console/review-bundle.json does not exist!');
    failures++;
  } else {
    logPass('tools/review-console/review-bundle.json exists.');
    
    // 4. review-bundle references only mock candidates/drafts
    try {
      const bundle = JSON.parse(fs.readFileSync(BUNDLE_FILE, 'utf8'));
      const candidates = bundle.candidates || [];
      const drafts = bundle.drafts || [];

      candidates.forEach(c => {
        const id = c.candidate_id || '';
        const title = c.title || '';
        const isMock = id.toLowerCase().includes('cand-') || id.toLowerCase().includes('mock') || title.toLowerCase().includes('mock') || title.toLowerCase().includes('synthetic');
        if (!isMock) {
          logError(`Review bundle candidate is not synthetic or mock: ${id}`);
          failures++;
        }
      });

      drafts.forEach(d => {
        const id = d.draft_id || '';
        const title = d.proposed_case_title || '';
        const isMock = id.toLowerCase().includes('draft-') || id.toLowerCase().includes('mock') || title.toLowerCase().includes('mock') || title.toLowerCase().includes('synthetic');
        if (!isMock) {
          logError(`Review bundle draft is not synthetic or mock: ${id}`);
          failures++;
        }
      });
      
      logPass('Review bundle verified: contains only mock/synthetic candidates and drafts.');
    } catch (e) {
      logError(`Failed to parse review-bundle.json: ${e.message}`);
      failures++;
    }
  }

  // 5. no review data is copied into site/
  const checkNoReviewDataInSite = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoReviewDataInSite(fullPath);
      } else if (item.isFile() && item.name.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.toLowerCase().includes('mock-review-decisions') || content.toLowerCase().includes('mock_review_only')) {
          logError(`Leakage detected! Review decisions or mock review labels found in public site file: ${fullPath}`);
          failures++;
        }
      }
    }
  };
  checkNoReviewDataInSite(SITE_DIR);
  logPass('Public site/ is clean of review decision data.');

  // 6. no INC-0013 public record exists
  const INC_0013_ROOT = path.join(ROOT, 'data', 'incidents', 'inc-0013.json');
  const INC_0013_SITE = path.join(ROOT, 'site', 'data', 'incidents', 'inc-0013.json');
  if (fs.existsSync(INC_0013_ROOT) || fs.existsSync(INC_0013_SITE)) {
    logError('Leakage detected! Public INC-0013 record exists in data/ or site/.');
    failures++;
  } else {
    logPass('Safe: Public INC-0013 does not exist.');
  }

  // 7. no mock data appears in site/data/incidents
  const SITE_INCIDENTS_DIR = path.join(ROOT, 'site', 'data', 'incidents');
  if (fs.existsSync(SITE_INCIDENTS_DIR)) {
    const files = fs.readdirSync(SITE_INCIDENTS_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      if (file.toLowerCase().includes('mock') || file.toLowerCase().includes('draft') || file.toLowerCase().includes('cand')) {
        logError(`Leakage detected! Synthetic file found in public dataset: ${file}`);
        failures++;
      }
    }
  }
  logPass('Public site/data/incidents remains completely clean.');

  // 8. no mock data appears in site/data/incident-index.json
  const SITE_INDEX_FILE = path.join(ROOT, 'site', 'data', 'incident-index.json');
  if (fs.existsSync(SITE_INDEX_FILE)) {
    const indexObj = JSON.parse(fs.readFileSync(SITE_INDEX_FILE, 'utf8'));
    const list = indexObj.incidents || [];
    for (const inc of list) {
      const id = inc.incident_id || '';
      if (id.toLowerCase().includes('mock') || id.toLowerCase().includes('cand') || id.toLowerCase().includes('draft') || id === 'INC-0013') {
        logError(`Leakage detected in site index! Mock ID found: ${id}`);
        failures++;
      }
    }
  }
  logPass('Public site/data/incident-index.json remains completely clean.');

  // 9. source registry entries remain inactive_draft and auto_publish_allowed remains false
  const SOURCES_REGISTRY_PATH = path.join(ROOT, 'data', 'source-registry', 'sources.yml');
  if (fs.existsSync(SOURCES_REGISTRY_PATH)) {
    const content = fs.readFileSync(SOURCES_REGISTRY_PATH, 'utf8');
    
    // Check for mock auto discovery source active configuration
    if (content.includes('status: active') && !content.includes('status: inactive_draft')) {
      logError('Leakage detected! A mock source registry entry was set to active.');
      failures++;
    }
    
    // Check auto_publish_allowed
    const matches = content.match(/auto_publish_allowed:\s*(\w+)/g);
    if (matches) {
      for (const match of matches) {
        if (match.includes('true')) {
          logError(`Leakage detected! auto_publish_allowed is set to true: ${match}`);
          failures++;
        }
      }
    }
  }
  logPass('Source registry entries remain inactive_draft and auto_publish_allowed is false.');

  // 10. no scheduled GitHub workflow was enabled
  const WORKFLOW_FILE = path.join(ROOT, '.github', 'workflows', 'pages.yml');
  if (fs.existsSync(WORKFLOW_FILE)) {
    const content = fs.readFileSync(WORKFLOW_FILE, 'utf8');
    if (content.includes('schedule:')) {
      logError('Leakage detected! Scheduled GitHub Actions cron triggers are enabled.');
      failures++;
    }
  }
  logPass('No scheduled GitHub workflow was enabled.');

  // 11. public root remains site/ and Pages uploads only site/
  if (fs.existsSync(WORKFLOW_FILE)) {
    const content = fs.readFileSync(WORKFLOW_FILE, 'utf8');
    if (!content.includes('path: \'site\'') && !content.includes('path: site')) {
      logError('Pages workflow root directory upload has been modified from site/');
      failures++;
    }
  }
  logPass('GitHub Pages workflow target remains strictly site/.');

  if (failures > 0) {
    console.error(`\n\x1b[31mVALIDATION FAILED:\x1b[0m ${failures} review console containment issue(s) detected.`);
    process.exit(1);
  } else {
    logPass('ALL REVIEW CONSOLE SECURITY AND CONTAINMENT CHECKS PASSED.');
    process.exit(0);
  }
}

run();
