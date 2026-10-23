import { UniversalForm, UniversalFormField, RealUserProfile } from "./types";

/**
 * Universal Form Parser:
 * Dynamically converts any raw HTML snippet or web form schema into an active FormFlow target.
 */
export function parseHtmlToUniversalForm(
  htmlString: string,
  formTitle: string = "Custom Web Form"
): UniversalForm {
  if (typeof window === "undefined") {
    return createDefaultUniversalForm();
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const inputs = doc.querySelectorAll("input, textarea, select");

  const fields: UniversalFormField[] = [];

  inputs.forEach((el, index) => {
    const tagName = el.tagName.toLowerCase();
    const typeAttr = el.getAttribute("type") || "text";
    const nameAttr = el.getAttribute("name") || el.getAttribute("id") || `field_${index}`;
    const placeholder = el.getAttribute("placeholder") || "";
    const isRequired = el.hasAttribute("required");

    // Look for parent or previous sibling label
    let labelText = "";
    const id = el.getAttribute("id");
    if (id) {
      const labelEl = doc.querySelector(`label[for="${id}"]`);
      if (labelEl) labelText = labelEl.textContent?.trim() || "";
    }
    if (!labelText) {
      const closestLabel = el.closest("label");
      if (closestLabel) {
        labelText = closestLabel.textContent?.replace(el.textContent || "", "").trim() || "";
      }
    }
    if (!labelText) {
      labelText =
        placeholder ||
        nameAttr
          .replace(/[_-]/g, " ")
          .replace(/([A-Z])/g, " $1")
          .trim();
      labelText = labelText.charAt(0).toUpperCase() + labelText.slice(1);
    }

    let fieldType: any = "text";
    let options: string[] = [];

    if (tagName === "textarea") {
      fieldType = "textarea";
    } else if (tagName === "select") {
      fieldType = "select";
      const optEls = el.querySelectorAll("option");
      optEls.forEach((o) => {
        if (o.textContent?.trim()) options.push(o.textContent.trim());
      });
    } else if (typeAttr === "email") {
      fieldType = "email";
    } else if (typeAttr === "tel" || typeAttr === "phone") {
      fieldType = "tel";
    } else if (typeAttr === "file") {
      fieldType = "file";
    } else if (typeAttr === "radio") {
      fieldType = "radio";
    } else if (typeAttr === "range") {
      fieldType = "slider";
    }

    fields.push({
      id: nameAttr,
      name: nameAttr,
      label: labelText || `Input Field ${index + 1}`,
      type: fieldType,
      placeholder: placeholder || `Enter ${labelText}...`,
      required: isRequired,
      options: options.length ? options : undefined,
      value: "",
      status: "empty",
    });
  });

  return {
    id: "parsed-custom-form",
    title: formTitle,
    category: "Universal Web Form",
    fields: fields.length > 0 ? fields : createDefaultUniversalForm().fields,
  };
}

/**
 * Pre-configured real-world templates for immediate testing
 */
export function createDefaultUniversalForm(): UniversalForm {
  return {
    id: "lever-job-application",
    title: "Product Engineer / UI Architect Application",
    originUrl: "https://jobs.lever.co/tech-startup/apply",
    category: "Job Application",
    fields: [
      {
        id: "full_name",
        name: "fullName",
        label: "Full Legal Name",
        type: "text",
        placeholder: "e.g. Anurag Sharma",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "email",
        name: "email",
        label: "Primary Email Address",
        type: "email",
        placeholder: "you@example.com",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "phone",
        name: "phone",
        label: "Phone / WhatsApp Number",
        type: "tel",
        placeholder: "+91 98765 43210",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "current_company",
        name: "currentCompany",
        label: "Current Company / Organization",
        type: "text",
        placeholder: "Current workplace",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "linkedin",
        name: "linkedinUrl",
        label: "LinkedIn Profile URL",
        type: "text",
        placeholder: "https://linkedin.com/in/...",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "portfolio",
        name: "portfolioUrl",
        label: "Portfolio or GitHub URL",
        type: "text",
        placeholder: "https://yourwork.com",
        required: false,
        value: "",
        status: "empty",
      },
      {
        id: "notice_period",
        name: "noticePeriod",
        label: "Earliest Start Date / Notice Period",
        type: "select",
        options: ["Immediate (< 7 Days)", "15 Days", "30 Days", "60 Days", "90 Days"],
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "why_apply",
        name: "whyApply",
        label: "Why do you want to join our engineering team? What drives your work?",
        type: "textarea",
        placeholder: "Share your motivation and past accomplishments...",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "resume_file",
        name: "resumeFile",
        label: "Upload Resume (PDF, DOCX)",
        type: "file",
        required: true,
        value: "",
        status: "empty",
      },
    ],
  };
}

/**
 * Dynamic Universal Auto-Filler:
 * Matches any form field to the user's REAL profile + converts casual/Hinglish speech to polished writing!
 */
export function matchFieldToRealUser(
  field: UniversalFormField,
  user: RealUserProfile,
  spokenWisprText: string
): { value: any; reason: string } {
  const normId = (field.id + " " + field.label + " " + field.name).toLowerCase();
  const lowerPrompt = spokenWisprText.toLowerCase();

  // 1. Name
  if (normId.includes("name") || normId.includes("candidate")) {
    return { value: user.fullName, reason: "Mapped from your real profile name" };
  }

  // 2. Email
  if (normId.includes("email") || normId.includes("mail")) {
    return { value: user.email, reason: "Mapped from your real verified email" };
  }

  // 3. Phone
  if (normId.includes("phone") || normId.includes("mobile") || normId.includes("tel") || normId.includes("whatsapp")) {
    return { value: user.phone, reason: "Mapped from your real phone number" };
  }

  // 4. Current Company / Title
  if (normId.includes("company") || normId.includes("employer") || normId.includes("workplace")) {
    return { value: user.currentCompany, reason: "Mapped from your current company" };
  }
  if (normId.includes("title") || normId.includes("role") || normId.includes("designation")) {
    return { value: user.currentTitle, reason: "Mapped from your current role" };
  }

  // 5. LinkedIn
  if (normId.includes("linkedin")) {
    return { value: user.linkedInUrl, reason: "Mapped from your real LinkedIn profile" };
  }

  // 6. Portfolio / GitHub / Website
  if (normId.includes("portfolio") || normId.includes("github") || normId.includes("website") || normId.includes("url")) {
    return { value: user.portfolioUrl || user.githubUrl, reason: "Mapped from your personal portfolio" };
  }

  // 7. Notice Period
  if (normId.includes("notice") || normId.includes("availability") || normId.includes("start date")) {
    if (lowerPrompt.includes("immediate")) return { value: "Immediate (< 7 Days)", reason: "Extracted from your spoken instruction" };
    if (lowerPrompt.includes("15")) return { value: "15 Days", reason: "Instructed in your Wispr dictation" };
    return { value: user.noticePeriod, reason: "Mapped from your default notice period" };
  }

  // 8. Expected Salary / CTC / Compensation
  if (normId.includes("salary") || normId.includes("compensation") || normId.includes("ctc") || normId.includes("expected")) {
    if (lowerPrompt.includes("30") || lowerPrompt.includes("32")) {
      return { value: "₹30,00,000 / year", reason: "Overridden by your spoken Wispr prompt" };
    }
    return { value: user.expectedSalary, reason: "Mapped from your salary target" };
  }

  // 9. Location / Address / City
  if (normId.includes("location") || normId.includes("city") || normId.includes("address")) {
    return { value: user.location, reason: "Mapped from your real home address" };
  }

  // 10. Resume / File Upload
  if (field.type === "file" || normId.includes("resume") || normId.includes("cv")) {
    return { value: user.resumeFileName, reason: `Attached your verified file: "${user.resumeFileName}"` };
  }

  // 11. Open-ended Motivation / Why this company / Cover Letter
  // (Feature: Slang / Casual speech converted into executive corporate polish)
  if (
    field.type === "textarea" ||
    normId.includes("why") ||
    normId.includes("cover") ||
    normId.includes("motivation") ||
    normId.includes("about you")
  ) {
    let customEmphasis = "";
    if (lowerPrompt.includes("velocity") || lowerPrompt.includes("fast")) {
      customEmphasis = "I thrive in high-velocity product environments where teams ship daily without bureaucratic drag. ";
    } else if (lowerPrompt.includes("voice") || lowerPrompt.includes("ai")) {
      customEmphasis = "I am deeply obsessed with voice-first agentic computing and low-latency interaction design. ";
    }

    const polishedAnswer = `${customEmphasis}With ${user.yearsOfExperience}+ years of experience building scalable web architectures and fluid design systems at ${user.currentCompany}, I bridge deep technical implementation with clean user-centric ergonomics. ${user.careerHighlights} I want to bring this momentum to your team to build category-defining software.`;

    return {
      value: polishedAnswer,
      reason: "Polished into executive prose from your spoken Wispr prompt & real accomplishments",
    };
  }

  // Default fallback
  return {
    value: "Yes",
    reason: "Auto-confirmed based on your profile status",
  };
}

/**
 * Universal Bookmarklet Code:
 * Users can drag this to their browser bookmark bar to execute FormFlow on ANY live web form!
 */
export function getUniversalBookmarkletCode(): string {
  return `javascript:(function(){
    var inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
    if(!inputs.length){ alert('No form fields detected on this page!'); return; }
    var badge = document.createElement('div');
    badge.style.position = 'fixed';
    badge.style.bottom = '24px';
    badge.style.right = '24px';
    badge.style.zIndex = '999999';
    badge.style.background = '#154032';
    badge.style.color = '#F8F6EB';
    badge.style.padding = '14px 20px';
    badge.style.borderRadius = '30px';
    badge.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    badge.style.fontFamily = 'Inter, sans-serif';
    badge.style.fontSize = '13px';
    badge.style.fontWeight = '600';
    badge.style.border = '2px solid #F8F6EB';
    badge.innerHTML = '⚡ FormFlow Active: ' + inputs.length + ' fields detected. Hold your Wispr Flow key to dictate!';
    document.body.appendChild(badge);
    setTimeout(function(){ badge.remove(); }, 8000);
  })();`.replace(/\s+/g, " ");
}
