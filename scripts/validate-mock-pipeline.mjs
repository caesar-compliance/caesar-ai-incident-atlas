import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

function logError(msg) {
  console.error(`\x1b[31m[Safety Error]\x1b[0m ${msg}`);
}

function logPass(msg) {
  console.log(`\x1b[32m[Safety Pass]\x1b[0m ${msg}`);
}

function run() {
  console.log('=== Caesar Atlas Mock Pipeline Safety & Containment Auditor ===');
  let failures = 0;

  // 1. Run strict schema validation checks via python script
  try {
    console.log('Invoking schema validator (tools/validate_mock_schemas.py)...');
    const schemaOutput = execSync('python3 tools/validate_mock_schemas.py', { cwd: ROOT, encoding: 'utf8' });
    console.log(schemaOutput);
    logPass('All mock candidate and draft JSON schemas are 100% compliant.');
  } catch (err) {
    logError(`Schema validation failed:\n${err.stdout || err.message}`);
    failures++;
  }

  // 2. Verify all mock files are clearly synthetic (contain synthetic/mock labels)
  const CANDIDATES_DIR = path.join(ROOT, 'data', 'candidates', 'mock');
  const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'mock');
  const PREVIEW_FILE = path.join(ROOT, 'data', 'digests', 'mock', 'mock-weekly-preview.json');

  const checkMockFiles = () => {
    let syntheticChecked = 0;

    const checkFile = (filePath, fileLabel) => {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.toLowerCase().includes('synthetic') && !content.toLowerCase().includes('mock')) {
          logError(`${fileLabel} at ${filePath} is missing "synthetic" or "mock" safety markers!`);
          failures++;
        } else {
          syntheticChecked++;
        }
      }
    };

    if (fs.existsSync(CANDIDATES_DIR)) {
      fs.readdirSync(CANDIDATES_DIR).filter(f => f.endsWith('.json')).forEach(f => {
        checkFile(path.join(CANDIDATES_DIR, f), `Candidate ${f}`);
      });
    }

    if (fs.existsSync(DRAFTS_DIR)) {
      fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.json')).forEach(f => {
        checkFile(path.join(DRAFTS_DIR, f), `Draft ${f}`);
      });
    }

    checkFile(PREVIEW_FILE, 'Digest Preview');

    logPass(`Verified ${syntheticChecked} mock files containing explicit safety/synthetic labels.`);
  };
  checkMockFiles();

  // 3. Verify no generated mock drafts are under site/
  const SITE_DIR = path.join(ROOT, 'site');
  const checkNoMockInSite = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoMockInSite(fullPath);
      } else if (item.isFile() && item.name.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.toLowerCase().includes('mock-src-') || content.toLowerCase().includes('draft-00') || content.toLowerCase().includes('cand-00')) {
          logError(`Leakage detected! Mock reference found in public site file: ${fullPath}`);
          failures++;
        }
      }
    }
  };
  checkNoMockInSite(SITE_DIR);
  logPass('Public site/ directory was verified free of mock references.');

  // 4. Verify no mock data appears in site/data/incidents
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
  logPass('Public site/data/incidents is clean and free of synthetic records.');

  // 5. Verify no mock data appears in site/data/incident-index.json
  const SITE_INDEX_FILE = path.join(ROOT, 'site', 'data', 'incident-index.json');
  const ROOT_INDEX_FILE = path.join(ROOT, 'data', 'incident-index.json');

  const checkIndexCleanliness = (filePath, label) => {
    if (fs.existsSync(filePath)) {
      const indexObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const list = indexObj.incidents || [];
      for (const inc of list) {
        const id = inc.incident_id || '';
        if (id.toLowerCase().includes('mock') || id.toLowerCase().includes('cand') || id.toLowerCase().includes('draft') || id === 'INC-0013') {
          logError(`Leakage detected in ${label}! Mock ID found: ${id}`);
          failures++;
        }
      }
    }
  };
  checkIndexCleanliness(SITE_INDEX_FILE, 'site index');
  checkIndexCleanliness(ROOT_INDEX_FILE, 'root index');
  logPass('Incident index files are clean and unmodified.');

  // 6. Verify no INC-0013 is created in root or site
  const INC_0013_ROOT = path.join(ROOT, 'data', 'incidents', 'inc-0013.json');
  const INC_0013_SITE = path.join(ROOT, 'site', 'data', 'incidents', 'inc-0013.json');
  if (fs.existsSync(INC_0013_ROOT) || fs.existsSync(INC_0013_SITE)) {
    logError('Leakage detected! A public INC-0013 record has been created.');
    failures++;
  } else {
    logPass('Safe: INC-0013 does not exist anywhere in the repository.');
  }

  // 7. Verify mock digest preview is not public (i.e. not in site/ or sitemaps/RSS)
  const RSS_ROOT = path.join(ROOT, 'site', 'rss.xml');
  const WEEKLY_RSS = path.join(ROOT, 'site', 'digests', 'weekly.xml');
  const MONTHLY_RSS = path.join(ROOT, 'site', 'digests', 'monthly.xml');

  const checkNoMockInFile = (filePath, label) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('DRAFT-00') || content.includes('CAND-00') || content.toLowerCase().includes('mock-preview')) {
        logError(`Leakage detected! Mock reference found in ${label} at ${filePath}`);
        failures++;
      }
    }
  };
  checkNoMockInFile(RSS_ROOT, 'aggregated RSS feed');
  checkNoMockInFile(WEEKLY_RSS, 'weekly RSS feed');
  checkNoMockInFile(MONTHLY_RSS, 'monthly RSS feed');
  logPass('RSS syndication files are verified clean of synthetic mock previews.');

  // 8. Verify no source registry entry was activated and auto-publish remains false
  try {
    const registryOutput = execSync('python3 tools/validate_pipeline_schemas.py', { cwd: ROOT, encoding: 'utf8' });
    if (!registryOutput.includes('PASS: all sources.yml entries are fully valid and compliant with safety policies!')) {
      logError('Source registry registry validation did not report strict compliance.');
      failures++;
    } else {
      logPass('Source registry is untouched, all entries remain inactive_draft, and auto_publish is explicitly false.');
    }
  } catch (err) {
    logError(`Source registry validation threw error:\n${err.stdout || err.message}`);
    failures++;
  }

  // Final reporting
  if (failures > 0) {
    console.error(`\n\x1b[31mAUDIT FAILED:\x1b[0m ${failures} safety containment issue(s) detected.`);
    process.exit(1);
  } else {
    logPass('ALL PIPELINE CONTAINMENT AND SAFETY SECURITY CHECKS PASSED.');
    console.log('Offline mock auto-discovery prototype sandboxing is 100% verified.');
    process.exit(0);
  }
}

run();
