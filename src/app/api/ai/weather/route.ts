import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'กรุงเทพมหานคร';

    const aiService = getAIService();
    const weatherData = await aiService.generateWeatherRecommendations(location);

    return NextResponse.json({ 
      success: true, 
      weatherData,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating weather recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate weather recommendations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location } = body;

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    const aiService = getAIService();
    const weatherData = await aiService.generateWeatherRecommendations(location);

    return NextResponse.json({ 
      success: true, 
      weatherData,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating weather recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate weather recommendations' },
      { status: 500 }
    );
  }
}
