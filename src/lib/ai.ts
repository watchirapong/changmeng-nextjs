// AI Service for generating agricultural data
export interface AIConfig {
  geminiApiKey?: string;
}

export interface CropData {
  name: string;
  thaiName: string;
  icon: string;
  currentPrice: number;
  predictedPrice: number;
  riskScore: number;
  returnScore: number;
  plantingSeason: string;
  harvestTime: number;
  investment: number;
  expectedReturn: number;
  confidence: number;
  marketTrend: string;
  recommendations: string[];
}

export interface MarketAnalysis {
  cropName: string;
  currentPrice: number;
  priceHistory: { date: string; price: number }[];
  prediction: {
    nextMonth: number;
    nextThreeMonths: number;
    confidence: number;
    factors: string[];
  };
  marketTrend: 'rising' | 'falling' | 'stable';
  recommendation: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
  recommendations: string[];
}

class AIService {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  // Generate chat response using AI with conversation memory
  async generateChatResponse(message: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    console.log('=== generateChatResponse called ===');
    console.log('Using Gemini API only');
    console.log('Gemini key present:', !!this.config.geminiApiKey);
    console.log('Conversation history length:', conversationHistory.length);
    
    // Build conversation context with memory
    let conversationContext = '';
    if (conversationHistory.length > 0) {
      // Keep only last 5 messages to save tokens
      const recentHistory = conversationHistory.slice(-5);
      conversationContext = recentHistory.map(msg => 
        `${msg.role === 'user' ? 'ผู้ใช้' : 'AI'}: ${msg.content}`
      ).join('\n') + '\n\n';
    }
    
    const prompt = `
    คุณเป็นผู้เชี่ยวชาญด้านการเกษตรในประเทศไทย ให้คำแนะนำที่สมบูรณ์และตรงประเด็น (1-2 ประโยค)

    ${conversationContext}คำถามปัจจุบัน: ${message}

    ตอบให้สมบูรณ์ในประโยคที่สั้นกระชับ ไม่ตัดคำ และเป็นประโยชน์สำหรับเกษตรกร
    `;

    try {
      if (this.config.geminiApiKey) {
        console.log('Using Gemini API for chat with key: Key provided');
        return await this.callGeminiChatAPI(prompt);
      } else {
        console.warn('No Gemini API key provided, falling back to mock data');
        return this.getMockChatResponse(message);
      }
    } catch (error) {
      console.error('Gemini Chat API error:', error);
      return this.getMockChatResponse(message);
    }
  }

