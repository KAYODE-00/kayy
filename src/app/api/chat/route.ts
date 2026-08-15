import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ensureChatTables, getAiContext } from "@/lib/chat-store";

const groqApiKey = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: groqApiKey || "",
});

const GROQ_MODEL_CANDIDATES = [
  process.env.GROQ_MODEL,
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "openai/gpt-oss-20b",
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
].filter((value): value is string => Boolean(value));

export async function POST(req: Request) {
  try {
    if (!groqApiKey) {
      return NextResponse.json(
        { error: "AI chat is temporarily unavailable." },
        { status: 503 }
      );
    }

    const { messages, conversationId = crypto.randomUUID() } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid chat request." },
        { status: 400 }
      );
    }

    const aiContext = await getAiContext();
    let completion;
    let lastError: Error | null = null;

    for (const model of GROQ_MODEL_CANDIDATES) {
      try {
        completion = await groq.chat.completions.create({
          model,
          messages: [
            {
              role: "system",
              content: `
You are Kayode's portfolio AI.

Answer ONLY questions about Kayode.

Topics:
- projects
- skills
- technologies
- experience
- resume
- contact

If asked unrelated questions politely refuse.

Respond naturally.
${aiContext ? `\nAdditional context supplied by Kayode:\n${aiContext}` : ""}
              `,
            },
            ...messages,
          ],
        });

        if (completion?.choices?.[0]?.message?.content) {
          break;
        }
      } catch (modelError) {
        lastError =
          modelError instanceof Error
            ? modelError
            : new Error("Unknown model error");
      }
    }

    if (!completion?.choices?.[0]?.message?.content) {
      throw lastError ?? new Error("No valid Groq model response");
    }

    const message = completion.choices[0].message.content ?? "Sorry, I couldn't answer.";

    try {
      const sql = await ensureChatTables();
      await sql`
        INSERT INTO chat_conversations (id, messages, updated_at)
        VALUES (${conversationId}, ${JSON.stringify([...messages, { role: "assistant", content: message }])}::jsonb, NOW())
        ON CONFLICT (id) DO UPDATE
        SET messages = EXCLUDED.messages, updated_at = NOW()
      `;
    } catch (storageError) {
      console.error("Unable to store chat conversation", storageError);
    }

    return NextResponse.json({ message, conversationId });
  } catch (err) {
    console.error("Groq chat request failed:", err);

    return NextResponse.json(
      {
        error: "AI chat is temporarily unavailable.",
      },
      {
        status: 503,
      }
    );
  }
}
