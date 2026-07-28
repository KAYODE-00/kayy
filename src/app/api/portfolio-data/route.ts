// app/api/portfolio-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.ts');

export async function GET() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // Simple extraction (you can improve this with regex or ts-morph)
    const aboutMatch = fileContent.match(/export const about = (\{[\s\S]*?\});/);
    const statsMatch = fileContent.match(/export const stats = (\[[\s\S]*?\]);/);
    // ... add more

    const data = {
      about: aboutMatch ? JSON.parse(aboutMatch[1].replace(/'/g, '"')) : {},
      stats: [],
      // Parse other sections
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    
    let fileContent = fs.readFileSync(dataFilePath, 'utf8');

    // Replace sections (basic version)
    fileContent = fileContent.replace(
      /export const about = \{[\s\S]*?\};/,
      `export const about = ${JSON.stringify(newData.about, null, 2)};`
    );

    // Add similar replaces for stats, testimonials, etc.

    fs.writeFileSync(dataFilePath, fileContent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}