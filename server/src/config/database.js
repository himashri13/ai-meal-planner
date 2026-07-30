import { PrismaClient } from '@prisma/client';
import config from './env.js';

/**
 * Singleton database connection via Prisma
 * Prevents multiple connections from being created during hot-reloads in development mode.
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: config.env === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (config.env !== 'production') globalForPrisma.prisma = prisma;
