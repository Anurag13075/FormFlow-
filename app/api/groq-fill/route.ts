import { NextRequest, NextResponse } from "next/server";
import { callGroqFormAgent } from "@/lib/groqService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = body.apiKey || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is missing. Please provide your gsk_ key." },
        { status: 400 }
      );
    }

    const result = await callGroqFormAgent({
      apiKey,
      model: body.model || "llama-3.3-70b-versatile",
      spokenPrompt: body.spokenPrompt,
      fields: body.fields,
      userProfile: body.userProfile,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Groq Fill API Route Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process form with Groq AI." },
      { status: 500 }
    );
  }
}
