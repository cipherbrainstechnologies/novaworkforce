import { NextResponse } from 'next/server'
import { pingDatabase } from '@/lib/db'
import { pingRedis } from '@/lib/queue/redis'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const startedAt = Date.now()

  const databaseConfigured = Boolean(process.env.DATABASE_URL)
  const redisConfigured = Boolean(process.env.REDIS_URL)

  const [database, redis] = await Promise.all([
    databaseConfigured ? pingDatabase() : Promise.resolve(null),
    redisConfigured ? pingRedis() : Promise.resolve(null),
  ])

  const databaseReady = databaseConfigured ? database === true : null
  const redisReady = redisConfigured ? redis === true : null

  const blockingIssues: string[] = []
  if (databaseConfigured && databaseReady === false) {
    blockingIssues.push('database_unavailable')
  }
  if (redisConfigured && redisReady === false) {
    blockingIssues.push('redis_unavailable')
  }

  const healthy = blockingIssues.length === 0
  const status = healthy ? 'ok' : 'degraded'

  return NextResponse.json(
    {
      status,
      service: 'web',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      checks: {
        app: true,
        database: databaseConfigured
          ? { configured: true, ready: databaseReady }
          : { configured: false, ready: null },
        redis: redisConfigured
          ? { configured: true, ready: redisReady }
          : { configured: false, ready: null },
      },
      issues: blockingIssues,
      responseTimeMs: Date.now() - startedAt,
    },
    { status: healthy ? 200 : 503 }
  )
}
