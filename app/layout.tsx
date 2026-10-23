import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FormFlow — Voice-First Autonomous Form & Application Agent",
  description:
    "Speak once. Any complex job application, reimbursement, or government form filled and audited in seconds with Wispr Voice intelligence.",
  keywords: [
    "Wispr Flow",
    "Voice AI",
    "Form Automation",
    "Autonomous Agent",
    "WeMakeDevs Hackathon",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-flow-cream text-flow-ink flex flex-col selection:bg-flow-sand selection:text-flow-ink">
        {children}
      </body>
    </html>
  );
}
