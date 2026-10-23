"use client";

import React, { useState } from "react";
import { UniversalForm, UniversalFormField, RealUserProfile } from "@/lib/types";
import { parseHtmlToUniversalForm, createDefaultUniversalForm } from "@/lib/universalParser";
import { Globe, Code2, Sparkles, FileText, CheckCircle2, Paperclip, Check } from "lucide-react";

interface UniversalFormScannerProps {
  activeForm: UniversalForm;
  onSetForm: (form: UniversalForm) => void;
  activeEvaluatingFieldId: string | null;
  onFieldChange: (fieldId: string, val: any) => void;
  onSubmitForm: () => void;
}

export const UniversalFormScanner: React.FC<UniversalFormScannerProps> = ({
  activeForm,
  onSetForm,
  activeEvaluatingFieldId,
  onFieldChange,
  onSubmitForm,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customHtml, setCustomHtml] = useState("");
  const [customTitle, setCustomTitle] = useState("");

  const handleParseCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHtml.trim()) return;
    const parsed = parseHtmlToUniversalForm(customHtml, customTitle || "Imported Web Form");
    onSetForm(parsed);
    setShowCustomInput(false);
  };

  const handleLoadSample = (sampleType: "lever" | "expense" | "google") => {
    if (sampleType === "lever") {
      onSetForm(createDefaultUniversalForm());
    } else if (sampleType === "expense") {
      onSetForm({
        id: "corporate-expense",
        title: "Employee Travel & Expense Voucher",
        category: "Corporate Finance",
        fields: [
          {
            id: "claimant_name",
            name: "claimantName",
            label: "Employee Full Name",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "bank_payout",
            name: "bankPayout",
            label: "Disbursement Bank & IFSC",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "expense_city",
            name: "destinationCity",
            label: "City / Onsite Destination",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "airfare_amt",
            name: "airfareAmount",
            label: "Flight / Train Transit Expense (₹)",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "lodging_amt",
            name: "lodgingAmount",
            label: "Hotel & Accommodation Bill (₹)",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "travel_justification",
            name: "travelJustification",
            label: "Business Purpose & Client Deliverables",
            type: "textarea",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "tax_receipt_pdf",
            name: "taxReceiptPdf",
            label: "Upload Verified Tax Invoices (PDF)",
            type: "file",
            required: true,
            value: "",
            status: "empty",
          },
        ],
      });
    } else {
      onSetForm({
        id: "google-form-survey",
        title: "AI Startup Hackathon Project Submission",
        category: "Hackathon Entry",
        fields: [
          {
            id: "lead_name",
            name: "leadName",
            label: "Team Lead Full Name",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "lead_email",
            name: "leadEmail",
            label: "Primary Contact Email",
            type: "email",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "project_repo",
            name: "projectRepo",
            label: "GitHub Repository / Demo Link",
            type: "text",
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "track_selection",
            name: "trackSelection",
            label: "Challenge Track",
            type: "select",
            options: ["Builders (Developers)", "No-Code (Product & Ops)", "Wispr Dictation Champion"],
            required: true,
            value: "",
            status: "empty",
          },
          {
            id: "project_description",
            name: "projectDescription",
            label: "Briefly explain the problem solved & how Wispr Flow was used",
            type: "textarea",
            required: true,
            value: "",
            status: "empty",
          },
        ],
      });
    }
  };

  const totalFields = activeForm.fields.length;
  const filledCount = activeForm.fields.filter(
    (f) => f.value !== "" && f.value !== false && f.status === "filled"
  ).length;

  return (
    <div className="space-y-6">
      
      {/* Universal Source Bar */}
      <div className="p-3 bg-white rounded-2xl border border-wispr-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-wispr-ink pl-1">
          <Globe className="w-4 h-4 text-wispr-green" />
          <span>Universal Form Target:</span>
          <span className="font-bold text-wispr-green">{activeForm.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleLoadSample("lever")}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-wispr-border bg-wispr-cream hover:bg-wispr-sand text-wispr-ink"
          >
            Job App
          </button>
          <button
            onClick={() => handleLoadSample("expense")}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-wispr-border bg-wispr-cream hover:bg-wispr-sand text-wispr-ink"
          >
            Expense Claim
          </button>
          <button
            onClick={() => handleLoadSample("google")}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-wispr-border bg-wispr-cream hover:bg-wispr-sand text-wispr-ink"
          >
            Hackathon Form
          </button>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-wispr-ink text-wispr-cream hover:bg-black flex items-center space-x-1"
          >
            <Code2 className="w-3 h-3" />
            <span>Paste ANY HTML Form</span>
          </button>
        </div>
      </div>

      {/* Custom HTML Form Injector Drawer */}
      {showCustomInput && (
        <form
          onSubmit={handleParseCustom}
          className="p-5 bg-white rounded-2xl border border-wispr-border shadow-tactile space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-wispr-ink">
              Paste Any Web Form HTML Snippet or Tag
            </h4>
            <span className="text-[11px] text-wispr-stone">
              Works on Google Forms, Workday, Lever, etc.
            </span>
          </div>

          <input
            type="text"
            placeholder="Form Title (e.g. Acme Corp Application)"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-wispr-border text-xs text-wispr-ink focus:outline-none focus:ring-1 focus:ring-wispr-ink"
          />

          <textarea
            rows={4}
            placeholder={`Paste HTML <form>...</form> here. FormFlow will extract all inputs, textareas, selects, and labels dynamically.`}
            value={customHtml}
            onChange={(e) => setCustomHtml(e.target.value)}
            className="w-full p-3 rounded-xl border border-wispr-border text-xs font-mono text-wispr-ink bg-wispr-cream/30 focus:outline-none focus:ring-1 focus:ring-wispr-ink"
          />

          <div className="flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowCustomInput(false)}
              className="px-3 py-1.5 rounded-xl border border-wispr-border text-xs font-medium text-wispr-ink hover:bg-wispr-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink text-xs font-bold tactile-button"
            >
              Parse & Activate Universal Form
            </button>
          </div>
        </form>
      )}

      {/* Main Form Sheet */}
      <div className="bg-white rounded-3xl border border-wispr-border shadow-float overflow-hidden">
        
        {/* Document Header */}
        <div className="p-6 sm:p-8 border-b border-wispr-border bg-gradient-to-b from-wispr-cream/50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-wispr-sand/70 text-wispr-ink text-[11px] font-semibold mb-2">
              <span>{activeForm.category}</span>
              <span>•</span>
              <span>Universal Web Schema</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wispr-ink">
              {activeForm.title}
            </h2>
            <p className="text-xs text-wispr-stone mt-1">
              {activeForm.originUrl || "Universal Web Form Active • Ready for Wispr Flow dictation"}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-wispr-ink">
              {filledCount} of {totalFields} Fields Complete
            </div>
            <div className="w-36 h-2 rounded-full bg-wispr-sand mt-1.5 overflow-hidden">
              <div
                className="h-full bg-wispr-green transition-all duration-300"
                style={{ width: `${Math.round((filledCount / totalFields) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Fields Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeForm.fields.map((field) => {
            const isEvaluating = activeEvaluatingFieldId === field.id;
            const isFilled = field.status === "filled" && field.value !== "";
            const isFull =
              field.type === "textarea" ||
              field.type === "file" ||
              field.id.includes("why") ||
              field.id.includes("proposal") ||
              field.id.includes("justification");

            return (
              <div
                key={field.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  isEvaluating
                    ? "bg-amber-50/70 border-amber-400 ring-2 ring-amber-300 scale-[1.01]"
                    : isFilled
                    ? "bg-wispr-cream/40 border-wispr-border"
                    : "bg-white border-wispr-border"
                } ${isFull ? "md:col-span-2" : "md:col-span-1"}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-wispr-ink flex items-center space-x-1">
                    <span>{field.label}</span>
                    {field.required && <span className="text-red-500 font-bold">*</span>}
                  </label>

                  {isEvaluating && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold animate-pulse">
                      Evaluating...
                    </span>
                  )}

                  {isFilled && !isEvaluating && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>Filled with Real Data</span>
                    </span>
                  )}
                </div>

                {/* Input types */}
                {(field.type === "text" || field.type === "email" || field.type === "tel") && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={String(field.value)}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    value={String(field.value)}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                    className="w-full p-3 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink leading-relaxed"
                  />
                )}

                {field.type === "select" && (
                  <select
                    value={String(field.value)}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink cursor-pointer"
                  >
                    <option value="">Select option...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "file" && (
                  <div>
                    {field.value ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center space-x-2.5">
                          <FileText className="w-4 h-4 text-emerald-700" />
                          <span className="text-xs font-semibold text-emerald-900 truncate">
                            {String(field.value)}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-emerald-800 font-bold border border-emerald-200">
                          Verified PDF
                        </span>
                      </div>
                    ) : (
                      <div className="border border-dashed border-wispr-border rounded-xl p-3 text-center bg-wispr-cream/30">
                        <Paperclip className="w-4 h-4 mx-auto text-wispr-stone mb-0.5" />
                        <span className="text-[11px] text-wispr-ink font-medium">
                          Auto-mounts your verified resume from vault
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Provenance note */}
                {field.filledReason && isFilled && (
                  <p className="text-[10px] text-wispr-stone mt-1.5 italic">
                    {field.filledReason}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-wispr-border bg-wispr-cream/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-wispr-stone">
            Fields mapped directly to your real saved profile.
          </span>

          <button
            onClick={onSubmitForm}
            disabled={filledCount === 0}
            className="px-6 py-2.5 rounded-xl bg-wispr-ink text-wispr-cream font-bold text-xs hover:bg-black transition-all disabled:opacity-40"
          >
            Review & Submit ({filledCount}/{totalFields})
          </button>
        </div>

      </div>

    </div>
  );
};
