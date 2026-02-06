import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { i18n } from '../data/i18n';
import SEO from '../components/SEO';

const About = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  return (
    <div className="container about-page fade-in">
      <SEO lang={lang} title={texts.aboutUs} />
      <h1 className="title">{texts.aboutUs}</h1>
      <div className="highlight-card" style={{ textAlign: 'left' }}>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          {texts.aboutDescription}
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          {lang === 'ko' 
            ? "우리는 모든 사람이 자신에 대해 조금 더 알아가는 즐거움을 누릴 수 있어야 한다고 믿습니다." 
            : "We believe everyone should enjoy the process of discovering a little more about themselves."}
        </p>
      </div>
      <div className="actions" style={{ marginTop: '2rem' }}>
        <button className="text-button" onClick={() => navigate(`/${lang}`)}>
          ← {texts.backToList}
        </button>
      </div>
    </div>
  );
};

export default About;
