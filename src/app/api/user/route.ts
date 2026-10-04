import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserByClerkId, getOrSyncUser } from "@/db/users";

/**
 * GET /api/user
 *
 * Protected endpoint that performs the lazy upsert:
 * 1. Reads the Clerk session from the request
 * 2. Checks our local Postgres DB first (fast path)
 * 3. If missing, resolves email from Clerk and lazily inserts user
 * 4. Returns the DB row to the client
 */
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fast path: if user already exists in DB, return immediately
  let dbUser = await getUserByClerkId(userId);

  if (!dbUser) {
    // Fetch full Clerk user for the email
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email =
      clerkUser.emailAddresses?.find((e) => e.id === clerkUser.primaryEmailAddressId)
        ?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress ||
      "unknown@example.com";

    // Lazy insert into our own Postgres
    dbUser = await getOrSyncUser(userId, email);
  }

  return NextResponse.json({ user: dbUser });
}
