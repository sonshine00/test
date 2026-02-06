import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageToggle = ({ currentLang }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = (lang) => {
    if (lang === currentLang) return;
    
    // Replace the language prefix in the current path
    const pathParts = location.pathname.split('/');
    pathParts[1] = lang;
    const newPath = pathParts.join('/');
    navigate(newPath);
  };

  return (
    <div className="language-toggle">
      <button 
        className={currentLang === 'en' ? 'active' : ''} 
        onClick={() => toggleLanguage('en')}
      >
        English
      </button>
      <button 
        className={currentLang === 'ko' ? 'active' : ''} 
        onClick={() => toggleLanguage('ko')}
      >
        한국어
      </button>
    </div>
  );
};

export default LanguageToggle;
