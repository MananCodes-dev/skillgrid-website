import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

const TranslationPage: React.FC = () => {
  const languagesPairs = [
    { from: 'English', to: 'Assamese', flag1: '🇺🇸', flag2: '🇮🇳', featured: true },
    { from: 'English', to: 'Bengali', flag1: '🇺🇸', flag2: '🇧🇩', featured: true },
    { from: 'English', to: 'Hindi', flag1: '🇺🇸', flag2: '🇮🇳' },
    { from: 'English', to: 'Spanish', flag1: '🇺🇸', flag2: '🇪🇸' },
    { from: 'English', to: 'French', flag1: '🇺🇸', flag2: '🇫🇷' },
    { from: 'English', to: 'German', flag1: '🇺🇸', flag2: '🇩🇪' },
    { from: 'English', to: 'Chinese', flag1: '🇺🇸', flag2: '🇨🇳' },
    { from: 'English', to: 'Arabic', flag1: '🇺🇸', flag2: '🇸🇦' }
  ]

  const serviceTypes = [
    {
      title: 'Document Translation',
      description: 'Legal documents, certificates, academic transcripts, and business papers',
      icon: '📄'
    },
    {
      title: 'Website Localization',
      description: 'Complete website translation with cultural adaptation',
      icon: '🌐'
    },
    {
      title: 'Business Translation',
      description: 'Contracts, proposals, marketing materials, and corporate communications',
      icon: '💼'
    },
    {
      title: 'Academic Translation',
      description: 'Research papers, theses, academic articles, and educational content',
      icon: '🎓'
    },
    {
      title: 'Technical Translation',
      description: 'Manuals, specifications, software documentation, and technical guides',
      icon: '⚙️'
    },
    {
      title: 'Creative Translation',
      description: 'Marketing copy, creative content, and culturally adapted messaging',
      icon: '🎨'
    }
  ]

  const qualityGuarantees = [
    {
      title: 'Native Speaker Expertise',
      description: 'All translations performed by native speakers with subject matter expertise'
    },
    {
      title: 'Cultural Accuracy',
      description: 'Not just word-for-word translation, but cultural adaptation for target audience'
    },
    {
      title: 'Quality Assurance',
      description: 'Multi-step review process including proofreading and quality checks'
    },
    {
      title: 'Confidentiality',
      description: 'Strict confidentiality agreements and secure handling of all documents'
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick delivery without compromising accuracy or quality'
    },
    {
      title: 'Revision Guarantee',
      description: 'Free revisions until you are completely satisfied with the translation'
    }
  ]

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'International Business Manager',
      text: 'SkillGrid translated our entire product catalog into Spanish. The quality was exceptional and helped us expand into Latin American markets successfully.',
      rating: 5
    },
    {
      name: 'Dr. James Chen',
      role: 'Academic Researcher',
      text: 'Their technical translation of my research paper was accurate and maintained the scientific terminology perfectly. Highly recommended for academic work.',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Marketing Director',
      text: 'The creative translation of our marketing materials captured our brand voice perfectly in French. The cultural adaptation was spot-on.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/30">
      <SEO 
        title="Professional Translation Services - SkillGrid"
        description="Accurate, culturally-aware translation services across multiple languages. SkillGrid provides expert translation for documents, websites, and content with quality assurance."
        keywords="translation services, document translation, website translation, multilingual services, professional translators, language services, certified translation"
        url="/services/translation"
        type="service"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Professional Translation Services</h1>
          <p className="text-xl mb-4 max-w-3xl mx-auto">
            Bridge language barriers with accurate, culturally-aware translations that preserve meaning and impact across cultures
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-purple-100">
            <strong>Specializing in Assamese & Bengali</strong> - Native expertise for authentic regional translations
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Translation Quote
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">Expert Translation Solutions</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-300 space-y-4">
            <p>
              At SkillGrid, we understand that effective translation goes beyond converting words from one language to another. 
              Our professional translation services ensure your message resonates with your target audience while maintaining 
              cultural sensitivity and contextual accuracy.
            </p>
            <p>
              <strong>Our specialty lies in Assamese and Bengali translations</strong>, where our native expertise ensures 
              authentic, culturally-appropriate content that truly connects with regional audiences. We also provide 
              professional translation services for other major languages.
            </p>
            <p>
              Whether you need business documents translated, academic papers localized, or marketing materials adapted for 
              regional or international markets, our team delivers translations that truly communicate your intended message.
            </p>
          </div>
        </section>

        {/* Languages Supported */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Languages We Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languagesPairs.map((pair, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105 ${
                pair.featured 
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-2 border-purple-400' 
                  : 'bg-gray-800 border border-gray-700 text-gray-100'
              }`}>
                <div className="text-3xl mb-3">
                  {pair.flag1} ↔️ {pair.flag2}
                </div>
                <h3 className={`font-semibold ${pair.featured ? 'text-white' : 'text-gray-200'}`}>
                  {pair.from} ↔ {pair.to}
                </h3>
                {pair.featured && (
                  <div className="mt-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Our Specialty</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-300 mb-4">Need a different language pair? We work with a network of certified translators.</p>
            <Link 
              to="/contact" 
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Contact us for custom language requirements →
            </Link>
          </div>
        </section>

        {/* Service Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Translation Services We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceTypes.map((service, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Guarantees */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Our Quality Guarantee</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualityGuarantees.map((guarantee, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">{guarantee.title}</h3>
                <p className="text-gray-300">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Our Translation Process</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Analysis', desc: 'Document review and complexity assessment' },
              { step: '2', title: 'Assignment', desc: 'Matching with specialized native translator' },
              { step: '3', title: 'Translation', desc: 'Professional translation with cultural adaptation' },
              { step: '4', title: 'Review', desc: 'Quality assurance and proofreading' },
              { step: '5', title: 'Delivery', desc: 'Final review and secure delivery' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-100">{phase.title}</h3>
                <p className="text-gray-300 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-100">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-purple-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Break Language Barriers?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get professional, accurate translations that preserve your message's impact across cultures. 
            Contact us today for a free quote and consultation.
          </p>
          <div className="space-x-4">
            <Link 
              to="/contact" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Free Quote
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TranslationPage