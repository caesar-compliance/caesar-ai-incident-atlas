# Worker Private Review-State Sync Route Contract (T071)

This contract defines the local/mock endpoints prepared for hosted private review-state sync boundaries. 

## Endpoints

### 1. `GET /private/review-state/latest`
- **Purpose**: Retrieve the latest review state status.
- **Access**: Private/Dry-run.
- **Mock Response**:
  ```json
  {
    "status": "dry_run_only",
    "sync_status": "hosted_private_sync_readiness_prepared",
    "publication_blocked": true,
    "remote_write_attempted": false,
    "note": "Mock endpoint for hosted private review-state sync readiness contract."
  }
  ```

### 2. `POST /private/review-state/sync-dry-run`
- **Purpose**: Validate sync payloads against a dry-run sync contract.
- **Access**: Private/Dry-run.
- **Mock Response**:
  ```json
  {
    "status": "dry_run_only",
    "sync_status": "hosted_private_sync_readiness_prepared",
    "publication_blocked": true,
    "remote_write_attempted": false,
    "note": "Dry-run sync contract readiness verified."
  }
  ```

## Security Constraints
- All live Cloudflare Worker deployments of these routes are strictly prohibited under T071.
- No public routes may expose any part of the private review-state snapshots.
- No database write is performed by these endpoints.
