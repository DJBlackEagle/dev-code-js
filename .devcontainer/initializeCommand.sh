#!/usr/bin/env bash
set -e

# Local .env file for Docker Compose inside the .devcontainer folder
ENV_FILE=".devcontainer/.env"
rm -f "$ENV_FILE"

# 1. Ensure the host default directory for Gemini exists (optional, if desired)
GEMINI_DIR="${HOME}/.gemini"
if [ ! -d "$GEMINI_DIR" ]; then
  mkdir -p "$GEMINI_DIR"
  chmod 755 "$GEMINI_DIR"
fi

# 2. Dynamic detection of which directory should be mounted
if [ -d "${HOME}/.gemini" ]; then
  echo "AI_CONFIG_HOST=${HOME}/.gemini" >> "$ENV_FILE"
  echo "AI_CONFIG_TARGET=/home/vscode/.gemini" >> "$ENV_FILE"
  echo "=> Gemini configuration detected on host and will be mounted."
elif [ -d "${HOME}/.claude" ]; then
  echo "AI_CONFIG_HOST=${HOME}/.claude" >> "$ENV_FILE"
  echo "AI_CONFIG_TARGET=/home/vscode/.claude" >> "$ENV_FILE"
  echo "=> Claude/Anthropic configuration detected on host and will be mounted."
else
  # Fallback: Create a dummy directory if none of the tools are used,
  # preventing Docker Compose from failing due to empty variables.
  DUMMY_DIR="${HOME}/.devcontainer-dummy"
  mkdir -p "$DUMMY_DIR"
  echo "AI_CONFIG_HOST=$DUMMY_DIR" >> "$ENV_FILE"
  echo "AI_CONFIG_TARGET=/home/vscode/.ai-dummy" >> "$ENV_FILE"
  echo "=> No AI configuration found. Using an empty dummy mount."
fi

echo "DevContainer initialization script completed successfully."