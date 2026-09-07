#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/common.sh
source "${ROOT_DIR}/scripts/lib/common.sh"

ENV_NAME="${1:-}"
WEB_SERVICE="${RAILWAY_WEB_SERVICE:-web}"
WORKER_SERVICE="${RAILWAY_WORKER_SERVICE:-worker}"
SHOW_VALUES="${SHOW_GENERATED_SECRETS:-no}"

validate_environment "${ENV_NAME}"
ensure_railway_cli
select_railway_environment "${ENV_NAME}" || error "Select or create Railway environment '${ENV_NAME}' first."

ENV_FILE="$(env_file_for "${ENV_NAME}")"
log "Using local env file (gitignored): ${ENV_FILE}"

REQUIRED_VARS=(
  NODE_ENV
  APP_URL
  NEXT_PUBLIC_APP_URL
  AUTH_SECRET
  SESSION_ENCRYPTION_KEY
  OTP_PEPPER
  COOKIE_DOMAIN
  DATABASE_URL
  DIRECT_URL
  REDIS_URL
  S3_ENDPOINT
  S3_REGION
  S3_BUCKET
  S3_ACCESS_KEY_ID
  S3_SECRET_ACCESS_KEY
  S3_PUBLIC_BASE_URL
  EMAIL_PROVIDER
  EMAIL_API_KEY
  EMAIL_FROM
  EMAIL_REPLY_TO
  PDF_ENCRYPTION_MASTER_KEY
  WORKER_CONCURRENCY
  QUEUE_ATTEMPTS
  QUEUE_BACKOFF_MS
  PDF_JOB_TIMEOUT_MS
  EMAIL_JOB_TIMEOUT_MS
  LOG_LEVEL
)

OPTIONAL_VARS=(
  PDF_SIGNING_PRIVATE_KEY
  PDF_SIGNING_CERTIFICATE
  SENTRY_DSN
)

AUTO_GENERATED_VARS=(
  AUTH_SECRET
  SESSION_ENCRYPTION_KEY
  OTP_PEPPER
  PDF_ENCRYPTION_MASTER_KEY
)

DEFAULTS=(
  "NODE_ENV=production"
  "S3_REGION=auto"
  "WORKER_CONCURRENCY=3"
  "QUEUE_ATTEMPTS=3"
  "QUEUE_BACKOFF_MS=30000"
  "PDF_JOB_TIMEOUT_MS=120000"
  "EMAIL_JOB_TIMEOUT_MS=30000"
  "LOG_LEVEL=info"
  "WORKER_HEALTH_PORT=8081"
)

for default_pair in "${DEFAULTS[@]}"; do
  key="${default_pair%%=*}"
  value="${default_pair#*=}"
  if [[ -z "$(get_env_value "${ENV_FILE}" "${key}")" ]]; then
    set_local_env_value "${ENV_FILE}" "${key}" "${value}"
  fi
done

for key in "${AUTO_GENERATED_VARS[@]}"; do
  if [[ -z "$(get_env_value "${ENV_FILE}" "${key}")" ]]; then
    generated="$(generate_secret)"
    set_local_env_value "${ENV_FILE}" "${key}" "${generated}"
    log "Generated missing secret: ${key}"
    if [[ "${SHOW_VALUES}" == "yes" ]]; then
      warn "Generated value for ${key} written only to ${ENV_FILE}"
    fi
  fi
done

prompt_if_missing() {
  local key="$1"
  local current
  current="$(get_env_value "${ENV_FILE}" "${key}")"
  if [[ -n "${current}" ]]; then
    return 0
  fi

  read -r -s -p "Enter value for ${key} (input hidden): " entered
  echo
  [[ -n "${entered}" ]] || return 1
  set_local_env_value "${ENV_FILE}" "${key}" "${entered}"
}

