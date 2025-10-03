#!/usr/bin/env bash
set -euo pipefail

# ---- REQUIRED: set these in your shell or Netlify/CI env beforehand ----
: "${CONTENTFUL_SPACE_ID:?missing}"
: "${CONTENTFUL_ACCESS_TOKEN:?missing}"
: "${AWS_ACCESS_KEY_ID:?missing}"
: "${AWS_SECRET_ACCESS_KEY:?missing}"
: "${AWS_REGION:?missing}"
: "${S3_BUCKET:?missing}"

# ---- Local-only toggles for S3-based build ----
export USE_S3_SOURCE=true
# Point Contentful plugin at an EMPTY env so it registers resolvers but fetches no content
export CONTENTFUL_ENV=${CONTENTFUL_ENV:-schema}

echo "==> Creating fresh snapshot to S3 ($S3_BUCKET)…"
npm run snapshot
echo "✅ Snapshot created & active.json updated."


