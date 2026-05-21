import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

function logError(msg) {
  console.error(`\x1b[31m[Packet Validation Error]\x1b[0m ${msg}`);
}

function logPass(msg) {
  console.log(`\x1b[32m[Packet Validation Pass]\x1b[0m ${msg}`);
}

function logWarning(msg) {
  console.warn(`\x1b[33m[Packet Validation Warning]\x1b[0m ${msg}`);
}

function run() {
  console.log('=== Caesar Promotion Packet Validator ===');
  let failures = 0;

  const PACKETS_DIR = path.join(ROOT, 'data', 'promotion-packets', 'real');
  const SITE_DIR = path.join(ROOT, 'site');
  const INCIDENTS_DIR = path.join(ROOT, 'data', 'incidents');

  // 1. Packets directory must exist
  if (!fs.existsSync(PACKETS_DIR)) {
    logError('data/promotion-packets/real/ does not exist. Run build-promotion-packets.mjs first.');
    failures++;
    console.error(`\n\x1b[31mVALIDATION FAILED:\x1b[0m ${failures} issue(s).`);
    process.exit(1);
  }

  const packetFiles = fs.readdirSync(PACKETS_DIR).filter(f => f.endsWith('.json'));
  if (packetFiles.length === 0) {
    logWarning('No packet files found. Run build-promotion-packets.mjs first.');
    process.exit(0);
  }

  logPass(`Found ${packetFiles.length} promotion packet(s) to validate.`);

  for (const file of packetFiles) {
    const filePath = path.join(PACKETS_DIR, file);
    let packet;
    try {
      packet = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      logError(`Failed to parse ${file}: ${e.message}`);
      failures++;
      continue;
    }

    const id = packet.packet_id || file;

    // 2. promotion_allowed must be false
    if (packet.promotion_allowed !== false) {
      logError(`${id}: promotion_allowed must be false, got: ${packet.promotion_allowed}`);
      failures++;
    }

    // 3. safety_declarations must all be set correctly
    const decl = packet.safety_declarations || {};
    if (decl.not_approved !== true) {
      logError(`${id}: safety_declarations.not_approved must be true`);
      failures++;
    }
    if (decl.not_public !== true) {
      logError(`${id}: safety_declarations.not_public must be true`);
      failures++;
    }
    if (decl.control_tower_approval_required !== true) {
      logError(`${id}: safety_declarations.control_tower_approval_required must be true`);
      failures++;
    }
    if (decl.curator_review_required !== true) {
      logError(`${id}: safety_declarations.curator_review_required must be true`);
      failures++;
    }
    if (decl.clean_room_wording_review_required !== true) {
      logError(`${id}: safety_declarations.clean_room_wording_review_required must be true`);
      failures++;
    }
    if (decl.auto_publish !== false) {
      logError(`${id}: safety_declarations.auto_publish must be false`);
      failures++;
    }
    if (decl.local_only !== true) {
      logError(`${id}: safety_declarations.local_only must be true`);
      failures++;
    }

    // 4. checklist entries must all be false
    const checklist = packet.checklist || {};
    for (const [key, val] of Object.entries(checklist)) {
      if (val !== false) {
        logError(`${id}: checklist.${key} must be false, got: ${val}`);
        failures++;
      }
    }

    // 5. suggested_public_case_id is only a suggestion — confirm no actual incident was created
    // Exception: if this packet has an explicit Control Tower approval, the record is expected to exist.
    const approvalsPath = path.join(ROOT, 'data', 'reviews', 'real', 'approved-promotions.json');
    const approvedIds = new Set();
    if (fs.existsSync(approvalsPath)) {
      try {
        const approvals = JSON.parse(fs.readFileSync(approvalsPath, 'utf8'));
        for (const a of (approvals.approvals || [])) {
          if (a.allowed_public_case_id) approvedIds.add(a.allowed_public_case_id);
        }
      } catch (e) {}
    }
    const suggestedId = packet.suggested_public_case_id || '';
    if (suggestedId && !approvedIds.has(suggestedId)) {
      const suggestedFile = suggestedId.toLowerCase().replace('inc-', 'inc-') + '.json';
      const incPath = path.join(INCIDENTS_DIR, suggestedFile);
      const sitePath = path.join(SITE_DIR, 'data', 'incidents', suggestedFile);
      if (fs.existsSync(incPath) || fs.existsSync(sitePath)) {
        logError(`${id}: suggested_public_case_id '${suggestedId}' was actually created as a real incident record without CT approval!`);
        failures++;
      }
    }

    // 6. required_reviews must be non-empty
    if (!packet.required_reviews || packet.required_reviews.length === 0) {
      logError(`${id}: required_reviews is empty`);
      failures++;
    }

    // 7. packet_id format
    if (packet.packet_id && !/^PKT-\d{4}$/.test(packet.packet_id)) {
      logError(`${id}: packet_id '${packet.packet_id}' does not match PKT-NNNN format`);
      failures++;
    }
  }

  // 8. No packet files under site/
  const checkNoPacketsInSite = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        checkNoPacketsInSite(fullPath);
      } else if (item.isFile()) {
        const nameLower = item.name.toLowerCase();
        if (nameLower.startsWith('pkt-') || nameLower.includes('promotion-packet')) {
          logError(`Leakage detected! Promotion packet found under site/: ${fullPath}`);
          failures++;
        }
      }
    }
  };
  checkNoPacketsInSite(SITE_DIR);
  logPass('Public site/ is clean of promotion packet files.');

  // 9. Public incident count must match approved promotions + 12 baseline
  if (fs.existsSync(INCIDENTS_DIR)) {
    const approvalsPath2 = path.join(ROOT, 'data', 'reviews', 'real', 'approved-promotions.json');
    let approvedCount = 0;
    if (fs.existsSync(approvalsPath2)) {
      try {
        const ap = JSON.parse(fs.readFileSync(approvalsPath2, 'utf8'));
        approvedCount = (ap.approvals || []).length;
      } catch (e) {}
    }
    const expectedCount = 12 + approvedCount;
    const files = fs.readdirSync(INCIDENTS_DIR).filter(f => f.endsWith('.json'));
    if (files.length !== expectedCount) {
      logError(`Public incident count is ${files.length}, expected ${expectedCount} (12 baseline + ${approvedCount} approved).`);
      failures++;
    } else {
      logPass(`Incident dataset at expected count: ${expectedCount} records.`);
    }
  }

  // 10. INC-0013 must exist (approved under T054)
  const INC_0013_APPROVED = path.join(INCIDENTS_DIR, 'INC-0013-edpb-automated-decision-making-profiling-guidance.json');
  if (!fs.existsSync(INC_0013_APPROVED)) {
    logError('INC-0013 (approved T054) is missing from data/incidents/');
    failures++;
  } else {
    logPass('INC-0013 approved record exists (T054).');
  }

  if (failures > 0) {
    console.error(`\n\x1b[31mVALIDATION FAILED:\x1b[0m ${failures} promotion packet issue(s) detected.`);
    process.exit(1);
  } else {
    logPass(`ALL ${packetFiles.length} promotion packet(s) passed validation.`);
    process.exit(0);
  }
}

run();
