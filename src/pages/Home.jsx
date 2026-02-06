import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tests } from '../data/tests';
import { i18n } from '../data/i18n';
import SEO from '../components/SEO';

const Home = () => {
  const { lang, testId } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;
  const currentTest = tests[testId];

  if (!currentTest) {
    return <div className="container">{texts.loading}</div>;
  }

  return (
    <div className="container home-page fade-in">
      <SEO 
        lang={lang} 
        title={currentTest[lang]?.title || currentTest.en.title}
        description={currentTest[lang]?.description || currentTest.en.description}
      />

      <section className="ad-slot top" aria-label="Advertisement"></section>

      <div className="hero-section">
        <h1 className="title">{currentTest[lang]?.title || currentTest.en.title}</h1>
        <p className="description">{currentTest[lang]?.description || currentTest.en.description}</p>
        <button className="primary-button large-button" onClick={() => navigate(`/${lang}/${testId}/test`)}>
          {texts.startTest}
        </button>
      </div>

      <section className="ad-slot bottom" aria-label="Advertisement"></section>
      
      <div className="actions">
        <button className="text-button" onClick={() => navigate(`/${lang}`)}>
          ← {texts.backToList}
        </button>
      </div>
    </div>
  );
};

export default Home;