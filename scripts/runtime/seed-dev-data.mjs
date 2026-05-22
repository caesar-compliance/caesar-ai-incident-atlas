#!/usr/bin/env node
/** Dev seed not supported for hosted atlas records — metadata stub only. */
import { loadRuntimeEnv, envFlagTrue } from "./lib/load-runtime-env.mjs";

const env = loadRuntimeEnv();
if (!envFlagTrue(env, "ENABLE_DEV_SEED")) {
  console.log("seed-dev-data: no-op (ENABLE_DEV_SEED not set)");
  process.exit(0);
}
console.log(
  "seed-dev-data: not supported — use scripts/export-supabase-bootstrap-payloads.mjs for sanitized bootstrap JSON",
);
process.exit(0);
