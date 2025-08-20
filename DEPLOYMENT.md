# 🌾 AgriLearn Deployment Guide - agrilearn.cloud

## 📋 Pre-deployment Checklist

### 1. Environment Variables (Production)
สร้างไฟล์ `.env.production` หรือตั้งค่า environment variables ในระบบ hosting:

```bash
# Production Domain
NEXT_PUBLIC_DOMAIN=agrilearn.cloud

# MongoDB Production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrilearn

# URLs
NEXT_PUBLIC_CLIENT_URL=https://agrilearn.cloud
NEXT_PUBLIC_SOCKET_URL=https://agrilearn.cloud

# AI API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_gemini_api_key
```

### 2. Database Setup
- สร้าง MongoDB Atlas cluster สำหรับ production
- อัพเดต connection string
- Import ข้อมูลเริ่มต้น (ถ้ามี)

### 3. Domain Configuration
- ตั้งค่า DNS records สำหรับ agrilearn.cloud
- A record หรือ CNAME ชี้ไปที่ hosting provider
- ติดตั้ง SSL certificate

## 🚀 Deployment Options

### Option 1: Static Export (Recommended for JAMstack)
```bash
# Build และ export static files
npm run deploy

# Deploy ไฟล์ในโฟล์เดอร์ 'out' ไปยัง:
# - Vercel
# - Netlify 
# - Cloudflare Pages
# - AWS S3 + CloudFront
```

### Option 2: Server-side Deployment
```bash
# Build สำหรับ production
npm run prod-build

# รัน production server
npm start
```

## 🔧 Hosting Providers

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# ตั้งค่า custom domain
vercel domains add agrilearn.cloud
```

### Netlify
```bash
# Install Netlify CLI  
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=out

# ตั้งค่า custom domain ใน Netlify dashboard
```

### AWS S3 + CloudFront
```bash
# Sync ไฟล์ไปยัง S3
aws s3 sync out/ s3://agrilearn-bucket --delete

# Update CloudFront distribution
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔒 Security Configuration

### 1. Environment Security
- ใช้ environment variables สำหรับ secrets
- ไม่เอา API keys commit ลง git
- ใช้ different keys สำหรับ dev/prod

### 2. Next.js Security Headers
```typescript
// next.config.ts มี security headers ติดตั้งแล้ว:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff  
- Referrer-Policy: origin-when-cross-origin
```

## 📊 Performance Optimization

### 1. Build Optimization
```bash
# ตรวจสอบ bundle size
npm run build
npx @next/bundle-analyzer

# Type checking
npm run type-check
```

### 2. Monitoring
- Google Analytics (เพิ่มใน production)
- Error tracking (Sentry)
- Performance monitoring

## 🌐 Domain DNS Configuration

### agrilearn.cloud DNS Records:
```
Type    Name    Value                           TTL
A       @       [Your hosting IP]              300
CNAME   www     agrilearn.cloud                300
TXT     @       [SSL verification if needed]   300
```

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example:
```yaml
# .github/workflows/deploy.yml
name: Deploy to agrilearn.cloud
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## ✅ Post-deployment Checklist

- [ ] ทดสอบ AI chat ทำงานได้
- [ ] ตรวจสอบ API endpoints
- [ ] ทดสอบ responsive design
- [ ] ตรวจสอบ SSL certificate
- [ ] ทดสอบ SEO metadata
- [ ] ตรวจสอบ Google Analytics (ถ้ามี)
- [ ] Backup database

## 🆘 Troubleshooting

### ปัญหาที่พบบ่อย:
1. **API Error 429**: Rate limit - รอ 1-2 นาที
2. **Build Error**: ตรวจสอบ TypeScript errors
3. **Environment Variables**: ตรวจสอบ .env files
4. **Domain Issues**: ตรวจสอบ DNS propagation

### การตรวจสอบ:
```bash
# ตรวจสอบ build
npm run build

# ตรวจสอบ types
npm run type-check

# ตรวจสอบ environment
echo $NEXT_PUBLIC_GEMINI_API_KEY
```

---

🌾 **AgriLearn** - Smart Agriculture Platform
🌐 **Live at**: https://agrilearn.cloud
