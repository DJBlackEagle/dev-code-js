#!/usr/bin/env bash
set -e

if [ -f "package.json" ]; then
  pnpm install
fi

echo "DevContainer post-create script completed successfully."
