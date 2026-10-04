"use client";

import { useEffect } from "react";

/**
 * Handles smooth scrolling to the hash anchor on initial page mount or hash change.
 * Ensures that if a user visits /en#features or /ar#waitlist directly, the viewport
 * smoothly scrolls to the element even if hydration took a brief moment.
 */
export function HashScrollHandler() {
  useEffect(() => {
    function scrollToHash() {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    // Attempt immediately and with a short delay for dynamic DOM hydration
    scrollToHash();
    const timer = setTimeout(scrollToHash, 200);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
