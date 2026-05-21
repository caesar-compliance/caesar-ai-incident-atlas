import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const OUTPUT_FILE = path.join(ROOT, 'tools', 'review-console', 'real-review-bundle.json');

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
          list.push(content);
        }
      } catch (e) {
        console.error(`Error reading candidate ${item.name}:`, e.message);
      }
    }
  }
  return list;
}

function build() {
  console.log('=== Building Real Review Console Bundle ===');

  const candidates = scanCandidates(REAL_CANDIDATES_DIR);

  // We clearly mark this bundle with the required metadata and safety attributes.
  const bundle = {
    generated_at: new Date().toISOString(),
    dataset_type: "real_detected_candidates_local_only",
    public: false,
    publication_allowed: false,
    candidates,
    drafts: [],  // Drafts remain empty or can use mock if needed, empty is clean
    digests: [],
    metadata: {
      synthetic: false,
      purpose: "Local Review Console Real Watcher Data",
      warning: "INTERNAL OPERATOR AUDIT ONLY - NOT FOR PUBLIC RELEASE",
      confidential: true
    }
  };

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2), 'utf8');
  console.log(`Successfully built real review bundle at: ${OUTPUT_FILE}`);
  console.log(`Loaded ${candidates.length} real candidates.`);
}

build();
