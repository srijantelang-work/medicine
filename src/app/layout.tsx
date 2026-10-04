import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { inter, ibmPlexArabic } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabd — AI-Powered Patient Intake",
  description:
    "Nabd turns patient intake conversations into structured, clinician-ready summaries before the visit.",
};

/**
 * Root Layout:
 * Dynamically resolves `locale` and `dir` ("rtl" for Arabic, "ltr" for English)
 * on the top-level <html> element for genuine bidirectional browser layout.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
