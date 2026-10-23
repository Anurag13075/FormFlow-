"use client";

import React, { useState, useEffect } from "react";
import { Mic, Sparkles, Send, RotateCcw, Volume2, Command } from "lucide-react";

interface WisprCommandBarProps {
  onExecutePrompt: (promptText: string) => void;
  isProcessing: boolean;
  onResetForm: () => void;
  defaultPrompt: string;
}

export const WisprCommandBar: React.FC<WisprCommandBarProps> = ({
  onExecutePrompt,
  isProcessing,
  onResetForm,
  defaultPrompt,
}) => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Quick preset suggestions
  const presets = [
    {
      label: "Standard Application",
      text: "Apply to this role using my real profile. Set notice period to 15 days, highlight my experience in voice AI, and attach my verified resume.",
    },
    {
      label: "Spoken Hinglish / Slang",
      text: "Bhai tell them I have 4 years experience in React, I love high velocity teams, and set expected CTC to ₹30 LPA.",
    },
    {
      label: "Immediate Availability",
      text: "Submit with immediate start date, target salary 28 LPA, and attach my latest resume from my vault.",
    },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onExecutePrompt(inputText);
  };

  const handleSelectPreset = (text: string) => {
    setInputText(text);
    onExecutePrompt(text);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-wispr-border p-4 sm:p-6 shadow-tactile space-y-4">
      
      {/* Header instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-wispr-green text-wispr-cream flex items-center justify-center font-bold text-xs shadow-sm">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-wispr-ink flex items-center space-x-1.5">
              <span>Wispr Flow Dictation Target</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Native Desktop Ready
              </span>
            </h3>
            <p className="text-[11px] text-wispr-stone">
              Hold your Wispr Flow desktop shortcut, speak naturally, and watch real-time field synthesis.
            </p>
          </div>
        </div>

        <button
          onClick={onResetForm}
          className="text-[11px] font-semibold text-wispr-ink-muted hover:text-wispr-ink flex items-center space-x-1 self-start sm:self-auto px-2.5 py-1 rounded-lg border border-wispr-border hover:bg-wispr-cream transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Form Fields</span>
        </button>
      </div>

      {/* Main Wispr Dictation Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative rounded-2xl border transition-all duration-200 overflow-hidden ${
            isFocused
              ? "border-wispr-ink ring-2 ring-wispr-ink/10 bg-white"
              : "border-wispr-border bg-wispr-cream/50"
          }`}
        >
          <textarea
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Dictate with Wispr Flow here... e.g. 'Apply with my profile, set notice period to 15 days, emphasize my React velocity, and attach resume'..."
            className="w-full p-4 text-xs sm:text-sm text-wispr-ink placeholder:text-wispr-stone/70 bg-transparent focus:outline-none resize-none leading-relaxed"
          />

          {/* Action toolbar inside input */}
          <div className="flex items-center justify-between p-3 border-t border-wispr-border/50 bg-white/60">
            <div className="flex items-center space-x-2 text-[11px] text-wispr-stone">
              <span className="hidden sm:inline font-medium">Wispr Shortcut:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-wispr-sand/80 text-wispr-ink font-mono text-[10px] border border-wispr-border">
                Hold Hotkey & Speak
              </kbd>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="submit"
                disabled={!inputText.trim() || isProcessing}
                className="px-5 py-2 rounded-xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink text-xs font-bold tactile-button disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isProcessing ? "Synthesizing..." : "Execute with Wispr"}</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Spoken Preset Chips (Instant Click for Demo / Grading) */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-semibold text-wispr-stone">
          One-Click Spoken Presets:
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectPreset(p.text)}
            className="px-3 py-1 rounded-full bg-wispr-cream hover:bg-wispr-sand text-wispr-ink text-[11px] font-medium border border-wispr-border transition-colors truncate max-w-xs"
          >
            "{p.label}"
          </button>
        ))}
      </div>

    </div>
  );
};
