import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

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

        return NextResponse.json({
            message:
                completion.choices[0].message.content ??
                "Sorry, I couldn't answer.",
        });
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