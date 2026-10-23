"use client";

import React, { useState } from "react";
import { Mic, HelpCircle, ArrowRight, Check, Sparkles } from "lucide-react";

interface ClarificationModalProps {
  isOpen: boolean;
  question: string;
  context: string;
  options: string[];
  onSelectOption: (option: string) => void;
  onSpokenAnswer: (answer: string) => void;
}

export const ClarificationModal: React.FC<ClarificationModalProps> = ({
  isOpen,
  question,
  context,
  options,
  onSelectOption,
  onSpokenAnswer,
}) => {
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const handleSimulateVoice = (answer: string) => {
    setIsListening(true);
    setSpokenText(answer);
    setTimeout(() => {
      setIsListening(false);
      onSpokenAnswer(answer);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-flow-ink/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl border border-flow-border shadow-float p-6 sm:p-7 relative overflow-hidden">
        
        {/* Subtle accent glow header */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-flow-lilac border border-flow-lilac-border text-flow-lilac-text text-xs font-semibold w-fit mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FormFlow Voice Clarification</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-flow-ink mb-1.5 leading-snug">
          {question}
        </h3>
        
        <p className="text-xs text-flow-ink-muted mb-5 leading-relaxed">
          {context}
        </p>

        {/* Options to click */}
        <div className="space-y-2 mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-flow-stone block">
            Select or speak an option:
          </span>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelectOption(opt)}
              className="w-full text-left p-3.5 rounded-2xl border border-flow-border bg-flow-cream/30 hover:bg-flow-cream hover:border-flow-ink/40 transition-all flex items-center justify-between text-xs font-semibold text-flow-ink group"
            >
              <span>{opt}</span>
              <ArrowRight className="w-4 h-4 text-flow-stone group-hover:text-flow-ink group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Spoken Quick Buttons */}
        <div className="pt-4 border-t border-flow-border flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-flow-ink-muted">
            <Mic className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Listening for spoken answer...</span>
          </div>

          <div className="flex space-x-1.5">
            <button
              onClick={() => handleSimulateVoice("Remote (Anywhere)")}
              className="px-3 py-1 rounded-full bg-flow-sand/60 hover:bg-flow-sand text-flow-ink text-[11px] font-medium"
            >
              Speak: "Remote"
            </button>
            <button
              onClick={() => handleSimulateVoice("Hybrid (Bangalore)")}
              className="px-3 py-1 rounded-full bg-flow-sand/60 hover:bg-flow-sand text-flow-ink text-[11px] font-medium"
            >
              Speak: "Hybrid"
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
