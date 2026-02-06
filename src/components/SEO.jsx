import React from 'react';
import { Helmet } from 'react-helmet-async';
import { i18n } from '../data/i18n';

const SEO = ({ 
  lang, 
  title, 
  description, 
  keywords, 
  type = 'website', 
  image, 
  schema 
}) => {
  const texts = i18n[lang] || i18n.en;
  const siteTitle = title || texts.title;
  const siteDescription = description || texts.description;
  const siteKeywords = keywords ? keywords.join(', ') : "personality test, quiz, psychology, entertainment";
  const siteUrl = window.location.href;
  const canonicalUrl = siteUrl.split('#')[0] + (window.location.hash || '');
  const siteImage = image || 'https://test-9cg.pages.dev/og-image.png';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:site_name" content="Insightful Tests" />
      <meta property="og:locale" content={lang === 'ko' ? 'ko_KR' : 'en_US'} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;