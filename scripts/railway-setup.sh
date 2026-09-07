#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/common.sh
source "${ROOT_DIR}/scripts/lib/common.sh"

WEB_SERVICE="${RAILWAY_WEB_SERVICE:-web}"
WORKER_SERVICE="${RAILWAY_WORKER_SERVICE:-worker}"

confirm_production="${CONFIRM_PRODUCTION:-}"

log "Railway setup validation"
ensure_railway_cli

if [[ -f "${ROOT_DIR}/.railway/config.json" ]] || railway status >/dev/null 2>&1; then
  log "Project link detected."
else
  warn "No Railway project link found for this directory."
  warn "Run: railway link"
  warn "Or create a project in Railway Dashboard and link this repository."
fi

for env_name in development staging production; do
  if select_railway_environment "${env_name}"; then
    log "Environment available: ${env_name}"
  else
    warn "Environment missing: ${env_name}"
  fi
done

if select_railway_environment production; then
  if [[ "${confirm_production}" != "yes" ]]; then
    warn "Production environment detected."
    warn "This script does not deploy or mutate production without CONFIRM_PRODUCTION=yes."
  fi
fi

missing_services=()
for svc in "${WEB_SERVICE}" "${WORKER_SERVICE}"; do
  if service_exists "${svc}"; then
    log "Service found: ${svc}"
  else
    missing_services+=("${svc}")
    warn "Service missing: ${svc}"
  fi
done

if ((${#missing_services[@]} > 0)); then
  cat <<EOF

Dashboard actions required:
1. Open Railway Dashboard -> your project.
2. Create services named: ${WEB_SERVICE} (web/API) and ${WORKER_SERVICE} (BullMQ worker).
3. Connect this GitHub repository to both services (same repo, different start commands).
4. Web start command: npm start
5. Worker start command: npm run worker:start
6. Add PostgreSQL plugin/service and Redis plugin/service to the project.
7. Reference DATABASE_URL/DIRECT_URL from PostgreSQL and REDIS_URL from Redis in web + worker services.

EOF
fi

log "Checking attached data services (via linked variables)..."
if railway variables 2>/dev/null | grep -q "DATABASE_URL"; then
  log "DATABASE_URL reference/variable present in current context."
else
  warn "DATABASE_URL not found in current Railway context."
fi

if railway variables 2>/dev/null | grep -q "REDIS_URL"; then
  log "REDIS_URL reference/variable present in current context."
else
  warn "REDIS_URL not found in current Railway context."
fi

cat <<EOF

Next steps:
  ./scripts/railway-set-variables.sh staging
  ./scripts/railway-migrate.sh staging
  ./scripts/railway-deploy.sh staging

Manual checklist:
  - Object storage credentials (S3-compatible)
  - Email provider API key and verified sender
  - PDF signing certificate/private key (if enabled)
  - Domain + HTTPS for APP_URL / NEXT_PUBLIC_APP_URL
  - Sentry DSN (optional)

EOF
