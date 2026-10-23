"use client";

import React, { useState } from "react";
import { getUniversalBookmarkletCode } from "@/lib/universalParser";
import { Bookmark, Sparkles, Copy, Check, ExternalLink, ShieldCheck } from "lucide-react";

export const BookmarkletGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const bookmarkletCode = getUniversalBookmarkletCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Header */}
      <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-tactile space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-wispr-green">
          <Bookmark className="w-4 h-4" />
          <span>Universal Browser Companion</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-wispr-ink">
          Fill Any Live Form Across the Internet
        </h2>
        <p className="text-sm text-wispr-ink-muted leading-relaxed">
          FormFlow is not confined to this web page. You can execute FormFlow directly on Google Forms, Workday, Lever, Greenhouse, or any government portal on the web using our 1-click Bookmarklet.
        </p>
      </div>

      {/* The Draggable Bookmarklet Tool */}
      <div className="p-8 bg-gradient-to-br from-wispr-sand/50 to-white rounded-3xl border-2 border-dashed border-wispr-ink/30 text-center space-y-4">
        
        <span className="text-xs font-semibold text-wispr-stone uppercase tracking-wider block">
          Step 1: Drag this button to your Bookmarks Bar
        </span>

        {/* Draggable Anchor */}
        <div className="inline-block">
          <a
            href={bookmarkletCode}
            onClick={(e) => {
              e.preventDefault();
              alert("Drag this button to your browser bookmarks bar (Ctrl+Shift+B / Cmd+Shift+B)!");
            }}
            className="px-6 py-3.5 rounded-2xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink font-bold text-sm tactile-button inline-flex items-center space-x-2 cursor-grab active:cursor-grabbing select-none"
            title="Drag to your bookmarks bar"
          >
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>⚡ FormFlow Voice</span>
          </a>
        </div>

        <p className="text-xs text-wispr-stone max-w-md mx-auto">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-wispr-border font-mono text-[11px]">Ctrl + Shift + B</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-white border border-wispr-border font-mono text-[11px]">Cmd + Shift + B</kbd>) to toggle your browser bookmarks bar if it is hidden.
        </p>
      </div>

      {/* Step by Step Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-wispr-border shadow-sm space-y-2">
          <span className="w-6 h-6 rounded-full bg-wispr-sand text-wispr-ink text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h4 className="font-semibold text-xs text-wispr-ink">
            Navigate to Any Form
          </h4>
          <p className="text-[11px] text-wispr-ink-muted leading-relaxed">
            Open any job post on Lever, a Google Form questionnaire, or a company reimbursement portal.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-wispr-border shadow-sm space-y-2">
          <span className="w-6 h-6 rounded-full bg-wispr-sand text-wispr-ink text-xs font-bold flex items-center justify-center">
            2
          </span>
          <h4 className="font-semibold text-xs text-wispr-ink">
            Click "⚡ FormFlow Voice"
          </h4>
          <p className="text-[11px] text-wispr-ink-muted leading-relaxed">
            Click the bookmarklet from your bar. FormFlow inspects all input elements on that active webpage instantly.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-wispr-border shadow-sm space-y-2">
          <span className="w-6 h-6 rounded-full bg-wispr-sand text-wispr-ink text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h4 className="font-semibold text-xs text-wispr-ink">
            Dictate with Wispr Flow
          </h4>
          <p className="text-[11px] text-wispr-ink-muted leading-relaxed">
            Hold your Wispr Flow desktop shortcut, speak your thoughts, and watch the fields populate right on the live page!
          </p>
        </div>
      </div>

      {/* Copy Raw Bookmarklet Code */}
      <div className="p-5 bg-white rounded-2xl border border-wispr-border flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-wispr-ink block">
            Manual Bookmarklet Code
          </span>
          <span className="text-[11px] text-wispr-stone block">
            If drag-and-drop is disabled, create a bookmark manually and paste this URL.
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl border border-wispr-border text-xs font-semibold text-wispr-ink hover:bg-wispr-cream flex items-center space-x-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied JS Code!" : "Copy Code"}</span>
        </button>
      </div>

    </div>
  );
};
