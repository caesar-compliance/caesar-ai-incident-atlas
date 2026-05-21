#!/usr/bin/env node
/**
 * Caesar AI Incident Atlas — Public Case Page Builder
 * Generates static HTML detail pages for every published incident record.
 *
 * Output structure:
 *   site/cases/index.html                              — case directory
 *   site/cases/<incident-slug>/index.html              — individual case detail
 *
 * Run with: node scripts/build-public-case-pages.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.dirname(__dirname);

const SITE_INDEX  = path.join(ROOT, 'site', 'data', 'incident-index.json');
const SITE_INC    = path.join(ROOT, 'site', 'data', 'incidents');
const CASES_OUT   = path.join(ROOT, 'site', 'cases');

/* ── Helpers ── */
function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cap(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }

const RECORD_TYPE_LABELS = {
  'guidance':       'Guidance / Governance Case',
  'governance_case':'Governance Case',
  'incident':       'Incident'
};

const FM_LABELS = {
  'FM-HALL':  'Hallucination',
  'FM-REL':   'Reliability',
  'FM-SAFE':  'Safety',
  'FM-BIAS':  'Bias',
  'FM-TRANS': 'Transparency',
  'FM-UNAUTH':'Unauthorised Action',
  'FM-PRIV':  'Privacy',
  'FM-SEC':   'Security'
};

const SECTOR_NAMES = {
  'legal-compliance':           'Legal & Compliance',
  'transportation-autonomous':  'Transportation (Autonomous)',
  'retail-ecommerce':           'Retail & E-commerce',
  'public-sector':              'Public Sector',
  'law-enforcement':            'Law Enforcement',
  'hiring-employment':          'Hiring & Employment',
  'media-content':              'Media & Content',
  'healthcare-medical':         'Healthcare',
  'general':                    'General / Cross-sector',
  'cross-sector AI governance': 'Cross-sector AI Governance'
};

function sectorLabel(id) { return SECTOR_NAMES[id] || id; }

function slugFromFile(file) {
  return path.basename(file, '.json');
}

