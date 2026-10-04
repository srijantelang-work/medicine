import { useTranslations } from "next-intl";
import { ArrowForwardIcon, ChevronForwardIcon } from "@/components/directional-icon";
import { AnchorLink } from "@/components/anchor-link";
import { LiveSimulation } from "./live-simulation";

export function Hero({ locale }: { locale: string }) {
  const tHero = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-12rem)] aspect-1155/678 w-[40rem] -translate-x-1/2 rotate-[25deg] bg-gradient-to-tr from-teal-400 via-teal-300 to-coral-300 opacity-25 sm:left-[calc(50%-28rem)] sm:w-[72rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Group */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-800 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600" />
            </span>
            <span>{tHero("badge")}</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]">
            {tHero("title")}{" "}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 bg-clip-text text-transparent">
              {tHero("titleHighlight")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-muted sm:text-xl leading-relaxed">
            {tHero("subtitle")}
          </p>

          {/* Action CTAs with Directional Mirroring */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AnchorLink
              locale={locale}
              targetId="waitlist"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-teal-700/20 hover:bg-teal-700 active:bg-teal-800 transition-all hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer"
              id="hero-cta-waitlist"
            >
              <span>{tHero("ctaWaitlist")}</span>
              <ArrowForwardIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </AnchorLink>

            <AnchorLink
              locale={locale}
              targetId="how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm hover:bg-surface-hover transition-all focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer"
              id="hero-cta-how-it-works"
            >
              <span>{tHero("ctaDemo")}</span>
              <ChevronForwardIcon className="h-4 w-4 text-muted" />
            </AnchorLink>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-2xl border border-border bg-surface/70 backdrop-blur-md p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {tHero("statAccuracy")}
              </span>
              <span className="mt-1 text-xs font-medium text-muted">
                {tHero("statAccuracyLabel")}
              </span>
            </div>
            <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-s border-border pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                {tHero("statTime")}
              </span>
              <span className="mt-1 text-xs font-medium text-muted">
                {tHero("statTimeLabel")}
              </span>
            </div>
            <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-s border-border pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {tHero("statBilingual")}
              </span>
              <span className="mt-1 text-xs font-medium text-muted">
                {tHero("statBilingualLabel")}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Interactive Live Clinical Intake Simulation Window ─── */}
        <div className="mt-16 lg:mt-20">
          <LiveSimulation locale={locale} />
        </div>
      </div>
    </section>
  );
}
