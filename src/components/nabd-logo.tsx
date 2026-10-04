import React from "react";

/**
 * Nabd pulse-line logo — an inline SVG of a stylised heartbeat pulse.
 * The stroke animates via the `.animate-pulse-line` CSS class defined in globals.css.
 */
export function NabdLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-auto ${className}`}
      aria-label="Nabd logo"
    >
      {/* Baseline */}
      <line
        x1="0"
        y1="20"
        x2="30"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Pulse */}
      <polyline
        points="30,20 38,20 44,6 50,34 56,12 62,28 68,20 76,20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        className="animate-pulse-line"
      />
      {/* Trailing baseline */}
      <line
        x1="76"
        y1="20"
        x2="120"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
