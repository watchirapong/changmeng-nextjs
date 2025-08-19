import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cropName = searchParams.get('crop') || 'ข้าว';

    const aiService = getAIService();
    const analysis = await aiService.generateMarketAnalysis(cropName);

    return NextResponse.json({ 
      success: true, 
      analysis,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating market analysis:', error);
    return NextResponse.json(
      { error: 'Failed to generate market analysis' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cropName } = body;

    if (!cropName) {
      return NextResponse.json(
        { error: 'Crop name is required' },
        { status: 400 }
      );
    }

    const aiService = getAIService();
    const analysis = await aiService.generateMarketAnalysis(cropName);

    return NextResponse.json({ 
      success: true, 
      analysis,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating market analysis:', error);
    return NextResponse.json(
      { error: 'Failed to generate market analysis' },
      { status: 500 }
    );
  }
}
