import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { i18n } from '../data/i18n';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const Contact = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const texts = i18n[lang] || i18n.en;

  return (
    <div className="container contact-page fade-in">
      <SEO lang={lang} title={texts.partnershipInquiry} />
      <ContactForm />
      <div className="actions" style={{ marginTop: '2rem' }}>
        <button className="text-button" onClick={() => navigate(`/${lang}`)}>
          ← {texts.backToList}
        </button>
      </div>
    </div>
  );
};

export default Contact;
