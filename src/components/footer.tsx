import { useTranslations } from "next-intl";
import { NabdLogo } from "./nabd-logo";

/**
 * Site-wide footer with brand, tagline, and copyright.
 */
export function Footer({}: { locale?: string } = {}) {
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-sand-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5 text-teal-700">
            <NabdLogo className="text-teal-600" />
            <span className="text-lg font-bold text-foreground">
              {tCommon("brand")}
            </span>
          </div>

          {/* Tagline */}
          <p className="max-w-md text-sm text-muted text-center sm:text-start">
            {tCommon("tagline")}
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>{tCommon("copyright", { year })}</div>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {tCommon("privacy")}
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {tCommon("terms")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
