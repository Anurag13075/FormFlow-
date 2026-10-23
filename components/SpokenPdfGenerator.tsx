"use client";

import React, { useState } from "react";
import { RealUserProfile } from "@/lib/types";
import { FileText, Sparkles, Download, CheckCircle, Eye, X } from "lucide-react";

interface SpokenPdfGeneratorProps {
  userProfile: RealUserProfile;
  formTitle: string;
  onAttachGeneratedPdf: (fileName: string) => void;
}

export const SpokenPdfGenerator: React.FC<SpokenPdfGeneratorProps> = ({
  userProfile,
  formTitle,
  onAttachGeneratedPdf,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfName, setGeneratedPdfName] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const fileName = `${userProfile.fullName.replace(/\s+/g, "_")}_Tailored_Executive_Brief.pdf`;
      setGeneratedPdfName(fileName);
      setIsGenerating(false);
      onAttachGeneratedPdf(fileName);
    }, 1200);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-wispr-sand/50 to-white rounded-2xl border border-wispr-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-wispr-green text-wispr-cream flex items-center justify-center flex-shrink-0 shadow-sm">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h5 className="text-xs font-bold text-wispr-ink">
              Spoken 1-Page PDF Generator
            </h5>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-wispr-lavender text-purple-900 font-bold border border-purple-200">
              Unique Feature
            </span>
          </div>
          <p className="text-[11px] text-wispr-stone mt-0.5">
            Auto-synthesizes a tailored 1-page PDF document and mounts it to this form.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 self-start sm:self-auto">
        {!generatedPdfName ? (
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-3.5 py-1.5 rounded-xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink text-xs font-bold tactile-button flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? "Synthesizing PDF..." : "Generate & Attach PDF"}</span>
          </button>
        ) : (
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="px-2.5 py-1.5 rounded-xl border border-wispr-border bg-white hover:bg-wispr-cream text-wispr-ink text-xs font-semibold flex items-center space-x-1"
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <span className="text-[11px] px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Mounted to Form</span>
            </span>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wispr-ink/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-xl w-full rounded-3xl border border-wispr-border shadow-float p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto space-y-4 font-sans">
            
            <div className="flex items-center justify-between pb-3 border-b border-wispr-border">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-wispr-green" />
                <span className="text-xs font-bold text-wispr-ink truncate max-w-xs">
                  {generatedPdfName}
                </span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="w-7 h-7 rounded-full bg-wispr-sand/60 text-wispr-ink flex items-center justify-center text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Document Preview */}
            <div className="p-6 bg-wispr-cream/40 rounded-2xl border border-wispr-border space-y-4 text-xs">
              <div className="border-b border-wispr-border/70 pb-3">
                <h4 className="font-serif text-lg font-bold text-wispr-ink">{userProfile.fullName}</h4>
                <p className="text-[11px] text-wispr-stone">
                  {userProfile.email} • {userProfile.phone} • {userProfile.location}
                </p>
                <p className="text-[11px] text-wispr-green font-medium">
                  {userProfile.portfolioUrl} • {userProfile.linkedInUrl}
                </p>
              </div>

              <div className="space-y-2 text-wispr-ink leading-relaxed">
                <p className="font-semibold text-wispr-stone text-[10px] uppercase tracking-wider">
                  Subject: Application & Engineering Trajectory for {formTitle}
                </p>
                <p>Dear Hiring & Engineering Leadership Team,</p>
                <p>
                  I am writing to express my focused interest in joining your team. With {userProfile.yearsOfExperience}+ years of experience building high-speed frontends and scalable distributed systems at {userProfile.currentCompany}, I prioritize execution speed and craft.
                </p>
                <p>{userProfile.careerHighlights}</p>
                <p>
                  Having worked directly with voice-first interaction models and low-latency UI architectures, I am eager to accelerate your upcoming roadmaps.
                </p>
                <p className="pt-2 font-medium">
                  Sincerely,<br />
                  <span className="font-serif font-bold text-sm">{userProfile.fullName}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2 rounded-xl bg-wispr-ink text-wispr-cream text-xs font-semibold hover:bg-black"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
