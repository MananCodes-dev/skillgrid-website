import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'service'
  structuredData?: object
}

const SEO: React.FC<SEOProps> = ({
  title = 'SkillGrid - Professional Services for Website Design, Notes, Translation, Logo Design & Counselling',
  description = 'Transform your ideas into reality with SkillGrid\'s professional services. Expert website design, academic notes, translation, logo design, and counselling services. Get started today!',
  keywords = 'website design, logo design, translation services, academic notes, counselling, professional services, SkillGrid',
  image = '/skillgrid_logo.png',
  url = 'https://skillgrid.com',
  type = 'website',
  structuredData
}) => {
  const siteTitle = 'SkillGrid'
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`
  const fullUrl = url.startsWith('http') ? url : `https://skillgrid.com${url}`
  const fullImage = image.startsWith('http') ? image : `https://skillgrid.com${image}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="SkillGrid Team" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="SkillGrid" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@skillgrid" />
      <meta name="twitter:creator" content="@skillgrid" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" href="/skillgrid_logo.png" />
      <link rel="apple-touch-icon" href="/skillgrid_logo.png" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO