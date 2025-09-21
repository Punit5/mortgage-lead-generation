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

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showExitIntent, hasShown]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, closeExitIntent };
}