# SkillGrid Website

A professional website showcasing SkillGrid's five core services: Website Designing, Notes, Translation, Logo Design, and Counselling.

## Project Structure

```
skillgrid-website/
├── frontend/          # React + Vite + TypeScript frontend
├── backend/           # Node.js + Express + TypeScript backend
├── package.json       # Root package.json with workspace scripts
└── README.md
```

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript
- Nodemailer for email handling
- Express Validator for input validation
- Security middleware (Helmet, CORS, Rate Limiting)

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your email credentials
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:5000

## Development Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build both frontend and backend for production
- `npm run test` - Run tests for both frontend and backend

## Environment Variables

Create a `.env` file in the `backend` directory with:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Features

- ✅ Multi-page React application with routing
- ✅ Responsive design with Tailwind CSS
- ✅ Contact form with backend API
- ✅ Email notifications for inquiries
- ✅ TypeScript for type safety
- ✅ Security middleware and validation
- ✅ Development and production build scripts

## Next Steps

1. Customize the color palette based on the SkillGrid logo
2. Add content for each service page
3. Implement the contact form UI
4. Add team information to the About page
5. Optimize images and add the SkillGrid logo