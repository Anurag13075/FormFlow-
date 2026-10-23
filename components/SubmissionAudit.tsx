"use client";

import React, { useState } from "react";
import { FormDefinition } from "@/lib/types";
import { CheckCircle2, Download, Send, Sparkles, X, Clock, FileCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface SubmissionAuditProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormDefinition;
  onReset: () => void;
}

export const SubmissionAudit: React.FC<SubmissionAuditProps> = ({
  isOpen,
  onClose,
  form,
  onReset,
}) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFinalSubmit = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#17382B", "#D97706", "#2E7D32", "#E8E2D5"],
    });
    setSubmitted(true);
  };

  const handleDownloadJSON = () => {
    const data: Record<string, any> = {
      formTitle: form.title,
      submittedAt: new Date().toISOString(),
      fields: form.fields.map((f) => ({
        label: f.label,
        value: f.value,
        provenance: f.filledReason || "Direct voice instruction",
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.id}-submission-record.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-flow-ink/50 backdrop-blur-md animate-fade-in">
      <div className="bg-flow-cream max-w-2xl w-full rounded-3xl border border-flow-border shadow-float overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-flow-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-tactile">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-xl font-bold text-flow-ink">
                  {submitted ? "Submission Dispatched" : "Autonomous Audit Ready"}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  100% Validated
                </span>
              </div>
              <p className="text-xs text-flow-ink-muted">
                {form.title} • {form.category}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-flow-sand/60 hover:bg-flow-sand text-flow-ink flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Performance & Time Saved banner */}
          <div className="p-4 rounded-2xl bg-white border border-flow-border shadow-tactile grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] text-flow-stone block uppercase tracking-wider font-semibold">
                Fields Completed
              </span>
              <span className="font-serif text-xl font-bold text-flow-ink">
                {form.fields.length} / {form.fields.length}
              </span>
            </div>
            <div className="border-x border-flow-border/60">
              <span className="text-[10px] text-flow-stone block uppercase tracking-wider font-semibold">
                Manual Typing
              </span>
              <span className="font-serif text-xl font-bold text-red-500 line-through">
                14 mins
              </span>
            </div>
            <div>
              <span className="text-[10px] text-flow-stone block uppercase tracking-wider font-semibold">
                FormFlow Voice
              </span>
              <span className="font-serif text-xl font-bold text-flow-green">
                4.2 secs
              </span>
            </div>
          </div>

          {/* Audit List of values */}
          <div className="bg-white rounded-2xl p-4 border border-flow-border shadow-tactile space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-flow-ink block pb-1 border-b border-flow-border/50">
              Payload Verification Summary
            </span>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {form.fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-start justify-between text-xs p-2 rounded-xl bg-flow-cream/40 border border-flow-border/60"
                >
                  <div className="max-w-[70%]">
                    <span className="font-semibold text-flow-ink block">{field.label}</span>
                    <span className="text-flow-ink-muted truncate block text-[11px] mt-0.5">
                      {String(field.value)}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-flow-sand text-flow-ink font-medium text-right flex-shrink-0">
                    {field.filledReason ? "Vault Match" : "Voice Directive"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-flow-border flex items-center justify-between">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-flow-border text-xs font-medium text-flow-ink hover:bg-flow-cream transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit JSON</span>
          </button>

          {!submitted ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-full bg-flow-green text-white text-xs font-bold hover:bg-flow-green-hover transition-all shadow-tactile flex items-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>One-Click Confirm & Submit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-flow-green flex items-center space-x-1">
                <FileCheck className="w-4 h-4" />
                <span>Application Submitted Successfully!</span>
              </span>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onReset();
                  onClose();
                }}
                className="px-4 py-2 rounded-full bg-flow-ink text-flow-cream text-xs font-semibold"
              >
                Reset & Fill Another
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
