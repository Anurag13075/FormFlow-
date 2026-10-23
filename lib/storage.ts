import { RealUserProfile } from "./types";

const STORAGE_KEY = "formflow_user_profile_v1";

export const initialRealUserProfile: RealUserProfile = {
  fullName: "Anurag Sharma",
  email: "anurag.sharma@example.com",
  phone: "+91 98765 43210",
  location: "Bangalore, Karnataka, India",
  linkedInUrl: "https://linkedin.com/in/anurag-dev",
  portfolioUrl: "https://anuragsharma.design",
  githubUrl: "https://github.com/anurag-code",
  currentTitle: "Full Stack Engineer & UI Architect",
  currentCompany: "HyperScale Tech",
  yearsOfExperience: 4,
  expectedSalary: "₹28,00,000 / year",
  noticePeriod: "15 Days",
  workAuthorization: "Authorized to work in India (Citizen)",
  educationInstitution: "National Institute of Technology",
  educationDegree: "B.Tech in Computer Science",
  educationGpa: "8.8 / 10.0",
  bankName: "HDFC Bank",
  bankAccount: "••••••••5519",
  bankIfsc: "HDFC0001248",
  resumeFileName: "Anurag_Sharma_Resume_2026.pdf",
  travelInvoiceFileName: "IndiGo_Flight_Tax_Invoice.pdf",
  keySkills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Voice AI"],
  careerHighlights:
    "Led core frontend redesign boosting user engagement by 40%. Specialized in fluid UI interactions and zero-latency tool-calling web architectures.",
};

export function loadUserProfile(): RealUserProfile {
  if (typeof window === "undefined") return initialRealUserProfile;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialRealUserProfile, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Failed to load user profile from storage", e);
  }
  return initialRealUserProfile;
}

export function saveUserProfile(profile: RealUserProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save user profile", e);
  }
}
