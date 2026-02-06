import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HeaderControls from './components/HeaderControls';
import Footer from './components/Footer';
import './index.css';

// Lazy load pages for performance
const TestSelection = lazy(() => import('./pages/TestSelection'));
const Home = lazy(() => import('./pages/Home'));
const Test = lazy(() => import('./pages/Test'));
const Result = lazy(() => import('./pages/Result'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

const LanguageRedirect = () => {
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'ko'];
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
  
  return <Navigate to={`/${defaultLang}`} replace />;
}

const Loading = () => (
  <div className="container">
    <div className="loading-spinner"></div>
  </div>
);

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
    <HelmetProvider>
      <Router>
        <HeaderControls theme={theme} setTheme={setTheme} />
        <div className="main-content">
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;