  // Generate crop recommendations using AI
  async generateCropRecommendations(season: string, location: string): Promise<CropData[]> {
    console.log('=== generateCropRecommendations called ===');
    console.log('Season:', season, 'Location:', location);
    
    const prompt = `
    คุณเป็นผู้เชี่ยวชาญด้านการเกษตรในประเทศไทย กรุณาสร้างข้อมูลคำแนะนำการปลูกพืชสำหรับเกษตรกรใน${location} ในช่วง${season}

    กรุณาสร้างข้อมูลพืช 3 ชนิดในรูปแบบ JSON array โดยมีโครงสร้างดังนี้:
    [
      {
        "name": "ชื่อภาษาอังกฤษ",
        "thaiName": "ชื่อภาษาไทย",
        "icon": "emoji",
        "currentPrice": ราคาปัจจุบันต่อตัน,
        "predictedPrice": ราคาคาดการณ์ต่อตัน,
        "riskScore": คะแนนความเสี่ยง1-10,
        "returnScore": คะแนนผลตอบแทน1-10,
        "plantingSeason": "ฤดูปลูก",
        "harvestTime": จำนวนวันเก็บเกี่ยว,
        "investment": ต้นทุนต่อไร่,
        "expectedReturn": กำไรคาดการณ์ต่อไร่,
        "confidence": ความเชื่อมั่นเป็นเปอร์เซ็นต์,
        "marketTrend": "แนวโน้มตลาด",
        "recommendations": ["คำแนะนำ1", "คำแนะนำ2", "คำแนะนำ3"]
      }
    ]

    ข้อมูลต้องเป็นจริงและเหมาะสมกับตลาดเกษตรไทย
    `;

    try {
      if (this.config.geminiApiKey) {
        console.log('Using Gemini API with key: Key provided');
        return await this.callGeminiAPI(prompt);
      } else {
        console.warn('No Gemini API key provided, falling back to mock data');
        return this.getMockCropData();
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      console.log('Falling back to mock data due to error');
      return this.getMockCropData();
    }
  }

  // Generate market analysis using AI
  async generateMarketAnalysis(cropName: string): Promise<MarketAnalysis> {
    const prompt = `
    วิเคราะห์ตลาดสำหรับ${cropName}ในประเทศไทย

    กรุณาสร้างข้อมูลในรูปแบบ JSON:
    {
      "cropName": "${cropName}",
      "currentPrice": ราคาปัจจุบันต่อตัน,
      "priceHistory": [
        {"date": "2024-01", "price": ราคา},
        {"date": "2024-02", "price": ราคา},
        {"date": "2024-03", "price": ราคา},
        {"date": "2024-04", "price": ราคา},
        {"date": "2024-05", "price": ราคา},
        {"date": "2024-06", "price": ราคา}
      ],
      "prediction": {
        "nextMonth": ราคาคาดการณ์เดือนหน้า,
        "nextThreeMonths": ราคาคาดการณ์3เดือน,
        "confidence": ความเชื่อมั่นเป็นเปอร์เซ็นต์,
        "factors": ["ปัจจัย1", "ปัจจัย2", "ปัจจัย3"]
      },
      "marketTrend": "rising/falling/stable",
      "recommendation": "คำแนะนำสำหรับเกษตรกร"
    }
    `;

    try {
      if (this.config.geminiApiKey) {
        return await this.callGeminiMarketAPI(prompt);
      } else {
        return this.getMockMarketData();
      }
    } catch (error) {
      console.error('Gemini Market API error:', error);
      return this.getMockMarketData();
    }
  }

  // Generate weather recommendations using AI
  async generateWeatherRecommendations(location: string): Promise<WeatherData> {
    const prompt = `
    ให้คำแนะนำการเกษตรตามสภาพอากาศสำหรับ${location}ในประเทศไทย

    กรุณาสร้างข้อมูลในรูปแบบ JSON:
    {
      "temperature": อุณหภูมิปัจจุบัน,
      "humidity": ความชื้นเป็นเปอร์เซ็นต์,
      "rainfall": ปริมาณฝนเป็นมิลลิเมตร,
      "forecast": "พยากรณ์อากาศ",
      "recommendations": ["คำแนะนำ1", "คำแนะนำ2", "คำแนะนำ3"]
    }
    `;

    try {
      if (this.config.geminiApiKey) {
        return await this.callGeminiWeatherAPI(prompt);
      } else {
        return this.getMockWeatherData();
      }
    } catch (error) {
      console.error('Gemini Weather API error:', error);
      return this.getMockWeatherData();
    }
  }

  // Gemini Chat API call
  private async callGeminiChatAPI(prompt: string): Promise<string> {
    try {
      if (!this.config.geminiApiKey) {
        console.error('Gemini API key is missing!');
        return this.getMockChatResponse(prompt);
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${this.config.geminiApiKey}`;
      console.log('Calling Gemini API...');
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Gemini Chat API error: ${response.status}`, errorData);
        console.warn('Falling back to mock response');
        return this.getMockChatResponse(prompt);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.warn('Invalid Gemini Chat API response:', data);
        console.warn('Falling back to mock response');
        return this.getMockChatResponse(prompt);
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      console.log('Gemini API response received successfully');
      return generatedText.trim();
    } catch (error) {
      console.error('Gemini Chat API call failed:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      return this.getMockChatResponse(prompt);
    }
  }



  // Mock chat response
  private getMockChatResponse(message: string): string {
    const input = message.toLowerCase();
    
    if (input.includes('สวัสดี') || input.includes('hello')) {
      return 'สวัสดีครับ! ผมเป็นผู้ช่วยเกษตร AI ที่จะช่วยตอบคำถามเกี่ยวกับการเกษตร การปลูกพืช การดูแลพืช และการแก้ปัญหาโรคต่างๆ ครับ มีอะไรให้ช่วยไหมครับ?';
    }
    
    if (input.includes('ข้าว') || input.includes('ปลูก')) {
      return 'สำหรับการปลูกข้าว ผมแนะนำให้เตรียมดินให้ดีก่อนปลูก ใช้ปุ๋ยอินทรีย์เพื่อเพิ่มความอุดมสมบูรณ์ และควบคุมน้ำให้เหมาะสมครับ';
    }
    
    if (input.includes('โรค') || input.includes('ใบจุด')) {
      return 'โรคใบจุดในข้าวสามารถแก้ไขได้โดยใช้สารชีวภัณฑ์หรือสารเคมีที่เหมาะสม และควรระวังเรื่องการระบายน้ำให้ดีครับ';
    }
    
    return 'ขอบคุณสำหรับคำถามครับ ผมจะช่วยหาคำตอบให้คุณเกี่ยวกับการเกษตรครับ';
  }

  // Gemini API calls
  private async callGeminiAPI(prompt: string): Promise<CropData[]> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${this.config.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        console.warn(`Gemini API error: ${response.status}, falling back to mock data`);
        return this.getMockCropData();
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.warn('Invalid Gemini API response, falling back to mock data');
        return this.getMockCropData();
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Parse the generated text and convert to structured data
      return this.parseAIResponse(generatedText);
    } catch (error) {
      console.error('Gemini API call failed:', error);
      return this.getMockCropData();
    }
  }

  private async callGeminiMarketAPI(prompt: string): Promise<MarketAnalysis> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${this.config.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        console.warn(`Gemini Market API error: ${response.status}, falling back to mock data`);
        return this.getMockMarketData();
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.warn('Invalid Gemini Market API response, falling back to mock data');
        return this.getMockMarketData();
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      
      return this.parseMarketResponse(generatedText);
    } catch (error) {
      console.error('Gemini Market API call failed:', error);
      return this.getMockMarketData();
    }
  }

