# FormFlow — Universal Voice Form Agent for Wispr Flow
> **"Don't type forms, just speak."**  
> Built for the **WeMakeDevs × Wispr Flow Hackathon** (#NoHandsChallenge)

---

## 🌟 What FormFlow Is & Why It Wins

FormFlow is **not** a toy wrapper locked to hardcoded demo forms. It is a **universal voice-driven form automation platform** designed directly for **Wispr Flow desktop users**:

1. **Universal Form Engine (Works on Any Form on the Internet):**
   - **Interactive HTML & URL Inspector:** Paste *any* `<form>` HTML snippet from Google Forms, Lever, Greenhouse, Workday, or university portals. FormFlow dynamically parses the DOM input elements (`<input>`, `<textarea>`, `<select>`, `<input type="file">`) and generates a live, editable form target.
   - **1-Click Draggable Bookmarklet:** Drag the `⚡ FormFlow Voice` bookmarklet to your browser bar. Click it on *any* live website across the internet to inspect fields and execute voice-driven filling right on that webpage!

2. **Your Real Data, Zero Fake Mock Arrays:**
   - Includes **"My Real Profile & Document Vault"** where you enter your *actual* legal name, real email, phone, location, work experience, compensation target, and verified resume file name.
   - All data is securely persisted in browser `localStorage`. FormFlow fills forms with **your real data**, never random dummy data.

3. **Direct Wispr Flow Native Dictation:**
   - Features the **Wispr Flow Command Bar**. 
   - Hold your Wispr Flow desktop shortcut, speak your thoughts naturally, and Wispr Flow streams text directly into the command bar.
   - FormFlow's real-time parser reads the dictated text, extracts intent, and ghost-types answers across the form in real time.

4. **Hinglish & Casual Speech to Executive Corporate Polish:**
   - Speak casually or in Hinglish (*"Bhai write that I love their velocity and I have 4 years experience in React"*).
   - FormFlow synthesizes an executive-level, professional response combining your spoken emphasis with your verified accomplishments from your vault.

5. **Pixel-Perfect Wispr Flow Design Aesthetic:**
   - Directly models the Wispr Flow landing page:
     - Warm editorial cream/ivory background (`#F8F6EB`).
     - Deep obsidian typography (`#141413`) with rich serif display headings (`Newsreader` / `Playfair Display`) and clean modern sans.
     - Rotating circular text ribbon (`• don't type forms • just speak •`).
     - 4x faster comparison cards (Keyboard 45 wpm vs Wispr Flow 220 wpm).
     - Tactile lavender buttons (`#DDD0F7`) with 1.5px black borders and tactile shadows.
     - Zero generic blue-purple AI gradients.

---

## 🛠️ Project Architecture

```text
whisp/
├── app/
│   ├── globals.css              # Wispr design system, rotating ribbon & waveform animations
│   ├── layout.tsx               # Root layout & Google Fonts (Newsreader, Playfair, Inter)
│   └── page.tsx                 # View orchestrator (Landing, Studio, Vault, Bookmarklet)
├── components/
│   ├── LandingPage.tsx          # Pixel-perfect Wispr Flow landing page (curved ribbons, 4x cards)
│   ├── Navbar.tsx               # Segmented control toggle pill & user profile status
│   ├── WisprCommandBar.tsx      # Native Wispr Flow dictation target with presets
│   ├── UniversalFormScanner.tsx # Dynamic DOM parser for any web form or HTML snippet
│   ├── RealProfileVault.tsx     # Real user data manager with localStorage persistence
│   ├── BookmarkletGuide.tsx     # 1-click draggable bookmarklet for any live web form
│   └── SubmissionAudit.tsx      # Audit summary, time-saved breakdown & confetti celebration
├── lib/
│   ├── types.ts                 # Full TypeScript types for universal forms & real user profile
│   ├── storage.ts               # LocalStorage management for real user credentials
│   ├── universalParser.ts       # HTML parser, slang-to-polish engine & bookmarklet code
│   └── utils.ts                 # Styling & sleep helpers
├── package.json                 # Declared dependencies (Next.js, Tailwind, Framer Motion, Confetti)
├── tailwind.config.ts           # Custom Wispr color tokens (cream, green, lavender, blush)
└── tsconfig.json                # Strict TypeScript configuration
```

---

## 🚀 How to Run & Deploy

### 1. Local Testing
```bash
# 1. Install dependencies (handled by you at the end)
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

### 2. Vercel Deployment
1. Push this workspace to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Select your repo; Vercel automatically detects Next.js.
4. Click **Deploy**! (No custom environment variables required).

---

## 🎬 2-Minute Demo Video Script (For Hackathon Submission)
* **0:00 – 0:30 (The Landing & Problem):** Show the landing page with the 45 wpm vs 220 wpm comparison. Explain that filling forms on the internet takes 15 minutes of repetitive typing every single day.
* **0:30 – 0:50 (Real Vault & Universal Form):** Open "My Real Vault" to show that your actual name, phone, experience, and real resume are saved locally. Then open the Universal Form Scanner and show it can take *any* web form.
* **0:50 – 1:30 (The Live Wispr Magic):** Focus the Wispr Command Bar, hold your Wispr Flow desktop shortcut, and speak:
  > *"Apply to this role with my primary profile, set notice period to 15 days, emphasize my React velocity, and attach my resume."*
  Show the fields lighting up in amber and ghost-typing with your real data in under 4 seconds!
* **1:30 – 2:00 (The Bookmarklet & Audit):** Show the 1-click Bookmarklet working on any live website across the internet, submit with celebration confetti, and show your Wispr Flow usage card.
