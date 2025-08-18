import { NextRequest, NextResponse } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | null = null;

export async function GET(req: NextRequest) {
  if (!io) {
    // Initialize Socket.io server
    const { Server } = await import('socket.io');
    io = new Server({
      cors: {
        origin: process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3001',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('join-room', (roomId: string) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });

      socket.on('leave-room', (roomId: string) => {
        socket.leave(roomId);
        console.log(`User ${socket.id} left room ${roomId}`);
      });

      socket.on('send-message', (data) => {
        socket.to(data.roomId).emit('receive-message', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return NextResponse.json({ success: true, message: 'Socket.io server initialized' });
}
