"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Sparkles, Volume2, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { AgentState } from "@/lib/types";

interface VoiceCapsuleProps {
  agentState: AgentState;
  transcript: string;
  activeChip: string | null;
  onStartListening: () => void;
  onStopListening: () => void;
  onTriggerPreset: () => void;
  onResetForm: () => void;
  presetText: string;
}

export const VoiceCapsule: React.FC<VoiceCapsuleProps> = ({
  agentState,
  transcript,
  activeChip,
  onStartListening,
  onStopListening,
  onTriggerPreset,
  onResetForm,
  presetText,
}) => {
  const isListening = agentState === "listening";
  const isProcessing =
    agentState === "transcribing" ||
    agentState === "inspecting" ||
    agentState === "filling";

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex flex-col items-center justify-center pointer-events-none px-4">
      
      {/* Contextual Status Chip / Micro Pill (just like Wispr screenshot #3) */}
      {activeChip && (
        <div className="pointer-events-auto mb-2 animate-bounce transition-all">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-flow-lilac text-flow-lilac-text border border-flow-lilac-border text-xs font-semibold shadow-tactile">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
            <span>{activeChip}</span>
          </div>
        </div>
      )}

      {/* Spoken Transcript Bubble if listening or typing */}
      {(transcript || isListening) && (
        <div className="pointer-events-auto mb-3 max-w-xl w-full bg-white/95 border border-flow-border/90 rounded-2xl p-3 shadow-float backdrop-blur-md transition-all">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-flow-ink-muted uppercase tracking-wider mb-0.5">
                {isListening ? "Listening Live..." : "Voice Stream Captured"}
              </p>
              <p className="text-sm font-sans text-flow-ink font-normal leading-relaxed">
                {transcript || "Speak naturally about this form, your background, or custom instructions..."}
                {isListening && <span className="inline-block w-1.5 h-4 ml-1 bg-flow-ink animate-pulse align-middle" />}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Voice Capsule */}
      <div className="pointer-events-auto flex items-center space-x-3 bg-flow-ink text-flow-cream rounded-full px-4 py-2.5 shadow-capsule border border-flow-border-dark/60 backdrop-blur-lg transition-transform hover:scale-[1.01]">
        
        {/* Push to talk / Voice Toggle button */}
        <button
          onClick={isListening ? onStopListening : onStartListening}
          className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-flow-cream text-flow-ink hover:bg-white shadow-tactile"
          }`}
          title={isListening ? "Stop listening" : "Start speaking with your voice"}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          {isListening && (
            <span className="absolute -inset-1 rounded-full border-2 border-red-400/60 animate-ping" />
          )}
        </button>

        {/* Animated Audio Equalizer Bars (Wispr waveform aesthetic) */}
        <div className="flex items-center space-x-1 px-2 h-8">
          {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3, 0.7].map((heightScale, idx) => (
            <span
              key={idx}
              className={`w-1 rounded-full transition-all duration-150 ${
                isListening
                  ? "bg-emerald-400"
                  : isProcessing
                  ? "bg-amber-300"
                  : "bg-flow-cream/30"
              }`}
              style={{
                height: isListening
                  ? `${Math.max(6, Math.floor(26 * heightScale))}px`
                  : isProcessing
                  ? `${Math.max(4, Math.floor(18 * ((idx % 3) + 0.3)))}px`
                  : "6px",
                animation: isListening
                  ? `wave 1s ease-in-out infinite ${idx * 0.1}s`
                  : undefined,
              }}
            />
          ))}
        </div>

        {/* Status text */}
        <div className="hidden sm:flex flex-col pr-2">
          <span className="text-xs font-semibold text-flow-cream leading-tight">
            {isListening
              ? "Listening..."
              : isProcessing
              ? "FormFlow Synthesizing..."
              : "Hold key or Click to Speak"}
          </span>
          <span className="text-[10px] text-flow-cream/60 leading-tight">
            {isListening
              ? "Wispr Voice Recognition Active"
              : "Zero-typing autonomous form fill"}
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-white/20" />

        {/* Quick Demo Voice Preset Pill */}
        <button
          onClick={onTriggerPreset}
          disabled={isProcessing}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-flow-cream text-xs font-medium transition-colors border border-white/10 disabled:opacity-50"
          title="Simulate spoken prompt for demo / video recording"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Simulate Speech</span>
        </button>

        {/* Reset button */}
        <button
          onClick={onResetForm}
          className="p-1.5 rounded-full text-flow-cream/60 hover:text-flow-cream hover:bg-white/10 transition-colors"
          title="Reset form fields"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

      </div>

      {/* Sub-pill prompt teaser */}
      <div className="pointer-events-auto mt-2 hidden sm:flex items-center space-x-2 text-[11px] text-flow-ink-muted bg-flow-cream/80 px-3 py-0.5 rounded-full border border-flow-border/50">
        <span className="font-semibold text-flow-ink">Voice Example:</span>
        <span className="italic truncate max-w-md">"{presetText.slice(0, 75)}..."</span>
      </div>

    </div>
  );
};
