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

// Main Execution
async function watch() {
  logInfo('Starting Real Green-Source Watcher run...');

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
  logInfo(`Found ${enabledTargets.length} enabled watch targets.`);

  const runDate = new Date();
  const runTimestamp = runDate.toISOString();
  const runDateStr = runTimestamp.substring(0, 10); // YYYY-MM-DD

  const summary = {
    run_timestamp: runTimestamp,
    fetched_sources: [],
    detected_candidates: [],
    skipped_items: 0,
    errors: []
  };

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
  };

  for (const target of enabledTargets) {
    logInfo(`Fetching target: ${target.source_id} (${target.url}) ...`);
    
    let content = '';
    try {
      const response = await fetch(target.url, { headers, signal: AbortSignal.timeout(10000) });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      content = await response.text();
      logSuccess(`Fetched ${target.source_id} successfully (${content.length} bytes).`);
      
      summary.fetched_sources.push({
        source_id: target.source_id,
        url: target.url,
        status: 'success',
        bytes: content.length
      });
    } catch (e) {
      logError(`Failed to fetch target ${target.source_id}: ${e.message}`);
      summary.errors.push({
        source_id: target.source_id,
        url: target.url,
        error: e.message
      });
      
      summary.fetched_sources.push({
        source_id: target.source_id,
        url: target.url,
        status: 'failed',
        error: e.message
      });
      continue;
    }

    // Extract links
    let extractedLinks = [];
    if (target.fetch_mode === 'feed') {
      extractedLinks = extractFeedLinks(content, target.url);
    } else {
      extractedLinks = extractHtmlLinks(content, target.url);
    }

    logInfo(`Extracted ${extractedLinks.length} raw links from ${target.source_id}.`);

    // De-duplicate extracted links within this run to avoid scanning identical URLs multiple times
    const uniqueExtractedLinks = [];
    const seenUrlsInTarget = new Set();
    for (const link of extractedLinks) {
      if (!seenUrlsInTarget.has(link.url)) {
        seenUrlsInTarget.add(link.url);
        uniqueExtractedLinks.push(link);
      }
    }

    let detectedCount = 0;
    const maxLinks = target.max_links_per_run || 10;

    for (const link of uniqueExtractedLinks) {
      if (detectedCount >= maxLinks) {
        logInfo(`Reached max_links_per_run limit of ${maxLinks} for target ${target.source_id}.`);
        break;
      }

      // Check if keyword filters match
      const check = matchKeywords(link.title, link.url, keywordsConfig);
      if (check.matches) {
        detectedCount++;
        
        // Generate new candidate record
        const candidate_id = getNextCandidateId();
        const detected_at = runTimestamp;
        
        // Dedupe key
        const dedupe_key = crypto.createHash('sha256').update(link.url).digest('hex');

        // Determine preliminary_case_type
        let preliminary_case_type = 'regulator_guidance';
        const lowerTitle = link.title.toLowerCase();
        if (lowerTitle.includes('enforcement') || lowerTitle.includes('settlement') || lowerTitle.includes('complaint') || lowerTitle.includes('investigation') || lowerTitle.includes('penalty')) {
          preliminary_case_type = 'enforcement';
        } else if (lowerTitle.includes('court') || lowerTitle.includes('judgment') || lowerTitle.includes('lawsuit')) {
          preliminary_case_type = 'lawsuit';
        }

        const candidateRecord = {
          candidate_id,
          detected_at,
          source_id: target.source_id,
          source_url: link.url,
          title: link.title,
          date_published: formatPublishedDate(link.pubDate),
          detected_keywords: check.keywords,
          preliminary_case_type,
          jurisdiction: target.jurisdiction,
          source_tier: 'green',
          confidence_score: 0.85,
          dedupe_key,
          status: 'real_detected',
          risk_flags: ['no_risk_detected'],
          notes: `Factual candidate record automatically detected during operator Green-source watcher run. Source jurisdiction: ${target.jurisdiction}.`
        };

        // Write candidate file to data/watch/real-candidates/YYYY-MM-DD/
        const dailyDir = path.join(REAL_CANDIDATES_DIR, runDateStr);
        if (!fs.existsSync(dailyDir)) {
          fs.mkdirSync(dailyDir, { recursive: true });
        }
        
        const candidatePath = path.join(dailyDir, `${candidate_id}.json`);
        fs.writeFileSync(candidatePath, JSON.stringify(candidateRecord, null, 2), 'utf8');
        logSuccess(`Detected candidate stored: ${candidate_id} -> ${candidatePath}`);

        summary.detected_candidates.push({
          candidate_id,
          source_id: target.source_id,
          source_url: link.url,
          title: link.title,
          keywords: check.keywords
        });
      } else {
        summary.skipped_items++;
      }
    }
  }

  // Write run log to data/watch/runs/watch-run-YYYY-MM-DDTHH-MM-SSZ.json
  // Replace ':' with '-' in timestamp to be safe across OS filesystems
  const safeTimestamp = runTimestamp.replace(/:/g, '-');
  const runLogPath = path.join(RUNS_DIR, `watch-run-${safeTimestamp}.json`);

  if (!fs.existsSync(RUNS_DIR)) {
    fs.mkdirSync(RUNS_DIR, { recursive: true });
  }

  fs.writeFileSync(runLogPath, JSON.stringify(summary, null, 2), 'utf8');
  
  // Print summary console output
  console.log('\n==========================================');
  console.log('       Caesar Watcher Run Summary         ');
  console.log('==========================================');
  console.log(`Run Time:       ${runTimestamp}`);
  console.log(`Log Path:       ${runLogPath}`);
  console.log(`Sources Fetched:${summary.fetched_sources.filter(s => s.status === 'success').length} succeeded, ${summary.fetched_sources.filter(s => s.status === 'failed').length} failed`);
  console.log(`Detected:       ${summary.detected_candidates.length} candidate(s)`);
  console.log(`Skipped:        ${summary.skipped_items} non-matching link(s)`);
  console.log(`Errors:         ${summary.errors.length} encountered`);
  console.log('==========================================\n');
}

watch().catch(err => {
  logError('Watcher crashed with critical error:', err);
  process.exit(1);
});
