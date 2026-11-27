#!/usr/bin/env bash
set -e

# Local .env file for Docker Compose inside the .devcontainer folder
ENV_FILE=".devcontainer/.env"
rm -f "$ENV_FILE"

escape_env_value() {
  local value="$1"
  value="${value//\\/\\\\}"
  value="${value//\"/\\\"}"
  value="${value//\$/\$\$}"
  printf '%s' "$value"
}

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

# 3. Forward effective host Git identity (local, includeIf, global, or system)
HOST_GIT_NAME="$(git config --get user.name 2>/dev/null || true)"
HOST_GIT_EMAIL="$(git config --get user.email 2>/dev/null || true)"

if [ -n "$HOST_GIT_NAME" ]; then
  printf 'GIT_USER_NAME="%s"\n' "$(escape_env_value "$HOST_GIT_NAME")" >> "$ENV_FILE"
  echo "=> Git user.name forwarded to Docker Compose."
fi

if [ -n "$HOST_GIT_EMAIL" ]; then
  printf 'GIT_USER_EMAIL="%s"\n' "$(escape_env_value "$HOST_GIT_EMAIL")" >> "$ENV_FILE"
  echo "=> Git user.email forwarded to Docker Compose."
fi

# 4. Resolve Git SSH signing public key (env var takes precedence over host Git config)
SIGNING_PUB_KEY="${GIT_SIGNING_PUB_KEY:-}"

if [ -z "$SIGNING_PUB_KEY" ]; then
  HOST_GPG_FORMAT="$(git config --get gpg.format 2>/dev/null || true)"
  if [ "$HOST_GPG_FORMAT" = "ssh" ]; then
    HOST_SIGNING_KEY="$(git config --get user.signingkey 2>/dev/null || true)"
    case "$HOST_SIGNING_KEY" in
      key::*)
        SIGNING_PUB_KEY="${HOST_SIGNING_KEY#key::}"
        ;;
      ssh-*" "* | sk-ssh-*" "* | ecdsa-*" "* | sk-ecdsa-*" "*)
        SIGNING_PUB_KEY="$HOST_SIGNING_KEY"
        ;;
      "")
        ;;
      *)
        case "$HOST_SIGNING_KEY" in
          "~/"*)
            KEY_PATH="${HOME}/${HOST_SIGNING_KEY#"~/"}"
            ;;
          *)
            KEY_PATH="$HOST_SIGNING_KEY"
            ;;
        esac
        if [ -f "$KEY_PATH" ]; then
          SIGNING_PUB_KEY="$(head -n 1 "$KEY_PATH" | tr -d '\r\n')"
        fi
        ;;
    esac
  fi
fi

# Strip any trailing CR/LF from env-provided or resolved key
SIGNING_PUB_KEY="$(printf '%s' "$SIGNING_PUB_KEY" | tr -d '\r\n')"

if [ -n "$SIGNING_PUB_KEY" ]; then
  case "$SIGNING_PUB_KEY" in
    ssh-*" "* | sk-ssh-*" "* | ecdsa-*" "* | sk-ecdsa-*" "*)
      printf 'GIT_SIGNING_PUB_KEY="%s"\n' "$(escape_env_value "$SIGNING_PUB_KEY")" >> "$ENV_FILE"
      echo "=> Git SSH signing public key forwarded to Docker Compose."
      ;;
    *)
      echo "=> Warning: Ignoring Git signing key because it does not appear to be an SSH public key." >&2
      ;;
  esac
fi

echo "DevContainer initialization script completed successfully."
