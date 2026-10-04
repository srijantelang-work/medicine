import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });

  return {
    title: `${t("title")} | Nabd`,
    description: t("subtitle"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacyPolicy" });

  const sections = [
    { title: t("section1Title"), body: t("section1Body") },
    { title: t("section2Title"), body: t("section2Body") },
    { title: t("section3Title"), body: t("section3Body") },
    { title: t("section4Title"), body: t("section4Body") },
    { title: t("section5Title"), body: t("section5Body") },
    {
      title: t("section6Title"),
      body: t("section6Body"),
      isContact: true,
    },
  ];

  return (
    <div className="min-h-screen bg-sand-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${locale}`}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          id="privacy-back-home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 rtl:-scale-x-100 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 text-primary"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          <span>{t("backHome")}</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-border pb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse" />
            {t("badge")}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base text-muted sm:text-lg leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
          <p className="mt-2 text-xs font-medium text-teal-700">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Sections List */}
        <div className="mt-8 space-y-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs"
            >
              <h2 className="text-lg font-bold text-foreground sm:text-xl">
                {sec.title}
              </h2>
              <p className="mt-3 text-sm text-muted sm:text-base leading-relaxed">
                {sec.body}
              </p>
              {sec.isContact && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3.5 py-2 text-xs sm:text-sm font-medium text-teal-800 border border-teal-200">
                  <span>Email:</span>
                  <bdi className="font-semibold text-teal-900">privacy@nabd.health</bdi>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-border flex justify-start">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-800 transition-colors"
          >
            <span>{t("backHome")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
