import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { i18n } from '../data/i18n';
import SEO from '../components/SEO';

const Privacy = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  const content = {
    en: {
      intro: "Your privacy is important to us. This Privacy Policy explains how we handle your information.",
      dataCollection: "Data Collection: We do not store personal identification data. Test results are processed locally in your browser or through temporary state management.",
      cookies: "Cookies: We may use local storage and basic cookies to save your test progress and theme preferences.",
      adsense: "Third-party Services: We use Google AdSense to serve ads. Google may use cookies to serve ads based on your visits to this and other websites.",
    },
    ko: {
      intro: "귀하의 개인정보 보호는 당사에게 매우 중요합니다. 본 개인정보처리방침은 당사가 귀하의 정보를 취급하는 방법을 설명합니다.",
      dataCollection: "데이터 수집: 당사는 개인 식별 데이터를 저장하지 않습니다. 테스트 결과는 귀하의 브라우저에서 로컬로 처리되거나 임시 상태 관리를 통해 처리됩니다.",
      cookies: "쿠키: 당사는 테스트 진행 상황 및 테마 설정을 저장하기 위해 로컬 스토리지 및 기본 쿠키를 사용할 수 있습니다.",
      adsense: "제3자 서비스: 당사는 광고 제공을 위해 Google AdSense를 사용합니다. Google은 귀하의 본 사이트 및 기타 사이트 방문을 기반으로 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.",
    }
  };

  const c = content[lang] || content.en;

  return (
    <div className="container legal-page fade-in">
      <SEO lang={lang} title={texts.privacyPolicy} />
      <h1 className="title">{texts.privacyPolicy}</h1>
      <div className="legal-content highlight-card" style={{ textAlign: 'left' }}>
        <p>{c.intro}</p>
        <h3>1. {lang === 'ko' ? '데이터 수집' : 'Data Collection'}</h3>
        <p>{c.dataCollection}</p>
        <h3>2. {lang === 'ko' ? '쿠키 사용' : 'Cookies'}</h3>
        <p>{c.cookies}</p>
        <h3>3. {lang === 'ko' ? '제3자 광고' : 'Third-party Ads'}</h3>
        <p>{c.adsense}</p>
      </div>
      <div className="actions" style={{ marginTop: '2rem' }}>
        <button className="text-button" onClick={() => navigate(`/${lang}`)}>
          ← {texts.backToList}
        </button>
      </div>
    </div>
  );
};

export default Privacy;
