// FTC (Federal Trade Commission) source adapter (T051)
// Targets AI enforcement actions, cases, press releases

import { fetchWithTimeout, extractLinksFromHtml, filterLinks, buildLinkRecord, categoriseLink, matchKeywords } from './shared.mjs';

export const ADAPTER_NAME = 'ftc-adapter';
export const AUTHORITY = 'Federal Trade Commission (FTC)';

// FTC high-signal supplementary URLs
const FTC_SUPPLEMENTARY_URLS = [
  'https://www.ftc.gov/enforcement/cases-proceedings',
  'https://www.ftc.gov/news-events/press-releases',
];

const FTC_NEGATIVE_PATHS = [
  '/contact',
  '/about-ftc',
  '/jobs',
  '/procurement',
  '/foia',
  '/subscribe',
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

  // Probe supplementary enforcement/press pages
  for (const supUrl of FTC_SUPPLEMENTARY_URLS) {
    const sup = await fetchWithTimeout(supUrl, timeoutMs);
    if (sup.ok) {
      rawLinks = rawLinks.concat(extractLinksFromHtml(sup.text, supUrl));
    }
  }

  const filtered = rawLinks.filter(l => {
    const u = (l.url || '').toLowerCase();
    for (const p of FTC_NEGATIVE_PATHS) {
      if (u.includes(p)) return false;
    }
    return true;
  });

  const highSignal = filterLinks(filtered, { strict: true });

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
    if (!kw.matches) continue;
    const cat = categoriseLink(link.url, link.title);
    result.links.push(buildLinkRecord({
      url: link.url,
      title: link.title,
      pubDate: link.pubDate || null,
      authority: AUTHORITY,
      category: cat,
      matchedKeywords: kw.keywords,
      adapterName: ADAPTER_NAME,
      extractionMethod: 'ftc_html_enforcement_scan',
      confidenceReason: `FTC adapter: enforcement/action path matched (${cat})`,
    }));
    count++;
  }

  return result;
}
