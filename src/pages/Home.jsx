import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { i18n } from '../data/i18n';
import { useMeta } from '../hooks/useMeta';

const Home = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  // SEO
  useMeta(lang || 'en', 'home');

  const startTest = () => {
    navigate(`/${lang}/test`);
  };

  return (
    <div className="container home-page fade-in">
      <div className="hero-section">
        <h1 className="title">{texts.title}</h1>
        <p className="description">{texts.description}</p>
        <button className="primary-button large-button" onClick={startTest}>
          {texts.startTest}
        </button>
      </div>
      
      <div className="stats-preview">
        {/* Visual interest for home page */}
        <div className="icon-group">
          <span>🛡️</span>
          <span>🤔</span>
          <span>🏃</span>
        </div>
      </div>
    </div>
  );
};

export default Home;