// EDPB (European Data Protection Board) source adapter (T051)
// Targets AI guidelines, opinions, decisions

import { fetchWithTimeout, extractLinksFromHtml, filterLinks, buildLinkRecord, categoriseLink, matchKeywords } from './shared.mjs';

export const ADAPTER_NAME = 'edpb-adapter';
export const AUTHORITY = 'European Data Protection Board (EDPB)';

const EDPB_SUPPLEMENTARY_URLS = [
  'https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines_en',
  'https://www.edpb.europa.eu/our-work-tools/our-documents/opinions_en',
];

const EDPB_POSITIVE_URL_SEGMENTS = [
  '/guidelines', '/opinions', '/recommendations', '/statements',
  '/decisions', '/binding-decisions', '/news',
];

const EDPB_NEGATIVE_PATHS = [
  '/about-edpb', '/members', '/national', '/contact', '/jobs', '/procurement',
];

export async function run(target, keywordsConfig) {
  const timeoutMs = target.timeout_ms || 15000;
  const maxLinks = target.max_links_per_run || 10;
  const result = {
    adapter_name: ADAPTER_NAME,
    source_id: target.source_id,
    authority: AUTHORITY,
    url_fetched: target.url,
    ok: false,
    links: [],
    error: null,
  };

  const fetch1 = await fetchWithTimeout(target.url, timeoutMs);
  if (!fetch1.ok) {
    result.error = fetch1.error;
    return result;
  }
  result.ok = true;

  let rawLinks = extractLinksFromHtml(fetch1.text, target.url);

  for (const supUrl of EDPB_SUPPLEMENTARY_URLS) {
    const sup = await fetchWithTimeout(supUrl, timeoutMs);
    if (sup.ok) {
      rawLinks = rawLinks.concat(extractLinksFromHtml(sup.text, supUrl));
    }
  }

  // EDPB-specific positives: keep only links in known document sections
  const filtered = rawLinks.filter(l => {
    const u = (l.url || '').toLowerCase();
    for (const p of EDPB_NEGATIVE_PATHS) {
      if (u.includes(p)) return false;
    }
    // Accept if URL has a positive segment OR shared high-signal path
    const hasPositive = EDPB_POSITIVE_URL_SEGMENTS.some(s => u.includes(s));
    return hasPositive;
  });

  const highSignal = filterLinks(filtered, { strict: false });

  const seen = new Set();
  const unique = highSignal.filter(l => {
    if (seen.has(l.url)) return false;
    seen.add(l.url);
    return true;
  });

  let count = 0;
  for (const link of unique) {
    if (count >= maxLinks) break;
    const kw = matchKeywords(link.title, link.url, keywordsConfig);
    // EDPB documents are inherently regulatory — accept even without keyword match if URL positive
    const urlLower = (link.url || '').toLowerCase();
    const hasDocUrl = EDPB_POSITIVE_URL_SEGMENTS.some(s => urlLower.includes(s));
    if (!kw.matches && !hasDocUrl) continue;

    const cat = categoriseLink(link.url, link.title);
    result.links.push(buildLinkRecord({
      url: link.url,
      title: link.title,
      pubDate: link.pubDate || null,
      authority: AUTHORITY,
      category: cat,
      matchedKeywords: kw.keywords.length > 0 ? kw.keywords : ['edpb_document_section'],
      adapterName: ADAPTER_NAME,
      extractionMethod: 'edpb_html_document_scan',
      confidenceReason: `EDPB adapter: document section URL matched (${cat})`,
    }));
    count++;
  }

  return result;
}
