import { NextRequest, NextResponse } from "next/server";
import { ensureChatTables, type StoredConversation } from "@/lib/chat-store";

const isAuthenticated = (request: NextRequest) =>
  request.cookies.get("portfolio_admin")?.value === "authenticated";

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = await ensureChatTables();
    const [settings, conversations] = await Promise.all([
      sql`SELECT context, updated_at FROM ai_settings WHERE id = 'default'`,
      sql`SELECT id, messages, updated_at FROM chat_conversations ORDER BY updated_at DESC`,
    ]);

    return NextResponse.json({
      context: settings[0]?.context ?? "",
      conversations: conversations as StoredConversation[],
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load AI data." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { context } = await request.json();
    if (typeof context !== "string") return NextResponse.json({ error: "Context must be text." }, { status: 400 });

    const sql = await ensureChatTables();
    await sql`
      INSERT INTO ai_settings (id, context, updated_at)
      VALUES ('default', ${context.trim()}, NOW())
      ON CONFLICT (id) DO UPDATE SET context = EXCLUDED.context, updated_at = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save AI context." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Conversation id is required." }, { status: 400 });

  try {
    const sql = await ensureChatTables();
    await sql`DELETE FROM chat_conversations WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete conversation." }, { status: 500 });
  }
}
