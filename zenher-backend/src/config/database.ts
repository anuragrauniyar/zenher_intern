import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';

// 1. Force the environment variables to load immediately
config();

const connectionString = process.env.DATABASE_URL;

// 2. Prevent silent fallback to localhost
if (!connectionString) {
  throw new Error("CRITICAL: DATABASE_URL is undefined. Check your .env file.");
}

// 3. Connect to Neon with SSL enforced
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });