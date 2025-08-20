'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'สวัสดีครับ! ผมเป็นผู้ช่วยเกษตร AI มีอะไรให้ช่วยไหมครับ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Generate contextual AI response based on user input
      const response = await generateAIResponse(inputText);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response
      const fallbackResponse = getFallbackResponse(inputText);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    try {
      // Build conversation history from previous messages
      const conversationHistory = messages
        .filter(msg => msg.id !== '1') // Exclude initial greeting
        .map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }))
        .slice(-8); // Keep only last 8 messages to save tokens

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userInput,
          conversationHistory 
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.response) {
          // Limit response length but don't cut words
          let limitedResponse = data.response;
          if (data.response.length > 300) {
            // Find last complete sentence or clause within limit
            const truncated = data.response.substring(0, 280);
            const lastPeriod = truncated.lastIndexOf('.');
            const lastSpace = truncated.lastIndexOf(' ');
            
            if (lastPeriod > 200) {
              limitedResponse = data.response.substring(0, lastPeriod + 1);
            } else if (lastSpace > 200) {
              limitedResponse = data.response.substring(0, lastSpace) + '...';
            } else {
              limitedResponse = truncated + '...';
            }
          }
          return limitedResponse;
        } else {
          console.log('No response from API, using fallback');
          return getFallbackResponse(userInput);
        }
      } else {
        console.log('API response not ok, using fallback');
        return getFallbackResponse(userInput);
      }
    } catch (error) {
      console.error('AI API error:', error);
      console.log('Using fallback response due to error');
      return getFallbackResponse(userInput);
    }
  };

  const getFallbackResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    console.log('Generating fallback response for:', userInput);
    
    // Contextual responses based on keywords
    if (input.includes('ข้าว') || input.includes('ปลูก')) {
      const riceResponses = [
        'เตรียมดินให้ดี ใช้ปุ๋ยอินทรีย์ ควบคุมน้ำให้เหมาะสมครับ',
        'ใช้พันธุ์ที่เหมาะกับพื้นที่ จัดการน้ำอย่างเป็นระบบครับ',
        'ให้น้ำให้ดินชุ่มแต่ไม่แฉะ เว้นช่วงให้ดินแห้งบ้างครับ'
      ];
      return riceResponses[Math.floor(Math.random() * riceResponses.length)];
    }
    
    if (input.includes('ผักบุ้ง')) {
      const waterSpinachResponses = [
        'ผักบุ้งปลูกง่าย ต้องการน้ำมาก ควรปลูกในดินที่มีความชื้นสูง และใช้ปุ๋ยอินทรีย์ครับ',
        'การปลูกผักบุ้งควรรดน้ำให้ดินชุ่มเสมอ และเก็บเกี่ยวเมื่อต้นอ่อนเพื่อให้ได้รสชาติที่ดีครับ',
        'ผักบุ้งเป็นพืชที่โตเร็ว ควรปลูกในที่ที่มีแสงแดดเพียงพอและระบายน้ำได้ดีครับ'
      ];
      return waterSpinachResponses[Math.floor(Math.random() * waterSpinachResponses.length)];
    }
    
    if (input.includes('มะเขือเทศ')) {
      const tomatoResponses = [
        'มะเขือเทศต้องการแสงแดดเต็มที่ ดินร่วนซุย และการระบายน้ำที่ดีครับ',
        'การปลูกมะเขือเทศควรรดน้ำที่โคนต้น หลีกเลี่ยงการรดน้ำที่ใบเพื่อป้องกันโรคครับ',
        'มะเขือเทศควรปลูกในฤดูที่อากาศไม่ร้อนเกินไป และใช้ปุ๋ยที่มีฟอสฟอรัสสูงครับ'
      ];
      return tomatoResponses[Math.floor(Math.random() * tomatoResponses.length)];
    }
    
    if (input.includes('ข้าวโพด')) {
      const cornResponses = [
        'ข้าวโพดควรปลูกในดินร่วนซุยที่มีการระบายน้ำดี และต้องการแสงแดดเต็มที่ครับ',
        'การปลูกข้าวโพดควรรดน้ำให้ดินชุ่มแต่ไม่แฉะ และใช้ปุ๋ยที่มีไนโตรเจนสูงครับ',
        'ข้าวโพดควรปลูกในฤดูฝนหรือมีน้ำเพียงพอ และเก็บเกี่ยวเมื่อเมล็ดแข็งเต็มที่ครับ'
      ];
      return cornResponses[Math.floor(Math.random() * cornResponses.length)];
    }
    
    if (input.includes('ผักกาดหอม')) {
      const lettuceResponses = [
        'ผักกาดหอมต้องการดินร่วนซุยที่มีการระบายน้ำดี และแสงแดดปานกลางครับ',
        'การปลูกผักกาดหอมควรรดน้ำให้ดินชุ่มเสมอ และเก็บเกี่ยวเมื่อใบอ่อนเพื่อให้ได้รสชาติที่ดีครับ',
        'ผักกาดหอมควรปลูกในที่ที่มีอากาศเย็น และใช้ปุ๋ยอินทรีย์เพื่อให้ใบเขียวสวยครับ'
      ];
      return lettuceResponses[Math.floor(Math.random() * lettuceResponses.length)];
    }
    
    if (input.includes('โรค') || input.includes('ใบจุด')) {
      const diseaseResponses = [
        'โรคใบจุดในข้าวสามารถแก้ไขได้โดยใช้สารชีวภัณฑ์หรือสารเคมีที่เหมาะสม และควรระวังเรื่องการระบายน้ำให้ดีครับ',
        'การป้องกันโรคพืชควรเริ่มจากการเลือกพันธุ์ที่ต้านทาน ใช้ปุ๋ยที่สมดุล และจัดการน้ำอย่างเหมาะสมครับ',
        'เมื่อพบโรคพืชควรรีบใช้สารป้องกันกำจัดโรคที่เหมาะสม และปรับปรุงการจัดการแปลงให้ดีขึ้นครับ'
      ];
      return diseaseResponses[Math.floor(Math.random() * diseaseResponses.length)];
    }
    
    if (input.includes('ปุ๋ย') || input.includes('ปุ๋ย')) {
      const fertilizerResponses = [
        'ปุ๋ยที่เหมาะสำหรับข้าวคือปุ๋ยสูตร 16-16-8 หรือปุ๋ยอินทรีย์ที่หมักจากมูลสัตว์ครับ',
        'การใช้ปุ๋ยควรใช้ตามคำแนะนำและไม่ใช้มากเกินไป เพื่อป้องกันการสะสมในดินครับ',
        'ปุ๋ยอินทรีย์ช่วยปรับปรุงดินและให้ธาตุอาหารที่พืชต้องการอย่างสมดุลครับ'
      ];
      return fertilizerResponses[Math.floor(Math.random() * fertilizerResponses.length)];
    }
    
    if (input.includes('น้ำ') || input.includes('รดน้ำ')) {
      const waterResponses = [
        'การให้น้ำข้าวควรรดน้ำให้ดินชุ่มแต่ไม่แฉะ และควรเว้นช่วงให้ดินแห้งบ้างเพื่อให้รากแข็งแรงครับ',
        'ข้าวต้องการน้ำมากในช่วงแรก แต่ควรลดน้ำลงเมื่อใกล้เก็บเกี่ยวเพื่อให้เมล็ดแข็งครับ',
        'การจัดการน้ำที่ดีจะช่วยให้ข้าวเจริญเติบโตได้ดีและป้องกันโรคที่เกิดจากความชื้นครับ'
      ];
      return waterResponses[Math.floor(Math.random() * waterResponses.length)];
    }
    
    if (input.includes('แมลง') || input.includes('ศัตรู')) {
      const pestResponses = [
        'การป้องกันแมลงศัตรูข้าวควรใช้วิธีผสมผสาน ทั้งการใช้สารชีวภัณฑ์ การปลูกพืชไล่แมลง และการจัดการน้ำครับ',
        'ควรตรวจสอบแปลงอย่างสม่ำเสมอเพื่อพบแมลงศัตรูตั้งแต่ระยะแรก และใช้วิธีป้องกันที่เหมาะสมครับ',
        'การใช้สารชีวภัณฑ์จะปลอดภัยกว่าสารเคมีและไม่ทำลายสิ่งแวดล้อมครับ'
      ];
      return pestResponses[Math.floor(Math.random() * pestResponses.length)];
    }
    
    if (input.includes('สวัสดี') || input.includes('hello')) {
      return 'สวัสดีครับ! ผมเป็นผู้ช่วยเกษตร AI มีอะไรให้ช่วยไหมครับ?';
    }
    
    // Default responses
    const defaultResponses = [
      'ขอบคุณครับ ผมจะช่วยหาคำตอบให้ครับ',
      'นี่เป็นคำถามที่น่าสนใจครับ ให้ผมช่วยแนะนำครับ',
      'ผมเข้าใจแล้วครับ ให้ผมให้คำแนะนำครับ'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'วิธีปลูกข้าวให้ได้ผลผลิตดี',
    'โรคใบจุดในข้าวแก้ยังไง',
    'ปุ๋ยอะไรเหมาะกับข้าว',
    'ให้น้ำข้าวยังไงให้ดี',
    'ป้องกันแมลงศัตรูข้าวยังไง',
    'ปลูกผักบุ้งยังไง',
    'มะเขือเทศเป็นโรคอะไร',
    'ปุ๋ยอินทรีย์ทำยังไง',
    'ข้าวโพดปลูกเมื่อไหร่',
    'ผักกาดหอมดูแลยังไง'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="text-white hover:text-green-200 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold">ผู้ช่วยเกษตร AI</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm">ออนไลน์</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                      : 'bg-white text-gray-800 border border-green-100'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-green-200' : 'text-green-600'
                  }`}>
                    {message.timestamp.toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg border border-green-100 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="border-t border-green-200 p-4 bg-green-50">
              <p className="text-sm text-green-700 mb-3 font-medium">คำถามที่พบบ่อย:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    className="text-xs bg-white hover:bg-green-100 text-green-700 px-3 py-1 rounded-full transition-colors border border-green-200 shadow-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-green-200 p-4 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์คำถามเกี่ยวกับการเกษตร..."
                className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-green-600 text-gray-800 bg-white"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow">
            <div className="text-green-600 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">คำแนะนำการปลูก</h3>
            <p className="text-green-700 text-sm">ขอคำแนะนำเกี่ยวกับการปลูกพืชตามฤดูกาลและสภาพดิน</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow">
            <div className="text-green-600 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">การดูแลพืช</h3>
            <p className="text-green-700 text-sm">สอบถามวิธีการดูแลพืช การให้ปุ๋ย และการรดน้ำ</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow">
            <div className="text-green-600 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">แก้ปัญหาโรค</h3>
            <p className="text-green-700 text-sm">ขอคำแนะนำในการแก้ปัญหาโรคพืชและแมลงศัตรูพืช</p>
          </div>
        </div>
      </div>
    </div>
  );
}
