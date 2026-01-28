'use client';

import Link from 'next/link';

export default function Knowledge() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">📚</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ความรู้การเกษตร</h1>
                <p className="text-gray-600">คู่มือและเทคนิคการเกษตร</p>
              </div>
            </div>
            <Link href="/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors">
              🏠 หน้าแรก
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">เรียนรู้การเกษตร</h2>
          <p className="text-xl text-gray-600">คู่มือการเกษตรที่ครบครัน</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/knowledge/rice" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🌾</div>
            <h3 className="font-semibold text-gray-900 mb-2">การปลูกข้าว</h3>
            <p className="text-gray-600 mb-4">เรียนรู้เทคนิคการปลูกข้าว</p>
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg inline-block">
              ดูบทความ
            </div>
          </Link>
          
          <Link href="/knowledge/vegetables" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🥬</div>
            <h3 className="font-semibold text-gray-900 mb-2">การปลูกผัก</h3>
            <p className="text-gray-600 mb-4">การปลูกผักในโรงเรือน</p>
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg inline-block">
              ดูบทความ
            </div>
          </Link>
          
          <Link href="/knowledge/fruits" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🍎</div>
            <h3 className="font-semibold text-gray-900 mb-2">การปลูกผลไม้</h3>
            <p className="text-gray-600 mb-4">การดูแลสวนผลไม้</p>
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg inline-block">
              ดูบทความ
            </div>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/knowledge/herbs" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="font-semibold text-gray-900 mb-2">สมุนไพร</h3>
            <p className="text-gray-600 mb-4">การปลูกและใช้สมุนไพร</p>
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg inline-block">
              ดูบทความ
            </div>
          </Link>
          
          <Link href="/knowledge/fertilizer" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="font-semibold text-gray-900 mb-2">ปุ๋ยและการบำรุงดิน</h3>
            <p className="text-gray-600 mb-4">การใช้ปุ๋ยอย่างถูกต้อง</p>
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg inline-block">
              ดูบทความ
            </div>
          </Link>
          
          <Link href="/knowledge/pest" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🐛</div>
            <h3 className="font-semibold text-gray-900 mb-2">ศัตรูพืช</h3>
            <p className="text-gray-600 mb-4">การป้องกันและกำจัดศัตรูพืช</p>
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg inline-block">
              ดูบทความ
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
