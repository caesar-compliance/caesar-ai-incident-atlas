import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

// Paths
const TARGETS_PATH = path.join(ROOT, 'data', 'watch', 'config', 'green-source-watch-targets.json');
const KEYWORDS_PATH = path.join(ROOT, 'data', 'watch', 'config', 'target-keywords.json');
const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const RUNS_DIR = path.join(ROOT, 'data', 'watch', 'runs');
const MOCK_CANDIDATES_DIR = path.join(ROOT, 'data', 'candidates', 'mock');
const LATEST_SUMMARY_PATH = path.join(RUNS_DIR, 'latest-watch-summary.json');
const ADAPTER_SUMMARY_PATH = path.join(RUNS_DIR, 'latest-adapter-summary.json');

// Source-adapter dispatch map (source_id -> module path)
const ADAPTER_MAP = {
  'ico-ai-and-algorithms': '../scripts/source-adapters/ico-adapter.mjs',
  'ftc-ai-enforcement': '../scripts/source-adapters/ftc-adapter.mjs',
  'cnil-ai': '../scripts/source-adapters/cnil-adapter.mjs',
  'edpb-ai': '../scripts/source-adapters/edpb-adapter.mjs',
  'european-commission-ai-act': '../scripts/source-adapters/eu-commission-adapter.mjs',
};

function logInfo(msg) {
  console.log(`\x1b[34m[Watcher Info]\x1b[0m ${msg}`);
}

function logSuccess(msg) {
  console.log(`\x1b[32m[Watcher Success]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[Watcher Warning]\x1b[0m ${msg}`);
}

function logError(msg, err) {
  console.error(`\x1b[31m[Watcher Error]\x1b[0m ${msg}`, err || '');
}

