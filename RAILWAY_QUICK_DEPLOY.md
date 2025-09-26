# 🚂 Railway Quick Deploy (Recommended)

Railway is more reliable than Render. Here's how to deploy in 5 minutes:

## Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your `skillgrid-website` repository
5. Railway will auto-detect the backend

## Step 2: Configure Railway
Railway should auto-detect your backend, but if not:
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

## Step 3: Set Environment Variables
In Railway dashboard, add these variables:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://skillgrid.vercel.app
EMAIL_USER=skillgrit3@gmail.com
EMAIL_PASS=your-gmail-app-password
JWT_SECRET=skillgrid-super-secure-jwt-secret-2024-production
```

## Step 4: Get Railway URL
1. After deployment, Railway will give you a URL like:
   `https://skillgrid-backend-production.up.railway.app`
2. Copy this URL

## Step 5: Update Frontend
Update your frontend environment:
```bash
# In frontend/.env.production
VITE_API_URL=https://your-railway-url.up.railway.app
```

## Step 6: Redeploy Frontend
1. Go to Vercel dashboard
2. Redeploy your frontend
3. Test the contact form

## Why Railway is Better:
- ✅ No TypeScript build issues
- ✅ Faster deployment (2-3 minutes)
- ✅ Better error handling
- ✅ More reliable free tier
- ✅ No sleep mode issues
