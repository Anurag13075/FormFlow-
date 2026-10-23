# FormFlow — Voice-First Autonomous Form & Application Agent
> **"Don't type forms, just speak."**  
> Built for the **WeMakeDevs × Wispr Flow Hackathon** (#NoHandsChallenge)

---

## 💡 The Real Problem Everyone Has
Filling forms on the web is one of the most frustrating, time-consuming tasks in daily computing:
- **Job Applications:** Re-entering the same contact info, past employers, customized motivation letters, and attaching resumes.
- **Corporate Travel Reimbursements:** Breaking down flight costs, hotel GST, cab receipts, and attaching proof PDFs.
- **University & Grant Applications:** Transcribing GPA, university credentials, academic abstracts, and transcripts.

A typical 15-field form takes **10–15 minutes of manual typing, copying, pasting, and folder searching**.

---

## ⚡ The Solution: FormFlow
**FormFlow** combines **Wispr Voice Dictation** with an autonomous **Persona & Document Vault**:
1. **Persona & Document Vault:** Store your profile details (identity, employment, bank routing, verified resume PDFs, tax invoices) safely in your local browser sandbox.
2. **Natural Spoken Directives:** Instead of dictating 20 individual fields, speak high-level directives:
   > *"Apply to this Senior Product Designer role with my Primary profile. Answer the motivation question by emphasizing my passion for voice interfaces, set my notice period to 15 days, compensation to ₹32 LPA, and attach my 2026 resume."*
3. **Live Ghost-Typing & Visual Verification:** The agent scans the form, targets each field with a soft amber halo, ghost-types custom-tailored responses, attaches verified vault PDFs, and provides instant visual verification.
4. **Voice-in-the-Loop Clarification:** When a form poses an ambiguous or new question, the agent gently pauses and asks you aloud, accepting a spoken answer before continuing.
5. **One-Spoken-Word Submit:** Complete audit breakdown showing time saved (14 mins → 4.2 secs) with 1-click or spoken submission.

---

## 🎨 Design Philosophy (The Wispr Flow Aesthetic)
- **Zero generic "AI purple gradients".**
- Warm editorial ivory/cream palette (`#FAF8F5`, `#F3EFE6`, `#141413`).
- Rich editorial serif typography for headings paired with ultra-clean modern sans.
- Signature **Floating Voice Capsule** with animated audio waveform bars, dynamic micro-chips (*"Scanning 11 target fields"*, *"Mounting Resume_2026.pdf"*), and push-to-talk controls.
- Tactile, crisp 1px borders and subtle spring physics.

---

## 🚀 How to Run & Deploy

### 1. Local Development
When you are ready to test locally:
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

### 2. Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repository into your **[Vercel Dashboard](https://vercel.com/)**.
3. Framework Preset: **Next.js** (auto-detected).
4. Click **Deploy**! (No custom environment variables required).

---

## 🎬 2-Minute Demo Video Script (For Hackathon Submission)
* **0:00 – 0:25 (The Pain):** Show an empty 12-field job application form. Talk about how exhausting it is to re-type your bio, search your folders for your resume, and paste links every single day.
* **0:25 – 1:15 (The Live Spoken Magic):**
  - Hold the voice button or click "Simulate Speech".
  - Speak your natural thought: *"Apply to this role with my primary profile, emphasize voice AI in the motivation question, set notice period to 15 days, and attach my resume."*
  - Watch the screen: The audio capsule pulses with waveform bars, fields light up in amber, text ghost-types across the form, and the resume PDF attaches itself.
* **1:15 – 1:40 (The Vault & Audit):** Open the Persona Vault to show where documents and verified data live. Open the Audit Modal to show: *"Completed in 4.2 seconds • 14 minutes saved"*.
* **1:40 – 2:00 (Submission & Wispr card):** Confirm submission with celebratory confetti and show your Wispr Flow desktop usage card.
