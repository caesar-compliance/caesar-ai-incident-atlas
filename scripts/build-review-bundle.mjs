import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

function build() {
  console.log('=== Building Review Console Bundle ===');

  const CANDIDATES_DIR = path.join(ROOT, 'data', 'candidates', 'mock');
  const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'mock');
  const DIGESTS_DIR = path.join(ROOT, 'data', 'digests', 'mock');
  const OUTPUT_FILE = path.join(ROOT, 'tools', 'review-console', 'review-bundle.json');

  const candidates = [];
  if (fs.existsSync(CANDIDATES_DIR)) {
    fs.readdirSync(CANDIDATES_DIR)
      .filter(f => f.endsWith('.json') && f.startsWith('cand-'))
      .forEach(f => {
        const fileContent = fs.readFileSync(path.join(CANDIDATES_DIR, f), 'utf8');
        try {
          candidates.push(JSON.parse(fileContent));
        } catch (e) {
          console.error(`Error parsing candidate file: ${f}`, e);
        }
      });
  }

  const drafts = [];
  if (fs.existsSync(DRAFTS_DIR)) {
    fs.readdirSync(DRAFTS_DIR)
      .filter(f => f.endsWith('.json') && f.startsWith('draft-'))
      .forEach(f => {
        const fileContent = fs.readFileSync(path.join(DRAFTS_DIR, f), 'utf8');
        try {
          drafts.push(JSON.parse(fileContent));
        } catch (e) {
          console.error(`Error parsing draft file: ${f}`, e);
        }
      });
  }

  const digests = [];
  if (fs.existsSync(DIGESTS_DIR)) {
    fs.readdirSync(DIGESTS_DIR)
      .filter(f => f.endsWith('.json'))
      .forEach(f => {
        const fileContent = fs.readFileSync(path.join(DIGESTS_DIR, f), 'utf8');
        try {
          digests.push(JSON.parse(fileContent));
        } catch (e) {
          console.error(`Error parsing digest file: ${f}`, e);
        }
      });
  }

  const bundle = {
    generated_at: new Date().toISOString(),
    candidates,
    drafts,
    digests,
    metadata: {
      synthetic: true,
      purpose: "Local Review Console Mock Data",
      warning: "INTERNAL AUDIT ONLY - NOT FOR PUBLIC RELEASE"
    }
  };

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2), 'utf8');
  console.log(`Successfully built review bundle at: ${OUTPUT_FILE}`);
  console.log(`Loaded ${candidates.length} candidates, ${drafts.length} drafts, ${digests.length} digests.`);
}

build();
