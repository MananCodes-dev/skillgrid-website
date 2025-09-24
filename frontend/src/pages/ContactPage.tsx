import React, { useState } from 'react'
import { Card, Button, Badge, GradientText, AnimatedSection, LoadingSpinner } from '../components/ui'
import { SEO } from '../components'
import { useToast } from '../components/ui/Toast'
import { trackContactFormSubmission } from '../utils/analytics'
import { api } from '../utils/api'
import { getErrorMessage } from '../utils/errorHandling'

interface FormData {
  name: string
  email: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  service?: string
  message?: string
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const services = [
    'Website Designing',
    'Notes',
    'Translation',
    'Logo Design',
    'Counselling'
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 500) {
      newErrors.message = 'Message must be less than 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      addToast({
        type: 'error',
        title: 'Form Validation Failed',
        message: 'Please fix the errors above and try again.'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await api.post<{ success: boolean; message: string }>('/api/contact', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        service: formData.service,
        message: formData.message.trim()
      })

      if (result.success) {
        addToast({
          type: 'success',
          title: 'Message Sent Successfully!',
          message: result.message || 'Thank you for your message! We\'ll get back to you within 24 hours.'
        })
        
        // Track successful form submission
        trackContactFormSubmission(formData.service)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        })
      } else {
        throw new Error(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = getErrorMessage(error)
      
      addToast({
        type: 'error',
        title: 'Failed to Send Message',
        message: errorMessage,
        duration: 7000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "SkillGrid",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "skillgrit3@gmail.com",
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish", "French", "German", "Italian"]
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      <SEO
        title="Contact SkillGrid - Get Professional Services Today"
        description="Contact SkillGrid for professional website design, logo design, translation, notes, and counselling services. Get a free consultation and personalized quote. Response within 24 hours guaranteed."
        keywords="contact SkillGrid, professional services quote, website design consultation, logo design inquiry, translation services contact"
        url="/contact"
        type="website"
        structuredData={structuredData}
      />
      <SEO 
        title="Contact SkillGrid - Get Your Free Quote Today"
        description="Ready to transform your ideas into reality? Contact SkillGrid for professional website design, logo design, translation, notes, and counselling services. Get your free quote within 24 hours."
        keywords="contact SkillGrid, get quote, website design quote, logo design quote, translation services, counselling consultation, professional services contact"
        url="/contact"
        type="website"
      />
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        <AnimatedSection animation="fade-in" className="text-center mb-16">
          <Badge variant="primary" className="mb-6">
            ✨ Get In Touch
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <GradientText>Contact Us</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Send us a message and we'll get back to you within 24 hours!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="slide-up" delay={200}>
              <Card variant="gradient" padding="lg" shadow="xl" className="backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-100">Send us a message</h2>
                </div>



                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-800 text-gray-100 ${
                          errors.name ? 'border-red-400 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:bg-gray-700'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-800 text-gray-100 ${
                          errors.email ? 'border-red-400 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:bg-gray-700'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-200 mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-800 text-gray-100 ${
                        errors.service ? 'border-red-400 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:bg-gray-700'
                      }`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none bg-gray-800 text-gray-100 ${
                        errors.message ? 'border-red-400 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:bg-gray-700'
                      }`}
                      placeholder="Tell us about your project or ask any questions..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      {errors.message ? (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.message}
                        </p>
                      ) : (
                        <div></div>
                      )}
                      <p className={`text-sm ${formData.message.length > 450 ? 'text-orange-400' : 'text-gray-400'}`}>
                        {formData.message.length}/500 characters
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </AnimatedSection>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            <AnimatedSection animation="slide-left" delay={400}>
              <Card variant="glass" padding="lg" shadow="lg" className="backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100">Contact Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="w-6 h-6 text-blue-600">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Email</p>
                      <p className="text-sm text-gray-300">skillgrit3@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="w-6 h-6 text-green-600">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Response Time</p>
                      <p className="text-sm text-gray-300">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={600}>
              <Card variant="gradient" padding="lg" shadow="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Quick Start</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="primary" size="sm">1</Badge>
                    <p className="text-sm text-gray-600">Fill out the contact form</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="primary" size="sm">2</Badge>
                    <p className="text-sm text-gray-600">We'll review your requirements</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="primary" size="sm">3</Badge>
                    <p className="text-sm text-gray-600">Get a personalized proposal</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="primary" size="sm">4</Badge>
                    <p className="text-sm text-gray-600">Start your project!</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={800}>
              <Card variant="hover" padding="lg" shadow="lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Quality Guaranteed</h4>
                  <p className="text-sm text-gray-600">We're committed to delivering exceptional results that exceed your expectations.</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage