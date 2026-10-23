"use client";

import React from "react";
import {
  FormField,
  FormDefinition,
  FieldStatus,
} from "@/lib/types";
import {
  CheckCircle2,
  FileText,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Paperclip,
  Check,
  Building,
  Briefcase,
  GraduationCap,
  Plane,
} from "lucide-react";

interface FormViewerProps {
  form: FormDefinition;
  availableForms: FormDefinition[];
  activeFormId: string;
  onSelectForm: (id: string) => void;
  activeEvaluatingFieldId: string | null;
  onFieldChange: (fieldId: string, value: any) => void;
  onOpenAudit: () => void;
  isFilled: boolean;
}

export const FormViewer: React.FC<FormViewerProps> = ({
  form,
  availableForms,
  activeFormId,
  onSelectForm,
  activeEvaluatingFieldId,
  onFieldChange,
  onOpenAudit,
  isFilled,
}) => {
  const totalFields = form.fields.length;
  const filledFieldsCount = form.fields.filter(
    (f) => f.value !== "" && f.value !== false && f.status === "filled"
  ).length;
  const progressPercent = Math.round((filledFieldsCount / totalFields) * 100);

  // Group fields by section
  const sections = form.sections || ["General Details"];
  const getFieldsForSection = (section: string) =>
    form.fields.filter((f) => (f.section || "General Details") === section);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-28">
      
      {/* Form Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white/70 border border-flow-border rounded-2xl shadow-tactile backdrop-blur-sm">
        <div className="flex items-center space-x-1.5 text-xs text-flow-ink-muted pl-2 font-medium">
          <span>Active Form Target:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {availableForms.map((f) => {
            const isActive = f.id === activeFormId;
            return (
              <button
                key={f.id}
                onClick={() => onSelectForm(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-flow-ink text-flow-cream shadow-tactile"
                    : "bg-flow-sand/40 hover:bg-flow-sand text-flow-ink border border-flow-border/60"
                }`}
              >
                {f.category === "Career" && <Briefcase className="w-3.5 h-3.5" />}
                {f.category === "Finance & Travel" && <Plane className="w-3.5 h-3.5" />}
                {f.category === "Education & Grant" && <GraduationCap className="w-3.5 h-3.5" />}
                <span>{f.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Sheet / Canvas */}
      <div className="bg-white rounded-3xl border border-flow-border/90 shadow-float overflow-hidden transition-all">
        
        {/* Form Document Header */}
        <div className="p-6 sm:p-8 border-b border-flow-border/70 bg-gradient-to-b from-flow-cream/60 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-flow-green-light border border-flow-green/10 text-flow-green text-xs font-semibold mb-2">
                <span>{form.category}</span>
                <span>•</span>
                <span>{form.estimatedTime}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-flow-ink font-bold tracking-tight">
                {form.title}
              </h1>
              <p className="text-sm text-flow-ink-muted mt-1">{form.subtitle}</p>
            </div>

            {/* Progress widget */}
            <div className="flex flex-col items-end min-w-[140px]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-flow-ink mb-1">
                <span>{filledFieldsCount} of {totalFields} Complete</span>
                <span className="text-flow-green font-bold">({progressPercent}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-flow-sand/70 overflow-hidden">
                <div
                  className="h-full bg-flow-green rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields by Section */}
        <div className="p-6 sm:p-8 space-y-8">
          {sections.map((sectionName, sIdx) => {
            const sectionFields = getFieldsForSection(sectionName);
            if (sectionFields.length === 0) return null;

            return (
              <div key={sIdx} className="space-y-4">
                
                {/* Section Title */}
                <div className="flex items-center space-x-3 pb-2 border-b border-flow-border/50">
                  <span className="w-5 h-5 rounded-full bg-flow-sand text-flow-ink text-[11px] font-bold flex items-center justify-center">
                    {sIdx + 1}
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-flow-ink">
                    {sectionName}
                  </h2>
                </div>

                {/* Grid of Fields in this Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sectionFields.map((field) => {
                    const isEvaluating = activeEvaluatingFieldId === field.id;
                    const isFilledField =
                      field.status === "filled" && field.value !== "" && field.value !== false;
                    const isFullWidth =
                      field.type === "textarea" ||
                      field.type === "file" ||
                      field.id === "why_wispr" ||
                      field.id === "trip_purpose" ||
                      field.id === "research_proposal";

                    return (
                      <div
                        key={field.id}
                        className={`transition-all duration-300 rounded-2xl p-4 border ${
                          isEvaluating
                            ? "bg-amber-50/70 border-flow-amber ring-2 ring-flow-amber/30 scale-[1.01]"
                            : isFilledField
                            ? "bg-flow-cream/40 border-flow-border hover:border-flow-border-dark/40"
                            : "bg-white border-flow-border hover:border-flow-border-dark/30"
                        } ${isFullWidth ? "md:col-span-2" : "md:col-span-1"}`}
                      >
                        {/* Field Label & Status Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <label
                            htmlFor={field.id}
                            className="text-xs font-semibold text-flow-ink flex items-center space-x-1"
                          >
                            <span>{field.label}</span>
                            {field.required && (
                              <span className="text-red-500 font-bold">*</span>
                            )}
                          </label>

                          {/* Field Status Indicator */}
                          {isEvaluating && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold animate-pulse">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Evaluating...</span>
                            </span>
                          )}

                          {isFilledField && !isEvaluating && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>

                        {/* Rendering by Field Type */}

                        {/* Text / Email / Tel */}
                        {(field.type === "text" ||
                          field.type === "email" ||
                          field.type === "tel") && (
                          <input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={String(field.value)}
                            onChange={(e) => onFieldChange(field.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-flow-border text-sm text-flow-ink placeholder:text-flow-stone/70 bg-white focus:outline-none focus:ring-1 focus:ring-flow-ink transition-all"
                          />
                        )}

                        {/* Textarea */}
                        {field.type === "textarea" && (
                          <textarea
                            id={field.id}
                            rows={3}
                            placeholder={field.placeholder}
                            value={String(field.value)}
                            onChange={(e) => onFieldChange(field.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-flow-border text-sm text-flow-ink placeholder:text-flow-stone/70 bg-white focus:outline-none focus:ring-1 focus:ring-flow-ink transition-all leading-relaxed"
                          />
                        )}

                        {/* Dropdown Select */}
                        {field.type === "select" && (
                          <select
                            id={field.id}
                            value={String(field.value)}
                            onChange={(e) => onFieldChange(field.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-flow-border text-sm text-flow-ink bg-white focus:outline-none focus:ring-1 focus:ring-flow-ink transition-all cursor-pointer"
                          >
                            <option value="">Select option...</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Radio Options */}
                        {field.type === "radio" && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {field.options?.map((opt) => {
                              const isChecked = field.value === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => onFieldChange(field.id, opt)}
                                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                                    isChecked
                                      ? "bg-flow-ink text-flow-cream border-flow-ink shadow-tactile"
                                      : "bg-white text-flow-ink border-flow-border hover:bg-flow-cream"
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 text-emerald-400" />}
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Slider / Range */}
                        {field.type === "slider" && (
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between text-xs text-flow-ink font-semibold">
                              <span>Experience Level:</span>
                              <span className="px-2 py-0.5 rounded bg-flow-sand text-flow-ink font-bold">
                                {Number(field.value)} Years
                              </span>
                            </div>
                            <input
                              type="range"
                              min={field.min ?? 0}
                              max={field.max ?? 15}
                              step={field.step ?? 1}
                              value={Number(field.value)}
                              onChange={(e) =>
                                onFieldChange(field.id, parseInt(e.target.value, 10))
                              }
                              className="w-full h-2 bg-flow-sand rounded-lg appearance-none cursor-pointer accent-flow-green"
                            />
                            <div className="flex justify-between text-[10px] text-flow-stone font-medium">
                              <span>0 Yrs (Entry)</span>
                              <span>7 Yrs (Lead)</span>
                              <span>15+ Yrs (Architect)</span>
                            </div>
                          </div>
                        )}

                        {/* File Attachment Dropzone / Vault Attachment */}
                        {field.type === "file" && (
                          <div className="pt-1">
                            {field.value ? (
                              <div className="flex items-center justify-between p-3 rounded-xl bg-flow-green-light/60 border border-flow-green/20">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 rounded-lg bg-flow-green text-white flex items-center justify-center shadow-tactile">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-flow-ink truncate max-w-xs">
                                      {String(field.value)}
                                    </p>
                                    <p className="text-[10px] text-flow-green font-medium">
                                      Attached from Vault • Digitally Verified
                                    </p>
                                  </div>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-flow-green font-bold border border-flow-green/20">
                                  PDF Attached
                                </span>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-flow-border rounded-xl p-4 text-center bg-flow-cream/30 hover:bg-flow-cream transition-colors">
                                <Paperclip className="w-5 h-5 mx-auto text-flow-stone mb-1" />
                                <p className="text-xs font-medium text-flow-ink">
                                  Voice-attachable file from your Vault
                                </p>
                                <p className="text-[10px] text-flow-stone mt-0.5">
                                  Speak "Attach my resume" or select from Vault
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Reason / Provenance badge */}
                        {field.filledReason && isFilledField && (
                          <div className="mt-2 text-[11px] text-flow-ink-muted flex items-center space-x-1">
                            <span className="font-semibold text-flow-green">Provenance:</span>
                            <span className="italic">{field.filledReason}</span>
                          </div>
                        )}

                        {/* Helper text if available */}
                        {field.helperText && !field.filledReason && (
                          <p className="mt-1.5 text-[11px] text-flow-stone">
                            {field.helperText}
                          </p>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-flow-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-flow-ink-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All form data kept local. End-to-end sandbox.</span>
            </div>

            <button
              onClick={onOpenAudit}
              disabled={filledFieldsCount === 0}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-flow-ink text-flow-cream hover:bg-black font-semibold text-sm transition-all shadow-tactile disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Review & Submit Application</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-flow-cream">
                {filledFieldsCount}/{totalFields}
              </span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
