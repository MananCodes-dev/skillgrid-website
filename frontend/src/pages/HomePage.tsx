import React from 'react'
import { Link } from 'react-router-dom'
import { SEO, LazyImage } from '../components'

// Floating animation component
const FloatingElement: React.FC<{ children: React.ReactNode; delay?: string }> = ({ children, delay = '0s' }) => (
  <div 
    className="animate-pulse"
    style={{ animationDelay: delay, animationDuration: '3s' }}
  >
    {children}
  </div>
)

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  link: string
  features: string[]
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link, features }) => {
  return (
    <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-700 hover:border-blue-500/50 hover:scale-105 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
        <ul className="text-sm text-gray-400 mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center group-hover:text-gray-300 transition-colors duration-300">
              <span className="text-green-400 mr-3 text-base">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={link}
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
        >
          Learn More →
        </Link>
      </div>
    </div>
  )
}

const HomePage: React.FC = () => {
  const services = [
    {
      title: "Website Designing",
      description: "Professional, responsive websites that drive results and engage your audience.",
      icon: "🌐",
      link: "/services/website-designing",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
    },
    {
      title: "Notes Services",
      description: "Comprehensive note-taking and documentation services for students and professionals.",
      icon: "📝",
      link: "/services/notes",
      features: ["Structured Content", "Clear Formatting", "Quick Delivery", "Subject Expertise"]
    },
    {
      title: "Translation",
      description: "Accurate and culturally-aware translation services across multiple languages.",
      icon: "🌍",
      link: "/services/translation",
      features: ["Multiple Languages", "Cultural Context", "Fast Turnaround", "Quality Assured"]
    },
    {
      title: "Logo Design",
      description: "Creative and memorable logo designs that perfectly represent your brand identity.",
      icon: "🎨",
      link: "/services/logo-design",
      features: ["Custom Design", "Brand Identity", "Multiple Formats", "Unlimited Revisions"]
    },
    {
      title: "Counselling",
      description: "Professional counselling services to support your personal and professional growth.",
      icon: "💬",
      link: "/services/counselling",
      features: ["Expert Guidance", "Confidential", "Flexible Sessions", "Proven Methods"]
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SkillGrid",
    "description": "Professional services for website design, notes, translation, logo design, and counselling",
    "url": "https://skillgrid.com",
    "logo": "https://skillgrid.com/skillgrid_logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "skillgrit3@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://linkedin.com/company/skillgrid",
      "https://twitter.com/skillgrid"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SkillGrid Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "name": service.title,
        "description": service.description,
        "url": `https://skillgrid.com${service.link}`,
        "position": index + 1
      }))
    }
  }

  return (
    <div>
      <SEO 
        title="SkillGrid - Transform Your Ideas Into Reality"
        description="Professional services in website design, logo design, translation, notes, and counselling. SkillGrid delivers expert solutions that help you succeed with personalized attention and quality results."
        keywords="website design, logo design, translation services, counselling, notes services, professional services, web development, graphic design, SkillGrid"
        url="/"
        type="website"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 relative overflow-hidden min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  ✨ Professional Services
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Transform Your Ideas Into
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"> Reality</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                SkillGrid delivers professional services that help you succeed. From stunning websites to expert counselling,
                we're your trusted partner for growth and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/contact"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-center shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Started Today
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="group border-2 border-blue-400 text-blue-400 px-10 py-5 rounded-xl text-lg font-semibold hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 text-center backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    View All Services
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center relative">
              <FloatingElement>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
                  <LazyImage
                    src="/skillgrid_logo.png"
                    alt="SkillGrid Logo - Professional Services for Website Design, Notes, Translation, Logo Design & Counselling"
                    className="max-w-lg w-full h-auto drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    width={500}
                    height={500}
                  />
                </div>
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-500/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                🚀 What We Offer
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We offer a comprehensive range of professional services designed to help you achieve your goals.
              Each service is delivered with expertise, attention to detail, and a commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="opacity-0 animate-pulse"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '0.6s',
                  animationFillMode: 'forwards'
                }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                  features={service.features}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rotate-45"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white rotate-45"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-full text-sm font-medium">
                💫 Ready to Transform?
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Get <span className="text-cyan-300">Started?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients who have transformed their ideas into success with SkillGrid.
              Let's discuss how we can help you achieve your goals and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="group bg-white text-blue-600 px-10 py-5 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Contact Us Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300">✨</span>
                </span>
              </Link>
              <Link
                to="/about"
                className="group border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  Learn About Us
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage