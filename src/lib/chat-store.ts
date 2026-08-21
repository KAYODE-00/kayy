import { getNeon } from "@/lib/neon";

export type StoredConversation = {
  id: string;
  messages: { role: "user" | "assistant"; content: string }[];
  updated_at: string;
};

export async function ensureChatTables() {
  const sql = getNeon();

  await sql`
    CREATE TABLE IF NOT EXISTS ai_settings (
      id TEXT PRIMARY KEY,
      context TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS chat_conversations (
      id TEXT PRIMARY KEY,
      messages JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return sql;
}

export async function getAiContext() {
  const sql = await ensureChatTables();
  const rows = await sql`SELECT context FROM ai_settings WHERE id = 'default'`;
  return typeof rows[0]?.context === "string" ? rows[0].context : "";
}
