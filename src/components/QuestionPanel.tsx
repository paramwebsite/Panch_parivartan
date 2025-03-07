import React from 'react';
import { Question } from '../types/game';

interface QuestionPanelProps {
  question: Question | null;
  score: number;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, score }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Score: {score}</h2>
      </div>
      
      {question && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-lg text-indigo-900">{question.text}</p>
          </div>
          <p className="text-sm text-gray-600">
            Click on the correct state in the map
          </p>
        </div>
      )}
    </div>
  );
};