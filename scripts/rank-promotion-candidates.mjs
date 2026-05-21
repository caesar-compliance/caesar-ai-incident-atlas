import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const REVIEWS_DIR = path.join(ROOT, 'data', 'reviews', 'real');
const PREVIEWS_DIR = path.join(ROOT, 'data', 'promotion-previews', 'real');
const REVIEW_BUNDLE = path.join(ROOT, 'tools', 'review-console', 'real-review-bundle.json');

function loadPackets() {
  if (!fs.existsSync(PACKETS_DIR)) return [];
  const files = fs.readdirSync(PACKETS_DIR).filter(f => f.endsWith('.json') && f !== '.gitkeep');
  const packets = [];
  for (const f of files) {
    try {
      const p = JSON.parse(fs.readFileSync(path.join(PACKETS_DIR, f), 'utf8'));
      packets.push(p);
    } catch (e) {
      console.error(`[Error] Failed to load packet ${f}: ${e.message}`);
    }
  }
  return packets;
}

function loadDraft(draftId) {
  const draftPath = path.join(DRAFTS_DIR, `${draftId}.json`);
  if (!fs.existsSync(draftPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(draftPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadReviewBundle() {
  if (!fs.existsSync(REVIEW_BUNDLE)) return { candidates: [] };
  try {
    return JSON.parse(fs.readFileSync(REVIEW_BUNDLE, 'utf8'));
  } catch (e) {
    return { candidates: [] };
  }
}

function findCandidateForPacket(packet, bundle) {
  const candidateId = packet.candidate_ids?.[0];
  if (!candidateId) return null;
  return bundle.candidates?.find(c => c.candidate_id === candidateId) || null;
}

function scorePacket(packet, draft, candidate) {
  let score = 0;
  const reasons = [];
  const risks = [];

  // Source tier (critical): Green = good, Yellow/Red = reject
  const sourceTier = packet.source_tier || 'green';
  if (sourceTier === 'green') {
    score += 50;
    reasons.push('Green source tier (+50)');
  } else if (sourceTier === 'yellow') {
    score -= 100;
    risks.push('YELLOW SOURCE: Requires explicit Control Tower override');
  } else if (sourceTier === 'red') {
    score -= 200;
    risks.push('RED SOURCE: Promotion blocked');
  }

  // Source health (from candidate)
  const hasSourceUrl = packet.source_urls?.length > 0 && packet.source_urls[0]?.startsWith('http');
  if (hasSourceUrl) {
    score += 15;
    reasons.push('Source URL verified (+15)');
  } else {
    risks.push('Missing or invalid source URL');
  }

  // Legal/commercial relevance
  if (draft?.legal_domain) {
    score += 10;
    reasons.push('Legal domain classified (+10)');
  }
  if (draft?.commercial_domain) {
    score += 10;
    reasons.push('Commercial domain classified (+10)');
  }

  // Clean governance lesson
  if (draft?.training_lesson && draft.training_lesson.length > 50) {
    score += 10;
    reasons.push('Governance lesson documented (+10)');
  }

  // Low defamation risk (no named companies in draft title)
  const draftTitle = draft?.proposed_case_title || '';
  const namedCompanyRisk = /\b(?:Inc\.?|Corp\.?|Ltd\.?|LLC|GmbH|AG|SA)\b/i.test(draftTitle) ||
                           /\b(?:Google|Amazon|Microsoft|Apple|Meta|OpenAI|Anthropic|Air Canada|Avianca)\b/i.test(draftTitle);
  if (!namedCompanyRisk) {
    score += 10;
    reasons.push('Low defamation risk (+10)');
  } else {
    risks.push('Named entity detected in title - requires legal review');
  }

  // Clear missing controls
  if (draft?.missing_controls?.length >= 2) {
    score += 5;
    reasons.push('Missing controls documented (+5)');
  }

  // Clear required evidence
  if (draft?.required_evidence?.length >= 3) {
    score += 5;
    reasons.push('Evidence requirements clear (+5)');
  }

  // No copied text risk
  if (draft?.source_text_copied === false) {
    score += 15;
    reasons.push('Clean-room confirmed: no source text copied (+15)');
  } else {
    risks.push('Source text copied flag not confirmed false');
  }

  // Required reviews completed (bonus if any are done)
  const checklist = packet.checklist || {};
  const completedReviews = Object.values(checklist).filter(v => v === true).length;
  if (completedReviews > 0) {
    score += completedReviews * 5;
    reasons.push(`${completedReviews} review(s) completed (+${completedReviews * 5})`);
  }

  // Check promotion_allowed from packet
  if (packet.promotion_allowed === true) {
    score += 20;
    reasons.push('Promotion pre-approved (+20)');
  }

  return {
    score,
    reasons,
    risks,
    source_tier: sourceTier,
    promotion_allowed: packet.promotion_allowed === true,
    requires_control_tower_override: sourceTier !== 'green' || risks.length > 0
  };
}

function rankCandidates() {
  console.log('=== Ranking Promotion Candidates ===\n');

  const packets = loadPackets();
  const bundle = loadReviewBundle();

  if (packets.length === 0) {
    console.log('[Warning] No promotion packets found. Run build-promotion-packets.mjs first.');
    process.exit(0);
  }

  const ranked = [];

  for (const packet of packets) {
    const draft = loadDraft(packet.draft_id);
    const candidate = findCandidateForPacket(packet, bundle);

    const scoring = scorePacket(packet, draft, candidate);

    ranked.push({
      packet_id: packet.packet_id,
      draft_id: packet.draft_id,
      candidate_id: packet.candidate_ids?.[0] || null,
      suggested_public_case_id: packet.suggested_public_case_id,
      suggested_public_filename: packet.suggested_public_filename,
      score: scoring.score,
      ranking_reasons: scoring.reasons,
      risk_flags: scoring.risks,
      source_tier: scoring.source_tier,
      promotion_pre_allowed: scoring.promotion_allowed,
      requires_control_tower_approval: true,
      requires_legal_review: scoring.risks.some(r => r.includes('legal') || r.includes('defamation')),
      required_reviews: packet.required_reviews || [],
      missing_information: packet.missing_information || [],
      safety_declarations: packet.safety_declarations || {}
    });
  }

  // Sort by score descending
  ranked.sort((a, b) => b.score - a.score);

  // Add rank number
  ranked.forEach((item, index) => {
    item.rank = index + 1;
  });

  // Determine top recommendation
  const topCandidate = ranked[0];
  const recommendation = {
    top_packet_id: topCandidate?.packet_id || null,
    top_draft_id: topCandidate?.draft_id || null,
    top_candidate_id: topCandidate?.candidate_id || null,
    top_score: topCandidate?.score || 0,
    reason: topCandidate ? `Highest scoring packet (${topCandidate.score} points). ${topCandidate.ranking_reasons.slice(0, 3).join('; ')}.` : 'No candidates available',
    risks: topCandidate?.risk_flags || [],
    required_approval: 'Control Tower approval required before any public promotion',
    next_steps: [
      '1. Review top candidate in local review console',
      '2. Complete curator risk review checklist',
      '3. Obtain Control Tower explicit approval',
      '4. Add approval to data/reviews/real/approved-promotions.json',
      '5. Run promote-approved-case.mjs'
    ]
  };

  const output = {
    generated_at: new Date().toISOString(),
    total_candidates: ranked.length,
    ranked_candidates: ranked,
    top_recommendation: recommendation,
    safety_note: 'ALL candidates require Control Tower approval before public promotion. No automatic promotion will occur.'
  };

  // Ensure output directory exists
  if (!fs.existsSync(REVIEWS_DIR)) {
    fs.mkdirSync(REVIEWS_DIR, { recursive: true });
  }

  const outputPath = path.join(REVIEWS_DIR, 'ranked-promotion-candidates.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

  // Print summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  RANKING COMPLETE');
  console.log(`${'='.repeat(60)}`);
  console.log(`Total packets ranked: ${ranked.length}`);
  console.log(`\nTop 5 Candidates:`);
  ranked.slice(0, 5).forEach(r => {
    const status = r.risk_flags.length === 0 ? '✓' : '⚠';
    console.log(`  ${status} Rank ${r.rank}: ${r.packet_id} (${r.draft_id}) - Score: ${r.score}`);
    if (r.risk_flags.length > 0) {
      console.log(`      Risks: ${r.risk_flags[0]}${r.risk_flags.length > 1 ? ' +' + (r.risk_flags.length - 1) + ' more' : ''}`);
    }
  });

  console.log(`\n${'='.repeat(60)}`);
  console.log('  TOP RECOMMENDATION');
  console.log(`${'='.repeat(60)}`);
  console.log(`Packet: ${recommendation.top_packet_id}`);
  console.log(`Draft:  ${recommendation.top_draft_id}`);
  console.log(`Score:  ${recommendation.top_score}`);
  console.log(`\nReason: ${recommendation.reason}`);
  if (recommendation.risks.length > 0) {
    console.log(`\nRisks:`);
    recommendation.risks.forEach(r => console.log(`  - ${r}`));
  }
  console.log(`\n${recommendation.required_approval}`);
  console.log(`\nNext Steps:`);
  recommendation.next_steps.forEach(s => console.log(`  ${s}`));
  console.log(`\nOutput written to: ${outputPath}`);
  console.log(`${'='.repeat(60)}\n`);

  return output;
}

const result = rankCandidates();
process.exit(0);
