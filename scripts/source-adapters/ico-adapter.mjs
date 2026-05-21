// ICO (Information Commissioner's Office) source adapter (T051)
// Targets AI, data protection enforcement, and guidance pages

import { fetchWithTimeout, extractLinksFromHtml, filterLinks, buildLinkRecord, categoriseLink, matchKeywords } from './shared.mjs';

export const ADAPTER_NAME = 'ico-adapter';
export const AUTHORITY = "Information Commissioner's Office (ICO)";

// High-signal ICO path prefixes
const ICO_SIGNAL_PATHS = [
  '/action-weve-taken',
  '/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence',
  '/about-the-ico/news-and-events/news-and-blogs',
  '/for-organisations/guide-to-data-protection',
  '/media/about-the-ico',
  '/enforcement',
  '/decision',
];

// ICO-specific negative filters (in addition to shared ones)
const ICO_NEGATIVE_PATHS = [
  '/make-a-complaint',
  '/for-the-public/state-of-data-protection',
  '/global/cookies',
  '/your-data-matters',
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

  // Also probe enforcement-specific subpages for richer signal
  const enforceUrl = 'https://ico.org.uk/action-weve-taken/';
  const fetch2 = await fetchWithTimeout(enforceUrl, timeoutMs);
  if (fetch2.ok) {
    rawLinks = rawLinks.concat(extractLinksFromHtml(fetch2.text, enforceUrl));
  }

  // Apply ICO-specific negatives then shared filter (strict mode = require signal)
  const filtered = rawLinks.filter(l => {
    const u = (l.url || '').toLowerCase();
    for (const p of ICO_NEGATIVE_PATHS) {
      if (u.includes(p)) return false;
    }
    return true;
  });

  const highSignal = filterLinks(filtered, { strict: true });

  // Dedupe by URL
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
      extractionMethod: 'ico_html_enforcement_scan',
      confidenceReason: `ICO adapter: high-signal path matched (${cat})`,
    }));
    count++;
  }

  return result;
}
