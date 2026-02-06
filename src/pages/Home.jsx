import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { i18n } from '../data/i18n';
import LanguageToggle from '../components/LanguageToggle';

const Home = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  const startTest = () => {
    navigate(`/${lang}/test`);
  };

  return (
    <div className="container home-page">
      <LanguageToggle currentLang={lang} />
      <h1 className="title">{texts.title}</h1>
      <p className="description">{texts.description}</p>
      <button className="primary-button" onClick={startTest}>
        {texts.startTest}
      </button>
    </div>
  );
};

export default Home;
