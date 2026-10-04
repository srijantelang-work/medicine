import { useTranslations } from "next-intl";
import { WaitlistForm } from "@/components/waitlist-form";

export function WaitlistSection({ locale }: { locale: string }) {
  const tWaitlist = useTranslations("waitlist");

  return (
    <section id="waitlist" className="relative py-20 sm:py-28 bg-sand-100/80 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-teal-200/80 bg-gradient-to-b from-surface via-surface to-teal-50/40 p-8 sm:p-14 shadow-xl overflow-hidden">
          {/* Subtle decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-teal-300/30 blur-3xl"
          />

          <div className="relative text-center max-w-2xl mx-auto">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold text-teal-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
              {tWaitlist("badge")}
            </span>

            {/* Title & Subtitle */}
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {tWaitlist("title")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              {tWaitlist("subtitle")}
            </p>

            {/* Live Database-Backed Waitlist Form */}
            <div className="mt-8">
              <WaitlistForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
