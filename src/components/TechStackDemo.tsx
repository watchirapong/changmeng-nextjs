'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export default function TechStackDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [messages, setMessages] = useState<Array<{ sender: string; message: string; timestamp: Date }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [roomId, setRoomId] = useState('general');
  
  const { isConnected, joinRoom, sendMessage, onMessage } = useSocket();

  // Load users from MongoDB
  useEffect(() => {
    fetchUsers();
  }, []);

  // Socket.io message handling
  useEffect(() => {
    onMessage((data: any) => {
      setMessages(prev => [...prev, { 
        sender: data.sender, 
        message: data.message, 
        timestamp: new Date() 
      }]);
    });
  }, [onMessage]);

  // Join room when component mounts
  useEffect(() => {
    if (isConnected) {
      joinRoom(roomId);
    }
  }, [isConnected, roomId, joinRoom]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        setNewUser({ username: '', email: '' });
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      sendMessage({
        roomId,
        message: currentMessage,
        sender: 'You',
      });
      setCurrentMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Tech Stack Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Your Tech Stack Demo</h1>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="bg-blue-500 px-3 py-1 rounded-full">Next.js</span>
          <span className="bg-blue-500 px-3 py-1 rounded-full">React 19</span>
          <span className="bg-blue-500 px-3 py-1 rounded-full">TypeScript 5</span>
          <span className="bg-green-500 px-3 py-1 rounded-full">MongoDB</span>
          <span className="bg-purple-500 px-3 py-1 rounded-full">Socket.io</span>
        </div>
      </div>

      {/* Connection Status */}
      <div className="text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isConnected ? 'bg-white' : 'bg-white'
          }`}></div>
          {isConnected ? 'Socket.io Connected' : 'Socket.io Disconnected'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MongoDB Demo */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">MongoDB Integration</h2>
          
          {/* Create User Form */}
          <form onSubmit={createUser} className="mb-6 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Create User
            </button>
          </form>

          {/* Users List */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Users in Database:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {users.map((user) => (
                <div key={user._id} className="bg-gray-700 p-3 rounded">
                  <div className="font-medium text-white">{user.username}</div>
                  <div className="text-gray-300 text-sm">{user.email}</div>
                  <div className="text-gray-400 text-xs">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Socket.io Demo */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Socket.io Real-time Chat</h2>
          
          {/* Room Selection */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Room:</label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="general">General</option>
              <option value="tech">Tech</option>
              <option value="random">Random</option>
            </select>
          </div>

          {/* Messages */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-3">Messages:</h3>
            <div className="bg-gray-700 p-3 rounded h-60 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className="bg-gray-600 p-2 rounded">
                  <div className="font-medium text-blue-400">{msg.sender}</div>
                  <div className="text-white">{msg.message}</div>
                  <div className="text-gray-400 text-xs">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Send Message */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
