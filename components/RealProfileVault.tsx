"use client";

import React, { useState } from "react";
import { RealUserProfile } from "@/lib/types";
import { saveUserProfile } from "@/lib/storage";
import {
  ShieldCheck,
  User,
  Briefcase,
  FileText,
  CreditCard,
  Save,
  CheckCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface RealProfileVaultProps {
  userProfile: RealUserProfile;
  onUpdateProfile: (updated: RealUserProfile) => void;
}

export const RealProfileVault: React.FC<RealProfileVaultProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState<RealUserProfile>(userProfile);
  const [saveStatus, setSaveStatus] = useState<boolean>(false);

  const handleChange = (key: keyof RealUserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(formData);
    onUpdateProfile(formData);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-tactile flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-wispr-green text-wispr-cream flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-serif text-2xl font-bold text-wispr-ink">
                My Real Profile & Document Vault
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                100% Local Sandbox
              </span>
            </div>
            <p className="text-xs text-wispr-ink-muted mt-0.5">
              Fill in your actual personal details below. FormFlow will use your real data when filling any web form.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink font-bold text-xs tactile-button flex items-center space-x-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saveStatus ? "Saved to Local Vault!" : "Save My Real Details"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Real Contact & Identity */}
        <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-tactile space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-wispr-border/60 text-xs font-bold uppercase tracking-wider text-wispr-ink">
            <User className="w-4 h-4 text-wispr-green" />
            <span>1. Real Identity & Contact Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Your Full Legal Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Your Real Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Base City & Country *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Real Career & Experience */}
        <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-tactile space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-wispr-border/60 text-xs font-bold uppercase tracking-wider text-wispr-ink">
            <Briefcase className="w-4 h-4 text-wispr-green" />
            <span>2. Real Career, Compensation & Links</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Current Role / Title
              </label>
              <input
                type="text"
                value={formData.currentTitle}
                onChange={(e) => handleChange("currentTitle", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Current Employer / Org
              </label>
              <input
                type="text"
                value={formData.currentCompany}
                onChange={(e) => handleChange("currentCompany", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => handleChange("yearsOfExperience", Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Default Notice Period
              </label>
              <input
                type="text"
                value={formData.noticePeriod}
                onChange={(e) => handleChange("noticePeriod", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Target Compensation / CTC
              </label>
              <input
                type="text"
                value={formData.expectedSalary}
                onChange={(e) => handleChange("expectedSalary", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.linkedInUrl}
                onChange={(e) => handleChange("linkedInUrl", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Personal Portfolio or GitHub Link
              </label>
              <input
                type="text"
                value={formData.portfolioUrl}
                onChange={(e) => handleChange("portfolioUrl", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Your Real Accomplishments & Highlights (Used for Essay Questions)
              </label>
              <textarea
                rows={2}
                value={formData.careerHighlights}
                onChange={(e) => handleChange("careerHighlights", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Verified Real Document File */}
        <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-tactile space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-wispr-border/60 text-xs font-bold uppercase tracking-wider text-wispr-ink">
            <FileText className="w-4 h-4 text-wispr-green" />
            <span>3. Real Document Attachment (PDF File Name)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Resume / CV File Name
              </label>
              <input
                type="text"
                value={formData.resumeFileName}
                onChange={(e) => handleChange("resumeFileName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
              <span className="text-[10px] text-wispr-stone mt-1 block">
                Auto-mounted whenever a form has a resume or file upload field.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-wispr-ink block mb-1">
                Tax / Travel Invoice File Name
              </label>
              <input
                type="text"
                value={formData.travelInvoiceFileName}
                onChange={(e) => handleChange("travelInvoiceFileName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-wispr-cream/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
              />
              <span className="text-[10px] text-wispr-stone mt-1 block">
                Auto-mounted for corporate reimbursement and expense forms.
              </span>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-wispr-stone">
            All data stored securely on your machine (localStorage).
          </span>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink font-bold text-xs tactile-button flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Save & Apply Real Data</span>
          </button>
        </div>

      </form>

    </div>
  );
};
