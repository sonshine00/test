import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const HeaderControls = ({ theme, setTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract lang from pathname (e.g. /en/test -> en)
  const pathParts = location.pathname.split('/');
  const currentLang = pathParts[1] || 'en';

  const toggleLanguage = (lang) => {
    if (lang === currentLang) return;
    const newPathParts = [...pathParts];
    newPathParts[1] = lang;
    navigate(newPathParts.join('/'));
  };

  // Don't show language toggle if we're not on a language route (though we usually are)
  const showLangToggle = ['en', 'ko'].includes(currentLang);

  return (
    <div className="top-controls">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      {showLangToggle && (
        <div className="language-toggle">
          <button 
            className={currentLang === 'en' ? 'active' : ''} 
            onClick={() => toggleLanguage('en')}
          >
            EN
          </button>
          <button 
            className={currentLang === 'ko' ? 'active' : ''} 
            onClick={() => toggleLanguage('ko')}
          >
            KO
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderControls;
