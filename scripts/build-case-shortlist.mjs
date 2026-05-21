// Build case shortlist — Top 5 candidates for Control Tower review (T052)
// Creates high-signal shortlist from ranked promotion candidates

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const RANKED_PATH = path.join(ROOT, 'data', 'reviews', 'real', 'ranked-promotion-candidates.json');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const SHORTLIST_PATH = path.join(ROOT, 'data', 'reviews', 'real', 'case-shortlist.json');
const CASE_QUALITY_CLASSES = ['likely_enforcement_case', 'likely_official_decision', 'likely_case'];

function loadJsonFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadDraft(draftId) {
  return loadJsonFile(path.join(DRAFTS_DIR, `${draftId}.json`));
}

function loadPacket(packetId) {
  return loadJsonFile(path.join(PACKETS_DIR, `${packetId}.json`));
}

function determineRecommendedAction(item) {
  if (item.promotion_eligible && item.case_quality_ready) {
    return 'ready_for_control_tower_review';
  }
  if (!item.promotion_eligible && item.quality_class?.includes('guidance')) {
    return 'guidance_only_not_case';
  }
  if (!item.promotion_eligible) {
    return 'blocked_low_quality';
  }
  return 'needs_more_source_confirmation';
}

function buildShortlist() {
  console.log('=== Building Case Shortlist (T052) ===\n');

  const rankedData = loadJsonFile(RANKED_PATH);
  if (!rankedData || !rankedData.ranked_candidates) {
    console.error('[Error] No ranked candidates found. Run rank-promotion-candidates.mjs first.');
    process.exit(1);
  }

  const top5 = rankedData.ranked_candidates.slice(0, 5);
  const shortlistItems = [];

  for (const ranked of top5) {
    const draft = loadDraft(ranked.draft_id);
    const packet = loadPacket(ranked.packet_id);

    const isCaseQuality = CASE_QUALITY_CLASSES.includes(ranked.quality_class);
    const caseQualityReady = ranked.promotion_eligible && isCaseQuality;

    const whyItMatters = isCaseQuality
      ? `Enforcement/decision case from ${draft?.source_authorities?.[0] || 'regulatory authority'}. Direct legal precedent for AI governance.`
      : `Regulatory guidance from ${draft?.source_authorities?.[0] || 'authority'}. Provides compliance framework signals.`;

    const governanceValue = isCaseQuality
      ? 'Demonstrates actual regulatory enforcement patterns. Use for vendor due diligence and compliance gap analysis.'
      : 'Shows emerging regulatory expectations. Monitor for future enforcement trends.';

    const publicationRisks = [];
    if (draft?.proposed_case_title?.includes('[')) {
      publicationRisks.push('Draft title needs curation');
    }
    if (!draft?.source_text_copied === false) {
      publicationRisks.push('Clean-room status not confirmed');
    }
    if (ranked.requires_legal_review) {
      publicationRisks.push('Legal review required');
    }
    if (publicationRisks.length === 0) {
      publicationRisks.push('Low risk - standard review workflow');
    }

    const missingInfo = packet?.missing_information || [
      'Independent curator review of title for neutrality',
      'Legal domain classification confirmation',
      'Control Tower sign-off on publication timing'
    ];

    const item = {
      rank: ranked.rank,
      packet_id: ranked.packet_id,
      draft_id: ranked.draft_id,
      candidate_ids: packet?.candidate_ids || [ranked.candidate_id],
      title: draft?.proposed_case_title?.replace('[DRAFT] ', '') || 'Untitled',
      source_authority: draft?.source_authorities?.[0] || 'Unknown',
      source_urls: packet?.source_urls || draft?.source_urls || [],
      quality_class: ranked.quality_class,
      quality_score: ranked.quality_score,
      promotion_eligible: ranked.promotion_eligible,
      case_quality_ready: caseQualityReady,
      why_it_matters: whyItMatters,
      governance_value: governanceValue,
      publication_risks: publicationRisks,
      missing_information: missingInfo,
      recommended_action: determineRecommendedAction({
        promotion_eligible: ranked.promotion_eligible,
        case_quality_ready: caseQualityReady,
        quality_class: ranked.quality_class
      })
    };

    shortlistItems.push(item);
  }

  const shortlist = {
    generated_at: new Date().toISOString(),
    task: 'T052',
    shortlist_version: '1.0',
    total_items: shortlistItems.length,
    ready_for_review_count: shortlistItems.filter(i => i.case_quality_ready).length,
    guidance_only_count: shortlistItems.filter(i => i.recommended_action === 'guidance_only_not_case').length,
    items: shortlistItems,
    summary: {
      top_recommended_packet: shortlistItems.find(i => i.case_quality_ready)?.packet_id || shortlistItems[0]?.packet_id,
      top_recommended_draft: shortlistItems.find(i => i.case_quality_ready)?.draft_id || shortlistItems[0]?.draft_id,
      any_ready_for_control_tower: shortlistItems.some(i => i.case_quality_ready),
      all_require_approval: true,
      safety_note: 'No public promotion without Control Tower explicit approval'
    }
  };

  fs.writeFileSync(SHORTLIST_PATH, JSON.stringify(shortlist, null, 2), 'utf8');

  console.log(`Built shortlist with ${shortlistItems.length} items`);
  console.log(`\nShortlist Summary:`);
  console.log(`  Ready for Control Tower review: ${shortlist.ready_for_review_count}`);
  console.log(`  Guidance only: ${shortlist.guidance_only_count}`);
  console.log(`  Top recommended: ${shortlist.summary.top_recommended_packet}`);
  console.log(`\nTop 5 Items:`);
  shortlistItems.forEach(item => {
    const badge = item.case_quality_ready
      ? '\x1b[32m[READY]\x1b[0m'
      : item.recommended_action === 'guidance_only_not_case'
        ? '\x1b[33m[GUIDANCE]\x1b[0m'
        : '\x1b[31m[BLOCKED]\x1b[0m';
    console.log(`  ${item.rank}. ${item.packet_id} ${badge}`);
    console.log(`     Title: ${item.title.substring(0, 60)}${item.title.length > 60 ? '...' : ''}`);
    console.log(`     Action: ${item.recommended_action}`);
  });

  console.log(`\nShortlist written to: ${SHORTLIST_PATH}`);
  return shortlist;
}

buildShortlist();
