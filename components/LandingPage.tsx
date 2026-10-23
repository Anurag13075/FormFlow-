"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Globe, Zap, Mic, CheckCircle2, ChevronRight } from "lucide-react";

interface LandingPageProps {
  onLaunchStudio: () => void;
  onOpenVault: () => void;
  userName: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchStudio,
  onOpenVault,
  userName,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full bg-wispr-cream text-wispr-ink overflow-hidden">
      
      {/* Top Banner (Identical to Wispr Flow top emerald strip in screenshot #1) */}
      <div className="w-full bg-wispr-green text-wispr-cream py-2.5 px-4 text-center text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span>FormFlow for Wispr Flow #NoHandsChallenge is live on Windows and Mac.</span>
          <button
            onClick={onLaunchStudio}
            className="underline underline-offset-4 font-semibold hover:opacity-80 transition-opacity"
          >
            Launch Studio &rarr;
          </button>
        </div>
      </div>

      {/* Main Hero Container */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-32">
        
        {/* Rotating Circular Text Ribbon (Wispr screenshot #1 & #2 detail) */}
        <div className="hidden lg:block absolute left-4 top-24 pointer-events-none opacity-40 select-none">
          <svg className="w-48 h-48 animate-spin-slow" viewBox="0 0 200 200">
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              fill="none"
            />
            <text className="text-[10px] uppercase font-semibold tracking-widest fill-wispr-ink">
              <textPath href="#circlePath">
                • don't type forms • just speak • 4x faster with wispr flow •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-wispr-sand/60 border border-wispr-border text-xs font-semibold tracking-wider uppercase text-wispr-ink-muted">
            <span>Universal Voice Agent</span>
            <span>•</span>
            <span className="text-wispr-green font-bold">Wispr Flow Engine</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-wispr-ink leading-[1.05]">
            Don't type,  forms <br />
            <span className="italic font-normal">just speak them .</span>
          </h1>

          <p className="text-lg sm:text-xl text-wispr-ink-muted max-w-xl mx-auto font-sans leading-relaxed">
            The voice agent that turns natural speech into verified, completed job applications, reimbursements, and official forms on any website — 4x faster than you type.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onLaunchStudio}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink font-semibold text-sm tactile-button flex items-center justify-center space-x-2.5"
            >
              <span>Launch FormFlow Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVault}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-wispr-ivory text-wispr-ink font-semibold text-sm border border-wispr-border transition-colors flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-wispr-green" />
              <span>Real Vault: {userName}</span>
            </button>
          </div>

          <p className="text-xs text-wispr-stone pt-2">
            Works with the Wispr Flow desktop app or Web Speech. Drag bookmarklet to any live site.
          </p>

        </div>

        {/* Tilted Angled Speech Ribbon with Waveform Capsule (Matches Wispr screenshot #2) */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="w-full bg-wispr-ink text-wispr-cream p-4 sm:p-5 rounded-2xl shadow-float transform -rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 border border-black">
            
            {/* Waveform Capsule Pill */}
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/60 border border-white/20 flex-shrink-0">
              <div className="flex items-center space-x-1 h-6">
                {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3, 0.7].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full wave-bar-anim"
                    style={{ animationDelay: `${i * 0.12}s`, height: `${Math.floor(h * 22)}px` }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-300 ml-1">
                Wispr Flow Live
              </span>
            </div>

            {/* Spoken Text Stream */}
            <div className="flex-1 text-center sm:text-left overflow-hidden">
              <p className="text-xs sm:text-sm font-sans text-wispr-cream/90 truncate">
                "Apply to this role with my primary profile, set notice period to 15 days, emphasize voice systems, and attach my resume."
              </p>
            </div>

            {/* Result Tag */}
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              11 Fields Filled in 4.2s
            </span>

          </div>
        </div>

      </section>

      {/* 4x Faster Dark Emerald Section (From Wispr screenshot #3) */}
      <section className="w-full bg-wispr-green text-wispr-cream py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
              4x faster <span className="italic font-normal">than typing</span>
            </h2>
            <p className="text-sm sm:text-base text-wispr-cream/80 font-sans leading-relaxed">
              Voice that finally works on every web form. Speak naturally into your Wispr Flow desktop app, and watch forms fill with your verified data in real time.
            </p>
          </div>

          {/* Comparison Cards (Screenshot #3 replica) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Traditional Keyboard */}
            <div className="bg-wispr-green-surface rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-wispr-cream/60">
                  Manual Keyboard
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-bold mt-2">
                  45 <span className="text-xl font-sans font-normal opacity-70">wpm</span>
                </div>
                <p className="text-xs text-wispr-cream/70 mt-3 leading-relaxed">
                  Typing full name, copying address, re-writing the same bio, searching folders for PDF resumes, and fixing typos manually for 15 minutes.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-red-300 flex items-center space-x-1">
                <span>✕ High friction & mental fatigue</span>
              </div>
            </div>

            {/* Card 2: Wispr Flow + FormFlow */}
            <div className="bg-gradient-to-br from-wispr-green-surface to-wispr-green-dark rounded-3xl p-6 sm:p-8 border border-emerald-400/30 flex flex-col justify-between min-h-[220px] shadow-tactile relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-emerald-400 text-wispr-green font-bold text-[10px]">
                  WINNER
                </span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                  FormFlow × Wispr Flow
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2">
                  220 <span className="text-xl font-sans font-normal opacity-70">wpm</span>
                </div>
                <p className="text-xs text-wispr-cream/90 mt-3 leading-relaxed">
                  Hold your Wispr Flow hotkey, speak one conversational paragraph, and your real verified data fills all fields with corporate-polished answers instantly.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-emerald-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero typing • 100% accurate • Local sandbox</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* "Speak Naturally" 3-Feature Breakdown (Wispr screenshot #4) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Vertical Selector Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {[
              {
                title: "Speak naturally",
                desc: "Ramble, pause, or talk in casual Hinglish/slang. FormFlow polishes it into executive-level prose for any essay question.",
              },
              {
                title: "Works on any web form",
                desc: "Not locked to 3 forms. Paste any website URL, paste form HTML, or use our 1-click bookmarklet on Google Forms or Workday.",
              },
              {
                title: "Your real verified data",
                desc: "No mock arrays. Connect your real name, real contact, verified PDF resume, and bank details stored safely in localStorage.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeTab === idx
                    ? "bg-white border-wispr-ink shadow-tactile"
                    : "bg-transparent border-transparent hover:bg-wispr-sand/40"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-1.5 h-8 rounded-full transition-all ${
                      activeTab === idx ? "bg-wispr-orange" : "bg-wispr-border"
                    }`}
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-wispr-ink">{item.title}</h3>
                    <p className="text-xs text-wispr-ink-muted mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Visual Simulation Display (Screenshot #4 mockup) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-wispr-border p-6 sm:p-8 shadow-float relative">
            
            {/* Context Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-wispr-border/60">
              <span className="text-xs font-semibold text-wispr-ink">
                Live Dynamic Form Inspector
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-wispr-blush text-wispr-blush-text font-bold">
                Repetition identified & smoothed
              </span>
            </div>

            {/* Mock Chat / Form Input Box */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-wispr-ink block mb-1">
                  Target: "Why do you want to work here?"
                </label>
                <div className="p-4 rounded-xl bg-wispr-cream/60 border border-wispr-border text-xs text-wispr-ink leading-relaxed">
                  <span className="text-flow-stone line-through mr-2">
                    "Hey so um can you tell them that..."
                  </span>
                  <span className="font-medium text-wispr-green">
                    "With 4+ years leading fluid web engineering, I thrive in high-velocity teams shipping category-defining software. I want to bring this momentum to your design systems."
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2 text-xs text-wispr-stone">
                  <Mic className="w-3.5 h-3.5 text-wispr-green" />
                  <span>Spoken via Wispr Flow Desktop</span>
                </div>
                <button
                  onClick={onLaunchStudio}
                  className="px-4 py-2 rounded-xl bg-wispr-ink text-wispr-cream text-xs font-semibold hover:bg-black transition-colors"
                >
                  Test in Studio &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA (Wispr screenshot #5) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-wispr-sand/50 rounded-3xl border border-wispr-border p-8 sm:p-14 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wispr-ink">
            You have a way with words. <br />
            <span className="italic font-normal">Now, forms too.</span>
          </h2>
          <p className="text-sm sm:text-base text-wispr-ink-muted max-w-lg mx-auto">
            Stop wasting hours filling out forms. Speak naturally, keep your real data private, and let FormFlow handle the rest.
          </p>
          <button
            onClick={onLaunchStudio}
            className="px-8 py-4 rounded-2xl bg-wispr-lavender hover:bg-wispr-lavender-hover text-wispr-ink font-bold text-sm tactile-button inline-flex items-center space-x-2"
          >
            <span>Launch FormFlow Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
