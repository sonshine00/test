import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import { useTestProgress } from '../hooks/useTestProgress';
import { useMeta } from '../hooks/useMeta';

const Test = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const currentQuestions = questions[lang] || questions.en;
  
  const { progress, updateProgress, resetProgress } = useTestProgress(lang);
  const { currentIndex, score } = progress;
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  useMeta(lang || 'en', 'test');

  const handleAnswer = (points) => {
    setIsTransitioning(true);
    
    // Small delay for transition effect
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      const nextScore = score + points;

      if (nextIndex < currentQuestions.length) {
        updateProgress(points, points); // Saving score as answer for simplicity
        setIsTransitioning(false);
      } else {
        // Clear progress when finished
        resetProgress();
        navigate(`/${lang}/result`, { state: { score: nextScore } });
      }
    }, 300);
  };

  if (currentIndex >= currentQuestions.length) return null;

  const currentQuestion = currentQuestions[currentIndex];

  return (
    <div className={`container test-page ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <ProgressBar current={currentIndex + 1} total={currentQuestions.length} />
      <div className="question-card">
        <h2 className="question-text">{currentQuestion.text}</h2>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button 
              key={index} 
              className="option-button tap-target" 
              onClick={() => handleAnswer(option.score)}
              disabled={isTransitioning}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;