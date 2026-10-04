"use client";

import { useEffect } from "react";

/**
 * Synchronizes HTML `dir` and `lang` attributes on the root element
 * during Next.js client-side route transitions between EN and AR.
 */
export function DirSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
