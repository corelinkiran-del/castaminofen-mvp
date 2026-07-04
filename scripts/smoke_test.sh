#!/usr/bin/env bash
set -euo pipefail

echo "Running smoke tests: DB tables and auth service health"

echo "Listing DB tables:"
docker-compose exec -T postgres psql -U media_user -d media_platform -c "\dt"

echo "Counting users:"
docker-compose exec -T postgres psql -U media_user -d media_platform -c "SELECT COUNT(*) FROM users;"

echo "Calling auth service health endpoint (may be mocked):"
curl -sS http://localhost:3001/health || echo "auth service not reachable"

echo "Smoke tests finished."