// 1. Get next CAND-XXXX ID
function getNextCandidateId() {
  let maxId = 17; // Mock candidates start up to 17

  const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (item.isFile() && item.name.endsWith('.json')) {
        try {
          const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          const id = content.candidate_id;
          if (id && id.startsWith('CAND-')) {
            const num = parseInt(id.replace('CAND-', ''), 10);
            if (!isNaN(num) && num > maxId) {
              maxId = num;
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  };

  scanDir(MOCK_CANDIDATES_DIR);
  scanDir(REAL_CANDIDATES_DIR);

  const nextNum = maxId + 1;
  return `CAND-${String(nextNum).padStart(4, '0')}`;
}

// 2. Format publication date: "21 May 2026"
function formatPublishedDate(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  const finalDate = isNaN(d.getTime()) ? new Date() : d;
  const day = finalDate.getUTCDate();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[finalDate.getUTCMonth()];
  const year = finalDate.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

// 3. Keyword matching logic
function matchKeywords(title, url, keywordsConfig) {
  const text = `${title} ${url}`.toLowerCase();
  
  const matchedAi = keywordsConfig.ai_terms.filter(term => text.includes(term.toLowerCase()));
  const matchedLegal = keywordsConfig.legal_terms.filter(term => text.includes(term.toLowerCase()));
  const matchedComm = keywordsConfig.commercial_terms.filter(term => text.includes(term.toLowerCase()));
  const matchedExcl = keywordsConfig.exclusion_terms.filter(term => text.includes(term.toLowerCase()));

  // Exclusion terms block any match
  if (matchedExcl.length > 0) {
    return { matches: false, keywords: [] };
  }

  // Must match at least one AI term
  if (matchedAi.length === 0) {
    return { matches: false, keywords: [] };
  }

  // Must match at least one legal or commercial term
  const otherKeywords = [...matchedLegal, ...matchedComm];
  if (otherKeywords.length === 0) {
    return { matches: false, keywords: [] };
  }

  return {
    matches: true,
    keywords: Array.from(new Set([...matchedAi, ...otherKeywords]))
  };
}

// 3b. Inline generic-page quality gate
const GENERIC_TITLE_BLOCKERS_WATCHER = [
  'make a complaint', 'contact us', 'about us', 'privacy notice', 'privacy policy',
  'cookie policy', 'accessibility', 'terms of use', 'terms and conditions',
  'site map', 'sitemap', 'subscribe', 'newsletter', 'media enquiry',
  'how to complain', 'report a concern', 'feedback', 'frequently asked questions',
  'faq', 'help centre', 'help center', 'get in touch', 'find us', 'our team',
  'vacancies', 'careers at', 'work for us', 'work with us', 'join us',
  'register', 'login', 'sign in', 'sign up', 'welcome to', 'home page', 'homepage',
  'procurement', 'tender', 'contract notice', 'webinar', 'conference', 'workshop',
  'seminar', 'training course', 'job posting', 'job vacancy', 'apply now',
];

const GENERIC_URL_BLOCKERS_WATCHER = [
  '/make-a-complaint', '/contact', '/contact-us', '/about', '/about-us',
  '/events', '/event/', '/jobs', '/careers', '/vacancies',
  '/webinar', '/subscribe', '/newsletter', '/help', '/faq',
  '/feedback', '/login', '/register', '/sign-in', '/signup',
  '/privacy', '/cookie', '/terms', '/sitemap', '/procurement',
  '/tender', '/suppliers', '/accessibility',
];

function inlineQualityCheck(title, url) {
  const t = (title || '').toLowerCase();
  const u = (url || '').toLowerCase();

  const rejectionReasons = [];

  for (const blocker of GENERIC_TITLE_BLOCKERS_WATCHER) {
    if (t.includes(blocker)) {
      rejectionReasons.push(`Generic title: "${blocker}"`);
    }
  }
  for (const blocker of GENERIC_URL_BLOCKERS_WATCHER) {
    if (u.includes(blocker)) {
      rejectionReasons.push(`Generic URL: "${blocker}"`);
    }
  }

  const isGeneric = rejectionReasons.length > 0;

  // Determine basic quality class
  let quality_class = 'unclassified';
  let quality_score = isGeneric ? 15 : 60;

  if (isGeneric) {
    quality_class = 'generic_page';
  } else {
    const combined = `${t} ${u}`;
    const hasEnforcement = ['enforcement', 'investigation', 'penalty', 'fine', 'sanction', 'settlement', 'judgment', 'court', 'ruling', 'decision', 'lawsuit'].some(s => combined.includes(s));
    const hasGuidance = ['guidance', 'guidelines', 'opinion', 'framework', 'consultation', 'regulation', 'directive'].some(s => combined.includes(s));
    if (hasEnforcement) { quality_class = 'likely_case'; quality_score = 75; }
    else if (hasGuidance) { quality_class = 'likely_guidance'; quality_score = 72; }
    else { quality_class = 'likely_regulatory_update'; quality_score = 62; }
  }

  return {
    quality_class,
    quality_score,
    promotion_eligible: !isGeneric && quality_score >= 70,
    rejection_reasons: rejectionReasons,
    is_generic: isGeneric,
  };
}

// 4. HTML link extractor
function extractHtmlLinks(html, baseUrlString) {
  const links = [];
  // Regex to extract href and inner text of <a> tags
  const regex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1].trim();
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) continue;
    
    try {
      const absoluteUrl = new URL(href, baseUrlString).toString();
      links.push({ url: absoluteUrl, title: text });
    } catch (e) {
      // Skip invalid URLs
    }
  }
  return links;
}

// 5. XML Feed (RSS/Atom) link extractor
function extractFeedLinks(xml, baseUrlString) {
  const links = [];
  
  // Try RSS <item> first
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    const titleMatch = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(itemContent);
    const linkMatch = /<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i.exec(itemContent);
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/i.exec(itemContent);

    if (titleMatch && linkMatch) {
      const title = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const url = linkMatch[1].trim();
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : null;
      try {
        const absoluteUrl = new URL(url, baseUrlString).toString();
        links.push({ url: absoluteUrl, title, pubDate });
      } catch (e) {
        // Skip invalid URLs
      }
    }
  }

  // Try Atom <entry> if no RSS items were found
  if (links.length === 0) {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(xml)) !== null) {
      const entryContent = match[1];
      const titleMatch = /<title(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(entryContent);
      const linkMatch = /<link[^>]*href=["']([^"']+)["']/i.exec(entryContent);
      const publishedMatch = /<published>([\s\S]*?)<\/published>/i.exec(entryContent) || /<updated>([\s\S]*?)<\/updated>/i.exec(entryContent);

      if (titleMatch && linkMatch) {
        const title = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        const url = linkMatch[1].trim();
        const pubDate = publishedMatch ? publishedMatch[1].trim() : null;
        try {
          const absoluteUrl = new URL(url, baseUrlString).toString();
          links.push({ url: absoluteUrl, title, pubDate });
        } catch (e) {
          // Skip invalid
        }
      }
    }
  }

  return links;
}

