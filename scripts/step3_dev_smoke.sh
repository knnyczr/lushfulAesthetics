#!/usr/bin/env bash
set -euo pipefail

export USE_S3_SOURCE=true
export CONTENTFUL_ENV=${CONTENTFUL_ENV:-schema}

# Start dev server in background on default port 8000
echo "==> Starting gatsby develop (background)…"
npx gatsby develop >/tmp/gatsby-dev.log 2>&1 &
GATSBY_PID=$!

# Wait for port 8000 to open
echo "==> Waiting for http://localhost:8000/___graphql …"
for i in {1..60}; do
  if curl -sSf http://localhost:8000/___graphql >/dev/null; then
    break
  fi
  sleep 1
done

# Run GraphQL smoke test
echo "==> Running smoke GraphQL test…"
GRAPHQL_ENDPOINT=http://localhost:8000/___graphql node scripts/smoke-graphql.js

# Stop dev server
echo "==> Stopping gatsby develop (pid $GATSBY_PID)…"
kill $GATSBY_PID || true
echo "✅ Dev smoke test complete."
