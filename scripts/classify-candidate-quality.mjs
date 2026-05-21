import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const RUNS_DIR = path.join(ROOT, 'data', 'watch', 'runs');
const REPORT_PATH = path.join(RUNS_DIR, 'latest-candidate-quality-report.json');

const QUALITY_SCORE_THRESHOLD = 70;

// Generic page blockers — title patterns (lowercase match)
const GENERIC_TITLE_BLOCKERS = [
  'make a complaint',
  'contact us',
  'about us',
  'privacy notice',
  'privacy policy',
  'cookie policy',
  'accessibility',
  'terms of use',
  'terms and conditions',
  'site map',
  'sitemap',
  'subscribe',
  'newsletter',
  'press release',
  'media enquiry',
  'how to complain',
  'report a concern',
  'feedback',
  'frequently asked questions',
  'faq',
  'help centre',
  'help center',
  'get in touch',
  'find us',
  'our team',
  'our staff',
  'vacancies',
  'careers at',
  'work for us',
  'work with us',
  'join us',
  'register',
  'login',
  'sign in',
  'sign up',
  'annual report',
  'financial statements',
  'procurement',
  'tender',
  'contract notice',
  'supplier',
  'webinar',
  ' event ',
  'conference',
  'workshop',
  'seminar',
  'training course',
  'job posting',
  'job vacancy',
  'apply now',
  'open position',
  'about the',
  'welcome to',
  'home page',
  'homepage',
];

// Generic URL path blockers
const GENERIC_URL_BLOCKERS = [
  '/make-a-complaint',
  '/contact',
  '/contact-us',
  '/about',
  '/about-us',
  '/events',
  '/event/',
  '/jobs',
  '/careers',
  '/vacancies',
  '/webinar',
  '/subscribe',
  '/newsletter',
  '/press',
  '/media',
  '/help',
  '/faq',
  '/feedback',
  '/login',
  '/register',
  '/sign-in',
  '/signup',
  '/privacy',
  '/cookie',
  '/terms',
  '/sitemap',
  '/procurement',
  '/tender',
  '/suppliers',
  '/accessibility',
];

// Strong positive signals — title patterns indicating real legal/governance value
const HIGH_VALUE_TITLE_SIGNALS = [
  'enforcement',
  'investigation',
  'penalty',
  'fine',
  'sanction',
  'settlement',
  'judgment',
  'court',
  'ruling',
  'decision',
  'lawsuit',
  'litigation',
  'complaint upheld',
  'regulatory action',
  'guidance on',
  'guidelines on',
  'opinion on',
  'report on',
  'consultation on',
  'framework for',
  'requirements for',
  'rules on',
  'act ',
  'regulation',
  'directive',
  'ai act',
  'gdpr',
  'data protection',
  'automated decision',
  'algorithm',
  'artificial intelligence',
  'machine learning',
  'facial recognition',
  'biometric',
];

// URL positive signals
const HIGH_VALUE_URL_SIGNALS = [
  '/enforcement',
  '/investigation',
  '/decision',
  '/guidance',
  '/guidelines',
  '/opinion',
  '/consultation',
  '/report',
  '/framework',
  '/regulation',
  '/act',
  '/news',
  '/press-release',
  '/regulatory',
  '/case',
  '/ruling',
  '/judgment',
  '/penalty',
  '/fine',
  '/settlement',
];

// Event/webinar URL signals
const EVENT_URL_SIGNALS = [
  '/events/',
  '/event/',
  '/webinar',
  '/conference',
  '/workshop',
  '/seminar',
  '/training',
];

// Job/procurement URL signals
const JOB_PROCUREMENT_URL_SIGNALS = [
  '/jobs',
  '/careers',
  '/vacancies',
  '/procurement',
  '/tender',
  '/supplier',
  '/contract-notice',
];

