import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { results } from '../data/results';
import { tests } from '../data/tests';
import { i18n } from '../data/i18n';
import ShareButton from '../components/ShareButton';
import SEO from '../components/SEO';

const Result = () => {
  const { lang, testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const texts = i18n[lang] || i18n.en;
  
  const score = location.state?.score ?? 0;
  
  const testResults = results[testId];
  const resultData = useMemo(() => {
    if (!testResults) return null;
    return (testResults[lang] || testResults.en).find(
      (r) => score >= r.min && score <= r.max
    );
  }, [testResults, lang, score]);

  useEffect(() => {
    if (location.state?.score === undefined) {
      navigate(`/${lang}/${testId}`);
    }
  }, [location.state, navigate, lang, testId]);

  const otherTests = useMemo(() => {
    return Object.values(tests).filter(t => t.id !== testId);
  }, [testId]);

  if (!resultData) return <div className="container">{texts.loading}</div>;

  return (
    <div className="container result-page fade-in">
      <SEO 
        lang={lang} 
        title={`${resultData.type} - ${tests[testId][lang]?.title || tests[testId].en.title}`}
        description={resultData.description}
      />

      <section className="ad-slot top" aria-label="Advertisement"></section>

      <div className="result-header-group">
        <span className="result-label">{texts.resultTitle}</span>
        <h1 className="result-type-main">{resultData.type}</h1>
      </div>

      <div className="result-card highlight-card">
        <p className="result-description">{resultData.description}</p>
        
        <div className="why-section">
          <h3>🔍 {texts.whyResult}</h3>
          <p>{resultData.why}</p>
        </div>
      </div>

      <div className="cta-section">
        <div className="actions">
          <ShareButton lang={lang} resultType={resultData.type} testId={testId} />
          <button className="secondary-button" onClick={() => navigate(`/${lang}/${testId}`)}>
            🔄 {texts.tryAgain}
          </button>
        </div>
      </div>

      <section className="ad-slot middle" aria-label="Advertisement"></section>

      <div className="other-tests-section">
        <h3>🚀 {texts.tryAnotherTest}</h3>
        <div className="test-grid">
          {otherTests.map((test) => (
            <div 
              key={test.id} 
              className="test-card highlight-card clickable small-card"
              onClick={() => navigate(`/${lang}/${test.id}`)}
            >
              <h3>{test[lang]?.title || test.en.title}</h3>
              <button className="secondary-button">{texts.startTest}</button>
            </div>
          ))}
        </div>
      </div>

      <section className="ad-slot bottom" aria-label="Advertisement"></section>
    </div>
  );
};

export default Result;