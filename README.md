# 🌾 AgriLearn - Smart Agricultural Recommendation App

แอปแนะนำการเกษตรอัจฉริยะที่ช่วยเกษตรกรตัดสินใจ "ควรปลูกอะไรดี" ตามฤดูกาล ราคา และภาวะเศรษฐกิจ พร้อมตลาดขายตรงและความรู้การเกษตรครบครัน

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

### AI Integration
- **Google Gemini API** - AI-powered agricultural recommendations
- **OpenAI GPT API** - Alternative AI provider (optional)

## 🌟 Features

### 🤖 AI-Powered Recommendations
- **Crop Recommendations**: AI generates personalized crop suggestions based on season, location, and market conditions
- **Market Analysis**: Real-time market trend analysis with price predictions
- **Weather-Based Advice**: Farming recommendations based on weather conditions
- **Risk Assessment**: AI evaluates risk and return scores for each crop

### 📊 Smart Dashboard
- **Real-time Data**: Live agricultural data powered by AI
- **Market Trends**: Price analysis and market predictions
- **Weather Integration**: Weather-based farming recommendations
- **Performance Metrics**: AI accuracy and confidence scores

### 🛒 Community Marketplace
- **Direct Sales**: Farmers can sell products directly to consumers
- **Expiring Products**: Special discounts for products near expiration
- **Rating System**: Community-based rating and review system
- **Search & Filter**: Advanced search with category and price filters

### 📚 Agricultural Knowledge Base
- **Farming Guides**: Comprehensive guides for different crops
- **Best Practices**: Expert advice on farming techniques
- **Disease Prevention**: Natural pest and disease control methods
- **Market Strategies**: Marketing and pricing strategies

### 💰 Financial Management
- **Cost Tracking**: Record and track farming costs
- **Profit Analysis**: Calculate expected returns and profits
- **Market Insights**: AI-powered market analysis
- **Investment Planning**: Long-term investment strategies

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd changmeng
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/changmeng
   
   # Next.js Configuration
   NEXT_PUBLIC_CLIENT_URL=http://localhost:3001
   
   # Socket.io Configuration
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   
   # AI API Keys
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   
   # AI Configuration
   NEXT_PUBLIC_AI_MODEL=gemini
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `changmeng`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🤖 AI Integration Setup

### Google Gemini API
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to your `.env.local` file:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### OpenAI API (Optional)
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add the key to your `.env.local` file:
   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

### Test AI Integration
Visit `/test-ai` to test the AI integration and verify it's working correctly.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── ai/            # AI-powered endpoints
│   │   │   ├── recommendations/
│   │   │   ├── market-analysis/
│   │   │   └── weather/
│   │   ├── socket/        # Socket.io endpoints
│   │   └── users/         # User management
│   ├── dashboard/         # Main dashboard
│   ├── marketplace/       # Community marketplace
│   ├── knowledge/         # Agricultural knowledge
│   └── test-ai/          # AI testing page
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── ai.ts             # AI service integration
│   ├── mongodb.ts        # Database connection
│   └── socket.ts         # Socket.io configuration
├── models/               # MongoDB models
└── hooks/                # Custom React hooks
```

## 🔧 API Endpoints

### AI-Powered Endpoints
- `GET /api/ai/recommendations` - Get AI-generated crop recommendations
- `GET /api/ai/market-analysis` - Get market analysis for specific crops
- `GET /api/ai/weather` - Get weather-based farming recommendations

### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Socket.io
- `GET /api/socket` - Initialize Socket.io server

## 🌱 Key Features Explained

### AI Crop Recommendations
The app uses Google Gemini API to generate personalized crop recommendations based on:
- **Season**: Current planting season
- **Location**: Geographic region and climate
- **Market Conditions**: Current and predicted prices
- **Risk Assessment**: AI evaluates market risks and returns

### Smart Market Analysis
AI analyzes market trends and provides:
- **Price Predictions**: 1-month and 3-month price forecasts
- **Market Trends**: Rising, falling, or stable market conditions
- **Confidence Scores**: AI confidence in predictions
- **Key Factors**: Factors affecting price movements

### Weather Integration
AI provides weather-based farming advice:
- **Current Conditions**: Temperature, humidity, rainfall
- **Forecasts**: Weather predictions for planning
- **Farming Recommendations**: Weather-specific advice
- **Risk Mitigation**: Weather-related risk management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini API** for AI-powered recommendations
- **MongoDB** for database management
- **Next.js** for the amazing framework
- **Tailwind CSS** for beautiful styling
- **Thai Farmers** for inspiration and feedback

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

---

**AgriLearn** - Empowering Thai farmers with AI-driven agricultural intelligence 🌾🤖