function classifyCandidate(candidate) {
  const title = (candidate.title || '').toLowerCase().trim();
  const url = (candidate.source_url || '').toLowerCase().trim();
  const combinedText = `${title} ${url}`;

  const rejectionReasons = [];
  let qualityScore = 50; // Start neutral
  let qualityClass = 'low_relevance';

  // ── HARD BLOCKERS ─────────────────────────────────────────────

  // Check generic title blockers
  for (const blocker of GENERIC_TITLE_BLOCKERS) {
    if (title.includes(blocker)) {
      rejectionReasons.push(`Generic title pattern: "${blocker}"`);
    }
  }

  // Check generic URL blockers
  for (const blocker of GENERIC_URL_BLOCKERS) {
    if (url.includes(blocker)) {
      rejectionReasons.push(`Generic URL pattern: "${blocker}"`);
    }
  }

  // Check event/webinar URL
  const isEventUrl = EVENT_URL_SIGNALS.some(s => url.includes(s));
  const isJobProcurementUrl = JOB_PROCUREMENT_URL_SIGNALS.some(s => url.includes(s));

  const isEventTitle = ['event', 'webinar', 'conference', 'workshop', 'seminar', 'training course'].some(t => title.includes(t));
  const isJobTitle = ['job', 'career', 'vacanc', 'recruit', 'apply now', 'open position', 'procurement', 'tender'].some(t => title.includes(t));

  // ── CLASSIFY ──────────────────────────────────────────────────

  if (isEventUrl || isEventTitle) {
    qualityClass = 'event_or_webinar';
    qualityScore = 10;
    if (!rejectionReasons.some(r => r.includes('event') || r.includes('webinar'))) {
      rejectionReasons.push('Event or webinar page detected');
    }
  } else if (isJobProcurementUrl || isJobTitle) {
    qualityClass = 'job_or_procurement';
    qualityScore = 5;
    if (!rejectionReasons.some(r => r.includes('job') || r.includes('procurement'))) {
      rejectionReasons.push('Job or procurement page detected');
    }
  } else if (rejectionReasons.length > 0) {
    qualityClass = 'generic_page';
    qualityScore = 15;
  } else {
    // No hard blockers — score positive signals
    let positiveSignalCount = 0;

    for (const signal of HIGH_VALUE_TITLE_SIGNALS) {
      if (title.includes(signal)) positiveSignalCount++;
    }
    for (const signal of HIGH_VALUE_URL_SIGNALS) {
      if (url.includes(signal)) positiveSignalCount++;
    }

    // AI/algorithm relevance
    const hasAiTerm = ['artificial intelligence', 'ai', 'algorithm', 'automated decision', 'machine learning', 'generative ai', 'chatbot', 'facial recognition', 'biometric'].some(t => combinedText.includes(t));

    // Legal/regulatory relevance
    const hasLegalTerm = ['enforcement', 'guidance', 'regulation', 'decision', 'ruling', 'judgment', 'investigation', 'penalty', 'settlement', 'court', 'lawsuit', 'opinion', 'framework', 'directive', 'act', 'consultation', 'gdpr', 'data protection'].some(t => combinedText.includes(t));

    if (!hasAiTerm) {
      rejectionReasons.push('No AI/algorithm relevance detected');
      qualityScore -= 20;
    }

    if (!hasLegalTerm) {
      rejectionReasons.push('No legal/regulatory relevance detected');
      qualityScore -= 20;
    }

    // Score based on positive signals
    qualityScore += Math.min(positiveSignalCount * 8, 40);

    // Bonus for Green source
    if ((candidate.source_tier || '').toLowerCase() === 'green') {
      qualityScore += 10;
    } else {
      rejectionReasons.push('Non-green source tier');
      qualityScore -= 30;
    }

    // Classify by score + signals
    if (qualityScore >= 75 && hasAiTerm && hasLegalTerm) {
      const hasEnforcement = ['enforcement', 'investigation', 'penalty', 'fine', 'sanction', 'settlement', 'judgment', 'court', 'ruling', 'decision', 'lawsuit'].some(t => combinedText.includes(t));
      const hasGuidance = ['guidance', 'guidelines', 'opinion', 'framework', 'consultation', 'regulation', 'directive', 'act '].some(t => combinedText.includes(t));
      const hasUpdate = ['update', 'new', 'amended', 'published', 'report', 'consultation'].some(t => combinedText.includes(t));

      if (hasEnforcement) {
        qualityClass = 'likely_case';
      } else if (hasGuidance) {
        qualityClass = 'likely_guidance';
      } else if (hasUpdate) {
        qualityClass = 'likely_regulatory_update';
      } else {
        qualityClass = 'likely_guidance';
      }
    } else if (qualityScore >= 50 && hasAiTerm) {
      qualityClass = 'likely_regulatory_update';
    } else {
      qualityClass = 'low_relevance';
      if (rejectionReasons.length === 0) {
        rejectionReasons.push('Insufficient relevance signals');
      }
    }
  }

  // Clamp score
  qualityScore = Math.max(0, Math.min(100, qualityScore));

  // Promotion eligibility
  const ineligibleClasses = ['generic_page', 'event_or_webinar', 'job_or_procurement', 'low_relevance'];
  const promotionEligible = !ineligibleClasses.includes(qualityClass) && qualityScore >= QUALITY_SCORE_THRESHOLD && rejectionReasons.length === 0;

  return {
    quality_class: qualityClass,
    quality_score: qualityScore,
    promotion_eligible: promotionEligible,
    rejection_reasons: rejectionReasons,
  };
}

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
        if (content.candidate_id) list.push({ content, filePath: fullPath });
      } catch (e) {
        console.warn(`[Classifier] Could not parse ${item.name}: ${e.message}`);
      }
    }
  }
  return list;
}

