'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  product: string;
  amount: number;
  price: number;
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
  rating?: number;
}

interface Review {
  id: string;
  from: string;
  rating: number;
  comment: string;
  date: Date;
  type: 'buyer' | 'seller';
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'transactions' | 'reviews'>('profile');
  
  const userProfile = {
    name: 'สมชาย ใจดี',
    email: 'somchai@example.com',
    phone: '081-234-5678',
    location: 'อำเภอเมือง จังหวัดนครราชสีมา',
    memberSince: '2023-01-15',
    totalTransactions: 24,
    averageRating: 4.8,
    totalReviews: 18,
    profileImage: '/api/placeholder/100/100'
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'sell',
      product: 'ข้าวหอมมะลิ',
      amount: 500,
      price: 12500,
      date: new Date('2024-01-15'),
      status: 'completed',
      rating: 5
    },
    {
      id: '2',
      type: 'buy',
      product: 'ปุ๋ยอินทรีย์',
      amount: 50,
      price: 1200,
      date: new Date('2024-01-10'),
      status: 'completed',
      rating: 4
    },
    {
      id: '3',
      type: 'sell',
      product: 'ข้าวเหนียว',
      amount: 300,
      price: 8000,
      date: new Date('2024-01-05'),
      status: 'pending'
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      from: 'คุณสมหญิง',
      rating: 5,
      comment: 'ข้าวคุณภาพดีมาก ราคาเป็นธรรม ขอบคุณครับ',
      date: new Date('2024-01-15'),
      type: 'buyer'
    },
    {
      id: '2',
      from: 'คุณสมศักดิ์',
      rating: 4,
      comment: 'สินค้าส่งตรงเวลา บรรจุภัณฑ์ดี',
      date: new Date('2024-01-10'),
      type: 'buyer'
    },
    {
      id: '3',
      from: 'คุณสมปอง',
      rating: 5,
      comment: 'ข้าวหอมมะลิคุณภาพดี ราคาเหมาะสม',
      date: new Date('2024-01-05'),
      type: 'buyer'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'เสร็จสิ้น';
      case 'pending':
        return 'รอดำเนินการ';
      case 'cancelled':
        return 'ยกเลิก';
      default:
        return status;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="text-white hover:text-yellow-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold">โปรไฟล์</h1>
            </div>
            <button className="text-sm hover:text-yellow-200 transition-colors">
              แก้ไข
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
              <p className="text-gray-600">{userProfile.location}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  {renderStars(userProfile.averageRating)}
                  <span className="text-sm text-gray-600 ml-1">
                    {userProfile.averageRating} ({userProfile.totalReviews} รีวิว)
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  สมาชิกตั้งแต่ {new Date(userProfile.memberSince).toLocaleDateString('th-TH')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">{userProfile.totalTransactions}</div>
              <div className="text-sm text-gray-600">ธุรกรรม</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ข้อมูลส่วนตัว
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ประวัติธุรกรรม
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                รีวิวและคะแนน
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                    <input
                      type="text"
                      value={userProfile.location}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">สถิติการใช้งาน</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{userProfile.totalTransactions}</div>
                      <div className="text-sm text-gray-600">ธุรกรรมทั้งหมด</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{userProfile.averageRating}</div>
                      <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{userProfile.totalReviews}</div>
                      <div className="text-sm text-gray-600">รีวิวทั้งหมด</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">ประวัติธุรกรรม</h3>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>ทั้งหมด</option>
                      <option>ขาย</option>
                      <option>ซื้อ</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>ล่าสุด</option>
                      <option>เก่าสุด</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            transaction.type === 'sell' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {transaction.type === 'sell' ? 'ขาย' : 'ซื้อ'} {transaction.product}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {transaction.amount} {transaction.product.includes('ข้าว') ? 'กก.' : 'กก.'} • 
                              {new Date(transaction.date).toLocaleDateString('th-TH')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ฿{transaction.price.toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                              {getStatusText(transaction.status)}
                            </span>
                            {transaction.rating && (
                              <div className="flex items-center space-x-1">
                                {renderStars(transaction.rating)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">รีวิวและคะแนน</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">คะแนนเฉลี่ย:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(userProfile.averageRating)}
                      <span className="font-semibold text-gray-900">{userProfile.averageRating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{review.from}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              review.type === 'buyer' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {review.type === 'buyer' ? 'ผู้ซื้อ' : 'ผู้ขาย'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(review.date).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
