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

export type FieldStatus = "empty" | "evaluating" | "filled" | "verified";

export interface UniversalFormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  value: string | number | boolean;
  status: FieldStatus;
  filledReason?: string;
  section?: string;
}

export interface UniversalForm {
  id: string;
  title: string;
  originUrl?: string;
  category: string;
  fields: UniversalFormField[];
}

export interface RealUserProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  currentTitle: string;
  currentCompany: string;
  yearsOfExperience: number;
  expectedSalary: string;
  noticePeriod: string;
  workAuthorization: string;
  educationInstitution: string;
  educationDegree: string;
  educationGpa: string;
  bankName: string;
  bankAccount: string;
  bankIfsc: string;
  resumeFileName: string;
  travelInvoiceFileName: string;
  keySkills: string[];
  careerHighlights: string;
}
