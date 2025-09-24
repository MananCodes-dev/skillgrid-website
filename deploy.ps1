# SkillGrid Deployment Script
# This script helps deploy the SkillGrid website to production

Write-Host "🚀 Starting SkillGrid Deployment Process..." -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm run install:all

Write-Host "🔨 Building production bundles..." -ForegroundColor Yellow
npm run build:production

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix the errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

Write-Host ""
Write-Host "🌐 Next Steps for Deployment:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Backend Deployment (Render):" -ForegroundColor White
Write-Host "   • Go to https://render.com and sign up/login" -ForegroundColor Gray
Write-Host "   • Connect your GitHub repository" -ForegroundColor Gray
Write-Host "   • Create a new Web Service" -ForegroundColor Gray
Write-Host "   • Use these settings:" -ForegroundColor Gray
Write-Host "     - Build Command: cd backend && npm install && npm run build" -ForegroundColor Gray
Write-Host "     - Start Command: cd backend && npm start" -ForegroundColor Gray
Write-Host "     - Environment Variables:" -ForegroundColor Gray
Write-Host "       NODE_ENV=production" -ForegroundColor Gray
Write-Host "       PORT=5000" -ForegroundColor Gray
Write-Host "       FRONTEND_URL=https://skillgrid.vercel.app" -ForegroundColor Gray
Write-Host "       EMAIL_USER=skillgrit3@gmail.com" -ForegroundColor Gray
Write-Host "       EMAIL_PASS=your-gmail-app-password" -ForegroundColor Gray
Write-Host "       JWT_SECRET=skillgrid-super-secure-jwt-secret-2024-production" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Frontend Deployment (Vercel):" -ForegroundColor White
Write-Host "   • Go to https://vercel.com and sign up/login" -ForegroundColor Gray
Write-Host "   • Import your GitHub repository" -ForegroundColor Gray
Write-Host "   • Configure build settings:" -ForegroundColor Gray
Write-Host "     - Framework Preset: Vite" -ForegroundColor Gray
Write-Host "     - Root Directory: frontend" -ForegroundColor Gray
Write-Host "     - Build Command: npm run build" -ForegroundColor Gray
Write-Host "     - Output Directory: dist" -ForegroundColor Gray
Write-Host "   • Set environment variables:" -ForegroundColor Gray
Write-Host "     VITE_API_URL=https://your-render-backend-url.onrender.com/api" -ForegroundColor Gray
Write-Host "     VITE_APP_NAME=SkillGrid" -ForegroundColor Gray
Write-Host "     VITE_APP_VERSION=1.0.0" -ForegroundColor Gray
Write-Host ""
Write-Host "3. After Deployment:" -ForegroundColor White
Write-Host "   • Test the contact form" -ForegroundColor Gray
Write-Host "   • Verify all pages load correctly" -ForegroundColor Gray
Write-Host "   • Check mobile responsiveness" -ForegroundColor Gray
Write-Host "   • Confirm email delivery works" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Your SkillGrid website is ready for deployment!" -ForegroundColor Green