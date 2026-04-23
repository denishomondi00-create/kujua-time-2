#!/usr/bin/env bash
set -euo pipefail

required=(
  "apps/web"
  "apps/api"
  "apps/worker"
  "apps/scheduler"
  "apps/embed"
  "apps/docs"
  "packages/config"
  "packages/db"
  "infra/docker"
  "infra/compose"
  "infra/nginx"
  "infra/terraform"
  "infra/k8s"
  "infra/monitoring"
  "docs"
)

for path in "${required[@]}"; do
  if [ ! -e "$path" ]; then
    echo "Missing: $path"
    exit 1
  fi
done

echo "Structure verification passed."
