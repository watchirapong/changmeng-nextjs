'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'หน้าแรก', icon: '🏠' },
    { href: '/dashboard', label: 'แดชบอร์ด', icon: '📊' },
    { href: '/recommendations', label: 'คำแนะนำพืช', icon: '🌾' },
    { href: '/marketplace', label: 'ตลาดชุมชน', icon: '🛒' },
    { href: '/market-analysis', label: 'วิเคราะห์ราคา', icon: '📈' },
    { href: '/knowledge', label: 'ความรู้เกษตร', icon: '📚' },
    { href: '/farm-log', label: 'บันทึกฟาร์ม', icon: '📝' },
    { href: '/notifications', label: 'การแจ้งเตือน', icon: '🔔' },
    { href: '/ai-chat', label: 'ผู้ช่วย AI', icon: '🤖' },
    { href: '/profile', label: 'โปรไฟล์', icon: '👤' }
  ];

  return (
    <nav className="bg-white shadow-lg border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-1">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-green-600 text-sm">เช่อแอ๋ว GPT</span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="hidden lg:inline">{item.icon} {item.label}</span>
                <span className="lg:hidden">{item.icon}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden py-2 border-t">
          <div className="grid grid-cols-5 gap-1">
            {navItems.slice(0, 10).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg text-center text-xs transition-colors ${
                  pathname === item.href
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="truncate">{item.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
