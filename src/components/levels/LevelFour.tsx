

// export default LevelFour;
import React, { useState, useCallback, useEffect } from "react";
import { IndiaMap } from "../../components/IndiaMap";
import { QuestionPanel } from "../../components/QuestionPanel";
import { FeedbackPopup } from "../../components/FeedbackPopup";
import { generateQuestion } from "../../data/stateData";
import { stateData } from "../../data/stateData";
import { GameState } from "../../types/game";

function LevelFour({
  onComplete,
  onBack,
}: {
  onComplete: (stats: any, timeout: boolean) => void;
  onBack: () => void;
}) {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentQuestion: null,
    showFeedback: false,
    isCorrect: false,
  });

  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const generateNewQuestion = useCallback(() => {
    if (gameOver) return;
    const question = generateQuestion();
    setGameState((prev) => ({
      ...prev,
      currentQuestion: question,
    }));
  }, [gameOver]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleGameOver(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleStateClick = (stateId: string) => {
    if (gameOver || !gameState.currentQuestion) return;

    const isCorrect = stateId === gameState.currentQuestion.correctState;

    setGameState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      showFeedback: true,
      isCorrect,
    }));

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        showFeedback: false,
      }));
      generateNewQuestion();
    }, 2000);
  };

  const handleGameOver = (timeout: boolean) => {
    setGameOver(true);
    setShowDialog(true);
    onComplete(gameState, timeout);
  };

  const handleRestart = () => {
    setGameOver(false);
    setShowDialog(false);
    setTimeLeft(30);
    setGameState({
      score: 0,
      currentQuestion: null,
      showFeedback: false,
      isCorrect: false,
    });
    generateNewQuestion();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
            <button
              onClick={onBack}
              className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
               Back to Map
            </button>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
            <button
              onClick={() => handleGameOver(false)}
              className="text-lg font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              End Level
            </button>
            </div>
          </div>
          <div className="text-xl font-semibold text-gray-900">
            Time Left: {timeLeft}s
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Discover India Quiz
        </h1>

        {!gameOver && (
          <div className="flex justify-center items-center min-h-[35vh]">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <IndiaMap
                    onStateClick={handleStateClick}
                    highlightState={
                      gameState.showFeedback
                        ? gameState.currentQuestion?.correctState || null
                        : null
                    }
                    isCorrect={gameState.showFeedback ? gameState.isCorrect : null}
                  />
                </div>

                <div>
                  <QuestionPanel
                    question={gameState.currentQuestion}
                    score={gameState.score}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState.showFeedback && gameState.currentQuestion && (
          <FeedbackPopup
            isCorrect={gameState.isCorrect}
            stateName={stateData[gameState.currentQuestion.correctState].name}
            onClose={() =>
              setGameState((prev) => ({ ...prev, showFeedback: false }))
            }
          />
        )}
      </div>

      {/* Game Over Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[400px] text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">You're on the right path! Reflect, learn, and try again!</h2>
            <p className="text-lg text-gray-800">Level: 4</p>
            <p className="text-gray-700 mt-2">
            Your final score:{" "}
              <span className="font-semibold">{gameState.score}</span>
            </p>

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-center text-md text-gray-700 italic">
                      "India’s strength lies in its diversity. By knowing our states, traditions, and heritage, we embrace Swadeshi and take pride in our roots. Celebrate local, stay united!."
                    </p>
                  </div>
            <div className="mt-4 flex justify-center gap-4">
              
              <button
                onClick={handleRestart}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={onBack}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Back to Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelFour;
