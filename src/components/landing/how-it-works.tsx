import { useTranslations } from "next-intl";
import Image from "next/image";

interface HowItWorksProps {
  locale?: string;
}

export function HowItWorks({}: HowItWorksProps = {}) {
  const tHowItWorks = useTranslations("howItWorks");

  const steps = [
    {
      num: tHowItWorks("step1.number"),
      tag: tHowItWorks("step1.tag"),
      title: tHowItWorks("step1.title"),
      description: tHowItWorks("step1.description"),
      accent: "emerald",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-emerald-700"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8" />
          <path d="M8 13h6" />
        </svg>
      ),
    },
    {
      num: tHowItWorks("step2.number"),
      tag: tHowItWorks("step2.tag"),
      title: tHowItWorks("step2.title"),
      description: tHowItWorks("step2.description"),
      accent: "sand",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-foreground"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
    },
    {
      num: tHowItWorks("step3.number"),
      tag: tHowItWorks("step3.tag"),
      title: tHowItWorks("step3.title"),
      description: tHowItWorks("step3.description"),
      accent: "sand",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-foreground"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Top Section Header ─── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {tHowItWorks("simpleSteps")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {tHowItWorks("mainHeading")}
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto">
            {tHowItWorks("subtitle")}
          </p>
        </div>

        {/* ─── 2-Column Workflow Showcase (Matches Reference Layout) ─── */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Doctor Photo with Floating Mock Workflow Card */}
          <div className="lg:col-span-5 relative">
            {/* Background decorative blob */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-teal-100/60 via-sand-100/40 to-coral-100/40 blur-2xl opacity-70"
            />

            {/* Primary Unsplash Clinician Photo */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-sand-100 shadow-xl aspect-4/5 sm:aspect-square lg:aspect-4/5">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
                alt="Clinician reviewing structured AI patient intake notes"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Mock Workflow Badge / Queue Card (Overlapping corner) */}
            <div className="absolute -bottom-6 -end-4 sm:-bottom-8 sm:-end-6 w-64 sm:w-72 rounded-2xl border border-border bg-surface/95 p-4 shadow-2xl backdrop-blur-md transition-all hover:scale-105">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                <span className="text-xs font-bold text-foreground">
                  {tHowItWorks("workflowQueue")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {tHowItWorks("liveSync")}
                </span>
              </div>

              {/* Mock Queue Items */}
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between rounded-lg bg-sand-50 p-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                      OK
                    </div>
                    <div>
                      <span className="block font-semibold text-foreground leading-none">
                        Omar K.
                      </span>
                      <span className="text-[10px] text-muted">SOAP #0841</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Ready
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-sand-50 p-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-coral-600 text-[10px] font-bold text-white">
                      SM
                    </div>
                    <div>
                      <span className="block font-semibold text-foreground leading-none">
                        Sarah M.
                      </span>
                      <span className="text-[10px] text-muted">SOAP #0842</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Ready
                  </span>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-3 pt-2 border-t border-sand-100 flex items-center justify-between text-[10px] text-muted">
                <span>Clinical Triage</span>
                <span className="font-semibold text-teal-700">100% EHR Synced</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Timeline Steps */}
          <div className="lg:col-span-7 lg:ps-6">
            <div className="relative border-s-2 border-teal-200/80 ps-8 space-y-10 my-4">
              {steps.map((step) => (
                <div key={step.num} className="relative group">
                  {/* Timeline Node Icon */}
                  <div
                    className={`absolute -start-[51px] top-0 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-transform group-hover:scale-110 ${
                      step.accent === "emerald"
                        ? "bg-emerald-100 border-emerald-200 shadow-emerald-500/20"
                        : "bg-surface border-border shadow-sand-200/50"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Content */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {step.num}
                      </span>
                      <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                        {step.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed text-start">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
