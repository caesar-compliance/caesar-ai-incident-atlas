// CNIL (Commission Nationale de l'Informatique et des Libertés) adapter (T051)
// Targets AI guidance, sanctions, decisions from French DPA

import { fetchWithTimeout, extractLinksFromHtml, filterLinks, buildLinkRecord, categoriseLink, matchKeywords } from './shared.mjs';

export const ADAPTER_NAME = 'cnil-adapter';
export const AUTHORITY = "Commission Nationale de l'Informatique et des Libertés (CNIL)";

// CNIL high-signal supplementary URLs (French DPA enforcement/guidance)
const CNIL_SUPPLEMENTARY_URLS = [
  'https://www.cnil.fr/fr/les-sanctions-prononcees-par-la-cnil',
  'https://www.cnil.fr/fr/intelligence-artificielle',
];

const CNIL_NEGATIVE_PATHS = [
  '/fr/contact',
  '/fr/la-cnil/qui-sommes-nous',
  '/fr/acceder',
  '/fr/professionnel/se-former',
];

// French AI/enforcement terms added to keyword check
const CNIL_EXTRA_POSITIVE_TITLES = [
  'sanction', 'délibération', 'décision', 'mise en demeure',
  'amende', 'contrôle', 'recommandation', 'intelligence artificielle',
  'traitement algorithmique',
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

  for (const supUrl of CNIL_SUPPLEMENTARY_URLS) {
    const sup = await fetchWithTimeout(supUrl, timeoutMs);
    if (sup.ok) {
      rawLinks = rawLinks.concat(extractLinksFromHtml(sup.text, supUrl));
    }
  }

  const filtered = rawLinks.filter(l => {
    const u = (l.url || '').toLowerCase();
    for (const p of CNIL_NEGATIVE_PATHS) {
      if (u.includes(p)) return false;
    }
    return true;
  });

  // CNIL pages often French — use relaxed filter then add French keyword check
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

    // Accept if English keyword matches OR French signal title
    const kw = matchKeywords(link.title, link.url, keywordsConfig);
    const titleLower = (link.title || '').toLowerCase();
    const urlLower = (link.url || '').toLowerCase();
    const hasFrenchSignal = CNIL_EXTRA_POSITIVE_TITLES.some(t => titleLower.includes(t));
    const hasUrlSignal = ['/sanction', '/decision', '/ia', '/intelligence-artificielle', '/algorithme'].some(p => urlLower.includes(p));

    if (!kw.matches && !hasFrenchSignal && !hasUrlSignal) continue;

    const cat = categoriseLink(link.url, link.title);
    result.links.push(buildLinkRecord({
      url: link.url,
      title: link.title,
      pubDate: link.pubDate || null,
      authority: AUTHORITY,
      category: cat,
      matchedKeywords: kw.keywords.length > 0 ? kw.keywords : ['cnil_french_signal'],
      adapterName: ADAPTER_NAME,
      extractionMethod: 'cnil_html_sanction_scan',
      confidenceReason: `CNIL adapter: French DPA signal matched (${cat})`,
    }));
    count++;
  }

  return result;
}
