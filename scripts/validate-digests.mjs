#!/usr/bin/env node
/**
 * Caesar AI Incident Atlas — Digest Validator
 * Run with: node scripts/validate-digests.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const INCIDENT_INDEX_PATH = path.join(ROOT, 'data', 'incident-index.json');
const DATA_DIGESTS_DIR = path.join(ROOT, 'data', 'digests');
const SITE_DIGESTS_DIR = path.join(ROOT, 'site', 'data', 'digests');

// Mandatory fields in digest JSON files
const MANDATORY_FIELDS = [
  'digest_id',
  'digest_type',
  'title',
  'period_start',
  'period_end',
  'generated_at',
  'case_count',
  'included_case_ids',
  'key_themes',
  'legal_commercial_takeaways',
  'governance_lessons',
  'evidence_actions',
  'source_note',
  'status'
];

function logError(msg) {
  console.error(`\x1b[31m[Error]\x1b[0m ${msg}`);
}

function logPass(msg) {
  console.log(`\x1b[32m[Pass]\x1b[0m ${msg}`);
}

function validate() {
  console.log('Running Caesar static digest validation checks...');

  // 1. Load active incident IDs
  if (!fs.existsSync(INCIDENT_INDEX_PATH)) {
    logError(`Incident index not found at ${INCIDENT_INDEX_PATH}`);
    process.exit(1);
  }

  let activeIncidents = new Set();
  try {
    const indexData = JSON.parse(fs.readFileSync(INCIDENT_INDEX_PATH, 'utf-8'));
    if (!indexData.incidents || !Array.isArray(indexData.incidents)) {
      logError('Incident index root does not contain valid incidents array.');
      process.exit(1);
    }
    for (const inc of indexData.incidents) {
      if (inc.incident_id) {
        activeIncidents.add(inc.incident_id);
      }
    }
  } catch (err) {
    logError(`Failed to parse incident-index.json: ${err.message}`);
    process.exit(1);
  }

  logPass(`Loaded ${activeIncidents.size} active incidents for cross-reference.`);

  // 2. Discover all digest JSON files in data/digests/weekly/ and data/digests/monthly/
  let digestFiles = [];
  
  const collectFiles = (subDir) => {
    const fullPath = path.join(DATA_DIGESTS_DIR, subDir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.json'));
      for (const f of files) {
        digestFiles.push({
          subDir,
          fileName: f,
          rootPath: path.join(fullPath, f),
          sitePath: path.join(SITE_DIGESTS_DIR, subDir, f)
        });
      }
    }
  };

  collectFiles('weekly');
  collectFiles('monthly');

  if (digestFiles.length === 0) {
    logError('No digest JSON files found in data/digests/ directories.');
    process.exit(1);
  }

  let errorCount = 0;

  for (const file of digestFiles) {
    console.log(`Validating ${file.subDir}/${file.fileName} ...`);

    // Ensure root file exists
    let content;
    try {
      content = JSON.parse(fs.readFileSync(file.rootPath, 'utf-8'));
    } catch (err) {
      logError(`Failed to read/parse root digest file: ${file.rootPath}. Error: ${err.message}`);
      errorCount++;
      continue;
    }

    // Check mandatory fields
    for (const field of MANDATORY_FIELDS) {
      if (content[field] === undefined || content[field] === null || content[field] === '') {
        logError(`Field "${field}" is missing or empty in ${file.fileName}`);
        errorCount++;
      }
    }

    // Check digest_type match
    if (content.digest_type !== file.subDir) {
      logError(`digest_type "${content.digest_type}" does not match subdirectory "${file.subDir}" in ${file.fileName}`);
      errorCount++;
    }

    // Check status
    if (content.status !== 'public_static_digest') {
      logError(`status must be "public_static_digest", found "${content.status}" in ${file.fileName}`);
      errorCount++;
    }

    // Check included case ids
    const includedCases = content.included_case_ids;
    if (!Array.isArray(includedCases)) {
      logError(`included_case_ids must be an array in ${file.fileName}`);
      errorCount++;
    } else {
      // Check case_count matches included_case_ids length
      if (content.case_count !== includedCases.length) {
        logError(`case_count (${content.case_count}) does not match included_case_ids length (${includedCases.length}) in ${file.fileName}`);
        errorCount++;
      }

      // Cross-reference with incident-index.json
      for (const caseId of includedCases) {
        if (!activeIncidents.has(caseId)) {
          logError(`included_case_id "${caseId}" in ${file.fileName} does not exist in incident-index.json!`);
          errorCount++;
        }

        // Safety: Block INC-0013 and mock records
        if (caseId.toUpperCase() === 'INC-0013') {
          logError(`Safety Violation: reference to INC-0013 found in ${file.fileName}!`);
          errorCount++;
        }
        if (caseId.toUpperCase().includes('CAND') || caseId.toLowerCase().includes('mock')) {
          logError(`Safety Violation: reference to synthetic candidate or mock record "${caseId}" found in ${file.fileName}!`);
          errorCount++;
        }
      }
    }

    // Ensure site duplicate copy exists and matches root file exactly
    if (!fs.existsSync(file.sitePath)) {
      logError(`Duplicate site copy missing for ${file.subDir}/${file.fileName} at ${file.sitePath}`);
      errorCount++;
    } else {
      try {
        const siteContent = fs.readFileSync(file.sitePath, 'utf-8');
        const rootContent = fs.readFileSync(file.rootPath, 'utf-8');
        if (siteContent !== rootContent) {
          logError(`Mismatch detected between root digest and site digest for ${file.subDir}/${file.fileName}`);
          errorCount++;
        }
      } catch (err) {
        logError(`Failed to compare site/root copies: ${err.message}`);
        errorCount++;
      }
    }
  }

  if (errorCount > 0) {
    console.error(`\n\x1b[31mFAIL:\x1b[0m ${errorCount} digest validation error(s) found.`);
    process.exit(1);
  } else {
    logPass('All digest validation and security policy checks passed successfully!');
    process.exit(0);
  }
}

validate();
