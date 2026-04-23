#!/usr/bin/env bash
set -euo pipefail

echo "==> Enabling corepack"
corepack enable

echo "==> Installing dependencies"
pnpm install

echo "==> Bootstrap complete"
echo "Next steps:"
echo "1. cp .env.example .env"
echo "2. docker compose -f infra/compose/docker-compose.yml up -d"
echo "3. pnpm dev"
