'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CropRecommendation {
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

export default function Recommendations() {
  const [selectedLocation, setSelectedLocation] = useState('ภาคกลาง');
  const [selectedSeason, setSelectedSeason] = useState('ฤดูฝน');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);

  const locations = [
    { id: 'ภาคเหนือ', name: 'ภาคเหนือ' },
    { id: 'ภาคกลาง', name: 'ภาคกลาง' },
    { id: 'ภาคตะวันออกเฉียงเหนือ', name: 'ภาคตะวันออกเฉียงเหนือ' },
    { id: 'ภาคตะวันออก', name: 'ภาคตะวันออก' },
    { id: 'ภาคตะวันตก', name: 'ภาคตะวันตก' },
    { id: 'ภาคใต้', name: 'ภาคใต้' }
  ];

  const seasons = [
    { id: 'ฤดูร้อน', name: 'ฤดูร้อน (มีนาคม-พฤษภาคม)' },
    { id: 'ฤดูฝน', name: 'ฤดูฝน (มิถุนายน-ตุลาคม)' },
    { id: 'ฤดูหนาว', name: 'ฤดูหนาว (พฤศจิกายน-กุมภาพันธ์)' }
  ];

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/recommendations?season=${selectedSeason}&location=${selectedLocation}`);
      const data = await response.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [selectedLocation, selectedSeason]);

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

  const calculateROI = (investment: number, expectedReturn: number) => {
    return ((expectedReturn - investment) / investment * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🌱</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">คำแนะนำการปลูกพืช</h1>
                <p className="text-gray-600">AI แนะนำพืชที่เหมาะสมตามพื้นที่และฤดูกาล</p>
              </div>
            </div>
            <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              🏠 หน้าแรก
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">เลือกเงื่อนไข</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">พื้นที่</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ฤดูกาล</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {seasons.map(season => (
                  <option key={season.id} value={season.id}>{season.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchRecommendations}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {loading ? '🔄 กำลังโหลด...' : '🔍 ค้นหา'}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังวิเคราะห์ข้อมูลจาก AI...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recommendations List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                คำแนะนำสำหรับ {selectedLocation} ใน{selectedSeason}
              </h2>
              <div className="space-y-6">
                {recommendations.map((crop, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{crop.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{crop.thaiName}</h3>
                          <p className="text-gray-600">ฤดูปลูก: {crop.plantingSeason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(crop.riskScore)}`}>
                            ความเสี่ยง: {crop.riskScore}/10
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReturnColor(crop.returnScore)}`}>
                            ผลตอบแทน: {crop.returnScore}/10
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">ความเชื่อมั่น AI: {crop.confidence}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">ราคาปัจจุบัน</p>
                        <p className="font-semibold text-lg">{crop.currentPrice.toLocaleString()} บาท/ตัน</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">ราคาคาดการณ์</p>
                        <p className="font-semibold text-lg text-green-600">{crop.predictedPrice.toLocaleString()} บาท/ตัน</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">ต้นทุน</p>
                        <p className="font-semibold text-lg">{crop.investment.toLocaleString()} บาท/ไร่</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">กำไรคาดการณ์</p>
                        <p className="font-semibold text-lg text-orange-600">{crop.expectedReturn.toLocaleString()} บาท/ไร่</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 คำแนะนำจาก AI:</h4>
                      <ul className="space-y-1">
                        {crop.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-blue-700">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Selected Crop Details */}
            <div className="space-y-6">
              {selectedCrop ? (
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">รายละเอียด {selectedCrop.thaiName}</h3>
                  
                  {/* Risk vs Return Chart */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">ความเสี่ยง vs ผลตอบแทน</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>ความเสี่ยง</span>
                          <span>{selectedCrop.riskScore}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${selectedCrop.riskScore <= 3 ? 'bg-green-500' : selectedCrop.riskScore <= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${selectedCrop.riskScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>ผลตอบแทน</span>
                          <span>{selectedCrop.returnScore}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${selectedCrop.returnScore >= 8 ? 'bg-green-500' : selectedCrop.returnScore >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${selectedCrop.returnScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROI Calculation */}
                  <div className="mb-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">💰 การคำนวณผลตอบแทน</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ต้นทุน:</span>
                        <span>{selectedCrop.investment.toLocaleString()} บาท/ไร่</span>
                      </div>
                      <div className="flex justify-between">
                        <span>รายได้คาดการณ์:</span>
                        <span>{selectedCrop.expectedReturn.toLocaleString()} บาท/ไร่</span>
                      </div>
                      <div className="flex justify-between font-semibold text-green-600">
                        <span>ROI:</span>
                        <span>{calculateROI(selectedCrop.investment, selectedCrop.expectedReturn)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Trend */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">📈 แนวโน้มตลาด</h4>
                    <p className="text-sm text-gray-600">{selectedCrop.marketTrend}</p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      href={`/knowledge/${selectedCrop.name}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                    >
                      📚 ดูคู่มือการปลูก
                    </Link>
                    <Link
                      href={`/market-analysis?crop=${selectedCrop.name}`}
                      className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                    >
                      📊 วิเคราะห์ตลาด
                    </Link>
                    <Link
                      href="/marketplace/sell"
                      className="block w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                    >
                      🛒 ขายผลผลิต
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">เลือกพืชเพื่อดูรายละเอียด</h3>
                  <p className="text-gray-600 text-sm">
                    คลิกที่พืชที่สนใจเพื่อดูรายละเอียดเพิ่มเติม การวิเคราะห์ความเสี่ยง และคำแนะนำการปลูก
                  </p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">สถิติ</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">พืชที่แนะนำ</span>
                    <span className="font-semibold">{recommendations.length} ชนิด</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ความเสี่ยงเฉลี่ย</span>
                    <span className="font-semibold">
                      {(recommendations.reduce((sum, crop) => sum + crop.riskScore, 0) / recommendations.length).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ผลตอบแทนเฉลี่ย</span>
                    <span className="font-semibold">
                      {(recommendations.reduce((sum, crop) => sum + crop.returnScore, 0) / recommendations.length).toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
