// app/api/portfolio-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { about, stats, testimonials, socials, tools, builds, projects, workExperience } from '@/data/data';

const isAuthenticated = (request: NextRequest) => request.cookies.get('portfolio_admin')?.value === 'authenticated';
const defaultData = { about, stats, testimonials, socials, tools, builds, projects, workExperience };

const getDatabase = () => {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.');
  return neon(process.env.DATABASE_URL);
};

const ensureTable = async () => {
  const sql = getDatabase();
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_content (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return sql;
};

export async function GET(request: NextRequest) {
  try {
    const sql = await ensureTable();
    const rows = await sql`SELECT data FROM portfolio_content WHERE id = 'default'`;
    if (rows.length === 0) {
      await sql`INSERT INTO portfolio_content (id, data) VALUES ('default', ${JSON.stringify(defaultData)}::jsonb)`;
      return NextResponse.json(defaultData);
    }

    return NextResponse.json(rows[0].data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const newData = await request.json();
    const sql = await ensureTable();
    await sql`
      INSERT INTO portfolio_content (id, data, updated_at)
      VALUES ('default', ${JSON.stringify(newData)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to save' }, { status: 500 });
  }
}
