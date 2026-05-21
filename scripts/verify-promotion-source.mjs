import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
const DRAFTS_DIR = path.join(ROOT, 'data', 'drafts', 'real');
const VERIFICATIONS_DIR = path.join(ROOT, 'data', 'source-verifications', 'real');

function logInfo(msg) {
  console.log(`\x1b[36m[VERIFY]\x1b[0m ${msg}`);
}

function logError(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
}

function logSuccess(msg) {
  console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[WARNING]\x1b[0m ${msg}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function fetchUrlMetadata(url, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Caesar-Atlas-Source-Verification/1.0'
      }
    });

    clearTimeout(timeoutId);

    return {
      url: url,
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type') || 'unknown',
      contentLength: response.headers.get('content-length') || 'unknown',
      lastModified: response.headers.get('last-modified') || 'unknown',
      accessible: response.ok,
      redirected: response.redirected,
      finalUrl: response.url
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      url: url,
      status: 0,
      statusText: error.name,
      contentType: 'unknown',
      contentLength: 'unknown',
      lastModified: 'unknown',
      accessible: false,
      redirected: false,
      finalUrl: url,
      error: error.message
    };
  }
}

function loadPacket(packetId) {
  const packetPath = path.join(PACKETS_DIR, `${packetId}.json`);
  if (!fs.existsSync(packetPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(packetPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse packet ${packetId}: ${e.message}`);
    return null;
  }
}

function loadDraft(draftId) {
  const draftPath = path.join(DRAFTS_DIR, `${draftId}.json`);
  if (!fs.existsSync(draftPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(draftPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse draft ${draftId}: ${e.message}`);
    return null;
  }
}

function determineVerificationStatus(urlResults, sourceTier) {
  const accessibleCount = urlResults.filter(u => u.accessible).length;
  const totalCount = urlResults.length;

  if (totalCount === 0) {
    return 'failed';
  }

  if (accessibleCount === totalCount) {
    return 'verified';
  }

  if (accessibleCount > 0) {
    return 'partially_verified';
  }

  return 'failed';
}

function buildVerificationNotes(packet, draft, urlResults) {
  const notes = [];
  
  // Source tier assessment
  if (packet.source_tier) {
    notes.push(`Source tier: ${packet.source_tier.toUpperCase()}`);
  }

  // URL accessibility summary
  const accessibleCount = urlResults.filter(u => u.accessible).length;
  notes.push(`${accessibleCount}/${urlResults.length} source URLs accessible`);

  // Authority confirmation
  if (draft.source_authorities && draft.source_authorities.length > 0) {
    notes.push(`Primary authority: ${draft.source_authorities[0]}`);
  }

  // Content type observations
  const contentTypes = [...new Set(urlResults.map(u => u.contentType).filter(ct => ct !== 'unknown'))];
  if (contentTypes.length > 0) {
    notes.push(`Content types: ${contentTypes.join(', ')}`);
  }

  // Error notes
  const failedUrls = urlResults.filter(u => !u.accessible);
  if (failedUrls.length > 0) {
    notes.push(`${failedUrls.length} URL(s) failed: ${failedUrls.map(u => u.statusText || 'Unknown error').join(', ')}`);
  }

  // Metadata-only confirmation
  notes.push('Verification metadata-only: no full content copied or stored');

  return notes;
}

async function main() {
  const packetId = process.argv[2] || 'PKT-0006';
  
  console.log(`=== Source Verification for ${packetId} ===\n`);

  // Load packet and draft
  const packet = loadPacket(packetId);
  if (!packet) {
    logError(`Packet ${packetId} not found`);
    process.exit(1);
  }

  const draft = loadDraft(packet.draft_id);
  if (!draft) {
    logError(`Draft ${packet.draft_id} not found`);
    process.exit(1);
  }

  logInfo(`Loaded packet ${packetId} -> draft ${packet.draft_id}`);

  // Get source URLs from packet (primary) or draft (fallback)
  const sourceUrls = packet.source_urls || draft.source_urls || [];
  if (sourceUrls.length === 0) {
    logError('No source URLs found in packet or draft');
    process.exit(1);
  }

  logInfo(`Verifying ${sourceUrls.length} source URL(s)...`);

  // Fetch metadata for each URL
  const urlResults = [];
  for (const url of sourceUrls) {
    logInfo(`Checking: ${url}`);
    const result = await fetchUrlMetadata(url);
    urlResults.push(result);
    
    if (result.accessible) {
      logSuccess(`✓ ${result.status} ${result.contentType}`);
    } else {
      logError(`✗ ${result.statusText || 'Failed'}`);
    }
  }

  // Determine verification status
  const verificationStatus = determineVerificationStatus(urlResults, packet.source_tier);
  
  // Build verification record
  const verification = {
    packet_id: packetId,
    draft_id: packet.draft_id,
    source_urls: sourceUrls,
    authority: draft.source_authorities?.[0] || 'Unknown',
    checked_at: new Date().toISOString(),
    url_statuses: urlResults,
    source_tier: packet.source_tier || 'green',
    official_source_confirmed: sourceUrls.some(url => 
      url.includes('edpb.europa.eu') || 
      url.includes('europa.eu') ||
      url.includes('ec.europa.eu') ||
      url.includes('commission.europa.eu')
    ),
    metadata_only_confirmed: true,
    source_text_copied: false,
    verification_status: verificationStatus,
    verification_notes: buildVerificationNotes(packet, draft, urlResults)
  };

  // Write verification file
  ensureDir(VERIFICATIONS_DIR);
  const verificationPath = path.join(VERIFICATIONS_DIR, `${packetId}-source-verification.json`);
  fs.writeFileSync(verificationPath, JSON.stringify(verification, null, 2), 'utf8');

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  VERIFICATION SUMMARY');
  console.log(`${'='.repeat(60)}`);
  console.log(`Packet ID: ${verification.packet_id}`);
  console.log(`Draft ID: ${verification.draft_id}`);
  console.log(`Authority: ${verification.authority}`);
  console.log(`Source tier: ${verification.source_tier}`);
  console.log(`Verification status: ${verification.verification_status.toUpperCase()}`);
  console.log(`URLs checked: ${verification.url_statuses.length}`);
  console.log(`Accessible: ${verification.url_statuses.filter(u => u.accessible).length}`);
  console.log(`Official source: ${verification.official_source_confirmed ? 'Yes' : 'No'}`);
  console.log(`Metadata only: ${verification.metadata_only_confirmed ? 'Yes' : 'No'}`);
  console.log(`Source text copied: ${verification.source_text_copied ? 'No' : 'Yes'}`);
  console.log(`\nVerification written: ${verificationPath}`);
  console.log(`${'='.repeat(60)}\n`);

  // Exit with appropriate code
  if (verificationStatus === 'failed') {
    process.exit(1);
  } else if (verificationStatus === 'partially_verified') {
    process.exit(2); // Different exit code for partial success
  } else {
    process.exit(0);
  }
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
