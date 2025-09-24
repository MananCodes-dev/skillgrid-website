import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

const NotesPage: React.FC = () => {
  const serviceFeatures = [
    'Comprehensive Study Notes',
    'Subject-Specific Materials',
    'Exam Preparation Guides',
    'Research Documentation',
    'Meeting Minutes & Reports',
    'Academic Paper Summaries',
    'Digital & Physical Formats',
    'Custom Note Templates'
  ]

  const targetAudience = [
    {
      title: 'Students',
      description: 'High school and college students needing organized study materials',
      icon: '🎓'
    },
    {
      title: 'Professionals',
      description: 'Working professionals requiring meeting notes and documentation',
      icon: '💼'
    },
    {
      title: 'Researchers',
      description: 'Academic researchers needing structured research documentation',
      icon: '🔬'
    },
    {
      title: 'Educators',
      description: 'Teachers and professors creating educational materials',
      icon: '👨‍🏫'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Expert Knowledge',
      description: 'Our team has extensive experience across multiple academic disciplines and professional fields'
    },
    {
      title: 'Structured Approach',
      description: 'We create well-organized, easy-to-follow notes that enhance learning and retention'
    },
    {
      title: 'Quality Assurance',
      description: 'All notes are thoroughly reviewed for accuracy, clarity, and completeness'
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick delivery without compromising on quality, perfect for tight deadlines'
    },
    {
      title: 'Custom Formatting',
      description: 'Notes tailored to your specific requirements and preferred learning style'
    },
    {
      title: 'Affordable Pricing',
      description: 'Competitive rates that provide excellent value for high-quality documentation'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Professional Notes Services - SkillGrid"
        description="Get comprehensive, well-structured notes for academic and professional needs. SkillGrid provides expert note-taking services, study guides, and documentation with fast turnaround."
        keywords="notes services, study notes, academic notes, professional documentation, exam preparation, research notes, meeting minutes, study guides"
        url="/services/notes"
        type="service"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Notes Services</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transform complex information into clear, organized, and actionable notes that boost your learning and productivity
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Custom Notes
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Comprehensive Note-Taking Solutions</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              At SkillGrid, we understand that effective notes are the foundation of successful learning and professional growth. 
              Our notes services provide you with meticulously crafted, well-structured documentation that transforms complex 
              information into digestible, actionable insights.
            </p>
            <p>
              Whether you're a student preparing for exams, a professional documenting meetings, or a researcher organizing 
              findings, our expert team creates notes that enhance understanding, improve retention, and save you valuable time.
            </p>
          </div>
        </section>

        {/* Target Audience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetAudience.map((audience, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{audience.title}</h3>
                <p className="text-gray-600">{audience.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillGrid for Notes?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Types of Notes We Create</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Academic Notes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lecture summaries and key points</li>
                <li>• Textbook chapter breakdowns</li>
                <li>• Exam preparation materials</li>
                <li>• Research paper outlines</li>
                <li>• Study guides and flashcards</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Professional Notes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Meeting minutes and action items</li>
                <li>• Training session documentation</li>
                <li>• Conference and seminar notes</li>
                <li>• Project documentation</li>
                <li>• Process and procedure guides</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Note-Taking Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consultation', desc: 'Understanding your specific needs and requirements' },
              { step: '2', title: 'Research', desc: 'Gathering and analyzing source materials' },
              { step: '3', title: 'Creation', desc: 'Crafting clear, organized, and comprehensive notes' },
              { step: '4', title: 'Review', desc: 'Quality check and formatting for optimal usability' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-600">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you create organized, effective notes that enhance your understanding and save you time. 
            Contact us today to discuss your note-taking needs.
          </p>
          <div className="space-x-4">
            <Link 
              to="/contact" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Order Custom Notes
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NotesPage