// Analytics utilities for tracking user interactions and performance

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  } else if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, parameters)
  }
}

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle
    })
  } else if (process.env.NODE_ENV === 'development') {
    console.log('📄 Page View:', pagePath, pageTitle)
  }
}

export const trackContactFormSubmission = (service: string) => {
  trackEvent('contact_form_submit', {
    service_type: service,
    event_category: 'engagement',
    event_label: 'contact_form'
  })
}

export const trackServicePageView = (serviceName: string) => {
  trackEvent('service_page_view', {
    service_name: serviceName,
    event_category: 'engagement',
    event_label: 'service_interest'
  })
}

export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
    event_category: 'engagement',
    event_label: 'call_to_action'
  })
}

// Initialize Google Analytics (placeholder for when GA is set up)
export const initAnalytics = (measurementId?: string) => {
  if (typeof window !== 'undefined' && measurementId) {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href
    })
  }
}

// Declare global types
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}