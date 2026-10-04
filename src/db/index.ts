import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// Global pool cache for development hot reload prevention
declare global {
  var __dbPool: Pool | undefined;
}

const connectionString =
  process.env.DATABASE_URL || "postgresql://nabd:nabd_local@localhost:5433/nabd";

const pool =
  global.__dbPool ||
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbPool = pool;
}

export const db = drizzle(pool, { schema });
export { pool };