  private async callGeminiWeatherAPI(prompt: string): Promise<WeatherData> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${this.config.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        console.warn(`Gemini Weather API error: ${response.status}, falling back to mock data`);
        return this.getMockWeatherData();
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.warn('Invalid Gemini Weather API response, falling back to mock data');
        return this.getMockWeatherData();
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      
      return this.parseWeatherResponse(generatedText);
    } catch (error) {
      console.error('Gemini Weather API call failed:', error);
      return this.getMockWeatherData();
    }
  }



  // Parse AI responses
  private parseAIResponse(text: string): CropData[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback to mock data if parsing fails
      return this.getMockCropData();
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return this.getMockCropData();
    }
  }

  private parseMarketResponse(text: string): MarketAnalysis {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return this.getMockMarketData();
    } catch (error) {
      console.error('Failed to parse market response:', error);
      return this.getMockMarketData();
    }
  }

  private parseWeatherResponse(text: string): WeatherData {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return this.getMockWeatherData();
    } catch (error) {
      console.error('Failed to parse weather response:', error);
      return this.getMockWeatherData();
    }
  }

  // Mock data fallbacks
  private getMockCropData(): CropData[] {
    return [
      {
        name: 'ข้าวหอมมะลิ',
        thaiName: 'ข้าวหอมมะลิ',
        icon: '🌾',
        currentPrice: 15000,
        predictedPrice: 16000,
        riskScore: 3,
        returnScore: 8,
        plantingSeason: 'ฤดูฝน',
        harvestTime: 120,
        investment: 8000,
        expectedReturn: 12000,
        confidence: 85,
        marketTrend: 'เพิ่มขึ้น',
        recommendations: [
          'เตรียมดินให้ดีก่อนปลูก',
          'ใช้ปุ๋ยอินทรีย์เพื่อเพิ่มความอุดมสมบูรณ์',
          'ควบคุมน้ำให้เหมาะสม',
          'ป้องกันโรคใบจุดและแมลงศัตรู'
        ]
      },
      {
        name: 'ข้าวเหนียว',
        thaiName: 'ข้าวเหนียว',
        icon: '🌾',
        currentPrice: 12000,
        predictedPrice: 13000,
        riskScore: 4,
        returnScore: 7,
        plantingSeason: 'ฤดูฝน',
        harvestTime: 110,
        investment: 7000,
        expectedReturn: 10000,
        confidence: 75,
        marketTrend: 'เสถียร',
        recommendations: [
          'เลือกพันธุ์ที่เหมาะสมกับพื้นที่',
          'จัดการน้ำอย่างเหมาะสม',
          'ใช้ปุ๋ยตามคำแนะนำ',
          'เก็บเกี่ยวในเวลาที่เหมาะสม'
        ]
      }
    ];
  }

  private getMockMarketData(): MarketAnalysis {
    return {
      cropName: 'ข้าว',
      currentPrice: 12500,
      priceHistory: [
        { date: '2024-01-01', price: 12000 },
        { date: '2024-01-15', price: 12200 },
        { date: '2024-02-01', price: 12500 },
        { date: '2024-03-01', price: 12800 },
        { date: '2024-04-01', price: 13000 },
        { date: '2024-05-01', price: 13200 }
      ],
      prediction: {
        nextMonth: 13500,
        nextThreeMonths: 14000,
        confidence: 85,
        factors: [
          'ราคาน้ำมันเชื้อเพลิงเพิ่มขึ้น',
          'ความต้องการข้าวหอมมะลิในตลาดสูง',
          'ผลผลิตในปีนี้คาดว่าจะลดลง',
          'นโยบายการส่งออกข้าวของรัฐบาล'
        ]
      },
      marketTrend: 'rising',
      recommendation: 'ควรขายเมื่อราคาสูง เก็บรักษาสินค้าให้ดี และติดตามราคาตลาดอย่างใกล้ชิด'
    };
  }

  private getMockWeatherData(): WeatherData {
    return {
      temperature: 28,
      humidity: 75,
      rainfall: 150,
      forecast: 'มีฝนตกปานกลาง',
      recommendations: [
        'ควรระวังเรื่องการระบายน้ำ',
        'ป้องกันโรคพืชที่เกิดจากความชื้น',
        'เก็บเกี่ยวผลผลิตให้ทันก่อนฝนตกหนัก'
      ]
    };
  }
}

// Create singleton instance
let aiService: AIService | null = null;
let cachedApiKey: string | undefined = undefined;

export function getAIService(): AIService {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  // Log for debugging
  console.log('getAIService called - API key present:', !!apiKey);
  if (apiKey) {
    console.log('API key value:', `${apiKey.substring(0, 10)}...`);
  } else {
    console.warn('API key NOT SET - check .env.local file');
  }
  
  // Recreate service if key changed or service doesn't exist
  if (!aiService || cachedApiKey !== apiKey) {
    console.log('Creating new AIService instance with API key');
    aiService = new AIService({
      geminiApiKey: apiKey
    });
    cachedApiKey = apiKey;
  }
  
  return aiService;
}

export default AIService;
