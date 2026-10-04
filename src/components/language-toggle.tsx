"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

/**
 * Language toggle component that swaps between EN and AR while
 * preserving the current pathname and any active query parameters.
 * E.g., /en/sign-in?redirect=/account -> /ar/sign-in?redirect=/account
 */
export function LanguageToggle({ locale }: { locale: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAr = locale === "ar";
  const targetLocale = isAr ? "en" : "ar";

  // Replace leading /[locale] segment
  let targetPath = pathname;
  if (targetPath.startsWith(`/${locale}`)) {
    targetPath = targetPath.replace(`/${locale}`, `/${targetLocale}`);
  } else {
    targetPath = `/${targetLocale}${targetPath}`;
  }

  // Preserve query string if present
  const queryString = searchParams?.toString();
  const fullHref = queryString ? `${targetPath}?${queryString}` : targetPath;

  return (
    <Link
      href={fullHref}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:border-teal-500 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-teal-600 transition-all"
      id="language-toggle"
      aria-label={isAr ? "Switch language to English" : "التبديل إلى اللغة العربية"}
      title={isAr ? "Switch to English" : "التبديل إلى العربية"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5 text-primary"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.171 4.146l1.947 4.38a.75.75 0 01-1.371.61L7.06 7.75H4.438l-.687 1.386a.75.75 0 11-1.344-.666l2.336-4.709c.18-.362.691-.562 1.085-.362l.087.047a.726.726 0 01.256.3zM5.75 4.9L4.876 6.5h1.748L5.75 4.9z"
          clipRule="evenodd"
        />
        <path d="M12.75 10a.75.75 0 01.75.75v1.19l.953-.525a.75.75 0 01.724 1.313l-1.677.924 1.677.924a.75.75 0 11-.724 1.314l-.953-.525v1.19a.75.75 0 01-1.5 0v-1.19l-.953.525a.75.75 0 01-.724-1.314l1.677-.924-1.677-.924a.75.75 0 11.724-1.313l.953.525v-1.19a.75.75 0 01.75-.75z" />
        <path d="M10 1a9 9 0 110 18 9 9 0 010-18zm7.5 9a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0z" />
      </svg>
      <span className="font-bold tracking-wide">{isAr ? "English" : "العربية"}</span>
    </Link>
  );
}
