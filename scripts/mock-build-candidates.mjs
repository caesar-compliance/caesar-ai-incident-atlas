import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const INPUT_FILE = path.join(ROOT, 'data', 'candidates', 'mock', 'detected-updates.json');
const CANDIDATES_DIR = path.join(ROOT, 'data', 'candidates', 'mock');

function getDedupeKey(url) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${monthName} ${year}`;
}

function run() {
  console.log('--- Caesar Atlas Mock Candidates Builder: Compiling Candidates ---');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Error: Ingested source updates file not found at ${INPUT_FILE}`);
    process.exit(1);
  }

  let updates = [];
  try {
    updates = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  } catch (err) {
    console.error(`Failed to parse ${INPUT_FILE}:`, err);
    process.exit(1);
  }

  console.log(`Loaded ${updates.length} mock source updates.`);

  // Mapping from source updates to candidates
  const candidates = updates.map((update, index) => {
    const candNum = 13 + index;
    const candidateId = `CAND-00${candNum}`;

    let keywords = ['synthetic', 'mock-pipeline'];
    if (update.title.toLowerCase().includes('hiring') || update.title.toLowerCase().includes('resume')) {
      keywords.push('algorithmic bias', 'hiring software', 'employment software');
    } else if (update.title.toLowerCase().includes('biometric') || update.title.toLowerCase().includes('facial')) {
      keywords.push('biometrics', 'facial recognition', 'privacy');
    } else if (update.title.toLowerCase().includes('healthcare') || update.title.toLowerCase().includes('clinical')) {
      keywords.push('healthcare', 'clinical algorithm', 'diagnostic drift');
    } else if (update.title.toLowerCase().includes('underwriting') || update.title.toLowerCase().includes('credit')) {
      keywords.push('credit scoring', 'consumer protection', 'explainability');
    } else if (update.title.toLowerCase().includes('chatbot') || update.title.toLowerCase().includes('hallucinations')) {
      keywords.push('chatbot', 'hallucination', 'vendor risk', 'data leakage');
    }

    let prelimType = 'regulator_guidance';
    if (update.title.toLowerCase().includes('enforcement')) {
      prelimType = 'enforcement';
    } else if (update.title.toLowerCase().includes('report') || update.title.toLowerCase().includes('leakage')) {
      prelimType = 'vendor_governance_failure';
    }

    let jurisdiction = 'US';
    if (update.source_id.includes('cnil')) {
      jurisdiction = 'FR';
    } else if (update.source_id.includes('news')) {
      jurisdiction = 'Global';
    }

    const candidate = {
      candidate_id: candidateId,
      detected_at: new Date(update.updated_at).toISOString().replace(/\.\d{3}Z$/, 'Z'), // strictly YYYY-MM-DDTHH:MM:SSZ
      source_id: update.source_id.toLowerCase(), // force lowercase alphanumeric with hyphens to match pattern
      source_url: update.source_url,
      title: update.title,
      date_published: formatDate(update.updated_at),
      detected_keywords: keywords,
      preliminary_case_type: prelimType,
      jurisdiction: jurisdiction,
      source_tier: update.tier || 'green',
      confidence_score: 0.95,
      dedupe_key: getDedupeKey(update.source_url),
      status: 'mock_candidate', // custom mock status we added to the enum
      risk_flags: ['no_risk_detected'],
      notes: 'SYNTHETIC MOCK RECORD FOR TEST PURPOSES ONLY. DO NOT INCLUDE IN PUBLIC SITE.'
    };

    // Save individual candidate file
    const candFilePath = path.join(CANDIDATES_DIR, `${candidateId.toLowerCase()}.json`);
    fs.writeFileSync(candFilePath, JSON.stringify(candidate, null, 2), 'utf8');
    console.log(`Saved candidate file: ${candFilePath}`);

    return candidate;
  });

  console.log(`Successfully compiled and wrote ${candidates.length} candidate files.`);
  console.log('--- Candidates Builder Done ---\n');
}

run();
