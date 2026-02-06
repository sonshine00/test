import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const HeaderControls = ({ theme, setTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const pathParts = location.pathname.split('/');
  const currentLang = pathParts[1] || 'en';

  const toggleLanguage = (lang) => {
    if (lang === currentLang) return;
    const newPathParts = [...pathParts];
    newPathParts[1] = lang;
    navigate(newPathParts.join('/'));
  };

  const showLangToggle = ['en', 'ko'].includes(currentLang);

  return (
    <div className="top-controls">
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
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default HeaderControls;