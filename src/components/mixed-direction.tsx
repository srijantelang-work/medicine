import React from "react";
import { formatDate } from "@/lib/format";

/**
 * Bi-Directional Isolation (<bdi>) wrapper for mixed-direction content
 * such as email addresses, IDs, phone numbers, and URLs.
 *
 * In Arabic (RTL) mode, plain text containing `@`, `.`, or numbers often
 * causes punctuation to jump to the wrong side of the string. Wrapping in
 * `<bdi dir="ltr">` guarantees proper left-to-right rendering regardless
 * of the surrounding text direction.
 */
export function Bdi({
  children,
  className = "",
  forceLtr = true,
}: {
  children: React.ReactNode;
  className?: string;
  forceLtr?: boolean;
}) {
  return (
    <bdi
      dir={forceLtr ? "ltr" : "auto"}
      className={`inline-block unicode-bidi-isolate ${className}`}
    >
      {children}
    </bdi>
  );
}

/**
 * Renders a localized date formatted with Intl.DateTimeFormat and
 * wrapped in a <time> tag with <bdi> to preserve reading order.
 */
export function FormattedDate({
  date,
  locale = "en",
  options,
  className = "",
}: {
  date: Date | string | number;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}) {
  const formatted = formatDate(date, locale, options);
  const iso = new Date(date).toISOString();

  return (
    <time dateTime={iso} className={className}>
      <bdi>{formatted}</bdi>
    </time>
  );
}
