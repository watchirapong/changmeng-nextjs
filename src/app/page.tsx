import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🌻</div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-800">AgriLearn</h1>
                <p className="text-yellow-600">แอปแนะนำการเกษตรอัจฉริยะ</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                เริ่มใช้งาน
              </Link>
              <Link
                href="/marketplace"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                ตลาดชุมชน
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-yellow-800 mb-6">
            ปลูกอะไรดี? ขายยังไงให้คุ้ม?
          </h2>
          <p className="text-xl text-yellow-700 mb-8 max-w-3xl mx-auto">
            AgriLearn จะช่วยคุณตัดสินใจปลูกพืชที่เหมาะสมตามฤดูกาล ราคา และภาวะเศรษฐกิจ 
            พร้อมตลาดขายตรงและความรู้การเกษตรครบครัน
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recommendations"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              🌱 ดูคำแนะนำการปลูก
            </Link>
            <Link
              href="/marketplace"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              🛒 ตลาดขายตรง
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">วิเคราะห์ล่วงหน้า 3 เดือน</h3>
            <p className="text-yellow-700">
              คาดการณ์ราคาและความต้องการพืชผลล่วงหน้า 3 เดือน 
              พร้อมคะแนนความเสี่ยงและผลตอบแทน
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">ตลาดขายตรง</h3>
            <p className="text-yellow-700">
              ขายผลผลิตตรงสู่ผู้บริโภค ลดพ่อค้าคนกลาง 
              พร้อมระบบขายใกล้หมดอายุลดราคา
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">ความรู้การเกษตร</h3>
            <p className="text-yellow-700">
              คู่มือดูแลพืช ป้องกันโรคและศัตรูพืช 
              สูตรปุ๋ยและการจัดการแปลง
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-800 text-center mb-8">ผลลัพธ์ที่ได้</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">+25%</div>
              <div className="text-yellow-700">รายได้เฉลี่ยเพิ่มขึ้น</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">-40%</div>
              <div className="text-yellow-700">ของเสียลดลง</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">85%</div>
              <div className="text-yellow-700">ความแม่นยำคำแนะนำ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">+60%</div>
              <div className="text-yellow-700">ขายตรงเพิ่มขึ้น</div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-yellow-800 text-center mb-8">วิธีการใช้งาน</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-yellow-800 mb-2">เลือกพืชที่สนใจ</h4>
              <p className="text-yellow-700 text-sm">เลือกพืชที่ต้องการปลูกหรือขาย</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-yellow-800 mb-2">ดูคำแนะนำ</h4>
              <p className="text-yellow-700 text-sm">รับคำแนะนำการปลูกและราคา</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-yellow-800 mb-2">ปลูกและดูแล</h4>
              <p className="text-yellow-700 text-sm">ใช้คู่มือการดูแลพืช</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-semibold text-yellow-800 mb-2">ขายในตลาด</h4>
              <p className="text-yellow-700 text-sm">ขายตรงในตลาดชุมชน</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-yellow-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">AgriLearn</p>
            <p className="text-yellow-200">แอปแนะนำการเกษตรอัจฉริยะเพื่อเกษตรกรไทย</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link href="/about" className="text-yellow-200 hover:text-white">เกี่ยวกับเรา</Link>
              <Link href="/contact" className="text-yellow-200 hover:text-white">ติดต่อ</Link>
              <Link href="/help" className="text-yellow-200 hover:text-white">ช่วยเหลือ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
