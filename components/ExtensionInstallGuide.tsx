"use client";

import React, { useState } from "react";
import { Chrome, Sparkles, FolderOpen, ArrowRight, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";

export const ExtensionInstallGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Hero card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-wispr-border shadow-tactile space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-wispr-green">
          <Chrome className="w-4 h-4" />
          <span>True Internet-Wide Form Automation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-wispr-ink">
          Fill Any Live Form Across the Entire Internet
        </h2>

        <p className="text-sm text-wispr-ink-muted leading-relaxed max-w-2xl">
          Not a sandbox. Not limited to any template. The <strong>FormFlow Chrome / Edge Extension</strong> runs directly inside your browser on <strong>Workday, Lever, Greenhouse, Tally, Google Forms, Typeform, college portals, or any website on the internet</strong>.
        </p>
      </div>

      {/* 3 Step Installation Walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Step 1 */}
        <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-sm space-y-3">
          <div className="w-8 h-8 rounded-full bg-wispr-sand text-wispr-ink font-bold text-xs flex items-center justify-center">
            1
          </div>
          <h4 className="font-semibold text-sm text-wispr-ink">
            Open Chrome Extensions
          </h4>
          <p className="text-xs text-wispr-ink-muted leading-relaxed">
            In Chrome or Edge, navigate to:
          </p>
          <code className="block p-2 rounded-xl bg-wispr-cream border border-wispr-border text-xs font-mono font-semibold text-emerald-800 select-all">
            chrome://extensions
          </code>
          <p className="text-[11px] text-wispr-stone">
            Toggle <strong>"Developer mode"</strong> ON in the top right corner.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-sm space-y-3">
          <div className="w-8 h-8 rounded-full bg-wispr-sand text-wispr-ink font-bold text-xs flex items-center justify-center">
            2
          </div>
          <h4 className="font-semibold text-sm text-wispr-ink">
            Click "Load Unpacked"
          </h4>
          <p className="text-xs text-wispr-ink-muted leading-relaxed">
            Click the <strong>Load unpacked</strong> button and select the extension folder directly inside this project:
          </p>
          <code className="block p-2 rounded-xl bg-wispr-cream border border-wispr-border text-xs font-mono font-semibold text-wispr-ink truncate select-all">
            whisp/extension
          </code>
        </div>

        {/* Step 3 */}
        <div className="p-6 bg-white rounded-3xl border border-wispr-border shadow-sm space-y-3">
          <div className="w-8 h-8 rounded-full bg-wispr-sand text-wispr-ink font-bold text-xs flex items-center justify-center">
            3
          </div>
          <h4 className="font-semibold text-sm text-wispr-ink">
            Open ANY Form on the Web
          </h4>
          <p className="text-xs text-wispr-ink-muted leading-relaxed">
            Navigate to <strong>any form on the web</strong> (e.g. <a href="https://tally.so/r/kdMWIZ" target="_blank" rel="noreferrer" className="text-wispr-green underline">tally.so/r/kdMWIZ</a>, Workday, or Lever).
          </p>
          <p className="text-[11px] text-wispr-stone">
            Click the FormFlow extension icon, hold your Wispr Flow key to dictate, and watch the page fill live!
          </p>
        </div>

      </div>

      {/* Feature Highlight Banner */}
      <div className="p-6 bg-wispr-sand/50 rounded-3xl border border-wispr-border space-y-3">
        <h4 className="font-serif text-lg font-bold text-wispr-ink flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Why this works on 100% of websites:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-wispr-ink-muted">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-wispr-green flex-shrink-0 mt-0.5" />
            <span><strong>React & Vue Synthetic Dispatchers:</strong> Emulates native browser inputs so modern reactive SPAs (Tally, Typeform) never clear your text.</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-wispr-green flex-shrink-0 mt-0.5" />
            <span><strong>Powered by Groq Llama 3.3:</strong> Reads every form's unique labels and maps your real verified vault credentials in sub-second latency.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
