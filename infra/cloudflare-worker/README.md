# Cloudflare Worker — Caesar AI Incident Atlas

API and cron edge layer skeleton.  
**Not deployed in this task. No secrets stored here.**

## Routes

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/status` | Ops status (from env var or static fallback) |
| GET | `/public-records` | Public records stub (Supabase integration pending) |
| GET | `/latest-run` | Latest watch run summary |
| POST | `/watch/run` | Trigger watch run — **disabled** unless `ENABLE_WATCH_RUNS=true` |

## How to deploy (future)

1. Copy `wrangler.example.toml` → `wrangler.toml`.
2. Fill in `account_id`.
3. Set secrets: `wrangler secret put SUPABASE_URL`, `wrangler secret put SUPABASE_ANON_KEY`.
4. Deploy: `wrangler deploy`.

## Safety

- `POST /watch/run` always returns `403 disabled` unless `ENABLE_WATCH_RUNS=true` is explicitly set.
- Scheduled cron is commented out in `wrangler.example.toml` — requires explicit opt-in.
- No credentials committed.
