import { createHash } from 'crypto'

export function statementParseJobId(checksum: string): string {
  return `statement-parse:${checksum}`
}

export function pdfIssueJobId(
  companyId: string,
  employeeId: string,
  payrollMonth: string,
  payslipVersion: number
): string {
  return `pdf-issue:${companyId}:${employeeId}:${payrollMonth}:v${payslipVersion}`
}

export function emailDeliveryJobId(
  payslipId: string,
  version: number,
  recipientEmail: string
): string {
  const normalizedEmail = recipientEmail.trim().toLowerCase()
  return `email:${payslipId}:v${version}:${normalizedEmail}`
}

export function checksumBuffer(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex')
}
