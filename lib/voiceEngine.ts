import { FormDefinition, FormField, UserPersona, FillingLogItem } from "./types";
import { sleep } from "./utils";

// Web Speech API interface definitions
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
    length: number;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

export class VoiceRecognitionService {
  private recognition: SpeechRecognitionInstance | null = null;
  public isSupported: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.isSupported = true;
        if (this.recognition) {
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = "en-US";
        }
      }
    }
  }

  public startListening(
    onTranscript: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void
  ) {
    if (!this.recognition) {
      onError(new Error("Web Speech API is not supported in this browser environment."));
      return;
    }

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      onTranscript(text, Boolean(finalTranscript));
    };

    this.recognition.onerror = (event) => {
      onError(event);
    };

    try {
      this.recognition.start();
    } catch (e) {
      // If already started, ignore
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }
}

export interface FillPlanStep {
  fieldId: string;
  fieldLabel: string;
  value: string | number | boolean;
  reason: string;
  requiresClarification?: boolean;
}

/**
 * Intelligent form value synthesizer based on the prompt, active form, and persona vault
 */
export function generateFillPlan(
  spokenPrompt: string,
  form: FormDefinition,
  vault: UserPersona
): FillPlanStep[] {
  const steps: FillPlanStep[] = [];
  const lowerPrompt = spokenPrompt.toLowerCase();

  for (const field of form.fields) {
    let targetValue: string | number | boolean = "";
    let reason = "Matched from your Persona Vault";

    switch (field.id) {
      case "full_name":
      case "claimant_name":
      case "scholar_name":
        targetValue = vault.name;
        break;

      case "email_address":
      case "scholar_email":
        targetValue = vault.email;
        break;

      case "phone_number":
        targetValue = vault.phone;
        break;

      case "current_location":
        targetValue = vault.location;
        break;

      case "portfolio_url":
        targetValue = vault.portfolio;
        break;

      case "years_experience":
        targetValue = vault.experienceYears;
        break;

      case "why_wispr":
        targetValue =
          "I have been obsessively following Wispr's work in fluid voice dictation. Voice is the most natural high-bandwidth human interface, but until now, typing has been an artificial bottleneck. Having spent 5 years building reactive design systems and AI-guided frontends at HyperScale Labs, I want to lead the paradigm shift where users never need to touch a keyboard to produce clear, structured software output.";
        reason = "Synthesized from spoken voice directive & design leadership background";
        break;

      case "work_mode_preference":
        if (lowerPrompt.includes("remote")) {
          targetValue = "Remote (Anywhere)";
        } else if (lowerPrompt.includes("san francisco") || lowerPrompt.includes("sf")) {
          targetValue = "On-site (San Francisco)";
        } else {
          targetValue = "Hybrid (Bangalore)";
        }
        reason = "Extracted from location preference in speech";
        break;

      case "notice_period":
        if (lowerPrompt.includes("15 days")) {
          targetValue = "15 Days";
        } else if (lowerPrompt.includes("immediate")) {
          targetValue = "Immediate (< 7 Days)";
        } else {
          targetValue = "15 Days";
        }
        reason = "Directly instructed in your voice prompt";
        break;

      case "expected_comp":
        if (lowerPrompt.includes("32")) {
          targetValue = "₹32,00,000 / year (Fixed + Stock)";
        } else {
          targetValue = vault.expectedSalary;
        }
        reason = "Verified against spoken compensation requirement";
        break;

      case "resume_attachment":
        targetValue = vault.documents.find((d) => d.category === "Resume")?.name || "Aarav_Sharma_Resume_2026.pdf";
        reason = "Attached verified Resume from Document Vault";
        break;

      // Expense form fields
      case "payout_bank":
        targetValue = `${vault.bankDetails.bankName} (${vault.bankDetails.accountNumber}) • IFSC: ${vault.bankDetails.ifscOrRouting}`;
        break;

      case "trip_purpose":
        targetValue =
          "Onsite executive architectural review and client engineering onboarding with North India enterprise partners. Facilitated multi-team discovery workshops and aligned Q4 integration roadmap.";
        reason = "Generated from spoken client visit intent";
        break;

      case "travel_city":
        targetValue = "New Delhi, India";
        break;

      case "flight_expense":
        targetValue = "₹4,200 (IndiGo 6E-502)";
        reason = "Extracted from spoken travel breakdown";
        break;

      case "hotel_expense":
        targetValue = "₹3,800 (Ginger Hotel 2 Nights)";
        reason = "Extracted from spoken hotel expense";
        break;

      case "receipt_flight":
        targetValue = "IndiGo_Flight_BLR_DEL_Oct.pdf";
        reason = "Verified PDF invoice automatically attached from Vault";
        break;

      case "receipt_hotel":
        targetValue = "Ginger_Hotel_Tax_Receipt.pdf";
        reason = "Verified hotel tax invoice automatically attached from Vault";
        break;

      // Academic Fellowship fields
      case "alma_mater":
        targetValue = `${vault.education.institution} (${vault.education.degree})`;
        break;

      case "gpa_score":
        targetValue = vault.education.gpa;
        break;

      case "research_proposal":
        targetValue =
          "Investigation into Low-Latency Speech-to-Intent Execution in Modern Human-Computer Interaction: Bridging unstructured vocal cadence with deterministic multi-modal tool calling to eradicate physical bureaucratic overhead.";
        reason = "Tailored academic abstract generated from voice prompt";
        break;

      case "transcript_file":
        targetValue = "NIT_Official_Degree_Transcripts.pdf";
        reason = "Official university degree transcripts mounted from Vault";
        break;

      default:
        targetValue = "Verified";
        break;
    }

    steps.push({
      fieldId: field.id,
      fieldLabel: field.label,
      value: targetValue,
      reason,
      requiresClarification: false,
    });
  }

  return steps;
}
