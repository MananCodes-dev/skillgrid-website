import React from 'react'
import { SEO } from '../components'

const AboutPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "SkillGrid",
      "description": "A passionate two-person team dedicated to empowering individuals and businesses through diverse professional services",
      "foundingDate": "2024",
      "numberOfEmployees": "2",
      "employee": [
        {
          "@type": "Person",
          "name": "Manan",
          "jobTitle": "Co-Founder & Creative Director",
          "worksFor": {
            "@type": "Organization",
            "name": "SkillGrid"
          }
        },
        {
          "@type": "Person", 
          "name": "Diya",
          "jobTitle": "Co-Founder & Academic Specialist",
          "worksFor": {
            "@type": "Organization",
            "name": "SkillGrid"
          }
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/30">
      <SEO
        title="About SkillGrid - Meet Our Expert Team"
        description="Learn about SkillGrid's passionate two-person team. Manan (Creative Director) and Diya (Academic Specialist) bring expertise in website design, logo design, translation, notes, and counselling services."
        keywords="about SkillGrid, team, Manan, Diya, website design experts, translation specialists, counselling professionals"
        url="/about"
        type="website"
        structuredData={structuredData}
      />
      <SEO 
        title="About SkillGrid - Meet Our Expert Team"
        description="Learn about SkillGrid's passionate two-person team dedicated to delivering exceptional website design, logo design, translation, notes, and counselling services with personalized attention."
        keywords="about SkillGrid, team, website designers, logo designers, translators, counsellors, professional services team"
        url="/about"
        type="website"
      />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-100 mb-6">About SkillGrid</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a passionate two-person team dedicated to empowering individuals and businesses 
            through our diverse range of professional services. From creative design to academic support, 
            we bring expertise, creativity, and personalized attention to every project.
          </p>
        </div>

        {/* Mission & Values Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                At SkillGrid, we believe in the power of quality service and personal connection. 
                Our mission is to provide exceptional, tailored solutions that help our clients 
                achieve their goals, whether they're students seeking academic support, businesses 
                needing professional design, or individuals requiring specialized services.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We combine technical expertise with creative vision to deliver results that 
                exceed expectations while building lasting relationships with our clients.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Values</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-200">Excellence</h3>
                    <p className="text-gray-300">We strive for perfection in every project, no matter the size.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-200">Personalization</h3>
                    <p className="text-gray-300">Every client receives tailored solutions that fit their unique needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-200">Integrity</h3>
                    <p className="text-gray-300">We build trust through honest communication and reliable delivery.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-200">Innovation</h3>
                    <p className="text-gray-300">We stay current with trends and technologies to provide cutting-edge solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-100 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Team Member 1 - Manan */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">M</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Manan</h3>
              <p className="text-blue-400 font-semibold mb-4">Co-Founder & Creative Director</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Manan brings creative vision and technical expertise to every project. With a passion 
                for modern design and user experience, he specializes in creating stunning websites 
                and memorable brand identities that help businesses stand out.
              </p>
              <div className="text-left">
                <h4 className="font-semibold text-gray-200 mb-3">Expertise Areas:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Website Design & Development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Logo Design & Branding
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    UI/UX Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Digital Marketing Materials
                  </li>
                </ul>
              </div>
            </div>

            {/* Team Member 2 - Diya */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">D</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Diya</h3>
              <p className="text-green-400 font-semibold mb-4">Co-Founder & Academic Specialist</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Diya brings expertise in academic support, language services, and counseling. Fluent 
                in Assamese and Bengali, she provides comprehensive solutions for educational needs, 
                specialized translation services, and professional guidance with cultural sensitivity.
              </p>
              <div className="text-left">
                <h4 className="font-semibold text-gray-200 mb-3">Expertise Areas:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Academic Notes & Research
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Translation (Assamese & Bengali)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Professional Counseling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Educational Consulting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">Why Choose SkillGrid?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">Proven Track Record</h3>
              <p className="text-gray-300">
                Over 200+ successful projects completed with 98% client satisfaction rate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">Fast Turnaround</h3>
              <p className="text-gray-300">
                Quick delivery without compromising quality. Most projects completed within 48-72 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">Personal Touch</h3>
              <p className="text-gray-300">
                Direct communication with our team. No middlemen, just personalized service and attention.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help bring your vision to life.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutPage