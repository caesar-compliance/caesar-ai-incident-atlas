#!/usr/bin/env python3
"""
Caesar AI Incident Atlas — Dataset & Site Validator
Run from repository root: python3 tools/validate_dataset.py
Exit 0 = PASS, non-zero = FAIL.
"""

import glob
import hashlib
import json
import os
import re
import sys

# ── Paths (relative to repo root) ─────────────────────────────────────────────
ROOT            = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH      = os.path.join(ROOT, "data", "incident-index.json")
INCIDENTS_GLOB  = os.path.join(ROOT, "data", "incidents", "INC-*.json")
SCHEMA_PATH     = os.path.join(ROOT, "schemas", "incident.schema.json")
TAX_DIR         = os.path.join(ROOT, "data", "taxonomy")
SITE_FILES      = [
    os.path.join(ROOT, "site", "index.html"),
    os.path.join(ROOT, "site", "assets", "styles.css"),
    os.path.join(ROOT, "site", "assets", "app.js"),
    os.path.join(ROOT, "site", "README.md"),
]
EXTERNAL_PATTERNS = ["cdn.", "googleapis", "unpkg.com", "jsdelivr", "cloudflare.com",
                     "fonts.google", "gstatic.com", "amplitude.com", "segment.com",
                     "analytics.google", "gtag("]

VALID_SEVERITY   = {"low", "medium", "high", "critical"}
VALID_CONFIDENCE = {"low", "medium", "high"}

issues   = []
warnings = []

def fail(msg): issues.append(msg)
def warn(msg): warnings.append(msg)

# ── Load taxonomy ──────────────────────────────────────────────────────────────
def load_taxonomy_ids(filename):
    path = os.path.join(TAX_DIR, filename)
    try:
        data = json.load(open(path))
        return {item["id"] for item in data.get("items", [])}
    except Exception as e:
        fail(f"Cannot load taxonomy {filename}: {e}")
        return set()

VALID_FM       = load_taxonomy_ids("failure_modes.json")
VALID_CONTROLS = load_taxonomy_ids("controls.json")
VALID_SECTORS  = load_taxonomy_ids("sectors.json")
VALID_EV       = load_taxonomy_ids("evidence_types.json")

# ── Load schema ────────────────────────────────────────────────────────────────
try:
    from jsonschema import Draft202012Validator
    schema      = json.load(open(SCHEMA_PATH))
    validator   = Draft202012Validator(schema)
    have_schema = True
except ImportError:
    have_schema = False
    fail("jsonschema is not installed. Run: pip install jsonschema\n"
         "  Schema validation cannot proceed without this package.")

# ── Check 1: incident-index.json ──────────────────────────────────────────────
print("Checking data/incident-index.json …")
try:
    index = json.load(open(INDEX_PATH))
    entries = index.get("incidents", [])
    print(f"  index entries: {len(entries)}")
except Exception as e:
    fail(f"data/incident-index.json: cannot parse — {e}")
    entries = []

# ── Check 2: INC-*.json files ─────────────────────────────────────────────────
print("Checking data/incidents/ …")
record_paths = sorted(glob.glob(INCIDENTS_GLOB))
print(f"  INC files found: {len(record_paths)}")

if len(record_paths) != 10:
    fail(f"Expected exactly 10 INC-*.json files, found {len(record_paths)}")

# ── Check 3: No INC-0011 or higher ────────────────────────────────────────────
def _inc_num(path):
    m = re.search(r"INC-(\d{4})", os.path.basename(path))
    return int(m.group(1)) if m else 0

over = [p for p in record_paths if _inc_num(p) >= 11]
if over:
    fail(f"INC-0011 or higher found: {[os.path.basename(p) for p in over]}")

# ── Check 4: Parse and validate each record ───────────────────────────────────
records = []
for path in record_paths:
    basename = os.path.basename(path)
    try:
        rec = json.load(open(path))
        records.append((path, rec))
    except Exception as e:
        fail(f"{basename}: invalid JSON — {e}")

for path, rec in records:
    basename = os.path.basename(path)
    rid      = rec.get("incident_id", "")

    # ID format
    if not re.fullmatch(r"INC-\d{4}", rid):
        fail(f"{basename}: incident_id '{rid}' does not match INC-NNNN format")

    # ID matches filename
    if rid and not basename.startswith(rid + "-") and basename != rid + ".json":
        fail(f"{basename}: filename does not start with {rid}")

    # Schema validation
    if have_schema:
        errs = list(validator.iter_errors(rec))
        for e in errs:
            fail(f"{rid} schema: {e.message}")

    # Deprecated field
    for src in rec.get("sources", []):
        if "database" in src:
            fail(f"{rid}: source uses deprecated 'database' field — rename to 'source_type'")
        if "source_type" not in src:
            fail(f"{rid}: source is missing required 'source_type' field")

    # Taxonomy: failure_modes
    for fm in rec.get("failure_modes", []):
        if fm not in VALID_FM:
            fail(f"{rid}: unknown failure_mode '{fm}'")

    # Taxonomy: controls
    for ctl in rec.get("controls", []):
        if ctl not in VALID_CONTROLS:
            fail(f"{rid}: unknown control '{ctl}'")

    # Taxonomy: sector
    for sec in rec.get("sector", []):
        if sec not in VALID_SECTORS:
            fail(f"{rid}: unknown sector '{sec}'")

    # Taxonomy: severity / confidence
    sev  = rec.get("severity", "")
    conf = rec.get("confidence", "")
    if sev and sev not in VALID_SEVERITY:
        fail(f"{rid}: invalid severity '{sev}'")
    if conf and conf not in VALID_CONFIDENCE:
        fail(f"{rid}: invalid confidence '{conf}'")

    # Taxonomy: evidence_required (EV-NNN prefix check)
    for ev in rec.get("evidence_required", []):
        m = re.match(r"(EV-\d+)", ev)
        if m:
            ev_id = m.group(1)
            if ev_id not in VALID_EV:
                fail(f"{rid}: unknown evidence_type ID '{ev_id}' in evidence_required")

