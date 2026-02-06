import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { i18n } from '../data/i18n';
import { useMeta } from '../hooks/useMeta';

const Terms = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  useMeta(lang || 'en', 'terms', { title: texts.termsOfService });

  const content = {
    en: {
      usage: "Usage: This website provides entertainment and self-reflection content. Users are responsible for how they interpret the results.",
      intellectual: "Intellectual Property: All test content, designs, and code are the property of Insightful Tests.",
      disclaimer: "Disclaimer: These tests are for entertainment purposes only and should not be used as professional psychological advice.",
    },
    ko: {
      usage: "이용 안내: 본 웹사이트는 엔터테인먼트 및 자기 성찰 콘텐츠를 제공합니다. 사용자는 결과 해석에 대한 책임이 있습니다.",
      intellectual: "지적 재산권: 모든 테스트 콘텐츠, 디자인 및 코드는 Insightful Tests의 자산입니다.",
      disclaimer: "면책 조항: 이 테스트들은 오직 재미를 위한 것이며 전문적인 심리 상담이나 진단으로 사용되어서는 안 됩니다.",
    }
  };

  const c = content[lang] || content.en;

  return (
    <div className="container legal-page fade-in">
      <h1 className="title">{texts.termsOfService}</h1>
      <div className="legal-content highlight-card" style={{ textAlign: 'left' }}>
        <h3>1. {lang === 'ko' ? '이용 조건' : 'Usage Terms'}</h3>
        <p>{c.usage}</p>
        <h3>2. {lang === 'ko' ? '지적 재산권' : 'Intellectual Property'}</h3>
        <p>{c.intellectual}</p>
        <h3>3. {lang === 'ko' ? '책임 제한' : 'Disclaimer'}</h3>
        <p>{c.disclaimer}</p>
      </div>
      <div className="actions" style={{ marginTop: '2rem' }}>
        <button className="text-button" onClick={() => navigate(`/${lang}`)}>
          ← {texts.backToList}
        </button>
      </div>
    </div>
  );
};

export default Terms;
