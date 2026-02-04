import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    // Debug: Check environment variable
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log('=== Chat API Route ===');
    console.log('API Key present:', !!apiKey);
    console.log('API Key value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const aiService = getAIService();

    // Try to get response from AI service with conversation memory
    try {
      const aiResponse = await aiService.generateChatResponse(message, conversationHistory);
      console.log('AI Response received, length:', aiResponse.length);
      return NextResponse.json({ response: aiResponse });
    } catch (aiError) {
      console.error('AI service error:', aiError);
      if (aiError instanceof Error) {
        console.error('Error message:', aiError.message);
        console.error('Error stack:', aiError.stack);
      }
      
      // Fallback response based on keywords
      const fallbackResponse = generateFallbackResponse(message);
      return NextResponse.json({ response: fallbackResponse });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateFallbackResponse(userInput: string): string {
  const input = userInput.toLowerCase();
  
  // Contextual responses based on keywords
  if (input.includes('ข้าว') || input.includes('ปลูก')) {
    const riceResponses = [
      'สำหรับการปลูกข้าว ผมแนะนำให้เตรียมดินให้ดีก่อนปลูก ใช้ปุ๋ยอินทรีย์เพื่อเพิ่มความอุดมสมบูรณ์ และควบคุมน้ำให้เหมาะสมครับ',
      'การปลูกข้าวควรรอให้ดินมีความชื้นที่เหมาะสม ใช้พันธุ์ที่เหมาะกับพื้นที่ และจัดการน้ำอย่างเป็นระบบครับ',
      'ข้าวต้องการน้ำมากในช่วงแรก ควรให้น้ำให้ดินชุ่มแต่ไม่แฉะ และเว้นช่วงให้ดินแห้งบ้างเพื่อให้รากแข็งแรงครับ'
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
  
  if (input.includes('สวัสดี') || input.includes('hello')) {
    return 'สวัสดีครับ! ผมเป็นผู้ช่วยเกษตร AI ที่จะช่วยตอบคำถามเกี่ยวกับการเกษตร การปลูกพืช การดูแลพืช และการแก้ปัญหาโรคต่างๆ ครับ มีอะไรให้ช่วยไหมครับ?';
  }
  
  if (input.includes('โรค') || input.includes('ใบจุด')) {
    const diseaseResponses = [
      'โรคใบจุดในข้าวสามารถแก้ไขได้โดยใช้สารชีวภัณฑ์หรือสารเคมีที่เหมาะสม และควรระวังเรื่องการระบายน้ำให้ดีครับ',
      'การป้องกันโรคพืชควรเริ่มจากการเลือกพันธุ์ที่ต้านทาน ใช้ปุ๋ยที่สมดุล และจัดการน้ำอย่างเหมาะสมครับ',
      'เมื่อพบโรคพืชควรรีบใช้สารป้องกันกำจัดโรคที่เหมาะสม และปรับปรุงการจัดการแปลงให้ดีขึ้นครับ'
    ];
    return diseaseResponses[Math.floor(Math.random() * diseaseResponses.length)];
  }
  
  if (input.includes('ปุ๋ย')) {
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
  
  // Default responses
  const defaultResponses = [
    'ขอบคุณสำหรับคำถามครับ ผมจะช่วยหาคำตอบให้คุณเกี่ยวกับการเกษตรครับ',
    'นี่เป็นคำถามที่น่าสนใจครับ ให้ผมช่วยแนะนำเกี่ยวกับการเกษตรครับ',
    'ผมเข้าใจคำถามของคุณแล้วครับ ให้ผมให้คำแนะนำเกี่ยวกับการเกษตรครับ'
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
