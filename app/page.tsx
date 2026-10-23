"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { WisprCommandBar } from "@/components/WisprCommandBar";
import { UniversalFormScanner } from "@/components/UniversalFormScanner";
import { RealProfileVault } from "@/components/RealProfileVault";
import { BookmarkletGuide } from "@/components/BookmarkletGuide";
import { ExtensionInstallGuide } from "@/components/ExtensionInstallGuide";
import { SubmissionAudit } from "@/components/SubmissionAudit";
import { AtsRadar } from "@/components/AtsRadar";
import { SpokenPdfGenerator } from "@/components/SpokenPdfGenerator";
import { UniversalForm, UniversalFormField, RealUserProfile } from "@/lib/types";
import { loadUserProfile, saveUserProfile, initialRealUserProfile } from "@/lib/storage";
import { createTallyJobForm, matchFieldToRealUser } from "@/lib/universalParser";
import { callGroqFormAgent } from "@/lib/groqService";
import { sleep } from "@/lib/utils";
import confetti from "canvas-confetti";

export default function Home() {
  // Navigation View: "landing" | "studio" | "vault" | "extension" | "bookmarklet"
  const [currentView, setCurrentView] = useState<"landing" | "studio" | "vault" | "extension" | "bookmarklet">("studio");

  // Real user profile stored in localStorage
  const [userProfile, setUserProfile] = useState<RealUserProfile>(initialRealUserProfile);

  // Active Universal Form initialized to Tally Job Application (kdMWIZ)
  const [activeForm, setActiveForm] = useState<UniversalForm>(createTallyJobForm());

  // Groq API Key and Model state
  const [groqApiKey, setGroqApiKey] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("llama-3.3-70b-versatile");

  // Real-time execution states
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeEvaluatingFieldId, setActiveEvaluatingFieldId] = useState<string | null>(null);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  // Load real profile and Groq API key from localStorage on mount
  useEffect(() => {
    const loaded = loadUserProfile();
    setUserProfile(loaded);

    try {
      const savedKey = localStorage.getItem("formflow_groq_key");
      if (savedKey) setGroqApiKey(savedKey);
      const savedModel = localStorage.getItem("formflow_groq_model");
      if (savedModel) setSelectedModel(savedModel);
    } catch (e) {}
  }, []);

  const handleSaveGroqApiKey = (key: string, model: string) => {
    setGroqApiKey(key);
    setSelectedModel(model);
    try {
      localStorage.setItem("formflow_groq_key", key);
      localStorage.setItem("formflow_groq_model", model);
    } catch (e) {}
  };

  // Update field value manually
  const handleFieldChange = (fieldId: string, val: any) => {
    setActiveForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === fieldId
          ? { ...f, value: val, status: "filled", filledReason: "Manual override" }
          : f
      ),
    }));
  };

  // Reset active form to empty
  const handleResetForm = () => {
    setActiveForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => ({
        ...f,
        value: "",
        status: "empty",
        filledReason: undefined,
      })),
    }));
    setActiveEvaluatingFieldId(null);
    setIsProcessing(false);
  };

  // Execute Wispr Dictated Prompt using Groq AI Llama 3.3 (or fallback)
  const handleExecutePrompt = async (promptText: string) => {
    setIsProcessing(true);

    let groqResultsMap: Record<string, { value: any; reason: string }> = {};

    // 1. If Groq API Key exists, call Groq Llama 3.3
    if (groqApiKey && groqApiKey.startsWith("gsk_")) {
      try {
        const groqResp = await callGroqFormAgent({
          apiKey: groqApiKey,
          model: selectedModel,
          spokenPrompt: promptText,
          fields: activeForm.fields,
          userProfile: userProfile,
        });

        groqResp.filledFields?.forEach((item) => {
          groqResultsMap[item.id] = {
            value: item.value,
            reason: item.reason || "Synthesized by Groq Llama 3.3",
          };
        });
      } catch (err) {
        console.warn("Groq API error, falling back to local synthesizer:", err);
      }
    }

    // 2. Animate filling through each field
    for (let i = 0; i < activeForm.fields.length; i++) {
      const field = activeForm.fields[i];

      // Highlight active evaluating field with amber ring
      setActiveEvaluatingFieldId(field.id);
      await sleep(260);

      // Use Groq result if available, otherwise use local matcher
      const groqVal = groqResultsMap[field.id];
      const result = groqVal || matchFieldToRealUser(field, userProfile, promptText);

      // Apply result
      setActiveForm((prev) => ({
        ...prev,
        fields: prev.fields.map((f) =>
          f.id === field.id
            ? { ...f, value: result.value, status: "filled", filledReason: result.reason }
            : f
        ),
      }));

      await sleep(180);
    }

    setActiveEvaluatingFieldId(null);
    setIsProcessing(false);

    // Trigger celebration & open audit summary
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#154032", "#DDD0F7", "#FCD5E2", "#141413"],
    });

    await sleep(600);
    setIsAuditOpen(true);
  };

  const filledFieldsCount = activeForm.fields.filter(
    (f) => f.value !== "" && f.value !== false && f.status === "filled"
  ).length;

  return (
    <div className="min-h-screen bg-wispr-cream text-wispr-ink flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userName={userProfile.fullName}
        groqApiKey={groqApiKey}
        onSaveGroqApiKey={handleSaveGroqApiKey}
        selectedModel={selectedModel}
      />

      {/* View 1: Beautiful Wispr Flow Style Landing Page */}
      {currentView === "landing" && (
        <LandingPage
          onLaunchStudio={() => setCurrentView("studio")}
          onOpenVault={() => setCurrentView("vault")}
          userName={userProfile.fullName}
        />
      )}

      {/* View 2: FormFlow Studio (Works on Any Form + Wispr Flow Command Bar) */}
      {currentView === "studio" && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Wispr Flow Dictation Target Bar */}
          <WisprCommandBar
            onExecutePrompt={handleExecutePrompt}
            isProcessing={isProcessing}
            onResetForm={handleResetForm}
            defaultPrompt="Apply to this role with my primary profile, set notice period to 15 days, emphasize voice systems, and attach my resume."
          />

          {/* Pre-Flight ATS & Culture Radar */}
          <AtsRadar
            formTitle={activeForm.title}
            filledFieldsCount={filledFieldsCount}
            totalFieldsCount={activeForm.fields.length}
          />

          {/* Spoken 1-Page PDF Generator */}
          <SpokenPdfGenerator
            userProfile={userProfile}
            formTitle={activeForm.title}
            onAttachGeneratedPdf={(pdfName) => {
              setActiveForm((prev) => ({
                ...prev,
                fields: prev.fields.map((f) =>
                  f.type === "file" || f.id.includes("resume")
                    ? {
                        ...f,
                        value: pdfName,
                        status: "filled",
                        filledReason: "Generated & attached by FormFlow PDF Synthesizer",
                      }
                    : f
                ),
              }));
            }}
          />

          {/* Universal Form Scanner (Supports Tally.so kdMWIZ, Google Forms, & any URL) */}
          <UniversalFormScanner
            activeForm={activeForm}
            onSetForm={setActiveForm}
            activeEvaluatingFieldId={activeEvaluatingFieldId}
            onFieldChange={handleFieldChange}
            onSubmitForm={() => setIsAuditOpen(true)}
          />

        </main>
      )}

      {/* View 3: Real User Profile & Document Vault (User's Actual Data) */}
      {currentView === "vault" && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <RealProfileVault
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
          />
        </main>
      )}

      {/* View 4: Universal Chrome / Edge Extension (Works on ANY Webpage on the Internet) */}
      {currentView === "extension" && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <ExtensionInstallGuide />
        </main>
      )}

      {/* View 5: Universal Bookmarklet (Runs directly on tally.so or any live website) */}
      {currentView === "bookmarklet" && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <BookmarkletGuide />
        </main>
      )}

      {/* Submission Audit Modal */}
      <SubmissionAudit
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        form={{
          id: activeForm.id,
          title: activeForm.title,
          subtitle: activeForm.category,
          category: "Career",
          estimatedTime: "12 mins manual",
          sections: ["All Fields"],
          fields: activeForm.fields as any,
          presetSpeechPrompt: "",
          speechSummary: "",
        }}
        onReset={handleResetForm}
      />

      {/* Minimalist Wispr Footer */}
      <footer className="border-t border-wispr-border py-8 text-center text-xs text-wispr-stone bg-wispr-cream">
        <p className="max-w-xl mx-auto">
          FormFlow for Wispr Flow #NoHandsChallenge • Powered by Groq AI (Llama 3.3) & Wispr Voice • Zero cloud storage
        </p>
      </footer>

    </div>
  );
}
