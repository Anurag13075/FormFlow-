export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "file"
  | "slider"
  | "checkbox";

export type FieldStatus = "empty" | "evaluating" | "filled" | "ambiguous";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  section?: string;
  value: string | number | boolean;
  status: FieldStatus;
  filledReason?: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface FormDefinition {
  id: string;
  title: string;
  subtitle: string;
  category: "Career" | "Finance & Travel" | "Education & Grant";
  estimatedTime: string;
  sections: string[];
  fields: FormField[];
  presetSpeechPrompt: string;
  speechSummary: string;
}

export interface VaultDocument {
  id: string;
  name: string;
  category: "Resume" | "Invoice" | "ID Card" | "Transcript";
  size: string;
  lastUpdated: string;
  verified: boolean;
}

export interface UserPersona {
  id: string;
  name: string;
  preferredName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  github: string;
  currentEmployer: string;
  experienceYears: number;
  expectedSalary: string;
  noticePeriod: string;
  workAuthorization: string;
  education: {
    institution: string;
    degree: string;
    graduationYear: string;
    gpa: string;
  };
  summary: string;
  keySkills: string[];
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscOrRouting: string;
    accountHolder: string;
  };
  documents: VaultDocument[];
}

export type AgentState =
  | "idle"
  | "listening"
  | "transcribing"
  | "inspecting"
  | "filling"
  | "clarifying"
  | "completed";

export interface ClarificationRequest {
  id: string;
  fieldId: string;
  question: string;
  context: string;
  options: string[];
}

export interface FillingLogItem {
  id: string;
  timestamp: string;
  fieldId?: string;
  fieldLabel?: string;
  message: string;
  type: "scan" | "match" | "fill" | "clarify" | "attach";
}
