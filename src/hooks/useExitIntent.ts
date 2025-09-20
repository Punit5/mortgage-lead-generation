import { useState, useEffect } from 'react';

export function useExitIntent() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return;

      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (hasShown) return;

      if (e.key === 'Escape' && !showExitIntent) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleEscapeKey);

    // Show after 30 seconds if user hasn't triggered exit intent
    const timer = setTimeout(() => {
      if (!hasShown && !showExitIntent) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    }, 30000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleEscapeKey);
      clearTimeout(timer);
    };
  }, [showExitIntent, hasShown]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, closeExitIntent };
}