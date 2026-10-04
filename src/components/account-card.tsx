"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useClerk } from "@clerk/nextjs";
import { Bdi, FormattedDate } from "@/components/mixed-direction";

/**
 * Account card component (Client Component).
 *
 * Displays the authenticated clinician's details fetched from
 * our own Postgres database — NOT directly from Clerk.
 * Includes a sign-out button powered by Clerk's `signOut()`.
 */
export function AccountCard({
  email,
  clerkId,
  createdAt,
  locale,
}: {
  email: string;
  clerkId: string;
  createdAt: string;
  locale: string;
}) {
  const t = useTranslations("account");
  const tCommon = useTranslations("common");
  const { signOut } = useClerk();

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-surface/60 p-8 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="mb-8 text-center">
        {/* Avatar circle with initials */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-600 text-2xl font-bold text-white shadow-lg">
          {email.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
      </div>

      {/* Info rows */}
      <div className="space-y-5">
        <InfoRow
          label={t("emailLabel")}
          value={<Bdi>{email}</Bdi>}
        />
        <InfoRow
          label={t("clerkIdLabel")}
          value={<Bdi>{clerkId}</Bdi>}
          mono
        />
        <InfoRow
          label={t("dateLabel")}
          value={
            <FormattedDate
              date={createdAt}
              locale={locale}
              options={{ dateStyle: "long", timeStyle: "short" }}
            />
          }
        />
        <InfoRow label={t("statusLabel")} value={t("statusActive")} badge />
      </div>

      {/* Sync notice */}
      <div className="mt-6 rounded-lg bg-teal-50 px-4 py-3 text-xs text-teal-800 dark:bg-teal-950/30 dark:text-teal-300">
        <span className="me-1.5 inline-block">🔄</span>
        {t("syncNotice")}
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ redirectUrl: `/${locale}` })}
        className="mt-6 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-surface-hover active:scale-[0.98] transition-all cursor-pointer"
        id="account-sign-out"
      >
        {tCommon("signOut")}
      </button>
    </div>
  );
}

/** Single data row within the account card. */
function InfoRow({
  label,
  value,
  mono,
  badge,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  badge?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {badge ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          {value}
        </span>
      ) : (
        <span
          className={`text-sm text-foreground ${mono ? "font-mono text-xs break-all" : ""}`}
        >
          {value}
        </span>
      )}
    </div>
  );
}

