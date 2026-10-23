/**
 * FormFlow Universal Content Script
 * Runs on ANY webpage on the whole internet (Google Forms, Workday, Lever, Greenhouse, Tally, etc.)
 */

// Helper: Sets input values in modern React, Vue, and Angular applications without getting wiped
function setNativeInputValue(element, value) {
  const isTextArea = element instanceof HTMLTextAreaElement;
  const isSelect = element instanceof HTMLSelectElement;

  if (isSelect) {
    let matched = false;
    for (let i = 0; i < element.options.length; i++) {
      const opt = element.options[i];
      if (
        opt.value.toLowerCase() === String(value).toLowerCase() ||
        opt.text.toLowerCase().includes(String(value).toLowerCase())
      ) {
        element.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched && element.options.length > 1) {
      element.selectedIndex = 1; // default to first valid choice
    }
    element.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  const prototype = isTextArea
    ? window.HTMLTextAreaElement.prototype
    : window.HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  if (descriptor && descriptor.set) {
    descriptor.set.call(element, value);
  } else {
    element.value = value;
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

// Scans all interactive inputs on ANY web page
function scanPageFormFields() {
  const elements = Array.from(
    document.querySelectorAll(
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), textarea, select'
    )
  );

  return elements.map((el, index) => {
    let labelText = "";

    // 1. Label via for attribute
    if (el.id) {
      const label = document.querySelector(`label[for="${el.id}"]`);
      if (label) labelText = label.textContent.trim();
    }

    // 2. Parent or closest label
    if (!labelText) {
      const parentLabel = el.closest("label");
      if (parentLabel) labelText = parentLabel.textContent.replace(el.textContent, "").trim();
    }

    // 3. Aria label
    if (!labelText) {
      labelText = el.getAttribute("aria-label") || "";
    }

    // 4. Preceding sibling or nearby header/span
    if (!labelText && el.previousElementSibling) {
      labelText = el.previousElementSibling.textContent.trim();
    }

    // 5. Placeholder or name
    if (!labelText) {
      labelText = el.getAttribute("placeholder") || el.getAttribute("name") || `Field ${index + 1}`;
    }

    // Clean up
    labelText = labelText.replace(/\s+/g, " ").replace(/[*:]/g, "").trim();

    return {
      index,
      element: el,
      id: el.id || el.getAttribute("name") || `field_${index}`,
      name: el.getAttribute("name") || "",
      label: labelText,
      type: el.getAttribute("type") || el.tagName.toLowerCase(),
      placeholder: el.getAttribute("placeholder") || "",
    };
  });
}

// Shows a floating Wispr Flow notification pill on the live web page
function showLivePageFloatingPill(message, isSuccess = true) {
  const existing = document.getElementById("formflow-live-pill");
  if (existing) existing.remove();

  const pill = document.createElement("div");
  pill.id = "formflow-live-pill";
  pill.style.position = "fixed";
  pill.style.bottom = "24px";
  pill.style.right = "24px";
  pill.style.zIndex = "2147483647";
  pill.style.backgroundColor = isSuccess ? "#154032" : "#852648";
  pill.style.color = "#F8F6EB";
  pill.style.padding = "14px 22px";
  pill.style.borderRadius = "30px";
  pill.style.boxShadow = "0 14px 40px rgba(0, 0, 0, 0.35)";
  pill.style.fontFamily = "Inter, -apple-system, sans-serif";
  pill.style.fontSize = "13px";
  pill.style.fontWeight = "600";
  pill.style.display = "flex";
  pill.style.alignItems = "center";
  pill.style.gap = "10px";
  pill.style.border = "1.5px solid #F8F6EB";
  pill.style.transition = "all 0.3s ease";

  pill.innerHTML = `
    <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#34D399;"></span>
    <span>${message}</span>
  `;

  document.body.appendChild(pill);
  setTimeout(() => {
    pill.style.opacity = "0";
    pill.style.transform = "translateY(10px)";
    setTimeout(() => pill.remove(), 400);
  }, 6000);
}

// Listen for messages from FormFlow extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_FIELDS_COUNT") {
    const fields = scanPageFormFields();
    sendResponse({ count: fields.length, url: window.location.href, title: document.title });
    return true;
  }

  if (request.action === "FILL_PAGE_WITH_AI") {
    const fields = scanPageFormFields();
    if (!fields.length) {
      showLivePageFloatingPill("FormFlow: No form fields detected on this page", false);
      sendResponse({ success: false, message: "No fields detected" });
      return true;
    }

    const { userProfile, groqApiKey, spokenPrompt, model } = request;

    showLivePageFloatingPill(`⚡ FormFlow: Groq Llama 3.3 analyzing ${fields.length} fields on this page...`);

    // Call Groq API directly from extension
    const systemPrompt = `You are FormFlow, an autonomous real-time form-filling AI agent.
Your mission is to map fields from ANY webpage on the internet to the user's real verified profile and spoken voice prompt.

USER PROFILE:
${JSON.stringify(userProfile, null, 2)}

INSTRUCTIONS:
1. Map each field accurately to the user's profile.
2. For essays (why work here, cover letter, etc.), write a polished executive paragraph citing the user's real metrics.
3. Return strict JSON format:
{
  "answers": [
    { "index": 0, "value": "Mapped value" }
  ]
}`;

    const fieldsPayload = fields.map((f) => ({
      index: f.index,
      label: f.label,
      type: f.type,
      placeholder: f.placeholder,
    }));

    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: model || "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Spoken Directive: "${spokenPrompt}"\nFields: ${JSON.stringify(fieldsPayload)}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          const content = JSON.parse(data.choices[0].message.content);
          let filledCount = 0;

          content.answers.forEach((ans) => {
            const target = fields.find((f) => f.index === ans.index);
            if (target && target.element && ans.value !== undefined) {
              setNativeInputValue(target.element, ans.value);
              filledCount++;
            }
          });

          showLivePageFloatingPill(
            `✅ FormFlow: Successfully filled ${filledCount} fields on this live form with Groq AI!`
          );
          sendResponse({ success: true, count: filledCount });
        } catch (err) {
          showLivePageFloatingPill("FormFlow: Failed to parse Groq response", false);
          sendResponse({ success: false, error: err.message });
        }
      })
      .catch((err) => {
        showLivePageFloatingPill(`FormFlow Error: ${err.message}`, false);
        sendResponse({ success: false, error: err.message });
      });

    return true; // Keep message channel open for async fetch
  }
});
