#!/bin/bash

# AgriLearn Production Deployment Script

echo "🌾 Starting AgriLearn deployment to agrilearn.cloud..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Export static files (if using static export)
echo "📤 Exporting static files..."
npm run export

echo "🚀 Build completed successfully!"
echo "📁 Files are ready in the 'out' directory for deployment"
echo "🌐 Deploy these files to your hosting service for agrilearn.cloud"
echo ""
echo "🔧 Remember to:"
echo "   1. Set production environment variables"
echo "   2. Configure your domain DNS"
echo "   3. Set up SSL certificate"
echo "   4. Configure MongoDB production connection"
echo ""
echo "✨ Your AgriLearn app is ready for production!"
