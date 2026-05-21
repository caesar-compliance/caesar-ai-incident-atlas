import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const REAL_CANDIDATES_DIR = path.join(ROOT, 'data', 'watch', 'real-candidates');
const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const PREVIEWS_DIR = path.join(ROOT, 'data', 'promotion-previews', 'real');
const REVIEWS_DIR = path.join(ROOT, 'data', 'reviews', 'real');
const INCIDENTS_DIR = path.join(ROOT, 'data', 'incidents');

const BLOCKED_QUALITY_CLASSES = ['generic_page', 'event_or_webinar', 'job_or_procurement', 'low_relevance'];
const GENERIC_COMPLAINT_PATTERNS = [
  'make a complaint', 'contact us', 'about us', 'privacy notice', 'privacy policy',
  'accessibility', 'terms of use', 'help centre', 'help center', 'feedback', 'faq',
  'webinar', 'job vacancy', 'procurement notice', 'tender',
];
const GENERIC_URL_PATTERNS = [
  '/make-a-complaint', '/contact', '/about', '/events/', '/jobs', '/webinar',
  '/procurement', '/privacy', '/help', '/faq', '/feedback',
];

function logPass(msg) { console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`); }
function logFail(msg) { console.error(`\x1b[31m[FAIL]\x1b[0m ${msg}`); }
function logInfo(msg) { console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`); }
function logWarn(msg) { console.warn(`\x1b[33m[WARN]\x1b[0m ${msg}`); }

function scanCandidates(dir) {
  const list = [];
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      list.push(...scanCandidates(fullPath));
    } else if (item.isFile() && item.name.endsWith('.json')) {
      try {
        const c = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (c.candidate_id) list.push(c);
      } catch (e) { /* skip */ }
    }
  }
  return list;
}

