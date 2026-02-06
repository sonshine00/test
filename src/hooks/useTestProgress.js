import { useState, useEffect } from 'react';

export const useTestProgress = (key) => {
  const storageKey = `test_progress_${key}`;

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    return { currentIndex: 0, score: 0, answers: [] };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const updateProgress = (points, answer) => {
    setProgress(prev => ({
      currentIndex: prev.currentIndex + 1,
      score: prev.score + points,
      answers: [...prev.answers, answer]
    }));
  };

  const resetProgress = () => {
    const fresh = { currentIndex: 0, score: 0, answers: [] };
    setProgress(fresh);
    localStorage.removeItem(storageKey);
  };

  return { progress, updateProgress, resetProgress };
};
