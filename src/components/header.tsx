"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Show, UserButton } from "@clerk/nextjs";
import { NabdLogo } from "./nabd-logo";
import { LanguageToggle } from "./language-toggle";
import { AnchorLink } from "./anchor-link";

/**
 * Site-wide header with logo, navigation links, language toggle, and auth buttons.
 * Uses logical CSS utilities (ms-, me-, ps-, pe-, text-start, start-0) for
 * automatic RTL mirroring — no `dir`-specific overrides needed.
 *
 * Auth-aware (Clerk Core 3):
 * - Signed out → shows Sign In / Sign Up links via `<Show when="signed-out">`
 * - Signed in  → shows "My Account" link + Clerk UserButton avatar via `<Show when="signed-in">`
 */
export function Header({ locale }: { locale: string }) {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + brand */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 text-primary hover:opacity-85 focus-visible:rounded-lg"
          id="header-logo"
        >
          <NabdLogo className="text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            {tCommon("brand")}
          </span>
        </Link>

        {/* Center / Navigation items (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <AnchorLink
            locale={locale}
            targetId="features"
            className="hover:text-foreground transition-colors cursor-pointer"
            id="nav-link-features"
          >
            {tNav("features")}
          </AnchorLink>
          <AnchorLink
            locale={locale}
            targetId="how-it-works"
            className="hover:text-foreground transition-colors cursor-pointer"
            id="nav-link-how-it-works"
          >
            {tNav("howItWorks")}
          </AnchorLink>
          <AnchorLink
            locale={locale}
            targetId="waitlist"
            className="hover:text-foreground transition-colors cursor-pointer"
            id="nav-link-waitlist"
          >
            {tNav("waitlist")}
          </AnchorLink>

          {/* Show "My Account" link only when signed in */}
          <Show when="signed-in">
            <Link
              href={`/${locale}/account`}
              className="hover:text-foreground transition-colors"
            >
              {tNav("account")}
            </Link>
          </Show>
        </nav>

        {/* Action Controls: Language Toggle + Auth + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle locale={locale} />

          {/* Signed out: show Sign In / Sign Up buttons */}
          <Show when="signed-out">
            <Link
              href={`/${locale}/sign-in`}
              className="rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground hover:bg-surface-hover"
              id="header-sign-in"
            >
              {tCommon("signIn")}
            </Link>
            <Link
              href={`/${locale}/sign-up`}
              className="rounded-lg bg-primary px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary-foreground shadow-sm hover:bg-teal-700 active:bg-teal-800 transition-all"
              id="header-sign-up"
            >
              {tCommon("signUp")}
            </Link>
          </Show>

          {/* Signed in: show Clerk UserButton avatar */}
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </Show>

          {/* Mobile hamburger toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover focus-visible:outline-none"
            aria-label="Toggle navigation menu"
            id="mobile-menu-button"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-4 space-y-3 shadow-lg animate-fade-in-up">
          <AnchorLink
            locale={locale}
            targetId="features"
            onNavigate={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground hover:text-primary py-1.5 transition-colors"
          >
            {tNav("features")}
          </AnchorLink>
          <AnchorLink
            locale={locale}
            targetId="how-it-works"
            onNavigate={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground hover:text-primary py-1.5 transition-colors"
          >
            {tNav("howItWorks")}
          </AnchorLink>
          <AnchorLink
            locale={locale}
            targetId="waitlist"
            onNavigate={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-foreground hover:text-primary py-1.5 transition-colors"
          >
            {tNav("waitlist")}
          </AnchorLink>
          <Show when="signed-in">
            <Link
              href={`/${locale}/account`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-primary py-1.5 transition-colors"
            >
              {tNav("account")}
            </Link>
          </Show>
        </div>
      )}
    </header>
  );
}
