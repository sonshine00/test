import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { results } from '../data/results';
import { i18n } from '../data/i18n';
import ShareButton from '../components/ShareButton';

const Result = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const texts = i18n[lang] || i18n.en;
  
  const score = location.state?.score ?? 0;

  const resultData = (results[lang] || results.en).find(
    (r) => score >= r.min && score <= r.max
  );

  useEffect(() => {
    // If someone accesses the result page directly without score, redirect to home
    if (location.state?.score === undefined) {
      navigate(`/${lang}`);
    }
  }, [location.state, navigate, lang]);

  if (!resultData) return <div>{texts.loading}</div>;

  return (
    <div className="container result-page">
      <h1 className="result-header">{texts.resultTitle}</h1>
      <div className="result-card">
        <h2 className="result-type">{resultData.type}</h2>
        <p className="result-description">{resultData.description}</p>
      </div>
      <div className="actions">
        <ShareButton lang={lang} />
        <button className="secondary-button" onClick={() => navigate(`/${lang}`)}>
          {texts.tryAgain}
        </button>
      </div>
    </div>
  );
};

export default Result;
