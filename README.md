# FormFlow — Universal Voice Form Agent for Wispr Flow
> **"Don't type forms, just speak."**  
> Built for the **WeMakeDevs × Wispr Flow Hackathon** (#NoHandsChallenge)

---

## 🌍 The Vision: Fill ANY Form on the Entire Internet
FormFlow is not a toy demo trapped in a sandbox. It is an **active browser extension and autonomous agent** designed to fill **any form on the entire internet**:
- **Any Job Portal:** Workday, Lever, Greenhouse, Ashby, Taleo, BambooHR, LinkedIn Easy Apply.
- **Any Form Builder:** Tally.so, Google Forms, Typeform, Jotform, Formstack.
- **Any Corporate or Bureaucratic Portal:** Travel reimbursements, college applications, visa/passport forms, tax declarations.

---

## ⚡ How It Works Across the Entire Web

### 1. The Chrome / Edge Extension (`whisp/extension`)
Load this unpacked extension into Chrome or Edge (`chrome://extensions` → Load unpacked → select `whisp/extension`):
1. Navigate to **ANY live form across the web** (e.g. `tally.so/r/kdMWIZ` or a Workday job application).
2. The extension automatically detects all inputs (`<input>`, `<textarea>`, `<select>`).
3. Click the extension icon or hold your **Wispr Flow desktop shortcut** to dictate your instructions:
   > *"Apply with my primary profile, set notice period to 15 days, emphasize my React velocity, and attach my resume."*
4. **Groq AI (Llama 3.3 70B)** maps the live page's fields directly to your verified profile and ghost-types the answers into the live page in sub-second latency!
5. Uses native React/Vue synthetic event dispatchers (`HTMLInputElement.prototype.value.set`) so modern reactive frameworks never wipe out your filled text.

### 2. The 1-Click Zero-Install Bookmarklet
Don't want to install an extension? Drag the **`⚡ FormFlow Voice`** bookmarklet button to your browser bookmarks bar. Click it on any webpage on the internet to immediately inspect and fill fields!

### 3. Native Groq AI Integration (Llama 3.3 70B)
- Connect your Groq API key (starts with `gsk_` from [console.groq.com/keys](https://console.groq.com/keys)).
- Uses **`llama-3.3-70b-versatile`** (or `llama-3.1-8b-instant`) for ultra-fast, high-accuracy field reasoning, open-ended motivation letter drafting, and slang-to-corporate polishing.

---

## 🚀 How to Run & Deploy

### Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Loading the Chrome Extension into Your Browser
1. Open `chrome://extensions` (or `edge://extensions`) in your browser.
2. Turn **Developer mode** ON (top right corner).
3. Click **Load unpacked** and select the `whisp/extension` folder.
4. You're done! Visit any form on the web and click the FormFlow icon.

### Deploying the Web Platform to Vercel
1. Push this folder to a GitHub repository.
2. Import the repo in your [Vercel Dashboard](https://vercel.com/).
3. Click **Deploy**! (Optionally add `GROQ_API_KEY` to your Vercel Environment Variables).
