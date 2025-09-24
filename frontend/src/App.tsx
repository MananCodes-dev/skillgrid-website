import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ToastProvider } from './components/ui/Toast'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ServicesOverviewPage from './pages/ServicesOverviewPage'
import WebsiteDesigningPage from './pages/services/WebsiteDesigningPage'
import NotesPage from './pages/services/NotesPage'
import TranslationPage from './pages/services/TranslationPage'
import LogoDesignPage from './pages/services/LogoDesignPage'
import CounsellingPage from './pages/services/CounsellingPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  // Set dark theme by default
  document.documentElement.classList.add('dark')
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ToastProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesOverviewPage />} />
                <Route path="/services/website-designing" element={<WebsiteDesigningPage />} />
                <Route path="/services/notes" element={<NotesPage />} />
                <Route path="/services/translation" element={<TranslationPage />} />
                <Route path="/services/logo-design" element={<LogoDesignPage />} />
                <Route path="/services/counselling" element={<CounsellingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </Router>
        </ToastProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App