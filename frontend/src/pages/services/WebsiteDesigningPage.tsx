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
      title: 'E-commerce Platform',
      description: 'Modern online store with payment integration and inventory management',
      technologies: 'React, Node.js, Stripe'
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

        {/* Portfolio Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioExamples.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="text-sm text-blue-600 font-medium">{project.technologies}</div>
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