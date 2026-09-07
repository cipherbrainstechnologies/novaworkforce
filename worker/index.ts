import { Worker, Queue, type Job } from 'bullmq'
import { getRedisConnection, pingRedis, closeRedisConnection } from '../lib/queue/redis'
import { QUEUE_NAMES } from '../lib/queue/names'
import { safeLog } from '../lib/log-redaction'

const workers: Worker[] = []
let shuttingDown = false
let processorsRegistered = false

function envInt(name: string, fallback: number): number {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

const workerConcurrency = envInt('WORKER_CONCURRENCY', 3)
const queueAttempts = envInt('QUEUE_ATTEMPTS', 3)
const queueBackoffMs = envInt('QUEUE_BACKOFF_MS', 30000)

async function handleStatementParse(job: Job): Promise<void> {
  safeLog('[worker] statement-parse job received', { jobId: job.id, idempotencyKey: job.opts.jobId })
}

async function handlePdfGenerate(job: Job): Promise<void> {
  safeLog('[worker] pdf-generate job received', { jobId: job.id, idempotencyKey: job.opts.jobId })
}

async function handleEmailDelivery(job: Job): Promise<void> {
  safeLog('[worker] email-delivery job received', { jobId: job.id, idempotencyKey: job.opts.jobId })
}

function registerWorkers(redis: NonNullable<ReturnType<typeof getRedisConnection>>): void {
  const defaultJobOptions = {
    attempts: queueAttempts,
    backoff: { type: 'exponential' as const, delay: queueBackoffMs },
    removeOnComplete: { age: 86400, count: 1000 },
    removeOnFail: { age: 604800, count: 5000 },
  }

  const handlers: Array<{ name: string; handler: (job: Job) => Promise<void> }> = [
    { name: QUEUE_NAMES.STATEMENT_PARSE, handler: handleStatementParse },
    { name: QUEUE_NAMES.PDF_GENERATE, handler: handlePdfGenerate },
    { name: QUEUE_NAMES.EMAIL_DELIVERY, handler: handleEmailDelivery },
  ]

  for (const { name, handler } of handlers) {
    new Queue(name, { connection: redis, defaultJobOptions })

    const worker = new Worker(name, handler, {
      connection: redis,
      concurrency: workerConcurrency,
    })

    worker.on('failed', (job, error) => {
      console.error(`[worker] job failed on ${name}:`, job?.id, error.message)
    })

    workers.push(worker)
  }

  processorsRegistered = true
}

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  console.log(`[worker] received ${signal}, shutting down gracefully...`)

  await Promise.all(workers.map((worker) => worker.close()))
  await closeRedisConnection()

  console.log('[worker] shutdown complete')
  process.exit(0)
}

async function startHealthServer(): Promise<void> {
  const port = Number(process.env.WORKER_HEALTH_PORT ?? 8081)

  const http = await import('http')
  const server = http.createServer(async (_req, res) => {
    const redisReady = await pingRedis()

    const body = {
      status: redisReady && processorsRegistered ? 'ok' : 'starting',
      service: 'worker',
      timestamp: new Date().toISOString(),
      checks: {
        redis: { ready: redisReady },
        processors: { registered: processorsRegistered },
      },
    }

    res.writeHead(redisReady && processorsRegistered ? 200 : 503, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(body))
  })

  server.listen(port, '0.0.0.0', () => {
    console.log(`[worker] health endpoint listening on :${port}`)
  })
}

async function main(): Promise<void> {
  if (!process.env.REDIS_URL) {
    console.error('[worker] REDIS_URL is required')
    process.exit(1)
  }

  const redis = getRedisConnection()
  if (!redis) {
    console.error('[worker] failed to initialize Redis connection')
    process.exit(1)
  }

  registerWorkers(redis)
  await startHealthServer()

  console.log('[worker] BullMQ processors registered')
  console.log(`[worker] concurrency=${workerConcurrency} attempts=${queueAttempts} backoffMs=${queueBackoffMs}`)

  process.on('SIGTERM', () => void shutdown('SIGTERM'))
  process.on('SIGINT', () => void shutdown('SIGINT'))
}

main().catch((error) => {
  console.error('[worker] fatal error:', error instanceof Error ? error.message : error)
  process.exit(1)
})
