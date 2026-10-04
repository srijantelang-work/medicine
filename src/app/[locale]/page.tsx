import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WaitlistSection } from "@/components/landing/waitlist-cta";
import { HashScrollHandler } from "@/components/hash-scroll-handler";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col flex-1">
      <HashScrollHandler />
      {/* 1. Hero with Live Clinical Simulation Window */}
      <Hero locale={locale} />

      {/* 2. Three Feature Cards */}
      <Features locale={locale} />

      {/* 3. Three-Step How It Works Workflow */}
      <HowItWorks locale={locale} />

      {/* 4. Early Access Waitlist Section */}
      <WaitlistSection locale={locale} />
    </div>
  );
}
