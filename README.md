# 🎯 SkillGrid Website

<div align="center">

![SkillGrid](https://img.shields.io/badge/SkillGrid-Professional%20Services-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern, full-stack professional website showcasing SkillGrid's comprehensive services**

[Demo](#) • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About

SkillGrid is a professional service platform offering five core services to help businesses and individuals excel:

- 🎨 **Website Designing** - Custom, responsive web solutions
- 📝 **Notes** - Comprehensive educational resources
- 🌐 **Translation** - Multilingual content services
- 🖼️ **Logo Design** - Brand identity creation
- 💬 **Counselling** - Professional guidance and consultation

This repository contains the full-stack implementation of the SkillGrid website, built with modern web technologies and best practices.

---

## ✨ Features

### Frontend
- ✅ **Multi-page React Application** with seamless routing
- ✅ **Responsive Design** optimized for all devices
- ✅ **Type-Safe Development** with TypeScript
- ✅ **Modern UI/UX** with Tailwind CSS
- ✅ **Fast Development** powered by Vite
- ✅ **Interactive Contact Forms** with validation
- ✅ **Smooth Animations** and transitions

### Backend
- ✅ **RESTful API** with Express.js
- ✅ **Email Notifications** via Nodemailer
- ✅ **Input Validation** with Express Validator
- ✅ **Security Middleware** (Helmet, CORS)
- ✅ **Rate Limiting** to prevent abuse
- ✅ **TypeScript** for type safety
- ✅ **Environment-based Configuration**

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library for building interactive interfaces |
| **TypeScript** | Type safety and improved developer experience |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Router** | Client-side routing and navigation |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **TypeScript** | Type-safe server-side code |
| **Nodemailer** | Email sending functionality |
| **Express Validator** | Request validation middleware |
| **Helmet** | Security headers middleware |
| **CORS** | Cross-origin resource sharing |

---

## 📁 Project Structure

```
skillgrid-website/
├── frontend/                 # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── styles/          # Global styles
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main application component
│   ├── public/              # Static assets
│   ├── index.html           # HTML entry point
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration
│
├── backend/                 # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Server entry point
│   ├── .env.example         # Environment variables template
│   └── package.json         # Backend dependencies
│
├── package.json             # Root package.json with workspace scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MananCodes-dev/skillgrid-website.git
   cd skillgrid-website
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see [Environment Variables](#-environment-variables))

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on `http://localhost:3000`
   - Backend on `http://localhost:5000`

---

## 📜 Available Scripts

### Root Level Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install dependencies for both frontend and backend |
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start only the frontend development server |
| `npm run dev:backend` | Start only the backend development server |
| `npm run build` | Build both frontend and backend for production |
| `npm run test` | Run tests for both frontend and backend |

### Frontend Scripts

Navigate to `frontend/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend Scripts

Navigate to `backend/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional: Email recipient for contact form
CONTACT_EMAIL=contact@skillgrid.com
```

### Setting up Gmail App Password

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS`

---

## 💻 Development

### Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Test your changes thoroughly

3. **Run tests and linting**
   ```bash
   npm run test
   npm run lint
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

### Code Style Guidelines

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Use **Prettier** for code formatting
- Write **meaningful variable names**
- Add **comments** for complex logic
- Keep **components small** and focused

---

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting platform

### Backend Deployment (Heroku/Railway/Render)

1. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

2. Set environment variables on your hosting platform

3. Deploy with start command:
   ```bash
   npm start
   ```

### Environment-specific Configuration

Update `FRONTEND_URL` in backend `.env` to match your deployed frontend URL.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Ensure your code follows the existing style
- Update documentation for any new features
- Add tests for new functionality
- Ensure all tests pass before submitting PR

---

## 📝 Roadmap

- [ ] Customize color palette based on SkillGrid branding
- [ ] Add comprehensive content for each service page
- [ ] Implement advanced contact form with file uploads
- [ ] Add team member profiles to About page
- [ ] Optimize images and add SkillGrid logo
- [ ] Implement blog/news section
- [ ] Add client testimonials
- [ ] Integrate analytics dashboard
- [ ] Add multilingual support
- [ ] Implement dark mode

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**SkillGrid Team**

- GitHub: [@MananCodes-dev](https://github.com/MananCodes-dev)
- Email: skillgrit3@gmail.com
- Website: [https://skillgrid-website-frontend.vercel.app](#)

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite Team for the blazing-fast build tool
- Tailwind CSS for the utility-first approach
- All contributors and supporters of this project

---

<div align="center">

**Made with ❤️ by the SkillGrid Team**

⭐ Star this repository if you find it helpful!

</div>
