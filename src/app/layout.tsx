import type { Metadata } from "next";
import "./globals.css";
import ChatBubble from "@/components/ChatBubble";

export const metadata: Metadata = {
  title: "AgriLearn - ระบบแนะนำการเกษตรอัจฉริยะ",
  description: "แพลตฟอร์มเกษตรอัจฉริยะที่ใช้ AI ช่วยแนะนำการปลูกพืช วิเคราะห์ตลาด และจัดการฟาร์มอย่างมีประสิทธิภาพ",
  metadataBase: new URL('https://agrilearn.cloud'),
  keywords: ['เกษตร', 'การเกษตร', 'AI', 'ปลูกพืช', 'ตลาดการเกษตร', 'ฟาร์ม', 'Thailand Agriculture'],
  authors: [{ name: 'AgriLearn Team' }],
  openGraph: {
    title: 'AgriLearn - ระบบแนะนำการเกษตรอัจฉริยะ',
    description: 'แพลตฟอร์มเกษตรอัจฉริยะที่ใช้ AI ช่วยแนะนำการปลูกพืช วิเคราะห์ตลาด และจัดการฟาร์มอย่างมีประสิทธิภาพ',
    url: 'https://agrilearn.cloud',
    siteName: 'AgriLearn',
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgriLearn - ระบบแนะนำการเกษตรอัจฉริยะ',
    description: 'แพลตฟอร์มเกษตรอัจฉริยะที่ใช้ AI ช่วยแนะนำการปลูกพืช วิเคราะห์ตลาด และจัดการฟาร์มอย่างมีประสิทธิภาพ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
        <ChatBubble />
      </body>
    </html>
  );
}