function run() {
  console.log('=== Caesar Candidate Quality Classifier ===\n');

  if (!fs.existsSync(REAL_CANDIDATES_DIR)) {
    console.error('[Classifier] No real-candidates directory found. Run watch-green-sources.mjs first.');
    process.exit(1);
  }

  const candidateEntries = scanCandidates(REAL_CANDIDATES_DIR);
  console.log(`[Classifier] Found ${candidateEntries.length} candidate(s) to classify.`);

  if (candidateEntries.length === 0) {
    console.warn('[Classifier] No candidates to classify.');
    process.exit(0);
  }

  const results = [];
  let eligible = 0;
  let blocked = 0;
  let updated = 0;

  for (const { content: candidate, filePath } of candidateEntries) {
    const classification = classifyCandidate(candidate);

    // Update candidate file with quality fields
    const updated_candidate = {
      ...candidate,
      quality_class: classification.quality_class,
      quality_score: classification.quality_score,
      promotion_eligible: classification.promotion_eligible,
      rejection_reasons: classification.rejection_reasons,
    };

    fs.writeFileSync(filePath, JSON.stringify(updated_candidate, null, 2), 'utf8');
    updated++;

    if (classification.promotion_eligible) {
      eligible++;
      console.log(`\x1b[32m[ELIGIBLE]\x1b[0m ${candidate.candidate_id} | ${classification.quality_class} | score:${classification.quality_score} | "${candidate.title}"`);
    } else {
      blocked++;
      console.log(`\x1b[31m[BLOCKED]\x1b[0m  ${candidate.candidate_id} | ${classification.quality_class} | score:${classification.quality_score} | "${candidate.title}"`);
      if (classification.rejection_reasons.length > 0) {
        console.log(`           Reasons: ${classification.rejection_reasons.slice(0, 2).join('; ')}`);
      }
    }

    results.push({
      candidate_id: candidate.candidate_id,
      title: candidate.title,
      source_url: candidate.source_url,
      source_id: candidate.source_id,
      ...classification,
    });
  }

  // Build report
  const report = {
    generated_at: new Date().toISOString(),
    total_candidates: candidateEntries.length,
    promotion_eligible_count: eligible,
    blocked_count: blocked,
    quality_score_threshold: QUALITY_SCORE_THRESHOLD,
    class_summary: {},
    results,
  };

  // Class summary
  for (const r of results) {
    report.class_summary[r.quality_class] = (report.class_summary[r.quality_class] || 0) + 1;
  }

  if (!fs.existsSync(RUNS_DIR)) {
    fs.mkdirSync(RUNS_DIR, { recursive: true });
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

  console.log(`\n${'='.repeat(60)}`);
  console.log('  QUALITY CLASSIFICATION COMPLETE');
  console.log(`${'='.repeat(60)}`);
  console.log(`Total candidates:      ${report.total_candidates}`);
  console.log(`Promotion eligible:    ${eligible}`);
  console.log(`Blocked:               ${blocked}`);
  console.log(`Candidate files updated: ${updated}`);
  console.log(`\nClass breakdown:`);
  for (const [cls, count] of Object.entries(report.class_summary)) {
    console.log(`  ${cls}: ${count}`);
  }
  console.log(`\nReport: ${REPORT_PATH}`);
  console.log(`${'='.repeat(60)}\n`);
}

run();
