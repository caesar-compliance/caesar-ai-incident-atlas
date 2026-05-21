// Shared utilities for source adapters (T051)
// All adapters: metadata only, no full HTML/body storage, no copied text

export const DEFAULT_TIMEOUT_MS = 15000;
export const DEFAULT_MAX_LINKS = 10;

// Negative filters — URLs and titles matching these are blocked
export const NEGATIVE_URL_PATTERNS = [
  '/complaint', '/make-a-complaint', '/contact', '/contact-us',
  '/about', '/about-us', '/events', '/event/', '/jobs', '/careers',
  '/vacancies', '/webinar', '/subscribe', '/newsletter', '/help',
  '/faq', '/feedback', '/login', '/register', '/sign-in', '/signup',
  '/privacy', '/cookie', '/terms', '/sitemap', '/procurement',
  '/tender', '/suppliers', '/accessibility', '/cookie-policy',
  '?page=', '&page=', '?type=', '?f[', '/tag/', '/tags/',
];

export const NEGATIVE_TITLE_PATTERNS = [
  'make a complaint', 'contact us', 'about us', 'privacy notice',
  'cookie policy', 'accessibility', 'terms of use', 'events',
  'webinar', 'jobs', 'careers', 'vacancies', 'procurement',
  'subscribe', 'newsletter', 'feedback', 'how to complain',
  'privacy policy', 'frequently asked questions', 'faq', 'help centre',
  'help center', 'get in touch', 'sitemap', 'tender',
];

// High-signal URL path segments that indicate enforcement/guidance pages
export const HIGH_SIGNAL_URL_PATHS = [
  '/enforcement', '/investigation', '/decision', '/decisions',
  '/guidance', '/guidelines', '/opinion', '/opinions',
  '/action', '/actions', '/news', '/press-release', '/press-releases',
  '/sanctions', '/sanction', '/consultation', '/consultations',
  '/ai', '/algorithm', '/automated', '/artificial-intelligence',
  '/regulatory', '/regulation', '/case', '/ruling', '/judgment',
  '/penalty', '/penalties', '/fine', '/fines', '/settlement',
  '/report', '/reports', '/framework', '/act',
];

// High-signal title keywords
export const HIGH_SIGNAL_TITLE_KEYWORDS = [
  'enforcement', 'investigation', 'penalty', 'fine', 'sanction',
  'settlement', 'judgment', 'ruling', 'decision', 'action',
  'guidance', 'guidelines', 'opinion', 'framework', 'consultation',
  'regulation', 'directive', 'act', 'algorithm', 'automated decision',
  'artificial intelligence', 'machine learning', 'biometric',
  'facial recognition', 'ai act', 'gdpr', 'data protection',
];

/**
 * Fetch URL with timeout. Returns { ok, text, status, error }.
 */
export async function fetchWithTimeout(url, timeoutMs = DEFAULT_TIMEOUT_MS, headers = {}) {
  const defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (compatible; CaesarAtlasBot/1.0)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  };
  try {
    const res = await fetch(url, {
      headers: { ...defaultHeaders, ...headers },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) {
      return { ok: false, text: '', status: res.status, error: `HTTP ${res.status}` };
    }
    const text = await res.text();
    return { ok: true, text, status: res.status, error: null };
  } catch (e) {
    return { ok: false, text: '', status: null, error: e.message };
  }
}

/**
 * Extract <a href> links from HTML. Returns [{url, title}].
 */
export function extractLinksFromHtml(html, baseUrl) {
  const links = [];
  const regex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1].trim();
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) continue;
    try {
      const abs = new URL(href, baseUrl).toString();
      links.push({ url: abs, title: text });
    } catch (_) { /* skip invalid */ }
  }
  return links;
}

/**
 * Extract items from RSS/Atom feed XML. Returns [{url, title, pubDate}].
 */
