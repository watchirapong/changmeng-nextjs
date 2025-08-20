'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MarketData {
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

export default function MarketAnalysis() {
  const [selectedCrop, setSelectedCrop] = useState('ข้าว');
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareCrops, setCompareCrops] = useState<string[]>(['ข้าว', 'ข้าวโพด']);

  const crops = [
    { id: 'ข้าว', name: 'ข้าว', icon: '🌾' },
    { id: 'ข้าวโพด', name: 'ข้าวโพด', icon: '🌽' },
    { id: 'มันสำปะหลัง', name: 'มันสำปะหลัง', icon: '🥔' },
    { id: 'อ้อย', name: 'อ้อย', icon: '🎋' },
    { id: 'ยางพารา', name: 'ยางพารา', icon: '🌳' }
  ];

  const fetchMarketData = async (cropName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/market-analysis?crop=${cropName}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMarketData(data.analysis);
        }
      } else {
        console.error('Error response:', response.status);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(selectedCrop);
  }, [selectedCrop]);

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

  const calculatePriceChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">📊</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">วิเคราะห์ราคาและตลาด</h1>
                <p className="text-gray-600">ติดตามราคา แนวโน้ม และการวิเคราะห์ตลาด</p>
              </div>
            </div>
            <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              🏠 หน้าแรก
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">เลือกพืช</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {crops.map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.icon} {crop.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  compareMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {compareMode ? '🔍 ปิดการเปรียบเทียบ' : '📊 เปรียบเทียบพืช'}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              อัปเดตล่าสุด: {new Date().toLocaleString('th-TH')}
            </div>
          </div>

          {compareMode && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">เลือกพืชเพื่อเปรียบเทียบ</h3>
              <div className="flex flex-wrap gap-2">
                {crops.map(crop => (
                  <button
                    key={crop.id}
                    onClick={() => {
                      if (compareCrops.includes(crop.id)) {
                        setCompareCrops(compareCrops.filter(c => c !== crop.id));
                      } else if (compareCrops.length < 3) {
                        setCompareCrops([...compareCrops, crop.id]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      compareCrops.includes(crop.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    {crop.icon} {crop.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังวิเคราะห์ข้อมูลตลาด...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Current Market Overview */}
            {marketData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ราคาปัจจุบัน</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {(marketData.currentPrice || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">บาท/ตัน</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">แนวโน้มตลาด</h3>
                  <div className="text-center">
                    <div className={`text-3xl mb-2 ${getTrendColor(marketData.marketTrend)}`}>
                      {getTrendIcon(marketData.marketTrend)}
                    </div>
                    <div className={`font-semibold ${getTrendColor(marketData.marketTrend)}`}>
                      {marketData.marketTrend === 'rising' ? 'ขึ้น' : marketData.marketTrend === 'falling' ? 'ลง' : 'เสถียร'}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ความเชื่อมั่น</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {marketData.prediction?.confidence || 0}%
                    </div>
                    <div className="text-sm text-gray-600">ในการคาดการณ์</div>
                  </div>
                </div>
              </div>
            )}

            {/* Price History Chart */}
            {marketData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติราคา 6 เดือนย้อนหลัง</h3>
                <div className="space-y-4">
                  {(marketData.priceHistory || []).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.date}</span>
                      <span className="font-semibold text-gray-900">{(item.price || 0).toLocaleString()} บาท/ตัน</span>
                      {index > 0 && (
                        <span className={`text-sm ${
                          (item.price || 0) > (marketData.priceHistory[index - 1].price || 0)
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {(item.price || 0) > (marketData.priceHistory[index - 1].price || 0) ? '+' : ''}
                          {calculatePriceChange(item.price || 0, marketData.priceHistory[index - 1].price || 0)}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Predictions */}
            {marketData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">การคาดการณ์ราคา</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📅 เดือนหน้า</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {(marketData.prediction?.nextMonth || 0).toLocaleString()} บาท/ตัน
                    </div>
                    <div className="text-sm text-green-700">
                      {(marketData.prediction?.nextMonth || 0) > (marketData.currentPrice || 0) ? '+' : ''}
                      {calculatePriceChange(marketData.prediction?.nextMonth || 0, marketData.currentPrice || 0)}% 
                      จากราคาปัจจุบัน
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📅 3 เดือนข้างหน้า</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {(marketData.prediction?.nextThreeMonths || 0).toLocaleString()} บาท/ตัน
                    </div>
                    <div className="text-sm text-blue-700">
                      {(marketData.prediction?.nextThreeMonths || 0) > (marketData.currentPrice || 0) ? '+' : ''}
                      {calculatePriceChange(marketData.prediction?.nextThreeMonths || 0, marketData.currentPrice || 0)}% 
                      จากราคาปัจจุบัน
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Market Factors */}
            {marketData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ปัจจัยที่ส่งผลต่อราคา</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(marketData.prediction?.factors || []).map((factor, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">💡</span>
                        <span className="text-sm text-yellow-800">{factor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendation */}
            {marketData && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 คำแนะนำจาก AI</h3>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">{marketData.recommendation || 'ติดตามราคาตลาดอย่างใกล้ชิด'}</p>
                </div>
              </div>
            )}

            {/* Economic Impact Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การวิเคราะห์ผลกระทบทางเศรษฐกิจ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🌍 ปัจจัยโลก</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• ราคาน้ำมันเชื้อเพลิง</li>
                    <li>• อัตราแลกเปลี่ยน</li>
                    <li>• การค้าระหว่างประเทศ</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🌦️ ปัจจัยธรรมชาติ</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• สภาพอากาศ</li>
                    <li>• ภัยธรรมชาติ</li>
                    <li>• ฤดูกาล</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">📈 ปัจจัยตลาด</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• อุปสงค์-อุปทาน</li>
                    <li>• การแข่งขัน</li>
                    <li>• นโยบายรัฐ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/recommendations"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
                >
                  🌱 ดูคำแนะนำการปลูก
                </Link>
                <Link
                  href="/marketplace"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
                >
                  🛒 ไปตลาดชุมชน
                </Link>
                <Link
                  href="/farm-log"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
                >
                  📝 บันทึกการปลูก
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
