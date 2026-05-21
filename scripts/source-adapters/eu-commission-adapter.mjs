// EU Commission source adapter (T051)
// Targets AI Act, algorithmic systems policy, digital strategy pages

import { fetchWithTimeout, extractLinksFromHtml, filterLinks, buildLinkRecord, categoriseLink, matchKeywords } from './shared.mjs';

export const ADAPTER_NAME = 'eu-commission-adapter';
export const AUTHORITY = 'European Commission';

const EU_SUPPLEMENTARY_URLS = [
  'https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence',
  'https://digital-strategy.ec.europa.eu/en/news',
];

const EU_POSITIVE_URL_SEGMENTS = [
  '/policies/', '/news', '/publications', '/regulation', '/act',
  '/ai-act', '/algorithm', '/artificial-intelligence',
];

const EU_NEGATIVE_PATHS = [
  '/contact', '/about', '/jobs', '/procurement', '/subscribe', '/newsletter',
  '/accessibility', '/legal-notice', '/cookies', '/en/activities',
  '/news?type=', '/news?f[', '/news?page=', '/newsletter/',
  '/en/news?page',
];

const EU_POSITIVE_ENFORCEMENT_PATHS = [
  '/enforcement', '/sanction', '/penalty', '/fine', '/decision',
  '/regulatory-framework-ai', '/ai-act', '/artificial-intelligence',
  '/algorithm', '/policy',
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

  for (const supUrl of EU_SUPPLEMENTARY_URLS) {
    const sup = await fetchWithTimeout(supUrl, timeoutMs);
    if (sup.ok) {
      rawLinks = rawLinks.concat(extractLinksFromHtml(sup.text, supUrl));
    }
  }

  const filtered = rawLinks.filter(l => {
    const u = (l.url || '').toLowerCase();
    for (const p of EU_NEGATIVE_PATHS) {
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
    const urlLower = (link.url || '').toLowerCase();
    const hasPositiveUrl = EU_POSITIVE_URL_SEGMENTS.some(s => urlLower.includes(s));
    if (!kw.matches && !hasPositiveUrl) continue;

    const cat = categoriseLink(link.url, link.title);
    result.links.push(buildLinkRecord({
      url: link.url,
      title: link.title,
      pubDate: link.pubDate || null,
      authority: AUTHORITY,
      category: cat,
      matchedKeywords: kw.keywords.length > 0 ? kw.keywords : ['eu_commission_policy_page'],
      adapterName: ADAPTER_NAME,
      extractionMethod: 'eu_commission_html_policy_scan',
      confidenceReason: `EU Commission adapter: policy/AI-Act page matched (${cat})`,
    }));
    count++;
  }

  return result;
}
