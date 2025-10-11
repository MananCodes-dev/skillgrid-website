import React from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '../components'

const ModernStorePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="ModernStore Demo - E-commerce Platform | SkillGrid"
        description="Experience our e-commerce development capabilities with this fully functional online store demo featuring payment integration and inventory management."
        keywords="e-commerce demo, online store, React, Node.js, Stripe integration, web development"
        url="/modernstore-demo"
        type="website"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">🛒 ModernStore Demo</h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Experience our e-commerce development expertise with this fully functional online store
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🚀 Get Your Store Built
            </Link>
            <Link
              to="/services/website-designing"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              📋 View All Services
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Preview */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 bg-white rounded px-3 py-1 text-sm text-gray-600">
                  modernstore-demo.skillgrid.com
                </div>
              </div>
            </div>

            {/* Demo Preview */}
            <div className="relative bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">ModernStore E-commerce Platform</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                A fully functional e-commerce platform built with React, Node.js, and Stripe integration.
                Features include product catalog, shopping cart, user authentication, and secure payment processing.
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-sm font-medium">Mobile Responsive</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-sm font-medium">Secure Payments</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-medium">Fast Loading</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-sm font-medium">Modern UI/UX</div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> This is a demonstration of our e-commerce development capabilities.
                  The actual demo is currently being optimized for better performance.
                </p>
              </div>
              <a
                href="https://github.com/skillgrid/modernstore-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors mr-4"
              >
                📂 View Source Code
              </a>
              <Link
                to="/contact"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                💬 Discuss Your Project
              </Link>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Technical Implementation</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '⚛️', title: 'React Frontend', desc: 'Modern React with TypeScript and Tailwind CSS' },
                { icon: '🔧', title: 'Node.js Backend', desc: 'RESTful API with Express.js' },
                { icon: '💳', title: 'Stripe Integration', desc: 'Secure payment processing and webhooks' },
                { icon: '📱', title: 'Responsive Design', desc: 'Mobile-first approach, works on all devices' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Showcase */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">E-commerce Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Product Management',
                  features: ['Product catalog', 'Category filtering', 'Search functionality', 'Inventory tracking'],
                  icon: '📦'
                },
                {
                  title: 'Shopping Experience',
                  features: ['Shopping cart', 'Wishlist', 'User accounts', 'Order history'],
                  icon: '🛒'
                },
                {
                  title: 'Payment & Security',
                  features: ['Stripe integration', 'Secure checkout', 'Order confirmation', 'Email notifications'],
                  icon: '🔒'
                }
              ].map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4 text-center">{section.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Store?</h2>
            <p className="text-xl mb-6 opacity-90">
              Let us create a custom e-commerce solution for your business
            </p>
            <Link
              to="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernStorePage
