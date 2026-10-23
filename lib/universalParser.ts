import { UniversalForm, UniversalFormField, RealUserProfile } from "./types";

/**
 * Creates the exact Tally.so Job Application Form from tally.so/r/kdMWIZ
 */
export function createTallyJobForm(): UniversalForm {
  return {
    id: "tally-job-kdMWIZ",
    title: "Job Application (Tally.so)",
    originUrl: "https://tally.so/r/kdMWIZ",
    category: "Tally.so Live Form",
    fields: [
      {
        id: "full_name",
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "email_address",
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "you@example.com",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "portfolio_linkedin",
        name: "portfolioOrLinkedin",
        label: "Portfolio/LinkedIn Link",
        type: "text",
        placeholder: "https://...",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "position_applied",
        name: "positionApplied",
        label: "Which position are you applying for?",
        type: "text",
        placeholder: "e.g. Senior Product Engineer / Frontend Lead",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "why_join",
        name: "whyJoin",
        label: "Why are you interested in this role and what unique skills do you bring?",
        type: "textarea",
        placeholder: "Tell us about your background and motivation...",
        required: true,
        value: "",
        status: "empty",
      },
      {
        id: "resume_upload",
        name: "resumeUpload",
        label: "Upload your Resume / CV (PDF)",
        type: "file",
        required: true,
        value: "",
        status: "empty",
      },
    ],
  };
}

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
  return createTallyJobForm();
}

/**
 * Fallback Local Matching Engine when Groq API key is not yet set
 */
export function matchFieldToRealUser(
  field: UniversalFormField,
  user: RealUserProfile,
  spokenWisprText: string
): { value: any; reason: string } {
  const normId = (field.id + " " + field.label + " " + (field.name || "")).toLowerCase();
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

  // 4. Position applied
  if (normId.includes("position") || normId.includes("role") || normId.includes("applying")) {
    if (lowerPrompt.includes("product designer")) return { value: "Senior Product Designer", reason: "Extracted from voice prompt" };
    if (lowerPrompt.includes("frontend")) return { value: "Lead Frontend Engineer", reason: "Extracted from voice prompt" };
    return { value: user.currentTitle, reason: "Mapped from your profile designation" };
  }

  // 5. LinkedIn & Portfolio
  if (normId.includes("portfolio") || normId.includes("linkedin") || normId.includes("link") || normId.includes("url")) {
    return { value: user.portfolioUrl || user.linkedInUrl, reason: "Mapped from your portfolio/LinkedIn" };
  }

  // 6. Current Company / Workplace
  if (normId.includes("company") || normId.includes("employer") || normId.includes("workplace")) {
    return { value: user.currentCompany, reason: "Mapped from your current company" };
  }

  // 7. Notice Period
  if (normId.includes("notice") || normId.includes("availability") || normId.includes("start date")) {
    if (lowerPrompt.includes("immediate")) return { value: "Immediate (< 7 Days)", reason: "Extracted from spoken instruction" };
    if (lowerPrompt.includes("15")) return { value: "15 Days", reason: "Instructed in Wispr dictation" };
    return { value: user.noticePeriod, reason: "Mapped from default notice period" };
  }

  // 8. Expected Salary / CTC
  if (normId.includes("salary") || normId.includes("compensation") || normId.includes("ctc")) {
    return { value: user.expectedSalary, reason: "Mapped from your salary target" };
  }

  // 9. Location / Address
  if (normId.includes("location") || normId.includes("city") || normId.includes("address")) {
    return { value: user.location, reason: "Mapped from your real home address" };
  }

  // 10. Resume Upload
  if (field.type === "file" || normId.includes("resume") || normId.includes("cv")) {
    return { value: user.resumeFileName, reason: `Attached verified file: "${user.resumeFileName}"` };
  }

  // 11. Motivation / Why this company (Hinglish/Slang normalizer)
  if (
    field.type === "textarea" ||
    normId.includes("why") ||
    normId.includes("cover") ||
    normId.includes("motivation") ||
    normId.includes("skills")
  ) {
    let customEmphasis = "";
    if (lowerPrompt.includes("velocity") || lowerPrompt.includes("fast")) {
      customEmphasis = "I thrive in high-velocity product environments where teams ship daily without bureaucratic drag. ";
    } else if (lowerPrompt.includes("voice") || lowerPrompt.includes("ai")) {
      customEmphasis = "I am deeply obsessed with voice-first agentic computing and low-latency interaction design. ";
    }

    const polishedAnswer = `${customEmphasis}With ${user.yearsOfExperience}+ years of experience building scalable web architectures and fluid design systems at ${user.currentCompany}, I bridge deep technical implementation with clean user-centric ergonomics. ${user.careerHighlights} I am eager to bring this momentum to this role.`;

    return {
      value: polishedAnswer,
      reason: "Polished into executive prose from your spoken Wispr prompt & real accomplishments",
    };
  }

  return {
    value: "Yes",
    reason: "Auto-confirmed based on your profile status",
  };
}

/**
 * Universal In-Page Bookmarklet Script:
 * Works on ANY live website (including tally.so/r/kdMWIZ, Google Forms, Typeform, etc.).
 * Uses React synthetic event dispatchers (HTMLInputElement.prototype.value.set) so inputs stay filled!
 */
export function getUniversalBookmarkletCode(): string {
  return `javascript:(function(){
    var inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
    if(!inputs.length){ alert('FormFlow: No form fields detected on this page!'); return; }
    
    var setNativeVal = function(el, val){
      var proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      var setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    var promptText = prompt('FormFlow: Hold Wispr Flow and dictate prompt for this page (or leave empty to autofill with primary profile):', 'Apply to this role with my primary profile, set notice period to 15 days, and attach my resume.');
    if(promptText === null) return;

    var filled = 0;
    inputs.forEach(function(el){
      var id = (el.id + ' ' + el.name + ' ' + (el.placeholder||'') + ' ' + (el.getAttribute('aria-label')||'')).toLowerCase();
      var labelEl = el.closest('label') || document.querySelector('label[for="'+el.id+'"]');
      if(labelEl) id += ' ' + labelEl.textContent.toLowerCase();
      
      if(id.includes('name') && !id.includes('company')){
        setNativeVal(el, 'Anurag Sharma'); filled++;
      } else if(id.includes('email') || id.includes('mail')){
        setNativeVal(el, 'anurag.sharma@example.com'); filled++;
      } else if(id.includes('phone') || id.includes('tel')){
        setNativeVal(el, '+91 98765 43210'); filled++;
      } else if(id.includes('portfolio') || id.includes('linkedin') || id.includes('link') || id.includes('url')){
        setNativeVal(el, 'https://anuragsharma.design'); filled++;
      } else if(id.includes('position') || id.includes('role')){
        setNativeVal(el, 'Senior Product Engineer & UI Architect'); filled++;
      } else if(el.tagName.toLowerCase() === 'textarea' || id.includes('why') || id.includes('motivation')){
        setNativeVal(el, 'With 4+ years leading frontend engineering at HyperScale Tech, I build high-speed web apps and fluid design systems. I am excited to bring this execution velocity to your team.'); filled++;
      }
    });

    var badge = document.createElement('div');
    badge.style.position = 'fixed';
    badge.style.top = '20px';
    badge.style.right = '20px';
    badge.style.zIndex = '9999999';
    badge.style.background = '#154032';
    badge.style.color = '#F8F6EB';
    badge.style.padding = '14px 22px';
    badge.style.borderRadius = '24px';
    badge.style.boxShadow = '0 12px 36px rgba(0,0,0,0.35)';
    badge.style.fontFamily = 'Inter, sans-serif';
    badge.style.fontSize = '13px';
    badge.style.fontWeight = '700';
    badge.style.border = '2px solid #F8F6EB';
    badge.innerHTML = '⚡ FormFlow: Successfully filled ' + filled + ' fields on this form!';
    document.body.appendChild(badge);
    setTimeout(function(){ badge.remove(); }, 6000);
  })();`.replace(/\s+/g, " ");
}
