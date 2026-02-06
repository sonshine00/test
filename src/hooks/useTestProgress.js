import { useState, useEffect } from 'react';

const STORAGE_KEY = 'avoider_test_progress';

export const useTestProgress = (lang) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Only restore if language matches or we don't care about language mismatch
      return parsed;
    }
    return { currentIndex: 0, score: 0, answers: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

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
    localStorage.removeItem(STORAGE_KEY);
  };

  return { progress, updateProgress, resetProgress };
};
