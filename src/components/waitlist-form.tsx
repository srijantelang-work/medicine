"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowForwardIcon } from "@/components/directional-icon";

interface WaitlistFormProps {
  locale: string;
}

export function WaitlistForm({ locale }: WaitlistFormProps) {
  const tWaitlist = useTranslations("waitlist");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultData, setResultData] = useState<{
    status: "created" | "already_registered";
    email: string;
    name: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          locale,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResultData({
          status: data.status,
          email: data.email,
          name: data.name,
        });
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || tWaitlist("errorMessage"));
      }
    } catch (err) {
      console.error("Waitlist submit error:", err);
      setStatus("error");
      setErrorMessage(tWaitlist("errorMessage"));
    }
  }

  // ─── Success View ───
  if (status === "success" && resultData) {
    const isNew = resultData.status === "created";

    return (
      <div
        className="rounded-2xl border border-teal-300 bg-teal-50/80 p-6 sm:p-8 text-center animate-fade-in-up"
        role="alert"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-700/20 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="text-xl font-extrabold text-teal-950">
          {isNew ? tWaitlist("successTitle") : tWaitlist("duplicateTitle")}
        </h3>

        <p className="mt-3 text-sm text-teal-800 leading-relaxed max-w-lg mx-auto">
          {isNew
            ? tWaitlist("successMessage", { email: resultData.email })
            : tWaitlist("duplicateNotice", { email: resultData.email })}
        </p>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setName("");
              setEmail("");
              setResultData(null);
            }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-4 cursor-pointer"
          >
            {tWaitlist("registerAnother")}
          </button>
        </div>
      </div>
    );
  }

  // ─── Default Form View ───
  return (
    <form onSubmit={handleSubmit} className="text-start" id="waitlist-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="waitlist-name-input"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            {tWaitlist("nameLabel")}
          </label>
          <input
            type="text"
            id="waitlist-name-input"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            placeholder={tWaitlist("namePlaceholder")}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted/60 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="waitlist-email-input"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            {tWaitlist("emailLabel")}
          </label>
          <input
            type="email"
            id="waitlist-email-input"
            name="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder={tWaitlist("emailPlaceholder")}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted/60 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Error Notice */}
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-coral-200 bg-coral-50 p-3 text-xs text-coral-800 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-coral-600 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted flex items-center gap-1.5 order-2 sm:order-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-teal-600 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{tWaitlist("privacyNotice")}</span>
        </p>

        <button
          type="submit"
          id="waitlist-submit-button"
          disabled={status === "loading"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-teal-700/20 hover:bg-teal-700 active:bg-teal-800 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 order-1 sm:order-2 cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <svg
                className="animate-spin -ms-1 me-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>{tWaitlist("submitting")}</span>
            </>
          ) : (
            <>
              <span>{tWaitlist("submitButton")}</span>
              <ArrowForwardIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