export function extractLinksFromFeed(xml, baseUrl) {
  const links = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const chunk = match[1];
    const titleM = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(chunk);
    const linkM = /<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i.exec(chunk);
    const dateM = /<pubDate>([\s\S]*?)<\/pubDate>/i.exec(chunk);
    if (titleM && linkM) {
      const title = titleM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const url = linkM[1].trim();
      const pubDate = dateM ? dateM[1].trim() : null;
      try { links.push({ url: new URL(url, baseUrl).toString(), title, pubDate }); } catch (_) {}
    }
  }
  if (links.length === 0) {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(xml)) !== null) {
      const chunk = match[1];
      const titleM = /<title(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(chunk);
      const linkM = /<link[^>]*href=["']([^"']+)["']/i.exec(chunk);
      const dateM = /<published>([\s\S]*?)<\/published>/i.exec(chunk) || /<updated>([\s\S]*?)<\/updated>/i.exec(chunk);
      if (titleM && linkM) {
        const title = titleM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        const url = linkM[1].trim();
        const pubDate = dateM ? dateM[1].trim() : null;
        try { links.push({ url: new URL(url, baseUrl).toString(), title, pubDate }); } catch (_) {}
      }
    }
  }
  return links;
}

/**
 * Filter links: remove negative patterns, keep only high-signal if strict mode.
 */
export function filterLinks(links, { strict = false } = {}) {
  return links.filter(link => {
    const u = (link.url || '').toLowerCase();
    const t = (link.title || '').toLowerCase();

    for (const pat of NEGATIVE_URL_PATTERNS) {
      if (u.includes(pat)) return false;
    }
    for (const pat of NEGATIVE_TITLE_PATTERNS) {
      if (t.includes(pat)) return false;
    }

    if (strict) {
      const hasSignalUrl = HIGH_SIGNAL_URL_PATHS.some(p => u.includes(p));
      const hasSignalTitle = HIGH_SIGNAL_TITLE_KEYWORDS.some(k => t.includes(k));
      if (!hasSignalUrl && !hasSignalTitle) return false;
    }

    return true;
  });
}

/**
 * Build a standardised extracted-link metadata record.
 */
export function buildLinkRecord({ url, title, pubDate, authority, category, matchedKeywords, adapterName, extractionMethod, confidenceReason }) {
  return {
    url,
    title: (title || '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim(),
    date_detected: pubDate || null,
    authority: authority || null,
    category: category || 'unknown',
    matched_keywords: matchedKeywords || [],
    adapter_name: adapterName,
    extraction_method: extractionMethod || 'html_link_scan',
    confidence_reason: confidenceReason || 'matched_high_signal_url_or_title',
  };
}

/**
 * Categorise a link based on URL/title signals.
 */
export function categoriseLink(url, title) {
  const u = url.toLowerCase();
  const t = title.toLowerCase();
  const combined = `${u} ${t}`;

  if (['enforcement', 'investigation', 'penalty', 'fine', 'sanction', 'lawsuit', 'settlement'].some(k => combined.includes(k))) {
    return 'enforcement';
  }
  if (['decision', 'ruling', 'judgment', 'court'].some(k => combined.includes(k))) {
    return 'official_decision';
  }
  if (['guidance', 'guidelines', 'opinion', 'framework', 'consultation'].some(k => combined.includes(k))) {
    return 'guidance';
  }
  if (['news', 'press-release', 'action', 'update', 'report'].some(k => combined.includes(k))) {
    return 'news_action';
  }
  return 'general';
}

/**
 * Match keywords against text. Returns matched keywords array.
 */
export function matchKeywords(title, url, keywordsConfig) {
  const text = `${title} ${url}`.toLowerCase();
  const matchedAi = (keywordsConfig.ai_terms || []).filter(t => text.includes(t.toLowerCase()));
  const matchedLegal = (keywordsConfig.legal_terms || []).filter(t => text.includes(t.toLowerCase()));
  const matchedComm = (keywordsConfig.commercial_terms || []).filter(t => text.includes(t.toLowerCase()));
  const matchedExcl = (keywordsConfig.exclusion_terms || []).filter(t => text.includes(t.toLowerCase()));

  if (matchedExcl.length > 0) return { matches: false, keywords: [] };
  if (matchedAi.length === 0) return { matches: false, keywords: [] };
  if (matchedLegal.length === 0 && matchedComm.length === 0) return { matches: false, keywords: [] };

  return {
    matches: true,
    keywords: Array.from(new Set([...matchedAi, ...matchedLegal, ...matchedComm])),
  };
}
