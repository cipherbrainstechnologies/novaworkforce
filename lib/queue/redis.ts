import Redis from 'ioredis'

let sharedRedis: Redis | null = null

function parseRedisUrl(redisUrl: string): { url: string; tls: boolean } {
  const url = new URL(redisUrl)
  const tls = url.protocol === 'rediss:'
  return { url: redisUrl, tls }
}

export function getRedisConnection(): Redis | null {
  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    return null
  }

  if (sharedRedis) {
    return sharedRedis
  }

  const { tls } = parseRedisUrl(redisUrl)

  sharedRedis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    ...(tls ? { tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' } } : {}),
  })

  sharedRedis.on('error', (error) => {
    console.error('[redis] connection error:', error.message)
  })

  return sharedRedis
}

export async function pingRedis(): Promise<boolean> {
  const redis = getRedisConnection()
  if (!redis) {
    return false
  }

  try {
    const result = await redis.ping()
    return result === 'PONG'
  } catch {
    return false
  }
}

export async function closeRedisConnection(): Promise<void> {
  if (sharedRedis) {
    await sharedRedis.quit()
    sharedRedis = null
  }
}
