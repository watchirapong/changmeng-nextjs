'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ArticleDetail() {
  const params = useParams();
  const category = (params.category as string)?.toString().toLowerCase();
  const id = params.id as string;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-yellow-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href={`/knowledge/${category}`} className="text-white hover:text-yellow-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">บทความ</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{`บทความรหัส ${id}`}</h2>
          <p className="text-gray-700 leading-7">
            ตัวอย่างหน้าแสดงรายละเอียดบทความ คุณสามารถเชื่อมต่อกับฐานข้อมูลหรือ API เพื่อดึงเนื้อหาจริงได้ภายหลัง
          </p>
        </div>
      </div>
    </div>
  );
}


