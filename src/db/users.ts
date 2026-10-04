import { eq } from "drizzle-orm";
import { db } from "./index";
import { users, type User } from "./schema";

/**
 * Fetch a user by their Clerk ID.
 * Returns null if no matching row exists.
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const [row] = await db.select().from(users).where(eq(users.clerkId, clerkId));
  return row ?? null;
}

/**
 * Lazy upsert for Clerk-authenticated users (Read-First & Corruption-Safe):
 *
 * 1. Checks if the user already exists in Postgres.
 * 2. If existing and the incoming email is either unchanged or a fallback,
 *    returns the cached row with ZERO write queries.
 * 3. If existing and a new valid email is provided, updates the record.
 * 4. On first visit, performs an atomic PostgreSQL ON CONFLICT INSERT.
 */
export async function getOrSyncUser(clerkId: string, email?: string | null): Promise<User> {
  const existing = await getUserByClerkId(clerkId);

  if (existing) {
    // If no valid email provided or unchanged, return immediately
    if (!email || email === "unknown@example.com" || existing.email === email) {
      return existing;
    }

    // Email was updated to a valid new address in Clerk
    const [updated] = await db
      .update(users)
      .set({ email })
      .where(eq(users.clerkId, clerkId))
      .returning();

    return updated ?? existing;
  }

  // First authenticated request: insert into users table
  const finalEmail = email && email.trim().length > 0 ? email : "unknown@example.com";
  const [row] = await db
    .insert(users)
    .values({ clerkId, email: finalEmail })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: { email: finalEmail },
    })
    .returning();

  return row;
}

/**
 * Backwards-compatible alias for getOrSyncUser.
 */
export async function upsertUser(clerkId: string, email: string): Promise<User> {
  return getOrSyncUser(clerkId, email);
}

