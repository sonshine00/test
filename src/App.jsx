import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Result from './pages/Result';
import './index.css';

const LanguageRedirect = () => {
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = ['en', 'ko'];
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
  
  return <Navigate to={`/${defaultLang}`} replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageRedirect />} />
        
        {/* English Routes */}
        <Route path="/en" element={<Home />} />
        <Route path="/en/test" element={<Test />} />
        <Route path="/en/result" element={<Result />} />
        
        {/* Korean Routes */}
        <Route path="/ko" element={<Home />} />
        <Route path="/ko/test" element={<Test />} />
        <Route path="/ko/result" element={<Result />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </Router>
  );
}

export default App;