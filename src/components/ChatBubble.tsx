'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-72 bg-white rounded-xl shadow-lg border border-green-200 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <div>
                <div className="font-semibold text-green-800">AgriLearn</div>
                <div className="text-xs text-green-700">ผู้ช่วยเกษตร AI</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            สอบถามเรื่องการปลูกพืช การดูแล และปัญหาโรคพืชได้เลย
          </div>
          <Link href="/ai-chat" className="mt-3 inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-md">
            เปิดห้องแชท
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg flex items-center justify-center hover:from-green-700 hover:to-green-800"
        aria-label="เปิดแชท AI"
      >
        💬
      </button>
    </div>
  );
}


