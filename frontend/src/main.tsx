import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { initPerformanceMonitoring, preloadCriticalResources } from './utils/performance'

// Initialize performance monitoring
initPerformanceMonitoring()

// Preload critical resources
preloadCriticalResources()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)