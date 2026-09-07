const SENSITIVE_PATTERNS: RegExp[] = [
  /password/i,
  /otp/i,
  /secret/i,
  /token/i,
  /authorization/i,
  /pan/i,
  /account/i,
  /salary/i,
  /api[_-]?key/i,
]

export function redactSensitiveData(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(redactSensitiveData)
  }

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(key))) {
        result[key] = '[REDACTED]'
      } else {
        result[key] = redactSensitiveData(nestedValue)
      }
    }
    return result
  }

  return value
}

export function safeLog(message: string, payload?: Record<string, unknown>): void {
  if (!payload) {
    console.log(message)
    return
  }

  console.log(message, redactSensitiveData(payload))
}
