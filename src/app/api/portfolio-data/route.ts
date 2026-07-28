// app/api/portfolio-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { about, stats, testimonials, socials, tools, builds, projects } from '@/data/data';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'data.ts');
const isAuthenticated = (request: NextRequest) => request.cookies.get('portfolio_admin')?.value === 'authenticated';

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = JSON.parse(JSON.stringify({ about, stats, testimonials, socials, tools, builds, projects }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const newData = await request.json();
    
    let fileContent = fs.readFileSync(dataFilePath, 'utf8');

    // Replace sections (basic version)
    fileContent = fileContent.replace(
      /export const about = \{[\s\S]*?\};/,
      `export const about = ${JSON.stringify(newData.about, null, 2)};`
    );

    fileContent = fileContent.replace(
      /export const stats = \[[\s\S]*?\];/,
      `export const stats = ${JSON.stringify(newData.stats ?? [], null, 2)};`
    );

    // Add similar replaces for stats, testimonials, etc.

    fs.writeFileSync(dataFilePath, fileContent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
