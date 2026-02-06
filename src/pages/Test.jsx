import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import { useTestProgress } from '../hooks/useTestProgress';
import { useMeta } from '../hooks/useMeta';

const Test = () => {
  const { lang, testId } = useParams();
  const navigate = useNavigate();
  
  // Fetch questions for specific test
  const testQuestions = questions[testId];
  const currentQuestions = testQuestions ? (testQuestions[lang] || testQuestions.en) : [];
  
  // useTestProgress might need update to be test-specific
  const { progress, updateProgress, resetProgress } = useTestProgress(`${testId}_${lang}`);
  const { currentIndex, score } = progress;
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  useMeta(lang || 'en', 'test');

  const handleAnswer = (points) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      const nextScore = score + points;

      if (nextIndex < currentQuestions.length) {
        updateProgress(points, points);
        setIsTransitioning(false);
      } else {
        resetProgress();
        navigate(`/${lang}/${testId}/result`, { state: { score: nextScore } });
      }
    }, 300);
  };

  if (!currentQuestions.length || currentIndex >= currentQuestions.length) return null;

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
