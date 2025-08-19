'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CropData, MarketAnalysis, WeatherData } from '@/lib/ai';

interface CropRecommendation {
  id: string;
  name: string;
  thaiName: string;
  icon: string;
  riskScore: number;
  returnScore: number;
  currentPrice: number;
  predictedPrice: number;
  plantingSeason: string;
  harvestTime: number;
  investment: number;
  expectedReturn: number;
  confidence: number;
}

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [recommendations, setRecommendations] = useState<CropData[]>([]);
  const [marketData, setMarketData] = useState<MarketAnalysis | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch AI-generated recommendations
      const recResponse = await fetch('/api/ai/recommendations?season=ฤดูฝน&location=ภาคกลาง');
      const recData = await recResponse.json();
      
      if (recData.success) {
        setRecommendations(recData.recommendations);
      }

      // Fetch market analysis for rice
      const marketResponse = await fetch('/api/ai/market-analysis?crop=ข้าว');
      const marketData = await marketResponse.json();
      
      if (marketData.success) {
        setMarketData(marketData.analysis);
      }

      // Fetch weather data
      const weatherResponse = await fetch('/api/ai/weather?location=ภาคกลาง');
      const weatherData = await weatherResponse.json();
      
      if (weatherData.success) {
        setWeatherData(weatherData.weatherData);
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 2) return 'text-green-600 bg-green-100';
    if (score <= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getReturnColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'rising') return 'text-green-600';
    if (trend === 'falling') return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return '📈';
    if (trend === 'falling') return '📉';
    return '➡️';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูลจาก AI...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🌾</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">เช่อแอ๋ว GPT</h1>
                <p className="text-gray-600">แดชบอร์ดเกษตรกร (ขับเคลื่อนด้วย AI)</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/marketplace"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🛒 ตลาดชุมชน
              </Link>
              <Link
                href="/knowledge"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📚 ความรู้
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">🤖</div>
              <div>
                <p className="text-gray-600 text-sm">พืชที่แนะนำ (AI)</p>
                <p className="text-2xl font-bold text-gray-900">{recommendations.length} ชนิด</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💰</div>
              <div>
                <p className="text-gray-600 text-sm">รายได้คาดการณ์</p>
                <p className="text-2xl font-bold text-green-600">
                  {recommendations.reduce((sum, crop) => sum + crop.expectedReturn, 0).toLocaleString()} บาท
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">📈</div>
              <div>
                <p className="text-gray-600 text-sm">ราคาเฉลี่ย</p>
                <p className="text-2xl font-bold text-blue-600">
                  +{((recommendations.reduce((sum, crop) => sum + (crop.predictedPrice - crop.currentPrice) / crop.currentPrice, 0) / recommendations.length) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">🎯</div>
              <div>
                <p className="text-gray-600 text-sm">ความแม่นยำ AI</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(recommendations.reduce((sum, crop) => sum + crop.confidence, 0) / recommendations.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">คำแนะนำการปลูกจาก AI (3 เดือนข้างหน้า)</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">อัปเดตเมื่อ: {new Date().toLocaleString('th-TH')}</span>
                  <button 
                    onClick={fetchData}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    🔄 อัปเดต
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recommendations.map((crop, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                                              <div className="flex items-center space-x-4">
                          <div className="text-3xl">{crop.icon || '🌾'}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{crop.thaiName || crop.name}</h3>
                            <p className="text-sm text-gray-600">ฤดูปลูก: {crop.plantingSeason || 'ไม่ระบุ'}</p>
                            <p className="text-sm text-gray-600">แนวโน้มตลาด: {crop.marketTrend || 'ไม่ระบุ'}</p>
                          </div>
                        </div>
                      <div className="text-right">
                        <div className="flex space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(crop.riskScore || 5)}`}>
                            ความเสี่ยง: {crop.riskScore || 5}/10
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReturnColor(crop.returnScore || 5)}`}>
                            ผลตอบแทน: {crop.returnScore || 5}/10
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">ความเชื่อมั่น AI: {crop.confidence || 75}%</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">ราคาปัจจุบัน</p>
                        <p className="font-semibold">{(crop.currentPrice || 0).toLocaleString()} บาท/ตัน</p>
                      </div>
                      <div>
                        <p className="text-gray-600">ราคาคาดการณ์</p>
                        <p className="font-semibold text-green-600">{(crop.predictedPrice || 0).toLocaleString()} บาท/ตัน</p>
                      </div>
                      <div>
                        <p className="text-gray-600">ต้นทุน</p>
                        <p className="font-semibold">{(crop.investment || 0).toLocaleString()} บาท/ไร่</p>
                      </div>
                      <div>
                        <p className="text-gray-600">กำไรคาดการณ์</p>
                        <p className="font-semibold text-green-600">{(crop.expectedReturn || 0).toLocaleString()} บาท/ไร่</p>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 คำแนะนำจาก AI:</h4>
                      <ul className="space-y-1">
                        {(crop.recommendations || []).map((rec, idx) => (
                          <li key={idx} className="text-sm text-blue-700">• {rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Link
                        href={`/crop/${crop.name}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        ดูรายละเอียด
                      </Link>
                      <Link
                        href={`/knowledge/${crop.name}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        คู่มือการปลูก
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Analysis */}
            {marketData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">การวิเคราะห์ตลาด {marketData.cropName}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ราคาปัจจุบัน</span>
                    <span className="font-semibold">{(marketData.currentPrice || 0).toLocaleString()} บาท/ตัน</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">แนวโน้ม</span>
                    <span className={`font-semibold ${getTrendColor(marketData.marketTrend)}`}>
                      {getTrendIcon(marketData.marketTrend)} {marketData.marketTrend === 'rising' ? 'ขึ้น' : marketData.marketTrend === 'falling' ? 'ลง' : 'เสถียร'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ความเชื่อมั่น</span>
                    <span className="font-semibold">{marketData.prediction?.confidence || 75}%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800 font-semibold mb-2">💡 คำแนะนำ:</p>
                  <p className="text-sm text-yellow-700">{marketData.recommendation || 'ติดตามราคาตลาดอย่างใกล้ชิด'}</p>
                </div>
                <Link
                  href="/prices"
                  className="block text-center mt-4 text-green-600 hover:text-green-700 text-sm"
                >
                  ดูการวิเคราะห์เพิ่มเติม →
                </Link>
              </div>
            )}

            {/* Weather Data */}
            {weatherData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🌤️ สภาพอากาศ</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">อุณหภูมิ</span>
                    <span className="font-semibold">{weatherData.temperature || 30}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ความชื้น</span>
                    <span className="font-semibold">{weatherData.humidity || 70}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ปริมาณฝน</span>
                    <span className="font-semibold">{weatherData.rainfall || 0} มม.</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-semibold mb-2">📅 พยากรณ์:</p>
                  <p className="text-sm text-blue-700">{weatherData.forecast || 'สภาพอากาศปกติ'}</p>
                </div>
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-semibold mb-2">🌱 คำแนะนำ:</p>
                  <ul className="space-y-1">
                    {(weatherData.recommendations || []).map((rec, idx) => (
                      <li key={idx} className="text-sm text-green-700">• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">การดำเนินการ</h3>
              <div className="space-y-3">
                <Link
                  href="/record"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                >
                  📝 บันทึกการปลูก
                </Link>
                <Link
                  href="/marketplace/sell"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                >
                  🛒 ขายผลผลิต
                </Link>
                <Link
                  href="/weather"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                >
                  🌤️ สภาพอากาศ
                </Link>
              </div>
            </div>

            {/* AI Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🤖 สถานะ AI</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ระบบ AI</span>
                  <span className="text-green-600 font-semibold">✅ ทำงานปกติ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ข้อมูลล่าสุด</span>
                  <span className="text-blue-600 font-semibold">{new Date().toLocaleTimeString('th-TH')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ความแม่นยำ</span>
                  <span className="text-purple-600 font-semibold">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
