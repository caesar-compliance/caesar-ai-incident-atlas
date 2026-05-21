import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

const PREVIEWS_DIR = path.join(ROOT, 'data', 'publication-previews', 'real');
const VERIFICATIONS_DIR = path.join(ROOT, 'data', 'source-verifications', 'real');
const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');

function logPass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

function logError(msg) {
  console.error(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
}

function logInfo(msg) {
  console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[WARNING]\x1b[0m ${msg}`);
}

function validatePreview(previewPath) {
  console.log(`=== Validating Preview: ${path.basename(previewPath)} ===\n`);
  
  if (!fs.existsSync(previewPath)) {
    logError(`Preview file not found: ${previewPath}`);
    return false;
  }

  let preview;
  try {
    preview = JSON.parse(fs.readFileSync(previewPath, 'utf8'));
  } catch (e) {
    logError(`Failed to parse preview JSON: ${e.message}`);
    return false;
  }

  let failures = 0;

  // 1. Required schema fields
  const requiredFields = [
    'incident_id', 'title', 'date', 'sources', 'summary', 
    'failure_modes', 'severity', 'confidence', 'controls', 
    'evidence_required', 'lessons'
  ];

  for (const field of requiredFields) {
    if (!preview[field]) {
      logError(`Missing required field: ${field}`);
      failures++;
    } else {
      logPass(`Required field present: ${field}`);
    }
  }

  // 2. Incident ID format
  if (preview.incident_id && !/^INC-[0-9]{4}$/.test(preview.incident_id)) {
    logError(`Invalid incident_id format: ${preview.incident_id}`);
    failures++;
  } else {
    logPass(`Incident ID format valid: ${preview.incident_id}`);
  }

  // 3. Date format
  if (preview.date && !/^[0-9]{1,2} [A-Z][a-z]+ [0-9]{4}$/.test(preview.date)) {
    logError(`Invalid date format: ${preview.date}`);
    failures++;
  } else {
    logPass(`Date format valid: ${preview.date}`);
  }

  // 4. Sources array validation
  if (preview.sources) {
    if (!Array.isArray(preview.sources) || preview.sources.length === 0) {
      logError('Sources must be a non-empty array');
      failures++;
    } else {
      for (let i = 0; i < preview.sources.length; i++) {
        const source = preview.sources[i];
        const requiredSourceFields = ['url', 'source_type', 'accessed'];
        
        for (const field of requiredSourceFields) {
          if (!source[field]) {
            logError(`Source ${i}: missing field ${field}`);
            failures++;
          }
        }
        
        if (source.url && !source.url.startsWith('http')) {
          logError(`Source ${i}: invalid URL format`);
          failures++;
        }
      }
      logPass(`Sources validation passed (${preview.sources.length} sources)`);
    }
  }

  // 5. Publication safety flags
  const safetyFlags = {
    'dry_run': true,
    'public': false,
    'not_approved': true,
    'source_text_copied': false,
    'control_tower_approval_required': true
  };

  for (const [flag, expectedValue] of Object.entries(safetyFlags)) {
    if (preview[flag] !== expectedValue) {
      logError(`Safety flag ${flag}: expected ${expectedValue}, got ${preview[flag]}`);
      failures++;
    } else {
      logPass(`Safety flag correct: ${flag} = ${expectedValue}`);
    }
  }

  // 6. Linked verification exists
  if (preview.promotion_packet_id) {
    const verificationPath = path.join(VERIFICATIONS_DIR, `${preview.promotion_packet_id}-source-verification.json`);
    if (fs.existsSync(verificationPath)) {
      logPass(`Source verification exists: ${preview.promotion_packet_id}-source-verification.json`);
      
      // Check verification status
      try {
        const verification = JSON.parse(fs.readFileSync(verificationPath, 'utf8'));
        if (verification.verification_status === 'failed') {
          logError(`Source verification failed for ${preview.promotion_packet_id}`);
          failures++;
        } else {
          logPass(`Source verification status: ${verification.verification_status}`);
        }
      } catch (e) {
        logError(`Failed to read source verification: ${e.message}`);
        failures++;
      }
    } else {
      logError(`Source verification missing: ${preview.promotion_packet_id}-source-verification.json`);
      failures++;
    }
  }

  // 7. Linked packet exists
  if (preview.promotion_packet_id) {
    const packetPath = path.join(PACKETS_DIR, `${preview.promotion_packet_id}.json`);
    if (fs.existsSync(packetPath)) {
      logPass(`Promotion packet exists: ${preview.promotion_packet_id}.json`);
    } else {
      logError(`Promotion packet missing: ${preview.promotion_packet_id}.json`);
      failures++;
    }
  }

  // 8. Content safety checks
  if (preview.summary) {
    // Check for defamatory language patterns
    const riskyPatterns = [
      /illegal/i,
      /violation/i,
      /breach/i,
      /scandal/i,
      /fraud/i,
      /lawsuit/i
    ];
    
    for (const pattern of riskyPatterns) {
      if (pattern.test(preview.summary)) {
        logWarning(`Summary contains potentially problematic language: ${pattern.source}`);
      }
    }
    
    // Check for proper attribution
    if (!preview.summary.includes('European Data Protection Board') && !preview.summary.includes('authorities')) {
      logWarning('Summary may lack proper source attribution');
    }
    
    logPass('Summary content safety checks completed');
  }

  // 9. Clean-room wording verification
  if (preview._preview_metadata?.clean_room_wording !== true) {
    logError('Preview missing clean_room_wording confirmation');
    failures++;
  } else {
    logPass('Clean-room wording confirmed');
  }

  // 10. No public incident created yet
  const incidentPath = path.join(ROOT, 'data', 'incidents', `${preview.incident_id.toLowerCase()}.json`);
  if (fs.existsSync(incidentPath)) {
    logError(`Public incident already exists: ${preview.incident_id.toLowerCase()}.json`);
    failures++;
  } else {
    logPass(`Public incident not yet created: ${preview.incident_id}`);
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  if (failures === 0) {
    logPass(`PREVIEW VALIDATION PASSED: ${path.basename(previewPath)}`);
    console.log('Status: Ready for Control Tower review');
    console.log('Status: All safety flags correctly set');
    console.log('Status: Schema compliant');
    console.log(`${'='.repeat(60)}\n`);
    return true;
  } else {
    logError(`${failures} VALIDATION FAILURE(S)`);
    console.log(`${'='.repeat(60)}\n`);
    return false;
  }
}

async function main() {
  console.log('=== Publication Preview Validator ===\n');

  let allPassed = true;

  if (fs.existsSync(PREVIEWS_DIR)) {
    const previewFiles = fs.readdirSync(PREVIEWS_DIR).filter(f => f.endsWith('.json'));
    
    if (previewFiles.length === 0) {
      logInfo('No preview files found to validate');
      console.log('\nRun build-public-case-preview.mjs first to create previews');
      process.exit(0);
    }

    for (const file of previewFiles) {
      const previewPath = path.join(PREVIEWS_DIR, file);
      const passed = validatePreview(previewPath);
      allPassed = allPassed && passed;
    }
  } else {
    logError('Publication previews directory does not exist');
    allPassed = false;
  }

  if (!allPassed) {
    process.exit(1);
  }
}

main().catch(e => {
  logError(e.message);
  process.exit(1);
});
