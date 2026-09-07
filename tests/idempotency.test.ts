import { describe, expect, it } from 'vitest'
import {
  emailDeliveryJobId,
  pdfIssueJobId,
  statementParseJobId,
} from '../lib/queue/idempotency'

describe('idempotency keys', () => {
  it('builds stable statement parse keys', () => {
    expect(statementParseJobId('abc123')).toBe('statement-parse:abc123')
  })

  it('builds stable pdf issue keys', () => {
    expect(pdfIssueJobId('co1', 'emp1', '2025-08', 2)).toBe(
      'pdf-issue:co1:emp1:2025-08:v2'
    )
  })

  it('normalizes email delivery keys', () => {
    expect(emailDeliveryJobId('p1', 1, ' User@Example.com ')).toBe(
      'email:p1:v1:user@example.com'
    )
  })
})
