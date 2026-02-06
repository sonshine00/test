import React from 'react';
import { Helmet } from 'react-helmet-async';
import { i18n } from '../data/i18n';

const SEO = ({ lang, title, description, type = 'website', image }) => {
  const texts = i18n[lang] || i18n.en;
  const siteTitle = title || texts.title;
  const siteDescription = description || texts.description;
  const siteUrl = window.location.href;
  const siteImage = image || 'https://test-9cg.pages.dev/og-image.png'; // Replace with actual default OG image

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Language attribute handled in App.jsx or via side effect */}
    </Helmet>
  );
};

export default SEO;
