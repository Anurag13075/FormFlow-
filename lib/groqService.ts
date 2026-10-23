import { UniversalFormField, RealUserProfile } from "./types";

export const GROQ_MODELS = [
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (Recommended)", latency: "Ultra-fast" },
  { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant", latency: "Sub-second" },
  { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", latency: "Fast" },
];

export interface GroqFillRequest {
  apiKey: string;
  model?: string;
  spokenPrompt: string;
  fields: UniversalFormField[];
  userProfile: RealUserProfile;
}

export interface GroqFillResponse {
  filledFields: {
    id: string;
    value: string | number | boolean;
    reason: string;
  }[];
}

/**
 * Direct Client/Server Groq API caller using Llama 3.3 / Llama 3.1
 * Endpoint: https://api.groq.com/openai/v1/chat/completions
 */
export async function callGroqFormAgent({
  apiKey,
  model = "llama-3.3-70b-versatile",
  spokenPrompt,
  fields,
  userProfile,
}: GroqFillRequest): Promise<GroqFillResponse> {
  const cleanKey = apiKey?.trim();
  if (!cleanKey) {
    throw new Error("Groq API key (starting with gsk_) is required.");
  }

  const systemPrompt = `You are FormFlow, an autonomous real-time form-filling AI agent powered by Groq.
Your mission is to map any random form on the internet (e.g. Tally, Google Forms, Lever, Workday) to a user's real verified profile and spoken voice prompt.

USER PROFILE:
- Full Legal Name: ${userProfile.fullName}
- Email: ${userProfile.email}
- Phone: ${userProfile.phone}
- Location: ${userProfile.location}
- LinkedIn: ${userProfile.linkedInUrl}
- Portfolio/Website: ${userProfile.portfolioUrl}
- GitHub: ${userProfile.githubUrl}
- Current Title: ${userProfile.currentTitle}
- Current Company: ${userProfile.currentCompany}
- Experience: ${userProfile.yearsOfExperience} years
- Expected Salary: ${userProfile.expectedSalary}
- Notice Period: ${userProfile.noticePeriod}
- Resume Document Name: ${userProfile.resumeFileName}
- Key Skills: ${userProfile.keySkills.join(", ")}
- Career Highlights: ${userProfile.careerHighlights}

INSTRUCTIONS:
1. Review the list of form fields and the user's spoken voice prompt.
2. For open-ended questions (e.g. 'Why this company?', 'Which position?', 'Cover letter'), synthesize a polished, executive-level response using the user's real experience and their spoken directive.
3. If the user spoke in casual English or Hinglish/slang, polish it into professional corporate language.
4. Output strict JSON matching the schema:
{
  "filledFields": [
    {
      "id": "field_id_from_input",
      "value": "synthesized or mapped value",
      "reason": "short explanation of provenance"
    }
  ]
}`;

  const userContent = JSON.stringify({
    spokenVoicePrompt: spokenPrompt || "Apply to this role with my primary profile and attach resume.",
    formFieldsToFill: fields.map((f) => ({
      id: f.id,
      name: f.name || f.id,
      label: f.label,
      type: f.type,
      placeholder: f.placeholder,
      options: f.options,
    })),
  });

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cleanKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No response received from Groq AI model.");
  }

  const parsed: GroqFillResponse = JSON.parse(content);
  return parsed;
}