MANUAL_REQUIRED=(
  APP_URL
  NEXT_PUBLIC_APP_URL
  COOKIE_DOMAIN
  S3_ENDPOINT
  S3_BUCKET
  S3_ACCESS_KEY_ID
  S3_SECRET_ACCESS_KEY
  S3_PUBLIC_BASE_URL
  EMAIL_PROVIDER
  EMAIL_API_KEY
  EMAIL_FROM
  EMAIL_REPLY_TO
)

for key in "${MANUAL_REQUIRED[@]}"; do
  if [[ -z "$(get_env_value "${ENV_FILE}" "${key}")" ]]; then
    warn "Missing ${key}. Prompting securely..."
    prompt_if_missing "${key}" || warn "Skipped ${key}; set it in ${ENV_FILE} before deploy."
  fi
done

if [[ -z "$(get_env_value "${ENV_FILE}" "DATABASE_URL")" ]]; then
  set_local_env_value "${ENV_FILE}" "DATABASE_URL" '${{Postgres.DATABASE_URL}}'
  log "Set DATABASE_URL to Railway Postgres service reference."
fi

if [[ -z "$(get_env_value "${ENV_FILE}" "DIRECT_URL")" ]]; then
  set_local_env_value "${ENV_FILE}" "DIRECT_URL" '${{Postgres.DATABASE_URL}}'
  log "Set DIRECT_URL to Railway Postgres service reference."
fi

if [[ -z "$(get_env_value "${ENV_FILE}" "REDIS_URL")" ]]; then
  set_local_env_value "${ENV_FILE}" "REDIS_URL" '${{Redis.REDIS_URL}}'
  log "Set REDIS_URL to Railway Redis service reference."
fi

SHARED_VARS=(
  NODE_ENV APP_URL NEXT_PUBLIC_APP_URL AUTH_SECRET SESSION_ENCRYPTION_KEY OTP_PEPPER COOKIE_DOMAIN
  DATABASE_URL DIRECT_URL REDIS_URL
  S3_ENDPOINT S3_REGION S3_BUCKET S3_ACCESS_KEY_ID S3_SECRET_ACCESS_KEY S3_PUBLIC_BASE_URL
  EMAIL_PROVIDER EMAIL_API_KEY EMAIL_FROM EMAIL_REPLY_TO
  PDF_SIGNING_PRIVATE_KEY PDF_SIGNING_CERTIFICATE PDF_ENCRYPTION_MASTER_KEY
  WORKER_CONCURRENCY QUEUE_ATTEMPTS QUEUE_BACKOFF_MS PDF_JOB_TIMEOUT_MS EMAIL_JOB_TIMEOUT_MS
  LOG_LEVEL SENTRY_DSN
)

WEB_ONLY_VARS=(NEXT_PUBLIC_APP_URL)
WORKER_ONLY_VARS=(WORKER_HEALTH_PORT)

set_service_variables() {
  local service_name="$1"
  shift
  local -a keys=("$@")
  local key value

  if ! service_exists "${service_name}"; then
    warn "Skipping service '${service_name}' (not found)."
    return 0
  fi

  railway service "${service_name}" >/dev/null
  for key in "${keys[@]}"; do
    value="$(get_env_value "${ENV_FILE}" "${key}")"
    if [[ -n "${value}" ]]; then
      set_railway_variable "${service_name}" "${key}" "${value}"
      log "Set ${key} on ${service_name}"
    fi
  done
}

set_service_variables "${WEB_SERVICE}" "${SHARED_VARS[@]}" "${WEB_ONLY_VARS[@]}"
set_service_variables "${WORKER_SERVICE}" "${SHARED_VARS[@]}" "${WORKER_ONLY_VARS[@]}"

missing=()
for key in "${REQUIRED_VARS[@]}"; do
  if [[ -z "$(get_env_value "${ENV_FILE}" "${key}")" ]]; then
    missing+=("${key}")
  fi
done

log "Variable names configured in Railway (values not shown):"
print_variable_names_only "${SHARED_VARS[@]}"

if ((${#missing[@]} > 0)); then
  warn "Missing variables checklist:"
  print_variable_names_only "${missing[@]}"
  exit 1
fi

log "Variable setup complete for environment: ${ENV_NAME}"
