#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/common.sh
source "${ROOT_DIR}/scripts/lib/common.sh"

ENV_NAME="${1:-}"
RUN_SEED="${2:-}"
WEB_SERVICE="${RAILWAY_WEB_SERVICE:-web}"

validate_environment "${ENV_NAME}"
ensure_railway_cli
select_railway_environment "${ENV_NAME}" || error "Railway environment '${ENV_NAME}' is not available."

if [[ "${ENV_NAME}" == "production" ]]; then
  read -r -p "Run migrations on PRODUCTION? Type 'production' to continue: " confirmation
  [[ "${confirmation}" == "production" ]] || error "Migration cancelled."
fi

log "Running Prisma migrate deploy in Railway environment '${ENV_NAME}' (service: ${WEB_SERVICE})"

if service_exists "${WEB_SERVICE}"; then
  railway service "${WEB_SERVICE}" >/dev/null
else
  warn "Service '${WEB_SERVICE}' not found; using current linked service context."
fi

if [[ "${RUN_SEED}" == "--seed" ]]; then
  log "Seed flag detected. Running safe seed command."
  railway run npm run db:seed
fi

set +e
migrate_output="$(railway run npm run db:migrate:deploy 2>&1)"
migrate_status=$?
set -e

if [[ ${migrate_status} -ne 0 ]]; then
  error "Migration failed:\n${migrate_output}"
fi

log "Migration completed successfully."
printf '%s\n' "${migrate_output}" | sed -E 's/(postgres(ql)?:\/\/)[^@]+@/\1[REDACTED]@/g'
