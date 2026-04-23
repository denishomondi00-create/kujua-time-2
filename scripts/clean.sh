#!/usr/bin/env bash
set -euo pipefail
rm -rf node_modules .turbo
find . -name dist -type d -prune -exec rm -rf {} +
find . -name .next -type d -prune -exec rm -rf {} +
