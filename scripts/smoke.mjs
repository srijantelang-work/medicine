#!/usr/bin/env node

/**
 * Nabd Smoke Test Script
 *
 * Verifies:
 * 1. Database connectivity to PostgreSQL
 * 2. Schema tables (users, waitlist_entries)
 * 3. HTTP endpoint responses (if dev server is up at http://localhost:3000)
 */

import { Pool } from "pg";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://nabd:nabd_local@localhost:5433/nabd";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

let failures = 0;

function logPass(msg) {
  console.log(`\x1b[32m✔ PASS:\x1b[0m ${msg}`);
}

function logFail(msg, err) {
  failures++;
  console.error(`\x1b[31m✖ FAIL:\x1b[0m ${msg}`);
  if (err) console.error(`  \x1b[33mError details:\x1b[0m`, err.message || err);
}

function logInfo(msg) {
  console.log(`\x1b[36mℹ INFO:\x1b[0m ${msg}`);
}

async function runDatabaseSmokeCheck() {
  logInfo(`Connecting to database at ${DATABASE_URL.replace(/:[^:@]+@/, ":***@")}...`);
  const pool = new Pool({ connectionString: DATABASE_URL, connectionTimeoutMillis: 3000 });

  try {
    const res = await pool.query("SELECT current_database(), version();");
    logPass(`Connected to database "${res.rows[0].current_database}"`);

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'waitlist_entries');
    `);

    const tableNames = tables.rows.map((r) => r.table_name);
    if (tableNames.includes("waitlist_entries")) {
      logPass(`Table 'waitlist_entries' exists`);
    } else {
      logFail(`Table 'waitlist_entries' not found (run 'npm run db:migrate' or 'npx drizzle-kit push')`);
    }

    if (tableNames.includes("users")) {
      logPass(`Table 'users' exists`);
    } else {
      logFail(`Table 'users' not found (run 'npm run db:migrate' or 'npx drizzle-kit push')`);
    }
  } catch (err) {
    logFail(`Database connection failed on port ${DATABASE_URL.split(":").pop()?.split("/")[0]}`, err);
  } finally {
    await pool.end();
  }
}

async function runHttpSmokeCheck() {
  logInfo(`Checking HTTP endpoints at ${BASE_URL}...`);

  try {
    // Check home page EN
    const enRes = await fetch(`${BASE_URL}/en`, { redirect: "manual" });
    if (enRes.status === 200) {
      logPass(`GET /en -> HTTP 200 OK`);
    } else {
      logFail(`GET /en returned HTTP ${enRes.status}`);
    }

    // Check home page AR
    const arRes = await fetch(`${BASE_URL}/ar`, { redirect: "manual" });
    if (arRes.status === 200) {
      logPass(`GET /ar -> HTTP 200 OK`);
    } else {
      logFail(`GET /ar returned HTTP ${arRes.status}`);
    }

    // Check account page unauthenticated redirect
    const accRes = await fetch(`${BASE_URL}/en/account`, { redirect: "manual" });
    if (accRes.status === 307 || accRes.status === 302 || accRes.status === 303) {
      logPass(`GET /en/account unauthenticated -> HTTP ${accRes.status} Redirect to sign-in`);
    } else {
      logFail(`GET /en/account expected redirect, got HTTP ${accRes.status}`);
    }

    // Check user API unauthenticated unauthorized
    const userRes = await fetch(`${BASE_URL}/api/user`);
    if (userRes.status === 401) {
      logPass(`GET /api/user unauthenticated -> HTTP 401 Unauthorized`);
    } else {
      logFail(`GET /api/user expected 401, got HTTP ${userRes.status}`);
    }

    // Test waitlist API submission
    const waitlistRes = await fetch(`${BASE_URL}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Smoke Test Clinician",
        email: "smoke_test@nabd.internal",
        locale: "en",
      }),
    });

    if (waitlistRes.status === 200 || waitlistRes.status === 201) {
      const body = await waitlistRes.json();
      logPass(`POST /api/waitlist -> HTTP ${waitlistRes.status} (${body.status})`);
    } else {
      logFail(`POST /api/waitlist returned HTTP ${waitlistRes.status}`);
    }
  } catch {
    logInfo(`Web server not running at ${BASE_URL} (start with 'npm run dev' to verify HTTP endpoints)`);
  }
}

async function main() {
  console.log("\n🏥 Starting Nabd Smoke Tests...\n");
  await runDatabaseSmokeCheck();
  await runHttpSmokeCheck();
  console.log("\n🏁 Smoke check completed.\n");

  if (failures > 0) {
    process.exit(1);
  }
}

main();
