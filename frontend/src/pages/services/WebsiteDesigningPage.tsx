import React from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '../../components'

const WebsiteDesigningPage: React.FC = () => {
  const features = [
    'Responsive Design for All Devices',
    'Modern UI/UX Principles',
    'SEO-Optimized Structure',
    'Fast Loading Performance',
    'Custom Branding Integration',
    'Content Management Systems',
    'E-commerce Solutions',
    'Mobile-First Approach'
  ]

  const benefits = [
    'Professional Online Presence',
    'Increased Customer Engagement',
    'Better Search Engine Rankings',
    'Enhanced User Experience',
    'Brand Credibility & Trust',
    'Lead Generation & Conversion'
  ]

  const portfolioExamples = [
    {
      title: 'ModernStore - E-commerce Platform',
      description: 'Modern online store with payment integration and inventory management',
      technologies: 'React, Node.js, Stripe',
      isLiveDemo: true,
      demoUrl: '/modernstore-demo'
    },
    {
      title: 'Corporate Website',
      description: 'Professional business website with CMS and contact forms',
      technologies: 'WordPress, Custom Theme'
    },
    {
      title: 'Portfolio Website',
      description: 'Creative portfolio showcasing work with interactive galleries',
      technologies: 'React, Tailwind CSS'
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Designing",
    "description": "Professional website design services with responsive design, SEO optimization, and modern UI/UX principles",
    "provider": {
      "@type": "Organization",
      "name": "SkillGrid"
    },
    "serviceType": "Website Design and Development",
    "offers": {
      "@type": "Offer",
      "description": "Custom website design with responsive layout, SEO optimization, and modern technologies"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Website Designing Services - Professional Web Development | SkillGrid"
        description="Transform your digital presence with SkillGrid's professional website design services. Responsive design, SEO optimization, modern UI/UX, and fast loading performance. Get your quote today!"
        keywords="website design, web development, responsive design, SEO optimization, UI/UX design, professional websites, custom web design"
        url="/services/website-designing"
        type="service"
        structuredData={structuredData}
      />
      <SEO
        title="Professional Website Design Services - SkillGrid"
        description="Transform your digital presence with SkillGrid's professional website design services. We create responsive, SEO-optimized websites that captivate audiences and drive business growth."
        keywords="website design, web development, responsive design, SEO optimization, professional websites, custom websites, e-commerce websites, business websites"
        url="/services/website-designing"
        type="service"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Website Designing</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transform your digital presence with stunning, responsive websites that captivate your audience and drive business growth
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Your Website Quote
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Professional Website Design Services</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              At SkillGrid, we create websites that don't just look great—they perform exceptionally. Our website designing service combines cutting-edge technology with creative design to deliver websites that engage visitors and convert them into customers.
            </p>
            <p>
              Whether you need a simple business website, an e-commerce platform, or a complex web application, our team has the expertise to bring your vision to life. We focus on creating user-friendly, fast-loading, and search engine optimized websites that help your business succeed online.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillGrid for Website Design?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit}</h3>
                <p className="text-gray-600">
                  Our websites are designed to deliver measurable results for your business
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Demo Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🛒 Featured Demo: ModernStore</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Experience our e-commerce expertise with this fully functional online store demo featuring payment integration, inventory management, and modern design.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Key Features:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    React & Node.js Architecture
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Stripe Payment Integration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Responsive Mobile Design
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Inventory Management System
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <div className="text-6xl mb-4">🛒</div>
                  <h4 className="text-xl font-semibold mb-2">Interactive Demo</h4>
                  <p className="opacity-90">Fully functional e-commerce platform</p>
                </div>
                <Link
                  to="/modernstore-demo"
                  className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg"
                >
                  🚀 Launch Demo Store
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">More Examples</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioExamples.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-48 ${project.isLiveDemo ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'}`}>
                  {project.isLiveDemo && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">🛒</div>
                        <div className="text-sm font-medium">Live Demo Available</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="text-sm text-blue-600 font-medium mb-4">{project.technologies}</div>
                  {project.isLiveDemo && (
                    <Link
                      to={project.demoUrl}
                      className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm"
                    >
                      View Live Demo →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Design Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Discovery', desc: 'Understanding your business goals and requirements' },
              { step: '2', title: 'Design', desc: 'Creating wireframes and visual designs' },
              { step: '3', title: 'Development', desc: 'Building your website with modern technologies' },
              { step: '4', title: 'Launch', desc: 'Testing, optimization, and going live' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-600">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Online Presence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create a website that not only looks amazing but also drives real results for your business.
            Contact us today for a free consultation and quote.
          </p>
          <div className="space-x-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Project
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default WebsiteDesigningPage
