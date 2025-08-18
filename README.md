# Changmeng - Full Stack Next.js Application

A modern full-stack application built with Next.js, featuring real-time communication and MongoDB integration.

## 🚀 Tech Stack

### Frontend
- **Next.js 15.4.6** - React framework for production
- **React 19** - Latest version of React library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend
- **MongoDB** - NoSQL database with Mongoose ODM
- **Next.js API Routes** - Server-side API endpoints

### Communication
- **Socket.io** - Real-time bidirectional communication

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/watchirapong/changmeng-nextjs.git
cd changmeng-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/changmeng

# Next.js Configuration
NEXT_PUBLIC_CLIENT_URL=http://localhost:3001

# Socket.io Configuration
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

4. Start MongoDB (if running locally):
```bash
# Install MongoDB if you haven't already
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── socket/        # Socket.io endpoint
│   │   └── users/         # User management API
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── TechStackDemo.tsx  # Demo component
├── hooks/                 # Custom React hooks
│   └── useSocket.ts       # Socket.io hook
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # MongoDB connection
│   └── socket.ts          # Socket.io server setup
└── models/                # MongoDB models
    └── User.ts            # User model
```

## 🔧 Features

### MongoDB Integration
- User management with CRUD operations
- Mongoose ODM for data modeling
- Connection pooling and caching

### Socket.io Real-time Features
- Real-time chat functionality
- Room-based messaging
- Connection status monitoring
- Event-driven communication

### Modern Development
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Hot reload with Turbopack

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 API Endpoints

### Users API
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Socket.io
- `GET /api/socket` - Initialize Socket.io server

## 🔌 Socket.io Events

### Client to Server
- `join-room` - Join a chat room
- `leave-room` - Leave a chat room
- `send-message` - Send a message to a room

### Server to Client
- `receive-message` - Receive a message from a room

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.io Documentation](https://socket.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
