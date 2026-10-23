"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck, Globe, Bookmark, ArrowRight, Cpu, Key, Check } from "lucide-react";
import { GROQ_MODELS } from "@/lib/groqService";

interface NavbarProps {
  currentView: "landing" | "studio" | "vault" | "bookmarklet";
  setCurrentView: (view: "landing" | "studio" | "vault" | "bookmarklet") => void;
  userName: string;
  groqApiKey: string;
  onSaveGroqApiKey: (key: string, model: string) => void;
  selectedModel: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userName,
  groqApiKey,
  onSaveGroqApiKey,
  selectedModel,
}) => {
  const [showGroqModal, setShowGroqModal] = useState(false);
  const [tempKey, setTempKey] = useState(groqApiKey);
  const [tempModel, setTempModel] = useState(selectedModel || "llama-3.3-70b-versatile");

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGroqApiKey(tempKey, tempModel);
    setShowGroqModal(false);
  };

  const isGroqActive = Boolean(groqApiKey && groqApiKey.startsWith("gsk_"));

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-wispr-border bg-wispr-cream/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand identity (Wispr ||| Flow logo mark) */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => setCurrentView("landing")}
          >
            {/* 3 vertical bars logo */}
            <div className="flex items-center space-x-1 px-1 h-5">
              <span className="w-1 h-4 bg-wispr-ink rounded-full" />
              <span className="w-1 h-5 bg-wispr-ink rounded-full" />
              <span className="w-1 h-3.5 bg-wispr-ink rounded-full" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-xl tracking-tight text-wispr-ink">
                Flow
              </span>
              <span className="font-sans font-semibold text-xs px-2 py-0.5 rounded-full bg-wispr-sand text-wispr-ink border border-wispr-border">
                Forms
              </span>
            </div>
          </div>

          {/* Wispr-style Segmented Control Pill */}
          <div className="hidden sm:inline-flex items-center p-1 rounded-full bg-wispr-sand/70 border border-wispr-border shadow-inner">
            <button
              onClick={() => setCurrentView("landing")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                currentView === "landing"
                  ? "bg-wispr-ink text-wispr-cream shadow-tactile"
                  : "text-wispr-ink-muted hover:text-wispr-ink"
              }`}
            >
              Landing
            </button>

            <button
              onClick={() => setCurrentView("studio")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                currentView === "studio"
                  ? "bg-wispr-ink text-wispr-cream shadow-tactile"
                  : "text-wispr-ink-muted hover:text-wispr-ink"
              }`}
            >
              Form Studio
            </button>

            <button
              onClick={() => setCurrentView("vault")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                currentView === "vault"
                  ? "bg-wispr-ink text-wispr-cream shadow-tactile"
                  : "text-wispr-ink-muted hover:text-wispr-ink"
              }`}
            >
              My Real Vault
            </button>

            <button
              onClick={() => setCurrentView("bookmarklet")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                currentView === "bookmarklet"
                  ? "bg-wispr-ink text-wispr-cream shadow-tactile"
                  : "text-wispr-ink-muted hover:text-wispr-ink"
              }`}
            >
              Any-Web Bookmarklet
            </button>
          </div>

          {/* Right CTA / Groq Settings */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Groq AI Button */}
            <button
              onClick={() => setShowGroqModal(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isGroqActive
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                  : "bg-white text-wispr-ink border-wispr-border hover:bg-wispr-cream"
              }`}
              title="Configure Groq AI API Key (gsk_...)"
            >
              <Cpu className={`w-3.5 h-3.5 ${isGroqActive ? "text-emerald-600 animate-pulse" : "text-wispr-stone"}`} />
              <span className="hidden md:inline">
                {isGroqActive ? "Groq Llama 3.3 Active" : "Connect Groq AI"}
              </span>
            </button>

            {currentView !== "studio" ? (
              <button
                onClick={() => setCurrentView("studio")}
                className="px-4 py-1.5 rounded-xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink font-semibold text-xs tactile-button flex items-center space-x-1.5"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentView("landing")}
                className="px-4 py-1.5 rounded-xl bg-white border border-wispr-border text-wispr-ink font-semibold text-xs hover:bg-wispr-ivory transition-colors"
              >
                View Landing
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Groq API Key Configuration Modal */}
      {showGroqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wispr-ink/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-md w-full rounded-3xl border border-wispr-border shadow-float p-6 space-y-4">
            
            <div className="flex items-center space-x-2.5 pb-2 border-b border-wispr-border">
              <div className="w-8 h-8 rounded-xl bg-wispr-green text-wispr-cream flex items-center justify-center">
                <Key className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-wispr-ink">
                  Connect Groq AI (console.groq.com)
                </h3>
                <p className="text-[11px] text-wispr-stone">
                  Supercharge FormFlow with ultra-fast Llama 3.3 inference.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveKey} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-wispr-ink block mb-1">
                  Your Groq API Key (starts with <code className="text-emerald-700">gsk_</code>)
                </label>
                <input
                  type="password"
                  placeholder="gsk_..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink font-mono focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                />
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-emerald-700 hover:underline mt-1 block"
                >
                  Get your free Groq API key here &rarr;
                </a>
              </div>

              <div>
                <label className="text-xs font-semibold text-wispr-ink block mb-1">
                  Active Groq Model
                </label>
                <select
                  value={tempModel}
                  onChange={(e) => setTempModel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-wispr-border text-xs text-wispr-ink bg-white focus:outline-none focus:ring-1 focus:ring-wispr-ink"
                >
                  {GROQ_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.latency})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowGroqModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-wispr-border text-xs font-medium text-wispr-ink hover:bg-wispr-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink text-xs font-bold tactile-button"
                >
                  Save & Activate
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
