import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') || 'ฤดูฝน';
    const location = searchParams.get('location') || 'ภาคกลาง';

    const aiService = getAIService();
    const recommendations = await aiService.generateCropRecommendations(season, location);

    return NextResponse.json({ 
      success: true, 
      recommendations,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { season, location } = body;

    if (!season || !location) {
      return NextResponse.json(
        { error: 'Season and location are required' },
        { status: 400 }
      );
    }

    const aiService = getAIService();
    const recommendations = await aiService.generateCropRecommendations(season, location);

    return NextResponse.json({ 
      success: true, 
      recommendations,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
