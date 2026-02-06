import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tests } from '../data/tests';
import { i18n } from '../data/i18n';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

const TestSelection = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  return (
    <div className="container selection-page fade-in">
      <SEO lang={lang} />

      <section className="ad-slot top" aria-label="Advertisement"></section>

      <div className="selection-header">
        <h1 className="title">{texts.selectTest}</h1>
        <p className="description">{texts.description}</p>
      </div>

      <div className="test-grid">
        {Object.values(tests).map((test) => (
          <div 
            key={test.id} 
            className="test-card highlight-card clickable"
            onClick={() => navigate(`/${lang}/${test.id}`)}
          >
            <h2>{test[lang]?.title || test.en.title}</h2>
            <p>{test[lang]?.description || test.en.description}</p>
            <div className="card-footer">
              <button className="primary-button">{texts.startTest}</button>
            </div>
          </div>
        ))}
      </div>

      <section className="ad-slot middle" aria-label="Advertisement"></section>

      <div className="about-section highlight-card">
        <h3>✨ {texts.aboutUs}</h3>
        <p>{texts.aboutDescription}</p>
      </div>

      <section className="ad-slot bottom" aria-label="Advertisement"></section>

      <div className="footer-actions">
        <button 
          className="text-button" 
          onClick={() => navigate(`/${lang}/contact`)}
        >
          📩 {texts.partnershipInquiry}
        </button>
      </div>
    </div>
  );
};

export default TestSelection;