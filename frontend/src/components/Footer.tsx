import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Website Designing', path: '/services/website-designing', icon: '🌐' },
    { name: 'Notes', path: '/services/notes', icon: '📚' },
    { name: 'Translation', path: '/services/translation', icon: '🌍' },
    { name: 'Logo Design', path: '/services/logo-design', icon: '🎨' },
    { name: 'Counselling', path: '/services/counselling', icon: '🤝' }
  ]

  const quickLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'All Services', path: '/services', icon: '⚡' },
    { name: 'About Us', path: '/about', icon: '👥' },
    { name: 'Contact', path: '/contact', icon: '📧' }
  ]

  const socialLinks = [
    { name: 'Email', href: 'mailto:skillgrit3@gmail.com', icon: '📧' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📸' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <img 
                  src="/skillgrid_logo.png" 
                  alt="SkillGrid Logo" 
                  className="h-10 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                    if (nextElement) {
                      nextElement.style.display = 'block'
                    }
                  }}
                />
                <span className="text-2xl font-bold gradient-text hidden">SkillGrid</span>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Professional services in website design, notes, translation, logo design, and counselling. 
              Transforming ideas into reality with expertise, creativity, and personalized attention.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">📧</span>
                <div>
                  <span className="font-medium text-white">Email:</span>{' '}
                  <a 
                    href="mailto:skillgrit3@gmail.com" 
                    className="text-primary-400 hover:text-primary-300 transition-colors hover:underline"
                  >
                    skillgrit3@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">⏰</span>
                <div>
                  <span className="font-medium text-white">Response Time:</span> Within 24 hours
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Connect With Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                    aria-label={social.name}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-all duration-300 group hover:translate-x-1"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-all duration-300 group hover:translate-x-1"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest updates and offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <span className="text-sm">📧</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} SkillGrid. All rights reserved.
              </p>
              <div className="flex space-x-4 text-xs text-gray-500">
                <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/contact" 
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center space-x-2 group"
              >
                <span>Get in Touch</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer