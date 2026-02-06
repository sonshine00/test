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
            <button className="secondary-button">{texts.startTest}</button>
          </div>
        ))}
      </div>

      <div className="about-section highlight-card" style={{ marginTop: '4rem', textAlign: 'left' }}>
        <h3>✨ {texts.aboutUs}</h3>
        <p style={{ lineHeight: '1.6', color: 'var(--description-color)' }}>
          {texts.aboutDescription}
        </p>
      </div>
    </div>
  );
};

export default TestSelection;
