import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import ProgressBar from '../components/ProgressBar';

const Test = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const currentQuestions = questions[lang] || questions.en;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (points) => {
    const nextScore = score + points;
    setScore(nextScore);

    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to results page with score
      navigate(`/${lang}/result`, { state: { score: nextScore } });
    }
  };

  const currentQuestion = currentQuestions[currentIndex];

  return (
    <div className="container test-page">
      <ProgressBar current={currentIndex + 1} total={currentQuestions.length} />
      <div className="question-card">
        <h2 className="question-text">{currentQuestion.text}</h2>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button 
              key={index} 
              className="option-button" 
              onClick={() => handleAnswer(option.score)}
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
