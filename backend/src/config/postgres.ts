import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Create a native PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Bind the pool to Prisma's driver adapter layer
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
