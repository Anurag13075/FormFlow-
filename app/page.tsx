"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { FormViewer } from "@/components/FormViewer";
import { VoiceCapsule } from "@/components/VoiceCapsule";
import { VaultModal } from "@/components/VaultModal";
import { ClarificationModal } from "@/components/ClarificationModal";
import { SubmissionAudit } from "@/components/SubmissionAudit";
import { sampleForms } from "@/lib/sampleForms";
import { defaultUserPersona } from "@/lib/defaultVault";
import {
  FormDefinition,
  FormField,
  UserPersona,
  AgentState,
  FillingLogItem,
} from "@/lib/types";
import {
  generateFillPlan,
  VoiceRecognitionService,
  FillPlanStep,
} from "@/lib/voiceEngine";
import { sleep } from "@/lib/utils";
import { Sparkles, Mic, FileCheck, Shield, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function Home() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<"agent" | "vault" | "audit">("agent");
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isClarificationOpen, setIsClarificationOpen] = useState(false);

  // Data states
  const [vault, setVault] = useState<UserPersona>(defaultUserPersona);
  const [availableForms, setAvailableForms] = useState<FormDefinition[]>(sampleForms);
  const [activeFormId, setActiveFormId] = useState<string>("job-application");

  // Active form pointer
  const activeForm =
    availableForms.find((f) => f.id === activeFormId) || availableForms[0];

  // Voice & Agent execution states
  const [agentState, setAgentState] = useState<AgentState>("idle");
  const [transcript, setTranscript] = useState<string>("");
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [activeEvaluatingFieldId, setActiveEvaluatingFieldId] = useState<string | null>(null);
  const [logs, setLogs] = useState<FillingLogItem[]>([]);

  // Web speech service ref
  const voiceServiceRef = useRef<VoiceRecognitionService | null>(null);

  useEffect(() => {
    voiceServiceRef.current = new VoiceRecognitionService();
  }, []);

  // Handle switching active form
  const handleSelectForm = (id: string) => {
    setActiveFormId(id);
    setTranscript("");
    setActiveChip(null);
    setActiveEvaluatingFieldId(null);
  };

  // Field change handler
  const handleFieldChange = (fieldId: string, val: any) => {
    setAvailableForms((prev) =>
      prev.map((f) => {
        if (f.id !== activeFormId) return f;
        return {
          ...f,
          fields: f.fields.map((field) =>
            field.id === fieldId
              ? { ...field, value: val, status: "filled", filledReason: "Manual override" }
              : field
          ),
        };
      })
    );
  };

  // Reset current form to empty
  const handleResetForm = () => {
    setAvailableForms((prev) =>
      prev.map((f) => {
        if (f.id !== activeFormId) return f;
        return {
          ...f,
          fields: f.fields.map((field) => ({
            ...field,
            value: field.type === "slider" ? 0 : "",
            status: "empty",
            filledReason: undefined,
          })),
        };
      })
    );
    setTranscript("");
    setActiveChip(null);
    setActiveEvaluatingFieldId(null);
    setAgentState("idle");
  };

  // Start real browser microphone listening
  const handleStartListening = () => {
    if (!voiceServiceRef.current) return;
    setAgentState("listening");
    setActiveChip("Listening for your voice...");
    setTranscript("");

    voiceServiceRef.current.startListening(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim().length > 10) {
          handleStopListeningAndExecute(text);
        }
      },
      (err) => {
        console.warn("Speech error, falling back to simulated preset:", err);
        setActiveChip("Mic paused. Click 'Simulate Speech' for demo.");
        setAgentState("idle");
      }
    );
  };

  const handleStopListening = () => {
    if (voiceServiceRef.current) {
      voiceServiceRef.current.stopListening();
    }
    if (transcript.trim().length > 5) {
      executeAutonomousFilling(transcript);
    } else {
      setAgentState("idle");
      setActiveChip(null);
    }
  };

  const handleStopListeningAndExecute = (finalText: string) => {
    if (voiceServiceRef.current) {
      voiceServiceRef.current.stopListening();
    }
    executeAutonomousFilling(finalText);
  };

  // Trigger simulated voice preset (essential for hackathon video recording & quick testing)
  const handleTriggerPreset = () => {
    const promptText = activeForm.presetSpeechPrompt;
    setAgentState("listening");
    setActiveChip("Capturing vocal cadence...");
    setTranscript("");

    // Typewriter effect simulation for realistic demo speech
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 3;
      setTranscript(promptText.slice(0, currentIdx));
      if (currentIdx >= promptText.length) {
        clearInterval(interval);
        setTimeout(() => {
          executeAutonomousFilling(promptText);
        }, 600);
      }
    }, 20);
  };

  // The Autonomous Form Filling Pipeline
  const executeAutonomousFilling = async (spokenPrompt: string) => {
    setAgentState("inspecting");
    setActiveChip("Scanning form fields & DOM structure...");
    await sleep(700);

    setActiveChip("Querying Persona Vault & Documents...");
    await sleep(800);

    const plan = generateFillPlan(spokenPrompt, activeForm, vault);
    setAgentState("filling");

    for (let i = 0; i < plan.length; i++) {
      const step = plan[i];

      // Highlight field as evaluating
      setActiveEvaluatingFieldId(step.fieldId);
      setActiveChip(`Evaluating: "${step.fieldLabel}"`);

      // Gentle pause for realistic visual evaluation
      await sleep(350);

      // Apply the value to form
      setAvailableForms((prevForms) =>
        prevForms.map((f) => {
          if (f.id !== activeFormId) return f;
          return {
            ...f,
            fields: f.fields.map((field) => {
              if (field.id === step.fieldId) {
                return {
                  ...field,
                  value: step.value,
                  status: "filled",
                  filledReason: step.reason,
                };
              }
              return field;
            }),
          };
        })
      );

      // If attaching a file, show specific micro-chip
      if (step.fieldId.includes("resume") || step.fieldId.includes("receipt") || step.fieldId.includes("transcript")) {
        setActiveChip(`Attached file: "${step.value}" from Vault`);
        await sleep(300);
      }
    }

    setActiveEvaluatingFieldId(null);
    setAgentState("completed");
    setActiveChip("All fields completed & validated!");

    await sleep(800);
    setIsAuditOpen(true);
  };

  // Check if form is filled
  const isFilled = activeForm.fields.every(
    (f) => f.value !== "" && f.value !== false && f.status === "filled"
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === "vault") setIsVaultOpen(true);
        }}
        vaultDocCount={vault.documents.length}
        personaName={vault.name}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Editorial Hero Header (Inspired directly by Wispr Flow's landing aesthetic) */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-flow-border shadow-tactile text-xs font-semibold text-flow-ink">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>WeMakeDevs × Wispr Flow Hackathon</span>
            <span className="text-flow-stone">•</span>
            <span className="text-flow-green font-bold">#NoHandsChallenge</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-flow-ink leading-[1.15]">
            Don't type forms, <br />
            <span className="italic font-normal">just speak.</span>
          </h1>

          <p className="text-base sm:text-lg text-flow-ink-muted leading-relaxed font-sans max-w-2xl mx-auto">
            The voice-first agent that turns tedious job applications, expense claims, and official forms into clear, validated submissions in seconds. Powered by your local Persona Vault.
          </p>

          {/* Quick Metric Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-flow-ink-muted">
            <span className="px-3 py-1 rounded-full bg-flow-sand/50 border border-flow-border font-medium">
              ⚡ 4.2s Average Fill Time
            </span>
            <span className="px-3 py-1 rounded-full bg-flow-sand/50 border border-flow-border font-medium">
              📄 Verified Vault Documents Attached
            </span>
            <span className="px-3 py-1 rounded-full bg-flow-sand/50 border border-flow-border font-medium">
              🔒 Zero Cloud Storage Required
            </span>
          </div>

        </section>

        {/* Active Form Surface */}
        <FormViewer
          form={activeForm}
          availableForms={availableForms}
          activeFormId={activeFormId}
          onSelectForm={handleSelectForm}
          activeEvaluatingFieldId={activeEvaluatingFieldId}
          onFieldChange={handleFieldChange}
          onOpenAudit={() => setIsAuditOpen(true)}
          isFilled={isFilled}
        />

      </main>

      {/* Floating Wispr Voice Capsule Component */}
      <VoiceCapsule
        agentState={agentState}
        transcript={transcript}
        activeChip={activeChip}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
        onTriggerPreset={handleTriggerPreset}
        onResetForm={handleResetForm}
        presetText={activeForm.presetSpeechPrompt}
      />

      {/* Persona Vault Modal */}
      <VaultModal
        isOpen={isVaultOpen}
        onClose={() => {
          setIsVaultOpen(false);
          setActiveTab("agent");
        }}
        vault={vault}
        onUpdateVault={(updated) => setVault(updated)}
      />

      {/* Voice Clarification Interruption Modal */}
      <ClarificationModal
        isOpen={isClarificationOpen}
        question="Preferred Work Mode for this Role?"
        context="The employer accepts candidates in Bangalore or Fully Remote. Which would you prefer to declare?"
        options={["Remote (Anywhere)", "Hybrid (Bangalore)", "On-site (San Francisco)"]}
        onSelectOption={(opt) => {
          handleFieldChange("work_mode_preference", opt);
          setIsClarificationOpen(false);
        }}
        onSpokenAnswer={(ans) => {
          handleFieldChange("work_mode_preference", ans);
          setIsClarificationOpen(false);
        }}
      />

      {/* Submission & Audit Review Modal */}
      <SubmissionAudit
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        form={activeForm}
        onReset={handleResetForm}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-flow-border/70 py-6 text-center text-xs text-flow-stone">
        <p>
          FormFlow • Built for the WeMakeDevs × Wispr Flow Hackathon • Solo Builders Track
        </p>
      </footer>

    </div>
  );
}
