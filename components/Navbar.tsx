"use client";

import React from "react";
import { Sparkles, ShieldCheck, Globe, Bookmark, ArrowRight } from "lucide-react";

interface NavbarProps {
  currentView: "landing" | "studio" | "vault" | "bookmarklet";
  setCurrentView: (view: "landing" | "studio" | "vault" | "bookmarklet") => void;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userName,
}) => {
  return (
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

        {/* Right CTA / Status */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          <button
            onClick={() => setCurrentView("vault")}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-wispr-border text-xs text-wispr-ink hover:bg-wispr-ivory transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-wispr-stone font-medium">User:</span>
            <span className="font-semibold text-wispr-ink truncate max-w-[100px]">
              {userName}
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
  );
};
