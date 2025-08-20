'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FarmRecord {
  id: string;
  cropName: string;
  date: string;
  area: number; // ไร่
  cost: number;
  income: number;
  profit: number;
  notes: string;
}

export default function FarmLog() {
  const [records, setRecords] = useState<FarmRecord[]>([
    {
      id: '1',
      cropName: 'ข้าว',
      date: '2024-01-15',
      area: 5,
      cost: 75000,
      income: 110000,
      profit: 35000,
      notes: 'ข้าวหอมมะลิ เก็บเกี่ยวเดือนมกราคม'
    },
    {
      id: '2',
      cropName: 'ข้าวโพด',
      date: '2023-12-20',
      area: 3,
      cost: 36000,
      income: 54000,
      profit: 18000,
      notes: 'ข้าวโพดหวาน เก็บเกี่ยวเดือนธันวาคม'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    date: '',
    area: '',
    cost: '',
    income: '',
    notes: ''
  });

  const crops = [
    { id: 'ข้าว', name: 'ข้าว', icon: '🌾' },
    { id: 'ข้าวโพด', name: 'ข้าวโพด', icon: '🌽' },
    { id: 'มันสำปะหลัง', name: 'มันสำปะหลัง', icon: '🥔' },
    { id: 'อ้อย', name: 'อ้อย', icon: '🎋' },
    { id: 'ยางพารา', name: 'ยางพารา', icon: '🌳' },
    { id: 'ผัก', name: 'ผัก', icon: '🥬' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: FarmRecord = {
      id: Date.now().toString(),
      cropName: formData.cropName,
      date: formData.date,
      area: parseFloat(formData.area),
      cost: parseFloat(formData.cost),
      income: parseFloat(formData.income),
      profit: parseFloat(formData.income) - parseFloat(formData.cost),
      notes: formData.notes
    };

    setRecords([newRecord, ...records]);
    setFormData({
      cropName: '',
      date: '',
      area: '',
      cost: '',
      income: '',
      notes: ''
    });
    setShowForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateStats = () => {
    const totalCost = records.reduce((sum, record) => sum + record.cost, 0);
    const totalIncome = records.reduce((sum, record) => sum + record.income, 0);
    const totalProfit = records.reduce((sum, record) => sum + record.profit, 0);
    const totalArea = records.reduce((sum, record) => sum + record.area, 0);
    const avgProfitPerRai = totalArea > 0 ? totalProfit / totalArea : 0;

    return {
      totalCost,
      totalIncome,
      totalProfit,
      totalArea,
      avgProfitPerRai
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">📝</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">บันทึกการปลูก</h1>
                <p className="text-gray-600">ติดตามต้นทุน รายได้ และกำไร</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {showForm ? '❌ ยกเลิก' : '➕ เพิ่มบันทึก'}
              </button>
              <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                🏠 หน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💰</div>
              <div>
                <p className="text-gray-600 text-sm">ต้นทุนรวม</p>
                <p className="text-2xl font-bold text-red-600">{stats.totalCost.toLocaleString()} บาท</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">📈</div>
              <div>
                <p className="text-gray-600 text-sm">รายได้รวม</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalIncome.toLocaleString()} บาท</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💵</div>
              <div>
                <p className="text-gray-600 text-sm">กำไรรวม</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalProfit.toLocaleString()} บาท</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">🌾</div>
              <div>
                <p className="text-gray-600 text-sm">พื้นที่รวม</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalArea} ไร่</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">📊</div>
              <div>
                <p className="text-gray-600 text-sm">กำไร/ไร่</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgProfitPerRai.toLocaleString()} บาท</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Record Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">เพิ่มบันทึกการปลูก</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">พืช</label>
                <select
                  value={formData.cropName}
                  onChange={(e) => handleInputChange('cropName', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">เลือกพืช</option>
                  {crops.map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.icon} {crop.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เก็บเกี่ยว</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">พื้นที่ (ไร่)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ต้นทุน (บาท)</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รายได้ (บาท)</label>
                <input
                  type="number"
                  value={formData.income}
                  onChange={(e) => handleInputChange('income', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">หมายเหตุ</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="บันทึกเพิ่มเติม..."
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  💾 บันทึก
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  ❌ ยกเลิก
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Records List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ประวัติการปลูก</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">พืช</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">วันที่</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">พื้นที่</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">ต้นทุน</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">รายได้</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">กำไร</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">กำไร/ไร่</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {crops.find(c => c.id === record.cropName)?.icon || '🌾'}
                        </span>
                        <span className="font-medium">{record.cropName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(record.date).toLocaleDateString('th-TH')}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{record.area} ไร่</td>
                    <td className="py-3 px-4 text-red-600 font-medium">
                      {(record.cost || 0).toLocaleString()} บาท
                    </td>
                    <td className="py-3 px-4 text-green-600 font-medium">
                      {(record.income || 0).toLocaleString()} บาท
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${(record.profit || 0) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {(record.profit || 0) >= 0 ? '+' : ''}{(record.profit || 0).toLocaleString()} บาท
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${(record.profit || 0) >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                        {(record.profit || 0) >= 0 ? '+' : ''}{((record.profit || 0) / (record.area || 1)).toLocaleString()} บาท
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Profit by Crop */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">กำไรแยกตามพืช</h3>
            <div className="space-y-4">
              {crops.map(crop => {
                const cropRecords = records.filter(r => r.cropName === crop.id);
                const totalProfit = cropRecords.reduce((sum, r) => sum + (r.profit || 0), 0);
                const totalArea = cropRecords.reduce((sum, r) => sum + (r.area || 0), 0);
                
                if (cropRecords.length === 0) return null;
                
                return (
                  <div key={crop.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{crop.icon}</span>
                      <div>
                        <div className="font-medium">{crop.name}</div>
                        <div className="text-sm text-gray-600">{totalArea} ไร่</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${totalProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString()} บาท
                      </div>
                      <div className="text-sm text-gray-600">
                        {(totalProfit / (totalArea || 1)).toLocaleString()} บาท/ไร่
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สรุปรายเดือน</h3>
            <div className="space-y-4">
              {Array.from(new Set(records.map(r => new Date(r.date).getFullYear() + '-' + (new Date(r.date).getMonth() + 1)))).map(month => {
                const monthRecords = records.filter(r => {
                  const recordMonth = new Date(r.date).getFullYear() + '-' + (new Date(r.date).getMonth() + 1);
                  return recordMonth === month;
                });
                const monthProfit = monthRecords.reduce((sum, r) => sum + (r.profit || 0), 0);
                const monthIncome = monthRecords.reduce((sum, r) => sum + (r.income || 0), 0);
                
                return (
                  <div key={month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {new Date(month + '-01').toLocaleDateString('th-TH', { year: 'numeric', month: 'long' })}
                      </div>
                      <div className="text-sm text-gray-600">{monthRecords.length} รายการ</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${monthProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {monthProfit >= 0 ? '+' : ''}{monthProfit.toLocaleString()} บาท
                      </div>
                      <div className="text-sm text-gray-600">
                        รายได้: {monthIncome.toLocaleString()} บาท
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/recommendations"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
            >
              🌱 ดูคำแนะนำการปลูก
            </Link>
            <Link
              href="/market-analysis"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
            >
              📊 วิเคราะห์ตลาด
            </Link>
            <Link
              href="/marketplace"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
            >
              🛒 ตลาดชุมชน
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