// 6. Attempt fetch with fallback URL support
async function fetchWithFallback(target, headers) {
  const urls = [target.url, ...(target.fallback_urls || [])];
  const timeoutMs = target.timeout_ms || 15000;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const isFallback = i > 0;
    try {
      const response = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
      if (!response.ok) {
        const msg = `HTTP ${response.status} from ${url}`;
        if (isFallback || i === urls.length - 1) {
          return { ok: false, content: '', http_status: response.status, error_message: msg, used_url: url, used_fallback: isFallback };
        }
        logWarning(`Primary URL returned HTTP ${response.status} for ${target.source_id}, trying fallback...`);
        continue;
      }
      const content = await response.text();
      return { ok: true, content, http_status: response.status, error_message: null, used_url: url, used_fallback: isFallback };
    } catch (e) {
      if (isFallback || i === urls.length - 1) {
        return { ok: false, content: '', http_status: null, error_message: e.message, used_url: url, used_fallback: isFallback };
      }
      logWarning(`Primary URL failed for ${target.source_id} (${e.message}), trying fallback...`);
    }
  }
  return { ok: false, content: '', http_status: null, error_message: 'All URLs exhausted', used_url: target.url, used_fallback: false };
}

// Main Execution
async function watch() {
  logInfo('Starting Real Green-Source Watcher run (T051 adapter framework)...');

  if (!fs.existsSync(TARGETS_PATH)) {
    logError(`Watch targets config file does not exist at ${TARGETS_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(KEYWORDS_PATH)) {
    logError(`Keywords config file does not exist at ${KEYWORDS_PATH}`);
    process.exit(1);
  }

  const targets = JSON.parse(fs.readFileSync(TARGETS_PATH, 'utf8'));
  const keywordsConfig = JSON.parse(fs.readFileSync(KEYWORDS_PATH, 'utf8'));

  const enabledTargets = targets.filter(t => t.enabled_for_manual_watch);
  const skippedTargets = targets.filter(t => !t.enabled_for_manual_watch);
  logInfo(`Found ${enabledTargets.length} enabled watch targets. ${skippedTargets.length} skipped.`);

  const runDate = new Date();
  const runTimestamp = runDate.toISOString();
  const runDateStr = runTimestamp.substring(0, 10);

  const summary = {
    run_timestamp: runTimestamp,
    source_health: [],
    fetched_sources: [],
    detected_candidates: [],
    skipped_items: 0,
    errors: []
  };

  const adapterReport = {
    run_timestamp: runTimestamp,
    adapters_used: [],
    total_links_extracted: 0,
    total_candidates_written: 0,
    total_blocked: 0,
  };

  // Record skipped targets
  for (const target of skippedTargets) {
    summary.source_health.push({
      source_id: target.source_id,
      url: target.url,
      status: 'skipped',
      http_status: null,
      error_message: 'disabled via enabled_for_manual_watch: false',
      used_fallback: false,
      adapter_name: null,
    });
  }

  // Daily directory
  const dailyDir = path.join(REAL_CANDIDATES_DIR, runDateStr);

  for (const target of enabledTargets) {
    logInfo(`Processing target: ${target.source_id} via adapter...`);

    // Dispatch to source-specific adapter or generic fallback
    let adapterResult;
    const adapterRelPath = ADAPTER_MAP[target.source_id];
    let adapterName = 'generic-official-adapter';

    if (adapterRelPath) {
      try {
        const adapterModule = await import(path.join(ROOT, 'scripts', 'source-adapters', path.basename(adapterRelPath)));
        adapterResult = await adapterModule.run(target, keywordsConfig);
        adapterName = adapterModule.ADAPTER_NAME || adapterName;
        logSuccess(`Adapter ${adapterName} ran for ${target.source_id}: ${adapterResult.links.length} links found.`);
      } catch (e) {
        logWarning(`Adapter load/run failed for ${target.source_id} (${e.message}), falling back to generic.`);
        adapterResult = null;
      }
    }

    if (!adapterResult) {
      try {
        const genericAdapter = await import(path.join(ROOT, 'scripts', 'source-adapters', 'generic-official-adapter.mjs'));
        adapterResult = await genericAdapter.run(target, keywordsConfig);
        adapterName = 'generic-official-adapter';
        logInfo(`Generic adapter ran for ${target.source_id}: ${adapterResult.links.length} links.`);
      } catch (e) {
        logError(`Generic adapter also failed for ${target.source_id}: ${e.message}`);
        adapterResult = { ok: false, links: [], error: e.message, adapter_name: 'generic-official-adapter', authority: target.display_name };
      }
    }

    // Health tracking
    if (!adapterResult.ok) {
      logError(`Adapter failed for ${target.source_id}: ${adapterResult.error}`);
      summary.source_health.push({
        source_id: target.source_id,
        url: target.url,
        status: 'failed',
        http_status: null,
        error_message: adapterResult.error,
        used_fallback: false,
        adapter_name: adapterName,
      });
      summary.errors.push({ source_id: target.source_id, error: adapterResult.error });
      summary.fetched_sources.push({ source_id: target.source_id, url: target.url, status: 'failed', error: adapterResult.error });
      adapterReport.adapters_used.push({ source_id: target.source_id, adapter_name: adapterName, ok: false, links_found: 0, candidates_written: 0, blocked: 0 });
      continue;
    }

    summary.source_health.push({
      source_id: target.source_id,
      url: adapterResult.url_fetched || target.url,
      status: 'ok',
      http_status: 200,
      error_message: null,
      used_fallback: false,
      adapter_name: adapterName,
    });
    summary.fetched_sources.push({
      source_id: target.source_id,
      url: adapterResult.url_fetched || target.url,
      status: 'success',
      adapter_name: adapterName,
      links_extracted: adapterResult.links.length,
    });

    adapterReport.total_links_extracted += adapterResult.links.length;

    // Ensure daily directory exists
    if (!fs.existsSync(dailyDir)) {
      fs.mkdirSync(dailyDir, { recursive: true });
    }

    let candidatesWritten = 0;
    let blockedCount = 0;

    for (const link of adapterResult.links) {
      // Inline quality gate
      const quality = inlineQualityCheck(link.title, link.url);

      if (quality.is_generic) {
        logWarning(`Generic page blocked: "${link.title}" [${link.url}]`);
        summary.skipped_items++;
        summary.detected_candidates.push({
          candidate_id: null,
          source_id: target.source_id,
          source_url: link.url,
          title: link.title,
          keywords: link.matched_keywords || [],
          quality_class: quality.quality_class,
          quality_score: quality.quality_score,
          promotion_eligible: false,
          rejection_reasons: quality.rejection_reasons,
          blocked_as_generic: true,
          adapter_name: adapterName,
        });
        blockedCount++;
        continue;
      }

      const candidate_id = getNextCandidateId();
      const dedupe_key = crypto.createHash('sha256').update(link.url).digest('hex');

      let preliminary_case_type = 'regulator_guidance';
      const lowerTitle = (link.title || '').toLowerCase();
      const lowerCat = (link.category || '').toLowerCase();
      if (lowerCat === 'enforcement' || lowerTitle.includes('enforcement') || lowerTitle.includes('settlement') || lowerTitle.includes('investigation') || lowerTitle.includes('penalty')) {
        preliminary_case_type = 'enforcement';
      } else if (lowerCat === 'official_decision' || lowerTitle.includes('court') || lowerTitle.includes('judgment') || lowerTitle.includes('ruling')) {
        preliminary_case_type = 'court_decision';
      } else if (lowerCat === 'guidance') {
        preliminary_case_type = 'regulator_guidance';
      }

      const candidateRecord = {
        candidate_id,
        detected_at: runTimestamp,
        source_id: target.source_id,
        source_url: link.url,
        title: link.title,
        date_published: formatPublishedDate(link.date_detected),
        detected_keywords: link.matched_keywords || [],
        preliminary_case_type,
        jurisdiction: target.jurisdiction,
        source_tier: 'green',
        confidence_score: 0.85,
        dedupe_key,
        status: 'real_detected',
        quality_class: quality.quality_class,
        quality_score: quality.quality_score,
        promotion_eligible: quality.promotion_eligible,
        rejection_reasons: quality.rejection_reasons,
        risk_flags: ['no_risk_detected'],
        adapter_name: adapterName,
        extraction_method: link.extraction_method || 'html_link_scan',
        confidence_reason: link.confidence_reason || '',
        authority: link.authority || target.display_name,
        category: link.category || 'unknown',
        notes: `Factual candidate record automatically detected during operator Green-source watcher run. Source jurisdiction: ${target.jurisdiction}. Adapter: ${adapterName}.`
      };

      const candidatePath = path.join(dailyDir, `${candidate_id}.json`);
      fs.writeFileSync(candidatePath, JSON.stringify(candidateRecord, null, 2), 'utf8');
      logSuccess(`Candidate stored: ${candidate_id} [${quality.quality_class}|score:${quality.quality_score}] adapter:${adapterName}`);

      summary.detected_candidates.push({
        candidate_id,
        source_id: target.source_id,
        source_url: link.url,
        title: link.title,
        keywords: link.matched_keywords || [],
        quality_class: quality.quality_class,
        quality_score: quality.quality_score,
        promotion_eligible: quality.promotion_eligible,
        rejection_reasons: quality.rejection_reasons,
        blocked_as_generic: false,
        adapter_name: adapterName,
      });
      candidatesWritten++;
    }

    adapterReport.total_candidates_written += candidatesWritten;
    adapterReport.total_blocked += blockedCount;
    adapterReport.adapters_used.push({
      source_id: target.source_id,
      adapter_name: adapterName,
      ok: true,
      links_found: adapterResult.links.length,
      candidates_written: candidatesWritten,
      blocked: blockedCount,
    });
  }

  // Ensure runs directory
  if (!fs.existsSync(RUNS_DIR)) {
    fs.mkdirSync(RUNS_DIR, { recursive: true });
  }

  // Write timestamped run log
  const safeTimestamp = runTimestamp.replace(/:/g, '-');
  const runLogPath = path.join(RUNS_DIR, `watch-run-${safeTimestamp}.json`);
  fs.writeFileSync(runLogPath, JSON.stringify(summary, null, 2), 'utf8');

  // Write adapter summary
  fs.writeFileSync(ADAPTER_SUMMARY_PATH, JSON.stringify(adapterReport, null, 2), 'utf8');
  logSuccess(`Adapter run report written to: ${ADAPTER_SUMMARY_PATH}`);

  // Write latest-watch-summary.json
  const promotionEligibleCount = summary.detected_candidates.filter(c => c.promotion_eligible === true).length;
  const genericBlockedCount = summary.detected_candidates.filter(c => c.blocked_as_generic === true).length;

  const latestSummary = {
    run_timestamp: summary.run_timestamp,
    source_health: summary.source_health,
    sources_ok: summary.source_health.filter(s => s.status === 'ok').length,
    sources_failed: summary.source_health.filter(s => s.status === 'failed').length,
    sources_skipped: summary.source_health.filter(s => s.status === 'skipped').length,
    detected_candidates_count: summary.detected_candidates.filter(c => c.candidate_id !== null).length,
    generic_blocked_count: genericBlockedCount,
    promotion_eligible_count: promotionEligibleCount,
    skipped_items: summary.skipped_items,
    errors_count: summary.errors.length,
    run_log_path: runLogPath,
    adapter_summary_path: ADAPTER_SUMMARY_PATH,
  };
  fs.writeFileSync(LATEST_SUMMARY_PATH, JSON.stringify(latestSummary, null, 2), 'utf8');
  logSuccess(`Latest watch summary written to: ${LATEST_SUMMARY_PATH}`);

  console.log('\n==========================================');
  console.log('       Caesar Watcher Run Summary         ');
  console.log('==========================================');
  console.log(`Run Time:       ${runTimestamp}`);
  console.log(`Log Path:       ${runLogPath}`);
  console.log(`Sources OK:          ${latestSummary.sources_ok}`);
  console.log(`Sources Failed:      ${latestSummary.sources_failed}`);
  console.log(`Sources Skipped:     ${latestSummary.sources_skipped}`);
  console.log(`Candidates stored:   ${latestSummary.detected_candidates_count}`);
  console.log(`Generic blocked:     ${latestSummary.generic_blocked_count}`);
  console.log(`Promotion eligible:  ${latestSummary.promotion_eligible_count}`);
  console.log(`Skipped (no match):  ${summary.skipped_items} link(s)`);
  console.log(`Errors:              ${summary.errors.length} encountered`);
  console.log('==========================================\n');
}

watch().catch(err => {
  logError('Watcher crashed with critical error:', err);
  process.exit(1);
});
