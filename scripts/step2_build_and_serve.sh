#!/usr/bin/env bash
set -euo pipefail

export USE_S3_SOURCE=true
export CONTENTFUL_ENV=${CONTENTFUL_ENV:-schema}

echo "==> Building from S3 snapshot…"
npm run build:s3

echo "==> Serving build on http://localhost:9000 …"
# Serve in foreground so you can Ctrl+C to stop
npx gatsby serve


