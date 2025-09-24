import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

const LogoDesignPage: React.FC = () => {
  const designPackages = [
    {
      name: 'Starter Package',
      price: '$299',
      features: [
        '3 Initial Logo Concepts',
        '2 Rounds of Revisions',
        'High-Resolution Files (PNG, JPG)',
        'Basic Brand Guidelines',
        '7-Day Delivery'
      ],
      popular: false
    },
    {
      name: 'Professional Package',
      price: '$599',
      features: [
        '5 Initial Logo Concepts',
        '4 Rounds of Revisions',
        'Vector Files (AI, EPS, SVG)',
        'Complete Brand Guidelines',
        'Business Card Design',
        'Social Media Kit',
        '5-Day Delivery'
      ],
      popular: true
    },
    {
      name: 'Premium Package',
      price: '$999',
      features: [
        '8 Initial Logo Concepts',
        'Unlimited Revisions',
        'Complete File Package',
        'Comprehensive Brand Identity',
        'Letterhead & Business Cards',
        'Social Media Templates',
        'Brand Style Guide',
        '3-Day Delivery'
      ],
      popular: false
    }
  ]

  const designProcess = [
    {
      step: '1',
      title: 'Discovery & Research',
      description: 'We dive deep into your brand, target audience, and industry to understand your unique positioning'
    },
    {
      step: '2',
      title: 'Concept Development',
      description: 'Our designers create multiple logo concepts based on your brand strategy and visual preferences'
    },
    {
      step: '3',
      title: 'Design Refinement',
      description: 'We work with you to refine your chosen concept, ensuring every detail aligns with your vision'
    },
    {
      step: '4',
      title: 'Finalization & Delivery',
      description: 'Final logo delivery with all file formats and comprehensive brand guidelines for consistent use'
    }
  ]

  const portfolioExamples = [
    {
      category: 'Technology',
      description: 'Modern, clean logos for tech startups and software companies',
      style: 'Minimalist & Innovative'
    },
    {
      category: 'Healthcare',
      description: 'Trustworthy, professional logos for medical and wellness brands',
      style: 'Clean & Trustworthy'
    },
    {
      category: 'Creative',
      description: 'Artistic, unique logos for creative agencies and artists',
      style: 'Bold & Expressive'
    },
    {
      category: 'Corporate',
      description: 'Professional, sophisticated logos for established businesses',
      style: 'Classic & Refined'
    },
    {
      category: 'Retail',
      description: 'Eye-catching, memorable logos for retail and e-commerce brands',
      style: 'Vibrant & Engaging'
    },
    {
      category: 'Non-Profit',
      description: 'Meaningful, impactful logos for charitable organizations',
      style: 'Inspiring & Purposeful'
    }
  ]

  const designPhilosophy = [
    {
      title: 'Simplicity',
      description: 'Great logos are simple, memorable, and work across all mediums and sizes'
    },
    {
      title: 'Relevance',
      description: 'Every design element should connect with your target audience and industry'
    },
    {
      title: 'Timelessness',
      description: 'We create logos that stand the test of time, avoiding trendy elements that quickly date'
    },
    {
      title: 'Versatility',
      description: 'Your logo should work equally well on business cards, billboards, and digital platforms'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Professional Logo Design Services - SkillGrid"
        description="Creative, memorable logo designs that perfectly represent your brand identity. SkillGrid provides custom logo design with unlimited revisions and multiple formats."
        keywords="logo design, brand identity, custom logos, graphic design, business logos, professional logo design, brand design, visual identity"
        url="/services/logo-design"
        type="service"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Logo Design</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Create a powerful first impression with a logo that captures your brand's essence and resonates with your audience
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Logo Project
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Crafting Memorable Brand Identities</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              Your logo is often the first interaction customers have with your brand. At SkillGrid, we understand the 
              power of visual identity and create logos that not only look stunning but also communicate your brand's 
              values, personality, and promise to your audience.
            </p>
            <p>
              Our logo design process combines strategic thinking with creative excellence, ensuring your logo works 
              effectively across all touchpoints—from business cards to billboards, websites to social media. We don't 
              just design logos; we craft brand identities that drive recognition and trust.
            </p>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Design Philosophy</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designPhilosophy.map((principle, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Packages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Logo Design Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {designPackages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${pkg.popular ? 'ring-2 ring-orange-500 transform scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="bg-orange-500 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-center text-orange-600 mb-6">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact" 
                    className={`w-full text-center py-3 rounded-lg font-semibold transition-colors block ${
                      pkg.popular 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Choose Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">{example.category[0]}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{example.category}</h3>
                  <p className="text-gray-600 mb-3">{example.description}</p>
                  <div className="text-sm text-orange-600 font-medium">{example.style}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Design Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Logo Design Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designProcess.map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Receive</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-orange-600">File Formats</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Vector files (AI, EPS, SVG) for scalability</li>
                <li>• High-resolution PNG and JPG files</li>
                <li>• Web-optimized formats</li>
                <li>• Print-ready files</li>
                <li>• Favicon and social media versions</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">Brand Guidelines</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Logo usage guidelines</li>
                <li>• Color palette specifications</li>
                <li>• Typography recommendations</li>
                <li>• Spacing and sizing rules</li>
                <li>• Do's and don'ts for logo use</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillGrid for Logo Design?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Creative Excellence</h3>
              <p className="text-gray-600">Award-winning designers with years of experience in brand identity creation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick turnaround times without compromising on quality or creativity</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Satisfaction</h3>
              <p className="text-gray-600">We work until you're completely happy with your logo design</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Brand Identity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's design a logo that captures your brand's essence and makes a lasting impression. 
            Contact us today to start your logo design project.
          </p>
          <div className="space-x-4">
            <Link 
              to="/contact" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Logo Project
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LogoDesignPage