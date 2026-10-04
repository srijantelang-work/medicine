/**
 * Internationalized formatting helpers for dates, numbers, and mixed-direction strings.
 */

/**
 * Formats a date using the standard Intl.DateTimeFormat for the given locale.
 * Ensures consistent, localized date formatting on both server and client.
 */
export function formatDate(
  date: Date | string | number,
  locale: string = "en",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const parsedDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", options).format(
      parsedDate
    );
  } catch {
    return parsedDate.toLocaleDateString();
  }
}

/**
 * Formats numbers using the given locale (e.g. Western Arabic 1,234 vs Eastern Arabic ١٬٢٣٤).
 */
export function formatNumber(
  value: number,
  locale: string = "en",
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", options).format(value);
  } catch {
    return value.toLocaleString();
  }
}
