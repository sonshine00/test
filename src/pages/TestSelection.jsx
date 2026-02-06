import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tests } from '../data/tests';
import { i18n } from '../data/i18n';
import { useMeta } from '../hooks/useMeta';

const TestSelection = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  useMeta(lang || 'en', 'home');

  return (
    <div className="container selection-page fade-in">
      <h1 className="title">{texts.selectTest}</h1>
      <div className="test-grid">
        {Object.values(tests).map((test) => (
          <div 
            key={test.id} 
            className="test-card highlight-card clickable"
            onClick={() => navigate(`/${lang}/${test.id}`)}
          >
            <h2>{test[lang]?.title || test.en.title}</h2>
            <p>{test[lang]?.description || test.en.description}</p>
            <button className="secondary-button">{texts.startTest}</button>
          </div>
        ))}
      </div>
      
      <div className="footer-actions" style={{ marginTop: '4rem', width: '100%' }}>
        <button 
          className="text-button" 
          onClick={() => navigate(`/${lang}/contact`)}
          style={{ textDecoration: 'underline' }}
        >
          📩 {texts.partnershipInquiry}
        </button>
      </div>
    </div>
  );
};

export default TestSelection;