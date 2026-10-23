"use client";

import React from "react";
import { Mic, ShieldCheck, Sparkles, FolderLock, ExternalLink } from "lucide-react";

interface NavbarProps {
  activeTab: "agent" | "vault" | "audit";
  setActiveTab: (tab: "agent" | "vault" | "audit") => void;
  vaultDocCount: number;
  personaName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  vaultDocCount,
  personaName,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-flow-border/70 bg-flow-cream/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("agent")}>
          <div className="w-9 h-9 rounded-full bg-flow-green text-flow-cream flex items-center justify-center shadow-tactile transition-transform hover:scale-105">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5v14M7 8v8M2 11v2M22 11v2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-xl tracking-tight text-flow-ink">
                FormFlow
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-flow-green-light text-flow-green border border-flow-green/10">
                Wispr Edition
              </span>
            </div>
            <span className="text-[11px] text-flow-ink-muted -mt-0.5">
              Voice-First Form & Document Agent
            </span>
          </div>
        </div>

        {/* Wispr-style Segmented Control Pill */}
        <div className="inline-flex items-center p-1 rounded-full bg-flow-sand/60 border border-flow-border/80 shadow-inner">
          <button
            onClick={() => setActiveTab("agent")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 ${
              activeTab === "agent"
                ? "bg-flow-ink text-flow-cream shadow-tactile"
                : "text-flow-ink-muted hover:text-flow-ink"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Form Agent</span>
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 ${
              activeTab === "vault"
                ? "bg-flow-ink text-flow-cream shadow-tactile"
                : "text-flow-ink-muted hover:text-flow-ink"
            }`}
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span>Persona Vault</span>
            <span className="text-[10px] ml-1 px-1.5 py-0.2 rounded-full bg-flow-sand text-flow-ink font-semibold">
              {vaultDocCount}
            </span>
          </button>
        </div>

        {/* Right side status badge */}
        <div className="hidden md:flex items-center space-x-3">
          <div
            onClick={() => setActiveTab("vault")}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/70 border border-flow-border text-xs text-flow-ink cursor-pointer hover:bg-white transition-colors shadow-tactile"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-medium text-flow-ink-muted">Profile:</span>
            <span className="font-semibold text-flow-ink">{personaName}</span>
          </div>

          <div className="h-4 w-[1px] bg-flow-border" />

          <div className="flex items-center space-x-1 text-xs text-flow-ink-muted font-medium">
            <ShieldCheck className="w-4 h-4 text-flow-green" />
            <span>Zero-Cloud Leakage</span>
          </div>
        </div>

      </div>
    </header>
  );
};
