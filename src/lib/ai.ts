// AI Service for generating agricultural data
export interface AIConfig {
  geminiApiKey?: string;
  openaiApiKey?: string;
  model: 'gemini' | 'gpt-4' | 'gpt-3.5-turbo';
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

  // Generate crop recommendations using AI
  async generateCropRecommendations(season: string, location: string): Promise<CropData[]> {
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
      if (this.config.model === 'gemini' && this.config.geminiApiKey) {
        return await this.callGeminiAPI(prompt);
      } else if (this.config.openaiApiKey) {
        return await this.callOpenAIAPI(prompt);
      } else {
        // Fallback to mock data
        return this.getMockCropData();
      }
    } catch (error) {
      console.error('AI API error:', error);
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
      if (this.config.model === 'gemini' && this.config.geminiApiKey) {
        return await this.callGeminiMarketAPI(prompt);
      } else if (this.config.openaiApiKey) {
        return await this.callOpenAIMarketAPI(prompt);
      } else {
        return this.getMockMarketData();
      }
    } catch (error) {
      console.error('AI Market API error:', error);
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
      if (this.config.model === 'gemini' && this.config.geminiApiKey) {
        return await this.callGeminiWeatherAPI(prompt);
      } else if (this.config.openaiApiKey) {
        return await this.callOpenAIWeatherAPI(prompt);
      } else {
        return this.getMockWeatherData();
      }
    } catch (error) {
      console.error('AI Weather API error:', error);
      return this.getMockWeatherData();
    }
  }

  // Gemini API calls
  private async callGeminiAPI(prompt: string): Promise<CropData[]> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyChGMJnvb3bZ5p3gARRRBtZNyQ9AVQ-JUc`, {
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyChGMJnvb3bZ5p3gARRRBtZNyQ9AVQ-JUc`, {
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyChGMJnvb3bZ5p3gARRRBtZNyQ9AVQ-JUc`, {
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

  // OpenAI API calls
  private async callOpenAIAPI(prompt: string): Promise<CropData[]> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: 'You are an agricultural expert specializing in Thai farming. Provide realistic data and recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    return this.parseAIResponse(generatedText);
  }

  private async callOpenAIMarketAPI(prompt: string): Promise<MarketAnalysis> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: 'You are a market analyst specializing in Thai agricultural markets.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    return this.parseMarketResponse(generatedText);
  }

  private async callOpenAIWeatherAPI(prompt: string): Promise<WeatherData> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: 'You are a weather and agricultural expert for Thailand.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    return this.parseWeatherResponse(generatedText);
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
      return this.getMockMarketAnalysis('ข้าว');
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
        season: 'ฤดูฝน',
        location: 'ภาคกลาง',
        riskLevel: 'ต่ำ',
        expectedYield: '800-1200 กก./ไร่',
        marketPrice: '12,000-15,000 บาท/ตัน',
        confidence: 85,
        description: 'ข้าวหอมมะลิเหมาะสำหรับปลูกในฤดูฝน ต้องการน้ำมาก แต่ให้ผลผลิตดีและราคาสูง',
        recommendations: [
          'เตรียมดินให้ดีก่อนปลูก',
          'ใช้ปุ๋ยอินทรีย์เพื่อเพิ่มความอุดมสมบูรณ์',
          'ควบคุมน้ำให้เหมาะสม',
          'ป้องกันโรคใบจุดและแมลงศัตรู'
        ]
      },
      {
        name: 'ข้าวเหนียว',
        season: 'ฤดูฝน',
        location: 'ภาคเหนือ',
        riskLevel: 'ปานกลาง',
        expectedYield: '600-900 กก./ไร่',
        marketPrice: '8,000-12,000 บาท/ตัน',
        confidence: 75,
        description: 'ข้าวเหนียวเหมาะสำหรับปลูกในภาคเหนือ ต้องการน้ำปานกลาง',
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
      currentPrice: 12500,
      priceHistory: [
        { date: '2024-01-01', price: 12000 },
        { date: '2024-01-15', price: 12200 },
        { date: '2024-02-01', price: 12500 }
      ],
      pricePrediction: 13000,
      marketTrend: 'เพิ่มขึ้น',
      demandLevel: 'สูง',
      supplyLevel: 'ปานกลาง',
      factors: [
        'ราคาน้ำมันเชื้อเพลิงเพิ่มขึ้น',
        'ความต้องการข้าวหอมมะลิในตลาดสูง',
        'ผลผลิตในปีนี้คาดว่าจะลดลง'
      ],
      recommendations: [
        'ควรขายเมื่อราคาสูง',
        'เก็บรักษาสินค้าให้ดี',
        'ติดตามราคาตลาดอย่างใกล้ชิด'
      ]
    };
  }

  private getMockWeatherData(): WeatherData {
    return {
      temperature: 28,
      humidity: 75,
      rainfall: 150,
      windSpeed: 10,
      forecast: 'มีฝนตกปานกลาง',
      recommendations: [
        'ควรระวังเรื่องการระบายน้ำ',
        'ป้องกันโรคพืชที่เกิดจากความชื้น',
        'เก็บเกี่ยวผลผลิตให้ทันก่อนฝนตกหนัก'
      ],
      riskLevel: 'ปานกลาง'
    };
  }
}

// Create singleton instance
let aiService: AIService | null = null;

export function getAIService(): AIService {
  if (!aiService) {
    aiService = new AIService({
      geminiApiKey: 'AIzaSyChGMJnvb3bZ5p3gARRRBtZNyQ9AVQ-JUc',
      openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      model: 'gemini'
    });
  }
  return aiService;
}

export default AIService;
