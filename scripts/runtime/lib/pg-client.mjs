#!/usr/bin/env node
export async function withPgClient(dbUrl, fn) {
  let pgMod;
  try {
    pgMod = await import("pg");
  } catch {
    throw new Error("pg not installed — use psql for schema apply or add pg locally");
  }
  const pg = pgMod.default ?? pgMod;
  const client = new pg.Client({
    connectionString: dbUrl,
    ssl: dbUrl.includes("supabase.co") ? { rejectUnauthorized: false } : undefined,
  });
  try {
    await client.connect();
    return await fn(client);
  } finally {
    await client.end().catch(() => {});
  }
}
