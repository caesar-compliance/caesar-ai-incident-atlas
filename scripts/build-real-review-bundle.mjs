import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const DRAFTS_REAL_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const PACKETS_REAL_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const LATEST_SUMMARY_PATH = path.join(ROOT, 'data', 'watch', 'runs', 'latest-watch-summary.json');
const OUTPUT_FILE = path.join(ROOT, 'tools', 'review-console', 'real-review-bundle.json');

function scanJsonDir(dir, idField, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanJsonDir(fullPath, idField, list);
    } else if (item.isFile() && item.name.endsWith('.json')) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (content[idField]) {
          list.push(content);
        }
      } catch (e) {
        console.error(`Error reading ${item.name}:`, e.message);
      }
    }
  }
  return list;
}

function build() {
  console.log('=== Building Real Review Console Bundle ===');

  const candidates = scanJsonDir(REAL_CANDIDATES_DIR, 'candidate_id');
  const drafts = scanJsonDir(DRAFTS_REAL_DIR, 'draft_id');
  const packets = scanJsonDir(PACKETS_REAL_DIR, 'packet_id');

  // Load latest source health summary if available
  let sourceHealth = null;
  if (fs.existsSync(LATEST_SUMMARY_PATH)) {
    try {
      sourceHealth = JSON.parse(fs.readFileSync(LATEST_SUMMARY_PATH, 'utf8'));
    } catch (e) {
      console.warn('Could not load latest-watch-summary.json:', e.message);
    }
  }

  const bundle = {
    generated_at: new Date().toISOString(),
    dataset_type: "real_detected_candidates_local_only",
    public: false,
    publication_allowed: false,
    candidates,
    drafts,
    promotion_packets: packets,
    source_health_summary: sourceHealth,
    digests: [],
    metadata: {
      synthetic: false,
      purpose: "Local Review Console — Real Watcher Pipeline Data (T048)",
      warning: "INTERNAL OPERATOR AUDIT ONLY - NOT FOR PUBLIC RELEASE",
      confidential: true,
      pipeline_stages: {
        candidates: candidates.length,
        drafts: drafts.length,
        promotion_packets: packets.length
      }
    }
  };

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2), 'utf8');
  console.log(`Successfully built real review bundle at: ${OUTPUT_FILE}`);
  console.log(`  Candidates:        ${candidates.length}`);
  console.log(`  Drafts:            ${drafts.length}`);
  console.log(`  Promotion packets: ${packets.length}`);
  console.log(`  Source health:     ${sourceHealth ? 'loaded' : 'not available'}`);
}

build();
