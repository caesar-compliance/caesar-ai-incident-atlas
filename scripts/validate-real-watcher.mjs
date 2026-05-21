import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

function logError(msg) {
  console.error(`\x1b[31m[Safety Error]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[Safety Warning]\x1b[0m ${msg}`);
}

function logPass(msg) {
  console.log(`\x1b[32m[Safety Pass]\x1b[0m ${msg}`);
}

function scanDirRecursive(dir, ext = '.json', list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanDirRecursive(fullPath, ext, list);
    } else if (item.isFile() && item.name.endsWith(ext)) {
      list.push(fullPath);
    }
  }
  return list;
}

function runValidation() {
  console.log('=== Caesar Atlas Real Watcher Compliance & Containment Auditor ===');
  let failures = 0;

  // 1. Verify real watcher config exists and only includes Green targets
  const CONFIG_PATH = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
  if (!fs.existsSync(CONFIG_PATH)) {
    logError('Watcher targets config does not exist!');
    failures++;
  } else {
    try {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      const nonGreen = config.filter(t => t.source_tier !== 'green');
      if (nonGreen.length > 0) {
        logError(`Watcher config contains non-green targets: ${nonGreen.map(t => t.source_id).join(', ')}`);
        failures++;
      } else {
        logPass('Watcher config targets are strictly green tier.');
      }

      // 2. Verify AIID/OECD/AIAAIC are NOT in real watcher config
      const excludedIds = ['oecd-ai-incidents', 'aiid-discovery-reference', 'aiaaic-discovery-reference'];
      const foundExcluded = config.filter(t => excludedIds.includes(t.source_id));
      if (foundExcluded.length > 0) {
        logError(`Watcher config contains reference databases: ${foundExcluded.map(t => t.source_id).join(', ')}`);
        failures++;
      } else {
        logPass('AIID/OECD/AIAAIC databases are not present in real watcher targets.');
      }
    } catch (e) {
      logError(`Failed to parse watcher config: ${e.message}`);
      failures++;
    }
  }

  // 3. Verify no real watcher output exists under site/
  const SITE_DIR = path.join(ROOT, 'site');
  const checkNoWatcherInSite = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoWatcherInSite(fullPath);
      } else if (item.isFile()) {
        if (item.name.toLowerCase().includes('real-candidates') || item.name.toLowerCase().includes('real-review-bundle')) {
          logError(`Leakage detected! Real watcher files found under public site root: ${fullPath}`);
          failures++;
        }
      }
    }
  };
  checkNoWatcherInSite(SITE_DIR);
  logPass('Public site/ is completely clean of real watcher outputs.');

  // 4. Verify public incident count matches approved baseline (T054: 13 records)
  const INCIDENTS_DIR = path.join(ROOT, 'data', 'incidents');
  const approvalsPathW = path.join(ROOT, 'data', 'reviews', 'real', 'approved-promotions.json');
  let approvedCountW = 0;
  if (fs.existsSync(approvalsPathW)) {
    try { approvedCountW = (JSON.parse(fs.readFileSync(approvalsPathW,'utf8')).approvals||[]).length; } catch(e){}
  }
  const expectedW = 12 + approvedCountW;
  if (fs.existsSync(INCIDENTS_DIR)) {
    const files = fs.readdirSync(INCIDENTS_DIR).filter(f => f.endsWith('.json'));
    if (files.length !== expectedW) {
      logError(`Public incident count has changed! Expected ${expectedW}, found ${files.length}.`);
      failures++;
    } else {
      logPass(`Incident dataset matches expected count: ${expectedW} records.`);
    }
  }

  // 5. Verify INC-0013 approved record exists (T054 CT approval)
  const INC_0013_APPROVED = path.join(ROOT, 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  const INC_0013_SITE_APPROVED = path.join(ROOT, 'site', 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  if (!fs.existsSync(INC_0013_APPROVED) || !fs.existsSync(INC_0013_SITE_APPROVED)) {
    logError('INC-0013 approved record (T054) is missing from data/ or site/');
    failures++;
  } else {
    logPass('INC-0013 approved record present in data/ and site/ (T054).');
  }

  // 6. Verify no scheduled GitHub workflow was enabled
  const WORKFLOW_FILE = path.join(ROOT, '.github', 'workflows', 'pages.yml');
  if (fs.existsSync(WORKFLOW_FILE)) {
    const content = fs.readFileSync(WORKFLOW_FILE, 'utf8');
    if (content.includes('schedule:')) {
      logError('Leakage detected! Scheduled GitHub Actions workflows are enabled.');
      failures++;
    } else {
      logPass('Safe: GitHub Actions schedule triggers remain disabled.');
    }
  }

  // 7. Verify all source registry entries have auto_publish_allowed: false and inactive_draft
  const REGISTRY_FILE = path.join(ROOT, 'data', 'source-registry', 'sources.yml');
  if (fs.existsSync(REGISTRY_FILE)) {
    const content = fs.readFileSync(REGISTRY_FILE, 'utf8');
    if (content.includes('auto_publish_allowed: true')) {
      logError('Registry contains auto_publish_allowed: true!');
      failures++;
    } else {
      logPass('Safe: All registry entries have auto_publish_allowed set to false.');
    }
    // Check if status is set to active (which is forbidden)
    const matches = content.match(/status:\s*(\w+)/g);
    if (matches) {
      for (const match of matches) {
        if (match.includes('active') && !match.includes('inactive_draft')) {
          logError(`Source registry contains active status: ${match}`);
          failures++;
        }
      }
    }
    logPass('Registry entries remain untouched as inactive_draft.');
  }

  // 8. Verify real-review-bundle.json is outside site/
  const REAL_BUNDLE = path.join(ROOT, 'tools', 'review-console', 'real-review-bundle.json');
  if (fs.existsSync(REAL_BUNDLE)) {
    logPass('Real review bundle exists locally in tools/review-console/ (outside site/).');
  } else {
    logWarning('tools/review-console/real-review-bundle.json does not exist yet. Please build it first.');
  }

  // 8b. Verify latest-watch-summary.json exists after a watcher run
  const LATEST_SUMMARY = path.join(ROOT, 'data', 'watch', 'runs', 'latest-watch-summary.json');
  if (fs.existsSync(LATEST_SUMMARY)) {
    logPass('latest-watch-summary.json exists in data/watch/runs/.');
  } else {
    logWarning('data/watch/runs/latest-watch-summary.json not found. Run watch-green-sources.mjs first.');
  }

  // 8c. Verify watcher config has fallback_urls on all enabled targets
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    const missingFallback = config.filter(t => t.enabled_for_manual_watch && (!t.fallback_urls || t.fallback_urls.length === 0));
    if (missingFallback.length > 0) {
      logWarning(`${missingFallback.length} enabled target(s) lack fallback_urls: ${missingFallback.map(t => t.source_id).join(', ')}`);
    } else {
      logPass('All enabled watch targets have fallback_urls configured.');
    }
  } catch (e) {
    // already caught above
  }

  // 8d. Verify no real drafts or promotion packets under site/
  const checkNoLocalPipelineInSite = (dir, label) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoLocalPipelineInSite(fullPath, label);
      } else if (item.isFile()) {
        const nameLower = item.name.toLowerCase();
        if (nameLower.includes('draft') || nameLower.includes('promotion') || nameLower.includes('packet')) {
          logError(`Leakage detected! ${label} file found under public site root: ${fullPath}`);
          failures++;
        }
      }
    }
  };
  checkNoLocalPipelineInSite(SITE_DIR, 'Draft/Promotion');
  logPass('Public site/ is clean of draft and promotion packet files.');

  // 9. Verify candidate files contain no full HTML body fields, have status real_detected, and source_tier green
  const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
  if (fs.existsSync(REAL_CANDIDATES_DIR)) {
    const candidates = scanDirRecursive(REAL_CANDIDATES_DIR, '.json');
    let candChecked = 0;
    
    for (const candPath of candidates) {
      try {
        const cand = JSON.parse(fs.readFileSync(candPath, 'utf8'));
        candChecked++;

        // Strict validation checks
        if (cand.body || cand.html || cand.full_text || cand.page_body || cand.text_content) {
          logError(`Candidate ${cand.candidate_id} contains HTML body / full text fields!`);
          failures++;
        }
        if (cand.status !== 'real_detected') {
          logError(`Candidate ${cand.candidate_id} has invalid status: ${cand.status} (expected 'real_detected').`);
          failures++;
        }
        if (cand.source_tier !== 'green') {
          logError(`Candidate ${cand.candidate_id} has non-green source tier: ${cand.source_tier}.`);
          failures++;
        }
      } catch (e) {
        logError(`Failed to parse candidate file at ${candPath}: ${e.message}`);
        failures++;
      }
    }
    logPass(`Audited ${candChecked} real candidate files for schema compliance and metadata safety.`);
  } else {
    logPass('No real candidates directory exists yet to audit.');
  }

  // 10. Verify no secrets/env files were added
  const filesInRoot = fs.readdirSync(ROOT);
  const secretFiles = filesInRoot.filter(f => f === '.env' || f.includes('secret') || f.includes('keyfile'));
  if (secretFiles.length > 0) {
    logError(`Prohibited files found in root: ${secretFiles.join(', ')}`);
    failures++;
  } else {
    logPass('Safe: No secrets/env files were found.');
  }

  if (failures > 0) {
    console.error(`\n\x1b[31mVALIDATION FAILED:\x1b[0m ${failures} compliance and containment issue(s) detected.`);
    process.exit(1);
  } else {
    logPass('ALL REAL WATCHER COMPLIANCE AND SAFETY CONTAINMENT CHECKS PASSED.');
    process.exit(0);
  }
}

runValidation();
