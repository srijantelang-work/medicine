import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Locale-scoped layout:
 * - Validates locale against supported routing list
 * - Registers request locale for static rendering
 * - Passes loaded messages to NextIntlClientProvider
 * - Configures ClerkProvider with Arabic localization (`arSA`) when locale is "ar"
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load message dictionary for the resolved locale
  const messages = await getMessages();

  return (
    <ClerkProvider
      localization={locale === "ar" ? arSA : undefined}
      signInUrl={`/${locale}/sign-in`}
      signUpUrl={`/${locale}/sign-up`}
      afterSignOutUrl={`/${locale}`}
    >
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
