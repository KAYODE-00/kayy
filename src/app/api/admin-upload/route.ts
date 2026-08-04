import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  if (request.cookies.get('portfolio_admin')?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN is not configured.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'A file is required.' }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Files must be 10MB or smaller.' }, { status: 413 });

    const blob = await put(`portfolio/${Date.now()}-${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
