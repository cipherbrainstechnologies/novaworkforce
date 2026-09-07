import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.LOG_LEVEL === 'debug' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export async function pingDatabase(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}
