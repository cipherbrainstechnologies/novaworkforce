#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/common.sh
source "${ROOT_DIR}/scripts/lib/common.sh"

ENV_NAME="${1:-staging}"
WEB_SERVICE="${RAILWAY_WEB_SERVICE:-web}"
WORKER_SERVICE="${RAILWAY_WORKER_SERVICE:-worker}"

validate_environment "${ENV_NAME}"
ensure_railway_cli
select_railway_environment "${ENV_NAME}" || error "Railway environment '${ENV_NAME}' is not available."

check_web_health() {
  local app_url="$1"
  local endpoint="${app_url%/}/api/health"
  log "Checking web health: ${endpoint}"

  local http_code
  http_code="$(curl -fsS -o /tmp/railway-web-health.json -w '%{http_code}' "${endpoint}" || true)"

  if [[ "${http_code}" != "200" ]]; then
    warn "Web health check failed with HTTP ${http_code}"
    [[ -f /tmp/railway-web-health.json ]] && cat /tmp/railway-web-health.json
    return 1
  fi

  log "Web health check passed."
  return 0
}

check_worker_health() {
  local worker_url="$1"
  log "Checking worker health: ${worker_url}"

  local http_code
  http_code="$(curl -fsS -o /tmp/railway-worker-health.json -w '%{http_code}' "${worker_url}" || true)"

  if [[ "${http_code}" != "200" ]]; then
    warn "Worker health check failed with HTTP ${http_code}"
    [[ -f /tmp/railway-worker-health.json ]] && cat /tmp/railway-worker-health.json
    return 1
  fi

  log "Worker health check passed."
  return 0
}

APP_URL_VALUE=""
WORKER_HEALTH_URL=""

if service_exists "${WEB_SERVICE}"; then
  railway service "${WEB_SERVICE}" >/dev/null
  APP_URL_VALUE="$(railway variables --json 2>/dev/null | sed -n 's/.*"APP_URL"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1 || true)"
fi

if [[ -z "${APP_URL_VALUE}" ]]; then
  read -r -p "Enter deployed APP_URL (e.g. https://your-app.up.railway.app): " APP_URL_VALUE
fi

web_ok=0
worker_ok=0

if [[ -n "${APP_URL_VALUE}" ]]; then
  check_web_health "${APP_URL_VALUE}" && web_ok=1
fi

if service_exists "${WORKER_SERVICE}"; then
  railway service "${WORKER_SERVICE}" >/dev/null
  worker_domain="$(railway domain 2>/dev/null | head -n1 || true)"
  if [[ -n "${worker_domain}" ]]; then
    WORKER_HEALTH_URL="https://${worker_domain}:8081/"
    check_worker_health "${WORKER_HEALTH_URL}" && worker_ok=1
  else
    warn "Worker public domain not found. Worker health is typically internal on WORKER_HEALTH_PORT=8081."
    worker_ok=1
  fi
else
  warn "Worker service not found; skipping worker health check."
  worker_ok=1
fi

if [[ "${web_ok}" -eq 1 && "${worker_ok}" -eq 1 ]]; then
  log "All health checks passed for ${ENV_NAME}."
  exit 0
fi

error "One or more health checks failed."
