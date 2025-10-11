import React from 'react'
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
            <a
              href="/modernstore/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🚀 Launch Full Demo
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Get Your Store Built
            </a>
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
            
            {/* Iframe for demo */}
            <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
              <iframe
                src="/modernstore/index.html"
                className="absolute top-0 left-0 w-full h-full"
                title="ModernStore Demo"
                frameBorder="0"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
          
          {/* Features */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚛️', title: 'React Frontend', desc: 'Modern React with TypeScript' },
              { icon: '🔧', title: 'Node.js Backend', desc: 'Scalable server architecture' },
              { icon: '💳', title: 'Stripe Integration', desc: 'Secure payment processing' },
              { icon: '📱', title: 'Responsive Design', desc: 'Works on all devices' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Store?</h2>
            <p className="text-xl mb-6 opacity-90">
              Let us create a custom e-commerce solution for your business
            </p>
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernStorePage
