import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tests } from '../data/tests';
import { i18n } from '../data/i18n';
import { useMeta } from '../hooks/useMeta';

const Home = () => {
  const { lang, testId } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;
  const currentTest = tests[testId];

  // SEO
  useMeta(lang || 'en', 'home', { title: currentTest?.[lang]?.title });

  if (!currentTest) {
    return <div className="container">{texts.loading}</div>;
  }

  const startTest = () => {
    navigate(`/${lang}/${testId}/test`);
  };

  return (
    <div className="container home-page fade-in">
      <div className="hero-section">
        <h1 className="title">{currentTest[lang]?.title || currentTest.en.title}</h1>
        <p className="description">{currentTest[lang]?.description || currentTest.en.description}</p>
        <button className="primary-button large-button" onClick={startTest}>
          {texts.startTest}
        </button>
      </div>
      
      <div className="actions">
        <button className="text-button" onClick={() => navigate(`/${lang}`)}>
          ← {texts.backToList}
        </button>
      </div>
    </div>
  );
};

export default Home;
