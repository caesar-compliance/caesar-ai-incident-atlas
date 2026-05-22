#!/usr/bin/env node
import { envFlagTrue } from "./load-runtime-env.mjs";

export function assertRuntimeSafetyDisabled(env, context = "runtime") {
  const errors = [];
  for (const key of ["ENABLE_LIVE_INGESTION", "ENABLE_SCHEDULED_MONITORING", "APPLY_SUPABASE_SCHEMA"]) {
    if (key === "APPLY_SUPABASE_SCHEMA") continue;
    if (envFlagTrue(env, key)) errors.push(`${context}: ${key} must remain disabled`);
  }
  return errors;
}

export function runtimeSafetySnapshot(env) {
  return {
    live_ingestion_enabled: envFlagTrue(env, "ENABLE_LIVE_INGESTION"),
    scheduled_monitoring_enabled: envFlagTrue(env, "ENABLE_SCHEDULED_MONITORING"),
  };
}
