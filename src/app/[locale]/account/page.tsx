import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getUserByClerkId, getOrSyncUser } from "@/db/users";
import { AccountCard } from "@/components/account-card";

/**
 * Protected account page (Server Component).
 *
 * Flow:
 * 1. Check Clerk session — redirect to sign-in if unauthenticated
 * 2. Read-first user fetch: if user exists in local Postgres, return immediately
 *    without making an external Clerk API call or issuing write queries.
 * 3. If first-time user: fetch Clerk profile and lazily create row in Postgres.
 * 4. Render the account card with data from OUR database (not Clerk).
 */
export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { userId } = await auth();
  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  // Fast read-first lookup: avoid external Clerk API call & DB write if user already exists
  let dbUser = await getUserByClerkId(userId);

  if (!dbUser) {
    const clerkUser = await currentUser();
    const email =
      clerkUser?.emailAddresses?.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress ||
      clerkUser?.emailAddresses?.[0]?.emailAddress ||
      "unknown@example.com";

    dbUser = await getOrSyncUser(userId, email);
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
      <AccountCard
        email={dbUser.email}
        clerkId={dbUser.clerkId}
        createdAt={dbUser.createdAt.toISOString()}
        locale={locale}
      />
    </div>
  );
}
