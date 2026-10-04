"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface LiveSimulationProps {
  locale: string;
}

export function LiveSimulation({ locale }: LiveSimulationProps) {
  const tPreview = useTranslations("preview");

  // Simulation steps:
  // 1: Patient initial message
  // 2: Nabd AI is typing...
  // 3: Nabd AI response appears
  // 4: Patient follow-up response
  // 5: Right panel - Triage alert arrives
  // 6: Right panel - Subjective notes synthesized
  // 7: Right panel - Objective systems review synthesized (Complete)
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let timer: NodeJS.Timeout;

    if (step === 1) {
      // Show AI typing after 1.2s
      timer = setTimeout(() => setStep(2), 1200);
    } else if (step === 2) {
      // Reveal AI message after 1.8s
      timer = setTimeout(() => setStep(3), 1800);
    } else if (step === 3) {
      // Reveal patient second reply after 1.6s
      timer = setTimeout(() => setStep(4), 1600);
    } else if (step === 4) {
      // Reveal triage alert on SOAP panel after 1.4s
      timer = setTimeout(() => setStep(5), 1400);
    } else if (step === 5) {
      // Stream in Subjective history after 1.2s
      timer = setTimeout(() => setStep(6), 1200);
    } else if (step === 6) {
      // Stream in Objective history after 1.2s
      timer = setTimeout(() => setStep(7), 1200);
    } else if (step === 7) {
      // Stay complete for 14s, then loop smoothly
      timer = setTimeout(() => {
        setStep(1);
      }, 14000);
    }

    return () => clearTimeout(timer);
  }, [step, isPaused]);

  function handleReplay() {
    setStep(1);
    setCopied(false);
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const isSynthesizing = step >= 4 && step < 7;
  const isComplete = step === 7;

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl border border-border bg-surface shadow-2xl overflow-hidden transition-all duration-300">
      {/* ─── Window Topbar ─── */}
      <div className="flex items-center justify-between border-b border-border bg-sand-100/70 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-coral-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-teal-500" />
          <span className="ms-2 text-xs font-semibold text-muted">
            {tPreview("intakeTitle")}
          </span>
          <span className="ms-2 inline-flex items-center gap-1 rounded bg-teal-600/10 px-1.5 py-0.5 text-[10px] font-bold text-primary tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {tPreview("liveBadge")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {isComplete ? (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-teal-100 px-2.5 py-0.5 text-[11px] font-medium text-teal-800 transition-all">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse" />
                {tPreview("statusReady")}
              </span>
            ) : isSynthesizing ? (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" />
                {tPreview("statusSynthesizing")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-sand-200 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                {step === 2 ? tPreview("aiAgentName") + "..." : "Intake In Progress"}
              </span>
            )}
          </div>

          {/* Replay Button */}
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted hover:text-foreground transition-colors cursor-pointer rounded px-1.5 py-0.5 hover:bg-sand-200"
            title={tPreview("replay")}
            aria-label={tPreview("replay")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5 text-muted hover:rotate-180 transition-transform duration-500"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.5a.75.75 0 00-.75.75v3.732a.75.75 0 001.5 0v-2.023l.366.366a7 7 0 0011.71-3.125.75.75 0 10-1.014-.355zM4.688 8.576a5.5 5.5 0 019.201-2.466l.312.311H11.77a.75.75 0 000 1.5h3.73a.75.75 0 00.75-.75V3.44a.75.75 0 00-1.5 0v2.023l-.366-.366A7 7 0 002.674 8.22a.75.75 0 101.014.356z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">{tPreview("replay")}</span>
          </button>
        </div>
      </div>

      {/* ─── Split Screen ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-border">
        {/* Left Column: Conversational Dialogue */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-sand-50/50 min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <div>
                <span className="text-xs font-bold text-foreground block">
                  {tPreview("patientName")}
                </span>
                <span className="text-[11px] text-muted block">
                  {tPreview("chiefComplaint")}
                </span>
              </div>
              <span className="text-[10px] bg-sand-200 text-muted px-2 py-0.5 rounded font-mono">
                INTAKE #0841
              </span>
            </div>

            {/* Chat Bubbles */}
            <div className="mt-6 space-y-4 text-xs sm:text-sm">
              {/* Patient Message 1 */}
              <div className="flex flex-col items-end transition-all duration-300 animate-fade-in-up">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-3.5 shadow-sm text-start">
                  {tPreview("patientMessage")}
                </div>
                <span className="text-[10px] text-muted mt-1 pe-1">10:14 AM</span>
              </div>

              {/* Nabd AI Typing Indicator (Step 2) */}
              {step === 2 && (
                <div className="flex flex-col items-start transition-all duration-300 animate-fade-in-up">
                  <div className="flex items-center gap-1.5 mb-1 ps-1">
                    <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                    <span className="text-[11px] font-semibold text-teal-800">
                      {tPreview("aiAgentName")}
                    </span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-surface border border-teal-200 px-4 py-3 text-foreground shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-teal-600 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              {/* Nabd AI Response (Step >= 3) */}
              {step >= 3 && (
                <div className="flex flex-col items-start transition-all duration-300 animate-fade-in-up">
                  <div className="flex items-center gap-1.5 mb-1 ps-1">
                    <span className="h-2 w-2 rounded-full bg-teal-500" />
                    <span className="text-[11px] font-semibold text-teal-800">
                      {tPreview("aiAgentName")}
                    </span>
                  </div>
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-surface border border-teal-200 p-3.5 text-foreground shadow-sm text-start">
                    {tPreview("nabdResponse")}
                  </div>
                  <span className="text-[10px] text-muted mt-1 ps-1">10:14 AM</span>
                </div>
              )}

              {/* Patient Reply (Step >= 4) */}
              {step >= 4 && (
                <div className="flex flex-col items-end transition-all duration-300 animate-fade-in-up">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-3.5 shadow-sm text-start">
                    {tPreview("patientReply")}
                  </div>
                  <span className="text-[10px] text-muted mt-1 pe-1">10:15 AM</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {tPreview("encryptedDialogue")}
            </span>
            <span className="font-mono text-[10px]">
              {step >= 4 ? "3 turns • 90 sec" : `${step >= 3 ? "2" : "1"} turn in progress`}
            </span>
          </div>
        </div>

        {/* Right Column: Doctor's Structured SOAP Brief */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-surface min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-coral-500 rounded-full" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {tPreview("summaryCardTitle")}
                  </h3>
                  <p className="text-[11px] text-muted">
                    {tPreview("summaryType")}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-coral-700 bg-coral-50 border border-coral-200 px-2 py-0.5 rounded-full">
                HIGH PRIORITY
              </span>
            </div>

            {/* Waiting Placeholder if before Step 5 */}
            {step < 5 ? (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-primary mb-3">
                  <svg
                    className="h-6 w-6 animate-spin text-teal-600"
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
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-foreground">
                  {tPreview("statusSynthesizing")}
                </p>
                <p className="mt-1 text-[11px] text-muted max-w-xs mx-auto">
                  {locale === "ar"
                    ? "يقوم المحرك الطبي بربط الأعراض واستخلاص الشكوى آلياً أثناء تحدث المريض..."
                    : "Clinical reasoning engine is extracting chronologies and symptoms in real time..."}
                </p>
              </div>
            ) : (
              <div className="space-y-4 mt-4 transition-all duration-500">
                {/* Triage Alert Banner (Step >= 5) */}
                <div className="rounded-xl border border-coral-300 bg-coral-50/80 p-3 text-xs text-coral-900 flex items-start gap-2.5 animate-fade-in-up shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0 text-coral-600 mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold leading-snug">
                    {tPreview("triageAlert")}
                  </span>
                </div>

                {/* SOAP S - Subjective (Step >= 6) */}
                {step >= 6 && (
                  <div className="rounded-xl bg-sand-50/90 p-3.5 border border-border animate-fade-in-up shadow-sm">
                    <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
                      S • {tPreview("subjectiveTitle")}
                    </span>
                    <p className="text-xs text-foreground leading-relaxed">
                      {tPreview("subjectiveBody")}
                    </p>
                  </div>
                )}

                {/* SOAP O - Objective (Step >= 7) */}
                {step >= 7 && (
                  <div className="rounded-xl bg-sand-50/90 p-3.5 border border-border animate-fade-in-up shadow-sm">
                    <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
                      O • {tPreview("objectiveTitle")}
                    </span>
                    <p className="text-xs text-foreground leading-relaxed">
                      {tPreview("objectiveBody")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted">
            <span>EHR Integration: Epic / Cerner / HL7 FHIR</span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-teal-700 font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-teal-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{tPreview("copiedToEhr")}</span>
                </>
              ) : (
                <span>{tPreview("copyToEhr")}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