/* ── Case detail page HTML ── */
function buildCasePage(inc, slug) {
  const isGuidance = (inc.record_type === 'guidance' || inc.record_type === 'governance_case');
  const recTypeLabel = RECORD_TYPE_LABELS[inc.record_type] || 'Incident';

  const sections = [];

  if (isGuidance) {
    sections.push(`<div class="guidance-notice" role="note">Official guidance / governance case. Not an enforcement allegation.</div>`);
  }

  if (inc.summary) {
    sections.push(detailSection(isGuidance ? 'Summary' : 'What Happened',
      `<p class="detail-text">${esc(inc.summary)}</p>`));
  }

  if (inc.ai_system_context)
    sections.push(detailSection('AI System / Context', `<p class="detail-text">${esc(inc.ai_system_context)}</p>`));

  if (inc.harms?.length)
    sections.push(detailSection('Harms', `<ul class="detail-list">${inc.harms.map(h => `<li>${esc(h)}</li>`).join('')}</ul>`));

  if (inc.impact)
    sections.push(detailSection('Impact', `<p class="detail-text">${esc(inc.impact)}</p>`));

  if (inc.failure_modes?.length) {
    const fmItems = inc.failure_modes.map(f =>
      `<li><strong>${esc(f)}</strong> — ${esc(FM_LABELS[f] || f)}</li>`
    ).join('');
    sections.push(detailSection('Failure Modes', `<ul class="detail-list">${fmItems}</ul>`));
  }

  if (inc.controls?.length)
    sections.push(detailSection(isGuidance ? 'Applicable Controls' : 'Affected Controls',
      `<div class="controls-row">${inc.controls.map(c => `<span class="badge-ctl">${esc(c)}</span>`).join('')}</div>`));

  if (inc.jurisdiction)
    sections.push(detailSection('Jurisdiction', `<p class="detail-text">${esc(inc.jurisdiction)}</p>`));

  if (inc.evidence_required?.length)
    sections.push(detailSection('Evidence Required',
      `<ul class="detail-list">${inc.evidence_required.map(e => `<li>${esc(e)}</li>`).join('')}</ul>`));

  if (inc.lessons?.length)
    sections.push(detailSection(isGuidance ? 'Governance Lesson' : 'Governance Lessons',
      `<ul class="detail-list">${inc.lessons.map(l => `<li class="lesson">${esc(l)}</li>`).join('')}</ul>`));

  if (inc.affected_stakeholders?.length)
    sections.push(detailSection('Affected Stakeholders',
      `<ul class="detail-list">${inc.affected_stakeholders.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`));

  if (inc.sources?.length) {
    let srcHtml = '';
    inc.sources.forEach((src, i) => {
      srcHtml += `<div class="source-item">
        <div class="source-num">Source ${i + 1}</div>
        <a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title || src.url)}</a>
        <div class="source-meta">
          <span class="source-type-badge">${esc((src.source_type || '').replace(/_/g, ' '))}</span>
          <span class="source-accessed">Last verified: ${esc(src.accessed || 'unknown')}</span>
        </div>
      </div>`;
    });
    sections.push(detailSection('Sources', srcHtml));
  }

  if (inc.date_note)
    sections.push(detailSection('Date Note', `<p class="detail-text detail-muted">${esc(inc.date_note)}</p>`));

  const sectorsHtml = (inc.sector || []).map(s =>
    `<span class="badge badge-sector">${esc(sectorLabel(s))}</span>`
  ).join('');
  const fmsHtml = (inc.failure_modes || []).map(f =>
    `<span class="badge badge-fm">${esc(f)}</span>`
  ).join('');
  const rtBadge = isGuidance
    ? `<span class="badge badge-guidance">${esc(recTypeLabel)}</span>`
    : '';
  const sevBadge = inc.severity
    ? `<span class="badge badge-sev-${esc(inc.severity)}">Severity: ${esc(cap(inc.severity))}</span>` : '';
  const confBadge = inc.confidence
    ? `<span class="badge badge-conf-${esc(inc.confidence)}">Confidence: ${esc(cap(inc.confidence))}</span>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(inc.incident_id)}: ${esc(inc.title)} — Caesar AI Incident Atlas</title>
  <meta name="description" content="${esc(inc.summary ? inc.summary.slice(0, 200) : inc.title)}">
  <link rel="canonical" href="https://atlas.caesar.no/cases/${esc(slug)}/">
  <link rel="stylesheet" href="../../assets/styles.css">
</head>
<body>

<header class="app-header">
  <a class="logo" href="../../" aria-label="Caesar AI Incident Atlas — home"><span>Caesar</span> AI Incident Atlas</a>
  <div class="header-meta">
    <a href="../../" style="color: var(--accent); text-decoration: none; font-size: 0.8rem;">← All Records</a>
  </div>
</header>

<div class="case-page-layout">
  <main class="case-main" role="main">

    <div class="case-breadcrumb">
      <a href="../../">Atlas</a> <span>›</span> <a href="../">Cases</a> <span>›</span> ${esc(inc.incident_id)}
    </div>

    <div class="case-header">
      <span class="inc-id">${esc(inc.incident_id)}</span>
      <h1 class="case-title">${esc(inc.title)}</h1>
    </div>

    <div class="card-meta" style="margin-bottom: 1.25rem;">
      <span class="badge badge-date">${esc(inc.date)}</span>
      ${rtBadge}
      ${sectorsHtml}
      ${sevBadge}
      ${confBadge}
      ${fmsHtml}
    </div>

    <div class="case-body">
      ${sections.join('\n      ')}
    </div>

    <div class="case-disclaimer" role="note">
      Not legal advice. This record is based on publicly available information.
      Source and licence review tracked separately. For official guidance, consult the primary source.
    </div>

  </main>
</div>

<footer class="app-footer" role="contentinfo">
  <div class="footer-inner">
    <span class="footer-item footer-live">Live MVP</span>
    <span class="footer-sep">·</span>
    <span class="footer-item">13 curated records</span>
    <span class="footer-sep">·</span>
    <span class="footer-item">v0.6.5</span>
    <span class="footer-sep">·</span>
    <span class="footer-item footer-disclaimer">Not legal advice</span>
    <span class="footer-sep">·</span>
    <a class="footer-link" href="https://caesar.no" target="_blank" rel="noopener noreferrer">caesar.no</a>
  </div>
</footer>

</body>
</html>`;
}

function detailSection(label, content) {
  return `<div class="detail-section">
    <div class="detail-label">${esc(label)}</div>
    ${content}
  </div>`;
}

