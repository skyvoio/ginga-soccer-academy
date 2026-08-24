#!/usr/bin/env bash
set -euo pipefail

# Post-merge setup is run from the project root with stdin closed.
# Keep every command non-interactive and safe to run repeatedly.
npm ci --ignore-scripts --no-audit --no-fund
npm run db:push -- --force