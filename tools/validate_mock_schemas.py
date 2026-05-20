#!/usr/bin/env python3
import json
import os
import sys
from jsonschema import Draft202012Validator

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANDIDATE_SCHEMA = os.path.join(ROOT, "schemas", "pipeline", "candidate.schema.json")
DRAFT_SCHEMA = os.path.join(ROOT, "schemas", "pipeline", "case-draft.schema.json")

CANDIDATES_DIR = os.path.join(ROOT, "data", "candidates", "mock")
DRAFTS_DIR = os.path.join(ROOT, "data", "drafts", "mock")

def validate_json_file(file_path, schema_path, entity_type):
    if not os.path.isfile(file_path):
        print(f"Error: {entity_type} file not found at {file_path}")
        return False
    
    try:
        data = json.load(open(file_path, "r", encoding="utf-8"))
    except Exception as e:
        print(f"Failed to load/parse {entity_type} {file_path}: {e}")
        return False
        
    try:
        schema = json.load(open(schema_path, "r", encoding="utf-8"))
        validator = Draft202012Validator(schema)
    except Exception as e:
        print(f"Failed to load/parse schema {schema_path}: {e}")
        return False
        
    errors = list(validator.iter_errors(data))
    if errors:
        print(f"[Schema Error] {entity_type} file '{os.path.basename(file_path)}' has validation errors:")
        for err in errors:
            print(f"  - {err.message} (at: {'.'.join(map(str, err.path))})")
        return False
    
    print(f"[Schema Pass] {entity_type} file '{os.path.basename(file_path)}' is perfectly compliant.")
    return True

def run():
    print("--- Caesar Atlas Mock Schemas Validation ---")
    errors_found = 0
    
    # 1. Validate candidates
    if not os.path.isdir(CANDIDATES_DIR):
        print(f"Error: candidates directory not found at {CANDIDATES_DIR}")
        sys.exit(1)
        
    cand_files = [f for f in os.listdir(CANDIDATES_DIR) if f.startswith("cand-") and f.endswith(".json")]
    if not cand_files:
        print("Warning: No mock candidate files found for validation.")
    else:
        for f in cand_files:
            file_path = os.path.join(CANDIDATES_DIR, f)
            if not validate_json_file(file_path, CANDIDATE_SCHEMA, "Candidate"):
                errors_found += 1
                
    # 2. Validate drafts
    if not os.path.isdir(DRAFTS_DIR):
        print(f"Error: drafts directory not found at {DRAFTS_DIR}")
        sys.exit(1)
        
    draft_files = [f for f in os.listdir(DRAFTS_DIR) if f.startswith("draft-") and f.endswith(".json")]
    if not draft_files:
        print("Warning: No mock draft files found for validation.")
    else:
        for f in draft_files:
            file_path = os.path.join(DRAFTS_DIR, f)
            if not validate_json_file(file_path, DRAFT_SCHEMA, "Draft"):
                errors_found += 1
                
    if errors_found > 0:
        print(f"\nFAIL: {errors_found} mock schema validation error(s) found.")
        sys.exit(1)
    else:
        print("PASS: All mock candidates and drafts are perfectly compliant with pipeline schemas!")
        sys.exit(0)

if __name__ == "__main__":
    run()
