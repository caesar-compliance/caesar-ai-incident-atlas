#!/usr/bin/env node
/**
 * Caesar AI Incident Atlas — RSS Feed Builder
 * Run with: node scripts/build-rss-feeds.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const DATA_DIGESTS_DIR = path.join(ROOT, 'data', 'digests');
const SITE_DIR = path.join(ROOT, 'site');

function escapeXML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSS(title, description, feedUrl, items) {
  const lastBuildDate = new Date().toUTCString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXML(title)}</title>
  <link>https://atlas.caesar.no/digests/</link>
  <description>${escapeXML(description)}</description>
  <language>en-us</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${escapeXML(feedUrl)}" rel="self" type="application/rss+xml" />
`;

  for (const item of items) {
    const pubDate = new Date(item.generated_at).toUTCString();
    const cleanThemes = Array.isArray(item.key_themes) ? item.key_themes.join(' ') : item.key_themes;
    const itemLink = item.digest_type === 'weekly' 
      ? 'https://atlas.caesar.no/digests/weekly/'
      : 'https://atlas.caesar.no/digests/monthly/';
    
    xml += `  <item>
    <title>${escapeXML(item.title)}</title>
    <link>${escapeXML(itemLink)}</link>
    <guid isPermaLink="false">${escapeXML(item.digest_id)}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXML(cleanThemes)}</description>
  </item>\n`;
  }

  xml += `</channel>
</rss>`;
  return xml;
}

function build() {
  console.log('Compiling RSS feeds from static digests...');

  const weeklyDir = path.join(DATA_DIGESTS_DIR, 'weekly');
  const monthlyDir = path.join(DATA_DIGESTS_DIR, 'monthly');
  
  let weeklyDigests = [];
  let monthlyDigests = [];

  // Read weekly digests
  if (fs.existsSync(weeklyDir)) {
    const files = fs.readdirSync(weeklyDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      try {
        const digest = JSON.parse(fs.readFileSync(path.join(weeklyDir, f), 'utf-8'));
        weeklyDigests.push(digest);
      } catch (err) {
        console.error(`Error reading ${f}: ${err.message}`);
      }
    }
  }

  // Read monthly digests
  if (fs.existsSync(monthlyDir)) {
    const files = fs.readdirSync(monthlyDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      try {
        const digest = JSON.parse(fs.readFileSync(path.join(monthlyDir, f), 'utf-8'));
        monthlyDigests.push(digest);
      } catch (err) {
        console.error(`Error reading ${f}: ${err.message}`);
      }
    }
  }

  // Sort digests by generated_at descending
  weeklyDigests.sort((a, b) => new Date(b.generated_at) - new Date(a.generated_at));
  monthlyDigests.sort((a, b) => new Date(b.generated_at) - new Date(a.generated_at));
  
  const allDigests = [...weeklyDigests, ...monthlyDigests].sort(
    (a, b) => new Date(b.generated_at) - new Date(a.generated_at)
  );

  // Define paths
  const mainRssPath = path.join(SITE_DIR, 'rss.xml');
  const weeklyRssPath = path.join(SITE_DIR, 'digests', 'weekly.xml');
  const monthlyRssPath = path.join(SITE_DIR, 'digests', 'monthly.xml');

  // Ensure directories exist
  fs.mkdirSync(path.join(SITE_DIR, 'digests'), { recursive: true });

  // Generate and write site/rss.xml
  const mainRssXml = generateRSS(
    'Caesar AI Incident Atlas — All Briefing Digests',
    'Curated legal and commercial AI governance briefing briefings from Caesar AI Incident Atlas.',
    'https://atlas.caesar.no/rss.xml',
    allDigests
  );
  fs.writeFileSync(mainRssPath, mainRssXml, 'utf-8');
  console.log(`Successfully compiled: ${mainRssPath}`);

  // Generate and write site/digests/weekly.xml
  const weeklyRssXml = generateRSS(
    'Caesar AI Incident Atlas — Weekly Briefing Digests',
    'Factual weekly briefing digests mapping AI enforcements to operational mitigation actions.',
    'https://atlas.caesar.no/digests/weekly.xml',
    weeklyDigests
  );
  fs.writeFileSync(weeklyRssPath, weeklyRssXml, 'utf-8');
  console.log(`Successfully compiled: ${weeklyRssPath}`);

  // Generate and write site/digests/monthly.xml
  const monthlyRssXml = generateRSS(
    'Caesar AI Incident Atlas — Monthly Strategic Digests',
    'Monthly strategic trend summaries and aggregate regulatory compliance briefings.',
    'https://atlas.caesar.no/digests/monthly.xml',
    monthlyDigests
  );
  fs.writeFileSync(monthlyRssPath, monthlyRssXml, 'utf-8');
  console.log(`Successfully compiled: ${monthlyRssPath}`);

  console.log('PASS: All RSS XML feeds have been compiled successfully!');
}

build();
