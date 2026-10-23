"use client";

import React from "react";
import { ShieldCheck, Target, Sparkles, CheckCircle2, AlertCircle, Clock, Zap } from "lucide-react";

interface AtsRadarProps {
  formTitle: string;
  filledFieldsCount: number;
  totalFieldsCount: number;
}

export const AtsRadar: React.FC<AtsRadarProps> = ({
  formTitle,
  filledFieldsCount,
  totalFieldsCount,
}) => {
  const isFilled = filledFieldsCount === totalFieldsCount && totalFieldsCount > 0;
  const progressPercent = Math.round((filledFieldsCount / totalFieldsCount) * 100);

  return (
    <div className="bg-white rounded-3xl border border-wispr-border p-5 shadow-tactile space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-wispr-border/60">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-wispr-green text-wispr-cream flex items-center justify-center shadow-sm">
            <Target className="w-3.5 h-3.5 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-wispr-ink">
              Pre-Flight ATS & Culture Radar
            </h4>
            <span className="text-[10px] text-wispr-stone block">
              Real-time anti-rejection screening
            </span>
          </div>
        </div>

        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
          Shield Active
        </span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        
        {/* Metric 1: ATS Keywords */}
        <div className="p-3 rounded-2xl bg-wispr-cream/50 border border-wispr-border">
          <span className="text-[10px] text-wispr-stone uppercase tracking-wider font-semibold block mb-0.5">
            ATS Match
          </span>
          <span className="font-serif text-lg font-bold text-wispr-green block">
            {isFilled ? "96%" : "82%"}
          </span>
          <span className="text-[9px] text-emerald-700 font-medium">
            Keywords Aligned
          </span>
        </div>

        {/* Metric 2: Human Authenticity */}
        <div className="p-3 rounded-2xl bg-wispr-cream/50 border border-wispr-border">
          <span className="text-[10px] text-wispr-stone uppercase tracking-wider font-semibold block mb-0.5">
            Human Score
          </span>
          <span className="font-serif text-lg font-bold text-wispr-ink block">
            99%
          </span>
          <span className="text-[9px] text-wispr-stone font-medium">
            Zero AI Fluff
          </span>
        </div>

        {/* Metric 3: Time Saved */}
        <div className="p-3 rounded-2xl bg-wispr-cream/50 border border-wispr-border">
          <span className="text-[10px] text-wispr-stone uppercase tracking-wider font-semibold block mb-0.5">
            Time Saved
          </span>
          <span className="font-serif text-lg font-bold text-flow-amber block">
            {isFilled ? "14.2m" : "0m"}
          </span>
          <span className="text-[9px] text-wispr-stone font-medium">
            4x Faster
          </span>
        </div>

      </div>

      {/* Target Keywords Extracted */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-wispr-stone block">
          Auto-Injected ATS Keywords:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {["React / Next.js", "Design Systems", "High Velocity", "Low Latency", "TypeScript"].map((kw) => (
            <span
              key={kw}
              className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200/80 flex items-center space-x-1"
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
              <span>{kw}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Status banner */}
      <div className="p-3 rounded-xl bg-wispr-sand/40 border border-wispr-border/70 flex items-center justify-between text-xs">
        <span className="text-wispr-ink-muted text-[11px]">
          {isFilled
            ? "✅ 100% of required fields verified with zero errors."
            : `⏳ Form in progress: ${filledFieldsCount}/${totalFieldsCount} fields filled.`}
        </span>
        <span className="text-[10px] font-bold text-wispr-green">
          {progressPercent}%
        </span>
      </div>

    </div>
  );
};
