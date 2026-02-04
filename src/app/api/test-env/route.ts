import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  return NextResponse.json({
    apiKeyPresent: !!apiKey,
    apiKeyPreview: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API')),
  });
}
