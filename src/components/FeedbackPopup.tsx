import React, { useEffect } from 'react';
import { StateInfo } from '../types/game';

interface FeedbackPopupProps {
  isCorrect: boolean;
  stateName: string;
  onClose: () => void;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  isCorrect,
  stateName,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
      <div className={`p-6 rounded-lg ${
        isCorrect ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <p className={`text-xl font-bold ${
          isCorrect ? 'text-green-700' : 'text-red-700'
        }`}>
          {isCorrect ? 'Correct!' : `Incorrect! The answer was ${stateName}`}
        </p>
      </div>
    </div>
  );
};