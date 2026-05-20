import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const CANDIDATES_DIR = path.join(ROOT, 'data', 'candidates', 'mock');
const REPORT_FILE = path.join(CANDIDATES_DIR, 'mock-dedupe-report.json');

function run() {
  console.log('--- Caesar Atlas Mock Deduplication: Analyzing Candidates ---');

  if (!fs.existsSync(CANDIDATES_DIR)) {
    console.error(`Error: Mock candidates directory not found at ${CANDIDATES_DIR}`);
    process.exit(1);
  }

  // Load all cand-*.json files
  const files = fs.readdirSync(CANDIDATES_DIR)
    .filter(file => file.startsWith('cand-') && file.endsWith('.json'));

  console.log(`Loaded ${files.length} candidate files for deduplication.`);

  const candidates = [];
  for (const file of files) {
    const filePath = path.join(CANDIDATES_DIR, file);
    try {
      const cand = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      candidates.push(cand);
    } catch (err) {
      console.error(`Error reading/parsing ${filePath}:`, err);
    }
  }

  // Deduplication check
  const seenKeys = new Map();
  const duplicates = [];
  const uniqueCandidates = [];

  for (const cand of candidates) {
    const key = cand.dedupe_key;
    if (seenKeys.has(key)) {
      duplicates.push({
        candidate_id: cand.candidate_id,
        title: cand.title,
        dedupe_key: key,
        duplicate_of: seenKeys.get(key)
      });
    } else {
      seenKeys.set(key, cand.candidate_id);
      uniqueCandidates.push(cand);
    }
  }

  console.log(`Deduplication Results:`);
  console.log(`  - Unique candidates: ${uniqueCandidates.length}`);
  console.log(`  - Duplicate candidates: ${duplicates.length}`);

  const report = {
    generated_at: new Date().toISOString(),
    total_processed: candidates.length,
    unique_count: uniqueCandidates.length,
    duplicate_count: duplicates.length,
    unique_candidates: uniqueCandidates.map(c => ({
      candidate_id: c.candidate_id,
      title: c.title,
      dedupe_key: c.dedupe_key,
      source_id: c.source_id
    })),
    duplicates: duplicates,
    metadata: {
      synthetic: true,
      purpose: "Used only to test Caesar AI Incident Atlas pipeline deduplication"
    }
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Successfully generated deduplication report: ${REPORT_FILE}`);
  console.log('--- Deduplication Done ---\n');
}

run();
