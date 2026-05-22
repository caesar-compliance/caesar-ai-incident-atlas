#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const steps = [
  ["validate-supabase-schema", "scripts/validate-supabase-schema.mjs"],
  ["test-cloudflare-worker-local", "scripts/test-cloudflare-worker-local.mjs"],
  ["check-service-credentials", "scripts/runtime/check-service-credentials.mjs"],
  ["db-health", "scripts/runtime/check-runtime-db-health.mjs"],
];

let failed = 0;
for (const [label, rel] of steps) {
  const r = spawnSync("node", [path.join(ROOT, rel)], { cwd: ROOT, encoding: "utf8" });
  if (r.status === 0) console.log(`PASS: ${label}`);
  else { console.log(`FAIL: ${label}`); failed++; }
}
process.exit(failed ? 1 : 0);
