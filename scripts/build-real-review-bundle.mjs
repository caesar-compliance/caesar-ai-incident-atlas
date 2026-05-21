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
const RANKED_PATH = path.join(ROOT, 'data', 'reviews', 'real', 'ranked-promotion-candidates.json');
const QUALITY_REPORT_PATH = path.join(ROOT, 'data', 'watch', 'runs', 'latest-candidate-quality-report.json');
const ADAPTER_SUMMARY_PATH = path.join(ROOT, 'data', 'watch', 'runs', 'latest-adapter-summary.json');
const OUTPUT_FILE = path.join(ROOT, 'tools', 'review-console', 'real-review-bundle.json');

const CASE_QUALITY_CLASSES = ['likely_enforcement_case', 'likely_official_decision', 'likely_case'];

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

  // Load ranked candidates if available
  let rankedData = null;
  if (fs.existsSync(RANKED_PATH)) {
    try {
      rankedData = JSON.parse(fs.readFileSync(RANKED_PATH, 'utf8'));
    } catch (e) {
      console.warn('Could not load ranked-promotion-candidates.json:', e.message);
    }
  }

  // Load quality report if available
  let qualityReport = null;
  if (fs.existsSync(QUALITY_REPORT_PATH)) {
    try {
      qualityReport = JSON.parse(fs.readFileSync(QUALITY_REPORT_PATH, 'utf8'));
    } catch (e) {
      console.warn('Could not load latest-candidate-quality-report.json:', e.message);
    }
  }

  // Load adapter summary if available
  let adapterSummary = null;
  if (fs.existsSync(ADAPTER_SUMMARY_PATH)) {
    try {
      adapterSummary = JSON.parse(fs.readFileSync(ADAPTER_SUMMARY_PATH, 'utf8'));
    } catch (e) {
      console.warn('Could not load latest-adapter-summary.json:', e.message);
    }
  }

  const eligibleCount = candidates.filter(c => c.promotion_eligible === true).length;
  const blockedCount = candidates.filter(c => c.promotion_eligible === false).length;
  const genericBlockedCount = candidates.filter(c =>
    c.quality_class === 'generic_page' || c.quality_class === 'blocked_generic_page'
  ).length;
  const caseQualityCount = candidates.filter(c => CASE_QUALITY_CLASSES.includes(c.quality_class)).length;
  const noPublicationCandidateReady = rankedData?.no_publication_candidate_ready ?? (eligibleCount === 0);
  const noCaseQualityReady = rankedData?.no_case_quality_candidate_ready ?? (caseQualityCount === 0);

  const bundle = {
    generated_at: new Date().toISOString(),
    dataset_type: "real_detected_candidates_local_only",
    public: false,
    publication_allowed: false,
    no_publication_candidate_ready: noPublicationCandidateReady,
    no_case_quality_candidate_ready: noCaseQualityReady,
    best_case_quality_packet_id: rankedData?.best_case_quality_packet_id || null,
    candidates,
    drafts,
    promotion_packets: packets,
    ranked_candidates: rankedData,
    top_5_ranked: rankedData?.ranked_candidates?.slice(0, 5) || [],
    adapter_summary: adapterSummary,
    quality_report_summary: qualityReport ? {
      total_candidates: qualityReport.total_candidates,
      promotion_eligible_count: qualityReport.promotion_eligible_count,
      blocked_count: qualityReport.blocked_count,
      class_summary: qualityReport.class_summary,
    } : null,
    source_health_summary: sourceHealth,
    digests: [],
    metadata: {
      synthetic: false,
      purpose: "Local Review Console — Real Watcher Pipeline Data (T051)",
      warning: "INTERNAL OPERATOR AUDIT ONLY - NOT FOR PUBLIC RELEASE",
      confidential: true,
      pipeline_stages: {
        candidates: candidates.length,
        promotion_eligible: eligibleCount,
        case_quality_count: caseQualityCount,
        generic_blocked: genericBlockedCount,
        total_blocked: blockedCount,
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
  console.log(`  Candidates:              ${candidates.length}`);
  console.log(`  Promotion eligible:      ${eligibleCount}`);
  console.log(`  Case-quality count:      ${caseQualityCount}`);
  console.log(`  Generic blocked:         ${genericBlockedCount}`);
  console.log(`  Total blocked:           ${blockedCount}`);
  console.log(`  Drafts:                  ${drafts.length}`);
  console.log(`  Promotion packets:       ${packets.length}`);
  console.log(`  Ranked data:             ${rankedData ? 'loaded' : 'not available'}`);
  console.log(`  Quality report:          ${qualityReport ? 'loaded' : 'not available'}`);
  console.log(`  Adapter summary:         ${adapterSummary ? 'loaded' : 'not available'}`);
  console.log(`  Source health:           ${sourceHealth ? 'loaded' : 'not available'}`);
  console.log(`  No candidate ready:      ${noPublicationCandidateReady}`);
  console.log(`  No case-quality ready:   ${noCaseQualityReady}`);
}

build();
