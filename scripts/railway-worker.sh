#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/common.sh
source "${ROOT_DIR}/scripts/lib/common.sh"

ENV_NAME="${1:-local}"
WORKER_SERVICE="${RAILWAY_WORKER_SERVICE:-worker}"

if [[ "${ENV_NAME}" != "local" ]]; then
  validate_environment "${ENV_NAME}"
  ensure_railway_cli
  select_railway_environment "${ENV_NAME}" || error "Railway environment '${ENV_NAME}' is not available."
fi

if [[ "${ENV_NAME}" == "local" ]]; then
  log "Starting worker locally..."
  cd "${ROOT_DIR}"
  npm run worker:start
else
  log "Starting worker via Railway run (service: ${WORKER_SERVICE})..."
  if service_exists "${WORKER_SERVICE}"; then
    railway service "${WORKER_SERVICE}" >/dev/null
  fi
  railway run npm run worker:start
fi
