'use client';

import { useState } from 'react';
import { getAIService } from '@/lib/ai';

export default function TestAI() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testAI = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const aiService = getAIService();
      
      // Test crop recommendations
      const recommendations = await aiService.generateCropRecommendations('ฤดูฝน', 'ภาคกลาง');
      
      // Test market analysis
      const marketAnalysis = await aiService.generateMarketAnalysis('ข้าว');
      
      // Test weather data
      const weatherData = await aiService.generateWeatherRecommendations('ภาคกลาง');

      setResults({
        recommendations,
        marketAnalysis,
        weatherData,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('AI Test Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🤖 ทดสอบ AI Integration</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ทดสอบ Gemini API</h2>
          <p className="text-gray-600 mb-4">
            หน้านี้จะทดสอบการเชื่อมต่อกับ Gemini API เพื่อสร้างข้อมูลการเกษตร
          </p>
          
          <button
            onClick={testAI}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? '🔄 กำลังทดสอบ...' : '🚀 เริ่มทดสอบ AI'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">❌ เกิดข้อผิดพลาด</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-8">
            {/* Crop Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🌾 คำแนะนำการปลูกพืช</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.recommendations.map((crop: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{crop.icon}</span>
                      <h4 className="font-semibold">{crop.thaiName}</h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><strong>ราคาปัจจุบัน:</strong> {crop.currentPrice?.toLocaleString()} บาท/ตัน</p>
                      <p><strong>ราคาคาดการณ์:</strong> {crop.predictedPrice?.toLocaleString()} บาท/ตัน</p>
                      <p><strong>ความเสี่ยง:</strong> {crop.riskScore}/10</p>
                      <p><strong>ผลตอบแทน:</strong> {crop.returnScore}/10</p>
                      <p><strong>ความเชื่อมั่น:</strong> {crop.confidence}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 การวิเคราะห์ตลาด</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">ข้อมูลตลาด {results.marketAnalysis.cropName}</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>ราคาปัจจุบัน:</strong> {results.marketAnalysis.currentPrice?.toLocaleString()} บาท/ตัน</p>
                    <p><strong>แนวโน้ม:</strong> {results.marketAnalysis.marketTrend}</p>
                    <p><strong>ความเชื่อมั่น:</strong> {results.marketAnalysis.prediction?.confidence}%</p>
                    <p><strong>คำแนะนำ:</strong> {results.marketAnalysis.recommendation}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">ประวัติราคา</h4>
                  <div className="space-y-1 text-sm">
                    {results.marketAnalysis.priceHistory?.map((item: any, index: number) => (
                      <p key={index}>
                        {item.date}: {item.price?.toLocaleString()} บาท/ตัน
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Data */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🌤️ ข้อมูลสภาพอากาศ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">สภาพอากาศปัจจุบัน</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>อุณหภูมิ:</strong> {results.weatherData.temperature}°C</p>
                    <p><strong>ความชื้น:</strong> {results.weatherData.humidity}%</p>
                    <p><strong>ปริมาณฝน:</strong> {results.weatherData.rainfall} มม.</p>
                    <p><strong>พยากรณ์:</strong> {results.weatherData.forecast}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">คำแนะนำการเกษตร</h4>
                  <ul className="space-y-1 text-sm">
                    {results.weatherData.recommendations?.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Raw Data */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 ข้อมูลดิบ</h3>
              <details>
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                  ดูข้อมูล JSON
                </summary>
                <pre className="mt-4 bg-white p-4 rounded border text-xs overflow-auto">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>เวลาทดสอบ: {results?.timestamp ? new Date(results.timestamp).toLocaleString('th-TH') : '-'}</p>
        </div>
      </div>
    </div>
  );
}
