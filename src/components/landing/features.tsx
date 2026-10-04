import { useTranslations } from "next-intl";
import { ArrowForwardIcon } from "@/components/directional-icon";
import { AnchorLink } from "@/components/anchor-link";

interface FeaturesProps {
  locale?: string;
}

export function Features({ locale = "en" }: FeaturesProps) {
  const tFeatures = useTranslations("features");

  const cards = [
    {
      key: "intake",
      tag: tFeatures("intake.tag"),
      title: tFeatures("intake.title"),
      description: tFeatures("intake.description"),
      steppedClass: "lg:translate-y-14",
      glowColor: "from-coral-500/20 to-rose-500/20",
      iconBg: "from-coral-500 to-rose-600 shadow-coral-500/30",
      // Stethoscope — represents patient intake & clinical conversation
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-white"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      ),
    },
    {
      key: "summaries",
      tag: tFeatures("summaries.tag"),
      title: tFeatures("summaries.title"),
      description: tFeatures("summaries.description"),
      steppedClass: "lg:translate-y-7",
      glowColor: "from-violet-500/20 to-indigo-500/20",
      iconBg: "from-violet-600 to-indigo-600 shadow-violet-500/30",
      // Medical clipboard — represents SOAP-structured clinical briefs
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-white"
        >
          <rect width="14" height="18" x="5" y="4" rx="2" />
          <path d="M9 2h6a1 1 0 0 1 1 1v1H8V3a1 1 0 0 1 1-1z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      ),
    },
    {
      key: "security",
      tag: tFeatures("security.tag"),
      title: tFeatures("security.title"),
      description: tFeatures("security.description"),
      steppedClass: "lg:translate-y-0",
      glowColor: "from-teal-500/20 to-cyan-500/20",
      iconBg: "from-teal-600 to-cyan-600 shadow-teal-500/30",
      // Shield with lock — represents encryption, privacy, and compliance
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-white"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <rect width="6" height="5" x="9" y="11" rx="1" />
          <path d="M10 11V9a2 2 0 1 1 4 0v2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="relative py-20 sm:py-28 bg-sand-50/50 border-t border-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Top Header Block (Matches Reference Layout) ─── */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            <span className="text-coral-500 font-bold">⚡</span>
            <span>{tFeatures("badgePill")}</span>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
            {tFeatures("headlinePrefix")}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-coral-600 bg-clip-text text-transparent">
              {tFeatures("headlineHighlight")}
            </span>
            .
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-2xl mx-auto">
            {tFeatures("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <AnchorLink
              locale={locale}
              targetId="waitlist"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-xs sm:text-sm font-bold text-background shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{tFeatures("ctaTry")}</span>
              <ArrowForwardIcon className="h-3.5 w-3.5" />
            </AnchorLink>

            <AnchorLink
              locale={locale}
              targetId="how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-xs sm:text-sm font-semibold text-foreground shadow-sm hover:bg-surface-hover transition-all cursor-pointer"
            >
              <span>{tFeatures("ctaDemo")}</span>
            </AnchorLink>
          </div>
        </div>

        {/* ─── Stepped Cards Grid with Floating 3D Visuals ─── */}
        <div className="relative mt-16 lg:mt-20">
          {/* Connecting stepped line beneath the cards (visible on desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute inset-x-12 bottom-6 -z-10 h-32 rounded-3xl border-b-2 border-dashed border-border/80"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {cards.map((card) => (
              <div
                key={card.key}
                className={`group relative rounded-3xl border border-border bg-surface p-7 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between ${card.steppedClass}`}
              >
                <div>
                  {/* Top Visual: Subtle Dot-Grid Canvas with Floating 3D Icon */}
                  <div className="relative h-44 w-full rounded-2xl bg-sand-100/70 border border-border/60 overflow-hidden flex items-center justify-center mb-6">
                    {/* Radial / Dot-grid backdrop pattern */}
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)",
                        backgroundSize: "16px 16px",
                      }}
                    />

                    {/* Ambient Glow */}
                    <div
                      className={`absolute h-24 w-24 rounded-full bg-gradient-to-tr ${card.glowColor} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
                    />

                    {/* Outer Glass Layer */}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/60 bg-white/70 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      {/* Inner 3D Gradient Icon Squircle */}
                      <div
                        className={`flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br ${card.iconBg} shadow-md transition-transform duration-300 group-hover:rotate-3`}
                      >
                        {card.icon}
                      </div>
                    </div>
                  </div>

                  {/* Card Title & Content */}
                  <div className="text-center sm:text-start">
                    <span className="inline-block rounded-full bg-sand-100 px-3 py-1 text-[11px] font-semibold text-muted mb-2.5">
                      {card.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Verification Label */}
                <div className="mt-8 pt-4 border-t border-sand-200/60 flex items-center justify-between text-[11px] font-semibold text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                    {tFeatures("protocolStandard")}
                  </span>
                  <span className="font-mono text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {tFeatures("verifiedBadge")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
