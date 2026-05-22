#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { loadRuntimeEnv, getDbUrl, RUNTIME_ROOT } from "./lib/load-runtime-env.mjs";
import { runtimeSafetySnapshot, assertRuntimeSafetyDisabled } from "./lib/runtime-safety.mjs";
import { EXPECTED_RUNTIME_TABLES, RUNTIME_SCHEMA_NAME } from "./lib/expected-tables.mjs";
import { withPgClient } from "./lib/pg-client.mjs";

const OUTPUT = path.join(RUNTIME_ROOT, "data/ops/runtime-db-health.json");

async function main() {
  const env = loadRuntimeEnv();
  const base = { checked_at: new Date().toISOString(), schema_name: RUNTIME_SCHEMA_NAME, ...runtimeSafetySnapshot(env) };
  if (assertRuntimeSafetyDisabled(env, "db-health").length) process.exit(1);
  const dbUrl = getDbUrl(env);
  if (!dbUrl) {
    write({ ...base, status: "not_configured" });
    console.log("PASS: db-health (not_configured)");
    return;
  }
  try {
    const health = await withPgClient(dbUrl, async (client) => {
      const rows = await client.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_name = ANY($2::text[])`,
        [RUNTIME_SCHEMA_NAME, EXPECTED_RUNTIME_TABLES],
      );
      const present = new Set(rows.rows.map((r) => r.table_name));
      const missing = EXPECTED_RUNTIME_TABLES.filter((t) => !present.has(t));
      return { status: missing.length ? "schema_missing" : "connected", missing_tables: missing };
    });
    write({ ...base, ...health });
    console.log(`PASS: db-health (${health.status})`);
  } catch {
    write({ ...base, status: "error" });
  }
}

function write(payload) {
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`);
}

main();
