# Design & Architectural Decisions for T073

## Dynamic Live vs Dry-Run Downgrade
- **Decision**: Automatically fallback to dry-run behavior for Supabase and Cloudflare Worker operations if required environment keys or explicit approval markers are missing.
- **Rationale**: Prevents pipeline blocks or task failures during CI/CD or local runs when credentials are logically absent, ensuring the code remains fully verifiable in all environments.

## Metadata-Only Private Snapshot Writes
- **Decision**: Ensure that even if remote private snapshot writes are fully approved and executed, only highly sanitized metadata-only rows are written.
- **Rationale**: Prevents inadvertent exposure of private incident descriptions, vendor details, or local configurations to the database.

## Isolated UI Operational Telemetry View
- **Decision**: Add a distinct dropdown option and dedicated renderer for the operational status telemetry within the local Review Console.
- **Rationale**: Separates standard runtime activations from ongoing operational state monitoring, allowing clean checking of Supabase table shapes, Worker deployment status, and active safety gates.
