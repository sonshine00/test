import { useEffect } from 'react';
import { i18n } from '../data/i18n';

export const useMeta = (lang, page = 'home', extraData = {}) => {
  useEffect(() => {
    const texts = i18n[lang] || i18n.en;
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;

    // Determine title and description
    let title = extraData.title || texts.title;
    let description = extraData.description || texts.description;

    if (page === 'result' && extraData.type) {
      title = `${extraData.type} - ${title}`;
    }

    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Open Graph
    const setOg = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:type', 'website');
    setOg('og:url', window.location.href);
    // Placeholder for OG image - can be replaced with a real URL later
    setOg('og:image', 'https://avoider-test.pages.dev/og-image.png');

  }, [lang, page, extraData]);
};
