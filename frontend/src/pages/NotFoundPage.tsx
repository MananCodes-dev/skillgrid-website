import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import GradientText from '../components/ui/GradientText';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      <SEO
        title="Page Not Found - SkillGrid"
        description="The page you're looking for doesn't exist. Return to SkillGrid's homepage to explore our professional services."
        url="/404"
        type="website"
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-2xl text-center">
        <Card variant="gradient" padding="lg" shadow="xl" className="backdrop-blur-sm">
          <div className="text-8xl mb-6">🔍</div>
          
          <h1 className="text-6xl font-bold mb-4">
            <GradientText>404</GradientText>
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. 
            Don't worry, it happens to the best of us. Let's get you back on track!
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              to="/" 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>
            
            <Button 
              to="/services" 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              View Services
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact us</Link> and we'll assist you right away.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundPage;