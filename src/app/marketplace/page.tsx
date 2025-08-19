'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  thaiName: string;
  icon: string;
  price: number;
  quantity: number;
  unit: string;
  seller: string;
  location: string;
  description: string;
  image?: string;
  isExpiring: boolean;
  discount?: number;
  rating: number;
  reviews: number;
  postedAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'rice',
    thaiName: 'ข้าวหอมมะลิ',
    icon: '🌾',
    price: 8500,
    quantity: 2,
    unit: 'ตัน',
    seller: 'สวนข้าวคุณสมชาย',
    location: 'จังหวัดสุรินทร์',
    description: 'ข้าวหอมมะลิคุณภาพดี ปลูกแบบอินทรีย์ ไม่ใช้สารเคมี',
    rating: 4.8,
    reviews: 12,
    postedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'corn',
    thaiName: 'ข้าวโพดหวาน',
    icon: '🌽',
    price: 12000,
    quantity: 1.5,
    unit: 'ตัน',
    seller: 'ฟาร์มข้าวโพดลุงแดง',
    location: 'จังหวัดนครราชสีมา',
    description: 'ข้าวโพดหวานสดใหม่ หวานกรอบ เก็บเกี่ยววันนี้',
    rating: 4.6,
    reviews: 8,
    postedAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'cassava',
    thaiName: 'มันสำปะหลัง',
    icon: '🥔',
    price: 2800,
    quantity: 5,
    unit: 'ตัน',
    seller: 'สวนมันสำปะหลังป้าสมศรี',
    location: 'จังหวัดชลบุรี',
    description: 'มันสำปะหลังคุณภาพดี เหมาะสำหรับทำแป้ง',
    isExpiring: true,
    discount: 15,
    rating: 4.4,
    reviews: 5,
    postedAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'vegetables',
    thaiName: 'ผักกาดขาว',
    icon: '🥬',
    price: 25,
    quantity: 100,
    unit: 'กิโลกรัม',
    seller: 'สวนผักคุณแม่',
    location: 'จังหวัดนนทบุรี',
    description: 'ผักกาดขาวสดใหม่ ปลูกในโรงเรือน ปลอดสารพิษ',
    rating: 4.9,
    reviews: 25,
    postedAt: '2024-01-16'
  }
];

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showExpiringOnly, setShowExpiringOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: '🛒' },
    { id: 'rice', name: 'ข้าว', icon: '🌾' },
    { id: 'corn', name: 'ข้าวโพด', icon: '🌽' },
    { id: 'cassava', name: 'มันสำปะหลัง', icon: '🥔' },
    { id: 'vegetables', name: 'ผัก', icon: '🥬' },
    { id: 'fruits', name: 'ผลไม้', icon: '🍎' }
  ];

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.thaiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.name === selectedCategory);
    }

    // Filter by expiring products
    if (showExpiringOnly) {
      filtered = filtered.filter(product => product.isExpiring);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, showExpiringOnly]);

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🛒</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ตลาดชุมชน</h1>
                <p className="text-gray-600">ซื้อขายผลผลิตเกษตรโดยตรง</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/marketplace/sell"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📝 ขายสินค้า
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🏠 หน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="ค้นหาสินค้า, ผู้ขาย, หรือสถานที่..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">ใหม่ล่าสุด</option>
                <option value="price-low">ราคาต่ำ-สูง</option>
                <option value="price-high">ราคาสูง-ต่ำ</option>
                <option value="rating">คะแนนสูงสุด</option>
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showExpiringOnly}
                onChange={(e) => setShowExpiringOnly(e.target.checked)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">แสดงสินค้าใกล้หมดอายุเท่านั้น</span>
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">📦</div>
              <div>
                <p className="text-gray-600 text-sm">สินค้าทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{filteredProducts.length} รายการ</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">👥</div>
              <div>
                <p className="text-gray-600 text-sm">ผู้ขาย</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(filteredProducts.map(p => p.seller)).size} คน
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💰</div>
              <div>
                <p className="text-gray-600 text-sm">ราคาเฉลี่ย</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toLocaleString()} บาท
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="text-2xl mr-4">⭐</div>
              <div>
                <p className="text-gray-600 text-sm">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredProducts.length > 0 ? (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(1) : '0.0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-6xl">{product.icon}</div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{product.thaiName}</h3>
                  {product.isExpiring && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      ⏰ ใกล้หมดอายุ
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-2">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(product.postedAt)}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ราคา:</span>
                    <span className="font-semibold">
                      {product.discount ? (
                        <span>
                          <span className="line-through text-gray-400">{product.price.toLocaleString()}</span>
                          <span className="text-red-600 ml-2">
                            {getDiscountedPrice(product.price, product.discount).toLocaleString()} บาท
                          </span>
                        </span>
                      ) : (
                        <span>{product.price.toLocaleString()} บาท</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">จำนวน:</span>
                    <span className="font-semibold">{product.quantity} {product.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ผู้ขาย:</span>
                    <span className="font-semibold text-blue-600">{product.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">สถานที่:</span>
                    <span className="font-semibold">{product.location}</span>
                  </div>
                </div>

                {product.discount && (
                  <div className="bg-red-100 text-red-800 text-sm p-2 rounded-lg mb-3 text-center">
                    🎉 ลด {product.discount}% ใกล้หมดอายุ!
                  </div>
                )}

                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    💬 สอบถาม
                  </button>
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    🛒 ซื้อเลย
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบสินค้า</h3>
            <p className="text-gray-600 mb-4">ลองเปลี่ยนเงื่อนไขการค้นหาหรือหมวดหมู่</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowExpiringOnly(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              ล้างตัวกรอง
            </button>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">สินค้าแนะนำ</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🌾</div>
                <h3 className="font-semibold text-gray-900 mb-2">ข้าวคุณภาพดี</h3>
                <p className="text-sm text-gray-600">ข้าวหอมมะลิอินทรีย์ จากเกษตรกรโดยตรง</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🥬</div>
                <h3 className="font-semibold text-gray-900 mb-2">ผักปลอดสาร</h3>
                <p className="text-sm text-gray-600">ผักสดใหม่ ปลูกในโรงเรือน ปลอดสารพิษ</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🍎</div>
                <h3 className="font-semibold text-gray-900 mb-2">ผลไม้ตามฤดูกาล</h3>
                <p className="text-sm text-gray-600">ผลไม้สดใหม่ ตามฤดูกาล ราคาเป็นธรรม</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
