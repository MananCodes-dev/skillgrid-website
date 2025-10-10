# SkillGrid Website Deployment Guide

## Overview
This guide covers deploying the SkillGrid website with:
- **Frontend**: React + Vite app deployed to Vercel
- **Backend**: Node.js + Express API deployed to Render

## Prerequisites
- Node.js 18+ installed locally
- Git repository set up
- Vercel account (for frontend)
- Render account (for backend)
- Email app password for skillgrit3@gmail.com

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://skillgrid-backend.onrender.com/api
VITE_APP_NAME=SkillGrid
VITE_APP_VERSION=1.0.0
```

### Backend (Production Environment)
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://skillgrid.vercel.app
EMAIL_USER=skillgrit3@gmail.com
EMAIL_PASS=your-gmail-app-password
JWT_SECRET=your-secure-jwt-secret-32-chars-min
```

## Deployment Steps

### 1. Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure build settings:
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (monorepo setup)
4. Set environment variables in Render dashboard
5. Deploy and note the service URL

### 2. Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Set environment variables in Vercel dashboard
4. Update API URL to match your backend deployment
5. Deploy

### 3. Domain Configuration (Optional)
- Configure custom domain in Vercel
- Update FRONTEND_URL in backend environment
- Set up SSL certificates (automatic with Vercel)

## Testing Production Deployment
1. Test contact form submission
2. Verify email delivery to skillgrit3@gmail.com
3. Check all page navigation
4. Test responsive design on mobile devices
5. Verify SEO meta tags and performance

## Monitoring
- Vercel provides automatic monitoring for frontend
- Render provides logs and metrics for backend
- Set up uptime monitoring (optional)

## Troubleshooting
- Check deployment logs in respective platforms
- Verify environment variables are set correctly
- Ensure CORS settings allow frontend domain
- Test API endpoints directly if contact form fails