/* ── Cases index page ── */
function buildCasesIndex(entries) {
  const rows = entries.map(({ inc, slug }) => {
    const isGuidance = (inc.record_type === 'guidance' || inc.record_type === 'governance_case');
    const recTypeLabel = RECORD_TYPE_LABELS[inc.record_type] || 'Incident';
    const rtBadge = isGuidance
      ? `<span class="badge badge-guidance">${esc(recTypeLabel)}</span>` : '';
    const sectorsHtml = (inc.sector || []).map(s =>
      `<span class="badge badge-sector">${esc(sectorLabel(s))}</span>`
    ).join('');
    const sevBadge = inc.severity
      ? `<span class="badge badge-sev-${esc(inc.severity)}">${esc(cap(inc.severity))}</span>` : '';
    return `<a class="case-index-row" href="${esc(slug)}/">
      <span class="inc-id">${esc(inc.incident_id)}</span>
      <span class="case-index-title">${esc(inc.title)}</span>
      <span class="case-index-badges">
        <span class="badge badge-date">${esc(inc.date)}</span>
        ${rtBadge}${sectorsHtml}${sevBadge}
      </span>
    </a>`;
  }).join('\n  ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Case Directory — Caesar AI Incident Atlas</title>
  <meta name="description" content="Directory of all published AI governance records in the Caesar AI Incident Atlas.">
  <link rel="canonical" href="https://atlas.caesar.no/cases/">
  <link rel="stylesheet" href="../assets/styles.css">
</head>
<body>

<header class="app-header">
  <a class="logo" href="../" aria-label="Caesar AI Incident Atlas — home"><span>Caesar</span> AI Incident Atlas</a>
  <div class="header-meta">
    <a href="../" style="color: var(--accent); text-decoration: none; font-size: 0.8rem;">← All Records</a>
  </div>
</header>

<div class="case-page-layout">
  <main class="case-main" role="main">
    <div class="case-breadcrumb">
      <a href="../">Atlas</a> <span>›</span> Cases
    </div>
    <h1 class="case-dir-heading">Case Directory</h1>
    <p class="about-text" style="margin-bottom: 1.25rem;">${entries.length} published records. Click any row to view the full governance detail.</p>
    <div class="case-index-list" role="list">
  ${rows}
    </div>
    <p class="about-disclaimer" style="margin-top: 1.5rem;">Not legal advice. Records are based on publicly available information.</p>
  </main>
</div>

<footer class="app-footer" role="contentinfo">
  <div class="footer-inner">
    <span class="footer-item footer-live">Live MVP</span>
    <span class="footer-sep">·</span>
    <span class="footer-item">${entries.length} curated records</span>
    <span class="footer-sep">·</span>
    <span class="footer-item">v0.6.5</span>
    <span class="footer-sep">·</span>
    <span class="footer-item footer-disclaimer">Not legal advice</span>
    <span class="footer-sep">·</span>
    <a class="footer-link" href="https://caesar.no" target="_blank" rel="noopener noreferrer">caesar.no</a>
  </div>
</footer>

</body>
</html>`;
}

/* ── Main ── */
function build() {
  console.log('=== Caesar Public Case Page Builder ===');

  if (!fs.existsSync(SITE_INDEX)) {
    console.error('ERROR: site/data/incident-index.json not found.');
    process.exit(1);
  }

  const index = JSON.parse(fs.readFileSync(SITE_INDEX, 'utf8'));
  const records = index.incidents || [];

  if (records.length === 0) {
    console.error('ERROR: No incidents in index.');
    process.exit(1);
  }

  fs.mkdirSync(CASES_OUT, { recursive: true });

  const entries = [];

  for (const entry of records) {
    const incFile = path.join(ROOT, 'site', entry.file.startsWith('data/') ? entry.file : 'data/incidents/' + path.basename(entry.file));
    const incFileFallback = path.join(SITE_INC, path.basename(entry.file));

    let incPath = fs.existsSync(incFile) ? incFile : incFileFallback;
    if (!fs.existsSync(incPath)) {
      console.warn(`WARN: Incident file not found for ${entry.incident_id}, skipping.`);
      continue;
    }

    let inc;
    try {
      inc = JSON.parse(fs.readFileSync(incPath, 'utf8'));
    } catch (e) {
      console.warn(`WARN: Could not parse ${incPath}: ${e.message}`);
      continue;
    }

    const slug = slugFromFile(path.basename(incPath));
    const outDir = path.join(CASES_OUT, slug);
    fs.mkdirSync(outDir, { recursive: true });

    const html = buildCasePage(inc, slug);
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    console.log(`  BUILT: site/cases/${slug}/index.html`);
    entries.push({ inc, slug });
  }

  const indexHtml = buildCasesIndex(entries);
  fs.writeFileSync(path.join(CASES_OUT, 'index.html'), indexHtml, 'utf8');
  console.log(`  BUILT: site/cases/index.html (${entries.length} entries)`);

  console.log(`\nPASS: ${entries.length} case pages + index built successfully.`);
}

build();
