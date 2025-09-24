# SkillGrid Website Design Document

## Overview

The SkillGrid website will be a modern, responsive multi-page website with a Node.js backend. The design prioritizes fast deployment, professional appearance, and effective client conversion. The website will feature a homepage with hero section and navigation, plus dedicated pages for each service. This structure provides better SEO and allows detailed service descriptions while maintaining strong branding consistency derived from the SkillGrid logo.

## Architecture

### Frontend Architecture
- **Framework**: React.js with Vite for fast development and building
- **Styling**: Tailwind CSS for rapid, responsive design implementation
- **Routing**: React Router for navigation between pages (Home, Services, About, Contact)
- **State Management**: React Context API for form handling and UI state
- **Build Tool**: Vite for optimized production builds and fast development
- **Page Structure**: Multi-page application with dedicated routes for each service

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Email Service**: Nodemailer with Gmail SMTP for contact form processing
- **Validation**: Express-validator for input sanitization and validation
- **Security**: Helmet.js for security headers, CORS for cross-origin requests
- **Environment**: dotenv for configuration management

### Deployment Architecture
- **Frontend Hosting**: Vercel or Netlify for static site deployment
- **Backend Hosting**: Railway, Render, or Heroku for API deployment
- **Domain**: Custom domain pointing to frontend with API subdomain
- **SSL**: Automatic HTTPS through hosting providers

## Components and Interfaces

### Frontend Components

#### 1. Layout Components
- **Header**: Navigation bar with logo, menu items (Home, Services, About, Contact)
- **Footer**: Contact information, social links, copyright
- **Layout**: Wrapper component for consistent page structure

#### 2. Page Components
- **HomePage**: Hero section, services overview cards, call-to-action
- **ServicePages**: Individual pages for each service (Website Designing, Notes, Translation, Logo Design, Counselling)
- **AboutPage**: Team information and company background
- **ContactPage**: Contact form and business information
- **ServicesOverviewPage**: All services listed with brief descriptions

#### 3. UI Components
- **ServiceCard**: Reusable card component for service previews on homepage
- **ServiceDetail**: Full service page component with detailed descriptions, features, and pricing
- **ContactForm**: Form with validation and submission handling
- **Button**: Consistent button styling across the site
- **HeroSection**: Homepage hero with compelling headline and main call-to-action
- **NavigationMenu**: Multi-page navigation with active states

### Page Routing Structure

#### Frontend Routes
```
/ - Homepage (Hero + Service Overview)
/services - Services overview page
/services/website-designing - Website Designing service page
/services/notes - Notes service page  
/services/translation - Translation service page
/services/logo-design - Logo Design service page
/services/counselling - Counselling service page
/about - About Us page
/contact - Contact page
```

### Backend API Endpoints

#### Contact API
```
POST /api/contact
- Body: { name, email, service, message }
- Response: { success: boolean, message: string }
- Validation: Required fields, email format, message length
```

#### Health Check
```
GET /api/health
- Response: { status: "ok", timestamp: string }
```

## Data Models

### Contact Form Data
```typescript
interface ContactSubmission {
  name: string;           // Required, 2-50 characters
  email: string;          // Required, valid email format
  service: string;        // Required, one of the five services
  message: string;        // Required, 10-500 characters
  timestamp: Date;        // Auto-generated
  ipAddress?: string;     // For basic spam prevention
}
```

### Service Data
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  callToAction: string;
}
```

## Error Handling

### Frontend Error Handling
- **Form Validation**: Real-time validation with user-friendly error messages
- **API Errors**: Toast notifications for submission failures
- **Network Issues**: Retry mechanisms and offline indicators
- **Fallback UI**: Error boundaries for component failures

### Backend Error Handling
- **Input Validation**: Comprehensive validation with detailed error responses
- **Email Failures**: Logging and fallback notification mechanisms
- **Rate Limiting**: Basic rate limiting to prevent spam
- **Error Logging**: Structured logging for debugging and monitoring

## Testing Strategy

### Frontend Testing
- **Unit Tests**: Jest and React Testing Library for component testing
- **Integration Tests**: Testing form submission and navigation flows
- **E2E Tests**: Cypress for critical user journeys
- **Accessibility Tests**: Automated accessibility testing with axe-core

### Backend Testing
- **Unit Tests**: Jest for API endpoint testing
- **Integration Tests**: Supertest for full request/response testing
- **Email Testing**: Mock email service for testing contact form
- **Security Tests**: Basic security testing for common vulnerabilities

## Visual Design System

### Color Palette (To be derived from logo)
- **Primary Colors**: Main brand colors from SkillGrid logo
- **Secondary Colors**: Complementary colors for accents and highlights
- **Neutral Colors**: Grays and whites for text and backgrounds
- **Status Colors**: Success (green), warning (yellow), error (red)

### Typography
- **Headings**: Modern sans-serif font (Inter or similar)
- **Body Text**: Readable sans-serif with good web performance
- **Font Sizes**: Responsive scale from mobile to desktop

### Layout Principles
- **Mobile-First**: Design starts with mobile and scales up
- **Grid System**: 12-column grid for consistent layouts
- **Spacing**: Consistent spacing scale using Tailwind's spacing system
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design

## Performance Optimization

### Frontend Optimization
- **Code Splitting**: Lazy loading for non-critical components
- **Image Optimization**: WebP format with fallbacks, responsive images
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching strategies for static assets

### Backend Optimization
- **Response Compression**: Gzip compression for API responses
- **Database Queries**: Efficient queries (if database is added later)
- **Caching Headers**: Appropriate cache headers for static content
- **CDN Integration**: Content delivery network for global performance

## Security Considerations

### Frontend Security
- **Input Sanitization**: Client-side validation and sanitization
- **XSS Prevention**: Proper escaping of user-generated content
- **HTTPS Only**: Force HTTPS for all communications
- **Content Security Policy**: CSP headers to prevent injection attacks

### Backend Security
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Prevent spam and abuse of contact form
- **CORS Configuration**: Proper CORS setup for API access
- **Environment Variables**: Secure storage of sensitive configuration

## Deployment Strategy

### Development Workflow
1. **Local Development**: Vite dev server for frontend, nodemon for backend
2. **Version Control**: Git with feature branches and pull requests
3. **Testing**: Automated tests run on every commit
4. **Staging**: Deploy to staging environment for final testing

### Production Deployment
1. **Frontend**: Build optimized bundle and deploy to Vercel/Netlify
2. **Backend**: Deploy to Railway/Render with environment variables
3. **Domain Setup**: Configure custom domain with SSL
4. **Monitoring**: Basic uptime monitoring and error tracking

### Launch Checklist
- [ ] All services clearly described with compelling copy
- [ ] Contact form tested and working
- [ ] Mobile responsiveness verified
- [ ] Performance optimized (Lighthouse score >90)
- [ ] SEO basics implemented (meta tags, structured data)
- [ ] Analytics tracking setup (Google Analytics)
- [ ] Social media integration ready