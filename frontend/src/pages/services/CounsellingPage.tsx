import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

const CounsellingPage: React.FC = () => {
  const counsellingTypes = [
    {
      title: 'Academic Counselling',
      description: 'Guidance for educational decisions, career planning, and academic success strategies',
      icon: '🎓',
      areas: ['Course Selection', 'Study Strategies', 'Exam Preparation', 'Time Management']
    },
    {
      title: 'Career Counselling',
      description: 'Professional guidance for career transitions, job searches, and professional development',
      icon: '💼',
      areas: ['Career Planning', 'Resume Building', 'Interview Preparation', 'Skill Development']
    },
    {
      title: 'Personal Development',
      description: 'Support for personal growth, goal setting, and life transitions',
      icon: '🌱',
      areas: ['Goal Setting', 'Life Planning', 'Confidence Building', 'Decision Making']
    },
    {
      title: 'Student Guidance',
      description: 'Specialized support for students facing academic and personal challenges',
      icon: '📚',
      areas: ['Academic Stress', 'Study Habits', 'Motivation', 'Learning Strategies']
    }
  ]

  const approach = [
    {
      title: 'Person-Centered',
      description: 'We believe every individual has the capacity for growth and positive change'
    },
    {
      title: 'Solution-Focused',
      description: 'Our approach emphasizes practical solutions and achievable goals'
    },
    {
      title: 'Evidence-Based',
      description: 'We use proven counselling techniques backed by research and best practices'
    },
    {
      title: 'Culturally Sensitive',
      description: 'We respect and honor diverse backgrounds, values, and perspectives'
    }
  ]

  const credentials = [
    {
      title: 'Professional Qualifications',
      items: [
        'Master\'s Degree in Counselling Psychology',
        'Certified Professional Counsellor (CPC)',
        'Licensed Career Development Facilitator',
        'Continuing Education in Latest Practices'
      ]
    },
    {
      title: 'Areas of Expertise',
      items: [
        'Academic and Educational Counselling',
        'Career Development and Planning',
        'Student Support and Guidance',
        'Personal Development Coaching'
      ]
    },
    {
      title: 'Experience',
      items: [
        '5+ Years in Professional Counselling',
        '500+ Successful Client Sessions',
        'University and Corporate Experience',
        'Diverse Client Demographics'
      ]
    }
  ]

  const sessionFormats = [
    {
      type: 'Individual Sessions',
      duration: '50 minutes',
      description: 'One-on-one personalized counselling sessions',
      price: '$80'
    },
    {
      type: 'Group Sessions',
      duration: '90 minutes',
      description: 'Small group counselling for shared experiences',
      price: '$45'
    },
    {
      type: 'Online Sessions',
      duration: '50 minutes',
      description: 'Convenient virtual counselling sessions',
      price: '$75'
    },
    {
      type: 'Workshop Series',
      duration: '2 hours',
      description: 'Structured workshops on specific topics',
      price: '$120'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Professional Counselling Services - SkillGrid"
        description="Expert counselling services for personal and professional growth. SkillGrid provides academic, career, and personal counselling with confidential, flexible sessions."
        keywords="counselling services, professional counselling, academic counselling, career guidance, personal development, therapy, consultation, mental health support"
        url="/services/counselling"
        type="service"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Counselling Services</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Empowering individuals to overcome challenges, achieve their goals, and unlock their full potential through compassionate, professional guidance
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Schedule a Session
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Compassionate Professional Guidance</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              At SkillGrid, we understand that life's challenges can feel overwhelming. Our professional counselling 
              services provide a safe, supportive environment where you can explore your thoughts, feelings, and goals 
              with an experienced, qualified counsellor who genuinely cares about your wellbeing.
            </p>
            <p>
              Whether you're navigating academic decisions, career transitions, or personal growth opportunities, 
              our evidence-based approach helps you develop the tools and insights needed to create positive, 
              lasting change in your life.
            </p>
          </div>
        </section>

        {/* Counselling Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Types of Counselling We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {counsellingTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{type.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800">{type.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {type.areas.map((area, areaIndex) => (
                    <div key={areaIndex} className="text-sm text-teal-600 bg-teal-50 px-3 py-1 rounded">
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Counselling Approach</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials & Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Credentials & Experience</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {credentials.map((section, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-teal-600">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Session Formats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Session Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessionFormats.map((session, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{session.type}</h3>
                <div className="text-2xl font-bold text-teal-600 mb-2">{session.price}</div>
                <div className="text-sm text-gray-500 mb-3">{session.duration}</div>
                <p className="text-gray-600">{session.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What to Expect</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Initial Consultation', desc: 'Free 15-minute consultation to discuss your needs and goals' },
              { step: '2', title: 'Assessment', desc: 'Comprehensive assessment to understand your situation and develop a plan' },
              { step: '3', title: 'Regular Sessions', desc: 'Ongoing counselling sessions tailored to your specific needs' },
              { step: '4', title: 'Progress Review', desc: 'Regular check-ins to assess progress and adjust approach as needed' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-600 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillGrid Counselling?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Safe & Confidential</h3>
              <p className="text-gray-600">Your privacy is our priority. All sessions are completely confidential and secure.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualified Professional</h3>
              <p className="text-gray-600">Licensed counsellor with extensive training and experience in various therapeutic approaches.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Options</h3>
              <p className="text-gray-600">In-person and online sessions available to fit your schedule and comfort level.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-teal-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your journey toward positive change starts with a single step. Contact us today to schedule your free consultation 
            and discover how counselling can help you achieve your goals.
          </p>
          <div className="space-x-4">
            <Link 
              to="/contact" 
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Schedule Free Consultation
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CounsellingPage