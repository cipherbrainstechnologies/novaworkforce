export const QUEUE_NAMES = {
  STATEMENT_PARSE: 'statement-parse',
  PDF_GENERATE: 'pdf-generate',
  EMAIL_DELIVERY: 'email-delivery',
  SCHEDULED_JOBS: 'scheduled-jobs',
} as const

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES]
