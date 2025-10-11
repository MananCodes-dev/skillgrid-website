import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
  bgColor: string;
  textColor: string;
}

const ServicesOverviewPage: React.FC = () => {
  const services: Service[] = [
    {
      id: 'website-designing',
      name: 'Website Designing',
      description: 'Professional, responsive websites that captivate your audience and drive business growth.',
      features: ['Custom Design', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
      icon: '🌐',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'notes',
      name: 'Academic Notes',
      description: 'Comprehensive, well-structured notes to help you excel in your academic journey.',
      features: ['Subject Expertise', 'Clear Structure', 'Visual Aids', 'Quick Delivery'],
      icon: '📚',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'translation',
      name: 'Translation Services',
      description: 'Accurate, culturally-aware translations across multiple languages for global communication.',
      features: ['5+ Languages', 'Cultural Context', 'Quick Turnaround', 'Professional Quality'],
      icon: '🌍',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'logo-design',
      name: 'Logo Design',
      description: 'Memorable, impactful logos that perfectly represent your brand identity and values.',
      features: ['Brand Identity', 'Multiple Concepts', 'Vector Files', 'Unlimited Revisions'],
      icon: '🎨',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'counselling',
      name: 'Professional Counselling',
      description: 'Confidential, supportive counselling services to help you navigate life\'s challenges.',
      features: ['Licensed Professional', 'Confidential Sessions', 'Flexible Scheduling', 'Multiple Approaches'],
      icon: '🤝',
      gradient: 'from-teal-500 to-blue-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO
        title="Our Services - SkillGrid Professional Solutions"
        description="Explore SkillGrid's comprehensive range of professional services including website design, logo design, translation, notes, and counselling. Quality solutions tailored to your needs."
        keywords="professional services, website design, logo design, translation services, notes services, counselling, SkillGrid services, business solutions"
        url="/services"
        type="website"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Discover our comprehensive range of professional services designed to help you succeed.
            From creative design to academic support, we bring expertise and passion to every project.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="group">
              <Link to={`/services/${service.id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full">
                  {/* Service Icon Header */}
                  <div className={`bg-gradient-to-r ${service.gradient} p-6 text-center`}>
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${service.textColor.replace('text-', 'bg-')} mr-3`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Call to Action */}
                    <div className={`${service.bgColor} rounded-lg p-4 text-center group-hover:bg-opacity-80 transition-colors`}>
                      <span className={`${service.textColor} font-semibold`}>
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Our Services Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose SkillGrid?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine expertise, creativity, and personalized attention to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick turnaround without compromising quality</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">Professional standards in every project</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Touch</h3>
              <p className="text-gray-600 text-sm">Direct communication with our expert team</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fair Pricing</h3>
              <p className="text-gray-600 text-sm">Competitive rates for premium services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and find the perfect solution for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 inline-block"
            >
              Get In Touch
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 inline-block"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesOverviewPage
