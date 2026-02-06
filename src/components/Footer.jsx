import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { i18n } from '../data/i18n';

const Footer = () => {
  const { lang } = useParams();
  const texts = i18n[lang] || i18n.en;
  const currentLang = lang || 'en';

  return (
    <footer className="global-footer">
      <div className="footer-links">
        <Link to={`/${currentLang}/about`}>{texts.aboutUs}</Link>
        <Link to={`/${currentLang}/contact`}>{texts.partnershipInquiry}</Link>
        <Link to={`/${currentLang}/privacy`}>{texts.privacyPolicy}</Link>
        <Link to={`/${currentLang}/terms`}>{texts.termsOfService}</Link>
      </div>
      <p className="footer-copy">{texts.footerText}</p>
    </footer>
  );
};

export default Footer;
