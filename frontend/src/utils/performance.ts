// Performance monitoring utilities

export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const metrics = {
        // Core Web Vitals
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        
        // Navigation timing
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnect: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseEnd - navigation.requestStart,
        domProcessing: navigation.domComplete - navigation.responseEnd,
        
        // Total page load time
        totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
      }
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.group('🚀 Performance Metrics')
        console.log('DOM Content Loaded:', `${metrics.domContentLoaded}ms`)
        console.log('Load Complete:', `${metrics.loadComplete}ms`)
        console.log('DNS Lookup:', `${metrics.dnsLookup}ms`)
        console.log('TCP Connect:', `${metrics.tcpConnect}ms`)
        console.log('Server Response:', `${metrics.serverResponse}ms`)
        console.log('DOM Processing:', `${metrics.domProcessing}ms`)
        console.log('Total Load Time:', `${metrics.totalLoadTime}ms`)
        console.groupEnd()
      }
      
      // Send to analytics in production (if needed)
      if (process.env.NODE_ENV === 'production' && window.gtag) {
        window.gtag('event', 'page_load_time', {
          custom_parameter: metrics.totalLoadTime
        })
      }
    })
  }
}

export const measureLCP = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🎯 Largest Contentful Paint:', `${lastEntry.startTime}ms`)
        }
        
        // Send to analytics in production
        if (process.env.NODE_ENV === 'production' && window.gtag) {
          window.gtag('event', 'lcp', {
            custom_parameter: lastEntry.startTime
          })
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('LCP measurement not supported')
    }
  }
}

export const measureCLS = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      let clsValue = 0
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('📐 Cumulative Layout Shift:', clsValue)
        }
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('CLS measurement not supported')
    }
  }
}

export const measureFID = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime
          
          if (process.env.NODE_ENV === 'development') {
            console.log('⚡ First Input Delay:', `${fid}ms`)
          }
          
          // Send to analytics in production
          if (process.env.NODE_ENV === 'production' && window.gtag) {
            window.gtag('event', 'fid', {
              custom_parameter: fid
            })
          }
        }
      })
      
      observer.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('FID measurement not supported')
    }
  }
}

// Initialize all performance measurements
export const initPerformanceMonitoring = () => {
  measurePageLoad()
  measureLCP()
  measureCLS()
  measureFID()
}

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload the logo image
    const logoLink = document.createElement('link')
    logoLink.rel = 'preload'
    logoLink.href = '/skillgrid_logo.png'
    logoLink.as = 'image'
    logoLink.type = 'image/png'
    document.head.appendChild(logoLink)
    
    // Preload critical fonts if using web fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    fontLink.as = 'style'
    fontLink.onload = () => {
      fontLink.onload = null
      fontLink.rel = 'stylesheet'
    }
    document.head.appendChild(fontLink)
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}