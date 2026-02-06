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

  const testData = currentTest[lang] || currentTest.en;

  // Schema.org Data for Quiz & FAQPage
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Quiz",
        "name": testData.title,
        "description": testData.geoDescription,
        "about": {
          "@type": "Thing",
          "name": "Personality Assessment"
        },
        "inLanguage": lang,
        "url": window.location.href
      },
      {
        "@type": "FAQPage",
        "mainEntity": testData.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="container home-page fade-in">
      <SEO 
        lang={lang} 
        title={testData.title}
        description={testData.description}
        keywords={testData.keywords}
        schema={schemaData}
      />

      <section className="ad-slot top" aria-label="Advertisement"></section>

      <article className="test-intro">
        <div className="hero-section">
          <h1 className="title">{testData.title}</h1>
          <p className="description">{testData.description}</p>
          <button className="primary-button large-button" onClick={() => navigate(`/${lang}/${testId}/test`)}>
            {texts.startTest}
          </button>
        </div>

        {/* GEO-Optimized Content Section */}
        <section className="geo-content highlight-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h2>💡 About This Test</h2>
          <p>{testData.geoDescription}</p>
        </section>

        {/* FAQ Section for SEO/GEO */}
        <section className="faq-section" style={{ marginTop: '3rem', textAlign: 'left', width: '100%' }}>
          <h2>❓ Frequently Asked Questions</h2>
          <div className="faq-list">
            {testData.faqs.map((faq, index) => (
              <details key={index} className="faq-item" open={index === 0}>
                <summary style={{ fontWeight: 'bold', cursor: 'pointer', padding: '1rem 0' }}>{faq.q}</summary>
                <p style={{ color: 'var(--description-color)', paddingBottom: '1rem' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

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
