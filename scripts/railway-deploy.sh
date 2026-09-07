#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/common.sh
source "${ROOT_DIR}/scripts/lib/common.sh"

ENV_NAME="${1:-}"
WEB_SERVICE="${RAILWAY_WEB_SERVICE:-web}"
WORKER_SERVICE="${RAILWAY_WORKER_SERVICE:-worker}"
SKIP_VALIDATION="${SKIP_VALIDATION:-no}"

validate_environment "${ENV_NAME}"
ensure_railway_cli
select_railway_environment "${ENV_NAME}" || error "Railway environment '${ENV_NAME}' is not available."

if [[ "${ENV_NAME}" == "production" ]]; then
  read -r -p "Deploy to PRODUCTION? Type 'production' to continue: " confirmation
  [[ "${confirmation}" == "production" ]] || error "Deployment cancelled."
fi

run_validation() {
  log "Running repository validation..."
  cd "${ROOT_DIR}"
  npm ci
  npm run lint
  npm run typecheck
  npm test
  npm run build
  log "Validation passed."
}

if [[ "${SKIP_VALIDATION}" != "yes" ]]; then
  run_validation
else
  warn "Skipping local validation because SKIP_VALIDATION=yes"
fi

deploy_service() {
  local service_name="$1"
  if ! service_exists "${service_name}"; then
    warn "Service '${service_name}' not found. Skipping deploy."
    return 1
  fi

  log "Deploying service: ${service_name}"
  railway up --service "${service_name}" --detach
}

web_deploy_status="skipped"
worker_deploy_status="skipped"

if deploy_service "${WEB_SERVICE}"; then
  web_deploy_status="deployed"
fi

if deploy_service "${WORKER_SERVICE}"; then
  worker_deploy_status="deployed"
fi

log "Waiting for Railway deployments to settle..."
sleep 15

migration_result="not-run"
if [[ -x "${ROOT_DIR}/scripts/railway-migrate.sh" ]]; then
  migration_result="run-separately"
fi

health_result="unknown"
if [[ -x "${ROOT_DIR}/scripts/railway-healthcheck.sh" ]]; then
  if "${ROOT_DIR}/scripts/railway-healthcheck.sh" "${ENV_NAME}"; then
    health_result="pass"
  else
    health_result="fail"
  fi
fi

cat <<EOF

Deployment summary
------------------
Environment: ${ENV_NAME}
Web service: ${web_deploy_status} (${WEB_SERVICE})
Worker service: ${worker_deploy_status} (${WORKER_SERVICE})
Migration: ${migration_result} (use ./scripts/railway-migrate.sh ${ENV_NAME} before or after deploy as needed)
Health check: ${health_result}

Manual setup reminders:
  - Verify PostgreSQL and Redis plugins are attached
  - Verify object storage and email provider credentials
  - Configure custom domain and HTTPS in Railway
  - Confirm staging email safety settings before testing notifications

EOF

if [[ "${health_result}" == "fail" ]]; then
  exit 1
fi
