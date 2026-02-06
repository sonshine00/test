import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { results } from '../data/results';
import { i18n } from '../data/i18n';
import ShareButton from '../components/ShareButton';
import { useMeta } from '../hooks/useMeta';

const Result = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const texts = i18n[lang] || i18n.en;
  
  const score = location.state?.score ?? 0;
  const resultData = (results[lang] || results.en).find(
    (r) => score >= r.min && score <= r.max
  );

  // SEO
  useMeta(lang || 'en', 'result', { type: resultData?.type });

  useEffect(() => {
    if (location.state?.score === undefined) {
      navigate(`/${lang}`);
    }
  }, [location.state, navigate, lang]);

  if (!resultData) return <div className="container">{texts.loading}</div>;

  const handleOtherLang = () => {
    navigate(`/${texts.otherLangCode}`);
  };

  return (
    <div className="container result-page fade-in">
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
        <h3>{texts.ctaTitle}</h3>
        <div className="actions">
          <ShareButton lang={lang} resultType={resultData.type} />
          <button className="secondary-button" onClick={() => navigate(`/${lang}`)}>
            🔄 {texts.tryAgain}
          </button>
          <button className="text-button" onClick={handleOtherLang}>
            🌐 {texts.tryOtherLang}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;