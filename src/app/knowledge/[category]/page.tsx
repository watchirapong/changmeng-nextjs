'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function KnowledgeCategory() {
  const params = useParams();
  const category = (params.category as string)?.toString();
  const categorySlug = (category || '').toLowerCase();

  const getMockArticles = (cat: string): Article[] => {
    console.log('getMockArticles called with category:', cat);
    const articlesByCategory: { [key: string]: Article[] } = {
      rice: [
        {
          id: '1',
          title: 'วิธีปลูกข้าวหอมมะลิให้ได้ผลผลิตดี',
          content: 'ข้าวหอมมะลิเป็นข้าวที่มีคุณภาพดีและราคาสูง การปลูกข้าวหอมมะลิให้ได้ผลผลิตดีต้องเริ่มจากการเตรียมดินที่ดี...',
          category: 'rice',
          author: 'ดร.สมชาย เกษตรศาสตร์',
          date: '2024-01-15',
          readTime: '5 นาที',
          tags: ['ข้าวหอมมะลิ', 'การปลูก', 'ผลผลิต']
        },
        {
          id: '2',
          title: 'การป้องกันโรคใบจุดในข้าว',
          content: 'โรคใบจุดเป็นโรคที่สำคัญในข้าวที่สามารถทำให้ผลผลิตลดลงได้ การป้องกันโรคใบจุดต้องเริ่มจากการเลือกพันธุ์ที่ต้านทาน...',
          category: 'rice',
          author: 'ดร.สมหญิง พืชศาสตร์',
          date: '2024-01-10',
          readTime: '3 นาที',
          tags: ['โรคพืช', 'การป้องกัน', 'ข้าว']
        }
      ],
      vegetables: [
        {
          id: '3',
          title: 'การปลูกผักบุ้งในระบบไฮโดรโพนิกส์',
          content: 'การปลูกผักบุ้งในระบบไฮโดรโพนิกส์เป็นวิธีที่ทันสมัยและให้ผลผลิตสูง การปลูกแบบนี้ไม่ต้องใช้ดิน...',
          category: 'vegetables',
          author: 'ดร.สมปอง เทคโนโลยีการเกษตร',
          date: '2024-01-12',
          readTime: '7 นาที',
          tags: ['ผักบุ้ง', 'ไฮโดรโพนิกส์', 'เทคโนโลยี']
        }
      ],
      fruits: [
        {
          id: '4',
          title: 'การดูแลสวนมะม่วงให้ได้ผลผลิตดี',
          content: 'มะม่วงเป็นผลไม้เศรษฐกิจที่สำคัญ การดูแลสวนมะม่วงให้ได้ผลผลิตดีต้องมีการจัดการที่เหมาะสม...',
          category: 'fruits',
          author: 'ดร.สมศักดิ์ ไม้ผล',
          date: '2024-01-08',
          readTime: '6 นาที',
          tags: ['มะม่วง', 'ไม้ผล', 'การดูแล']
        }
      ]
    };

    const result = articlesByCategory[cat] || [];
    console.log('getMockArticles returning:', result.length, 'articles');
    return result;
  };

  // Get articles directly
  const articles = getMockArticles(categorySlug);

  console.log('Category from params:', category);
  console.log('Category slug:', categorySlug);
  console.log('Articles found:', articles.length);

  const getCategoryTitle = (cat: string): string => {
    const titles: { [key: string]: string } = {
      rice: 'ความรู้เกี่ยวกับข้าว',
      vegetables: 'ความรู้เกี่ยวกับผัก',
      fruits: 'ความรู้เกี่ยวกับผลไม้',
      herbs: 'ความรู้เกี่ยวกับสมุนไพร',
      fertilizer: 'ความรู้เกี่ยวกับปุ๋ย',
      pest: 'ความรู้เกี่ยวกับศัตรูพืช'
    };
    return titles[cat] || 'ความรู้การเกษตร';
  };

  const getCategoryIcon = (cat: string): string => {
    const icons: { [key: string]: string } = {
      rice: '🌾',
      vegetables: '🥬',
      fruits: '🍎',
      herbs: '🌿',
      fertilizer: '🌱',
      pest: '🐛'
    };
    return icons[cat] || '📚';
  };

  console.log('Component render - articles:', articles.length);
  if (false) { // Always show content
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-yellow-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <Link href="/knowledge" className="text-white hover:text-yellow-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold">กำลังโหลด...</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/knowledge" className="text-white hover:text-yellow-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(categorySlug)}</span>
                <h1 className="text-xl font-bold">{getCategoryTitle(categorySlug)}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีบทความ</h3>
            <p className="text-gray-500 mb-6">เรากำลังเพิ่มบทความใหม่สำหรับหมวดหมู่นี้</p>
            <Link
              href="/knowledge"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              กลับไปหน้าความรู้
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Category Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                เกี่ยวกับ{getCategoryTitle(categorySlug)}
              </h2>
              <p className="text-gray-600">
                ค้นพบความรู้และเทคนิคการเกษตรที่เกี่ยวข้องกับ{getCategoryTitle(categorySlug).toLowerCase()} 
                จากผู้เชี่ยวชาญและเกษตรกรที่มีประสบการณ์
              </p>
            </div>

            {/* Articles */}
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/knowledge/${categorySlug}/${article.id}`} className="block">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.content}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>โดย {article.author}</span>
                          <span>{new Date(article.date).toLocaleDateString('th-TH')}</span>
                          <span>⏱️ {article.readTime}</span>
                        </div>
                        <Link href={`/knowledge/${categorySlug}/${article.id}`} className="text-yellow-600 hover:text-yellow-700 font-medium">
                          อ่านเพิ่มเติม →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Related Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">หมวดหมู่อื่นๆ</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'rice', name: 'ข้าว', icon: '🌾' },
                  { id: 'vegetables', name: 'ผัก', icon: '🥬' },
                  { id: 'fruits', name: 'ผลไม้', icon: '🍎' },
                  { id: 'herbs', name: 'สมุนไพร', icon: '🌿' },
                  { id: 'fertilizer', name: 'ปุ๋ย', icon: '🌱' },
                  { id: 'pest', name: 'ศัตรูพืช', icon: '🐛' }
                ].map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/knowledge/${cat.id}`}
                    className={`p-4 rounded-lg border-2 text-center transition-colors ${
                      cat.id === categorySlug
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="font-medium">{cat.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
