#!/usr/bin/env bash
#
# Re-deploy site content to donuts.hatch.org
# Syncs the static site to S3 and invalidates the CloudFront cache.
#
# Usage:  ./deploy/deploy.sh
#
# One-time infra (bucket, CloudFront, ACM cert, Route 53) was provisioned per
# the steps in the project plan; this script only pushes content updates.
set -euo pipefail

BUCKET="donuts-hatch-org"
DIST_ID="E1TEFD3BYTNZFM"           # CloudFront distribution for donuts.hatch.org
REGION="us-east-1"

cd "$(dirname "$0")/.."

echo "==> Syncing site to s3://${BUCKET}"
aws s3 sync . "s3://${BUCKET}" \
  --exclude ".git/*" \
  --exclude "deploy/*" \
  --exclude "*.md" \
  --exclude ".gitignore" \
  --exclude "*.png" \
  --cache-control "public,max-age=300" \
  --delete \
  --only-show-errors

echo "==> Invalidating CloudFront cache"
aws cloudfront create-invalidation \
  --distribution-id "${DIST_ID}" \
  --paths "/*" \
  --query 'Invalidation.{Id:Id,Status:Status}' --output json

echo "==> Done. https://donuts.hatch.org/"
