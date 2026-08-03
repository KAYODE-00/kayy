import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getNeon } from "@/lib/neon";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { messages, conversationId = crypto.randomUUID() } = await req.json();

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

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
                    `,
                },

                ...messages,
            ],
        });

        const message = completion.choices[0].message.content ?? "Sorry, I couldn't answer.";

        try {
            const sql = getNeon();
            await sql`
                CREATE TABLE IF NOT EXISTS chat_conversations (
                    id TEXT PRIMARY KEY,
                    messages JSONB NOT NULL,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
            `;
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
        console.error(err);

        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}