# ── Check 5: index entries match actual files ──────────────────────────────────
print("Checking index ↔ file consistency …")
index_ids    = {e["incident_id"] for e in entries}
file_ids     = set()
for path, rec in records:
    file_ids.add(rec.get("incident_id", ""))

for iid in index_ids - file_ids:
    fail(f"Index references {iid} but no matching file found")
for iid in file_ids - index_ids:
    warn(f"File exists for {iid} but it is not listed in incident-index.json")

# ── Check 6: Site files exist + no external dependencies ──────────────────────
print("Checking site files …")
for sf in SITE_FILES:
    rel = os.path.relpath(sf, ROOT)
    if not os.path.isfile(sf):
        fail(f"Required site file missing: {rel}")
    else:
        txt = open(sf, encoding="utf-8").read()
        for pat in EXTERNAL_PATTERNS:
            if pat in txt:
                fail(f"{rel}: contains external dependency pattern '{pat}'")

# ── Check 7: site/data/incident-index.json exists ────────────────────────────
print("Checking site/data/ publish copy …")
SITE_INDEX = os.path.join(ROOT, "site", "data", "incident-index.json")
if not os.path.isfile(SITE_INDEX):
    fail("site/data/incident-index.json missing — run T017 data copy step")

# ── Check 8: root data/incidents/ and site/data/incidents/ in sync ────────────
root_inc_dir = os.path.join(ROOT, "data", "incidents")
site_inc_dir = os.path.join(ROOT, "site", "data", "incidents")
root_inc_files = {os.path.basename(p) for p in glob.glob(os.path.join(root_inc_dir, "INC-*.json"))}
site_inc_files = {os.path.basename(p) for p in glob.glob(os.path.join(site_inc_dir, "INC-*.json"))}

for fname in root_inc_files - site_inc_files:
    fail(f"site/data/incidents/{fname} missing (present in root data/incidents/)")
for fname in site_inc_files - root_inc_files:
    warn(f"site/data/incidents/{fname} has no counterpart in root data/incidents/")

def _sha256(path):
    return hashlib.sha256(open(path, "rb").read()).hexdigest()

for fname in root_inc_files & site_inc_files:
    rp = os.path.join(root_inc_dir, fname)
    sp = os.path.join(site_inc_dir, fname)
    if _sha256(rp) != _sha256(sp):
        fail(f"site/data/incidents/{fname} differs from root data/incidents/{fname} — re-sync needed")

# ── Check 9: root data/taxonomy/ and site/data/taxonomy/ in sync ──────────────
root_tax_dir = os.path.join(ROOT, "data", "taxonomy")
site_tax_dir = os.path.join(ROOT, "site", "data", "taxonomy")
root_tax_files = {os.path.basename(p) for p in glob.glob(os.path.join(root_tax_dir, "*.json"))}
site_tax_files = {os.path.basename(p) for p in glob.glob(os.path.join(site_tax_dir, "*.json"))}

for fname in root_tax_files - site_tax_files:
    fail(f"site/data/taxonomy/{fname} missing (present in root data/taxonomy/)")
for fname in root_tax_files & site_tax_files:
    rp = os.path.join(root_tax_dir, fname)
    sp = os.path.join(site_tax_dir, fname)
    if _sha256(rp) != _sha256(sp):
        fail(f"site/data/taxonomy/{fname} differs from root data/taxonomy/{fname} — re-sync needed")

# ── Check 10: app.js uses site-relative path, not ../data/ ────────────────────
appjs_path = os.path.join(ROOT, "site", "assets", "app.js")
if os.path.isfile(appjs_path):
    appjs = open(appjs_path, encoding="utf-8").read()
    if "../data/" in appjs:
        fail("site/assets/app.js still contains '../data/' — update to 'data/'")
    if '"data/incident-index.json"' not in appjs:
        fail("site/assets/app.js does not contain expected path 'data/incident-index.json'")

# ── Summary ────────────────────────────────────────────────────────────────────
print()
if warnings:
    print(f"WARNINGS ({len(warnings)}):")
    for w in warnings:
        print(f"  ⚠  {w}")
    print()

if issues:
    print(f"FAIL — {len(issues)} issue(s) found:")
    for i in issues:
        print(f"  ✗  {i}")
    sys.exit(1)
else:
    print(f"PASS — all checks passed ({len(record_paths)} records, {len(SITE_FILES)} site files)")
    sys.exit(0)
