'use client';
import { useState } from 'react';
import Link from 'next/link';

interface ProductForm {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
  location: string;
  expiryDate: string;
  images: File[];
  isExpiringSoon: boolean;
  discount: number;
}

export default function MarketplaceSell() {
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    category: '',
    quantity: 0,
    unit: 'กก.',
    price: 0,
    description: '',
    location: '',
    expiryDate: '',
    images: [],
    isExpiringSoon: false,
    discount: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'ข้าว',
    'ผัก',
    'ผลไม้',
    'สมุนไพร',
    'ปุ๋ย',
    'เมล็ดพันธุ์',
    'อื่นๆ'
  ];

  const units = [
    'กก.',
    'ตัน',
    'ถุง',
    'กล่อง',
    'ชิ้น',
    'กิโลกรัม'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        quantity: 0,
        unit: 'กก.',
        price: 0,
        description: '',
        location: '',
        expiryDate: '',
        images: [],
        isExpiringSoon: false,
        discount: 0
      });

      alert('ลงขายสินค้าสำเร็จแล้ว!');
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('เกิดข้อผิดพลาดในการลงขายสินค้า');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDiscountedPrice = () => {
    if (formData.isExpiringSoon && formData.discount > 0) {
      return formData.price * (1 - formData.discount / 100);
    }
    return formData.price;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/marketplace" className="text-white hover:text-green-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold">ลงขายสินค้า</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ลงขายสินค้าใหม่</h2>
            <p className="text-gray-600">กรอกข้อมูลสินค้าที่ต้องการขายในตลาดชุมชน</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="เช่น ข้าวหอมมะลิ, ผักบุ้ง, มะเขือเทศ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่ *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  จำนวน *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หน่วย *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ราคาต่อหน่วย (บาท) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Expiry Date and Discount */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วันหมดอายุ
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isExpiringSoon"
                    checked={formData.isExpiringSoon}
                    onChange={(e) => setFormData(prev => ({ ...prev, isExpiringSoon: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isExpiringSoon" className="ml-2 block text-sm text-gray-700">
                    สินค้าใกล้หมดอายุ (ลดราคา)
                  </label>
                </div>

                {formData.isExpiringSoon && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ส่วนลด (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานที่ขาย *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="เช่น อำเภอเมือง จังหวัดนครราชสีมา"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รายละเอียดสินค้า
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="อธิบายรายละเอียดสินค้า คุณภาพ การเก็บรักษา ฯลฯ"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพสินค้า
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                สามารถอัปโหลดได้หลายรูป (สูงสุด 5 รูป)
              </p>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Summary */}
            {formData.price > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">สรุปราคา</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ราคาปกติ:</span>
                    <span>฿{formData.price.toLocaleString()} ต่อ {formData.unit}</span>
                  </div>
                  {formData.isExpiringSoon && formData.discount > 0 && (
                    <>
                      <div className="flex justify-between text-green-600">
                        <span>ส่วนลด:</span>
                        <span>-{formData.discount}%</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>ราคาหลังลด:</span>
                        <span>฿{calculateDiscountedPrice().toLocaleString()} ต่อ {formData.unit}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>ราคารวม:</span>
                    <span>฿{(calculateDiscountedPrice() * formData.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/marketplace"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>กำลังลงขาย...</span>
                  </div>
                ) : (
                  'ลงขายสินค้า'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">เคล็ดลับการขายสินค้า</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>ใส่รูปภาพสินค้าที่ชัดเจน เพื่อให้ผู้ซื้อเห็นคุณภาพสินค้า</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>ระบุวันหมดอายุที่ชัดเจน เพื่อความโปร่งใส</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>ตั้งราคาที่เหมาะสมกับคุณภาพและตลาด</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>อธิบายรายละเอียดสินค้าให้ครบถ้วน</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>สินค้าใกล้หมดอายุควรลดราคาเพื่อขายได้เร็วขึ้น</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
