"use client";

import React, { useState } from "react";
import { UserPersona, VaultDocument } from "@/lib/types";
import {
  X,
  ShieldCheck,
  FileText,
  User,
  Briefcase,
  Building,
  CreditCard,
  Plus,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  vault: UserPersona;
  onUpdateVault: (updated: UserPersona) => void;
}

export const VaultModal: React.FC<VaultModalProps> = ({
  isOpen,
  onClose,
  vault,
  onUpdateVault,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-flow-ink/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-flow-cream w-full max-w-3xl rounded-3xl border border-flow-border shadow-float overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-flow-border bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-flow-green text-flow-cream flex items-center justify-center shadow-tactile">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-xl font-bold text-flow-ink">
                  Persona & Document Vault
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-flow-green-light text-flow-green font-bold">
                  Active
                </span>
              </div>
              <p className="text-xs text-flow-ink-muted">
                Your verified personal, professional, and file records used by FormFlow.
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

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white rounded-2xl p-5 border border-flow-border shadow-tactile">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-flow-border/50">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-flow-ink">
                <User className="w-4 h-4 text-flow-green" />
                <span>Primary Identity & Contact</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-flow-stone block mb-0.5">Full Name</span>
                <span className="font-semibold text-flow-ink text-sm">{vault.name}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Email Address</span>
                <span className="font-semibold text-flow-ink text-sm">{vault.email}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Phone / WhatsApp</span>
                <span className="font-semibold text-flow-ink text-sm">{vault.phone}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Base Location</span>
                <span className="font-semibold text-flow-ink text-sm">{vault.location}</span>
              </div>
            </div>
          </div>

          {/* Professional Credentials */}
          <div className="bg-white rounded-2xl p-5 border border-flow-border shadow-tactile">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-flow-border/50">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-flow-ink">
                <Briefcase className="w-4 h-4 text-flow-green" />
                <span>Professional Profile & Logistics</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-3">
              <div>
                <span className="text-flow-stone block mb-0.5">Current Role</span>
                <span className="font-semibold text-flow-ink">{vault.title}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Years Experience</span>
                <span className="font-semibold text-flow-ink">{vault.experienceYears} Years</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Default Notice Period</span>
                <span className="font-semibold text-flow-ink">{vault.noticePeriod}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Target Compensation</span>
                <span className="font-semibold text-flow-ink">{vault.expectedSalary}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-flow-stone block mb-0.5">Portfolio & GitHub</span>
                <span className="font-semibold text-flow-green truncate block">
                  {vault.portfolio} • {vault.github}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-flow-border/40">
              <span className="text-flow-stone text-[11px] block mb-1">Core Competencies & Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {vault.keySkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-flow-sand/60 text-flow-ink text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bank & Disbursement info */}
          <div className="bg-white rounded-2xl p-5 border border-flow-border shadow-tactile">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-flow-border/50">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-flow-ink">
                <CreditCard className="w-4 h-4 text-flow-green" />
                <span>Default Disbursement Account (For Expenses & Grants)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-flow-stone block mb-0.5">Bank Entity</span>
                <span className="font-semibold text-flow-ink">{vault.bankDetails.bankName}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">Account Number</span>
                <span className="font-semibold text-flow-ink">{vault.bankDetails.accountNumber}</span>
              </div>
              <div>
                <span className="text-flow-stone block mb-0.5">IFSC / Routing</span>
                <span className="font-semibold text-flow-ink">{vault.bankDetails.ifscOrRouting}</span>
              </div>
            </div>
          </div>

          {/* Document Vault Cards */}
          <div className="bg-white rounded-2xl p-5 border border-flow-border shadow-tactile">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-flow-border/50">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-flow-ink">
                <FileText className="w-4 h-4 text-flow-green" />
                <span>Verified Documents ({vault.documents.length})</span>
              </div>
              <span className="text-[11px] text-flow-ink-muted">
                Auto-attached when requested by forms
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vault.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-flow-border bg-flow-cream/30 hover:bg-flow-cream transition-colors"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-flow-green text-white flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-flow-ink truncate">{doc.name}</p>
                      <p className="text-[10px] text-flow-stone">
                        {doc.category} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 ml-2 inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-flow-border bg-white flex items-center justify-between">
          <span className="text-xs text-flow-ink-muted">
            All records stored locally in browser sandbox.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-flow-ink text-flow-cream text-xs font-semibold hover:bg-black transition-colors"
          >
            Done Reviewing Vault
          </button>
        </div>

      </div>
    </div>
  );
};
