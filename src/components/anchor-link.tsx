"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface AnchorLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  locale: string;
  targetId: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onNavigate?: () => void;
}

/**
 * Universal anchor link component that guarantees smooth, reliable in-page navigation:
 * - When on the homepage, intercepts click, prevents router re-render, and smoothly scrolls to the target section ID.
 * - Updates the browser URL hash without causing a page jump or reload.
 * - When on another route (e.g. /account or /sign-in), transitions via router to `/${locale}#${targetId}`.
 */
export function AnchorLink({
  locale,
  targetId,
  children,
  className,
  id,
  onNavigate,
  ...props
}: AnchorLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Check if user is currently on the home page (with or without trailing slash)
  const isHomePage =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    } else {
      e.preventDefault();
      router.push(`/${locale}#${targetId}`);
    }
  };

  return (
    <a
      href={isHomePage ? `#${targetId}` : `/${locale}#${targetId}`}
      onClick={handleClick}
      className={className}
      id={id}
      {...props}
    >
      {children}
    </a>
  );
}
