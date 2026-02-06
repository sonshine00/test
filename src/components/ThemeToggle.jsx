import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="theme-toggle">
      <button 
        className={theme === 'dark' ? 'active' : ''} 
        onClick={() => setTheme('dark')}
      >
        🌙 Dark
      </button>
      <button 
        className={theme === 'light' ? 'active' : ''} 
        onClick={() => setTheme('light')}
      >
        ☀️ Light
      </button>
    </div>
  );
};

export default ThemeToggle;
