import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const RUNS_DIR = path.join(ROOT, 'data', 'watch', 'runs');
const REPORT_PATH = path.join(RUNS_DIR, 'latest-real-dedupe-report.json');

function scanCandidates(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanCandidates(fullPath, list);
    } else if (item.isFile() && item.name.endsWith('.json')) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (content.candidate_id) {
          list.push({ file_path: fullPath, content });
        }
      } catch (e) {
        console.error(`Error reading candidate ${item.name}:`, e.message);
      }
    }
  }
  return list;
}

function dedupe() {
  console.log('=== Running Real Candidate De-duplication ===');
  
  const candidates = scanCandidates(REAL_CANDIDATES_DIR);
  console.log(`Scanned ${candidates.length} candidate file(s).`);

  // Sort candidates by detected_at ascending so that the earliest detection is considered the original
  candidates.sort((a, b) => {
    const timeA = new Date(a.content.detected_at).getTime();
    const timeB = new Date(b.content.detected_at).getTime();
    return timeA - timeB;
  });

  const seenUrls = new Map(); // url -> candidate_id
  const seenDedupeKeys = new Map(); // dedupe_key -> candidate_id

  const duplicates = [];
  const uniqueList = [];

  for (const entry of candidates) {
    const cand = entry.content;
    const url = cand.source_url;
    const key = cand.dedupe_key;

    let isDuplicate = false;
    let duplicateOf = null;

    if (seenUrls.has(url)) {
      isDuplicate = true;
      duplicateOf = seenUrls.get(url);
    } else if (seenDedupeKeys.has(key)) {
      isDuplicate = true;
      duplicateOf = seenDedupeKeys.get(key);
    }

    if (isDuplicate) {
      duplicates.push({
        candidate_id: cand.candidate_id,
        title: cand.title,
        source_url: url,
        dedupe_key: key,
        detected_at: cand.detected_at,
        duplicate_of: duplicateOf
      });
    } else {
      if (url) seenUrls.set(url, cand.candidate_id);
      if (key) seenDedupeKeys.set(key, cand.candidate_id);
      uniqueList.push(cand.candidate_id);
    }
  }

  const report = {
    deduplicated_at: new Date().toISOString(),
    total_candidates_scanned: candidates.length,
    unique_count: uniqueList.length,
    duplicate_count: duplicates.length,
    unique_candidate_ids: uniqueList,
    duplicates
  };

  if (!fs.existsSync(RUNS_DIR)) {
    fs.mkdirSync(RUNS_DIR, { recursive: true });
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  
  console.log('\n==========================================');
  console.log('       Caesar Deduplication Report        ');
  console.log('==========================================');
  console.log(`Total Scanned:  ${report.total_candidates_scanned}`);
  console.log(`Unique Items:   ${report.unique_count}`);
  console.log(`Duplicates:     ${report.duplicate_count}`);
  console.log(`Report Path:    ${REPORT_PATH}`);
  console.log('==========================================\n');
}

dedupe();
