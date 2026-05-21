// Generic official source adapter — fallback for sources without specific adapters (T051)

import { fetchWithTimeout, extractLinksFromHtml, extractLinksFromFeed, filterLinks, buildLinkRecord, categoriseLink, matchKeywords } from './shared.mjs';

export const ADAPTER_NAME = 'generic-official-adapter';

export async function run(target, keywordsConfig) {
  const timeoutMs = target.timeout_ms || 15000;
  const maxLinks = target.max_links_per_run || 10;
  const authority = target.display_name || target.source_id;
  const result = {
    adapter_name: ADAPTER_NAME,
    source_id: target.source_id,
    authority,
    url_fetched: target.url,
    ok: false,
    links: [],
    error: null,
  };

  const fetchResult = await fetchWithTimeout(target.url, timeoutMs);
  if (!fetchResult.ok) {
    // Try fallback URLs
    const fallbacks = target.fallback_urls || [];
    let fetched = null;
    for (const fb of fallbacks) {
      const r = await fetchWithTimeout(fb, timeoutMs);
      if (r.ok) { fetched = { ...r, url: fb }; break; }
    }
    if (!fetched) {
      result.error = fetchResult.error;
      return result;
    }
    result.ok = true;
    result.url_fetched = fetched.url;
    var content = fetched.text;
  } else {
    result.ok = true;
    var content = fetchResult.text;
  }

  let rawLinks;
  if (target.fetch_mode === 'feed') {
    rawLinks = extractLinksFromFeed(content, result.url_fetched);
  } else {
    rawLinks = extractLinksFromHtml(content, result.url_fetched);
  }

  const highSignal = filterLinks(rawLinks, { strict: true });

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
      authority,
      category: cat,
      matchedKeywords: kw.keywords,
      adapterName: ADAPTER_NAME,
      extractionMethod: target.fetch_mode === 'feed' ? 'feed_item_scan' : 'html_link_scan',
      confidenceReason: `Generic official adapter: high-signal keyword match (${cat})`,
    }));
    count++;
  }

  return result;
}