function validate() {
  console.log('=== Candidate Quality Validator (T050) ===\n');
  let failures = 0;

  // ── 1. No generic complaint/contact/about/event/job pages should be ranked top ──
  const rankedPath = path.join(REVIEWS_DIR, 'ranked-promotion-candidates.json');
  if (fs.existsSync(rankedPath)) {
    const ranked = JSON.parse(fs.readFileSync(rankedPath, 'utf8'));
    const topCandidate = ranked.ranked_candidates?.[0];

    if (topCandidate) {
      const topTitle = (topCandidate.draft_id || '').toLowerCase();
      const isTopBlocked = BLOCKED_QUALITY_CLASSES.includes(topCandidate.quality_class);

      if (isTopBlocked) {
        logFail(`Top ranked candidate [${topCandidate.packet_id}] has blocked quality_class: "${topCandidate.quality_class}"`);
        failures++;
      } else if (!topCandidate.promotion_eligible && !ranked.no_publication_candidate_ready) {
        logFail(`Top ranked candidate [${topCandidate.packet_id}] is not promotion_eligible but no_publication_candidate_ready is not set`);
        failures++;
      } else if (ranked.no_publication_candidate_ready) {
        logPass(`No publication candidate ready — system correctly reports no_publication_candidate_ready: true`);
      } else {
        logPass(`Top ranked candidate [${topCandidate.packet_id}] is eligible: quality_class=${topCandidate.quality_class}, score=${topCandidate.quality_score}`);
      }
    } else {
      logInfo('No ranked candidates found (empty ranked list).');
    }

    // Confirm no_publication_candidate_ready is set if all are blocked
    const allBlocked = (ranked.ranked_candidates || []).every(c => !c.promotion_eligible);
    if (allBlocked && ranked.ranked_candidates?.length > 0) {
      if (!ranked.no_publication_candidate_ready) {
        logFail('All candidates are blocked but no_publication_candidate_ready is not set to true in ranked output');
        failures++;
      } else {
        logPass('All candidates blocked and no_publication_candidate_ready correctly set');
      }
    }
  } else {
    logInfo('ranked-promotion-candidates.json not found (run rank-promotion-candidates.mjs)');
  }

  // ── 2. No promotion packets for blocked generic pages ──
  if (fs.existsSync(PACKETS_DIR)) {
    const packetFiles = fs.readdirSync(PACKETS_DIR).filter(f => f.endsWith('.json') && f !== '.gitkeep');
    let genericPacketCount = 0;

    for (const f of packetFiles) {
      try {
        const pkt = JSON.parse(fs.readFileSync(path.join(PACKETS_DIR, f), 'utf8'));

        // A blocked-class packet is OK as long as:
        // (a) promotion_allowed is false, AND (b) quality_class is correctly set as blocked
        // It is NOT OK if promotion_allowed is true on a blocked-class packet
        if (pkt.quality_class && BLOCKED_QUALITY_CLASSES.includes(pkt.quality_class)) {
          if (pkt.promotion_allowed === true) {
            logFail(`Promotion packet ${pkt.packet_id} has blocked quality_class "${pkt.quality_class}" but promotion_allowed is TRUE`);
            failures++;
            genericPacketCount++;
          } else {
            logInfo(`Packet ${pkt.packet_id} has blocked quality_class "${pkt.quality_class}" — correctly marked promotion_allowed: false`);
          }
          continue; // don't check URL patterns on already-classified blocked packets
        }

        // For non-blocked packets: check source URLs for undetected generic patterns
        for (const url of (pkt.source_urls || [])) {
          const u = (url || '').toLowerCase();
          for (const pattern of GENERIC_URL_PATTERNS) {
            if (u.includes(pattern)) {
              logFail(`Promotion packet ${pkt.packet_id} [unblocked] source URL contains generic pattern: "${pattern}" [${url}]`);
              failures++;
              genericPacketCount++;
              break;
            }
          }
        }
      } catch (e) { /* skip */ }
    }

    if (genericPacketCount === 0) {
      logPass(`No promotion-allowed packets found for blocked generic pages (${packetFiles.length} packets checked)`);
    }
  } else {
    logInfo('No promotion-packets/real directory found');
  }

  // ── 3. No dry-run previews for blocked generic pages ──
  if (fs.existsSync(PREVIEWS_DIR)) {
    const previewFiles = fs.readdirSync(PREVIEWS_DIR).filter(f => f.endsWith('.json'));
    let badPreviewCount = 0;

    for (const f of previewFiles) {
      if (f === 'no-candidate-ready-report.json') {
        logInfo(`Found no-candidate-ready-report.json — system correctly reported no eligible candidate`);
        continue;
      }
      try {
        const preview = JSON.parse(fs.readFileSync(path.join(PREVIEWS_DIR, f), 'utf8'));
        // Check title for generic patterns
        const titleLow = (preview.title || '').toLowerCase();
        for (const pattern of GENERIC_COMPLAINT_PATTERNS) {
          if (titleLow.includes(pattern)) {
            logFail(`Dry-run preview ${f} has generic pattern in title: "${pattern}"`);
            failures++;
            badPreviewCount++;
            break;
          }
        }
        // Check source URLs
        for (const src of (preview.sources || [])) {
          const u = (src.url || '').toLowerCase();
          for (const pattern of GENERIC_URL_PATTERNS) {
            if (u.includes(pattern)) {
              logFail(`Dry-run preview ${f} source URL contains generic pattern: "${pattern}"`);
              failures++;
              badPreviewCount++;
              break;
            }
          }
        }
      } catch (e) { /* skip */ }
    }

    if (badPreviewCount === 0) {
      logPass(`No dry-run previews found for blocked generic pages (${previewFiles.length} previews checked)`);
    }
  } else {
    logInfo('No promotion-previews/real directory found');
  }

  // ── 4. Current top candidate is promotion_eligible OR system reports no ready candidate ──
  if (fs.existsSync(rankedPath)) {
    const ranked = JSON.parse(fs.readFileSync(rankedPath, 'utf8'));
    const hasEligible = (ranked.ranked_candidates || []).some(c => c.promotion_eligible === true);
    const noReadyFlag = ranked.no_publication_candidate_ready === true;

    if (!hasEligible && !noReadyFlag) {
      logFail('No promotion-eligible candidate exists but no_publication_candidate_ready is not true');
      failures++;
    } else if (!hasEligible && noReadyFlag) {
      logPass('System correctly reports no_publication_candidate_ready: true (no eligible candidate)');
    } else {
      const bestEligible = ranked.ranked_candidates.find(c => c.promotion_eligible === true);
      logPass(`At least one promotion-eligible candidate found: ${bestEligible?.packet_id} [${bestEligible?.quality_class}|score:${bestEligible?.quality_score}]`);
    }
  }

  // ── 5. Candidate files — check real candidates for quality fields ──
  const candidates = scanCandidates(REAL_CANDIDATES_DIR);
  logInfo(`Scanning ${candidates.length} candidate file(s) for quality fields...`);

  let candidatesWithQualityFields = 0;
  let candidatesWithoutQualityFields = 0;
  let genericCandidatesStoredAsFiles = 0;

  for (const c of candidates) {
    if (c.quality_class !== undefined && c.quality_score !== undefined && c.promotion_eligible !== undefined) {
      candidatesWithQualityFields++;
    } else {
      candidatesWithoutQualityFields++;
    }
    // A generic candidate should never have been written to disk as a file
    // (the watcher gate should have blocked it before writing)
    if (c.quality_class && BLOCKED_QUALITY_CLASSES.includes(c.quality_class) && c.promotion_eligible !== false) {
      logFail(`Candidate ${c.candidate_id} has blocked quality_class "${c.quality_class}" but promotion_eligible is not false`);
      failures++;
      genericCandidatesStoredAsFiles++;
    }
  }

  logInfo(`Candidates with quality fields: ${candidatesWithQualityFields}/${candidates.length}`);
  if (candidatesWithoutQualityFields > 0) {
    logWarn(`${candidatesWithoutQualityFields} candidate(s) missing quality fields — run classify-candidate-quality.mjs`);
  }

  // ── 6. Public dataset count matches approved baseline ──
  let publicCount = 0;
  if (fs.existsSync(INCIDENTS_DIR)) {
    publicCount = fs.readdirSync(INCIDENTS_DIR).filter(f => f.endsWith('.json')).length;
  }
  const approvalsPathCQ = path.join(ROOT, 'data', 'reviews', 'real', 'approved-promotions.json');
  let approvedCountCQ = 0;
  if (fs.existsSync(approvalsPathCQ)) {
    try { approvedCountCQ = (JSON.parse(fs.readFileSync(approvalsPathCQ,'utf8')).approvals||[]).length; } catch(e){}
  }
  const expectedCQ = 12 + approvedCountCQ;
  if (publicCount !== expectedCQ) {
    logFail(`Public incident count is ${publicCount}, expected exactly ${expectedCQ}`);
    failures++;
  } else {
    logPass(`Public dataset at expected count: ${expectedCQ} records`);
  }

  // ── 7. INC-0013 approved record must exist (T054) ──
  const inc0013Approved = path.join(INCIDENTS_DIR, 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  const inc0013SiteApproved = path.join(ROOT, 'site', 'data', 'incidents', 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  if (!fs.existsSync(inc0013Approved) || !fs.existsSync(inc0013SiteApproved)) {
    logFail('INC-0013 approved record (T054) missing from data/ or site/');
    failures++;
  } else {
    logPass('INC-0013 approved record present (T054 CT approval)');
  }

  // ── 8. CAND-0018 / "Make a complaint" was blocked ──
  const cand0018Path = path.join(REAL_CANDIDATES_DIR, '2026-05-21', 'CAND-0018.json');
  if (fs.existsSync(cand0018Path)) {
    try {
      const cand = JSON.parse(fs.readFileSync(cand0018Path, 'utf8'));
      if (cand.promotion_eligible === true) {
        logFail('CAND-0018 "Make a complaint" has promotion_eligible: true — must be blocked');
        failures++;
      } else {
        logPass(`CAND-0018 "Make a complaint" correctly blocked: quality_class=${cand.quality_class}, score=${cand.quality_score}`);
      }
      // Also check PKT-0001 was not given a good packet
      const pkt0001Path = path.join(PACKETS_DIR, 'PKT-0001.json');
      if (fs.existsSync(pkt0001Path)) {
        const pkt = JSON.parse(fs.readFileSync(pkt0001Path, 'utf8'));
        if (pkt.quality_class && !BLOCKED_QUALITY_CLASSES.includes(pkt.quality_class)) {
          logFail('PKT-0001 is not marked as a blocked quality class — it comes from CAND-0018 generic page');
          failures++;
        } else {
          logPass(`PKT-0001 correctly has blocked quality_class: ${pkt.quality_class || 'legacy (no quality_class field)'}`);
        }
      }
    } catch (e) {
      logWarn(`Could not read CAND-0018.json: ${e.message}`);
    }
  } else {
    logInfo('CAND-0018.json not found at expected path — skipping specific check');
  }

  // ── Summary ──
  console.log(`\n${'='.repeat(60)}`);
  if (failures === 0) {
    logPass('ALL CANDIDATE QUALITY VALIDATIONS PASSED');
    console.log(`${'='.repeat(60)}\n`);
    process.exit(0);
  } else {
    logFail(`${failures} VALIDATION FAILURE(S) — review output above`);
    console.log(`${'='.repeat(60)}\n`);
    process.exit(1);
  }
}

validate();
