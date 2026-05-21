#!/usr/bin/env node
/**
 * Caesar AI Incident Atlas — Public Site Smoke Validator
 * Checks that site/ is clean, complete, and safe for public deployment.
 *
 * Run with: node scripts/validate-public-site.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);
const SITE       = path.join(ROOT, 'site');

let failures = 0;
let passes   = 0;

function pass(msg)  { console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`); passes++; }
function fail(msg)  { console.error(`\x1b[31m[FAIL]\x1b[0m ${msg}`); failures++; }
function info(msg)  { console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`); }

function checkExists(relPath, label) {
  const full = path.join(SITE, relPath);
  if (fs.existsSync(full)) pass(`${label} exists: ${relPath}`);
  else fail(`${label} missing: ${relPath}`);
}

function checkAbsent(relPath, label) {
  const full = path.join(SITE, relPath);
  if (!fs.existsSync(full)) pass(`${label} correctly absent: ${relPath}`);
  else fail(`${label} must NOT exist under site/: ${relPath}`);
}

function scanForForbiddenPatterns(dir, patterns, label) {
  if (!fs.existsSync(dir)) return;
  const walk = (d) => {
    const items = fs.readdirSync(d, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(d, item.name);
      const rel  = path.relative(SITE, full);
      if (item.isDirectory()) {
        if (patterns.some(p => typeof p === 'string' ? item.name === p : p.test(item.name))) {
          fail(`${label} — forbidden directory found: site/${rel}/`);
        } else {
          walk(full);
        }
      } else if (item.isFile()) {
        if (patterns.some(p => typeof p === 'string' ? item.name.includes(p) : p.test(item.name))) {
          fail(`${label} — forbidden file found: site/${rel}`);
        }
      }
    }
  };
  walk(dir);
}

function run() {
  console.log('=== Caesar Public Site Smoke Validator ===\n');

  /* 1. Core files */
  checkExists('index.html', 'Root page');
  checkExists('assets/app.js', 'App JS');
  checkExists('assets/styles.css', 'Stylesheet');

  /* 2. Dataset index — must have exactly 13 records */
  const indexPath = path.join(SITE, 'data', 'incident-index.json');
  if (!fs.existsSync(indexPath)) {
    fail('site/data/incident-index.json missing');
  } else {
    try {
      const idx = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      const count = (idx.incidents || []).length;
      if (count === 13) pass(`incident-index.json has exactly 13 records`);
      else              fail(`incident-index.json has ${count} records — expected exactly 13`);
    } catch (e) {
      fail(`Could not parse incident-index.json: ${e.message}`);
    }
  }

  /* 3. INC-0013 published record */
  checkExists(
    'data/incidents/INC-0013-edpb-automated-decision-making-profiling-guidance.json',
    'INC-0013 published record'
  );

  /* 4. INC-0013 has correct record_type */
  const inc0013Path = path.join(SITE, 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  if (fs.existsSync(inc0013Path)) {
    try {
      const rec = JSON.parse(fs.readFileSync(inc0013Path, 'utf8'));
      if (rec.record_type === 'guidance' || rec.record_type === 'governance_case')
        pass(`INC-0013 record_type is "${rec.record_type}" (correct — not incident)`);
      else
        fail(`INC-0013 record_type is "${rec.record_type}" — expected guidance or governance_case`);
    } catch (e) {
      fail(`Could not parse INC-0013 record: ${e.message}`);
    }
  }

  /* 5. No INC-0014 */
  const incDir = path.join(SITE, 'data', 'incidents');
  if (fs.existsSync(incDir)) {
    const inc0014 = fs.readdirSync(incDir).filter(f => f.toUpperCase().startsWith('INC-0014'));
    if (inc0014.length === 0) pass('No INC-0014 exists under site/');
    else                      fail(`INC-0014 file(s) found under site/: ${inc0014.join(', ')}`);
  }

  /* 6. Case pages exist */
  checkExists('cases/index.html', 'Cases directory index');
  checkExists('cases/INC-0013-edpb-automated-decision-making-profiling-guidance/index.html', 'INC-0013 case page');

  /* 7. Count case pages */
  const casesDir = path.join(SITE, 'cases');
  if (fs.existsSync(casesDir)) {
    const caseDirs = fs.readdirSync(casesDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.startsWith('INC-'));
    if (caseDirs.length === 13)
      pass(`site/cases/ has 13 case subdirectories`);
    else
      fail(`site/cases/ has ${caseDirs.length} case subdirectories — expected 13`);
  }

  /* 8. No candidates, drafts, packets, previews, source-verifications under site/ */
  const FORBIDDEN_DIRS = ['candidates', 'drafts', 'packets', 'previews', 'source-verifications', 'admin'];
  for (const d of FORBIDDEN_DIRS) checkAbsent(d, `Forbidden dir "${d}"`);

  /* 9. No stale inc-0013.json */
  checkAbsent('data/incidents/inc-0013.json', 'Old lowercase inc-0013.json');

  /* 10. No .env / secrets */
  const secretPatterns = [/^\.env/, /\.secret$/, /secrets?\.(json|yaml|yml)$/i];
  scanForForbiddenPatterns(SITE, secretPatterns, 'Secrets file');
  pass('No secrets files detected under site/');

  /* 11. No external CDN scripts in index.html */
  const indexHtml = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
  const cdnRx = /src=["']https?:\/\/(?!atlas\.caesar\.no)/i;
  if (cdnRx.test(indexHtml)) fail('External CDN script detected in site/index.html');
  else                        pass('No external CDN scripts in index.html');

  /* 12. RSS feeds present */
  checkExists('rss.xml', 'Main RSS feed');
  checkExists('digests/weekly.xml', 'Weekly RSS feed');
  checkExists('digests/monthly.xml', 'Monthly RSS feed');

  /* Summary */
  console.log('\n' + '─'.repeat(50));
  if (failures === 0) {
    console.log(`\x1b[32mPASS:\x1b[0m All ${passes} public site checks passed.`);
    process.exit(0);
  } else {
    console.error(`\x1b[31mFAIL:\x1b[0m ${failures} check(s) failed, ${passes} passed.`);
    process.exit(1);
  }
}

run();
