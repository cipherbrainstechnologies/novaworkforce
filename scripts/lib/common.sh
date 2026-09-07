#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VALID_ENVIRONMENTS=(development staging production)

log() {
  printf '[railway] %s\n' "$*"
}

warn() {
  printf '[railway][warn] %s\n' "$*" >&2
}

error() {
  printf '[railway][error] %s\n' "$*" >&2
  exit 1
}

require_command() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || error "Required command not found: ${cmd}"
}

ensure_railway_cli() {
  require_command railway
  if ! railway whoami >/dev/null 2>&1; then
    error "Railway CLI is not authenticated. Run: railway login"
  fi
}

validate_environment() {
  local env_name="${1:-}"
  local valid=false
  for candidate in "${VALID_ENVIRONMENTS[@]}"; do
    if [[ "${candidate}" == "${env_name}" ]]; then
      valid=true
      break
    fi
  done
  [[ "${valid}" == true ]] || error "Invalid environment '${env_name}'. Use: development | staging | production"
}

env_file_for() {
  local env_name="$1"
  case "${env_name}" in
    production) echo "${ROOT_DIR}/.env.production.local" ;;
    staging) echo "${ROOT_DIR}/.env.staging.local" ;;
    development) echo "${ROOT_DIR}/.env.development.local" ;;
    *) error "Unknown environment: ${env_name}" ;;
  esac
}

select_railway_environment() {
  local env_name="$1"
  railway environment "${env_name}" >/dev/null 2>&1 || {
    warn "Railway environment '${env_name}' is not linked yet."
    warn "Create it in Railway Dashboard: Project -> Settings -> Environments -> New Environment"
    return 1
  }
}

service_exists() {
  local service_name="$1"
  railway service "${service_name}" >/dev/null 2>&1
}

generate_secret() {
  openssl rand -base64 48 | tr -d '\n'
}

set_local_env_value() {
  local file_path="$1"
  local key="$2"
  local value="$3"
  touch "${file_path}"
  if grep -q "^${key}=" "${file_path}" 2>/dev/null; then
    sed -i "s|^${key}=.*|${key}=${value}|" "${file_path}"
  else
    printf '%s=%s\n' "${key}" "${value}" >> "${file_path}"
  fi
}

get_env_value() {
  local file_path="$1"
  local key="$2"
  if [[ -f "${file_path}" ]] && grep -q "^${key}=" "${file_path}"; then
    sed -n "s|^${key}=||p" "${file_path}" | tail -n1
  fi
}

set_railway_variable() {
  local service_name="${1:-}"
  local key="$2"
  local value="$3"

  if [[ -n "${service_name}" ]]; then
    railway variables --set "${key}=${value}" --service "${service_name}" >/dev/null
  else
    railway variables --set "${key}=${value}" >/dev/null
  fi
}

print_variable_names_only() {
  local -a names=("$@")
  for name in "${names[@]}"; do
    printf '  - %s\n' "${name}"
  done
}
