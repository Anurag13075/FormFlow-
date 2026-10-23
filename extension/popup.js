/**
 * FormFlow Extension Popup Script
 */

const defaultProfile = {
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
  resumeFileName: "Anurag_Sharma_Resume_2026.pdf",
  careerHighlights:
    "Built high-velocity design systems and real-time frontend apps with 40% performance gain. Specialized in low-latency voice and agentic architectures.",
};

document.addEventListener("DOMContentLoaded", async () => {
  const fieldCountText = document.getElementById("fieldCountText");
  const pageUrlText = document.getElementById("pageUrlText");
  const promptInput = document.getElementById("promptInput");
  const groqKeyInput = document.getElementById("groqKeyInput");
  const fillBtn = document.getElementById("fillBtn");

  // Load saved Groq key
  chrome.storage.local.get(["groqApiKey", "userProfile", "savedPrompt"], (res) => {
    if (res.groqApiKey) groqKeyInput.value = res.groqApiKey;
    if (res.savedPrompt) {
      promptInput.value = res.savedPrompt;
    } else {
      promptInput.value =
        "Apply to this role with my primary profile, set notice period to 15 days, emphasize my React velocity, and attach my resume.";
    }
  });

  // Query active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.id) {
    pageUrlText.textContent = tab.url;

    chrome.tabs.sendMessage(tab.id, { action: "GET_FIELDS_COUNT" }, (response) => {
      if (chrome.runtime.lastError || !response) {
        fieldCountText.textContent = "Ready on this webpage";
      } else {
        fieldCountText.textContent = `${response.count} form fields detected on this page`;
      }
    });
  }

  // Handle Fill
  fillBtn.addEventListener("click", () => {
    const groqKey = groqKeyInput.value.trim();
    if (!groqKey || !groqKey.startsWith("gsk_")) {
      alert("Please enter a valid Groq API key starting with 'gsk_' from https://console.groq.com/keys");
      groqKeyInput.focus();
      return;
    }

    const spokenPrompt = promptInput.value.trim();
    chrome.storage.local.set({ groqApiKey: groqKey, savedPrompt: spokenPrompt });

    fillBtn.disabled = true;
    fillBtn.textContent = "Synthesizing with Groq Llama 3.3...";

    chrome.storage.local.get(["userProfile"], (stored) => {
      const profile = stored.userProfile || defaultProfile;

      chrome.tabs.sendMessage(
        tab.id,
        {
          action: "FILL_PAGE_WITH_AI",
          groqApiKey: groqKey,
          spokenPrompt: spokenPrompt,
          userProfile: profile,
          model: "llama-3.3-70b-versatile",
        },
        (resp) => {
          fillBtn.disabled = false;
          fillBtn.innerHTML = "<span>⚡ Fill This Live Web Page</span>";
          if (resp && resp.success) {
            window.close(); // Close popup so user sees the filled webpage!
          }
        }
      );
    });
  });
});
