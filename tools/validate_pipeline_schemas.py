#!/usr/bin/env python3
"""
Caesar AI Incident Atlas — Pipeline & Registry Validator
Run from repository root: python3 tools/validate_pipeline_schemas.py
"""

import json
import os
import sys
import yaml
from jsonschema import Draft202012Validator

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCES_PATH = os.path.join(ROOT, "data", "source-registry", "sources.yml")
SOURCE_SCHEMA_PATH = os.path.join(ROOT, "schemas", "pipeline", "source.schema.json")

def validate_sources():
    print("Validating data/source-registry/sources.yml ...")
    
    # Check file existence
    if not os.path.isfile(SOURCES_PATH):
        print(f"Error: sources.yml not found at {SOURCES_PATH}")
        sys.exit(1)
        
    if not os.path.isfile(SOURCE_SCHEMA_PATH):
        print(f"Error: source.schema.json not found at {SOURCE_SCHEMA_PATH}")
        sys.exit(1)
        
    # Load Schema
    try:
        schema = json.load(open(SOURCE_SCHEMA_PATH, encoding="utf-8"))
        validator = Draft202012Validator(schema)
    except Exception as e:
        print(f"Failed to load/parse source schema: {e}")
        sys.exit(1)
        
    # Load Sources
    try:
        sources = yaml.safe_load(open(SOURCES_PATH, encoding="utf-8"))
    except Exception as e:
        print(f"Failed to parse sources.yml: {e}")
        sys.exit(1)
        
    if not isinstance(sources, list):
        print("Error: sources.yml root must be a list of sources.")
        sys.exit(1)
        
    errors_found = 0
    
    for idx, source in enumerate(sources):
        source_id = source.get("id", f"index_{idx}")
        # Run jsonschema validation
        errors = list(validator.iter_errors(source))
        if errors:
            print(f"Source '{source_id}' has validation errors:")
            for err in errors:
                print(f"  - [Error] {err.message} (at path: {'.'.join(map(str, err.path))})")
                errors_found += 1
        
        # Policy enforcement checks
        status = source.get("status")
        if status != "inactive_draft":
            print(f"[Policy Alert] Source '{source_id}' status must be 'inactive_draft' for safety, found '{status}'")
            errors_found += 1
            
        auto_publish = source.get("auto_publish_allowed")
        if auto_publish is not False:
            print(f"[Policy Alert] Source '{source_id}' auto_publish_allowed must be explicitly false, found {auto_publish}")
            errors_found += 1
            
        source_tier = source.get("source_tier")
        auto_detect = source.get("auto_detect_allowed")
        auto_draft = source.get("auto_draft_allowed")
        
        # Enforce that non-Green sources cannot have auto-detect or auto-draft
        if source_tier != "green" and (auto_detect is not False or auto_draft is not False):
            print(f"[Policy Alert] Source '{source_id}' is tier '{source_tier}', which is not green. Auto-detect/auto-draft must be false.")
            errors_found += 1
            
        allowed_use = source.get("allowed_use")
        if source_tier == "yellow" and allowed_use == "official_public_source":
            print(f"[Policy Alert] Source '{source_id}' is Yellow Tier but claims 'official_public_source' allowed_use.")
            errors_found += 1
            
    if errors_found > 0:
        print(f"\nFAIL: {errors_found} pipeline validation error(s) found.")
        sys.exit(1)
    else:
        print("PASS: all sources.yml entries are fully valid and compliant with safety policies!")
        sys.exit(0)

if __name__ == "__main__":
    validate_sources()
