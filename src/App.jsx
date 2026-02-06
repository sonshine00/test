import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TestSelection from './pages/TestSelection';
import Home from './pages/Home';
import Test from './pages/Test';
import Result from './pages/Result';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import HeaderControls from './components/HeaderControls';
import Footer from './components/Footer';
import './index.css';

const LanguageRedirect = () => {
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'ko'];
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
  
  return <Navigate to={`/${defaultLang}`} replace />;
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <HeaderControls theme={theme} setTheme={setTheme} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LanguageRedirect />} />
          
          {/* Test List */}
          <Route path="/:lang" element={<TestSelection />} />
          
          {/* Legal and Contact Pages */}
          <Route path="/:lang/contact" element={<Contact />} />
          <Route path="/:lang/privacy" element={<Privacy />} />
          <Route path="/:lang/terms" element={<Terms />} />
          
          {/* Specific Test Routes */}
          <Route path="/:lang/:testId" element={<Home />} />
          <Route path="/:lang/:testId/test" element={<Test />} />
          <Route path="/:lang/:testId/result" element={<Result />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
