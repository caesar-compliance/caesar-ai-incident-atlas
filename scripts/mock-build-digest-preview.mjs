import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'mock');
const PREVIEW_FILE = path.join(ROOT, 'data', 'digests', 'mock', 'mock-weekly-preview.json');

function run() {
  console.log('--- Caesar Atlas Mock Digest Builder: Compiling Weekly Preview ---');

  if (!fs.existsSync(DRAFTS_DIR)) {
    console.error(`Error: Mock drafts directory not found at ${DRAFTS_DIR}`);
    process.exit(1);
  }

  // Load all draft-*.json files
  const files = fs.readdirSync(DRAFTS_DIR)
    .filter(file => file.startsWith('draft-') && file.endsWith('.json'));

  console.log(`Loaded ${files.length} draft files for preview inclusion.`);

  const drafts = [];
  for (const file of files) {
    const filePath = path.join(DRAFTS_DIR, file);
    try {
      const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      drafts.push(d);
    } catch (err) {
      console.error(`Error reading/parsing ${filePath}:`, err);
    }
  }

  // Sort by draft_id
  drafts.sort((a, b) => a.draft_id.localeCompare(b.draft_id));

  const preview = {
    preview_id: 'MOCK-PREVIEW-2026-W21',
    title: 'Mock Atlas Case Discovery Weekly Preview (Synthetic)',
    period_start: '2026-05-15T00:00:00Z',
    period_end: '2026-05-21T23:59:59Z',
    generated_at: new Date().toISOString(),
    draft_count: drafts.length,
    included_draft_ids: drafts.map(d => d.draft_id),
    highlights: drafts.map(d => {
      return `[${d.draft_id}] Proposed: "${d.proposed_case_title}" (${d.jurisdiction}) - Failure Modes: ${d.failure_mode.join(', ')}`;
    }),
    metadata: {
      synthetic: true,
      not_for_public_publication: true,
      purpose: "Used only to test Caesar AI Incident Atlas pipeline previewing",
      warning: "INTERNAL AUDIT ONLY - DO NOT PUBLISH TO LIVE WEBSITE"
    }
  };

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(PREVIEW_FILE), { recursive: true });
  fs.writeFileSync(PREVIEW_FILE, JSON.stringify(preview, null, 2), 'utf8');

  console.log(`Successfully compiled and wrote weekly preview: ${PREVIEW_FILE}`);
  console.log('--- Digest Builder Done ---\n');
}

run();
