import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const OFFICIAL_DIR = path.join(ROOT, 'mock-sources', 'official');
const YELLOW_DIR = path.join(ROOT, 'mock-sources', 'yellow');
const OUTPUT_FILE = path.join(ROOT, 'data', 'candidates', 'mock', 'detected-updates.json');

function scanDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(dir, file);
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return { filePath, content };
      } catch (err) {
        console.error(`Error reading/parsing ${filePath}:`, err);
        return null;
      }
    })
    .filter(Boolean);
}

function run() {
  console.log('--- Caesar Atlas Mock Watcher: Scanning Mock Sources ---');
  
  const officialSources = scanDir(OFFICIAL_DIR);
  const yellowSources = scanDir(YELLOW_DIR);
  const allSources = [...officialSources, ...yellowSources];

  console.log(`Detected ${officialSources.length} official (green) sources.`);
  console.log(`Detected ${yellowSources.length} yellow sources.`);
  console.log(`Total detected sources: ${allSources.length}`);

  const normalizedUpdates = allSources.map(({ content }) => {
    // Basic structural checks & normalization
    return {
      source_id: content.source_id,
      source_name: content.source_name,
      source_url: content.source_url,
      tier: content.tier || 'green',
      updated_at: content.updated_at || new Date().toISOString(),
      title: content.title,
      summary: content.summary,
      legal_implications: content.legal_implications || '',
      governance_lessons: content.governance_lessons || '',
      recommended_controls: content.recommended_controls || '',
      required_evidence: content.required_evidence || '',
      metadata: content.metadata || {}
    };
  });

  // Ensure mock directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(normalizedUpdates, null, 2), 'utf8');

  console.log(`Successfully normalized and saved mock source updates to ${OUTPUT_FILE}`);
  console.log('--- Watcher Done ---\n');
}

run();
