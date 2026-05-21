#!/usr/bin/env node
/**
 * Incident Atlas — runtime credential presence (no secrets, no network).
 * Writes data/ops/runtime-services-readiness.json
 * Does not replace preflight-hosted-activation.mjs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUTPUT = path.join(ROOT, "data/ops/runtime-services-readiness.json");

const FILES = {
  runtime: ".env.runtime.local",
  cloudflare: ".env.cloudflare.local",
  legacy: ".env",
};

function parseEnv(content) {
  const out = {};
  for (const line of content.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function load(name) {
  const p = path.join(ROOT, name);
  if (!fs.existsSync(p)) return { exists: false, env: {} };
  return { exists: true, env: parseEnv(fs.readFileSync(p, "utf8")) };
}

function present(env, key) {
  return String(env[key] ?? "").trim().length > 0;
}

function flagTrue(env, key) {
  const v = String(env[key] ?? "").trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

function rows(env, keys) {
  return keys.map((key) => ({ key, present: present(env, key) }));
}

function allPresent(r) {
  return r.length > 0 && r.every((x) => x.present);
}

const SUPABASE_REQ = ["SUPABASE_URL"];
const SUPABASE_OPT = [
  "SUPABASE_PROJECT_NAME",
  "SUPABASE_PROJECT_REF",
  "SUPABASE_DB_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SCHEMA",
];
const CF_REQ = ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_API_TOKEN", "CLOUDFLARE_WORKER_NAME"];

function main() {
  const runtimeF = load(FILES.runtime);
  const cfF = load(FILES.cloudflare);
  const legacyF = load(FILES.legacy);
  const supabaseEnv = { ...legacyF.env, ...runtimeF.env };

  const safety = {
    apply_supabase_schema: flagTrue(supabaseEnv, "APPLY_SUPABASE_SCHEMA"),
    enable_live_ingestion: flagTrue(supabaseEnv, "ENABLE_LIVE_INGESTION"),
    enable_scheduled_monitoring: flagTrue(supabaseEnv, "ENABLE_SCHEDULED_MONITORING"),
    enable_network_execution: flagTrue(supabaseEnv, "ENABLE_NETWORK_EXECUTION"),
    enable_watch_runs: flagTrue(supabaseEnv, "ENABLE_WATCH_RUNS"),
    cloudflare_enable_worker_deploy: flagTrue(cfF.env, "CLOUDFLARE_ENABLE_WORKER_DEPLOY"),
    cloudflare_enable_cron_trigger: flagTrue(cfF.env, "CLOUDFLARE_ENABLE_CRON_TRIGGER"),
  };

  const safetyErrors = [];
  const labels = {
    apply_supabase_schema: "APPLY_SUPABASE_SCHEMA",
    enable_live_ingestion: "ENABLE_LIVE_INGESTION",
    enable_scheduled_monitoring: "ENABLE_SCHEDULED_MONITORING",
    enable_network_execution: "ENABLE_NETWORK_EXECUTION",
    enable_watch_runs: "ENABLE_WATCH_RUNS",
    cloudflare_enable_worker_deploy: "CLOUDFLARE_ENABLE_WORKER_DEPLOY",
    cloudflare_enable_cron_trigger: "CLOUDFLARE_ENABLE_CRON_TRIGGER",
  };
  for (const [k, label] of Object.entries(labels)) {
    if (safety[k]) safetyErrors.push(`${label} must be false in local env`);
  }

  const supReq = rows(supabaseEnv, SUPABASE_REQ);
  const supOpt = rows(supabaseEnv, SUPABASE_OPT);
  const cfRows = rows(cfF.env, CF_REQ);

  const readiness = {
    supabase_required_ready: allPresent(supReq),
    cloudflare_ready: allPresent(cfRows),
  };

  let status = "onboarding_incomplete";
  if (safetyErrors.length) status = "unsafe_local_flags";
  else if (readiness.supabase_required_ready && readiness.cloudflare_ready) {
    status = "local_credentials_ready";
  } else if (readiness.supabase_required_ready || readiness.cloudflare_ready) {
    status = "partial";
  }

  const payload = {
    status,
    checked_at: new Date().toISOString(),
    account_allocation: "account_b",
    readiness,
    services: [
      { service: "supabase", fields: [...supReq, ...supOpt] },
      { service: "cloudflare", fields: cfRows },
    ],
    safety_flags: safety,
    local_env_files: {
      env_runtime_local: runtimeF.exists,
      env_cloudflare_local: cfF.exists,
      env_legacy: legacyF.exists,
    },
    next_required_action:
      "Fill .env.runtime.local / .env for Account B project caesar-incident-atlas-dev. Use preflight-hosted-activation separately.",
    public_note: "Metadata-only. Hosted activation preflight is a separate script.",
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log("Runtime services credential check (values not shown)");
  for (const f of Object.values(FILES)) {
    console.log(`  ${f}: ${load(f).exists ? "found" : "missing"}`);
  }
  console.log(`Wrote ${OUTPUT}`);

  if (safetyErrors.length) {
    console.error("FAILED — unsafe local flags");
    process.exit(1);
  }
  console.log("PASS: check-service-credentials");
}

main();
